/* eslint-disable no-console */
import fs from 'node:fs';
import path from 'node:path';
import * as pdfParsePkg from 'pdf-parse';

const pdfParse =
  typeof pdfParsePkg === 'function'
    ? pdfParsePkg
    : pdfParsePkg.default ?? pdfParsePkg.pdfParse ?? pdfParsePkg;





const repoRoot = path.resolve(process.cwd());


const CV_PDF_PATH = path.join(repoRoot, 'src', 'Nesma_Abdelfattah_CV.pdf');
const OUT_JSON_PATH = path.join(repoRoot, 'src', 'data', 'cv-extracted.json');

function normalizeText(s) {
  return String(s || '')
    .replace(/\r\n/g, '\n')
    .replace(/[\t\u00A0]+/g, ' ')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function extractSkillsFromText(text) {
  // Heuristic extraction. We only output items we can match confidently.
  // Strategy:
  // - Find blocks that look like “Skills” (case-insensitive) and then extract bullet/line entries.
  // - Also attempt to extract “Proficiency” / “Level” patterns like: “React - Advanced”, “Node.js (Intermediate)”, etc.

  const lines = text
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const lower = text.toLowerCase();

  const skillSectionIndexes = [];
  const sectionKeywords = ['skills', 'technologies', 'technical skills', 'tooling', 'stack'];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i].toLowerCase();
    if (sectionKeywords.some((k) => l.includes(k))) {
      skillSectionIndexes.push(i);
    }
  }

  // Choose first reasonable section start if present
  const start = skillSectionIndexes.length ? skillSectionIndexes[0] : null;
  const end = start != null ? Math.min(lines.length, start + 120) : Math.min(lines.length, 1200);
  const candidateLines = start != null ? lines.slice(start, end) : lines.slice(0, end);

  const items = [];

  const levelRegex = [
    /\b(beginner|junior|entry\s*level|basic)\b/i,
    /\b(intermediate|mid)\b/i,
    /\b(advanced|senior)\b/i,
    /\b(expert|proficient|expert\s*level|mastery)\b/i,
    /\b(fluent)\b/i,
  ];

  const levelMap = (levelText) => {
    const t = String(levelText || '').toLowerCase();
    if (/beginner|junior|entry\s*level|basic/.test(t)) return 'Beginner';
    if (/intermediate|mid/.test(t)) return 'Intermediate';
    if (/advanced|senior/.test(t)) return 'Advanced';
    if (/expert|proficient|expert\s*level|mastery/.test(t)) return 'Expert';
    if (/fluent/.test(t)) return 'Advanced';
    return null;
  };

  const pushItem = (name, level) => {
    if (!name) return;
    const cleaned = normalizeText(name);
    if (!cleaned) return;
    // Only accept if we have either a level OR the item is short and clearly skill-like.
    if (!level && cleaned.length > 28) return;
    items.push({ name: cleaned, proficiency: level });
  };

  // Parse lines like:
  // - React — Advanced
  // - React: Advanced
  // - Node.js (Intermediate)
  // - JavaScript - Intermediate
  const lineSkillRegex = /^([A-Za-z0-9+\-_.#/()\s]{2,40})(?:\s*[:\-–—]\s*|\s*\(\s*|\s*\[\s*)?(.*?)(?:\)|\]|$)/;

  for (const l of candidateLines) {
    // Skip obvious non-skill sentences
    if (/\bcontact\b|\bemail\b|\bphone\b|\beducation\b|\bexperience\b|\bsummary\b|\bprojects\b/i.test(l)) {
      continue;
    }

    // bullet points
    const bullet = l.replace(/^[-*•]\s*/, '');

    // Try to detect explicit level
    const matchedLevel = levelRegex
      .map((re) => {
        const m = bullet.match(re);
        return m ? m[0] : null;
      })
      .find(Boolean);

    let level = matchedLevel ? levelMap(matchedLevel) : null;

    // Split by common separators and parse each chunk
    const parts = bullet
      .split(/[,|/]|\s{2,}/g)
      .map((p) => p.trim())
      .filter(Boolean);

    for (const p of parts) {
      const m = p.match(lineSkillRegex);
      if (!m) continue;

      const left = m[1];
      const right = (m[2] || '').trim();

      // If we detected level in the full bullet, but this part doesn't contain the level word,
      // keep level only if the right side contains it.
      if (level && right && !levelRegex.some((re) => re.test(right))) {
        // Keep as-is (level may still apply), but only if right side is short.
        // Otherwise drop the level.
        if (right.length > 18) level = null;
      }

      pushItem(left, level);
    }
  }

  // Deduplicate by name + proficiency
  const seen = new Set();
  const uniq = [];
  for (const it of items) {
    const key = `${it.name}__${it.proficiency || ''}`.toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    uniq.push(it);
  }

  // Filter to only those with a reasonable name pattern
  const filtered = uniq.filter((it) => {
    const n = it.name.toLowerCase();
    // Exclude long sentences
    if (it.name.length > 30) return false;
    // Exclude stopwords
    if (/\bskills\b|\blearn\b|\brecent\b|\breferences\b|\bthesis\b/.test(n)) return false;
    return true;
  });

  // If we extracted nothing with levels, keep whatever we found but without inventing proficiency.
  return filtered.map((s) => ({ ...s, proficiency: s.proficiency || null }));
}

function extractAbout(text) {
  // Extract a small “About/ Summary” block if present.
  // Only output if we can locate a section header.
  const markers = [
    /\babout\b\s*:/i,
    /\bsum(mary)?\b\s*:/i,
    /\bprofile\b\s*:/i,
  ];

  const lines = text.split('\n').map((l) => l.trim()).filter(Boolean);

  let startIdx = -1;
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (markers.some((re) => re.test(l))) {
      startIdx = i;
      break;
    }
  }

  if (startIdx === -1) {
    return { about: null };
  }

  const chunk = lines.slice(startIdx, startIdx + 12).join(' ');
  // Remove the marker prefix if present
  const cleaned = normalizeText(chunk)
    .replace(/^(about|summary|profile)\s*:\s*/i, '')
    .replace(/\s+/g, ' ');

  return { about: cleaned || null };
}

async function main() {
  if (!fs.existsSync(CV_PDF_PATH)) {
    throw new Error(`CV PDF not found at: ${CV_PDF_PATH}`);
  }

  const buffer = fs.readFileSync(CV_PDF_PATH);
  const parsed = await pdfParse(buffer);
  const text = normalizeText(parsed.text);

  const skills = extractSkillsFromText(text);
  const about = extractAbout(text);

  const out = {
    generatedAt: new Date().toISOString(),
    source: 'src/Nesma_Abdelfattah_CV.pdf',
    skills,
    about,
  };

  fs.mkdirSync(path.dirname(OUT_JSON_PATH), { recursive: true });
  fs.writeFileSync(OUT_JSON_PATH, JSON.stringify(out, null, 2), 'utf-8');

  console.log(`Extracted CV data written to: ${OUT_JSON_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

