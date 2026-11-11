import type { Bi } from "./weekend";

export type Level = "Beginner" | "Intermediate" | "Advanced";
export const LEVELS: Level[] = ["Beginner", "Intermediate", "Advanced"];

export type Lesson = {
  slug: string;
  level: Level;
  minutes: number;
  title: Bi;
  summary: Bi;
  keyIdea: Bi;
  sections: Bi<{ heading: string; body: string[] }[]>;
  example: { text: Bi; href: string; label: Bi };
  takeaways: Bi<string[]>;
  related: { label: Bi; href: string }[];
};

export const LESSONS: Lesson[] = [
  {
    slug: "what-is-formula-1",
    level: "Beginner",
    minutes: 4,
    title: { en: "What is Formula One?", pt: "O que é a Fórmula 1?" },
    summary: { en: "The world's leading single-seater championship, in a few minutes.", pt: "O principal campeonato de monopostos do mundo, em poucos minutos." },
    keyIdea: {
      en: "Formula One is two championships at once: one for drivers, one for teams that design and build their own cars.",
      pt: "A Fórmula 1 são dois campeonatos ao mesmo tempo: um de pilotos e outro de equipes que projetam e constroem os próprios carros.",
    },
    sections: {
      en: [
        { heading: "The 'formula'", body: ["The word 'formula' refers to the set of rules every car must follow. Formula One is the highest class of single-seater racing governed by the FIA, motorsport's international federation."] },
        { heading: "Teams build their own cars", body: ["Unlike many series in which everyone uses the same car, each Formula One team — called a constructor — designs and builds its own chassis. Engineering is as important as driving."] },
        { heading: "A world tour", body: ["A season visits circuits across several continents, from permanent racetracks to city streets. Each event is called a Grand Prix."] },
      ],
      pt: [
        { heading: "A “fórmula”", body: ["A palavra “fórmula” se refere ao conjunto de regras que todo carro precisa seguir. A Fórmula 1 é a categoria máxima de monopostos regida pela FIA, a federação internacional do automobilismo."] },
        { heading: "As equipes constroem os próprios carros", body: ["Ao contrário de muitas categorias em que todos usam o mesmo carro, cada equipe de Fórmula 1 — chamada de construtor — projeta e constrói o próprio chassi. A engenharia é tão importante quanto a pilotagem."] },
        { heading: "Uma volta ao mundo", body: ["Uma temporada passa por circuitos em vários continentes, de autódromos permanentes a ruas de cidades. Cada evento se chama Grande Prêmio."] },
      ],
    },
    example: {
      text: { en: "Ferrari is the only team to have entered every World Championship season since 1950 — always building its own chassis and engines.", pt: "A Ferrari é a única equipe que disputou todas as temporadas do Mundial desde 1950 — sempre construindo chassi e motores próprios." },
      href: "/teams/ferrari",
      label: { en: "Ferrari's profile", pt: "Perfil da Ferrari" },
    },
    takeaways: {
      en: ["'Formula' means the set of rules", "Teams are constructors", "Two championships: drivers and constructors"],
      pt: ["“Fórmula” é o conjunto de regras", "As equipes são construtoras", "Dois campeonatos: pilotos e construtores"],
    },
    related: [
      { label: { en: "History of Formula One", pt: "História da Fórmula 1" }, href: "/history" },
      { label: { en: "How a race weekend works", pt: "Como funciona o fim de semana" }, href: "/race-weekend" },
    ],
  },
  {
    slug: "how-championships-work",
    level: "Beginner",
    minutes: 4,
    title: { en: "How championships work", pt: "Como funcionam os campeonatos" },
    summary: { en: "Two titles, decided by points over a whole season.", pt: "Dois títulos, decididos por pontos ao longo da temporada." },
    keyIdea: { en: "Consistency across a season matters as much as winning individual races.", pt: "A regularidade na temporada importa tanto quanto vencer corridas." },
    sections: {
      en: [
        { heading: "Drivers' championship", body: ["Every driver scores points according to their finishing position in each race (and in sprints). The driver with the most points at the end of the season is world champion. Ties are broken by the number of wins, then second places, and so on."] },
        { heading: "Constructors' championship", body: ["Each team adds together the points scored by both of its drivers. The constructors' championship, first awarded in 1958, also determines how prize money is distributed between teams."] },
      ],
      pt: [
        { heading: "Campeonato de pilotos", body: ["Cada piloto marca pontos conforme a posição de chegada em cada corrida (e nas sprints). Quem tiver mais pontos no fim da temporada é o campeão mundial. Empates são decididos pelo número de vitórias, depois de segundos lugares, e assim por diante."] },
        { heading: "Campeonato de construtores", body: ["Cada equipe soma os pontos dos seus dois pilotos. O campeonato de construtores, disputado pela primeira vez em 1958, também define como o prêmio em dinheiro é dividido entre as equipes."] },
      ],
    },
    example: {
      text: { en: "In 1984 Niki Lauda beat his McLaren team-mate Alain Prost by half a point — the shortened Monaco Grand Prix had awarded half points.", pt: "Em 1984 Niki Lauda superou o companheiro de McLaren Alain Prost por meio ponto — o GP de Mônaco, encurtado, tinha distribuído metade dos pontos." },
      href: "/seasons/1984",
      label: { en: "The 1984 season", pt: "A temporada de 1984" },
    },
    takeaways: {
      en: ["Points accumulate across the season", "Team points = both drivers' points combined", "Constructors' position affects prize money"],
      pt: ["Os pontos se acumulam ao longo da temporada", "Pontos da equipe = soma dos dois pilotos", "A posição entre construtores define o prêmio em dinheiro"],
    },
    related: [
      { label: { en: "How points are awarded", pt: "Como os pontos são distribuídos" }, href: "/learn/how-points-work" },
      { label: { en: "Every season", pt: "Todas as temporadas" }, href: "/seasons" },
    ],
  },
  {
    slug: "how-points-work",
    level: "Beginner",
    minutes: 3,
    title: { en: "How points are awarded", pt: "Como os pontos são distribuídos" },
    summary: { en: "From 25 points for a win down to one point for tenth.", pt: "De 25 pontos pela vitória até um ponto pelo décimo lugar." },
    keyIdea: { en: "Since 2010, points go to the top ten: 25, 18, 15, 12, 10, 8, 6, 4, 2, 1.", pt: "Desde 2010, pontuam os dez primeiros: 25, 18, 15, 12, 10, 8, 6, 4, 2, 1." },
    sections: {
      en: [
        { heading: "The modern scale", body: ["A Grand Prix win is worth 25 points, second place 18 and third 15, descending to one point for tenth. Sprints award points to the top eight. From 2019 to 2024, one extra point was available for the fastest lap if the driver finished in the top ten."] },
        { heading: "It has changed many times", body: ["In 1950 only the top five scored, with a win worth eight points. The scale has been widened several times so that more drivers and teams score. Each season page in Paddock shows the system used that year."] },
      ],
      pt: [
        { heading: "A escala atual", body: ["Uma vitória num Grande Prêmio vale 25 pontos, o segundo lugar 18 e o terceiro 15, caindo até um ponto pelo décimo. As sprints pontuam os oito primeiros. De 2019 a 2024 havia um ponto extra pela volta mais rápida, se o piloto terminasse entre os dez primeiros."] },
        { heading: "Mudou muitas vezes", body: ["Em 1950 só os cinco primeiros pontuavam, e a vitória valia oito pontos. A escala foi ampliada várias vezes para que mais pilotos e equipes pontuassem. Cada página de temporada do Paddock mostra o sistema usado naquele ano."] },
      ],
    },
    example: {
      text: { en: "In 2007 Kimi Räikkönen won the title by a single point over both Lewis Hamilton and Fernando Alonso.", pt: "Em 2007 Kimi Räikkönen foi campeão com um ponto de vantagem sobre Lewis Hamilton e Fernando Alonso." },
      href: "/seasons/2007",
      label: { en: "The 2007 season", pt: "A temporada de 2007" },
    },
    takeaways: {
      en: ["Top ten score in a Grand Prix", "Top eight score in a sprint", "Systems have changed over history"],
      pt: ["Os dez primeiros pontuam no GP", "Os oito primeiros pontuam na sprint", "O sistema mudou ao longo da história"],
    },
    related: [{ label: { en: "Seasons archive", pt: "Arquivo de temporadas" }, href: "/seasons" }],
  },
  {
    slug: "reading-a-race",
    level: "Beginner",
    minutes: 5,
    title: { en: "How to follow a race", pt: "Como acompanhar uma corrida" },
    summary: { en: "Gaps, tyres, pit stops and flags — what to watch on screen.", pt: "Diferenças, pneus, pit stops e bandeiras — o que observar na tela." },
    keyIdea: { en: "The running order is only part of the story; tyre age and pit stops still to come matter just as much.", pt: "A ordem na pista é só parte da história; a idade dos pneus e as paradas que ainda faltam importam tanto quanto." },
    sections: {
      en: [
        { heading: "The timing tower", body: ["The list on the side of the TV picture shows the running order and the gap to the car ahead or to the leader. Watch whether gaps are growing or shrinking."] },
        { heading: "Tyres and stops", body: ["A car leading on old tyres may be about to stop and lose places. A car further back on fresh tyres may be faster. Graphics show each car's compound and tyre age."] },
        { heading: "Flags and neutralisations", body: ["Yellow flags, the Safety Car and the Virtual Safety Car change the race — often creating cheaper pit-stop opportunities."] },
      ],
      pt: [
        { heading: "A torre de tempos", body: ["A lista na lateral da tela mostra a ordem e a diferença para o carro da frente ou para o líder. Observe se as diferenças estão aumentando ou diminuindo."] },
        { heading: "Pneus e paradas", body: ["Um líder com pneus velhos pode estar prestes a parar e perder posições. Um carro mais atrás com pneus novos pode ser mais rápido. Os gráficos mostram o composto e a idade dos pneus de cada carro."] },
        { heading: "Bandeiras e neutralizações", body: ["Bandeiras amarelas, o Safety Car e o Safety Car Virtual mudam a corrida — muitas vezes criando oportunidades de parada mais baratas."] },
      ],
    },
    example: {
      text: {
        en: "At Interlagos in 2008, Lewis Hamilton needed fifth place. He passed Timo Glock — still on dry tyres in the rain — in the final corners of the last lap to win the title by one point.",
        pt: "Em Interlagos, em 2008, Lewis Hamilton precisava do quinto lugar. Ele passou Timo Glock — ainda com pneus de seco na chuva — nas últimas curvas da última volta e foi campeão por um ponto.",
      },
      href: "/seasons/2008",
      label: { en: "The 2008 season", pt: "A temporada de 2008" },
    },
    takeaways: {
      en: ["Watch the gaps", "Know who still needs to stop", "Neutralisations change strategy"],
      pt: ["Observe as diferenças", "Saiba quem ainda precisa parar", "Neutralizações mudam a estratégia"],
    },
    related: [{ label: { en: "Race weekends", pt: "Fim de semana de corrida" }, href: "/race-weekend" }],
  },
  {
    slug: "how-qualifying-works",
    level: "Intermediate",
    minutes: 5,
    title: { en: "How qualifying works", pt: "Como funciona a classificação" },
    summary: { en: "The knockout session that sets the grid, and why it matters so much.", pt: "A sessão eliminatória que define o grid — e por que ela importa tanto." },
    keyIdea: { en: "Track position is valuable because overtaking is difficult — so a single perfect lap can decide a race.", pt: "A posição na pista vale muito porque ultrapassar é difícil — uma única volta perfeita pode decidir a corrida." },
    sections: {
      en: [
        { heading: "Three knockout rounds", body: ["In Q1 all drivers run and the slowest are eliminated. Q2 repeats the process with the remaining drivers. The fastest ten contest Q3 for pole position."] },
        { heading: "Track evolution and timing", body: ["As more rubber is laid down, the track gets faster, so drivers often aim to set their best lap at the end of a session. Finding clear track space without being blocked — or blocking others — is an art in itself."] },
        { heading: "How it changed", body: ["For decades the grid was set by the best time across two sessions; from 1996 there was a single one-hour session; one-lap formats followed in 2003, and the knockout format arrived in 2006."] },
      ],
      pt: [
        { heading: "Três rodadas eliminatórias", body: ["No Q1 todos andam e os mais lentos são eliminados. O Q2 repete o processo com quem sobrou. Os dez mais rápidos disputam a pole no Q3."] },
        { heading: "Evolução da pista e momento certo", body: ["Com mais borracha no asfalto, a pista fica mais rápida, e os pilotos costumam buscar a melhor volta no fim da sessão. Encontrar pista livre sem ser atrapalhado — nem atrapalhar ninguém — é uma arte."] },
        { heading: "Como mudou", body: ["Por décadas o grid era definido pelo melhor tempo em duas sessões; a partir de 1996 houve uma única sessão de uma hora; os formatos de volta única vieram em 2003 e o formato eliminatório chegou em 2006."] },
      ],
    },
    example: {
      text: { en: "Monaco is where qualifying matters most: in 2024 Charles Leclerc took pole position and converted it into victory at his home race.", pt: "Mônaco é onde a classificação mais pesa: em 2024 Charles Leclerc fez a pole e a transformou em vitória na corrida de casa." },
      href: "/circuits/monaco",
      label: { en: "Circuit de Monaco", pt: "Circuit de Monaco" },
    },
    takeaways: {
      en: ["Three knockout phases", "Track gets faster through the session", "Grid position matters most where overtaking is hard"],
      pt: ["Três fases eliminatórias", "A pista fica mais rápida durante a sessão", "O grid pesa mais onde é difícil ultrapassar"],
    },
    related: [{ label: { en: "Weekend format", pt: "Formato do fim de semana" }, href: "/race-weekend" }],
  },
  {
    slug: "how-pit-stops-work",
    level: "Intermediate",
    minutes: 4,
    title: { en: "How pit stops work", pt: "Como funcionam os pit stops" },
    summary: { en: "Twenty people, four wheels, about two seconds.", pt: "Vinte pessoas, quatro rodas, cerca de dois segundos." },
    keyIdea: { en: "The stationary time is short; the real cost of a stop is the time lost driving through the pit lane.", pt: "O tempo parado é curto; o custo real de uma parada é o tempo perdido atravessando o pit lane." },
    sections: {
      en: [
        { heading: "The crew", body: ["Each wheel has a gun operator, a person removing the old wheel and one fitting the new one. Jack operators lift the car at the front and rear. A signal releases the driver when every wheel is secure."] },
        { heading: "The pit-loss", body: ["Because of the pit-lane speed limit, a stop costs around 20 seconds of total race time at many circuits — different at every track. Strategists calculate where the car will rejoin, ideally in clean air rather than behind slower cars."] },
      ],
      pt: [
        { heading: "A equipe", body: ["Cada roda tem um operador de pistola, alguém que tira a roda velha e alguém que coloca a nova. Os operadores de macaco erguem o carro na frente e atrás. Um sinal libera o piloto quando todas as rodas estão presas."] },
        { heading: "O tempo perdido no pit", body: ["Por causa do limite de velocidade no pit lane, uma parada custa cerca de 20 segundos em muitos circuitos — diferente em cada pista. Os estrategistas calculam onde o carro vai voltar, de preferência em ar limpo, e não atrás de carros mais lentos."] },
      ],
    },
    example: {
      text: { en: "When refuelling was banned in 2010, stops became tyre changes only — and crews became dramatically faster.", pt: "Quando o reabastecimento foi proibido, em 2010, as paradas passaram a ser só troca de pneus — e as equipes ficaram muito mais rápidas." },
      href: "/seasons/2010",
      label: { en: "The 2010 season", pt: "A temporada de 2010" },
    },
    takeaways: {
      en: ["Crews practise thousands of stops", "Pit-loss varies by circuit", "Where you rejoin matters"],
      pt: ["As equipes treinam milhares de paradas", "O tempo perdido varia por circuito", "Onde o carro volta faz diferença"],
    },
    related: [{ label: { en: "Strategy", pt: "Estratégia" }, href: "/learn/tyres-and-strategy" }],
  },
  {
    slug: "tyres-and-strategy",
    level: "Intermediate",
    minutes: 6,
    title: { en: "How tyres affect strategy", pt: "Como os pneus definem a estratégia" },
    summary: { en: "Soft, medium, hard — and the undercut.", pt: "Macio, médio, duro — e o undercut." },
    keyIdea: { en: "Strategy is a trade-off between the speed of fresh tyres and the time lost making a pit stop.", pt: "Estratégia é a troca entre a velocidade dos pneus novos e o tempo perdido no pit stop." },
    sections: {
      en: [
        { heading: "Compounds", body: ["Softer compounds are faster but degrade sooner. In a dry race each car must use at least two different compounds, so every driver makes at least one stop."] },
        { heading: "The undercut", body: ["If a driver stops first, the speed of fresh tyres over the next lap or two may allow them to emerge ahead when the rival stops. This is the undercut."] },
        { heading: "The overcut", body: ["Sometimes staying out longer is better — if the rival rejoins in traffic or new tyres take time to warm up."] },
      ],
      pt: [
        { heading: "Compostos", body: ["Os compostos mais macios são mais rápidos, mas se degradam antes. Numa corrida seca cada carro precisa usar ao menos dois compostos diferentes, então todo piloto para pelo menos uma vez."] },
        { heading: "O undercut", body: ["Se um piloto para primeiro, a velocidade dos pneus novos nas voltas seguintes pode colocá-lo à frente quando o rival parar. Isso é o undercut."] },
        { heading: "O overcut", body: ["Às vezes ficar mais tempo na pista é melhor — se o rival voltar no tráfego ou se os pneus novos demorarem a aquecer."] },
      ],
    },
    example: {
      text: { en: "In 2005 tyre changes were banned. At Indianapolis that year, concerns over tyre safety meant only six cars started the race.", pt: "Em 2005 as trocas de pneu foram proibidas. Em Indianápolis, naquele ano, a preocupação com a segurança dos pneus fez apenas seis carros largarem." },
      href: "/seasons/2005",
      label: { en: "The 2005 season", pt: "A temporada de 2005" },
    },
    takeaways: {
      en: ["Speed vs longevity", "Undercut and overcut", "Neutralisations open strategic windows"],
      pt: ["Velocidade versus durabilidade", "Undercut e overcut", "Neutralizações abrem janelas estratégicas"],
    },
    related: [{ label: { en: "Tyres in depth", pt: "Pneus em detalhe" }, href: "/engineering/tyres" }],
  },
  {
    slug: "overtaking",
    level: "Intermediate",
    minutes: 4,
    title: { en: "Why overtaking is difficult", pt: "Por que ultrapassar é difícil" },
    summary: { en: "Dirty air, braking zones and the tools that help.", pt: "Ar sujo, zonas de frenagem e as ferramentas que ajudam." },
    keyIdea: { en: "A following car loses downforce in the turbulent wake of the car ahead.", pt: "O carro que vem atrás perde pressão aerodinâmica na esteira turbulenta do carro da frente." },
    sections: {
      en: [
        { heading: "Dirty air", body: ["The car ahead disturbs the airflow. In corners, the following car loses grip and its tyres overheat."] },
        { heading: "Help to overtake", body: ["From 2011 to 2025, the Drag Reduction System (DRS) let a car within one second of the car ahead open its rear-wing flap on designated straights. From 2026, active aerodynamics and additional electrical deployment take its place."] },
      ],
      pt: [
        { heading: "Ar sujo", body: ["O carro da frente perturba o fluxo de ar. Nas curvas, o carro de trás perde aderência e seus pneus superaquecem."] },
        { heading: "Ajuda para ultrapassar", body: ["De 2011 a 2025, o DRS permitia ao carro a menos de um segundo do da frente abrir a aba da asa traseira em retas determinadas. A partir de 2026, a aerodinâmica ativa e uma liberação elétrica adicional tomam seu lugar."] },
      ],
    },
    example: {
      text: { en: "DRS was introduced in 2011, the same year Pirelli became the sole tyre supplier.", pt: "O DRS foi introduzido em 2011, mesmo ano em que a Pirelli se tornou fornecedora única de pneus." },
      href: "/seasons/2011",
      label: { en: "The 2011 season", pt: "A temporada de 2011" },
    },
    takeaways: {
      en: ["Turbulence costs grip", "Overtaking aids have evolved", "Slipstreaming helps on straights"],
      pt: ["A turbulência custa aderência", "Os auxílios à ultrapassagem evoluíram", "O vácuo ajuda nas retas"],
    },
    related: [{ label: { en: "Aerodynamics", pt: "Aerodinâmica" }, href: "/engineering/aerodynamics" }],
  },
  {
    slug: "how-aerodynamics-work",
    level: "Advanced",
    minutes: 7,
    title: { en: "How aerodynamics work", pt: "Como funciona a aerodinâmica" },
    summary: { en: "Downforce, drag, floors and the aerodynamic platform.", pt: "Pressão aerodinâmica, arrasto, assoalhos e a plataforma aerodinâmica." },
    keyIdea: { en: "Downforce adds grip without adding mass, but costs drag — the whole car is shaped around that compromise.", pt: "A pressão aerodinâmica dá aderência sem acrescentar massa, mas custa arrasto — o carro inteiro é desenhado em torno desse compromisso." },
    sections: {
      en: [
        { heading: "Pressure difference", body: ["Wings and floors create downforce by producing lower pressure beneath a surface than above it. Accelerating air under the car's floor creates a powerful suction effect — ground effect."] },
        { heading: "Platform sensitivity", body: ["Floors are very sensitive to ride height and pitch. Suspension design is therefore largely aerodynamic: keeping the floor at the right distance from the track. Instability can cause porpoising — a violent bouncing at speed."] },
        { heading: "Efficiency", body: ["The best cars do not simply make the most downforce; they make it with the least drag and keep it consistent across speeds, corners and ride heights."] },
      ],
      pt: [
        { heading: "Diferença de pressão", body: ["Asas e assoalhos geram pressão aerodinâmica criando pressão menor embaixo de uma superfície do que em cima. Acelerar o ar sob o assoalho cria um forte efeito de sucção — o efeito solo."] },
        { heading: "Sensibilidade da plataforma", body: ["Os assoalhos são muito sensíveis à altura e à arfagem. Por isso o projeto da suspensão é, em boa parte, aerodinâmico: manter o assoalho na distância certa da pista. A instabilidade pode causar porpoising — um quicar violento em alta velocidade."] },
        { heading: "Eficiência", body: ["Os melhores carros não geram simplesmente mais pressão; geram com o menor arrasto possível e de forma consistente em diferentes velocidades, curvas e alturas."] },
      ],
    },
    example: {
      text: { en: "When ground effect returned in 2022, several teams suffered severe porpoising; the rules were adjusted for 2023 to reduce it.", pt: "Quando o efeito solo voltou, em 2022, várias equipes sofreram porpoising severo; as regras foram ajustadas para 2023 para reduzi-lo." },
      href: "/seasons/2022",
      label: { en: "The 2022 season", pt: "A temporada de 2022" },
    },
    takeaways: {
      en: ["Downforce vs drag", "The floor is the most important surface", "Consistency beats peak numbers"],
      pt: ["Pressão aerodinâmica versus arrasto", "O assoalho é a superfície mais importante", "Consistência vale mais que números de pico"],
    },
    related: [{ label: { en: "Aerodynamics article", pt: "Artigo de aerodinâmica" }, href: "/engineering/aerodynamics" }],
  },
  {
    slug: "how-teams-develop-cars",
    level: "Advanced",
    minutes: 6,
    title: { en: "How teams develop cars", pt: "Como as equipes desenvolvem os carros" },
    summary: { en: "Wind tunnels, CFD, simulators and the upgrade cycle.", pt: "Túneis de vento, CFD, simuladores e o ciclo de atualizações." },
    keyIdea: { en: "A car is never finished: teams bring upgrades throughout the season, within strict limits.", pt: "Um carro nunca está pronto: as equipes levam atualizações durante toda a temporada, dentro de limites rígidos." },
    sections: {
      en: [
        { heading: "The tools", body: ["Aerodynamicists use computational fluid dynamics (CFD) and scale models in wind tunnels. Driver-in-the-loop simulators test set-ups and new parts virtually before they reach the track."] },
        { heading: "Restrictions", body: ["Testing is heavily restricted. Aerodynamic testing time is allocated on a sliding scale — teams lower in the constructors' championship receive more — and the cost cap limits total spending on car performance. These rules are part of the Operational and Financial Regulations."] },
        { heading: "Correlation", body: ["A key challenge is correlation: ensuring that the gains predicted in CFD and the wind tunnel appear on the real car."] },
      ],
      pt: [
        { heading: "As ferramentas", body: ["Os aerodinamicistas usam dinâmica dos fluidos computacional (CFD) e modelos em escala em túneis de vento. Simuladores com piloto testam acertos e peças novas virtualmente antes de chegarem à pista."] },
        { heading: "Restrições", body: ["Os testes são muito restritos. O tempo de testes aerodinâmicos é distribuído em escala — as equipes mais atrás no campeonato de construtores recebem mais — e o teto de gastos limita o total investido em desempenho. Essas regras fazem parte dos Regulamentos Operacional e Financeiro."] },
        { heading: "Correlação", body: ["Um desafio central é a correlação: garantir que os ganhos previstos no CFD e no túnel de vento apareçam no carro de verdade."] },
      ],
    },
    example: {
      text: { en: "The Brawn BGP 001 that won both 2009 titles had been developed by Honda's staff before the team was rescued — its double diffuser came from reading the new rules more cleverly than rivals.", pt: "O Brawn BGP 001, campeão de 2009, foi desenvolvido pela equipe da Honda antes de a equipe ser salva — seu difusor duplo veio de uma leitura mais esperta das novas regras." },
      href: "/cars/brawn-bgp-001",
      label: { en: "Brawn BGP 001", pt: "Brawn BGP 001" },
    },
    takeaways: {
      en: ["CFD, tunnels, simulators", "Sliding-scale testing allowances", "Correlation is everything"],
      pt: ["CFD, túneis, simuladores", "Testes distribuídos em escala", "Correlação é tudo"],
    },
    related: [{ label: { en: "Technical regulations", pt: "Regulamento técnico" }, href: "/regulations/technical" }],
  },
  {
    slug: "regulations-and-performance",
    level: "Advanced",
    minutes: 6,
    title: { en: "How regulations influence performance", pt: "Como o regulamento influencia o desempenho" },
    summary: { en: "Why rule changes reshuffle the order.", pt: "Por que as mudanças de regras embaralham a ordem." },
    keyIdea: { en: "Every major regulation reset gives teams a chance to leap forward — or fall behind.", pt: "Toda grande reformulação de regras dá às equipes a chance de saltar à frente — ou ficar para trás." },
    sections: {
      en: [
        { heading: "Resets", body: ["Major regulation changes have frequently produced new dominant teams: Brawn in 2009, Mercedes in 2014 and Red Bull in 2022. The team that best understands the new rules first gains an advantage that can last years."] },
        { heading: "Convergence", body: ["Under stable rules, teams copy successful ideas and performance converges. This is why the field often becomes closer towards the end of a regulation cycle."] },
      ],
      pt: [
        { heading: "Reformulações", body: ["Grandes mudanças de regulamento muitas vezes produziram novas equipes dominantes: Brawn em 2009, Mercedes em 2014 e Red Bull em 2022. A equipe que entende primeiro as novas regras ganha uma vantagem que pode durar anos."] },
        { heading: "Convergência", body: ["Com regras estáveis, as equipes copiam as boas ideias e o desempenho converge. Por isso o pelotão costuma ficar mais próximo no fim de um ciclo de regulamento."] },
      ],
    },
    example: {
      text: { en: "Mercedes mastered the first turbo-hybrid rules in 2014: its W05 won 16 of 19 races and began a run of eight consecutive constructors' titles.", pt: "A Mercedes dominou as primeiras regras turbo-híbridas em 2014: seu W05 venceu 16 de 19 corridas e iniciou uma sequência de oito títulos de construtores seguidos." },
      href: "/cars/mercedes-f1-w05",
      label: { en: "Mercedes F1 W05", pt: "Mercedes F1 W05" },
    },
    takeaways: {
      en: ["Resets create opportunity", "Stable rules bring convergence", "Interpretation is a competitive skill"],
      pt: ["Reformulações criam oportunidades", "Regras estáveis trazem convergência", "Interpretar as regras é uma habilidade competitiva"],
    },
    related: [{ label: { en: "Regulations archive", pt: "Arquivo de regulamentos" }, href: "/regulations/archive" }],
  },
  {
    slug: "the-budget-cap",
    level: "Advanced",
    minutes: 4,
    title: { en: "The budget cap", pt: "O teto de gastos" },
    summary: { en: "How a spending limit changed the sport's economics.", pt: "Como um limite de gastos mudou a economia do esporte." },
    keyIdea: { en: "Since 2021, the money a team may spend on car performance is capped, rewarding efficiency.", pt: "Desde 2021, o dinheiro que uma equipe pode gastar em desempenho é limitado, o que premia a eficiência." },
    sections: {
      en: [
        { heading: "What it covers", body: ["The Financial Regulations limit spending on items related to car performance. Certain costs — such as drivers' salaries — are excluded. Breaches can lead to financial and sporting penalties."] },
        { heading: "Why it matters", body: ["The cap aims to make the competition closer and teams more financially sustainable."] },
      ],
      pt: [
        { heading: "O que ele cobre", body: ["O Regulamento Financeiro limita os gastos ligados ao desempenho do carro. Alguns custos — como os salários dos pilotos — ficam de fora. Infrações podem levar a punições financeiras e esportivas."] },
        { heading: "Por que importa", body: ["O teto busca aproximar a competição e tornar as equipes financeiramente sustentáveis."] },
      ],
    },
    example: {
      text: { en: "In 2022 the FIA found that Red Bull had exceeded the 2021 cap by a minor amount; the team was fined and its aerodynamic testing allowance reduced.", pt: "Em 2022 a FIA concluiu que a Red Bull havia excedido o teto de 2021 por uma margem pequena; a equipe foi multada e teve o tempo de testes aerodinâmicos reduzido." },
      href: "/regulations/financial",
      label: { en: "Financial regulations", pt: "Regulamento financeiro" },
    },
    takeaways: {
      en: ["Introduced in 2021", "Covers performance spending", "Penalties for breaches"],
      pt: ["Criado em 2021", "Cobre os gastos com desempenho", "Punições para infrações"],
    },
    related: [{ label: { en: "Financial regulations", pt: "Regulamento financeiro" }, href: "/regulations/financial" }],
  },
];

export function getLesson(slug: string) {
  return LESSONS.find((l) => l.slug === slug);
}
