import React from 'react';
import ProjectLinks from './ProjectLinks';

export default function ProjectCard({ project, index = 0 }) {
  return (
    <article
      className="group relative overflow-hidden rounded-[28px] border border-orange-100 bg-white p-6 shadow-[0_18px_45px_rgba(249,115,22,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_55px_rgba(249,115,22,0.16)] focus-within:ring-2 focus-within:ring-orange-500/20"
      style={{ animationDelay: `${index * 90}ms` }}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-orange-600 via-orange-500 to-amber-400" />
      <div className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <div className="pointer-events-none absolute -left-16 -top-16 h-32 w-32 rounded-full bg-orange-500/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-12 -right-12 h-36 w-36 rounded-full bg-amber-400/10 blur-3xl" />
      </div>

      <header className="relative">
        <h3 className="text-lg font-semibold text-slate-900 sm:text-xl">{project.title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">{project.description}</p>
      </header>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {(project.tech || []).map((t) => (
          <span
            key={t}
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-700"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="relative mt-6">
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

