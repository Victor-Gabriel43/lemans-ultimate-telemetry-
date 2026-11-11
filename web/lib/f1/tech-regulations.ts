import { F, S, T, type BiTech } from "./tech-types";

/** Regulation explainers — bilingual source. Official texts live in the FIA archive pages. */
export const REGULATIONS_BI: BiTech[] = [
  /* ---------------------------------------------------------------- Sporting */
  {
    slug: "sporting",
    group: "regulations",
    tone: "graphite",
    title: { pt: "Regulamento esportivo", en: "Sporting regulations" },
    summary: {
      pt: "Como um campeonato é disputado: o fim de semana, a largada, os boxes, o Safety Car, os pontos e as punições.",
      en: "How a championship is run: the weekend, the start, the pit lane, the Safety Car, points and penalties.",
    },
    simple: {
      pt: "Se o regulamento técnico diz como o carro pode ser, o esportivo diz como equipes e pilotos podem competir com ele: quantas sessões há, como se forma o grid, quantos pneus e motores cada um tem e o que acontece quando alguém quebra uma regra.",
      en: "If the technical regulations say what a car may be, the sporting regulations say how teams and drivers may compete with it: how many sessions there are, how the grid is formed, how many tyres and engines each gets and what happens when someone breaks a rule.",
    },
    facts: [
      { label: { pt: "Vitória vale", en: "A win is worth" }, value: { pt: "25 pontos (desde 2010)", en: "25 points (since 2010)" } },
      { label: { pt: "Pontuam", en: "Points awarded to" }, value: { pt: "os 10 primeiros (25-18-15-12-10-8-6-4-2-1)", en: "the top 10 (25-18-15-12-10-8-6-4-2-1)" } },
      { label: { pt: "Sprint", en: "Sprint" }, value: { pt: "8-7-6-5-4-3-2-1 (desde 2022)", en: "8-7-6-5-4-3-2-1 (since 2022)" } },
      { label: { pt: "Classificação em três partes", en: "Three-part qualifying" }, value: { pt: "desde 2006", en: "since 2006" } },
      { label: { pt: "Pontos na superlicença", en: "Super Licence penalty points" }, value: { pt: "12 pontos em 12 meses = suspensão de uma corrida", en: "12 points in 12 months = one-race ban" } },
    ],
    sections: [
      {
        heading: { pt: "Quem escreve e quem aplica", en: "Who writes them and who applies them" },
        body: [
          {
            pt: "A FIA publica o regulamento depois de discutir as mudanças com as equipes e com a Fórmula 1 (dona dos direitos comerciais) na Comissão de F1; a aprovação final é do Conselho Mundial de Automobilismo. Em 2026 o regulamento esportivo é a Seção B de um documento único, que reúne também o técnico (C), o financeiro (D e E) e o operacional (F).",
            en: "The FIA publishes the regulations after discussing changes with the teams and Formula One (the commercial rights holder) in the F1 Commission; final approval rests with the World Motor Sport Council. In 2026 the sporting regulations are Section B of a single document that also contains the technical (C), financial (D and E) and operational (F) rules.",
          },
          {
            pt: "Em cada evento, o diretor de prova comanda a corrida — bandeiras, Safety Car, bandeira vermelha. Já as punições são decididas pelos comissários desportivos, um painel independente que inclui um ex-piloto. As equipes podem pedir revisão de uma decisão se surgir prova nova e significativa, e recorrer ao Tribunal de Apelação da FIA em certos casos.",
            en: "At each event the race director runs the race — flags, Safety Car, red flags. Penalties, however, are decided by the stewards, an independent panel that includes a former driver. Teams may request a review of a decision if significant new evidence emerges, and appeal to the FIA International Court of Appeal in certain cases.",
          },
        ],
      },
      {
        heading: { pt: "O fim de semana", en: "The weekend" },
        body: [
          {
            pt: "Um fim de semana padrão tem três treinos livres, a classificação no sábado e a corrida no domingo. Nos fins de semana sprint há apenas um treino livre, a classificação da sprint, a sprint no sábado, e a classificação e a corrida principal. A corrida precisa ter a menor distância que passe de 305 km (Mônaco é a exceção) e tem limite de duas horas de prova.",
            en: "A standard weekend has three practice sessions, qualifying on Saturday and the race on Sunday. Sprint weekends have just one practice session, sprint qualifying, the sprint on Saturday, then qualifying and the Grand Prix. The race must cover the fewest laps exceeding 305 km (Monaco is the exception) and is limited to two hours of racing.",
          },
        ],
      },
      {
        heading: { pt: "Como se forma o grid", en: "How the grid is formed" },
        body: [
          {
            pt: "Até 1995 havia duas sessões de classificação (sexta e sábado) e valia o melhor tempo. De 1996 a 2002, uma hora no sábado com limite de 12 voltas, e a regra dos 107%: quem ficasse mais de 7% atrás do pole não largava. Em 2003–2005 vieram as voltas únicas, uma por vez. Desde 2006 a classificação tem três partes eliminatórias (Q1, Q2, Q3). Uma tentativa de eliminação a cada 90 segundos, em 2016, durou só duas corridas.",
            en: "Until 1995 there were two qualifying sessions (Friday and Saturday) and the best time counted. From 1996 to 2002, one hour on Saturday with a 12-lap limit, and the 107% rule: anyone more than 7% slower than pole did not start. In 2003–2005 came single-lap runs, one car at a time. Since 2006 qualifying has had three knockout parts (Q1, Q2, Q3). An elimination-every-90-seconds format in 2016 lasted only two races.",
          },
          {
            pt: "Punições de grid — por trocar componentes do motor ou do câmbio além da cota, ou por infrações em sessões anteriores — empurram o piloto para trás depois da classificação.",
            en: "Grid penalties — for changing power-unit or gearbox components beyond the allocation, or for offences in earlier sessions — move a driver back after qualifying.",
          },
        ],
      },
      {
        heading: { pt: "Pontos através da história", en: "Points through history" },
        body: [
          {
            pt: "Em 1950 pontuavam os cinco primeiros (8-6-4-3-2) e havia um ponto pela volta mais rápida. Durante décadas só os melhores resultados de cada piloto contavam — por isso Alain Prost marcou mais pontos que Ayrton Senna em 1988, mas perdeu o título. Todos os resultados passaram a contar em 1991; a vitória passou a valer 10 pontos em 1991, os oito primeiros pontuaram a partir de 2003 e, desde 2010, a escala é 25-18-15-12-10-8-6-4-2-1.",
            en: "In 1950 the top five scored (8-6-4-3-2) and there was a point for fastest lap. For decades only a driver's best results counted — which is why Alain Prost scored more points than Ayrton Senna in 1988 but lost the title. All results counted from 1991; a win became worth 10 points in 1991, the top eight scored from 2003 and since 2010 the scale has been 25-18-15-12-10-8-6-4-2-1.",
          },
          {
            pt: "O ponto pela volta mais rápida voltou em 2019 e foi retirado depois de 2024. As sprints dão pontos aos oito primeiros desde 2022. Corridas encurtadas dão pontos reduzidos, numa escala que depende da distância completada — regra criada depois do GP da Bélgica de 2021, que teve apenas voltas atrás do Safety Car. Cada página de temporada no Paddock mostra o sistema usado naquele ano.",
            en: "The fastest-lap point returned in 2019 and was withdrawn after 2024. Sprints have awarded points to the top eight since 2022. Shortened races award reduced points on a scale that depends on distance completed — a rule created after the 2021 Belgian Grand Prix, which ran only behind the Safety Car. Every season page on Paddock shows the system used that year.",
          },
        ],
      },
      {
        heading: { pt: "Parque fechado e alocações", en: "Parc fermé and allocations" },
        body: [
          {
            pt: "Desde 2003, os carros entram em regime de parque fechado a partir da classificação: as equipes não podem mudar o acerto nem trocar peças significativas até a corrida, a não ser com autorização e, em geral, largando do pit lane. Isso impede um carro especial de classificação.",
            en: "Since 2003, cars have been in parc fermé from qualifying: teams may not change the set-up or replace significant parts before the race, except with permission and, usually, a pit-lane start. This prevents special qualifying cars.",
          },
          {
            pt: "O regulamento limita quantos jogos de pneus, quantos componentes da unidade de potência e quantos câmbios cada piloto pode usar, além do toque de recolher que impede as equipes de trabalhar no carro durante a noite.",
            en: "The regulations limit how many tyre sets, power-unit components and gearboxes each driver may use, plus a curfew that stops teams working on the cars overnight.",
          },
        ],
      },
      {
        heading: { pt: "Punições", en: "Penalties" },
        body: [
          {
            pt: "As punições vão da advertência (reprimenda) a acréscimos de 5 ou 10 segundos, drive-through, stop-and-go de 10 segundos, perda de posições no grid, desclassificação e suspensão. Além disso, cada infração pode somar pontos na superlicença: quem chega a 12 pontos em 12 meses fica fora de uma corrida — foi o que aconteceu com Kevin Magnussen em 2024.",
            en: "Penalties range from a reprimand to 5- or 10-second time penalties, drive-throughs, 10-second stop-and-go penalties, grid drops, disqualification and suspension. On top of that, offences can add penalty points to the Super Licence: a driver reaching 12 points in 12 months misses a race — as happened to Kevin Magnussen in 2024.",
          },
          {
            pt: "Ordens de equipe foram proibidas de 2002 a 2010, depois que a Ferrari mandou Rubens Barrichello ceder a vitória a Michael Schumacher na Áustria em 2002; a proibição foi retirada para 2011 por ser impossível de fiscalizar.",
            en: "Team orders were banned from 2002 to 2010, after Ferrari told Rubens Barrichello to hand the win to Michael Schumacher in Austria in 2002; the ban was lifted for 2011 as impossible to police.",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "Parque fechado", en: "Parc fermé" }, definition: { pt: "Regime em que as equipes não podem alterar o carro entre a classificação e a corrida.", en: "Conditions under which teams may not alter the car between qualifying and the race." } },
      { term: { pt: "Comissários desportivos", en: "Stewards" }, definition: { pt: "Painel que investiga incidentes e decide punições.", en: "The panel that investigates incidents and decides penalties." } },
      { term: { pt: "Diretor de prova", en: "Race director" }, definition: { pt: "Responsável pela condução do evento: bandeiras, Safety Car, largada.", en: "Responsible for running the event: flags, Safety Car, start." } },
      { term: { pt: "Superlicença", en: "Super Licence" }, definition: { pt: "Licença que o piloto precisa ter para correr na F1.", en: "The licence a driver must hold to race in F1." } },
      { term: { pt: "Regra dos 107%", en: "107% rule" }, definition: { pt: "Quem fica mais de 7% atrás do pole pode não largar.", en: "A driver more than 7% slower than pole may not start." } },
      { term: { pt: "Toque de recolher", en: "Curfew" }, definition: { pt: "Período noturno em que as equipes não podem trabalhar nos carros.", en: "Overnight period when teams may not work on the cars." } },
      { term: { pt: "Direito de revisão", en: "Right of review" }, definition: { pt: "Pedido para reexaminar uma decisão diante de prova nova.", en: "A request to re-examine a decision in light of new evidence." } },
    ],
    history: [
      { year: "1950", title: { pt: "Campeonato de pilotos", en: "Drivers' championship" }, text: { pt: "Cinco primeiros pontuam, mais a volta mais rápida.", en: "Top five score, plus fastest lap." } },
      { year: "1958", title: { pt: "Construtores", en: "Constructors" }, text: { pt: "Criado o campeonato de construtores.", en: "Constructors' championship introduced." } },
      { year: "1991", title: { pt: "Todos os resultados contam", en: "All results count" }, text: { pt: "Fim dos descartes; vitória vale 10.", en: "Dropped scores end; a win is worth 10." } },
      { year: "1996", title: { pt: "Regra dos 107%", en: "107% rule" }, text: { pt: "Classificação única no sábado.", en: "Single Saturday qualifying." } },
      { year: "2003", title: { pt: "Parque fechado", en: "Parc fermé" }, text: { pt: "Entre classificação e corrida.", en: "Between qualifying and race." } },
      { year: "2006", title: { pt: "Q1, Q2, Q3", en: "Q1, Q2, Q3" }, text: { pt: "Classificação eliminatória.", en: "Knockout qualifying." } },
      { year: "2010", title: { pt: "25 pontos", en: "25 points" }, text: { pt: "A escala moderna.", en: "The modern scale." } },
      { year: "2021", title: { pt: "Sprints", en: "Sprints" }, text: { pt: "Corrida curta em etapas selecionadas.", en: "Short race at selected events." } },
      { year: "2026", title: { pt: "Novos modos", en: "New modes" }, text: { pt: "Regras para aerodinâmica ativa e energia extra de ultrapassagem.", en: "Rules for active aero and extra overtaking energy." } },
    ],
    related: ["technical", "safety"],
    cars: [],
    regs: [S("B1.9"), S("B2.5"), S("B3.5"), S("B5.12"), S("B5.13"), S("B6.3")],
  },

  /* --------------------------------------------------------------- Technical */
  {
    slug: "technical",
    group: "regulations",
    tone: "graphite",
    title: { pt: "Regulamento técnico", en: "Technical regulations" },
    summary: {
      pt: "O livro de regras que define o que um F1 pode ser — e a história de engenheiros tentando contorná-lo.",
      en: "The rulebook that defines what an F1 car may be — and the story of engineers trying to get around it.",
    },
    simple: {
      pt: "Cada equipe projeta o próprio carro, mas ele precisa caber numa “caixa” de regras: dimensões, peso, formato das asas, tipo de motor, materiais e testes de segurança. As melhores equipes são as que encontram mais desempenho dentro dessa caixa.",
      en: "Each team designs its own car, but it must fit inside a ‘box’ of rules: dimensions, weight, wing shapes, engine type, materials and safety tests. The best teams are the ones that find the most performance inside that box.",
    },
    facts: [
      { label: { pt: "Seção no documento de 2026", en: "Section in the 2026 document" }, value: { pt: "C — Regulamento Técnico", en: "C — Technical Regulations" } },
      { label: { pt: "Peso mínimo 2026", en: "2026 minimum mass" }, value: { pt: "art. C4.1", en: "Art. C4.1" } },
      { label: { pt: "Motor 2026", en: "2026 engine" }, value: { pt: "art. C5.1", en: "Art. C5.1" } },
      { label: { pt: "Quatro rodas obrigatórias", en: "Four wheels mandatory" }, value: { pt: "desde 1983", en: "since 1983" } },
    ],
    sections: [
      {
        heading: { pt: "O que ele define", en: "What it defines" },
        body: [
          {
            pt: "O regulamento técnico especifica dimensões máximas e mínimas, o peso mínimo, os volumes em que a carroceria pode existir, a arquitetura da unidade de potência, combustível e óleo, transmissão, suspensão, freios, rodas e pneus, eletrônica, materiais permitidos e as estruturas de segurança com seus testes. No documento de 2026, é a Seção C.",
            en: "The technical regulations specify maximum and minimum dimensions, minimum mass, the volumes in which bodywork may exist, the power-unit architecture, fuel and oil, transmission, suspension, brakes, wheels and tyres, electronics, permitted materials and the safety structures and their tests. In the 2026 document they are Section C.",
          },
          {
            pt: "As regras de aerodinâmica modernas usam “volumes de referência”: caixas tridimensionais dentro das quais cada superfície precisa estar, com raios mínimos de curvatura e um número limitado de elementos. Isso dá liberdade de desenho, mas evita aletas e apêndices sem fim.",
            en: "Modern aerodynamic rules use ‘reference volumes’: three-dimensional boxes within which each surface must lie, with minimum radii of curvature and a limited number of elements. This allows design freedom but prevents endless fins and appendages.",
          },
        ],
      },
      {
        heading: { pt: "Como a legalidade é verificada", en: "How legality is checked" },
        body: [
          {
            pt: "Em todo evento os carros passam por vistoria técnica. Depois da corrida, os primeiros colocados e carros sorteados são checados: peso, altura, desgaste da prancha, combustível, dimensões. Testes de carga verificam se asas e assoalho não flexionam além do permitido — asas que “dobram” na velocidade foram tema de disputas em várias épocas.",
            en: "At every event the cars go through scrutineering. After the race, the leading cars and randomly selected ones are checked: weight, ride height, plank wear, fuel, dimensions. Load tests check that wings and floor do not flex beyond permitted limits — wings that ‘bend’ at speed have been disputed in several eras.",
          },
          {
            pt: "Um carro ilegal é desclassificado, mesmo que a infração não dê vantagem. Em 2023, Lewis Hamilton e Charles Leclerc foram desclassificados em Austin por desgaste excessivo da prancha.",
            en: "An illegal car is disqualified even if the infringement brings no advantage. In 2023 Lewis Hamilton and Charles Leclerc were disqualified in Austin for excessive plank wear.",
          },
        ],
      },
      {
        heading: { pt: "Diretivas, protestos e o espírito da regra", en: "Directives, protests and the spirit of the rules" },
        body: [
          {
            pt: "Quando surge uma dúvida, a FIA publica diretivas técnicas com sua interpretação. Equipes podem protestar contra carros rivais. Em 2020 a Racing Point perdeu 15 pontos e foi multada em € 400 mil porque seus dutos de freio, considerados peças que cada equipe deve projetar, haviam sido copiados de desenhos da Mercedes.",
            en: "When doubts arise, the FIA publishes technical directives with its interpretation. Teams can protest rival cars. In 2020 Racing Point lost 15 points and was fined €400,000 because its brake ducts, classed as parts each team must design itself, had been copied from Mercedes drawings.",
          },
          {
            pt: "Para conter custos, parte das peças é padronizada ou pode ser comprada de outra equipe, enquanto outras — chassi, carroceria, assoalho — precisam ser projetadas por cada construtor. É isso que distingue um construtor de uma equipe cliente.",
            en: "To control costs, some parts are standardised or may be bought from another team, while others — chassis, bodywork, floor — must be designed by each constructor. That is what distinguishes a constructor from a customer team.",
          },
        ],
      },
      {
        heading: { pt: "As grandes brechas", en: "The great loopholes" },
        body: [
          {
            pt: "Boa parte da história técnica da F1 é feita de brechas: o Tyrrell P34 de seis rodas (1976), o Brabham BT46B com ventilador (1978), o difusor duplo da Brawn (2009), o F-duct da McLaren (2010), o amortecedor de massa da Renault (2005–2006) e o volante que mexia a convergência das rodas, o DAS, da Mercedes (2020). A FIA reage esclarecendo ou mudando a regra — às vezes na hora, às vezes no ano seguinte. Desde 1983, por exemplo, os carros precisam ter exatamente quatro rodas.",
            en: "Much of F1's technical history is made of loopholes: the six-wheeled Tyrrell P34 (1976), the fan-equipped Brabham BT46B (1978), Brawn's double diffuser (2009), McLaren's F-duct (2010), Renault's mass damper (2005–2006) and Mercedes' toe-adjusting DAS steering (2020). The FIA reacts by clarifying or changing the rule — sometimes immediately, sometimes the following year. Since 1983, for example, cars must have exactly four wheels.",
          },
        ],
      },
      {
        heading: { pt: "Ciclos de regulamento", en: "Regulation cycles" },
        body: [
          {
            pt: "As regras principais ficam estáveis por alguns anos e depois mudam de uma vez — os grandes “resets” de 1983, 1989, 1994, 2009, 2014, 2017, 2022 e 2026. Em cada reset, quem interpreta melhor a página em branco costuma dominar: a Brawn em 2009, a Mercedes em 2014, a Red Bull em 2022. Com o tempo, as equipes convergem e o grid se aproxima.",
            en: "The main rules stay stable for a few years and then change at once — the big ‘resets’ of 1983, 1989, 1994, 2009, 2014, 2017, 2022 and 2026. At each reset, whoever reads the blank page best tends to dominate: Brawn in 2009, Mercedes in 2014, Red Bull in 2022. Over time the teams converge and the field closes up.",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "Volume de referência", en: "Reference volume" }, definition: { pt: "Caixa tridimensional dentro da qual uma superfície pode existir.", en: "A 3D box within which a surface may exist." } },
      { term: { pt: "Vistoria técnica", en: "Scrutineering" }, definition: { pt: "Inspeção de legalidade dos carros.", en: "Inspection of the cars' legality." } },
      { term: { pt: "Diretiva técnica", en: "Technical directive" }, definition: { pt: "Interpretação da FIA sobre um ponto do regulamento.", en: "The FIA's interpretation of a point in the rules." } },
      { term: { pt: "Peça listada", en: "Listed team component" }, definition: { pt: "Peça que cada equipe precisa projetar por conta própria.", en: "A part each team must design itself." } },
      { term: { pt: "Teste de flexão", en: "Deflection test" }, definition: { pt: "Carga aplicada para verificar se a peça não flexiona demais.", en: "A load applied to check that a part does not flex too much." } },
      { term: { pt: "Homologação", en: "Homologation" }, definition: { pt: "Aprovação de um componente, muitas vezes congelando seu desenho.", en: "Approval of a component, often freezing its design." } },
    ],
    history: [
      { year: "1961", title: { pt: "1,5 litro", en: "1.5 litres" }, text: { pt: "Motores menores por segurança.", en: "Smaller engines for safety." } },
      { year: "1969", title: { pt: "Asas limitadas", en: "Wings limited" }, text: { pt: "Fim das asas altas.", en: "High wings end." } },
      { year: "1983", title: { pt: "Fundo plano", en: "Flat bottom" }, text: { pt: "Saias proibidas; quatro rodas obrigatórias.", en: "Skirts banned; four wheels mandatory." } },
      { year: "1994", title: { pt: "Auxílios proibidos", en: "Aids banned" }, text: { pt: "Suspensão ativa e controle de tração.", en: "Active suspension and traction control." } },
      { year: "2009", title: { pt: "Nova aerodinâmica", en: "New aerodynamics" }, text: { pt: "Carros simplificados; KERS e slicks.", en: "Simplified cars; KERS and slicks." } },
      { year: "2014", title: { pt: "Unidades de potência", en: "Power units" }, text: { pt: "V6 turbo híbrido.", en: "Turbo-hybrid V6." } },
      { year: "2022", title: { pt: "Efeito solo", en: "Ground effect" }, text: { pt: "Túneis Venturi e rodas de 18\".", en: "Venturi tunnels and 18\" wheels." } },
      { year: "2026", title: { pt: "Nova fórmula", en: "New formula" }, text: { pt: "Aerodinâmica ativa e nova unidade de potência.", en: "Active aero and new power unit." } },
    ],
    related: ["sporting", "history"],
    cars: ["tyrrell-p34", "brabham-bt46b", "brawn-bgp-001"],
    regs: [T("C1.3"), T("C1.4"), T("C4.1"), T("C5.1")],
  },

  /* --------------------------------------------------------------- Financial */
  {
    slug: "financial",
    group: "regulations",
    tone: "gold",
    title: { pt: "Regulamento financeiro", en: "Financial regulations" },
    summary: {
      pt: "O teto de gastos: quanto uma equipe pode investir em desempenho — e o que acontece se gastar mais.",
      en: "The cost cap: how much a team may spend on performance — and what happens if it spends more.",
    },
    simple: {
      pt: "Desde 2021 cada equipe tem um limite anual para gastar em tudo que deixa o carro mais rápido. Ela entrega suas contas à FIA, que confere e pune quem estourar o limite.",
      en: "Since 2021 each team has an annual limit on spending on everything that makes the car faster. It submits its accounts to the FIA, which checks them and penalises anyone who exceeds the limit.",
    },
    facts: [
      { label: { pt: "2021", en: "2021" }, value: { pt: "US$ 145 milhões", en: "US$145 million" } },
      { label: { pt: "2022", en: "2022" }, value: { pt: "US$ 140 milhões", en: "US$140 million" } },
      { label: { pt: "2023–2025", en: "2023–2025" }, value: { pt: "US$ 135 milhões (com ajustes por inflação e número de corridas)", en: "US$135 million (adjusted for inflation and number of races)" } },
      { label: { pt: "2026", en: "2026" }, value: { pt: "US$ 215 milhões, com escopo mais amplo", en: "US$215 million, with a broader scope" } },
      { label: { pt: "Primeira punição por gasto acima do teto", en: "First overspend penalty" }, value: { pt: "Red Bull, temporada 2021", en: "Red Bull, 2021 season" } },
    ],
    sections: [
      {
        heading: { pt: "Por que existe", en: "Why it exists" },
        body: [
          {
            pt: "Por décadas o desempenho acompanhou o orçamento: as maiores equipes gastavam várias vezes mais que as menores, e várias equipes independentes fecharam. O teto de gastos, adotado em 2021, busca deixar a disputa mais equilibrada e as equipes financeiramente sustentáveis — e, junto com a nova divisão de receitas, tornou as equipes ativos valorizados.",
            en: "For decades performance followed budget: the biggest teams spent several times more than the smallest, and many independent teams folded. The cost cap, adopted in 2021, aims to make the competition more even and the teams financially sustainable — and, together with a new revenue split, it turned teams into valuable assets.",
          },
        ],
      },
      {
        heading: { pt: "O que conta e o que não conta", en: "What counts and what doesn't" },
        body: [
          {
            pt: "Entram no teto praticamente todos os custos de projetar, construir, desenvolver e operar os carros: pessoal técnico, peças, túnel de vento, logística das corridas. Ficam de fora, entre outros, os salários dos pilotos e dos três funcionários mais bem pagos, o marketing e o custo das unidades de potência, que têm regras próprias.",
            en: "Practically all the costs of designing, building, developing and running the cars count: technical staff, parts, wind tunnel, race logistics. Excluded, among others, are the salaries of the drivers and the three highest-paid employees, marketing and the cost of the power units, which have their own rules.",
          },
          {
            pt: "O valor é ajustado pela inflação e pelo número de corridas acima de 21. Em 2026 o teto subiu para US$ 215 milhões, mas porque custos antes excluídos passaram a ser contados — não significa que as equipes possam gastar muito mais em desempenho.",
            en: "The figure is adjusted for inflation and for races beyond 21. In 2026 the cap rose to US$215 million, but because previously excluded costs are now counted — it does not mean teams can spend much more on performance.",
          },
        ],
      },
      {
        heading: { pt: "Prestação de contas", en: "Reporting" },
        body: [
          {
            pt: "Depois de cada ano, as equipes enviam um relatório auditado à Administração do Teto de Gastos da FIA, que pode inspecionar documentos e instalações. A FIA então publica quais equipes cumpriram as regras.",
            en: "After each year, the teams send an audited report to the FIA Cost Cap Administration, which can inspect documents and facilities. The FIA then publishes which teams complied.",
          },
        ],
      },
      {
        heading: { pt: "Infrações e punições", en: "Breaches and penalties" },
        body: [
          {
            pt: "O regulamento separa infrações processuais (erros no relatório ou prazos) de gastos acima do teto, que são “menores” abaixo de 5% do limite e “materiais” acima disso. As punições vão de multas e reprimendas a perda de pontos, redução do tempo de túnel de vento, suspensão e até exclusão do campeonato.",
            en: "The regulations separate procedural breaches (reporting errors or deadlines) from overspends, which are ‘minor’ below 5% of the cap and ‘material’ above it. Penalties range from fines and reprimands to points deductions, reduced wind-tunnel time, suspension and even exclusion from the championship.",
          },
          {
            pt: "O primeiro caso foi o da Red Bull em 2021: gasto acima do teto classificado como menor, multa de US$ 7 milhões e 10% a menos de testes aerodinâmicos. A Aston Martin recebeu multa por infração processual no mesmo ano.",
            en: "The first case was Red Bull's 2021 overspend: classed as minor, it brought a US$7 million fine and a 10% cut in aerodynamic testing. Aston Martin was fined for a procedural breach the same year.",
          },
        ],
      },
      {
        heading: { pt: "Limite de testes aerodinâmicos", en: "Aerodynamic testing limits" },
        body: [
          {
            pt: "Junto com o teto, o regulamento esportivo distribui o tempo de túnel de vento e de CFD numa escala móvel: a equipe campeã recebe a menor cota e a última colocada, a maior. É um segundo mecanismo de equilíbrio, que não depende de dinheiro.",
            en: "Alongside the cap, the sporting regulations allocate wind-tunnel and CFD time on a sliding scale: the champion team receives the smallest allowance and the last-placed team the largest. It is a second levelling mechanism that does not depend on money.",
          },
        ],
      },
      {
        heading: { pt: "Fabricantes de motores", en: "Power unit manufacturers" },
        body: [
          {
            pt: "Os fabricantes de unidades de potência têm um teto próprio, em vigor desde 2023, que em 2026 se tornou a Seção E do regulamento. Ele foi importante para atrair novos fabricantes para a geração de motores de 2026.",
            en: "Power-unit manufacturers have their own cap, in force since 2023, which in 2026 became Section E of the regulations. It was important in attracting new manufacturers to the 2026 engine generation.",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "Teto de gastos", en: "Cost cap" }, definition: { pt: "Gasto máximo permitido por ano em custos relevantes.", en: "The maximum permitted relevant spending per year." } },
      { term: { pt: "Exclusões", en: "Exclusions" }, definition: { pt: "Custos que não entram no teto, como salários dos pilotos.", en: "Costs outside the cap, such as drivers' salaries." } },
      { term: { pt: "Infração processual", en: "Procedural breach" }, definition: { pt: "Erro de procedimento, como atraso ou relatório incorreto.", en: "A procedural error, such as a late or incorrect report." } },
      { term: { pt: "Gasto menor / material", en: "Minor / material overspend" }, definition: { pt: "Estouro abaixo ou acima de 5% do teto.", en: "An overspend below or above 5% of the cap." } },
      { term: { pt: "ATR", en: "ATR" }, definition: { pt: "Restrições de testes aerodinâmicos em escala móvel.", en: "Aerodynamic Testing Restrictions on a sliding scale." } },
    ],
    history: [
      { year: "2021", title: { pt: "Teto de gastos", en: "Cost cap" }, text: { pt: "US$ 145 milhões; escala móvel de túnel de vento.", en: "US$145 million; sliding wind-tunnel scale." } },
      { year: "2022", title: { pt: "Primeiras sentenças", en: "First rulings" }, text: { pt: "Red Bull e Aston Martin punidas pelo ano de 2021.", en: "Red Bull and Aston Martin penalised for 2021." } },
      { year: "2023", title: { pt: "US$ 135 milhões", en: "US$135 million" }, text: { pt: "Teto também para fabricantes de motores.", en: "Cap also for power-unit manufacturers." } },
      { year: "2026", title: { pt: "Novo escopo", en: "New scope" }, text: { pt: "US$ 215 milhões; Seções D e E.", en: "US$215 million; Sections D and E." } },
    ],
    related: ["sporting", "history"],
    cars: [],
    regs: [F("D1.2"), F("D4.1"), F("D12.1")],
  },

  /* ------------------------------------------------------------------ Safety */
  {
    slug: "safety",
    group: "regulations",
    tone: "red",
    title: { pt: "Segurança", en: "Safety" },
    summary: {
      pt: "Dos fardos de palha ao halo: como a Fórmula 1 ficou dramaticamente mais segura.",
      en: "From straw bales to the halo: how Formula One became dramatically safer.",
    },
    simple: {
      pt: "Correr a mais de 300 km/h nunca será livre de risco. Mas carros, autódromos, equipamentos e atendimento médico tornaram acidentes graves muito mais raros do que nas primeiras décadas, quando a morte era parte da rotina do esporte.",
      en: "Racing at more than 300 km/h will never be risk-free. But cars, circuits, equipment and medical care have made serious accidents far rarer than in the early decades, when death was part of the sport's routine.",
    },
    facts: [
      { label: { pt: "Último GP no Nordschleife", en: "Last Nordschleife Grand Prix" }, value: { pt: "1976", en: "1976" } },
      { label: { pt: "Safety Car permanente", en: "Safety Car made permanent" }, value: { pt: "1993", en: "1993" } },
      { label: { pt: "Limite de velocidade nos boxes", en: "Pit-lane speed limit" }, value: { pt: "1994", en: "1994" } },
      { label: { pt: "Safety Car Virtual", en: "Virtual Safety Car" }, value: { pt: "2015", en: "2015" } },
      { label: { pt: "Halo", en: "Halo" }, value: { pt: "2018", en: "2018" } },
    ],
    sections: [
      {
        heading: { pt: "As primeiras décadas", en: "The early decades" },
        body: [
          {
            pt: "Nos anos 1950 e 1960 os autódromos tinham árvores, postes, casas e público junto à pista; os pilotos usavam capacetes abertos e não havia cintos. Muitos morreram. Jackie Stewart, depois de um acidente em Spa em 1966, liderou uma campanha por guard-rails, áreas de escape, serviço médico e capacetes fechados — e foi criticado por isso na época.",
            en: "In the 1950s and 1960s circuits had trees, posts, houses and spectators beside the track; drivers wore open helmets and there were no seat belts. Many were killed. Jackie Stewart, after a crash at Spa in 1966, led a campaign for barriers, run-off areas, medical services and full-face helmets — and was criticised for it at the time.",
          },
          {
            pt: "Em 1976, Niki Lauda quase morreu num incêndio no Nürburgring, e o Nordschleife, com mais de 22 km, nunca mais recebeu a F1. Em 1978, o neurocirurgião Sid Watkins começou a trabalhar no esporte e transformou o atendimento médico: helicóptero, carro médico seguindo a primeira volta e centro médico em cada autódromo.",
            en: "In 1976 Niki Lauda almost died in a fire at the Nürburgring, and the Nordschleife, over 22 km long, never hosted F1 again. In 1978 neurosurgeon Sid Watkins began working in the sport and transformed medical care: helicopters, a medical car following the first lap and a medical centre at every circuit.",
          },
        ],
      },
      {
        heading: { pt: "Ímola 1994 e a segurança científica", en: "Imola 1994 and science-led safety" },
        body: [
          {
            pt: "A morte de Roland Ratzenberger e Ayrton Senna no mesmo fim de semana, em Ímola, foi o ponto de virada. A FIA passou a tratar segurança como pesquisa, com dados de acidentes registrados por caixas-pretas nos carros. Vieram limites de velocidade nos boxes, cockpits mais altos, testes de impacto mais duros, cabos nas rodas, mudanças nos autódromos e, em 2003, o HANS.",
            en: "The deaths of Roland Ratzenberger and Ayrton Senna on the same weekend at Imola were the turning point. The FIA began treating safety as research, with crash data recorded by on-board accident data recorders. Pit-lane speed limits, higher cockpits, tougher crash tests, wheel tethers, circuit changes and, in 2003, HANS followed.",
          },
        ],
      },
      {
        heading: { pt: "Neutralizar a corrida", en: "Neutralising the race" },
        body: [
          {
            pt: "O Safety Car foi usado pela primeira vez no Canadá em 1973 e virou procedimento permanente em 1993. Depois do acidente de Jules Bianchi em Suzuka, em 2014, quando seu carro bateu num trator de resgate sob bandeira amarela, foi criado o Safety Car Virtual (2015): todos os pilotos precisam respeitar um tempo mínimo por setor, mantendo as distâncias.",
            en: "The Safety Car was first used in Canada in 1973 and became a permanent procedure in 1993. After Jules Bianchi's accident at Suzuka in 2014, when his car hit a recovery tractor under yellow flags, the Virtual Safety Car was created (2015): every driver must respect a minimum time per sector, preserving the gaps.",
          },
          {
            pt: "Bandeiras e luzes, operadas pela direção de prova e pelos fiscais de pista, avisam sobre perigo (amarela), pista escorregadia, carro lento, ou interrupção da sessão (vermelha).",
            en: "Flags and lights, operated by race control and the marshals, warn of danger (yellow), a slippery track, a slow car or a suspended session (red).",
          },
        ],
      },
      {
        heading: { pt: "Autódromos", en: "Circuits" },
        body: [
          {
            pt: "Cada autódromo precisa de uma licença de Grau 1 da FIA para receber a F1. Áreas de escape asfaltadas, barreiras de pneus, barreiras de absorção de energia e alambrados mais altos substituíram fardos de palha e guard-rails simples. Muitas curvas históricas foram alteradas por segurança — o que nem sempre agradou aos fãs.",
            en: "Every circuit needs an FIA Grade 1 licence to host F1. Paved run-off, tyre barriers, energy-absorbing barriers and taller debris fencing replaced straw bales and simple guard rails. Many historic corners were altered for safety — not always to fans' liking.",
          },
        ],
      },
      {
        heading: { pt: "O halo e o presente", en: "The halo and today" },
        body: [
          {
            pt: "O halo se tornou obrigatório em 2018 e já protegeu vários pilotos, como Romain Grosjean no Bahrein em 2020. Desde 1994, Jules Bianchi, que morreu em 2015 por lesões sofridas em Suzuka, é o único piloto a morrer em decorrência de um acidente num GP — um contraste enorme com as primeiras décadas.",
            en: "The halo became mandatory in 2018 and has since protected several drivers, including Romain Grosjean in Bahrain in 2020. Since 1994, Jules Bianchi, who died in 2015 from injuries sustained at Suzuka, is the only driver to die as a result of an accident at a Grand Prix — a huge contrast with the early decades.",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "Célula de sobrevivência", en: "Survival cell" }, definition: { pt: "Monocoque feito para não deformar num impacto.", en: "Monocoque designed not to deform in an impact." } },
      { term: { pt: "HANS", en: "HANS" }, definition: { pt: "Suporte de cabeça e pescoço, obrigatório desde 2003.", en: "Head and neck support, mandatory since 2003." } },
      { term: { pt: "Halo", en: "Halo" }, definition: { pt: "Proteção sobre a cabeça do piloto.", en: "Protection over the driver's head." } },
      { term: { pt: "Safety Car Virtual", en: "Virtual Safety Car" }, definition: { pt: "Neutralização sem carro de segurança na pista, com tempo mínimo por setor.", en: "Neutralisation without a car on track, with a minimum time per sector." } },
      { term: { pt: "Licença de Grau 1", en: "Grade 1 licence" }, definition: { pt: "Homologação da FIA exigida para um autódromo receber a F1.", en: "FIA approval required for a circuit to host F1." } },
      { term: { pt: "Gravador de dados de acidente", en: "Accident data recorder" }, definition: { pt: "“Caixa-preta” que registra as forças de um impacto.", en: "‘Black box’ recording the forces in an impact." } },
    ],
    history: [
      { year: "1966", title: { pt: "Campanha de Stewart", en: "Stewart's campaign" }, text: { pt: "Começa a luta por segurança.", en: "The fight for safety begins." } },
      { year: "1973", title: { pt: "Primeiro Safety Car", en: "First Safety Car" }, text: { pt: "No GP do Canadá.", en: "At the Canadian Grand Prix." } },
      { year: "1976", title: { pt: "Nürburgring", en: "Nürburgring" }, text: { pt: "Acidente de Lauda; fim do Nordschleife.", en: "Lauda's crash; end of the Nordschleife." } },
      { year: "1978", title: { pt: "Sid Watkins", en: "Sid Watkins" }, text: { pt: "Começa a modernização médica.", en: "Medical modernisation begins." } },
      { year: "1994", title: { pt: "Ímola", en: "Imola" }, text: { pt: "Ponto de virada; limite nos boxes.", en: "Turning point; pit-lane limit." } },
      { year: "2003", title: { pt: "HANS", en: "HANS" }, text: { pt: "Obrigatório.", en: "Mandatory." } },
      { year: "2015", title: { pt: "Safety Car Virtual", en: "Virtual Safety Car" }, text: { pt: "Criado após Suzuka 2014.", en: "Created after Suzuka 2014." } },
      { year: "2018", title: { pt: "Halo", en: "Halo" }, text: { pt: "Proteção obrigatória do cockpit.", en: "Mandatory cockpit protection." } },
    ],
    related: ["safety-structures", "sporting"],
    cars: ["mclaren-mp4-1"],
    regs: [T("C12.3"), T("C14.5"), S("B1.5"), S("B5.12")],
  },

  /* ----------------------------------------------------------------- History */
  {
    slug: "history",
    group: "regulations",
    tone: "navy",
    title: { pt: "Como as regras mudaram", en: "How the regulations changed" },
    summary: {
      pt: "Setenta e seis anos de mudanças: motores, aerodinâmica, segurança e formato esportivo — década por década.",
      en: "Seventy-six years of change: engines, aerodynamics, safety and sporting format — decade by decade.",
    },
    simple: {
      pt: "As regras são reescritas a cada poucos anos para controlar a velocidade, aumentar a segurança, reduzir custos ou melhorar as corridas. Cada grande mudança embaralha a hierarquia do grid.",
      en: "The rules are rewritten every few years to control speed, improve safety, cut costs or improve the racing. Each major change reshuffles the order of the grid.",
    },
    facts: [
      { label: { pt: "Grandes resets técnicos", en: "Major technical resets" }, value: { pt: "1961, 1966, 1983, 1989, 1994, 2009, 2014, 2017, 2022, 2026", en: "1961, 1966, 1983, 1989, 1994, 2009, 2014, 2017, 2022, 2026" } },
      { label: { pt: "Campeonato de construtores", en: "Constructors' championship" }, value: { pt: "desde 1958", en: "since 1958" } },
      { label: { pt: "Teto de gastos", en: "Cost cap" }, value: { pt: "desde 2021", en: "since 2021" } },
    ],
    sections: [
      {
        heading: { pt: "Anos 1950 e 1960: motores e segurança mínima", en: "1950s and 1960s: engines and minimal safety" },
        body: [
          {
            pt: "O primeiro Mundial (1950) usou motores de 1,5 L com compressor ou 4,5 L aspirados. Em 1952–1953 o campeonato correu com regras de F2, e em 1954 veio o 2,5 L. Em 1958 foi criado o campeonato de construtores e a gasolina de aviação virou obrigatória. Em 1961 o motor caiu para 1,5 L por segurança e, em 1966, subiu para 3,0 L.",
            en: "The first championship (1950) used 1.5 L supercharged or 4.5 L naturally aspirated engines. In 1952–1953 it ran to F2 rules, and 1954 brought 2.5 L. In 1958 the constructors' championship was created and aviation petrol became mandatory. In 1961 engines were cut to 1.5 L for safety, and in 1966 rose to 3.0 L.",
          },
        ],
      },
      {
        heading: { pt: "Anos 1970 e 1980: asas, efeito solo e turbos", en: "1970s and 1980s: wings, ground effect and turbos" },
        body: [
          {
            pt: "As asas foram limitadas em 1969, as saias proibidas em 1981 e o fundo plano exigido em 1983. Os turbos, permitidos desde 1966 mas só usados a partir de 1977, foram limitados em pressão e capacidade de combustível e proibidos em 1989. O monocoque de carbono e os testes de impacto obrigatórios mudaram a segurança dos carros.",
            en: "Wings were limited in 1969, skirts banned in 1981 and flat bottoms required in 1983. Turbos, allowed since 1966 but only used from 1977, were restricted in boost and fuel capacity and banned in 1989. Carbon monocoques and mandatory crash tests changed car safety.",
          },
        ],
      },
      {
        heading: { pt: "Anos 1990: eletrônica, proibições e Ímola", en: "1990s: electronics, bans and Imola" },
        body: [
          {
            pt: "Suspensão ativa, controle de tração e outros auxílios dominaram 1992–1993 e foram proibidos para 1994. Depois de Ímola, vieram reduções de potência, mudanças de aerodinâmica, a prancha e os limites de velocidade nos boxes. O reabastecimento voltou em 1994, os motores caíram para 3,0 L em 1995 e os pneus com sulcos e carros mais estreitos chegaram em 1998.",
            en: "Active suspension, traction control and other aids dominated 1992–1993 and were banned for 1994. After Imola came power reductions, aerodynamic changes, the plank and pit-lane speed limits. Refuelling returned in 1994, engines dropped to 3.0 L in 1995 and grooved tyres and narrower cars arrived in 1998.",
          },
        ],
      },
      {
        heading: { pt: "Anos 2000: custos e espetáculo", en: "2000s: costs and the show" },
        body: [
          {
            pt: "O V10 virou obrigatório em 2000; o controle de tração voltou em 2001 e saiu de novo em 2008, com a central eletrônica padrão. Classificação de volta única (2003), motores para dois fins de semana e pneus para a corrida inteira (2005), V8 (2006), fornecedor único de pneus (2007) e, em 2009, a grande mudança aerodinâmica com slicks e KERS — que a Brawn interpretou melhor que todos.",
            en: "V10s became mandatory in 2000; traction control returned in 2001 and went again in 2008 with the standard ECU. Single-lap qualifying (2003), engines lasting two weekends and tyres lasting a whole race (2005), V8s (2006), a single tyre supplier (2007) and, in 2009, the big aerodynamic change with slicks and KERS — which Brawn read better than anyone.",
          },
        ],
      },
      {
        heading: { pt: "De 2010 a hoje: híbridos, efeito solo e teto de gastos", en: "2010 to today: hybrids, ground effect and the cost cap" },
        body: [
          {
            pt: "Reabastecimento proibido e 25 pontos por vitória (2010), DRS e Pirelli (2011), unidades de potência híbridas (2014), carros mais largos (2017), halo (2018), teto de gastos (2021), efeito solo (2022) e, em 2026, carros menores com aerodinâmica ativa e motores de metade elétricos com combustível sustentável.",
            en: "Refuelling banned and 25 points for a win (2010), DRS and Pirelli (2011), hybrid power units (2014), wider cars (2017), the halo (2018), the cost cap (2021), ground effect (2022) and, in 2026, smaller cars with active aerodynamics and half-electric engines on sustainable fuel.",
          },
          {
            pt: "Cada página de temporada no Paddock mostra as mudanças de regulamento daquele ano, e o arquivo de regulamentos permite ler e comparar os documentos oficiais desde 2018.",
            en: "Every season page on Paddock lists that year's regulation changes, and the regulations archive lets you read and compare the official documents since 2018.",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "Ciclo de regulamento", en: "Regulation cycle" }, definition: { pt: "Período em que as regras técnicas principais ficam estáveis.", en: "The period during which the main technical rules stay stable." } },
      { term: { pt: "Reset", en: "Reset" }, definition: { pt: "Reescrita profunda das regras, que muda os carros substancialmente.", en: "A deep rewrite of the rules that changes the cars substantially." } },
      { term: { pt: "Central eletrônica padrão", en: "Standard ECU" }, definition: { pt: "Unidade de controle única para todos, desde 2008.", en: "A single control unit for all, since 2008." } },
    ],
    history: [
      { year: "1950", title: { pt: "Primeiro campeonato", en: "First championship" }, text: { pt: "1,5 L com compressor ou 4,5 L.", en: "1.5 L supercharged or 4.5 L." } },
      { year: "1958", title: { pt: "Construtores", en: "Constructors" }, text: { pt: "Novo campeonato; gasolina de aviação.", en: "New championship; aviation petrol." } },
      { year: "1966", title: { pt: "3 litros", en: "3 litres" }, text: { pt: "A volta da potência.", en: "The return to power." } },
      { year: "1983", title: { pt: "Fundo plano", en: "Flat bottom" }, text: { pt: "Fim dos carros-asa.", en: "End of wing cars." } },
      { year: "1989", title: { pt: "Turbos proibidos", en: "Turbos banned" }, text: { pt: "3,5 L aspirado.", en: "3.5 L naturally aspirated." } },
      { year: "1994", title: { pt: "Auxílios proibidos", en: "Aids banned" }, text: { pt: "E o pacote de segurança pós-Ímola.", en: "And the post-Imola safety package." } },
      { year: "2009", title: { pt: "Nova aerodinâmica", en: "New aerodynamics" }, text: { pt: "Slicks, KERS, difusor duplo.", en: "Slicks, KERS, double diffuser." } },
      { year: "2014", title: { pt: "Híbridos", en: "Hybrids" }, text: { pt: "V6 turbo de 1,6 L.", en: "1.6 L turbo V6." } },
      { year: "2021", title: { pt: "Teto de gastos", en: "Cost cap" }, text: { pt: "Limite de orçamento.", en: "Budget limit." } },
      { year: "2022", title: { pt: "Efeito solo", en: "Ground effect" }, text: { pt: "Novos carros para corridas mais próximas.", en: "New cars for closer racing." } },
      { year: "2026", title: { pt: "Nova fórmula", en: "New formula" }, text: { pt: "Aerodinâmica ativa e novas unidades de potência.", en: "Active aero and new power units." } },
    ],
    related: ["technical", "sporting", "financial"],
    cars: ["alfa-romeo-158", "cooper-t51", "lotus-79", "mclaren-mp4-4", "williams-fw14b", "mercedes-f1-w05", "red-bull-rb19"],
    regs: [],
  },
];
