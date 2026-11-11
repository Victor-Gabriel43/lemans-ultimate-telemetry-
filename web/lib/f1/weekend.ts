import type { Lang } from "@/lib/i18n/config";
import type { RegRef } from "./technology";

/** Bilingual text helper for content authored in both languages. */
export type Bi<T = string> = { pt: T; en: T };
export const bi = <T,>(v: Bi<T>, lang: Lang): T => v[lang];

export type WeekendStep = {
  id: string;
  day: Bi;
  title: Bi;
  short: Bi;
  body: Bi<string[]>;
  facts: Bi<string[]>;
};

const S = (num: string): RegRef => ({ year: 2026, kind: "sporting", num });

/** A standard (non-sprint) Grand Prix weekend. */
export const STANDARD_WEEKEND: WeekendStep[] = [
  {
    id: "practice",
    day: { en: "Friday – Saturday", pt: "Sexta – sábado" },
    title: { en: "Practice", pt: "Treinos livres" },
    short: { en: "Three sessions to learn the track and set up the car.", pt: "Três sessões para conhecer a pista e acertar o carro." },
    body: {
      en: [
        "Free Practice 1 and 2 take place on Friday, and Free Practice 3 on Saturday morning. Teams test set-up changes, evaluate tyre compounds, run long stints with heavy fuel to simulate the race and short runs on low fuel to prepare for qualifying.",
        "Teams must also give practice outings to young drivers: each team runs rookies in a number of sessions every season.",
      ],
      pt: [
        "O Treino Livre 1 e o 2 acontecem na sexta, e o Treino Livre 3 no sábado de manhã. As equipes testam mudanças de acerto, avaliam os compostos de pneu, fazem stints longos com muito combustível para simular a corrida e voltas curtas com pouco combustível para preparar a classificação.",
        "As equipes também precisam dar oportunidades a jovens pilotos: cada equipe coloca estreantes em algumas sessões por temporada.",
      ],
    },
    facts: { en: ["No points are awarded", "Data from practice shapes race strategy"], pt: ["Não vale pontos", "Os dados dos treinos definem a estratégia"] },
  },
  {
    id: "qualifying",
    day: { en: "Saturday", pt: "Sábado" },
    title: { en: "Qualifying", pt: "Classificação" },
    short: { en: "A knockout session that decides the starting grid.", pt: "Uma sessão eliminatória que define o grid de largada." },
    body: {
      en: [
        "Qualifying is split into three parts. In Q1 every driver sets lap times and the slowest are eliminated. Q2 eliminates another group. The fastest ten fight for pole position in Q3.",
        "The final classification sets the grid for the Grand Prix, subject to any penalties.",
      ],
      pt: [
        "A classificação é dividida em três partes. No Q1 todos os pilotos marcam tempos e os mais lentos são eliminados. O Q2 elimina outro grupo. Os dez mais rápidos disputam a pole position no Q3.",
        "A classificação final define o grid do Grande Prêmio, ressalvadas eventuais punições.",
      ],
    },
    facts: { en: ["Pole position: starting first", "Grid penalties can drop drivers down the order"], pt: ["Pole position: largar em primeiro", "Punições de grid podem jogar pilotos para trás"] },
  },
  {
    id: "grand-prix",
    day: { en: "Sunday", pt: "Domingo" },
    title: { en: "The Grand Prix", pt: "O Grande Prêmio" },
    short: { en: "The race itself — around 305 km, the event that scores the most points.", pt: "A corrida em si — cerca de 305 km, a prova que vale mais pontos." },
    body: {
      en: [
        "Cars complete a formation lap and then start from a standstill as five red lights go out. Most races cover the minimum number of laps exceeding 305 kilometres; Monaco is the main exception.",
        "There is an overall time limit, and the top ten finishers score points.",
      ],
      pt: [
        "Os carros fazem uma volta de apresentação e largam parados quando as cinco luzes vermelhas se apagam. A maioria das corridas tem o menor número de voltas que ultrapasse 305 quilômetros; Mônaco é a principal exceção.",
        "Há um limite de tempo total, e os dez primeiros marcam pontos.",
      ],
    },
    facts: { en: ["Standing start", "Points to the top ten", "At least two dry compounds in a dry race"], pt: ["Largada parada", "Pontos para os dez primeiros", "Ao menos dois compostos de seco numa corrida seca"] },
  },
];

