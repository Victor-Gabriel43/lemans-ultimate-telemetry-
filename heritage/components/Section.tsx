export function SectionHeading({ index, eyebrow, title, children }: { index?: string; eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <header className="mb-10 grid gap-4 border-t hairline pt-6 md:grid-cols-[180px_1fr]">
      <p className="eyebrow">
        {index ? <span className="mr-3 text-paper">{index}</span> : null}
        {eyebrow}
      </p>
      <div>
        <h2 className="display text-4xl md:text-5xl">{title}</h2>
        {children ? <div className="mt-4 max-w-2xl text-soft">{children}</div> : null}
      </div>
    </header>
  );
}

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1400px] px-4 sm:px-6 lg:px-10 ${className}`}>{children}</div>;
}
