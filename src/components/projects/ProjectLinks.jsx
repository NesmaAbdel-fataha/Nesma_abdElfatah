import { ArrowUpRight } from 'lucide-react';

function GithubIcon({ className = 'h-4 w-4' }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 .5a12 12 0 0 0-3.8 23.1c.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.4-4-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

function LinkButton({ href, label, icon: Icon, disabled }) {
  const isComingSoon = disabled || !href;

  return (
    <a
      className={`inline-flex items-center justify-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600/40 ${
        isComingSoon
          ? 'cursor-not-allowed border border-orange-100 bg-orange-50/60 text-slate-500'
          : 'border border-orange-100 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-orange-200 hover:text-orange-700'
      }`}
      href={isComingSoon ? undefined : href}
      target={isComingSoon ? undefined : '_blank'}
      rel={isComingSoon ? undefined : 'noreferrer'}
      aria-disabled={isComingSoon}
    >
      {Icon ? <Icon className="h-4 w-4" /> : <GithubIcon className="h-4 w-4" />}
      {label}
      {!isComingSoon ? <ArrowUpRight className="h-4 w-4" /> : null}
    </a>
  );
}

function ExternalLinkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="h-4 w-4">
      <path d="M14 3h7v7" />
      <path d="M10 14 21 3" />
      <path d="M21 14v6H3V3h6" />
    </svg>
  );
}

export default function ProjectLinks({ project }) {
  const github = project?.github;
  const live = project?.link;

  return (
    <div className="flex flex-wrap gap-3">
      <LinkButton href={github} label={github ? 'GitHub' : 'Coming Soon'} icon={GithubIcon} disabled={!github} />
      <LinkButton href={live} label={live ? 'Live Demo' : 'Coming Soon'} icon={ExternalLinkIcon} disabled={!live} />
    </div>
  );
}

