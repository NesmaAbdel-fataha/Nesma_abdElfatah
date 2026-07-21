export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  const alignmentClass = align === 'center' ? 'mx-auto text-center' : '';

  return (
    <div className={`max-w-3xl ${alignmentClass}`}>
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-orange-700">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl dark:text-slate-100">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base leading-8 text-slate-600 dark:text-slate-400">{description}</p>
      ) : null}
    </div>
  );
}
