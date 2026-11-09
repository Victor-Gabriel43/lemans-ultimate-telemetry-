import Image from "next/image";

export type PhotoData = {
  id: string; url: string; alt: string; caption: string; credit: string; license: string; licenseUrl: string; sourceUrl: string;
  takenAt: string; width: number; height: number; focal: string; view?: string;
};

/** Credit line required by the photograph's licence. Always visible. */
export function Credit({ p, className = "", plain = false }: { p: PhotoData; className?: string; plain?: boolean }) {
  return (
    <p className={`text-[12px] leading-snug text-fog ${className}`}>
      Photo: {p.credit || "credit pending"}.{" "}
      {p.sourceUrl && !plain ? (
        <a href={p.sourceUrl} target="_blank" rel="noreferrer noopener" className="underline decoration-asphalt underline-offset-2 hover:text-chalk">
          {p.license || "Licence"}
        </a>
      ) : (
        p.license
      )}
    </p>
  );
}

/** Museum wall label pinned to a full-bleed photograph. */
export function ExhibitLabel({ p, title }: { p: PhotoData; title?: string }) {
  return (
    <div className="max-w-sm border-l-2 border-chalk bg-black/70 px-4 py-3 backdrop-blur-sm">
      {title ? <p className="text-sm font-semibold">{title}</p> : null}
      <p className="font-serif text-[15px] leading-snug text-chalk/90">{p.caption || p.alt}</p>
      <Credit p={p} className="mt-2" />
    </div>
  );
}

/** Full-bleed photograph used as a page or section opener. */
export function Plate({ p, children, className = "h-[86vh] min-h-[560px]", priority = false, label = true, labelTitle }: {
  p: PhotoData; children?: React.ReactNode; className?: string; priority?: boolean; label?: boolean; labelTitle?: string;
}) {
  return (
    <section className={`relative isolate overflow-hidden bg-stage ${className}`}>
      <Image src={p.url} unoptimized={p.url.startsWith("http")} alt={p.alt} fill priority={priority} sizes="100vw" className={`-z-10 object-cover ${priority ? "settle" : ""}`} style={{ objectPosition: p.focal }} />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-black via-black/30 to-black/20" />
      {children}
      {label ? (
        <div className="absolute right-4 bottom-4 hidden md:block lg:right-10 lg:bottom-8">
          <ExhibitLabel p={p} title={labelTitle} />
        </div>
      ) : null}
    </section>
  );
}

/** Framed photograph with its credit underneath. */
/** `credit="plain"` renders the credit without a link, for frames placed inside a link. */
export function PhotoFrame({ p, ratio = "aspect-[3/2]", sizes = "(min-width: 1024px) 33vw, 100vw", credit = true, overlay, className = "" }: {
  p: PhotoData; ratio?: string; sizes?: string; credit?: boolean | "plain"; overlay?: React.ReactNode; className?: string;
}) {
  return (
    <figure className={className}>
      <div className={`relative overflow-hidden bg-pit ${ratio}`}>
        <Image src={p.url} unoptimized={p.url.startsWith("http")} alt={p.alt} fill sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-[1.03]" style={{ objectPosition: p.focal }} />
        {overlay}
      </div>
      {credit ? <figcaption className="mt-2"><Credit p={p} plain={credit === "plain"} /></figcaption> : null}
    </figure>
  );
}

/** Shown where no licensed photograph has been archived yet. */
export function NoPhoto({ number, ratio = "aspect-[3/2]", note = "No licensed photograph archived yet" }: { number?: string; ratio?: string; note?: string }) {
  return (
    <div className={`relative flex items-end overflow-hidden bg-pit p-4 ${ratio}`}>
      {number ? <span aria-hidden className={`race-number absolute -top-2 right-3 whitespace-nowrap opacity-40 ${number.length > 3 ? "text-[5.5rem]" : "text-[9rem]"}`}>{number}</span> : null}
      <p className="relative text-sm text-fog">{note}</p>
    </div>
  );
}

export function toPhoto(p: {
  id: string; url: string; alt: string; caption: string; credit: string; license: string; licenseUrl: string; sourceUrl: string; takenAt: string;
  width: number; height: number; focal: string; view: string;
}): PhotoData {
  return { ...p };
}