/** A sprint weekend. */
export const SPRINT_WEEKEND: WeekendStep[] = [
  {
    id: "practice",
    day: { en: "Friday", pt: "Sexta" },
    title: { en: "One practice session", pt: "Um único treino livre" },
    short: { en: "A single hour to prepare before competitive running begins.", pt: "Uma única hora de preparação antes das sessões que valem resultado." },
    body: { en: ["Sprint weekends have only one practice session, putting a premium on preparation and simulation done back at the factory."], pt: ["Fins de semana com sprint têm apenas um treino livre, o que valoriza a preparação e as simulações feitas na fábrica."] },
    facts: { en: ["Less time to set up the car"], pt: ["Menos tempo para acertar o carro"] },
  },
  {
    id: "sprint-qualifying",
    day: { en: "Friday", pt: "Sexta" },
    title: { en: "Sprint Qualifying", pt: "Classificação da sprint" },
    short: { en: "A shorter knockout session that sets the sprint grid.", pt: "Uma eliminatória mais curta que define o grid da sprint." },
    body: { en: ["Sprint Qualifying follows the same three-part knockout format as regular qualifying, with shorter sessions."], pt: ["A classificação da sprint segue o mesmo formato eliminatório em três partes, com sessões mais curtas."] },
    facts: { en: ["Sets the grid for the sprint only"], pt: ["Define apenas o grid da sprint"] },
  },
  {
    id: "sprint",
    day: { en: "Saturday", pt: "Sábado" },
    title: { en: "The Sprint", pt: "A sprint" },
    short: { en: "A race of around 100 km, with no mandatory pit stop.", pt: "Uma corrida de cerca de 100 km, sem pit stop obrigatório." },
    body: { en: ["The sprint is a flat-out race with points for the top eight. It is followed by qualifying for the Grand Prix later the same day."], pt: ["A sprint é uma corrida de ataque total, com pontos para os oito primeiros. Depois dela, no mesmo dia, vem a classificação para o Grande Prêmio."] },
    facts: { en: ["About a third of a Grand Prix distance", "Points to the top eight"], pt: ["Cerca de um terço da distância de um GP", "Pontos para os oito primeiros"] },
  },
  {
    id: "qualifying",
    day: { en: "Saturday", pt: "Sábado" },
    title: { en: "Qualifying", pt: "Classificação" },
    short: { en: "The usual three-part session for the Grand Prix grid.", pt: "A sessão habitual em três partes para o grid do GP." },
    body: { en: ["Grand Prix qualifying runs to the normal format."], pt: ["A classificação do Grande Prêmio segue o formato normal."] },
    facts: { en: ["Sets Sunday's grid"], pt: ["Define o grid de domingo"] },
  },
  {
    id: "grand-prix",
    day: { en: "Sunday", pt: "Domingo" },
    title: { en: "The Grand Prix", pt: "O Grande Prêmio" },
    short: { en: "The main race, exactly as on a standard weekend.", pt: "A corrida principal, igual à de um fim de semana padrão." },
    body: { en: ["The Grand Prix itself is unchanged by the sprint format."], pt: ["O Grande Prêmio em si não muda no formato sprint."] },
    facts: { en: ["Full points to the top ten"], pt: ["Pontuação completa para os dez primeiros"] },
  },
];

export type RaceTopic = {
  id: string;
  title: Bi;
  summary: Bi;
  body: Bi<string[]>;
  changed?: Bi<string[]>;
  regs: RegRef[];
  learn?: string;
};

