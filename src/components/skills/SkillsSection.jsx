import { useMemo } from 'react';
import { Code2, Database, Layers3, PenTool, Server, TerminalSquare } from 'lucide-react';

import { profileData } from '../../data/profile';

const categoryIcons = {
  Frontend: Layers3,
  Backend: Server,
  Databases: Database,
  'Programming Languages': Code2,
  Tools: PenTool,
  'Version Control': TerminalSquare,
};

const proficiencyScale = {
  'Strong knowledge': 90,
  'Familiar with': 72,
};

function ProgressBar({ value }) {
  return (
    <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
      <div
        className="h-full rounded-full bg-linear-to-r from-orange-600 via-orange-500 to-amber-400"
        style={{ width: `${Math.max(0, Math.min(100, value))}%` }}
      />
    </div>
  );
}

function SkillCard({ name, proficiency }) {
  const percent = proficiencyScale[proficiency] ?? 70;

  return (
    <div className="group rounded-3xl border border-orange-100 bg-white p-5 shadow-[0_16px_40px_rgba(249,115,22,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(249,115,22,0.14)]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-900">{name}</p>
          <p className="mt-1 text-sm text-slate-600">{proficiency}</p>
        </div>
        <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-orange-700">
          {proficiency}
        </span>
      </div>
      <div className="mt-4">
        <ProgressBar value={percent} />
      </div>
    </div>
  );
}

export default function SkillsSection() {
  const data = profileData?.skills?.categories ?? [];

  const skillsTotal = useMemo(() => {
    return data.reduce((acc, cat) => acc + (cat.items?.length ?? 0), 0);
  }, [data]);

  return (
    <section id="skills" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-700">Skills</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              A concise view of the technologies in my CV.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              Every skill below is drawn from the résumé content and presented with the same level label used in the document.
            </p>
          </div>
          <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
            {skillsTotal} confirmed skills
          </div>
        </div>

        {data.length === 0 ? (
          <div className="mt-10 rounded-[28px] border border-slate-200 bg-white p-8 text-slate-600 shadow-[0_20px_45px_rgba(15,23,42,0.06)]">
            Skills will appear once the CV data is added.
          </div>
        ) : (
          <div className="mt-10 space-y-8">
            {data.map((cat) => {
              const Icon = categoryIcons[cat.name] ?? Layers3;
              return (
                <div key={cat.name} className="rounded-[30px] border border-orange-100 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(255,247,237,0.95))] p-6 shadow-[0_20px_45px_rgba(249,115,22,0.08)] sm:p-8">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="rounded-2xl bg-orange-50 p-2.5 text-orange-700">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl font-semibold text-slate-900">{cat.name}</h3>
                    </div>
                    <div className="text-sm font-medium text-slate-500">
                      {(cat.items ?? []).length} item{(cat.items ?? []).length === 1 ? '' : 's'}
                    </div>
                  </div>

                  {(cat.items ?? []).length > 0 ? (
                    <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                      {(cat.items ?? []).map((item) => (
                        <SkillCard
                          key={item.name}
                          name={item.name}
                          proficiency={item.proficiency}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="mt-6 rounded-2xl border border-dashed border-slate-200 bg-slate-50/70 p-4 text-sm text-slate-600">
                      No explicit version-control tool was listed in the CV.
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

