import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Code2, ExternalLink, Image as ImageIcon, Monitor, Sparkles, Trophy } from 'lucide-react';
import { FaGithub } from "react-icons/fa";
import { projects } from '../data/project';
import SectionHeading from './SectionHeading';
import agent from "../assets/agent.PNG";
import order from "../assets/order.PNG";
import aiAssistant from "../assets/ai asstent.PNG";
import notification from "../assets/notif.PNG";
const project = projects.find((item) => item.title === 'SmartBite');

const galleryImages = [
  agent,
  order,
  aiAssistant,
  notification,
].filter(Boolean);

function importAllImages() {
  const modules = import.meta.glob('../assets/*.{png,jpg,jpeg,webp}', { eager: true });
  return Object.entries(modules)
    .map(([path, mod]) => ({ src: mod.default?.src ?? mod.default ?? path, name: path.split('/').pop() }))
    .filter((item) => /smart|bites|agent|order|notif|ai/i.test(item.name));
}

const smartImages = importAllImages();

const gallery = smartImages.length > 0 ? smartImages : galleryImages.map((src) => ({ src, name: 'SmartBite Screenshot' }));

function DetailCard({ title, children }) {
  return (
    <div className="rounded-[24px] border border-orange-100/70 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-orange-500/20 dark:bg-slate-900/70">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{title}</h3>
      <div className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-400">{children}</div>
    </div>
  );
}

export default function SmartBiteCaseStudy() {
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  useEffect(() => {
    document.title = 'SmartBite Case Study | Nesma Abdel Fattah';
    return () => {
      document.title = 'Nesma Abdel Fattah';
    };
  }, []);

  const currentImage = gallery[activeImage] ?? gallery[0];

  const stats = useMemo(() => [
    { label: 'APIs', value: '20+' },
    { label: 'Languages', value: 'AR / EN' },
    { label: 'Users', value: 'Roles' },
    { label: 'Platform', value: 'Responsive' },
  ], []);

  const nextImage = () => setActiveImage((current) => (current + 1) % gallery.length);
  const prevImage = () => setActiveImage((current) => (current - 1 + gallery.length) % gallery.length);

  if (!project) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(251,146,60,0.12),transparent_36%)] text-slate-800 dark:text-slate-200">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-16">
        <a href="/" className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 shadow-sm transition hover:border-orange-300 hover:text-orange-700 dark:border-orange-500/20 dark:bg-slate-900/70 dark:text-slate-300">
          <ArrowLeft className="h-4 w-4" />
          Back to portfolio
        </a>

        <motion.header initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mt-8 rounded-[32px] border border-orange-100/70 bg-white/80 p-8 shadow-[0_26px_80px_rgba(15,23,42,0.08)] backdrop-blur dark:border-orange-500/20 dark:bg-slate-900/70 sm:p-10">
          <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200/70 bg-orange-50 px-3 py-1.5 text-sm font-medium text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">
                <Sparkles className="h-4 w-4" />
                Full Stack MERN Case Study
              </div>
              <h1 className="mt-5 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 sm:text-5xl">{project.title}</h1>
              <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-400">{project.description}</p>
              <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span key={tech} className="rounded-full border border-orange-100 bg-orange-50/80 px-3 py-1.5 text-sm font-medium text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">{tech}</span>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-600 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_35px_rgba(249,115,22,0.2)] transition hover:-translate-y-0.5">
                  <ExternalLink className="h-4 w-4" />
                  Live Demo
                </a>
                <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-200 hover:bg-orange-50/70 hover:text-orange-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                 <FaGithub className="h-4 w-4" />
