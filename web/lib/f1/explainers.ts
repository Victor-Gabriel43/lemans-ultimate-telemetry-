import type { Bi } from "./weekend";

/**
 * Paddock explanations of important regulation articles.
 *
 * Each explanation was written against the wording of a specific edition
 * (`basedOn`) and is shown alongside — never instead of — the official text.
 * `introduced` is only filled where the date is established elsewhere in the
 * encyclopedia; otherwise it is omitted.
 */
export type Explainer = {
  basedOn: string; // document id
  says: Bi;
  practice: Bi;
  affects: Bi;
  why: Bi;
  introduced?: Bi;
  related?: string; // internal link
};

export const EXPLAINERS: Record<string, Explainer> = {
  "2026:technical:C4.1": {
    basedOn: "2026-technical-iss21-2026-10-19",
    says: {
      en: "It sets the minimum mass of the car (with driver): 726 kg plus the nominal tyre mass during sprint qualifying and qualifying, and 724 kg plus the nominal tyre mass in all other sessions. The mass is increased when a heat hazard is declared.",
      pt: "Define o peso mínimo do carro (com o piloto): 726 kg mais a massa nominal dos pneus na classificação da sprint e na classificação, e 724 kg mais a massa nominal dos pneus nas demais sessões. O peso aumenta quando é declarado risco de calor.",
    },
    practice: {
      en: "Teams build cars lighter than the limit and add ballast to reach it, using the ballast to fine-tune weight distribution. A car found below the minimum mass is in breach of the regulations.",
      pt: "As equipes constroem carros mais leves que o limite e acrescentam lastro para atingi-lo, usando o lastro para ajustar a distribuição de peso. Um carro abaixo do peso mínimo infringe o regulamento.",
    },
    affects: { en: "All teams; scrutineering at every event.", pt: "Todas as equipes; a vistoria técnica de cada evento." },
    why: {
      en: "A minimum mass stops teams from gaining performance through ever-lighter, more expensive and potentially fragile construction.",
      pt: "O peso mínimo impede que as equipes ganhem desempenho com construções cada vez mais leves, caras e potencialmente frágeis.",
    },
    related: "/engineering/chassis",
  },
  "2026:technical:C4.6": {
    basedOn: "2026-technical-iss21-2026-10-19",
    says: {
      en: "When a heat hazard is declared for a race-type session, the minimum mass rises by 5 kg, and the driver's heat-related equipment and cooling system must together weigh at least 5 kg. In other cases at the same event, a 2 kg increase applies.",
      pt: "Quando é declarado risco de calor numa sessão do tipo corrida, o peso mínimo sobe 5 kg, e o equipamento do piloto para calor e o sistema de arrefecimento precisam somar ao menos 5 kg. Em outros casos no mesmo evento, aplica-se um acréscimo de 2 kg.",
    },
    practice: {
      en: "Teams can fit a driver cooling system without being penalised by its weight, so drivers are protected in extreme temperatures.",
      pt: "As equipes podem instalar um sistema de arrefecimento para o piloto sem serem prejudicadas pelo peso dele, protegendo os pilotos em temperaturas extremas.",
    },
    affects: { en: "Drivers and teams at hot events.", pt: "Pilotos e equipes em etapas muito quentes." },
    why: { en: "Driver welfare: cooling equipment adds weight, and the rule removes the incentive to leave it out.", pt: "O bem-estar do piloto: o equipamento de arrefecimento acrescenta peso, e a regra elimina o incentivo para deixá-lo de fora." },
    related: "/engineering/cooling",
  },
  "2026:technical:C5.1": {
    basedOn: "2026-technical-iss21-2026-10-19",
    says: {
      en: "It defines the engine: a four-stroke reciprocating-piston engine of 1600 cc (+0/−10 cc), with six cylinders in a 90° V, two intake and two exhaust valves per cylinder, and detailed limits on valves, inserts and the crankshaft.",
      pt: "Define o motor: quatro tempos, pistões alternativos, 1600 cm³ (+0/−10 cm³), seis cilindros em V de 90°, duas válvulas de admissão e duas de escape por cilindro, e limites detalhados para válvulas, insertos e virabrequim.",
    },
    practice: {
      en: "Every manufacturer builds the same basic engine architecture, so competition happens in combustion efficiency, materials and integration with the hybrid system.",
      pt: "Todos os fabricantes constroem a mesma arquitetura básica de motor, e a disputa acontece na eficiência da combustão, nos materiais e na integração com o sistema híbrido.",
    },
    affects: { en: "Power unit manufacturers.", pt: "Fabricantes de unidades de potência." },
    why: { en: "Fixing the architecture controls costs and keeps manufacturers on a comparable basis.", pt: "Fixar a arquitetura controla os custos e mantém os fabricantes em bases comparáveis." },
    introduced: { en: "The 1.6-litre V6 turbo architecture has been used since 2014.", pt: "A arquitetura V6 turbo de 1,6 litro é usada desde 2014." },
    related: "/engineering/power-units",
  },
  "2026:technical:C14.6": {
    basedOn: "2026-technical-iss21-2026-10-19",
    says: {
      en: "It defines the driver cooling system and its minimum performance when a heat hazard is declared: at least 200 W of continuous heat extraction at 40 °C, or at least 1.1 MJ of stored cooling. Refrigerants must have a global-warming potential below 10, and dry ice is banned.",
      pt: "Define o sistema de arrefecimento do piloto e seu desempenho mínimo quando há risco de calor: pelo menos 200 W de extração contínua de calor a 40 °C, ou pelo menos 1,1 MJ de arrefecimento armazenado. Os refrigerantes precisam ter potencial de aquecimento global abaixo de 10, e o gelo seco é proibido.",
    },
    practice: { en: "Teams must carry a working cooling system for the driver in declared heat-hazard sessions.", pt: "As equipes precisam levar um sistema de arrefecimento funcional para o piloto nas sessões com risco de calor declarado." },
    affects: { en: "Drivers and teams at hot events.", pt: "Pilotos e equipes em etapas muito quentes." },
    why: { en: "To prevent heat exhaustion in the cockpit.", pt: "Para evitar a exaustão por calor no cockpit." },
    related: "/engineering/cooling",
  },
  "2026:sporting:B3.5": {
    basedOn: "2026-sporting-iss09-2026-10-01",
    says: {
      en: "A car is in parc fermé from the moment it first leaves the pit lane in sprint qualifying until the start of the sprint, and from its first exit in qualifying until the start of the race. Teams must submit a suspension set-up sheet, and — apart from listed or approved work — no part may be replaced or modified and no set-up change made.",
      pt: "O carro entra em parque fechado no momento em que sai do pit lane pela primeira vez na classificação da sprint, até a largada da sprint, e na primeira saída da classificação, até a largada da corrida. As equipes entregam uma ficha de acerto da suspensão e — salvo trabalhos listados ou autorizados — nenhuma peça pode ser trocada ou modificada e nenhum acerto pode ser alterado.",
    },
    practice: { en: "Teams must choose one set-up for both qualifying and the race; changing it means starting from the pit lane.", pt: "As equipes precisam escolher um único acerto para a classificação e a corrida; mudá-lo significa largar do pit lane." },
    affects: { en: "All teams on every weekend.", pt: "Todas as equipes em todos os fins de semana." },
    why: { en: "To stop teams running a special qualifying set-up and to keep the car that qualified the same as the car that races.", pt: "Para impedir acertos especiais de classificação e garantir que o carro que se classificou seja o mesmo que corre." },
    introduced: { en: "Parc fermé between qualifying and the race was introduced in 2003.", pt: "O parque fechado entre classificação e corrida foi introduzido em 2003." },
    related: "/race-weekend#parc-ferme",
  },
  "2026:sporting:B5.12": {
    basedOn: "2026-sporting-iss09-2026-10-01",
    says: {
      en: "The Virtual Safety Car is used when double waved yellow flags are needed and people may be in danger, but a Safety Car is not warranted. Every car must slow down and stay above a minimum time set by the FIA ECU in each marshalling sector, and must not drive unnecessarily slowly or erratically.",
      pt: "O Safety Car Virtual é usado quando são necessárias bandeiras amarelas duplas agitadas e pode haver pessoas em perigo, mas um Safety Car não se justifica. Cada carro precisa reduzir e ficar acima de um tempo mínimo definido pela central eletrônica da FIA em cada setor de fiscalização, sem andar devagar demais nem de forma errática.",
    },
    practice: { en: "The gaps between cars are roughly preserved, unlike under a Safety Car.", pt: "As diferenças entre os carros ficam praticamente preservadas, ao contrário do Safety Car." },
    affects: { en: "Drivers, race control and strategists.", pt: "Pilotos, direção de prova e estrategistas." },
    why: { en: "To neutralise a race quickly and fairly while marshals work on track.", pt: "Para neutralizar a corrida de forma rápida e justa enquanto os fiscais trabalham na pista." },
    introduced: { en: "The Virtual Safety Car was introduced in 2015.", pt: "O Safety Car Virtual foi criado em 2015." },
    related: "/race-weekend#virtual-safety-car",
  },
  "2026:sporting:B5.13": {
    basedOn: "2026-sporting-iss09-2026-10-01",
    says: {
      en: "The Safety Car is used only when competitors or officials are in immediate physical danger but the session does not need to be suspended. When deployed, light panels show “SC”, marshals show waved yellow flags, and the Safety Car joins the track regardless of where the leader is; cars must slow down and queue behind it.",
      pt: "O Safety Car é usado apenas quando competidores ou oficiais estão em perigo físico imediato, mas a sessão não precisa ser suspensa. Quando ele entra, os painéis luminosos mostram “SC”, os fiscais agitam bandeiras amarelas e o Safety Car entra na pista independentemente da posição do líder; os carros reduzem e formam fila atrás dele.",
    },
    practice: { en: "Gaps disappear and pit stops become cheaper, which often reshapes race strategy.", pt: "As diferenças desaparecem e os pit stops ficam mais baratos, o que muitas vezes muda a estratégia." },
    affects: { en: "Drivers, race control and strategists.", pt: "Pilotos, direção de prova e estrategistas." },
    why: { en: "To protect people working on or near the track.", pt: "Para proteger as pessoas que trabalham na pista ou perto dela." },
    introduced: { en: "The Safety Car became a permanent procedure in 1993.", pt: "O Safety Car virou procedimento permanente em 1993." },
    related: "/race-weekend#safety-car",
  },
  "2026:sporting:B6.3": {
    basedOn: "2026-sporting-iss09-2026-10-01",
    says: {
      en: "Only tyres allocated to the driver may be used. A driver who uses tyres of a differing specification or not allocated to them in a race-type session must pit to change them within two crossings of the control line, or receive a stop-and-go penalty. Tyres count as used once the car leaves the pit lane or its grid position on them.",
      pt: "Só podem ser usados os pneus alocados ao piloto. Quem usar pneus de especificação diferente ou não alocados a ele numa sessão do tipo corrida precisa trocá-los nos boxes em até duas passagens pela linha de controle, ou recebe um stop-and-go. Os pneus contam como usados assim que o carro sai do pit lane ou da posição de grid com eles.",
    },
    practice: { en: "Teams track every set closely; the allocation shapes how many runs a driver can make.", pt: "As equipes controlam cada jogo de perto; a alocação define quantas saídas o piloto pode fazer." },
    affects: { en: "Drivers, teams and the tyre supplier.", pt: "Pilotos, equipes e o fornecedor de pneus." },
    why: { en: "To control costs and keep tyre use fair and traceable.", pt: "Para controlar custos e manter o uso dos pneus justo e rastreável." },
    related: "/engineering/tyres",
  },
  "2026:financial:D4.1": {
    basedOn: "2026-financial-iss08-2026-10-01",
    says: {
      en: "Each F1 team must report its relevant costs against the cost cap and must not exceed it. The cap is US$215,000,000 for a year with 24 or fewer competitions, increased by US$1,800,000 for each competition above 24, adjusted for indexation where applicable.",
      pt: "Cada equipe precisa declarar seus custos relevantes em relação ao teto e não pode ultrapassá-lo. O teto é de US$ 215.000.000 para um ano com até 24 competições, acrescido de US$ 1.800.000 por competição acima de 24, ajustado por indexação quando aplicável.",
    },
    practice: { en: "Teams must budget car development within a fixed annual limit.", pt: "As equipes precisam planejar o desenvolvimento do carro dentro de um limite anual fixo." },
    affects: { en: "All F1 teams.", pt: "Todas as equipes de F1." },
    why: { en: "To make the competition closer and teams financially sustainable.", pt: "Para aproximar a competição e tornar as equipes financeiramente sustentáveis." },
    introduced: { en: "The cost cap was introduced in 2021.", pt: "O teto de gastos foi criado em 2021." },
    related: "/regulations/financial",
  },
};

export function explainerFor(year: number, kind: string, num: string) {
  return EXPLAINERS[`${year}:${kind}:${num}`];
}
