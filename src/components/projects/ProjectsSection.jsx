import ProjectCard from './ProjectCard';
import { projects } from '../../data/project';

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-orange-700">Projects</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Selected work with a polished, product-ready feel.
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
              A collection of responsive interfaces and full-stack experiences built with a focus on clarity, usability, and maintainable code.
            </p>
          </div>

          <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2 text-sm font-medium text-slate-600 shadow-sm">
            {projects.length} featured projects
          </div>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, idx) => (
            <div
              key={project.title}
              className="animate-fade-in-up"
              style={{ animationDuration: '800ms', animationFillMode: 'both' }}
            >
              <ProjectCard project={project} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

