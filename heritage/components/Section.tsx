export function SectionHeading({ title, children, id, aside }: { title: string; children?: React.ReactNode; id?: string; aside?: React.ReactNode }) {
  return (
    <header id={id} className="mb-10 flex scroll-mt-32 flex-wrap items-end justify-between gap-x-10 gap-y-4">
      <div>
        <h2 className="display text-[clamp(2.75rem,6vw,5rem)]">{title}</h2>
        {children ? <div className="lede mt-4 text-[1.2rem] text-fog">{children}</div> : null}
      </div>
      {aside}
    </header>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1480px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}
