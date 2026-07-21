import { useMemo, useState } from 'react';
import ProjectCard from './ProjectCard';
import SectionHeading from '../SectionHeading';
import { projects } from '../../data/project';
import { useTheme } from '../../context/ThemeContext';

const filters = ['All', 'Frontend', 'Backend', 'Full Stack', 'AI'];

export default function ProjectsSection() {
  const { theme } = useTheme();
  const [activeFilter, setActiveFilter] = useState('All');
  const isDark = theme === 'dark';

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') return projects;
    if (activeFilter === 'AI') {
      return projects.filter((project) => project.tech.some((item) => ['OpenAI', 'AI Assistant'].includes(item)) || project.description.toLowerCase().includes('ai'));
    }
    return projects.filter((project) => project.category === activeFilter);
  }, [activeFilter]);

  return (
    <section id="projects" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading 
            eyebrow="Projects" 
            title="Selected work that reflects product thinking and engineering depth." 
            description="A selection of projects demonstrating full-stack development, scalable architecture, and modern user experiences." 
          />
          <div className={`rounded-full border px-4 py-2 text-sm font-medium shadow-sm ${isDark ? 'border-slate-800 bg-slate-900/80 text-slate-300' : 'border-slate-200 bg-white/80 text-slate-600'}`}>
            {projects.length} projects
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          {filters.map((filter) => {
            const isActive = filter === activeFilter;
            return (
              <button 
                key={filter} 
                type="button" 
                onClick={() => setActiveFilter(filter)} 
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${isActive ? 'bg-orange-600 text-white shadow-[0_12px_30px_rgba(249,115,22,0.2)]' : isDark ? 'border border-slate-700 bg-slate-900/80 text-slate-300 hover:border-orange-500/30 hover:text-orange-300' : 'border border-slate-200 bg-white text-slate-700 hover:border-orange-200 hover:text-orange-700'}`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, idx) => (
            <div key={project.title} className="h-full">
              <ProjectCard project={project} index={idx} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

