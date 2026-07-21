import { useMemo } from 'react';
import { Layers3, Server, BrainCircuit, Globe, Cpu, Bot } from 'lucide-react';
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiBootstrap,
  SiRedux,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiMongoose,
  SiJsonwebtokens,
  SiGraphql,
  SiOpenai,
  SiGit,
  SiGithub,
  SiPostman,
  SiVercel,
  SiRender,
  SiDocker,
  SiVscodium,
} from 'react-icons/si';
import SectionHeading from '../SectionHeading';
import { useTheme } from '../../context/ThemeContext';

const categories = [
  {
    title: 'Frontend Development',
    subtitle: 'Building responsive and interactive user interfaces.',
    icon: Layers3,
    skills: ['React', 'JavaScript', 'TypeScript', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap', 'Redux'],
  },
  {
    title: 'Backend Development',
    subtitle: 'Designing scalable APIs and server-side applications.',
    icon: Server,
    skills: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'REST API', 'GraphQL'],
  },
  {
    title: 'AI & Developer Tools',
    subtitle: 'Modern tools for AI integration and development workflow.',
    icon: BrainCircuit,
    skills: ['OpenAI API', 'RAG', 'AI Agents', 'Git', 'GitHub', 'Postman', 'Vercel', 'Render', 'Docker', 'VS Code'],
  },
];

const techIcons = {
  'React': SiReact,
  'JavaScript': SiJavascript,
  'TypeScript': SiTypescript,
  'HTML5': SiHtml5,
  'CSS3': SiCss,
  'Tailwind CSS': SiTailwindcss,
  'Bootstrap': SiBootstrap,
  'Redux': SiRedux,
  'Node.js': SiNodedotjs,
  'Express.js': SiExpress,
  'MongoDB': SiMongodb,
  'Mongoose': SiMongoose,
  'JWT': SiJsonwebtokens,
  'REST API': Globe,
  'GraphQL': SiGraphql,
  'OpenAI API': SiOpenai,
  'RAG': Cpu,
  'AI Agents': Bot,
  'Git': SiGit,
  'GitHub': SiGithub,
  'Postman': SiPostman,
  'Vercel': SiVercel,
  'Render': SiRender,
  'Docker': SiDocker,
  'VS Code': SiVscodium,
};

export default function SkillsSection() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const skillsTotal = useMemo(() => categories.reduce((acc, cat) => acc + cat.skills.length, 0), []);

  return (
    <section id="skills" className="py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-10">
          <SectionHeading
            eyebrow="Skills"
            title="A strong technical toolkit for product delivery and modern web engineering."
            description="The stack below reflects the core capabilities I use to ship polished frontend experiences, reliable backend systems, and AI-enabled features."
          />
          <div className={`self-start lg:self-auto rounded-full border px-4 py-2 text-sm font-medium shadow-sm transition-colors ${
            isDark ? 'border-slate-800 bg-slate-900/80 text-slate-300' : 'border-slate-200 bg-white/80 text-slate-600'
          }`}>
            {skillsTotal} technical capabilities
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {categories.map((category) => {
            const Icon = category.icon;
            return (
              <div
                key={category.title}
                className={`flex flex-col h-full rounded-[20px] border p-6 shadow-[0_8px_30px_rgba(249,115,22,0.03)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] bg-white/60 dark:bg-slate-900/60 backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_40px_rgba(249,115,22,0.06)] dark:hover:shadow-[0_20px_40px_rgba(0,0,0,0.4)] ${
                  isDark ? 'border-slate-800' : 'border-orange-100'
                }`}
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-4">
                  <div className={`rounded-2xl p-3 flex items-center justify-center ${
                    isDark ? 'bg-orange-500/10 text-orange-400' : 'bg-orange-50 text-orange-600'
                  }`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className={`text-lg font-bold tracking-tight ${isDark ? 'text-slate-100' : 'text-slate-900'}`}>
                    {category.title}
                  </h3>
                </div>

                {/* Subtitle */}
                <p className={`text-sm mb-6 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                  {category.subtitle}
                </p>

                {/* Tech Pills */}
                <div className="flex flex-wrap gap-2 mt-auto">
                  {category.skills.map((tech) => {
                    const TechIcon = techIcons[tech];
                    return (
                      <div
                        key={tech}
                        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border transition-all duration-200 cursor-default select-none ${
                          isDark
                            ? 'border-slate-800 bg-slate-900/40 text-slate-300 hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-orange-400'
                            : 'border-orange-100/50 bg-orange-50/20 text-slate-700 hover:border-orange-500/30 hover:bg-orange-500/5 hover:text-orange-600'
                        }`}
                      >
                        {TechIcon && <TechIcon className="w-3.5 h-3.5 text-orange-500" />}
                        <span>{tech}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