export const RACE_TOPICS: RaceTopic[] = [
  {
    id: "pit-stops",
    title: { en: "Pit stops", pt: "Pit stops" },
    summary: { en: "A crew of around twenty people changes four tyres in a couple of seconds.", pt: "Uma equipe de cerca de vinte pessoas troca quatro pneus em poucos segundos." },
    body: {
      en: [
        "During a stop, the car is lifted on front and rear jacks while mechanics work on each wheel — one operating the wheel gun, one removing the old wheel and one fitting the new one. The fastest stops take around two seconds.",
        "Cars must respect a speed limit in the pit lane. Time lost in the pit lane — not just the stationary time — is what strategists account for.",
      ],
      pt: [
        "Durante a parada, o carro é erguido por macacos dianteiro e traseiro enquanto mecânicos trabalham em cada roda — um opera a pistola, outro tira a roda velha e outro coloca a nova. As paradas mais rápidas levam cerca de dois segundos.",
        "Os carros precisam respeitar um limite de velocidade no pit lane. O que os estrategistas contabilizam é o tempo perdido em todo o pit lane, não só o tempo parado.",
      ],
    },
    changed: {
      en: ["Planned mid-race stops became a strategy in the 1980s. With refuelling allowed from 1994 to 2009, stops were longer; since 2010 they are tyre changes only, and crews have become dramatically faster."],
      pt: ["Paradas planejadas durante a corrida viraram estratégia nos anos 1980. Com o reabastecimento permitido de 1994 a 2009, as paradas eram mais longas; desde 2010 são só trocas de pneus, e as equipes ficaram muito mais rápidas."],
    },
    regs: [S("B1.6")],
    learn: "how-pit-stops-work",
  },
  {
    id: "strategy",
    title: { en: "Strategy", pt: "Estratégia" },
    summary: { en: "When to stop, which tyres to use, and how to react to rivals.", pt: "Quando parar, qual pneu usar e como reagir aos rivais." },
    body: {
      en: [
        "Strategists choose between one-stop, two-stop or more aggressive plans, depending on tyre wear and how long a pit stop costs at that circuit.",
        "The 'undercut' — stopping before a rival to use fresh tyres' extra pace — and the 'overcut' — staying out longer while the rival is held up — are the two classic strategic moves.",
      ],
      pt: [
        "Os estrategistas escolhem entre planos de uma parada, duas paradas ou mais agressivos, conforme o desgaste dos pneus e o tempo que um pit stop custa naquele circuito.",
        "O undercut — parar antes do rival para aproveitar o ritmo do pneu novo — e o overcut — ficar mais tempo na pista enquanto o rival fica preso no tráfego — são as duas jogadas clássicas.",
      ],
    },
    regs: [S("B6.3")],
    learn: "tyres-and-strategy",
  },
  {
    id: "tyre-management",
    title: { en: "Tyre management", pt: "Gestão de pneus" },
    summary: { en: "Making each set of tyres last without losing too much pace.", pt: "Fazer cada jogo de pneus durar sem perder ritmo demais." },
    body: {
      en: [
        "Drivers adjust how hard they brake, accelerate and slide to keep tyres in their working temperature window and reduce wear. A driver who manages tyres well can stop later or attack at the end of a stint.",
        "In a dry race, each driver must normally use at least two different dry compounds, which makes at least one pit stop compulsory.",
      ],
      pt: [
        "Os pilotos dosam frenagem, aceleração e derrapagem para manter os pneus na faixa de temperatura ideal e reduzir o desgaste. Quem administra bem os pneus pode parar mais tarde ou atacar no fim do stint.",
        "Numa corrida seca, cada piloto normalmente precisa usar ao menos dois compostos diferentes, o que torna obrigatório pelo menos um pit stop.",
      ],
    },
    changed: {
      en: ["In 2005 a single set of tyres had to last the whole race. The rule requiring two different dry compounds arrived with the single tyre supplier in 2007."],
      pt: ["Em 2005, um único jogo de pneus tinha de durar a corrida inteira. A regra dos dois compostos de seco diferentes chegou com o fornecedor único, em 2007."],
    },
    regs: [S("B6.2"), S("B6.3")],
    learn: "tyres-and-strategy",
  },
  {
    id: "safety-car",
    title: { en: "Safety Car", pt: "Safety Car" },
    summary: { en: "A real car that leads the field at reduced speed after an incident.", pt: "Um carro de verdade que lidera o pelotão em velocidade reduzida após um incidente." },
    body: {
      en: [
        "When there is danger on track that requires marshals to work, the Safety Car is deployed. Drivers queue behind it and may not overtake. The gaps between cars disappear — which can transform a race.",
        "Pitting under the Safety Car costs less time than under green-flag conditions, so teams often take the opportunity to change tyres.",
      ],
      pt: [
        "Quando há perigo na pista que exige o trabalho dos fiscais, o Safety Car entra. Os pilotos formam fila atrás dele e não podem ultrapassar. As diferenças entre os carros desaparecem — o que pode transformar uma corrida.",
        "Parar nos boxes sob Safety Car custa menos tempo do que em bandeira verde, por isso as equipes costumam aproveitar para trocar pneus.",
      ],
    },
    changed: {
      en: ["A Safety Car appeared at the 1973 Canadian Grand Prix, but it became a permanent procedure only in 1993. The rules for lapped cars and restarts have been revised several times since."],
      pt: ["Um Safety Car apareceu no GP do Canadá de 1973, mas ele só virou procedimento permanente em 1993. As regras para retardatários e relargadas foram revistas várias vezes desde então."],
    },
    regs: [S("B5.13")],
  },
  {
    id: "virtual-safety-car",
    title: { en: "Virtual Safety Car", pt: "Safety Car Virtual" },
    summary: { en: "Every driver must slow to a set pace, without a physical Safety Car.", pt: "Todos os pilotos precisam reduzir a um ritmo definido, sem um Safety Car físico." },
    body: {
      en: ["The Virtual Safety Car (VSC) requires every driver to respect a minimum time across marshalling sectors. Unlike the Safety Car, the gaps between cars are roughly preserved."],
      pt: ["O Safety Car Virtual (VSC) exige que cada piloto respeite um tempo mínimo entre os setores de fiscalização. Ao contrário do Safety Car, as diferenças entre os carros ficam praticamente preservadas."],
    },
    changed: { en: ["Introduced in 2015, after Jules Bianchi's accident at Suzuka in 2014."], pt: ["Criado em 2015, após o acidente de Jules Bianchi em Suzuka, em 2014."] },
    regs: [S("B5.12")],
  },
  {
    id: "red-flag",
    title: { en: "Red flag", pt: "Bandeira vermelha" },
    summary: { en: "The session is suspended and cars return to the pit lane.", pt: "A sessão é suspensa e os carros voltam ao pit lane." },
    body: {
      en: ["If conditions are too dangerous to continue — a heavy crash, barrier repairs or extreme rain — the session is suspended. The procedures for suspending and resuming a session, including what work teams may do on the cars, are set out in the Sporting Regulations."],
      pt: ["Se as condições forem perigosas demais para continuar — um acidente forte, reparo de barreiras ou chuva extrema —, a sessão é suspensa. Os procedimentos de suspensão e retomada, incluindo o que as equipes podem fazer nos carros, estão no Regulamento Esportivo."],
    },
    regs: [S("B5.14"), S("B5.15")],
  },
  {
    id: "flags",
    title: { en: "Flags and signals", pt: "Bandeiras e sinais" },
    summary: { en: "The visual language between race control and drivers.", pt: "A linguagem visual entre a direção de prova e os pilotos." },
    body: {
      en: ["Yellow: danger, slow down, no overtaking. Green: track clear. Red: session stopped. Blue: let a faster car through. Chequered: end of the session. Black-and-white diagonal: warning for unsporting behaviour. Today the same signals are also shown on light panels around the track and on the car's dashboard."],
      pt: ["Amarela: perigo, reduza, proibido ultrapassar. Verde: pista livre. Vermelha: sessão interrompida. Azul: deixe passar um carro mais rápido. Quadriculada: fim da sessão. Preta e branca na diagonal: advertência por conduta antiesportiva. Hoje os mesmos sinais também aparecem em painéis luminosos ao redor da pista e no painel do carro."],
    },
    regs: [],
  },
  {
    id: "race-control",
    title: { en: "Race Control", pt: "Direção de prova" },
    summary: { en: "The officials who run the race.", pt: "Os oficiais que conduzem a corrida." },
    body: {
      en: ["The race director manages the event: starting procedures, flags, the Safety Car and track conditions. Incidents are reported to the stewards, who decide on penalties."],
      pt: ["O diretor de prova conduz o evento: procedimentos de largada, bandeiras, Safety Car e condições da pista. Os incidentes são encaminhados aos comissários, que decidem as punições."],
    },
    changed: { en: ["Charlie Whiting served as race director from 1997 until his death in 2019."], pt: ["Charlie Whiting foi diretor de prova de 1997 até sua morte, em 2019."] },
    regs: [S("B1.2"), S("B1.3")],
  },
  {
    id: "stewards",
    title: { en: "Stewards", pt: "Comissários" },
    summary: { en: "An independent panel that judges incidents.", pt: "Um painel independente que julga os incidentes." },
    body: {
      en: ["The stewards investigate incidents reported by race control or by teams, hear the drivers involved, and decide whether a penalty is deserved. Their decisions are published as official documents during the event."],
      pt: ["Os comissários investigam incidentes apontados pela direção de prova ou pelas equipes, ouvem os pilotos envolvidos e decidem se cabe punição. Suas decisões são publicadas como documentos oficiais durante o evento."],
    },
    changed: { en: ["Since 2010 each panel has included a former driver."], pt: ["Desde 2010, cada painel inclui um ex-piloto."] },
    regs: [S("B1.9")],
  },
  {
    id: "penalties",
    title: { en: "Penalties", pt: "Punições" },
    summary: { en: "From five-second time penalties to grid drops and race bans.", pt: "De punições de cinco segundos a perdas de posição no grid e suspensões." },
    body: {
      en: [
        "Common penalties include five- or ten-second time penalties (served at a pit stop or added to the race time), drive-through and stop-go penalties, grid penalties for the next race and, rarely, disqualification.",
        "Drivers also receive penalty points on their Super Licence; accumulating too many within a twelve-month period results in a race ban.",
      ],
      pt: [
        "As punições mais comuns são acréscimos de cinco ou dez segundos (cumpridos num pit stop ou somados ao tempo de corrida), drive-through e stop-and-go, perda de posições no grid da corrida seguinte e, raramente, a desclassificação.",
        "Os pilotos também recebem pontos de penalidade na Superlicença; acumular pontos demais num período de doze meses leva a uma suspensão.",
      ],
    },
    changed: { en: ["The five-second time penalty and the Super Licence penalty-points system were introduced in 2014."], pt: ["A punição de cinco segundos e o sistema de pontos de penalidade na Superlicença foram criados em 2014."] },
    regs: [S("B1.9")],
  },
  {
    id: "parc-ferme",
    title: { en: "Parc fermé", pt: "Parque fechado" },
    summary: { en: "Once qualifying starts, the car's set-up is essentially frozen.", pt: "Quando a classificação começa, o acerto do carro fica praticamente congelado." },
    body: {
      en: ["From qualifying until the race, cars are under parc fermé conditions: teams may only carry out limited, approved work. A team that changes its set-up must start from the pit lane. After the race, cars are held under parc fermé for scrutineering."],
      pt: ["Da classificação até a corrida, os carros ficam em regime de parque fechado: as equipes só podem fazer trabalhos limitados e autorizados. A equipe que mudar o acerto precisa largar do pit lane. Depois da corrida, os carros ficam em parque fechado para a vistoria técnica."],
    },
    changed: { en: ["Parc fermé between qualifying and the race was introduced in 2003."], pt: ["O parque fechado entre classificação e corrida foi introduzido em 2003."] },
    regs: [S("B3.5"), S("B3.6")],
  },
];

