/**
 * "Um por tela": cartões full-bleed que grudam no topo e se empilham
 * enquanto o próximo sobe por cima (CSS sticky puro, sem JS).
 */
const STEPS = [
  {
    n: "01",
    title: "Crie a sala",
    body: "Nome da corrida, carro, pista e duração. Em dez segundos o pit wall está no ar.",
    tone: "lx-card-sunset",
    tag: "Setup · 10s",
  },
  {
    n: "02",
    title: "Mande o código",
    body: "Seis caracteres no Discord. Engenheiros e pilotos entram sem conta, sem senha.",
    tone: "lx-card-violet",
    tag: "Invite · ABC123",
  },
  {
    n: "03",
    title: "Corram juntos",
    body: "Toda edição aparece para todos na hora, com quem mudou e quando. Até a bandeirada.",
    tone: "lx-card-red",
    tag: "Live sync · 0 F5",
  },
];

export function StackCards() {
  return (
    <section id="modulos" className="relative px-3 pb-[10vh] sm:px-6">
      <div className="mx-auto flex max-w-[1400px] items-end justify-between gap-6 px-2 pb-10 pt-28 sm:px-4">
        <h2 className="font-display text-[clamp(2.8rem,8vw,7rem)] uppercase leading-[0.85] text-white">
          Três passos
          <br />
          <span className="text-white/30">até a largada</span>
        </h2>
        <span className="hidden font-mono text-[0.7rem] uppercase tracking-[0.24em] text-white/50 sm:block">
          How it works
        </span>
      </div>
      <div className="mx-auto max-w-[1400px]">
        {STEPS.map((s, i) => (
          <article
            key={s.n}
            className={`lx-card ${s.tone} sticky flex min-h-[78svh] flex-col justify-between overflow-hidden p-6 sm:p-12`}
            style={{ top: `calc(5.5rem + ${i * 1.4}rem)`, marginBottom: i < STEPS.length - 1 ? "8vh" : 0 }}
          >
            <div className="flex items-start justify-between gap-6">
              <span className="font-mono text-[0.7rem] uppercase tracking-[0.26em] text-white/75">{s.tag}</span>
              <span className="font-mono text-[0.7rem] tracking-[0.2em] text-white/60">
                {s.n} / 03
              </span>
            </div>
            <span aria-hidden className="lx-card-num font-display leading-none">
              {s.n}
            </span>
            <div className="relative flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <h3 className="font-display text-[clamp(3rem,9vw,8rem)] uppercase leading-[0.85] text-white">
                {s.title}
              </h3>
              <p className="max-w-sm text-base leading-relaxed text-white/80 sm:text-lg">{s.body}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
