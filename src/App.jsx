import { Suspense, lazy, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, BrainCircuit, Code2, Download, Mail, Sparkles } from 'lucide-react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { HashRouter, Navigate, Route, Routes, useParams } from 'react-router-dom';
import Navv from './components/Navv';
import SectionHeading from './components/SectionHeading';
import ScrollToTop from './components/ScrollToTop';
import { heroData } from './data/hero';
import { profileData } from './data/profile';
import profileImage from './assets/نسمة.png';

// NOTE: image replacement requested for About section.
// Keeping the import path aligned with the existing detected asset file extension.

import { useTheme } from './context/ThemeContext';

const ProjectsSection = lazy(() => import('./components/projects/ProjectsSection'));
const SkillsSection = lazy(() => import('./components/skills/SkillsSection'));
const CaseStudy = lazy(() => import('./components/projects/CaseStudy'));

const socialIconMap = {
  Github: FaGithub,
  Linkedin: FaLinkedin,
  Mail,
};

function HomePage() {
  const { theme } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const sections = ['home', 'about', 'services', 'projects', 'skills', 'experience', 'certificates', 'contact']
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: 0.2 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = documentHeight > 0 ? (scrollTop / documentHeight) * 100 : 0;
      setScrollProgress(nextProgress);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'bg-slate-950 text-slate-100' : 'bg-[#FFFBF5] text-slate-800'}`}>
      <div className="fixed top-0 left-0 z-[70] h-1 rounded-r-full bg-linear-to-r from-orange-600 via-orange-500 to-amber-400 transition-[width]" style={{ width: `${scrollProgress}%` }} />
      <div className="relative overflow-hidden">
        <div className={`absolute inset-0 -z-10 ${isDark ? 'bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.16),transparent_35%),radial-gradient(circle_at_bottom_right,rgba(251,146,60,0.14),transparent_38%)]' : 'bg-[radial-gradient(circle_at_top_left,rgba(249,115,22,0.14),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(251,146,60,0.14),transparent_40%)]'}`} />

        <Navv activeSection={activeSection} />

        <header id="home" className="relative mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12 min-h-[calc(100vh-85px)] flex flex-col justify-center animate-fade-in">
          <span id="about" className="absolute top-0" />
          <div className="grid items-center gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:gap-12">
            
            {/* Left Column: Hero Content & Stats & Actions */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }} 
              animate={{ opacity: 1, y: 0 }} 
              transition={{ duration: 0.5 }} 
              className="flex flex-col justify-between"
            >
              <div>
                {/* Greeting Badge */}
                <div className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-semibold shadow-xs ${isDark ? 'border-orange-500/30 bg-orange-500/10 text-orange-300' : 'border-orange-200/70 bg-orange-50/80 text-orange-700'}`}>
                  <Sparkles className="h-3.5 w-3.5" />
                  {heroData.greeting}
                </div>

                {/* Name */}
                <h1 className={`mt-3 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                  <span className="block">{heroData.name}</span>
                  <span className="mt-1 block bg-linear-to-r from-orange-600 via-orange-500 to-amber-400 bg-clip-text text-transparent text-2xl sm:text-3xl lg:text-4xl">
                    {heroData.roles[0]}
                  </span>
                </h1>

                {/* Merged Description & About Info */}
                <p className={`mt-4 text-sm leading-relaxed sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {heroData.description}
                  <span className="block mt-2 font-medium">
                    Bachelor of Education • ITI Graduate • Full Stack MERN Developer. Building user-centered, scalable web applications.
                  </span>
                </p>

                {/* Compact badges */}
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {[
                    { icon: '🎓', text: 'B.Ed. Educational Technology' },
                    { icon: '💻', text: 'ITI Graduate' },
                    { icon: '⚛️', text: 'MERN Stack' },
                    { icon: '🤖', text: 'AI Product Builder' },
                  ].map((b) => (
                    <span
                      key={b.text}
                      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors ${
                        isDark
                          ? 'border-slate-800 bg-slate-900/50 text-slate-300'
                          : 'border-orange-100 bg-white/70 text-slate-700'
                      }`}
                    >
                      <span className="text-xs">{b.icon}</span>
                      <span>{b.text}</span>
                    </span>
                  ))}
                </div>

                {/* Primary Action Buttons */}
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a href="#projects" className="inline-flex h-10 items-center gap-1.5 rounded-full bg-linear-to-r from-orange-600 to-orange-500 px-4 text-xs font-semibold text-white shadow-[0_10px_20px_rgba(249,115,22,0.15)] transition hover:-translate-y-0.5">
                    View projects
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>

                  <a href={profileData.hero.downloadCvUrl.direct} target="_blank" rel="noreferrer" className={`inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-xs font-semibold shadow-xs transition hover:-translate-y-0.5 ${isDark ? 'border-slate-700 bg-slate-900/80 text-slate-200 hover:border-orange-500/30 hover:bg-orange-500/10' : 'border-slate-200 bg-white text-slate-700 hover:border-orange-200 hover:bg-orange-50/70'}`}>
                    <Download className="h-3.5 w-3.5" />
                    Resume
                  </a>

                  <a href={`mailto:${profileData.contact.email}`} className={`inline-flex h-10 items-center gap-1.5 rounded-full border px-4 text-xs font-semibold shadow-xs transition hover:-translate-y-0.5 ${isDark ? 'border-slate-700 bg-slate-900/80 text-slate-200 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-300' : 'border-slate-200 bg-white/85 text-slate-700 hover:border-slate-300 hover:bg-slate-50'}`}>
                    <Mail className="h-3.5 w-3.5" />
                    Contact
                  </a>
                </div>
              </div>

              {/* Stats inline */}
              <div className="mt-6 grid grid-cols-3 gap-3 border-t pt-4 border-dashed border-orange-500/15">
                {heroData.stats.map((stat) => (
                  <div key={stat.label} className="leading-tight">
                    <p className={`text-base font-bold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{stat.number}</p>
                    <p className={`text-[11px] font-medium ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{stat.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right Column: Profile Image */}
            <div className="flex flex-col gap-4 w-full">
              <div className="relative overflow-hidden rounded-[20px] dark:bg-slate-900 aspect-[4/5] max-h-[480px] w-full self-center">
                <img
                  src={profileImage}
                  alt="Nesma Abdel Fattah"
                  loading="lazy"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>

            {/* Roles Status, Stack, and Social Icons wrapper */}
            <div className={`w-full lg:col-span-2 rounded-2xl border p-3.5 shadow-sm backdrop-blur-md ${isDark ? 'border-slate-800 bg-slate-900/50' : 'border-slate-200/80 bg-white/80'}`}>
              {/* Availability, Core Stack, and Social wrapper */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full">

                {/* Open for roles status */}
                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <div className={`rounded-lg p-1.5 shrink-0 ${isDark ? 'bg-orange-500/10 text-orange-300' : 'bg-orange-50 text-orange-700'}`}>
                    <BrainCircuit className="h-4 w-4" />
                  </div>
                  <div className="leading-tight">
                    <p className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Availability</p>
                    <p className={`text-xs font-semibold ${isDark ? 'text-slate-200' : 'text-slate-800'}`}>Open for Full-time Roles</p>
                  </div>
                </div>
              
                {/* Core Stack tags */}
                <div className="mt-3 sm:mt-0 w-full sm:w-auto sm:border-l sm:pl-6 border-slate-100 dark:border-slate-800">
                  <p className={`text-[10px] uppercase font-bold tracking-wider ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>Core Stack</p>
                  <div className="mt-1 flex flex-wrap px-6 gap-2 pl-3 border-l pt-2.5 border-slate-100 dark:border-slate-800 sm:border-l-0 sm:pl-0 sm:pt-0 sm:px-0">
                    {profileData.hero.coreStack.map((item) => (
                      <span key={item} className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${isDark ? 'bg-slate-800 text-slate-300' : 'bg-orange-50/60 text-slate-700 border border-orange-100/50'}`}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Social links row */}
                <div className="mt-3 sm:mt-0 flex items-center gap-4 border-l pl-3 pt-2.5 sm:pl-6 sm:pt-0 border-slate-100 dark:border-slate-800 w-full sm:w-auto">
                  {heroData.socialLinks.map((link) => {
                    const Icon = socialIconMap[link.icon] ?? Mail;
                    return (
                      <a 
                        key={link.name} 
                        href={link.name === 'Email' ? `mailto:${link.url}` : link.url} 
                        target="_blank" 
                        rel="noreferrer" 
                        className={`inline-flex items-center justify-center rounded-full p-1.5 transition ${isDark ? 'text-slate-400 hover:bg-slate-800 hover:text-orange-300' : 'text-slate-600 hover:bg-orange-50 hover:text-orange-700'}`}
                        title={link.name}
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </header>
      </div>

      <main>
        <section id="services" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <SectionHeading eyebrow="What I Do" title="End-to-end product development with a strong engineering foundation." description="From polished frontend interfaces to secure APIs and AI-assisted features, I help teams move from idea to launch." />
          <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {profileData.services.map((service) => (
              <div key={service.title} className={`rounded-[24px] border p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(15,23,42,0.08)] ${isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white'}`}>
                <div className={`inline-flex rounded-2xl p-2.5 ${isDark ? 'bg-orange-500/10 text-orange-300' : 'bg-orange-50 text-orange-700'}`}>
                  <Code2 className="h-5 w-5" />
                </div>
                <h3 className={`mt-4 text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{service.title}</h3>
                <p className={`mt-2 text-sm leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{service.description}</p>
              </div>
            ))}
          </div>
        </section>

        <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">Loading projects…</div>}>
          <ProjectsSection />
        </Suspense>
        <Suspense fallback={<div className="mx-auto max-w-6xl px-4 py-6 text-sm text-slate-500">Loading skills…</div>}>
          <SkillsSection />
        </Suspense>

        <section id="experience" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <SectionHeading eyebrow="Experience" title="A timeline of my development journey." description="My background blends education, internship experience, and hands-on product engineering." />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {profileData.experience.items.map((item) => (
              <div key={item.title} className={`rounded-[24px] border p-6 shadow-sm ${isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white'}`}>
                <p className={`text-sm font-semibold uppercase tracking-[0.24em] ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>{item.period}</p>
                <h3 className={`mt-2 text-xl font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{item.title}</h3>
                <p className={`mt-3 text-sm leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="certificates" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <SectionHeading eyebrow="Certificates" title="Credentials that support my engineering journey." description="I continue to strengthen my skills through structured training and practical project work." />
          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {profileData.certificates.map((certificate) => (
              <div key={certificate.title} className={`rounded-[24px] border p-6 shadow-sm ${isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white'}`}>
                <h3 className={`text-lg font-semibold ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>{certificate.title}</h3>
                <p className={`mt-2 text-sm font-medium ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>{certificate.issuer}</p>
                <p className={`mt-3 text-sm leading-7 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{certificate.summary}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
          <div className={`rounded-[32px] border p-8 shadow-[0_24px_70px_rgba(15,23,42,0.08)] sm:p-10 ${isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200/80 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(255,247,237,0.96))]'}`}>
            <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <p className={`text-sm font-semibold uppercase tracking-[0.25em] ${isDark ? 'text-orange-300' : 'text-orange-700'}`}>Contact</p>
                <h2 className={`mt-2 text-3xl font-semibold tracking-tight sm:text-4xl ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>Let&apos;s build something great together.</h2>
                <p className={`mt-3 text-sm leading-7 sm:text-base ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>I am open to freelance collaborations and full-time opportunities where thoughtful engineering, product clarity, and polished execution matter.</p>
              </div>

              <div className="flex flex-wrap gap-3">
                <a href={`mailto:${profileData.contact.email}`} className="inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-600 to-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(249,115,22,0.18)] transition hover:-translate-y-0.5">
                  <Mail className="h-4 w-4" />
                  Email me
                </a>
                <a href={profileData.contact.linkedin} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 ${isDark ? 'border-slate-700 bg-slate-900/80 text-slate-200 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-300' : 'border-slate-200 bg-white text-slate-700 hover:border-orange-200 hover:bg-orange-50/70 hover:text-orange-700'}`}>
                  <FaLinkedin className="h-4 w-4" />
                  LinkedIn
                </a>
                <a href={profileData.contact.github} target="_blank" rel="noreferrer" className={`inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm font-semibold shadow-sm transition hover:-translate-y-0.5 ${isDark ? 'border-slate-700 bg-slate-900/80 text-slate-200 hover:border-orange-500/30 hover:bg-orange-500/10 hover:text-orange-300' : 'border-slate-200 bg-white text-slate-700 hover:border-orange-200 hover:bg-orange-50/70 hover:text-orange-700'}`}>
                  <FaGithub className="h-4 w-4" />
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className={`border-t px-4 py-8 text-center text-sm sm:px-6 lg:px-8 ${isDark ? 'border-slate-800 bg-slate-950/80 text-slate-400' : 'border-slate-200/80 bg-white/80 text-slate-600'}`}>
        <div className="mx-auto flex max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Nesma Abdel Fattah. Crafted for modern web experiences.</p>
          <div className="flex items-center justify-center gap-4">
            <a href="#home" className={`transition ${isDark ? 'hover:text-orange-300' : 'hover:text-orange-700'}`}>Home</a>
            <a href="#about" className={`transition ${isDark ? 'hover:text-orange-300' : 'hover:text-orange-700'}`}>About</a>
            <a href="#projects" className={`transition ${isDark ? 'hover:text-orange-300' : 'hover:text-orange-700'}`}>Projects</a>
            <a href="#contact" className={`transition ${isDark ? 'hover:text-orange-300' : 'hover:text-orange-700'}`}>Contact</a>
          </div>
        </div>
      </footer>

      <ScrollToTop />
    </div>
  );
}

function CaseStudyWrapper() {
  const { slug } = useParams();
  return <CaseStudy key={slug} />;
}

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/case-study/smartbite" element={<Navigate to="/projects/smartbite" replace />} />
        <Route path="/projects/:slug" element={<CaseStudyWrapper />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </HashRouter>
  );
}

export default App;

