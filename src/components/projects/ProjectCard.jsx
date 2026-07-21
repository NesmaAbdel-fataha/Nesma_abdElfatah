import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { BookOpen, ExternalLink, Star } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';

export default function ProjectCard({ project, index = 0 }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <article
      className={`group relative flex h-full min-h-[290px] w-full flex-col justify-between overflow-hidden rounded-[20px] border p-5 shadow-[0_8px_30px_rgba(249,115,22,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white/60 dark:bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(249,115,22,0.06)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${
        isDark ? 'border-slate-800' : 'border-orange-100/70'
      }`}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      {/* Top Accent Line */}
      <div className="absolute top-0 inset-x-0 h-1 bg-linear-to-r from-orange-600 to-orange-500 opacity-80" />

      {/* Main content wrapper */}
      <div className="flex flex-col">
        {/* Category & Title */}
        <div className="flex items-center justify-between">
          <span className={`rounded-md px-2 py-0.5 text-[9px] font-extrabold uppercase tracking-wider ${isDark ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-50 text-orange-700'}`}>
            {project.category}
          </span>
          {project.featured && (
            <span className="flex items-center gap-1 text-[9px] font-bold text-orange-500 uppercase tracking-widest">
              <Star className="w-3 h-3 fill-orange-500 text-orange-500 animate-pulse" />
              Featured
            </span>
          )}
        </div>

        <h3 className={`mt-3 text-base font-bold tracking-tight transition-colors group-hover:text-orange-500 ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
          {project.title}
        </h3>

        {/* Short description - strictly capped at 3 lines for readability */}
        <p className={`mt-2 text-xs leading-relaxed line-clamp-3 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
          {project.description}
        </p>

        {/* Tech Stack Pills */}
        <div className="mt-4 flex flex-wrap gap-1">
          {(project.tech || []).slice(0, 5).map((t) => (
            <span 
              key={t} 
              className={`rounded-md px-2 py-0.5 text-[10px] font-semibold border transition-colors duration-200 ${
                isDark 
                  ? 'bg-slate-800/80 text-slate-300 border-slate-750 hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-orange-400' 
                  : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-orange-600'
              }`}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 5 && (
            <span className={`text-[10px] font-bold self-center px-1 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>
              +{project.tech.length - 5}
            </span>
          )}
        </div>
      </div>

      {/* Card Actions (3 Buttons aligned at the bottom) */}
      <div className="mt-6 pt-4 border-t border-slate-100/50 dark:border-slate-800/50">
        <div className="grid grid-cols-3 gap-2">
          {/* View Case Study */}
          <Link 
            to={`/projects/${project.slug}`} 
            className="inline-flex h-9 items-center justify-center gap-1 rounded-lg bg-orange-600 hover:bg-orange-700 px-1 text-center text-[10px] font-bold text-white transition hover:-translate-y-0.5 shadow-sm"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span>Case Study</span>
          </Link>

          {/* Live Demo */}
          <a 
            href={project.link || '#'} 
            target="_blank" 
            rel="noreferrer"
            className={`inline-flex h-9 items-center justify-center gap-1 rounded-lg border px-1 text-center text-[10px] font-bold transition hover:-translate-y-0.5 ${
              isDark 
                ? 'border-slate-700 bg-slate-800/60 text-slate-200 hover:border-orange-500 hover:text-orange-400 hover:bg-orange-500/5' 
                : 'border-slate-200 bg-white text-slate-700 hover:border-orange-200 hover:text-orange-700 hover:bg-orange-50/20'
            }`}
          >
            <ExternalLink className="w-3.5 h-3.5 text-orange-500" />
            <span>Live Demo</span>
          </a>

          {/* GitHub */}
          <a 
            href={project.github || '#'} 
            target="_blank" 
            rel="noreferrer"
            className={`inline-flex h-9 items-center justify-center gap-1 rounded-lg border px-1 text-center text-[10px] font-bold transition hover:-translate-y-0.5 ${
              isDark 
                ? 'border-slate-700 bg-slate-800/60 text-slate-200 hover:border-orange-500 hover:text-orange-400 hover:bg-orange-500/5' 
                : 'border-slate-200 bg-white text-slate-700 hover:border-orange-200 hover:text-orange-700 hover:bg-orange-50/20'
            }`}
          >
            <FaGithub className="w-3.5 h-3.5 text-orange-500" />
            <span>GitHub</span>
          </a>
        </div>
      </div>
    </article>
  );
}
