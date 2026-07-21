import { useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Image as ImageIcon, Monitor, Sparkles, Trophy, Users, Calendar, HelpCircle, Layers, Settings, Compass } from 'lucide-react';
import { FaGithub } from 'react-icons/fa';
import { projects } from '../../data/project';

function DetailCard({ title, icon: Icon, children }) {
  return (
    <div className="rounded-[24px] border border-orange-100/70 bg-white/80 p-6 shadow-xs backdrop-blur-md dark:border-orange-500/20 dark:bg-slate-900/70">
      <div className="flex items-center gap-2.5 mb-3">
        {Icon && (
          <div className="rounded-xl bg-orange-50 p-2 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
            <Icon className="h-4.5 w-4.5" />
          </div>
        )}
        <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">{title}</h3>
      </div>
      <div className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">{children}</div>
    </div>
  );
}

export default function CaseStudy() {
  const { slug } = useParams();

  // Find the current project
  const projectIndex = useMemo(() => {
    return projects.findIndex((item) => item.slug === slug);
  }, [slug]);

  const project = useMemo(() => {
    return projects[projectIndex];
  }, [projectIndex]);

  // Find the next project for bottom navigation
  const nextProject = useMemo(() => {
    if (projectIndex === -1) return null;
    const nextIdx = (projectIndex + 1) % projects.length;
    return projects[nextIdx];
  }, [projectIndex]);

  // Load project screenshots dynamically from assets
  const gallery = useMemo(() => {
    if (!project) return [];
    try {
      const modules = import.meta.glob('../../assets/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}', { eager: true });
      const allImages = Object.entries(modules)
        .map(([path, mod]) => ({
          src: mod.default?.src ?? mod.default ?? path,
          name: path.split('/').pop()
        }));

      if (project.slug === 'smartbite') {
        // Return SmartBite screenshots
        return allImages.filter((item) => /agent|order|notif|ai/i.test(item.name));
      }
      
      // Look for any image named with the project slug
      const matched = allImages.filter((item) => new RegExp(project.slug, 'i').test(item.name));
      if (matched.length > 0) return matched;

      return [];
    } catch (e) {
      console.error('Error importing screenshots', e);
      return [];
    }
  }, [project]);

  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Scroll to top on navigation/slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [slug]);

  // Update browser tab title
  useEffect(() => {
    if (project) {
      document.title = `${project.title} Case Study | Nesma Abdel Fattah`;
    }
    return () => {
      document.title = 'Nesma Abdel Fattah';
    };
  }, [project]);

  const nextImage = () => {
    if (gallery.length === 0) return;
    setActiveImage((current) => (current + 1) % gallery.length);
  };

  const prevImage = () => {
    if (gallery.length === 0) return;
    setActiveImage((current) => (current - 1 + gallery.length) % gallery.length);
  };

  if (!project) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-slate-950 text-slate-100">
        <h2 className="text-2xl font-bold">Case Study Not Found</h2>
        <Link to="/" className="mt-4 rounded-full bg-orange-600 px-6 py-2.5 font-semibold text-white">
          Back to Portfolio
        </Link>
      </div>
    );
  }

  const currentImage = gallery[activeImage] || null;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(251,146,60,0.12),transparent_36%)] text-slate-800 dark:text-slate-200">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/80 px-4 py-2 text-sm font-semibold text-slate-700 shadow-xs transition hover:border-orange-300 hover:text-orange-700 dark:border-orange-500/20 dark:bg-slate-900/70 dark:text-slate-300"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </Link>

        {/* Case Study Header Hero */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.5 }} 
          className="mt-8 rounded-[32px] border border-orange-100/70 bg-white/80 p-6 shadow-[0_20px_50px_rgba(15,23,42,0.06)] backdrop-blur-md dark:border-orange-500/20 dark:bg-slate-900/70 sm:p-10"
        >
          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300 animate-pulse">
                <Sparkles className="h-3.5 w-3.5" />
                {project.category} Case Study
              </div>
              
              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 sm:text-4xl">
                {project.title}
              </h1>
              
              <p className="mt-4 text-base leading-relaxed text-slate-600 dark:text-slate-400">
                {project.description}
              </p>
              
              <div className="mt-5 flex flex-wrap gap-1.5">
                {project.tech.map((tech) => (
                  <span 
                    key={tech} 
                    className="rounded-full border border-orange-100 bg-orange-50/80 px-2.5 py-1 text-xs font-medium text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Header Action Buttons */}
              <div className="mt-8 flex flex-wrap gap-3">
                {project.link && (
                  <a 
                    href={project.link} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex h-11 items-center gap-2 rounded-full bg-linear-to-r from-orange-600 to-orange-500 px-5 text-sm font-bold text-white shadow-[0_12px_28px_rgba(249,115,22,0.18)] transition hover:-translate-y-0.5"
                  >
                    <Monitor className="h-4 w-4" />
                    Live Demo
                  </a>
                )}
                {project.github && (
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="inline-flex h-11 items-center gap-2 rounded-full border border-slate-200 bg-white px-5 text-sm font-bold text-slate-700 shadow-xs transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50/70 hover:text-orange-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
                  >
                    <FaGithub className="h-4.5 w-4.5" />
                    GitHub Repo
                  </a>
                )}
              </div>
            </div>

            {/* Project Specs Grid */}
            <div className="rounded-[24px] border border-orange-100/70 bg-[linear-gradient(135deg,rgba(255,247,237,0.85),rgba(255,255,255,0.95))] p-5 shadow-xs dark:border-orange-500/20 dark:bg-slate-950/40">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-4 px-1">
                Project Metadata
              </h3>
              
              <div className="grid gap-3 sm:grid-cols-2">
                {/* Timeline */}
                <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 dark:border-slate-750 dark:bg-slate-900/80 shadow-2xs">
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
                    <Calendar className="h-4 w-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Timeline</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{project.timeline || 'N/A'}</p>
                </div>

                {/* Team Size */}
                <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 dark:border-slate-750 dark:bg-slate-900/80 shadow-2xs">
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
                    <Users className="h-4 w-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Team Size</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{project.teamSize || '1 developer'}</p>
                </div>

                {/* Role / Category */}
                <div className="rounded-2xl border border-slate-200/80 bg-white/95 p-4 dark:border-slate-750 dark:bg-slate-900/80 shadow-2xs sm:col-span-2">
                  <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 mb-1">
                    <Trophy className="h-4 w-4" />
                    <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">Key Focus / Responsibilities</span>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    {(project.responsibilities || []).slice(0, 3).join(' • ') || 'Frontend & Backend Architecture'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Narrative Sections Grid */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          <DetailCard title="Overview" icon={Compass}>
            <p>
              {project.title} was built to resolve key business workflows. It provides a structured, modern portal
              with clean operational rules, reliable data manipulation, and user-centric navigation schemas.
            </p>
          </DetailCard>

          <DetailCard title="Problem Statement" icon={HelpCircle}>
            <p>{project.problem}</p>
          </DetailCard>

          <DetailCard title="The Solution" icon={Trophy}>
            <p>{project.solution}</p>
          </DetailCard>

          <DetailCard title="My Responsibilities" icon={Settings}>
            <ul className="list-disc list-inside space-y-1">
              {(project.responsibilities || []).map((resp) => (
                <li key={resp}>{resp}</li>
              ))}
            </ul>
          </DetailCard>
        </section>

        {/* Key Features & Architecture */}
        <section className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Features */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.45 }} 
            className="rounded-[32px] border border-orange-100/70 bg-white/80 p-6 shadow-xs backdrop-blur-md dark:border-orange-500/20 dark:bg-slate-900/70"
          >
            <div className="flex items-center gap-2.5">
              <div className="rounded-2xl bg-orange-50 p-2 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-350">Product Capabilites</p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Key Features Implemented</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-2.5 sm:grid-cols-2">
              {(project.features || []).map((feature) => (
                <div 
                  key={feature} 
                  className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-3 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-850/60 dark:text-slate-300"
                >
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Architecture */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05 }} 
            className="rounded-[32px] border border-orange-100/70 bg-white/80 p-6 shadow-xs backdrop-blur-md dark:border-orange-500/20 dark:bg-slate-900/70"
          >
            <div className="flex items-center gap-2.5">
              <div className="rounded-2xl bg-orange-50 p-2 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300">
                <Layers className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-350">System Design</p>
                <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">Architecture Summary</h2>
              </div>
            </div>
            <p className="mt-5 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
              {project.architecture}
            </p>
          </motion.div>
        </section>

        {/* Challenges & Technologies */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Challenges */}
          <div className="rounded-[32px] border border-orange-100/70 bg-white/80 p-6 shadow-xs backdrop-blur-md dark:border-orange-500/20 dark:bg-slate-900/70 sm:p-8">
            <h3 className="text-base font-bold uppercase tracking-wider text-orange-650 dark:text-orange-400">
              Technical Challenges
            </h3>
            <h2 className="text-xl font-bold mt-1 text-slate-900 dark:text-slate-100">
              Overcoming Engineering Constraints
            </h2>
            <div className="mt-5 space-y-3">
              {(project.challenges || []).map((challenge, idx) => (
                <div 
                  key={challenge} 
                  className="rounded-2xl border border-slate-250 bg-slate-50/50 p-4 text-xs leading-relaxed text-slate-700 dark:border-slate-800 dark:bg-slate-900/40 dark:text-slate-350"
                >
                  <span className="font-bold text-orange-600 dark:text-orange-400 mr-1.5">0{idx + 1}.</span>
                  {challenge}
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Tech */}
          <div className="rounded-[32px] border border-orange-100/70 bg-white/80 p-6 shadow-xs backdrop-blur-md dark:border-orange-500/20 dark:bg-slate-900/70 sm:p-8 flex flex-col">
            <h3 className="text-base font-bold uppercase tracking-wider text-orange-655 dark:text-orange-400">
              Technology Stack
            </h3>
            <h2 className="text-xl font-bold mt-1 text-slate-900 dark:text-slate-100">
              Tools & Frameworks
            </h2>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tech.map((t) => (
                <span 
                  key={t} 
                  className="rounded-full border border-slate-200 bg-white px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-300 shadow-2xs"
                >
                  {t}
                </span>
              ))}
            </div>
            
            {/* Tech stats info */}
            <div className="mt-auto pt-6 grid grid-cols-2 gap-3 border-t border-slate-100 dark:border-slate-800">
              {(project.stats || []).map((stat) => (
                <div key={stat} className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-orange-500" />
                  {stat}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Gallery / Placeholders Section */}
        {gallery.length > 0 ? (
          <section className="mt-8 rounded-[32px] border border-orange-100/70 bg-white/80 p-6 shadow-xs backdrop-blur-md dark:border-orange-500/20 dark:bg-slate-900/70 sm:p-8">
            <div className="flex flex-col gap-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-orange-700 dark:text-orange-400">Gallery</p>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Product Interface Walkthrough</h2>
            </div>
            
            <div className="mt-6">
              {/* Main image presentation */}
              <div className="overflow-hidden rounded-[24px] border border-slate-250 bg-slate-100 dark:border-slate-800 dark:bg-slate-950 p-2 relative group">
                <img 
                  src={currentImage?.src} 
                  alt={currentImage?.name || 'Screenshot'} 
                  loading="lazy" 
                  className="h-[300px] w-full rounded-[18px] object-cover sm:h-[420px] cursor-zoom-in transition-all duration-300 hover:brightness-95"
                  onClick={() => setIsLightboxOpen(true)}
                />
              </div>

              {/* Prev / Next controls */}
              <div className="mt-4 flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-900/80 dark:text-slate-350">
                  <ImageIcon className="h-3.5 w-3.5 text-orange-500" /> 
                  {activeImage + 1} / {gallery.length}
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    type="button" 
                    onClick={prevImage} 
                    className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-2xs transition hover:border-orange-300 hover:text-orange-700 dark:border-slate-750 dark:bg-slate-850 dark:text-slate-300"
                  >
                    <ArrowLeft className="h-4 w-4" />
                  </button>
                  <button 
                    type="button" 
                    onClick={nextImage} 
                    className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 shadow-2xs transition hover:border-orange-300 hover:text-orange-700 dark:border-slate-750 dark:bg-slate-850 dark:text-slate-300"
                  >
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Thumbnail row */}
              <div className="mt-4 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {gallery.map((image, index) => (
                  <button 
                    key={image.src + index} 
                    type="button" 
                    onClick={() => setActiveImage(index)} 
                    className={`overflow-hidden rounded-xl border-2 transition ${activeImage === index ? 'border-orange-500 shadow-md' : 'border-slate-200 dark:border-slate-800'} bg-white p-1`}
                  >
                    <img src={image.src} alt={image.name} loading="lazy" className="h-16 w-full rounded-[6px] object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </section>
        ) : (
          /* Notice for no screenshots */
          <section className="mt-8 rounded-[32px] border border-orange-100/70 bg-white/80 p-8 shadow-xs backdrop-blur-md dark:border-orange-500/20 dark:bg-slate-900/70 text-center">
            <div className="max-w-md mx-auto">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400 mb-4">
                <ImageIcon className="h-6 w-6" />
              </div>
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Gallery Notice</h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                Production interface screenshots are omitted under professional nondisclosure and system confidentiality agreements. Please browse the GitHub repository below for full source code access.
              </p>
            </div>
          </section>
        )}

        {/* Retrospectives: Lessons & Future Improvements */}
        <section className="mt-8 grid gap-6 md:grid-cols-2">
          {/* Lessons Learned */}
          <DetailCard title="Lessons Learned" icon={Compass}>
            <p>
              {project.title} proved that strong architectural foundations and robust API modeling are essential to prevent feature creep. 
              Implementing clean, reusable components and validating edge cases early in the design cycle accelerated development and reduced deployment overhead.
            </p>
          </DetailCard>

          {/* Future Improvements */}
          <DetailCard title="Future Improvements & Roadmap" icon={Settings}>
            <p>{project.futureImprovements}</p>
          </DetailCard>
        </section>

        {/* Bottom External Links */}
        <div className="mt-8 flex flex-wrap justify-between items-center gap-4 border-t pt-6 border-slate-200 dark:border-slate-800">
          <div className="flex flex-wrap gap-2.5">
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:-translate-y-0.5 hover:border-orange-350 hover:text-orange-700 dark:border-orange-500/20 dark:bg-slate-900/70 dark:text-slate-300"
              >
                <Monitor className="h-4 w-4" />
                Launch Application
              </a>
            )}
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noreferrer" 
                className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-2xs transition hover:-translate-y-0.5 hover:border-orange-350 hover:text-orange-700 dark:border-orange-500/20 dark:bg-slate-900/70 dark:text-slate-300"
              >
                <FaGithub className="h-4 w-4" />
                Explore Repository
              </a>
            )}
          </div>

          {/* Next Project Bottom Navigation */}
          {nextProject && (
            <Link 
              to={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-650 to-orange-500 px-5 py-2.5 text-xs font-bold text-white shadow-xs transition hover:-translate-y-0.5"
            >
              Next Project: {nextProject.title}
              <ArrowRight className="h-4 w-4 animate-bounce-horizontal" />
            </Link>
          )}
        </div>

      </div>

      {/* Lightbox Modal overlay */}
      <AnimatePresence>
        {isLightboxOpen && currentImage && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/90 p-4 backdrop-blur-xs"
          >
            <motion.div 
              initial={{ scale: 0.97, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              exit={{ scale: 0.97, opacity: 0 }} 
              className="relative w-full max-w-5xl rounded-[24px] border border-white/10 bg-slate-900/90 p-2.5 shadow-2xl"
            >
              <button 
                type="button" 
                onClick={() => setIsLightboxOpen(false)} 
                className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/60 px-3.5 py-1.5 text-xs font-bold text-white hover:bg-black/80"
              >
                Close
              </button>
              
              <img 
                src={currentImage.src} 
                alt={currentImage.name} 
                className="max-h-[80vh] w-full rounded-[14px] object-contain" 
              />
              
              <div className="mt-3 flex items-center justify-between gap-3 px-2">
                <div className="text-xs font-bold text-slate-300">{currentImage.name}</div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={prevImage} className="rounded-full border border-white/10 bg-white/10 p-2 text-white hover:bg-white/20">
                    <ArrowLeft className="h-3.5 w-3.5" />
                  </button>
                  <button type="button" onClick={nextImage} className="rounded-full border border-white/10 bg-white/10 p-2 text-white hover:bg-white/20">
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