GitHub
                </a>
              </div>
            </div>

            <div className="rounded-[28px] border border-orange-100/70 bg-[linear-gradient(135deg,rgba(255,247,237,0.95),rgba(255,255,255,0.98))] p-5 shadow-sm dark:border-orange-500/20 dark:bg-slate-950/70">
              <div className="grid gap-3 sm:grid-cols-2">
                {stats.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 dark:border-slate-700 dark:bg-slate-900/80">
                    <p className="text-2xl font-semibold text-slate-900 dark:text-slate-100">{stat.value}</p>
                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.header>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <DetailCard title="Overview">
            <p>SmartBite is a restaurant management system built to support ordering, operations, and customer interaction in one unified platform. It combines an intuitive experience for users with strong admin controls for business workflows.</p>
          </DetailCard>
          <DetailCard title="Problem">
            <p>The business needed a reliable, multilingual platform that could support real-world restaurant operations while exposing modern AI features without sacrificing usability.</p>
          </DetailCard>
          <DetailCard title="Solution">
            <p>I helped build a full-stack product with a modular MERN architecture, secure authentication, role-aware access, AI support, and a responsive interface that worked well in Arabic and English.</p>
          </DetailCard>
          <DetailCard title="My Role">
            <p>I contributed across the product lifecycle, including backend architecture, authentication, API design, and frontend experience decisions for a polished end-user journey.</p>
          </DetailCard>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="rounded-[32px] border border-orange-100/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-orange-500/20 dark:bg-slate-900/70">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-50 p-2.5 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300"><Trophy className="h-5 w-5" /></div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700 dark:text-orange-300">Key Features</p>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Built for real restaurant workflows</h2>
              </div>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {project.features.map((feature) => (
                <div key={feature} className="rounded-2xl border border-slate-200/80 bg-slate-50/70 p-3 text-sm font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300">{feature}</div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, delay: 0.05 }} className="rounded-[32px] border border-orange-100/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-orange-500/20 dark:bg-slate-900/70">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl bg-orange-50 p-2.5 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300"><Code2 className="h-5 w-5" /></div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-orange-700 dark:text-orange-300">Architecture</p>
                <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">Designed for scalability</h2>
              </div>
            </div>
            <p className="mt-5 text-sm leading-8 text-slate-600 dark:text-slate-400">{project.architecture}</p>
          </motion.div>
        </section>

        <section className="mt-10 rounded-[32px] border border-orange-100/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-orange-500/20 dark:bg-slate-900/70 sm:p-8">
          <SectionHeading eyebrow="Technical Challenges" title="The work required strong product judgment as well as engineering discipline." description="The most important challenges were balancing smooth UX with secure operations and complex business rules." />
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {project.challenges.map((challenge) => (
              <div key={challenge} className="rounded-[24px] border border-slate-200/80 bg-slate-50/70 p-4 text-sm leading-7 text-slate-700 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300">{challenge}</div>
            ))}
          </div>
        </section>

        <section className="mt-10 rounded-[32px] border border-orange-100/70 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-orange-500/20 dark:bg-slate-900/70 sm:p-8">
          <SectionHeading eyebrow="Gallery" title="Screenshots from the product experience." description="A closer look at the interface, admin workflow, and AI-powered interactions." />
          <div className="mt-8">
            <div className="overflow-hidden rounded-[28px] border border-slate-200/80 bg-slate-100/70 p-3 dark:border-slate-700 dark:bg-slate-800/70">
              <img src={currentImage?.src} alt={currentImage?.name || 'SmartBite screenshot'} loading="lazy" className="h-[320px] w-full rounded-[22px] object-cover sm:h-[430px]" onClick={() => setIsLightboxOpen(true)} />
            </div>
            <div className="mt-4 flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-600 dark:border-slate-700 dark:bg-slate-800/80 dark:text-slate-300"><ImageIcon className="h-4 w-4" /> {activeImage + 1} / {gallery.length}</div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={prevImage} className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:border-orange-200 hover:text-orange-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"><ArrowLeft className="h-4 w-4" /></button>
                <button type="button" onClick={nextImage} className="rounded-full border border-slate-200 bg-white p-2.5 text-slate-700 shadow-sm transition hover:border-orange-200 hover:text-orange-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"><ArrowRight className="h-4 w-4" /></button>
              </div>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {gallery.map((image, index) => (
                <button key={image.src + index} type="button" onClick={() => setActiveImage(index)} className={`overflow-hidden rounded-2xl border ${activeImage === index ? 'border-orange-400' : 'border-slate-200 dark:border-slate-700'} bg-white/80 p-1.5 shadow-sm`}>
                  <img src={image.src} alt={image.name} loading="lazy" className="h-24 w-full rounded-[14px] object-cover" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <DetailCard title="Technologies">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <span key={tech} className="rounded-full border border-orange-100 bg-orange-50/80 px-3 py-1.5 text-sm font-medium text-orange-700 dark:border-orange-500/20 dark:bg-orange-500/10 dark:text-orange-300">{tech}</span>
              ))}
            </div>
          </DetailCard>
          <DetailCard title="Lessons Learned">
            <p>Good product work requires a careful balance between technical depth and user clarity. The strongest outcomes came from aligning system design with business reality and user expectations.</p>
          </DetailCard>
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <a href={project.link} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-700 dark:border-orange-500/20 dark:bg-slate-900/70 dark:text-slate-300">
            <Monitor className="h-4 w-4" />
            Open Live Demo
          </a>
          <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:border-orange-300 hover:text-orange-700 dark:border-orange-500/20 dark:bg-slate-900/70 dark:text-slate-300">
           <FaGithub className="h-4 w-4" />
Browse Repository
          </a>
        </div>
      </div>

      <AnimatePresence>
        {isLightboxOpen ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md">
            <motion.div initial={{ scale: 0.96, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.96, opacity: 0 }} className="relative w-full max-w-5xl rounded-[28px] border border-white/10 bg-slate-900/90 p-3 shadow-2xl">
              <button type="button" onClick={() => setIsLightboxOpen(false)} className="absolute right-4 top-4 z-10 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm text-white">Close</button>
              <img src={currentImage?.src} alt={currentImage?.name || 'SmartBite screenshot'} className="max-h-[80vh] w-full rounded-[22px] object-contain" />
              <div className="mt-3 flex items-center justify-between gap-3 px-1">
                <div className="text-sm text-slate-300">{currentImage?.name}</div>
                <div className="flex items-center gap-2">
                  <button type="button" onClick={prevImage} className="rounded-full border border-white/10 bg-white/10 p-2.5 text-white"><ArrowLeft className="h-4 w-4" /></button>
                  <button type="button" onClick={nextImage} className="rounded-full border border-white/10 bg-white/10 p-2.5 text-white"><ArrowRight className="h-4 w-4" /></button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
