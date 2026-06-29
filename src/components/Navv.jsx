import { Code2, Download } from 'lucide-react';

import { profileData } from '../data/profile';

export default function Navv() {
  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200/70 bg-white/75 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2 text-base font-semibold text-slate-900">
          <span className="rounded-full bg-orange-100 p-2 text-orange-600">
            <Code2 className="h-4 w-4" />
          </span>
          Nesma
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <a href="#projects" className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-orange-50 hover:text-orange-700">
            Projects
          </a>
          <a href="#skills" className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-orange-50 hover:text-orange-700">
            Skills
          </a>
          <a href="#contact" className="rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-orange-50 hover:text-orange-700">
            Contact
          </a>

          <a
            href={profileData.hero.downloadCvUrl.direct}
            target="_blank"
            rel="noreferrer"
            className="ml-1 inline-flex items-center gap-2 rounded-full bg-linear-to-r from-orange-600 to-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(249,115,22,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_35px_rgba(249,115,22,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-600/40"
          >
            <Download className="h-4 w-4" />
            CV
          </a>
        </div>
      </div>
    </nav>
  );
}