export const WEEKEND_FAQ: { q: Bi; a: Bi }[] = [
  {
    q: { en: "How long is a Grand Prix?", pt: "Quanto dura um Grande Prêmio?" },
    a: {
      en: "Most Grands Prix cover the fewest laps that exceed 305 kilometres, typically lasting around an hour and a half. Monaco is shorter. A time limit applies if a race is delayed.",
      pt: "A maioria dos GPs tem o menor número de voltas que ultrapasse 305 quilômetros, durando em geral cerca de uma hora e meia. Mônaco é mais curto. Há um limite de tempo se a corrida atrasar.",
    },
  },
  {
    q: { en: "Why do drivers weave behind the Safety Car?", pt: "Por que os pilotos ziguezagueiam atrás do Safety Car?" },
    a: { en: "To keep heat in their tyres and brakes, which lose temperature — and therefore grip — at reduced speed.", pt: "Para manter o calor dos pneus e freios, que perdem temperatura — e, portanto, aderência — em velocidade reduzida." },
  },
  {
    q: { en: "What happens if it rains?", pt: "O que acontece se chover?" },
    a: {
      en: "Teams switch to intermediate or full wet tyres. In very heavy rain the race may start behind the Safety Car or be suspended with a red flag.",
      pt: "As equipes trocam para pneus intermediários ou de chuva forte. Com chuva muito forte, a largada pode ser atrás do Safety Car ou a corrida pode ser suspensa com bandeira vermelha.",
    },
  },
  {
    q: { en: "Why are some cars a lap behind?", pt: "Por que alguns carros ficam uma volta atrás?" },
    a: {
      en: "Faster cars catch slower ones over the course of a race. A car that is caught is 'lapped' and must let the faster car through when shown the blue flag.",
      pt: "Ao longo da corrida, os carros mais rápidos alcançam os mais lentos. O carro alcançado leva uma volta e precisa deixar o mais rápido passar quando recebe a bandeira azul.",
    },
  },
];
