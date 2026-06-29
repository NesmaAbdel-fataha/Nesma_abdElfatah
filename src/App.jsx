import { ArrowRight, Code2, Download,  Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Mail } from "lucide-react";
import Navv from './components/Navv';
import ProjectsSection from './components/projects/ProjectsSection';
import SkillsSection from './components/skills/SkillsSection';
import { heroData } from './data/hero';
import { profileData } from './data/profile';

const socialIconMap = {
  Github: FaGithub,
  Linkedin: FaLinkedin,
  Mail,
};

function App() {
  return (
    <div className="min-h-screen bg-(--bg) text-(--text)">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.16),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(251,146,60,0.16),transparent_40%)]" />

        <Navv />

        <header id="home" className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10">
            <div className="max-w-3xl animate-fade-in">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50/80 px-3 py-1.5 text-sm font-medium text-orange-700 shadow-sm">
                <Sparkles className="h-4 w-4" />
                {heroData.greeting}
              </div>

              <h1 className="mt-6 text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
                <span className="block">{heroData.name}</span>
                <span className="mt-3 block bg-linear-to-r from-orange-600 via-orange-500 to-amber-400 bg-clip-text text-transparent">
                  {heroData.roles[0]}
                </span>
              </h1>

              <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
                {heroData.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-600 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_18px_40px_rgba(249,115,22,0.2)] transition hover:-translate-y-0.5 hover:shadow-[0_22px_45px_rgba(249,115,22,0.25)]"
                >
                  View projects
                  <ArrowRight className="h-4 w-4" />
                </a>

                <a
                  href={profileData.hero.downloadCvUrl.direct}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50/70 hover:text-orange-700"
                >
                  <Download className="h-4 w-4" />
                  Download CV
                </a>

                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-slate-300 hover:bg-slate-50"
                >
                  <Mail className="h-4 w-4" />
                  Let&apos;s talk
                </a>
              </div>

              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {heroData.stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur">
                    <p className="text-lg font-semibold text-slate-900">{stat.number}</p>
                    <p className="mt-1 text-sm text-slate-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-4xl border border-slate-200/80 bg-white/80 p-6 shadow-[0_24px_70px_rgba(15,23,42,0.08)] backdrop-blur sm:p-7">
              <div className="flex items-center gap-3">
                <div className="rounded-2xl bg-orange-50 p-3 text-orange-700">
                  <Code2 className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Available for</p>
                  <p className="font-semibold text-slate-900">Freelance & full-time roles</p>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {heroData.roles.map((role) => (
                  <div key={role} className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 text-sm font-medium text-slate-700">
                    {role}
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                {heroData.socialLinks.map((link) => {
                  const Icon = socialIconMap[link.icon] ?? Mail;
                  return (
                    <a
                      key={link.name}
                      href={link.name === 'Gmail' ? `mailto:${link.url}` : link.url}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-orange-100 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 transition hover:border-orange-200 hover:text-orange-700"
                    >
                      <Icon className="h-4 w-4" />
                      {link.name}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>
        </header>
      </div>

      <main>
        <ProjectsSection />
        <SkillsSection />

        <section id="contact" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className="rounded-4xl border border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(255,247,237,0.96))] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10">
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-700">Contact</p>
                <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
                  Ready to build something polished and impactful?
                </h2>
                <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                  I’m open to freelance collaborations and full-time opportunities where thoughtful UI, strong engineering, and clear communication matter.
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a
                  href={`mailto:${profileData.contact.email}`}
                  className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-600 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(249,115,22,0.18)] transition hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" />
                  Email me
                </a>
                <a
                  href={profileData.hero.downloadCvUrl.direct}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50/70 hover:text-orange-700"
                >
                  <Download className="h-4 w-4" />
                  View CV
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200/80 bg-white/80 px-4 py-8 text-center text-sm text-slate-600 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Nesma Abdel Fattah. Crafted for modern web experiences.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="#home" className="transition hover:text-orange-700">Home</a>
            <a href="#projects" className="transition hover:text-orange-700">Projects</a>
            <a href="#skills" className="transition hover:text-orange-700">Skills</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;

