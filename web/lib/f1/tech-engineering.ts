import { T, S, type BiTech } from "./tech-types";

/**
 * Engineering topics — bilingual source.
 * Figures are limited to values set by the regulations or established in the
 * record books; where a number varies by team or circuit, the text says so.
 */
export const ENGINEERING_BI: BiTech[] = [
  /* ------------------------------------------------------------ Aerodynamics */
  {
    slug: "aerodynamics",
    group: "engineering",
    tone: "teal",
    title: { pt: "Aerodinâmica", en: "Aerodynamics" },
    summary: {
      pt: "Como um carro de Fórmula 1 usa o ar para grudar no asfalto — e por que cada geração de regras muda tudo.",
      en: "How a Formula One car uses the air to stick to the track — and why every generation of rules changes everything.",
    },
    simple: {
      pt: "A asa de um avião gera sustentação para cima. O carro de F1 faz o contrário: asas e fundo funcionam de cabeça para baixo e geram “pressão aerodinâmica” (downforce), que empurra os pneus contra o chão. Com mais aderência, o carro faz curvas em velocidades que seriam impossíveis só com a borracha.",
      en: "An aeroplane wing creates lift. A Formula One car does the opposite: its wings and floor work upside-down and create downforce, pushing the tyres into the road. With more grip, the car can take corners at speeds the rubber alone could never hold.",
    },
    facts: [
      { label: { pt: "Primeiras asas na F1", en: "First wings in F1" }, value: { pt: "1968", en: "1968" } },
      { label: { pt: "Primeiro carro-asa (efeito solo)", en: "First wing car (ground effect)" }, value: { pt: "Lotus 78, 1977", en: "Lotus 78, 1977" } },
      { label: { pt: "Fundo plano obrigatório", en: "Flat bottoms mandatory" }, value: { pt: "1983", en: "1983" } },
      { label: { pt: "DRS em uso", en: "DRS in use" }, value: { pt: "2011–2025", en: "2011–2025" } },
      { label: { pt: "Volta do efeito solo", en: "Ground effect returns" }, value: { pt: "2022", en: "2022" } },
      { label: { pt: "Aerodinâmica ativa", en: "Active aerodynamics" }, value: { pt: "2026 (asas dianteira e traseira móveis)", en: "2026 (movable front and rear wings)" } },
    ],
    sections: [
      {
        heading: { pt: "Pressão aerodinâmica e arrasto: a troca eterna", en: "Downforce and drag: the eternal trade-off" },
        body: [
          {
            pt: "Pressão aerodinâmica é aderência “de graça”: aumenta a carga sobre os pneus sem acrescentar massa ao carro. Como ela cresce com o quadrado da velocidade, um carro de F1 tem muito mais aderência numa curva de alta do que numa de baixa — por isso as curvas rápidas são onde a diferença entre carros bons e ruins aparece mais.",
            en: "Downforce is ‘free’ grip: it loads the tyres without adding mass to the car. Because it grows with the square of speed, a Formula One car has far more grip in a fast corner than in a slow one — which is why fast corners are where good and bad cars are most clearly separated.",
          },
          {
            pt: "O preço é o arrasto, a resistência do ar que segura o carro nas retas e aumenta o consumo. Cada pista pede um compromisso: Mônaco, lenta e sinuosa, usa o máximo de asa; Monza, com retas longas, usa asas finíssimas. A eficiência aerodinâmica — muita pressão com pouco arrasto — é o que os engenheiros perseguem.",
            en: "The price is drag, the air resistance that holds the car back on the straights and increases fuel use. Every track needs its own compromise: slow, twisty Monaco takes the maximum wing; Monza, with its long straights, uses very thin wings. Aerodynamic efficiency — lots of downforce for little drag — is what engineers chase.",
          },
        ],
      },
      {
        heading: { pt: "Da asa alta ao carro-asa (1968–1982)", en: "From high wings to wing cars (1968–1982)" },
        body: [
          {
            pt: "As asas surgiram em 1968, presas primeiro à carroceria e logo em suportes altos ligados diretamente à suspensão. Depois de quebras graves no GP da Espanha de 1969, as asas altas foram proibidas e as dimensões passaram a ser controladas.",
            en: "Wings appeared in 1968, first fixed to the bodywork and soon on tall struts mounted directly on the suspension. After serious failures at the 1969 Spanish Grand Prix, high wings were banned and wing dimensions came under control.",
          },
          {
            pt: "A grande revolução veio da Lotus: o Lotus 78 (1977) transformou as laterais do carro em asas invertidas, com saias que vedavam o espaço até o chão. O Lotus 79 levou Mario Andretti ao título de 1978. Em poucos anos todos os carros eram “carros-asa”. Em 1978 a Brabham foi além e usou um ventilador para sugar o ar sob o BT46B; o carro venceu sua única corrida, na Suécia, e foi retirado.",
            en: "The great revolution came from Lotus: the Lotus 78 (1977) turned the car's sidepods into inverted wings, with skirts sealing the gap to the ground. The Lotus 79 took Mario Andretti to the 1978 title. Within a few years every car was a ‘wing car’. In 1978 Brabham went further and used a fan to suck air from beneath the BT46B; it won its only race, in Sweden, and was withdrawn.",
          },
          {
            pt: "Com o efeito solo, as velocidades em curva subiram tanto que a FIA proibiu as saias deslizantes em 1981 e, em 1983, exigiu fundo plano entre as rodas.",
            en: "Ground effect raised cornering speeds so much that the governing body banned sliding skirts in 1981 and, from 1983, required a flat bottom between the wheels.",
          },
        ],
      },
      {
        heading: { pt: "A era do difusor e das brechas (1983–2021)", en: "The diffuser and loophole era (1983–2021)" },
        body: [
          {
            pt: "Com o fundo plano, a pressão passou a vir das asas e do difusor — a rampa na traseira do assoalho que acelera o ar sob o carro. Em 1994, depois de Ímola, a FIA introduziu a prancha de madeira sob o carro: se ela se desgastar além do limite, o carro foi rodado baixo demais e é desclassificado.",
            en: "With flat bottoms, downforce came from the wings and the diffuser — the ramp at the back of the floor that accelerates air beneath the car. In 1994, after Imola, the FIA introduced the wooden plank under the car: if it wears beyond the limit, the car ran too low and is disqualified.",
          },
          {
            pt: "A história desse período é a das brechas no regulamento: o difusor duplo da Brawn em 2009, o “F-duct” da McLaren em 2010 (o piloto bloqueava um furo com a perna para estolar a asa traseira) e os difusores soprados pelo escapamento da Red Bull em 2010–2011. Quase todas foram proibidas na temporada seguinte.",
            en: "The story of this period is one of loopholes: Brawn's double diffuser in 2009, McLaren's ‘F-duct’ in 2010 (the driver covered a hole with his leg to stall the rear wing) and Red Bull's exhaust-blown diffusers of 2010–2011. Almost all were banned the following season.",
          },
          {
            pt: "Em 2011 chegou o DRS: uma aba da asa traseira que o piloto abre em zonas definidas quando está a menos de um segundo do carro da frente. Em 2017 os carros ficaram mais largos e com pneus maiores, e bateram recordes de volta em muitas pistas.",
            en: "DRS arrived in 2011: a rear-wing flap the driver opens in set zones when within one second of the car ahead. In 2017 the cars grew wider with bigger tyres and broke lap records at many circuits.",
          },
        ],
      },
      {
        heading: { pt: "Ar sujo e o retorno do efeito solo (2022–2025)", en: "Dirty air and the return of ground effect (2022–2025)" },
        body: [
          {
            pt: "Um carro deixa atrás de si uma esteira turbulenta — o “ar sujo”. O carro de trás perde pressão justamente nas curvas, desgasta mais os pneus e não consegue andar colado. Em 2022, as regras trouxeram de volta túneis Venturi sob o carro e simplificaram asas e carenagens, para gerar pressão pelo fundo, que é menos sensível à esteira.",
            en: "A car leaves a turbulent wake behind it — ‘dirty air’. The following car loses downforce exactly in the corners, wears its tyres more and cannot stay close. In 2022 the rules brought back Venturi tunnels under the car and simplified wings and bodywork, so that downforce came from the floor, which is less sensitive to the wake.",
          },
          {
            pt: "O efeito colateral foi o “porpoising”: em alta velocidade o fundo sugava o carro para o chão, o fluxo estolava, o carro subia e o ciclo se repetia, sacudindo os pilotos. A FIA passou a medir as oscilações verticais e endureceu as regras do assoalho em 2023.",
            en: "The side effect was ‘porpoising’: at high speed the floor sucked the car to the ground, the flow stalled, the car rose and the cycle repeated, shaking the drivers. The FIA began measuring vertical oscillations and tightened the floor rules for 2023.",
          },
        ],
      },
      {
        heading: { pt: "Aerodinâmica ativa em 2026", en: "Active aerodynamics in 2026" },
        body: [
          {
            pt: "Os carros de 2026 são menores e mais leves, e trazem asas dianteira e traseira com elementos móveis. Nas curvas o carro usa a configuração de alta pressão; nas retas, os elementos se abrem para reduzir o arrasto. Ao contrário do DRS, isso vale para todos os carros em zonas definidas, não só para quem ataca.",
            en: "The 2026 cars are smaller and lighter, with front and rear wings that have movable elements. In corners the car runs its high-downforce configuration; on the straights the elements open to cut drag. Unlike DRS, this applies to every car in defined zones, not just the attacker.",
          },
          {
            pt: "O motivo é energético: com metade da potência vinda da parte elétrica, os carros precisam de muito menos arrasto nas retas para não esgotar a bateria. Onde e quando os modos podem ser usados está no Regulamento Esportivo; as superfícies móveis estão definidas no Técnico.",
            en: "The reason is energy: with half the power now electric, the cars need much less drag on the straights to avoid draining the battery. Where and when the modes may be used is set in the Sporting Regulations; the movable surfaces are defined in the Technical Regulations.",
          },
        ],
      },
      {
        heading: { pt: "Túnel de vento, CFD e o limite de testes", en: "Wind tunnels, CFD and the testing limit" },
        body: [
          {
            pt: "As equipes desenvolvem a aerodinâmica com modelos em escala (até 60%) no túnel de vento e com simulação computacional (CFD). Desde 2021 o tempo de túnel e de CFD é limitado por uma escala móvel: quem termina o campeonato em primeiro recebe menos horas de teste do que quem termina em último — uma forma de equilibrar a competição.",
            en: "Teams develop their aerodynamics with scale models (up to 60%) in the wind tunnel and with computational fluid dynamics (CFD). Since 2021 tunnel and CFD time has been limited on a sliding scale: the team that finishes the championship first gets fewer testing hours than the team that finishes last — a way of levelling the field.",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "Pressão aerodinâmica (downforce)", en: "Downforce" }, definition: { pt: "Força vertical gerada pelo ar que empurra o carro contra a pista.", en: "Vertical force generated by the air that pushes the car onto the track." } },
      { term: { pt: "Arrasto", en: "Drag" }, definition: { pt: "Resistência do ar que se opõe ao movimento e limita a velocidade nas retas.", en: "Air resistance opposing motion and limiting straight-line speed." } },
      { term: { pt: "Efeito solo", en: "Ground effect" }, definition: { pt: "Pressão gerada pelo fundo do carro, que acelera o ar no espaço entre o assoalho e o asfalto.", en: "Downforce generated by the car's floor, accelerating air in the gap between floor and track." } },
      { term: { pt: "Difusor", en: "Diffuser" }, definition: { pt: "Rampa na traseira do assoalho que expande o ar que passou sob o carro, aumentando a sucção.", en: "Ramp at the rear of the floor that expands the air from under the car, increasing suction." } },
      { term: { pt: "Túnel Venturi", en: "Venturi tunnel" }, definition: { pt: "Canal sob o carro que se estreita e depois se alarga, acelerando o ar e baixando sua pressão.", en: "A channel under the car that narrows and then widens, speeding up the air and lowering its pressure." } },
      { term: { pt: "Ar sujo", en: "Dirty air" }, definition: { pt: "Esteira turbulenta deixada por um carro, que reduz a pressão aerodinâmica de quem vem atrás.", en: "Turbulent wake left by a car, reducing the downforce of the car behind." } },
      { term: { pt: "DRS", en: "DRS" }, definition: { pt: "Sistema de redução de arrasto: aba da asa traseira que se abria para facilitar ultrapassagens (2011–2025).", en: "Drag Reduction System: a rear-wing flap that opened to help overtaking (2011–2025)." } },
      { term: { pt: "Porpoising", en: "Porpoising" }, definition: { pt: "Oscilação vertical causada pelo estol e recuperação do fluxo sob carros de efeito solo.", en: "Vertical oscillation caused by flow stalling and reattaching under ground-effect cars." } },
      { term: { pt: "Prancha (plank)", en: "Plank" }, definition: { pt: "Peça sob o carro cujo desgaste mostra se ele andou baixo demais; obrigatória desde 1994.", en: "Board under the car whose wear shows whether it ran too low; mandatory since 1994." } },
    ],
    history: [
      { year: "1968", title: { pt: "Asas", en: "Wings" }, text: { pt: "A pressão aerodinâmica chega à Fórmula 1.", en: "Downforce enters Formula One." } },
      { year: "1969", title: { pt: "Asas altas proibidas", en: "High wings banned" }, text: { pt: "Após quebras na Espanha, limites às asas.", en: "After failures in Spain, wings are restricted." } },
      { year: "1977", title: { pt: "Lotus 78", en: "Lotus 78" }, text: { pt: "O primeiro carro-asa.", en: "The first wing car." } },
      { year: "1978", title: { pt: "Lotus 79 e o carro-ventilador", en: "Lotus 79 and the fan car" }, text: { pt: "Título de Andretti; Brabham BT46B vence uma vez e é retirado.", en: "Andretti's title; the Brabham BT46B wins once and is withdrawn." } },
      { year: "1983", title: { pt: "Fundo plano", en: "Flat bottom" }, text: { pt: "Fim dos carros-asa.", en: "The end of wing cars." } },
      { year: "1994", title: { pt: "Prancha", en: "The plank" }, text: { pt: "Limite físico para a altura do carro.", en: "A physical limit on ride height." } },
      { year: "2009", title: { pt: "Difusor duplo", en: "Double diffuser" }, text: { pt: "Brawn explora a brecha e é campeã.", en: "Brawn exploits the loophole and wins the title." } },
      { year: "2011", title: { pt: "DRS", en: "DRS" }, text: { pt: "Asa traseira móvel para ultrapassagens.", en: "Movable rear wing for overtaking." } },
      { year: "2022", title: { pt: "Efeito solo volta", en: "Ground effect returns" }, text: { pt: "Túneis Venturi sob o carro.", en: "Venturi tunnels under the car." } },
      { year: "2026", title: { pt: "Aerodinâmica ativa", en: "Active aerodynamics" }, text: { pt: "Asas móveis para todos, fim do DRS.", en: "Movable wings for all; DRS retired." } },
    ],
    related: ["suspension", "tyres", "technical"],
    cars: ["lotus-49b", "lotus-78", "lotus-79", "brabham-bt46b", "brawn-bgp-001", "red-bull-rb19"],
    regs: [T("C3.5"), T("C3.10"), T("C3.11"), S("B7.1")],
  },

  /* ----------------------------------------------------------------- Chassis */
  {
    slug: "chassis",
    group: "engineering",
    tone: "graphite",
    title: { pt: "Chassi", en: "Chassis" },
    summary: {
      pt: "A estrutura em torno da qual todo o carro é construído — e a cápsula que protege o piloto.",
      en: "The structure the whole car is built around — and the capsule that protects the driver.",
    },
    simple: {
      pt: "O chassi é a espinha dorsal do carro. Hoje é uma casca de fibra de carbono chamada monocoque: leve como um objeto de plástico, mas mais resistente que aço. O motor, a suspensão e as asas são todos presos a ele.",
      en: "The chassis is the car's backbone. Today it is a carbon-fibre shell called the monocoque: light as a plastic object but stronger than steel. The engine, suspension and wings are all attached to it.",
    },
    facts: [
      { label: { pt: "Primeiro monocoque", en: "First monocoque" }, value: { pt: "Lotus 25, 1962 (alumínio)", en: "Lotus 25, 1962 (aluminium)" } },
      { label: { pt: "Motor como parte da estrutura", en: "Engine as a structural member" }, value: { pt: "Lotus 49, 1967", en: "Lotus 49, 1967" } },
      { label: { pt: "Primeiro chassi de fibra de carbono", en: "First carbon-fibre chassis" }, value: { pt: "McLaren MP4/1, 1981", en: "McLaren MP4/1, 1981" } },
      { label: { pt: "Peso mínimo 2026", en: "2026 minimum mass" }, value: { pt: "724 kg + pneus (726 kg + pneus na classificação) — art. C4.1", en: "724 kg + tyres (726 kg + tyres in qualifying) — art. C4.1" } },
    ],
    sections: [
      {
        heading: { pt: "Dos tubos de aço ao monocoque", en: "From steel tubes to the monocoque" },
        body: [
          {
            pt: "Os carros dos anos 1950 tinham chassi de treliça de tubos de aço coberto por painéis de alumínio. Em 1962, Colin Chapman criou o Lotus 25 com um monocoque: a própria “casca” de chapas de alumínio rebitadas carregava os esforços. O carro ficou mais rígido, mais leve e mais baixo, e Jim Clark foi campeão com ele em 1963.",
            en: "Cars of the 1950s had steel-tube spaceframes clothed in aluminium panels. In 1962 Colin Chapman built the Lotus 25 around a monocoque: the riveted aluminium ‘shell’ itself carried the loads. The car was stiffer, lighter and lower, and Jim Clark won the 1963 title with it.",
          },
          {
            pt: "Em 1967 o Lotus 49 deu o passo seguinte: o motor Cosworth DFV passou a ser parte da estrutura, aparafusado direto atrás do cockpit, com a suspensão traseira presa ao câmbio. Esse arranjo — motor como “membro estrutural” — é usado até hoje.",
            en: "In 1967 the Lotus 49 took the next step: the Cosworth DFV engine became part of the structure, bolted directly behind the cockpit, with the rear suspension hung from the gearbox. This layout — the engine as a ‘stressed member’ — is still used today.",
          },
        ],
      },
      {
        heading: { pt: "A revolução da fibra de carbono", en: "The carbon-fibre revolution" },
        body: [
          {
            pt: "Em 1981 a McLaren de John Barnard estreou o MP4/1, o primeiro chassi de compósito de fibra de carbono. Além de mais rígido e leve, ele se mostrou muito mais resistente a impactos — John Watson saiu andando de um acidente forte em Monza naquele ano. Em poucas temporadas todas as equipes migraram para o carbono.",
            en: "In 1981 John Barnard's McLaren MP4/1 introduced the first carbon-fibre composite chassis. As well as being stiffer and lighter, it proved far stronger in impacts — John Watson walked away from a heavy crash at Monza that year. Within a few seasons every team had switched to carbon.",
          },
          {
            pt: "Um monocoque moderno é feito de camadas de tecido de carbono pré-impregnado com resina, com miolo de colmeia de alumínio, curadas em autoclave sob pressão e temperatura. Painéis anti-intrusão de materiais de alta resistência reforçam as laterais do cockpit.",
            en: "A modern monocoque is made of layers of resin-impregnated carbon cloth around an aluminium honeycomb core, cured in an autoclave under pressure and heat. Anti-intrusion panels of high-strength materials reinforce the cockpit sides.",
          },
        ],
      },
      {
        heading: { pt: "A célula de sobrevivência", en: "The survival cell" },
        body: [
          {
            pt: "No regulamento, o monocoque se chama célula de sobrevivência. Antes de correr, cada desenho precisa passar por testes estáticos (cargas aplicadas em pontos definidos sem deformar além do permitido) e dinâmicos (impactos a velocidades definidas), feitos sob supervisão da FIA. O santantônio e o halo também são homologados.",
            en: "In the regulations the monocoque is called the survival cell. Before racing, each design must pass static tests (loads applied at defined points without deforming beyond limits) and dynamic tests (impacts at defined speeds), carried out under FIA supervision. The roll structure and halo are also homologated.",
          },
        ],
      },
      {
        heading: { pt: "Peso mínimo e lastro", en: "Minimum mass and ballast" },
        body: [
          {
            pt: "O regulamento fixa o peso mínimo do carro com o piloto. As equipes constroem o carro abaixo desse valor e completam com lastro de tungstênio, posicionado onde melhora a distribuição de peso. Desde 2019, o peso do piloto com o banco é considerado à parte, com mínimo de 80 kg, para que pilotos mais pesados não sejam prejudicados.",
            en: "The regulations set the minimum mass of the car with the driver. Teams build below that figure and make up the difference with tungsten ballast placed where it improves weight distribution. Since 2019 the driver and seat have been treated separately, with an 80 kg minimum, so that heavier drivers are not penalised.",
          },
          {
            pt: "O peso mínimo cresceu muito na era híbrida por causa da bateria, dos motores elétricos, do halo e de pneus maiores. Em 2026 os carros ficaram menores e o limite caiu; o valor exato, que varia entre classificação e corrida, está no artigo C4.1.",
            en: "Minimum mass grew substantially in the hybrid era because of batteries, electric motors, the halo and bigger tyres. In 2026 the cars became smaller and the limit fell; the exact figure, which differs between qualifying and the race, is in Article C4.1.",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "Monocoque", en: "Monocoque" }, definition: { pt: "Estrutura em que a casca externa suporta as cargas.", en: "A structure in which the outer skin carries the loads." } },
      { term: { pt: "Treliça tubular", en: "Spaceframe" }, definition: { pt: "Chassi feito de tubos soldados, usado até o início dos anos 1960.", en: "Chassis made of welded tubes, used until the early 1960s." } },
      { term: { pt: "Membro estrutural", en: "Stressed member" }, definition: { pt: "Componente, como o motor, que também faz parte da estrutura do carro.", en: "A component, such as the engine, that also forms part of the structure." } },
      { term: { pt: "Célula de sobrevivência", en: "Survival cell" }, definition: { pt: "Termo do regulamento para o monocoque que protege o piloto.", en: "The regulation term for the monocoque that protects the driver." } },
      { term: { pt: "Lastro", en: "Ballast" }, definition: { pt: "Peso acrescentado para atingir o mínimo e ajustar o equilíbrio.", en: "Weight added to reach the minimum and tune the balance." } },
      { term: { pt: "Autoclave", en: "Autoclave" }, definition: { pt: "Forno pressurizado onde as peças de carbono são curadas.", en: "Pressurised oven in which carbon parts are cured." } },
    ],
    history: [
      { year: "1962", title: { pt: "Monocoque", en: "Monocoque" }, text: { pt: "O Lotus 25.", en: "The Lotus 25." } },
      { year: "1967", title: { pt: "Motor estrutural", en: "Stressed engine" }, text: { pt: "O Lotus 49 com o Cosworth DFV.", en: "The Lotus 49 with the Cosworth DFV." } },
      { year: "1981", title: { pt: "Fibra de carbono", en: "Carbon fibre" }, text: { pt: "O McLaren MP4/1.", en: "The McLaren MP4/1." } },
      { year: "2018", title: { pt: "Halo", en: "Halo" }, text: { pt: "Proteção de cockpit integrada ao chassi.", en: "Cockpit protection integrated into the chassis." } },
      { year: "2019", title: { pt: "Peso do piloto", en: "Driver weight" }, text: { pt: "Mínimo de 80 kg para piloto e banco.", en: "80 kg minimum for driver and seat." } },
      { year: "2026", title: { pt: "Carros menores", en: "Smaller cars" }, text: { pt: "Entre-eixos e largura reduzidos, peso menor.", en: "Shorter wheelbase, narrower, lighter." } },
    ],
    related: ["safety-structures", "suspension"],
    cars: ["lotus-25", "lotus-49", "mclaren-mp4-1"],
    regs: [T("C4.1"), T("C12.1"), T("C12.2"), T("C15.2")],
  },

  /* ------------------------------------------------------------- Power units */
  {
    slug: "power-units",
    group: "engineering",
    tone: "orange",
    title: { pt: "Motores e unidades de potência", en: "Engines and power units" },
    summary: {
      pt: "Dos oito cilindros sobrealimentados de 1950 aos híbridos de 2026: a história do coração da Fórmula 1.",
      en: "From the supercharged straight-eights of 1950 to the 2026 hybrids: the story of Formula One's heart.",
    },
    simple: {
      pt: "O “motor” de hoje é uma unidade de potência: um motor a combustão de 1,6 litro trabalhando junto com um motor elétrico e uma bateria. Em 2026, a parte elétrica passou a fornecer quase metade da potência.",
      en: "Today's ‘engine’ is a power unit: a 1.6-litre combustion engine working together with an electric motor and a battery. In 2026 the electric side began supplying almost half of the power.",
    },
    facts: [
      { label: { pt: "1950", en: "1950" }, value: { pt: "1,5 L com compressor ou 4,5 L aspirado", en: "1.5 L supercharged or 4.5 L naturally aspirated" } },
      { label: { pt: "1966", en: "1966" }, value: { pt: "3,0 L aspirado (ou 1,5 L sobrealimentado)", en: "3.0 L naturally aspirated (or 1.5 L forced induction)" } },
      { label: { pt: "1977–1988", en: "1977–1988" }, value: { pt: "Era turbo (turbos proibidos a partir de 1989)", en: "Turbo era (turbos banned from 1989)" } },
      { label: { pt: "2006–2013", en: "2006–2013" }, value: { pt: "V8 de 2,4 L", en: "2.4 L V8" } },
      { label: { pt: "2014–2025", en: "2014–2025" }, value: { pt: "V6 turbo 1,6 L + MGU-K + MGU-H", en: "1.6 L turbo V6 + MGU-K + MGU-H" } },
      { label: { pt: "2026", en: "2026" }, value: { pt: "V6 turbo 1,6 L + MGU-K de 350 kW, sem MGU-H, combustível sustentável", en: "1.6 L turbo V6 + 350 kW MGU-K, no MGU-H, sustainable fuel" } },
      { label: { pt: "Motor mais vitorioso", en: "Most successful engine" }, value: { pt: "Cosworth DFV — 155 vitórias (1967–1983)", en: "Cosworth DFV — 155 wins (1967–1983)" } },
    ],
    sections: [
      {
        heading: { pt: "As fórmulas de motor", en: "The engine formulae" },
        body: [
          {
            pt: "Desde 1950 o regulamento define o tipo de motor permitido — e cada mudança redesenhou o grid. O primeiro campeonato aceitava 1,5 litro com compressor ou 4,5 litros aspirado, e o Alfa Romeo 158 com compressor dominou. Em 1952 e 1953 o Mundial foi disputado com carros de Fórmula 2 (2,0 L). Vieram depois 2,5 L (1954), 1,5 L (1961) e 3,0 L (1966) — a “volta da potência”.",
            en: "Since 1950 the regulations have defined the permitted engine — and every change redrew the grid. The first championship allowed 1.5-litre supercharged or 4.5-litre unsupercharged engines, and the supercharged Alfa Romeo 158 dominated. In 1952 and 1953 the championship was run to Formula Two rules (2.0 L). Then came 2.5 L (1954), 1.5 L (1961) and 3.0 L (1966) — the ‘return to power’.",
          },
          {
            pt: "A fórmula de 3 litros deu origem ao Cosworth DFV, um V8 compacto e barato, vendido a qualquer equipe. Ele estreou vencendo com o Lotus 49 em 1967 e somou 155 vitórias, permitindo que equipes pequenas, como Tyrrell, Williams e McLaren, enfrentassem as fábricas.",
            en: "The 3-litre formula produced the Cosworth DFV, a compact, affordable V8 available to any team. It won on its debut in the Lotus 49 in 1967 and went on to 155 victories, allowing small teams such as Tyrrell, Williams and McLaren to take on the manufacturers.",
          },
        ],
      },
      {
        heading: { pt: "A era turbo (1977–1988)", en: "The turbo era (1977–1988)" },
        body: [
          {
            pt: "O regulamento permitia motores sobrealimentados de 1,5 litro, mas ninguém os usava até a Renault estrear o RS01 em 1977. O carro quebrava tanto que ganhou o apelido de “chaleira amarela”, mas em 1979 Jean-Pierre Jabouille venceu em Dijon. Em 1983 Nelson Piquet foi o primeiro campeão com motor turbo (Brabham-BMW).",
            en: "The rules allowed 1.5-litre forced-induction engines, but nobody used them until Renault introduced the RS01 in 1977. It broke down so often it was nicknamed the ‘yellow teapot’, but in 1979 Jean-Pierre Jabouille won at Dijon. In 1983 Nelson Piquet became the first turbo-powered champion (Brabham-BMW).",
          },
          {
            pt: "Em classificação, com pressão de turbo sem limite, alguns motores passaram de 1.000 cavalos. A FIA limitou a pressão (4,0 bar em 1987 e 2,5 bar em 1988) e proibiu os turbos a partir de 1989. Em 1988 a McLaren-Honda MP4/4 venceu 15 das 16 corridas.",
            en: "In qualifying trim, with unlimited boost, some engines exceeded 1,000 horsepower. The FIA limited boost (4.0 bar in 1987 and 2.5 bar in 1988) and banned turbos from 1989. In 1988 the McLaren-Honda MP4/4 won 15 of the 16 races.",
          },
        ],
      },
      {
        heading: { pt: "V10 e V8: a era aspirada (1989–2013)", en: "V10s and V8s: the naturally aspirated era (1989–2013)" },
        body: [
          {
            pt: "Com 3,5 litros (1989) e depois 3,0 litros (1995), os fabricantes testaram V8, V10 e V12, até que o V10 virou padrão e, a partir de 2000, obrigatório. Os V10 de meados dos anos 2000 giravam acima de 19.000 rpm e são lembrados pelo som.",
            en: "With 3.5 litres (1989) and then 3.0 litres (1995), manufacturers tried V8s, V10s and V12s, until the V10 became standard and, from 2000, mandatory. The V10s of the mid-2000s revved beyond 19,000 rpm and are remembered for their sound.",
          },
          {
            pt: "Em 2006 vieram os V8 de 2,4 litros. Para conter custos, o desenvolvimento foi congelado a partir de 2007 e o giro limitado (18.000 rpm a partir de 2009). Os motores passaram a ter de durar vários fins de semana.",
            en: "In 2006 came 2.4-litre V8s. To control costs, development was frozen from 2007 and revs were limited (18,000 rpm from 2009). Engines also had to last several race weekends.",
          },
        ],
      },
      {
        heading: { pt: "A unidade de potência híbrida (2014–2025)", en: "The hybrid power unit (2014–2025)" },
        body: [
          {
            pt: "Em 2014 a F1 adotou o V6 turbo de 1,6 litro com dois motores-geradores: o MGU-K, ligado ao virabrequim, que recupera energia nas frenagens e devolve até 120 kW; e o MGU-H, ligado ao turbo, que recupera energia dos gases de escape e elimina o atraso do turbo. O consumo foi limitado por uma vazão máxima de combustível de 100 kg/h, o que premiou a eficiência térmica.",
            en: "In 2014 Formula One adopted the 1.6-litre turbo V6 with two motor-generators: the MGU-K on the crankshaft, which recovers energy under braking and returns up to 120 kW; and the MGU-H on the turbocharger, which recovers energy from the exhaust and eliminates turbo lag. Consumption was limited by a maximum fuel flow of 100 kg/h, rewarding thermal efficiency.",
          },
          {
            pt: "A Mercedes acertou o pacote desde o início — com o turbo dividido nas duas pontas do motor — e venceu oito títulos de construtores seguidos (2014–2021). Esses motores superaram 50% de eficiência térmica, um número sem paralelo em motores a combustão de carros.",
            en: "Mercedes got the package right from the start — with the turbo split at either end of the engine — and won eight consecutive constructors' titles (2014–2021). These engines passed 50% thermal efficiency, a figure unmatched by car combustion engines.",
          },
        ],
      },
      {
        heading: { pt: "A unidade de potência de 2026", en: "The 2026 power unit" },
        body: [
          {
            pt: "O regulamento de 2026 mantém o V6 de 1,6 litro, mas elimina o MGU-H — caro e sem uso nos carros de rua — e quase triplica a potência do MGU-K, para 350 kW. Assim, a parte elétrica responde por cerca de metade da potência total. O combustível passa a ser 100% sustentável e o limite deixa de ser em massa de combustível e passa a ser em energia.",
            en: "The 2026 regulations keep the 1.6-litre V6 but drop the MGU-H — expensive and of little relevance to road cars — and nearly triple the MGU-K's power, to 350 kW. Electrical power therefore makes up around half of the total. The fuel becomes 100% sustainable and the limit is set in energy rather than fuel mass.",
          },
          {
            pt: "A mudança atraiu novos fabricantes: a Audi chegou como equipe de fábrica, a Honda voltou oficialmente com a Aston Martin, a Red Bull passou a fazer seu próprio motor em parceria com a Ford, e Mercedes e Ferrari seguiram. A especificação do motor — cilindrada, ângulo do V, válvulas — está no artigo C5.1.",
            en: "The change attracted new manufacturers: Audi arrived as a works team, Honda returned officially with Aston Martin, Red Bull began building its own engine with Ford, and Mercedes and Ferrari continued. The engine specification — capacity, V angle, valves — is in Article C5.1.",
          },
        ],
      },
      {
        heading: { pt: "Quantos motores por temporada", en: "How many engines per season" },
        body: [
          {
            pt: "Cada piloto recebe um número limitado de cada componente da unidade de potência por temporada. Usar mais que o permitido gera punições de grid na largada. Isso torna a confiabilidade tão importante quanto a potência e leva as equipes a planejar em quais corridas trocar componentes.",
            en: "Each driver receives a limited number of each power-unit component per season. Exceeding the allocation brings grid penalties. That makes reliability as important as power and leads teams to plan in which races to change components.",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "ICE", en: "ICE" }, definition: { pt: "Motor a combustão interna (Internal Combustion Engine).", en: "Internal combustion engine." } },
      { term: { pt: "MGU-K", en: "MGU-K" }, definition: { pt: "Motor-gerador cinético: recupera energia nas frenagens e acrescenta potência elétrica.", en: "Motor Generator Unit – Kinetic: recovers braking energy and adds electric power." } },
      { term: { pt: "MGU-H", en: "MGU-H" }, definition: { pt: "Motor-gerador térmico, acoplado ao turbo (2014–2025).", en: "Motor Generator Unit – Heat, coupled to the turbocharger (2014–2025)." } },
      { term: { pt: "Bateria (Energy Store)", en: "Energy Store" }, definition: { pt: "Bateria que armazena a energia recuperada.", en: "The battery that stores recovered energy." } },
      { term: { pt: "Eficiência térmica", en: "Thermal efficiency" }, definition: { pt: "Parte da energia do combustível transformada em trabalho.", en: "The share of the fuel's energy turned into work." } },
      { term: { pt: "Turbo lag", en: "Turbo lag" }, definition: { pt: "Atraso de resposta do turbo ao acelerar.", en: "Delay in a turbocharger's response to the throttle." } },
      { term: { pt: "Congelamento", en: "Engine freeze" }, definition: { pt: "Proibição de desenvolver o motor por um período.", en: "A ban on developing the engine for a period." } },
    ],
    history: [
      { year: "1950", title: { pt: "Alfa Romeo 158", en: "Alfa Romeo 158" }, text: { pt: "Oito cilindros com compressor dominam.", en: "Supercharged straight-eight dominates." } },
      { year: "1967", title: { pt: "Cosworth DFV", en: "Cosworth DFV" }, text: { pt: "Vence na estreia; 155 vitórias.", en: "Wins on debut; 155 victories." } },
      { year: "1977", title: { pt: "Renault turbo", en: "Renault turbo" }, text: { pt: "O RS01 inaugura a era turbo.", en: "The RS01 opens the turbo era." } },
      { year: "1983", title: { pt: "Primeiro campeão turbo", en: "First turbo champion" }, text: { pt: "Piquet com a Brabham-BMW.", en: "Piquet with Brabham-BMW." } },
      { year: "1989", title: { pt: "Turbos proibidos", en: "Turbos banned" }, text: { pt: "3,5 L aspirado.", en: "3.5 L naturally aspirated." } },
      { year: "2006", title: { pt: "V8", en: "V8s" }, text: { pt: "2,4 L, desenvolvimento congelado a partir de 2007.", en: "2.4 L, development frozen from 2007." } },
      { year: "2014", title: { pt: "Híbridos", en: "Hybrids" }, text: { pt: "V6 turbo com MGU-K e MGU-H.", en: "Turbo V6 with MGU-K and MGU-H." } },
      { year: "2026", title: { pt: "Nova geração", en: "New generation" }, text: { pt: "350 kW elétricos, sem MGU-H, combustível sustentável.", en: "350 kW electric, no MGU-H, sustainable fuel." } },
    ],
    related: ["hybrid-systems", "fuel", "cooling"],
    cars: ["alfa-romeo-158", "lotus-49", "renault-rs01", "brabham-bt52", "mclaren-mp4-4", "mercedes-f1-w05"],
    regs: [T("C5.1"), T("C5.2"), T("C5.3"), S("B8.2")],
  },

  /* ---------------------------------------------------------- Hybrid systems */
  {
    slug: "hybrid-systems",
    group: "engineering",
    tone: "teal",
    title: { pt: "Sistemas híbridos", en: "Hybrid systems" },
    summary: {
      pt: "Como os carros recuperam, armazenam e devolvem energia — e por que isso virou parte da pilotagem.",
      en: "How the cars recover, store and redeploy energy — and why it became part of driving.",
    },
    simple: {
      pt: "Quando o carro freia, o motor elétrico vira gerador e carrega a bateria. Na reta seguinte, essa energia volta como potência extra. Saber onde gastar e onde recuperar energia é hoje tão importante quanto frear no ponto certo.",
      en: "When the car brakes, the electric motor becomes a generator and charges the battery. On the next straight that energy comes back as extra power. Knowing where to spend and where to recover energy is now as important as braking at the right point.",
    },
    facts: [
      { label: { pt: "KERS (2009)", en: "KERS (2009)" }, value: { pt: "60 kW, 400 kJ por volta", en: "60 kW, 400 kJ per lap" } },
      { label: { pt: "MGU-K (2014–2025)", en: "MGU-K (2014–2025)" }, value: { pt: "até 120 kW", en: "up to 120 kW" } },
      { label: { pt: "MGU-K (2026)", en: "MGU-K (2026)" }, value: { pt: "até 350 kW", en: "up to 350 kW" } },
      { label: { pt: "Primeira vitória com KERS", en: "First KERS win" }, value: { pt: "Lewis Hamilton, Hungria 2009", en: "Lewis Hamilton, Hungary 2009" } },
    ],
    sections: [
      {
        heading: { pt: "KERS: o primeiro passo (2009–2013)", en: "KERS: the first step (2009–2013)" },
        body: [
          {
            pt: "O Sistema de Recuperação de Energia Cinética foi liberado em 2009: um motor elétrico de 60 kW que podia devolver 400 kJ por volta — cerca de 6,7 segundos de potência extra, acionados por um botão no volante. Era opcional e pesado, e várias equipes preferiram não usá-lo. A primeira vitória com KERS foi de Lewis Hamilton, na Hungria.",
            en: "The Kinetic Energy Recovery System was allowed from 2009: a 60 kW electric motor that could return 400 kJ per lap — about 6.7 seconds of extra power, triggered by a button on the steering wheel. It was optional and heavy, and several teams chose not to use it. The first KERS win was Lewis Hamilton's, in Hungary.",
          },
          {
            pt: "Por acordo entre as equipes, o KERS não foi usado em 2010 e voltou em 2011, já adotado por quase todos.",
            en: "By agreement between the teams, KERS was not used in 2010 and returned in 2011, when almost everyone adopted it.",
          },
        ],
      },
      {
        heading: { pt: "ERS: a energia no centro do desempenho (2014–2025)", en: "ERS: energy at the centre of performance (2014–2025)" },
        body: [
          {
            pt: "Com o MGU-K e o MGU-H, a parte elétrica passou a ser essencial. O MGU-K recupera energia na frenagem; o MGU-H recupera energia dos gases de escape e pode tanto carregar a bateria quanto alimentar diretamente o MGU-K. O software decide a cada curva quanto recuperar e quanto entregar.",
            en: "With the MGU-K and MGU-H, the electric side became essential. The MGU-K recovers energy under braking; the MGU-H recovers energy from the exhaust and can either charge the battery or feed the MGU-K directly. Software decides corner by corner how much to recover and how much to deploy.",
          },
          {
            pt: "Para o piloto isso significa modos de energia no volante: em classificação, gastar tudo numa volta; na corrida, poupar para defender ou atacar. Técnicas como “lift and coast” — tirar o pé antes da freada — economizam combustível e ajudam a recuperar energia.",
            en: "For the driver this means energy modes on the steering wheel: in qualifying, spend everything on one lap; in the race, save energy to defend or attack. Techniques such as ‘lift and coast’ — lifting off before braking — save fuel and help recover energy.",
          },
        ],
      },
      {
        heading: { pt: "A virada de 2026", en: "The 2026 shift" },
        body: [
          {
            pt: "Sem o MGU-H, toda a recuperação vem das rodas traseiras via MGU-K, agora com 350 kW. A bateria precisa ser reabastecida a cada volta, e a forma de recuperar energia — inclusive em parte das retas — muda o estilo de pilotagem. Com o fim do DRS, o regulamento esportivo prevê energia elétrica adicional para o piloto que está perto do carro da frente.",
            en: "Without the MGU-H, all recovery comes through the rear wheels via the MGU-K, now rated at 350 kW. The battery must be replenished every lap, and the way energy is recovered — including on parts of the straights — changes driving style. With DRS gone, the Sporting Regulations provide additional electrical deployment for a driver close to the car ahead.",
          },
        ],
      },
      {
        heading: { pt: "Bateria: segurança e regras", en: "The battery: safety and rules" },
        body: [
          {
            pt: "A bateria fica sob o tanque de combustível, dentro da célula de sobrevivência, e tem limites de massa mínima e de energia armazenada. Luzes no carro indicam aos fiscais se o sistema elétrico está seguro para ser tocado depois de um acidente.",
            en: "The battery sits beneath the fuel tank inside the survival cell and has limits on minimum mass and stored energy. Lights on the car tell marshals whether the electrical system is safe to touch after an accident.",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "Recuperação (harvesting)", en: "Harvesting" }, definition: { pt: "Transformar energia de movimento ou calor em eletricidade para a bateria.", en: "Turning motion or heat energy into electricity for the battery." } },
      { term: { pt: "Entrega (deployment)", en: "Deployment" }, definition: { pt: "Usar a energia armazenada como potência extra.", en: "Using stored energy as extra power." } },
      { term: { pt: "Lift and coast", en: "Lift and coast" }, definition: { pt: "Tirar o pé do acelerador antes da frenagem para economizar combustível e recuperar energia.", en: "Lifting off the throttle before braking to save fuel and recover energy." } },
      { term: { pt: "Clipping", en: "Clipping" }, definition: { pt: "Quando a energia elétrica acaba no fim de uma reta e o carro perde velocidade.", en: "When electrical energy runs out at the end of a straight and the car loses speed." } },
      { term: { pt: "Luz de segurança do ERS", en: "ERS safety light" }, definition: { pt: "Indica se o sistema elétrico está seguro após um acidente.", en: "Shows whether the electrical system is safe after an accident." } },
    ],
    history: [
      { year: "2009", title: { pt: "KERS", en: "KERS" }, text: { pt: "Primeira tecnologia híbrida, opcional.", en: "First hybrid technology, optional." } },
      { year: "2011", title: { pt: "KERS volta", en: "KERS returns" }, text: { pt: "Adotado por quase todo o grid.", en: "Adopted by almost the whole grid." } },
      { year: "2014", title: { pt: "ERS", en: "ERS" }, text: { pt: "MGU-K de 120 kW e MGU-H.", en: "120 kW MGU-K and MGU-H." } },
      { year: "2026", title: { pt: "350 kW", en: "350 kW" }, text: { pt: "Metade da potência é elétrica.", en: "Half the power is electric." } },
    ],
    related: ["power-units", "brakes"],
    cars: ["mclaren-mp4-24", "mercedes-f1-w05"],
    regs: [T("C5.17"), T("C5.18"), T("C5.19"), S("B7.2")],
  },

  /* ------------------------------------------------------------------- Tyres */
  {
    slug: "tyres",
    group: "engineering",
    tone: "night",
    title: { pt: "Pneus", en: "Tyres" },
    summary: {
      pt: "O único contato com a pista — e a maior variável da estratégia de corrida.",
      en: "The only contact with the track — and the biggest variable in race strategy.",
    },
    simple: {
      pt: "Pneus macios são mais rápidos, mas se desgastam rápido. Duros duram mais, porém são mais lentos. Escolher quando usar cada um — e quantas vezes parar nos boxes — é o coração da estratégia.",
      en: "Soft tyres are faster but wear quickly. Hard tyres last longer but are slower. Choosing when to use each — and how many times to stop — is the heart of strategy.",
    },
    facts: [
      { label: { pt: "Fornecedor único", en: "Single supplier" }, value: { pt: "Pirelli, desde 2011", en: "Pirelli, since 2011" } },
      { label: { pt: "Compostos de pista seca", en: "Dry compounds" }, value: { pt: "C1 (mais duro) a C6 (mais macio); três por corrida", en: "C1 (hardest) to C6 (softest); three per event" } },
      { label: { pt: "Cores", en: "Colours" }, value: { pt: "Macio vermelho, médio amarelo, duro branco, intermediário verde, chuva azul", en: "Soft red, medium yellow, hard white, intermediate green, wet blue" } },
      { label: { pt: "Pneus com sulcos", en: "Grooved tyres" }, value: { pt: "1998–2008", en: "1998–2008" } },
      { label: { pt: "Rodas de 18 polegadas", en: "18-inch wheels" }, value: { pt: "desde 2022 (antes, 13 polegadas)", en: "since 2022 (13-inch before)" } },
    ],
    sections: [
      {
        heading: { pt: "Como um pneu de F1 funciona", en: "How a Formula One tyre works" },
        body: [
          {
            pt: "Um pneu de corrida gera aderência de duas formas: a borracha se “encaixa” nas micro-irregularidades do asfalto e também gruda quimicamente nele. Isso só acontece numa faixa estreita de temperatura. Frio demais, o pneu escorrega; quente demais, a borracha superaquece, perde aderência e se desgasta rapidamente.",
            en: "A racing tyre generates grip in two ways: the rubber deforms into the micro-roughness of the asphalt and also bonds chemically with it. This only happens within a narrow temperature window. Too cold and the tyre slides; too hot and the rubber overheats, loses grip and wears quickly.",
          },
          {
            pt: "Por isso os pilotos fazem zigue-zague atrás do Safety Car e as equipes aquecem os pneus em mantas térmicas antes de colocá-los no carro. A pressão interna mínima e a temperatura das mantas são definidas pela Pirelli e pela FIA a cada corrida.",
            en: "That is why drivers weave behind the Safety Car and teams warm the tyres in blankets before fitting them. Minimum pressures and blanket temperatures are set by Pirelli and the FIA for each event.",
          },
        ],
      },
      {
        heading: { pt: "Compostos e regras de uso", en: "Compounds and usage rules" },
        body: [
          {
            pt: "A Pirelli fabrica seis compostos de pista seca, do C1 (mais duro) ao C6 (mais macio), e leva três a cada corrida, rotulados como duro, médio e macio de acordo com a pista. Em corrida seca, cada piloto precisa usar pelo menos dois compostos diferentes — uma regra que força ao menos uma parada.",
            en: "Pirelli makes six dry compounds, from C1 (hardest) to C6 (softest), and brings three to each event, labelled hard, medium and soft according to the track. In a dry race, each driver must use at least two different compounds — a rule that forces at least one pit stop.",
          },
          {
            pt: "Para chuva há o intermediário (verde), para pista úmida, e o de chuva forte (azul), que escoa grandes volumes de água. O número de jogos que cada piloto recebe no fim de semana e quantos precisa devolver após cada sessão estão no Regulamento Esportivo.",
            en: "For rain there is the intermediate (green) for a damp track and the full wet (blue), which clears large volumes of water. How many sets each driver receives for the weekend and must return after each session is set in the Sporting Regulations.",
          },
        ],
      },
      {
        heading: { pt: "Desgaste, degradação e granulação", en: "Wear, degradation and graining" },
        body: [
          {
            pt: "Degradação é a perda de desempenho ao longo do stint. Ela pode ser térmica (o pneu superaquece), mecânica (a borracha se desgasta) ou por granulação — quando pedaços de borracha se soltam e rolam sobre a superfície, criando uma camada que escorrega. Os pilotos administram o pneu poupando tração nas saídas de curva e evitando deslizar.",
            en: "Degradation is the loss of performance through a stint. It can be thermal (the tyre overheats), mechanical (the rubber wears away) or caused by graining — when pieces of rubber tear and roll across the surface, forming a slippery layer. Drivers manage tyres by saving traction out of corners and avoiding sliding.",
          },
        ],
      },
      {
        heading: { pt: "Guerras de pneus e mudanças de regra", en: "Tyre wars and rule changes" },
        body: [
          {
            pt: "Por décadas, vários fabricantes competiram — Goodyear, Michelin, Bridgestone, Pirelli e outros —, e as “guerras de pneus” davam saltos de desempenho. Em 2005, com pneus que precisavam durar a corrida inteira, os carros com Michelin não largaram em Indianápolis por razões de segurança, e só seis carros disputaram a prova.",
            en: "For decades several manufacturers competed — Goodyear, Michelin, Bridgestone, Pirelli and others — and ‘tyre wars’ brought leaps in performance. In 2005, with tyres that had to last the entire race, the Michelin-shod cars did not start at Indianapolis for safety reasons, and only six cars took part.",
          },
          {
            pt: "Pneus slicks foram substituídos por pneus com sulcos de 1998 a 2008, para reduzir a aderência, e voltaram em 2009. Desde 2007 há um fornecedor único: a Bridgestone até 2010 e a Pirelli desde 2011, encarregada de fazer pneus que se degradam de propósito para criar estratégias variadas. Em 2022, as rodas passaram de 13 para 18 polegadas.",
            en: "Slick tyres were replaced by grooved tyres from 1998 to 2008 to reduce grip, and returned in 2009. Since 2007 there has been a single supplier: Bridgestone until 2010 and Pirelli since 2011, tasked with making tyres that degrade deliberately to create varied strategies. In 2022 wheels grew from 13 to 18 inches.",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "Composto", en: "Compound" }, definition: { pt: "Mistura de borracha; quanto mais macia, mais aderência e mais desgaste.", en: "The rubber mixture; softer means more grip and more wear." } },
      { term: { pt: "Janela de temperatura", en: "Operating window" }, definition: { pt: "Faixa de temperatura em que o pneu funciona bem.", en: "The temperature range in which the tyre works well." } },
      { term: { pt: "Degradação", en: "Degradation" }, definition: { pt: "Perda de desempenho conforme o pneu se desgasta ou superaquece.", en: "Loss of performance as the tyre wears or overheats." } },
      { term: { pt: "Granulação (graining)", en: "Graining" }, definition: { pt: "Borracha que se solta e rola sobre o pneu, reduzindo a aderência.", en: "Rubber tearing and rolling across the tyre, reducing grip." } },
      { term: { pt: "Bolhas (blistering)", en: "Blistering" }, definition: { pt: "Bolhas por superaquecimento interno da borracha.", en: "Blisters caused by internal overheating of the rubber." } },
      { term: { pt: "Pneu travado (flat spot)", en: "Flat spot" }, definition: { pt: "Área plana criada quando a roda trava numa frenagem.", en: "A flat area created when a wheel locks under braking." } },
      { term: { pt: "Undercut", en: "Undercut" }, definition: { pt: "Parar antes do rival para ganhar tempo com pneus novos.", en: "Pitting before a rival to gain time on fresh tyres." } },
    ],
    history: [
      { year: "1971", title: { pt: "Slicks", en: "Slicks" }, text: { pt: "Pneus lisos chegam à F1.", en: "Smooth tyres arrive in F1." } },
      { year: "1998", title: { pt: "Pneus com sulcos", en: "Grooved tyres" }, text: { pt: "Introduzidos para reduzir a aderência.", en: "Introduced to reduce grip." } },
      { year: "2005", title: { pt: "Indianápolis", en: "Indianapolis" }, text: { pt: "Só seis carros largam.", en: "Only six cars start." } },
      { year: "2007", title: { pt: "Fornecedor único", en: "Single supplier" }, text: { pt: "Bridgestone; dois compostos obrigatórios por corrida.", en: "Bridgestone; two compounds required per race." } },
      { year: "2009", title: { pt: "Slicks voltam", en: "Slicks return" }, text: { pt: "Fim dos sulcos.", en: "Grooves dropped." } },
      { year: "2011", title: { pt: "Pirelli", en: "Pirelli" }, text: { pt: "Pneus feitos para degradar.", en: "Tyres designed to degrade." } },
      { year: "2022", title: { pt: "18 polegadas", en: "18-inch wheels" }, text: { pt: "Rodas maiores, pneus de perfil baixo.", en: "Larger wheels, low-profile tyres." } },
    ],
    related: ["aerodynamics", "suspension", "sporting"],
    cars: ["ferrari-f2004", "red-bull-rb19"],
    regs: [T("C10.8"), S("B6.1"), S("B6.2"), S("B6.3")],
  },

  /* -------------------------------------------------------------------- Fuel */
  {
    slug: "fuel",
    group: "engineering",
    tone: "green",
    title: { pt: "Combustível", en: "Fuel" },
    summary: {
      pt: "Das misturas de álcool dos anos 1950 ao combustível 100% sustentável de 2026.",
      en: "From the alcohol blends of the 1950s to the 100% sustainable fuel of 2026.",
    },
    simple: {
      pt: "Os carros de F1 usam um combustível parecido em princípio com a gasolina comum, mas com composição rigidamente controlada. Desde 2026 ele precisa ser totalmente sustentável — feito sem petróleo.",
      en: "Formula One cars use a fuel similar in principle to road petrol, but with a tightly controlled composition. Since 2026 it has had to be fully sustainable — made without crude oil.",
    },
    facts: [
      { label: { pt: "Gasolina de aviação obrigatória", en: "Aviation petrol mandated" }, value: { pt: "1958", en: "1958" } },
      { label: { pt: "Reabastecimento em corrida", en: "In-race refuelling" }, value: { pt: "Permitido 1994–2009; proibido desde 2010", en: "Allowed 1994–2009; banned since 2010" } },
      { label: { pt: "Vazão máxima (2014–2025)", en: "Maximum flow (2014–2025)" }, value: { pt: "100 kg/h", en: "100 kg/h" } },
      { label: { pt: "E10", en: "E10" }, value: { pt: "10% de etanol sustentável a partir de 2022", en: "10% sustainable ethanol from 2022" } },
      { label: { pt: "2026", en: "2026" }, value: { pt: "100% sustentável (cap. C16)", en: "100% sustainable (ch. C16)" } },
    ],
    sections: [
      {
        heading: { pt: "Dos coquetéis de álcool à gasolina", en: "From alcohol cocktails to petrol" },
        body: [
          {
            pt: "Nos primeiros anos, os motores com compressor queimavam misturas à base de metanol, que permitiam muito mais potência à custa de um consumo enorme. A partir de 1958 o regulamento exigiu gasolina de aviação comercial.",
            en: "In the early years, supercharged engines burned methanol-based blends that allowed far more power at the cost of enormous consumption. From 1958 the regulations required commercial aviation petrol.",
          },
          {
            pt: "Na era turbo dos anos 1980, as petroleiras criaram combustíveis “exóticos” com compostos aromáticos de alta energia, até que o regulamento passou a exigir combustíveis próximos dos vendidos nos postos. Hoje cada fornecedor homologa sua receita, e amostras são coletadas e analisadas pela FIA em todos os eventos.",
            en: "In the turbo era of the 1980s, oil companies created ‘exotic’ fuels with high-energy aromatic compounds, until the regulations required fuels close to those sold at the pump. Today each supplier homologates its blend, and samples are collected and analysed by the FIA at every event.",
          },
        ],
      },
      {
        heading: { pt: "Reabastecimento: sim, não, sim, não", en: "Refuelling: yes, no, yes, no" },
        body: [
          {
            pt: "A Brabham popularizou paradas planejadas para reabastecer em 1982–1983; o reabastecimento foi proibido em 1984. Ele voltou em 1994 e moldou as estratégias por 16 anos: carros largavam leves e paravam duas ou três vezes. Também trouxe riscos — o incêndio no carro de Jos Verstappen em Hockenheim, em 1994, é a imagem mais lembrada.",
            en: "Brabham popularised planned refuelling stops in 1982–1983; refuelling was banned in 1984. It returned in 1994 and shaped strategy for 16 years: cars started light and stopped two or three times. It also brought risks — the fire on Jos Verstappen's car at Hockenheim in 1994 is the best-remembered image.",
          },
          {
            pt: "Desde 2010 os carros largam com todo o combustível de que precisam. Isso fez o peso do carro variar muito ao longo da corrida e tornou a gestão de pneus e combustível parte central da pilotagem.",
            en: "Since 2010 cars have started with all the fuel they need. This made the car's weight vary greatly through the race and put tyre and fuel management at the centre of driving.",
          },
        ],
      },
      {
        heading: { pt: "Eficiência e limites", en: "Efficiency and limits" },
        body: [
          {
            pt: "Na era híbrida, o regulamento limitou não só a quantidade de combustível por corrida, mas também a vazão máxima — 100 kg/h, medidos por um sensor homologado. Para ganhar potência, os fabricantes tiveram de extrair mais energia de cada gota, com combustão por jato turbulento e câmaras de pré-combustão.",
            en: "In the hybrid era the regulations limited not only the quantity of fuel per race but also the maximum flow rate — 100 kg/h, measured by a homologated sensor. To gain power, manufacturers had to extract more energy from every drop, using turbulent-jet ignition and pre-chambers.",
          },
          {
            pt: "Em 2026, o limite passa a ser de energia por hora, e não de massa, para que combustíveis de composições diferentes sejam tratados de forma justa.",
            en: "In 2026 the limit is expressed as energy per hour rather than mass, so that fuels of different compositions are treated fairly.",
          },
        ],
      },
      {
        heading: { pt: "Combustível sustentável", en: "Sustainable fuel" },
        body: [
          {
            pt: "Em 2022 a F1 passou a usar E10, com 10% de etanol de origem sustentável. A partir de 2026, todo o combustível precisa ser “avançado sustentável”: produzido a partir de captura de carbono, resíduos urbanos ou biomassa que não compete com alimentos. A ideia é que a tecnologia possa ser usada nos carros de rua existentes. As exigências estão no capítulo C16 do Regulamento Técnico.",
            en: "In 2022 Formula One switched to E10, with 10% sustainably sourced ethanol. From 2026 all fuel must be ‘advanced sustainable’: produced from carbon capture, municipal waste or non-food biomass. The idea is that the technology can be used in existing road cars. The requirements are in Chapter C16 of the Technical Regulations.",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "Vazão de combustível", en: "Fuel flow" }, definition: { pt: "Velocidade com que o combustível entra no motor; limitada por regra.", en: "The rate at which fuel enters the engine; limited by the rules." } },
      { term: { pt: "Sensor de vazão", en: "Fuel-flow meter" }, definition: { pt: "Sensor homologado pela FIA que mede o consumo em tempo real.", en: "FIA-homologated sensor measuring fuel use in real time." } },
      { term: { pt: "Reabastecimento", en: "Refuelling" }, definition: { pt: "Colocar combustível durante a corrida — proibido desde 2010.", en: "Adding fuel during the race — banned since 2010." } },
      { term: { pt: "Combustível avançado sustentável", en: "Advanced sustainable fuel" }, definition: { pt: "Combustível sem origem fóssil, exigido a partir de 2026.", en: "Non-fossil fuel required from 2026." } },
    ],
    history: [
      { year: "1950", title: { pt: "Metanol", en: "Methanol" }, text: { pt: "Misturas de álcool nos motores com compressor.", en: "Alcohol blends in supercharged engines." } },
      { year: "1958", title: { pt: "Gasolina de aviação", en: "Aviation petrol" }, text: { pt: "Fim dos combustíveis à base de álcool.", en: "End of alcohol-based fuels." } },
      { year: "1984", title: { pt: "Reabastecimento proibido", en: "Refuelling banned" }, text: { pt: "Depois das paradas planejadas da Brabham.", en: "After Brabham's planned stops." } },
      { year: "1994", title: { pt: "Reabastecimento volta", en: "Refuelling returns" }, text: { pt: "Permitido até 2009.", en: "Allowed until 2009." } },
      { year: "2014", title: { pt: "Limite de vazão", en: "Flow limit" }, text: { pt: "100 kg/h na era híbrida.", en: "100 kg/h in the hybrid era." } },
      { year: "2022", title: { pt: "E10", en: "E10" }, text: { pt: "10% de etanol sustentável.", en: "10% sustainable ethanol." } },
      { year: "2026", title: { pt: "100% sustentável", en: "100% sustainable" }, text: { pt: "Fim do combustível fóssil.", en: "End of fossil fuel." } },
    ],
    related: ["power-units", "cooling"],
    cars: ["alfa-romeo-158", "brabham-bt52"],
    regs: [T("C6.1"), T("C6.4"), T("C16.2"), T("C16.3")],
  },

  /* ------------------------------------------------------------------ Brakes */
  {
    slug: "brakes",
    group: "engineering",
    tone: "orange",
    title: { pt: "Freios", en: "Brakes" },
    summary: {
      pt: "Discos de carbono que ficam incandescentes e param um carro a mais de 300 km/h em poucos segundos.",
      en: "Carbon discs that glow red-hot and stop a car from more than 300 km/h in a few seconds.",
    },
    simple: {
      pt: "Os freios de F1 são de carbono e funcionam melhor muito quentes. Numa frenagem forte o piloto sente uma desaceleração de cerca de 5 g — cinco vezes o próprio peso empurrando-o para a frente.",
      en: "F1 brakes are made of carbon and work best when very hot. Under heavy braking the driver feels around 5 g of deceleration — five times their own weight pushing them forward.",
    },
    facts: [
      { label: { pt: "Material", en: "Material" }, value: { pt: "Discos e pastilhas de carbono-carbono", en: "Carbon-carbon discs and pads" } },
      { label: { pt: "Desaceleração típica", en: "Typical deceleration" }, value: { pt: "cerca de 5 g nas frenagens mais fortes", en: "around 5 g in the heaviest stops" } },
      { label: { pt: "Freio traseiro eletrônico", en: "Rear brake-by-wire" }, value: { pt: "desde 2014", en: "since 2014" } },
    ],
    sections: [
      {
        heading: { pt: "Do tambor ao carbono", en: "From drums to carbon" },
        body: [
          {
            pt: "Os primeiros carros usavam freios a tambor. Os freios a disco, vindos das corridas de endurance, se espalharam pela F1 no fim dos anos 1950. No fim dos anos 1970 a Brabham experimentou discos de carbono, e em meados dos anos 1980 eles já eram padrão.",
            en: "The first cars used drum brakes. Disc brakes, proven in endurance racing, spread through Formula One at the end of the 1950s. At the end of the 1970s Brabham experimented with carbon discs, and by the mid-1980s they were standard.",
          },
          {
            pt: "O carbono-carbono é leve, aguenta temperaturas acima de 1.000 °C e tem mais atrito quanto mais quente. O lado ruim: frio, ele quase não freia — por isso os pilotos precisam manter a temperatura dos freios atrás do Safety Car.",
            en: "Carbon-carbon is light, withstands temperatures above 1,000 °C and grips better the hotter it gets. The downside: when cold, it barely brakes at all — which is why drivers must keep brake temperatures up behind the Safety Car.",
          },
        ],
      },
      {
        heading: { pt: "Refrigeração dos freios", en: "Brake cooling" },
        body: [
          {
            pt: "Cada disco tem centenas de pequenos furos radiais para ventilação, e os dutos de freio são desenhados para cada circuito. Em Montreal ou Monza, com frenagens fortes depois de retas longas, os dutos são maiores; em pistas mais leves, menores, para ganhar aerodinâmica. Superaquecer gasta o disco rapidamente; esfriar demais faz o carro perder frenagem.",
            en: "Each disc has hundreds of small radial holes for ventilation, and the brake ducts are designed for each circuit. At Montreal or Monza, with heavy stops after long straights, the ducts are larger; at gentler tracks, smaller, to gain aerodynamic performance. Overheating wears the disc rapidly; overcooling costs braking.",
          },
        ],
      },
      {
        heading: { pt: "Freio eletrônico e recuperação de energia", en: "Brake-by-wire and energy recovery" },
        body: [
          {
            pt: "Desde 2014, o MGU-K também freia o carro enquanto recupera energia. Para que o piloto sinta sempre o mesmo pedal, o freio traseiro é controlado eletronicamente: o sistema calcula quanto da frenagem vem do motor elétrico e completa o resto com o freio hidráulico. Em 2026, com o MGU-K muito mais potente, essa mistura ganhou ainda mais importância.",
            en: "Since 2014 the MGU-K has also slowed the car while recovering energy. So that the driver always feels the same pedal, the rear brakes are electronically controlled: the system calculates how much braking comes from the electric motor and makes up the rest with the hydraulic brake. In 2026, with a far more powerful MGU-K, this blend became even more important.",
          },
        ],
      },
      {
        heading: { pt: "Equilíbrio de freio", en: "Brake balance" },
        body: [
          {
            pt: "O piloto ajusta pelo volante a divisão da força de frenagem entre dianteira e traseira, muitas vezes curva a curva. Mais freio na frente estabiliza o carro; mais atrás ajuda a fazer a curva, mas aumenta o risco de travar e rodar. Um pneu travado cria um “flat spot” que pode obrigar a uma parada extra.",
            en: "The driver adjusts the front-to-rear split of braking force from the steering wheel, often corner by corner. More front brake stabilises the car; more rear helps it turn but raises the risk of locking up and spinning. A locked wheel creates a flat spot that can force an extra pit stop.",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "Carbono-carbono", en: "Carbon-carbon" }, definition: { pt: "Compósito de fibra de carbono em matriz de carbono, usado em discos e pastilhas.", en: "Carbon fibre in a carbon matrix, used for discs and pads." } },
      { term: { pt: "Equilíbrio de freio", en: "Brake balance" }, definition: { pt: "Divisão da força de frenagem entre frente e trás.", en: "The split of braking force between front and rear." } },
      { term: { pt: "Brake-by-wire", en: "Brake-by-wire" }, definition: { pt: "Controle eletrônico do freio traseiro, combinado com a recuperação de energia.", en: "Electronic control of the rear brakes, blended with energy recovery." } },
      { term: { pt: "Travamento", en: "Lock-up" }, definition: { pt: "Roda que para de girar com o carro ainda em movimento.", en: "A wheel that stops turning while the car is still moving." } },
      { term: { pt: "Ponto de frenagem", en: "Braking point" }, definition: { pt: "Onde o piloto começa a frear; frear mais tarde é uma forma de ultrapassar.", en: "Where the driver begins braking; braking later is a way to overtake." } },
    ],
    history: [
      { year: "1950s", title: { pt: "Freios a disco", en: "Disc brakes" }, text: { pt: "Substituem os tambores no fim da década.", en: "Replace drums by the end of the decade." } },
      { year: "1980s", title: { pt: "Carbono", en: "Carbon" }, text: { pt: "Discos de carbono viram padrão.", en: "Carbon discs become standard." } },
      { year: "2014", title: { pt: "Brake-by-wire", en: "Brake-by-wire" }, text: { pt: "Frenagem traseira combinada com o MGU-K.", en: "Rear braking blended with the MGU-K." } },
      { year: "2026", title: { pt: "Mais recuperação", en: "More recovery" }, text: { pt: "MGU-K de 350 kW freia ainda mais o carro.", en: "350 kW MGU-K does even more of the braking." } },
    ],
    related: ["hybrid-systems", "tyres", "cooling"],
    cars: [],
    regs: [T("C11.1"), T("C11.3"), T("C11.6")],
  },

  /* -------------------------------------------------------------- Suspension */
  {
    slug: "suspension",
    group: "engineering",
    tone: "blue",
    title: { pt: "Suspensão", en: "Suspension" },
    summary: {
      pt: "Manter a plataforma aerodinâmica estável e os pneus no chão — com regras que proíbem os sistemas mais inteligentes.",
      en: "Keeping the aerodynamic platform steady and the tyres on the ground — under rules that ban the cleverest systems.",
    },
    simple: {
      pt: "A suspensão de um F1 é muito dura. Seu trabalho principal não é conforto, e sim manter o carro na altura certa do chão, porque o fundo só gera pressão aerodinâmica se ficar a poucos milímetros do asfalto.",
      en: "An F1 car's suspension is very stiff. Its main job is not comfort but keeping the car at the right height, because the floor only generates downforce when it runs a few millimetres from the track.",
    },
    facts: [
      { label: { pt: "Suspensão ativa campeã", en: "Title-winning active suspension" }, value: { pt: "Williams FW14B, 1992", en: "Williams FW14B, 1992" } },
      { label: { pt: "Sistemas ativos proibidos", en: "Active systems banned" }, value: { pt: "1994", en: "1994" } },
      { label: { pt: "FRIC proibido", en: "FRIC banned" }, value: { pt: "2014", en: "2014" } },
    ],
    sections: [
      {
        heading: { pt: "Para que serve", en: "What it is for" },
        body: [
          {
            pt: "A suspensão liga as rodas ao chassi e controla como o carro se move: rolagem nas curvas, arfagem (“mergulho”) nas frenagens e acelerações, e altura em relação ao chão. Num carro de efeito solo, alguns milímetros a mais ou a menos de altura mudam muito a pressão aerodinâmica — por isso a suspensão é, antes de tudo, uma ferramenta aerodinâmica.",
            en: "The suspension links the wheels to the chassis and controls how the car moves: roll in corners, pitch under braking and acceleration, and ride height. In a ground-effect car, a few millimetres of ride height make a big difference to downforce — so the suspension is, above all, an aerodynamic tool.",
          },
        ],
      },
      {
        heading: { pt: "Pushrod e pullrod", en: "Pushrod and pullrod" },
        body: [
          {
            pt: "Molas e amortecedores ficam dentro da carroceria, acionados por hastes: no pushrod a haste empurra de baixo para cima; no pullrod ela puxa de cima para baixo. A escolha depende de onde os engenheiros querem pôr peso e de como o arranjo afeta o fluxo de ar. A Ferrari adotou pullrod na dianteira em 2012, e o regulamento de 2022 fez várias equipes reverem a escolha.",
            en: "Springs and dampers sit inside the bodywork, operated by rods: with a pushrod the rod pushes upwards from the bottom; with a pullrod it pulls downwards from the top. The choice depends on where engineers want weight and how the layout affects airflow. Ferrari adopted front pullrod in 2012, and the 2022 rules led several teams to revisit the choice.",
          },
        ],
      },
      {
        heading: { pt: "A suspensão ativa e sua proibição", en: "Active suspension and its ban" },
        body: [
          {
            pt: "A Lotus experimentou suspensão controlada por computador nos anos 1980, mas foi a Williams que a aperfeiçoou: o FW14B, de 1992, mantinha o carro numa altura constante em qualquer situação, e Nigel Mansell foi campeão com folga. Para 1994, a FIA proibiu suspensão ativa, controle de tração e outros auxílios eletrônicos.",
            en: "Lotus experimented with computer-controlled suspension in the 1980s, but Williams perfected it: the 1992 FW14B held the car at a constant ride height in every situation, and Nigel Mansell won the title comfortably. For 1994 the FIA banned active suspension, traction control and other electronic aids.",
          },
          {
            pt: "Desde então, as equipes procuram efeitos parecidos de forma passiva: o amortecedor de massa da Renault (proibido em 2006), as suspensões interligadas frente-trás, o FRIC (proibido em 2014), e mais tarde sistemas hidráulicos que controlavam a altura, restringidos em 2022.",
            en: "Since then, teams have sought similar effects passively: Renault's mass damper (banned in 2006), front-to-rear interconnected suspension, FRIC (banned in 2014), and later hydraulic systems controlling ride height, restricted in 2022.",
          },
        ],
      },
      {
        heading: { pt: "Acerto (setup)", en: "Set-up" },
        body: [
          {
            pt: "Em cada pista, os engenheiros ajustam rigidez das molas, barras estabilizadoras, amortecedores, câmber, convergência e altura. Uma pista com zebras altas, como Singapura, pede um carro mais macio; uma pista lisa e rápida permite um carro mais baixo e duro. Depois da classificação, o acerto fica congelado em parque fechado até a corrida.",
            en: "At each track, engineers adjust spring rates, anti-roll bars, dampers, camber, toe and ride height. A track with high kerbs, such as Singapore, needs a softer car; a smooth, fast track allows a lower, stiffer car. After qualifying, the set-up is frozen in parc fermé until the race.",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "Pushrod / pullrod", en: "Pushrod / pullrod" }, definition: { pt: "Duas formas de ligar a roda às molas e amortecedores.", en: "Two ways to link the wheel to the springs and dampers." } },
      { term: { pt: "Altura do carro", en: "Ride height" }, definition: { pt: "Distância entre o assoalho e a pista.", en: "The distance between the floor and the track." } },
      { term: { pt: "Câmber", en: "Camber" }, definition: { pt: "Inclinação da roda em relação à vertical.", en: "The tilt of the wheel relative to vertical." } },
      { term: { pt: "Barra estabilizadora", en: "Anti-roll bar" }, definition: { pt: "Barra que limita a rolagem da carroceria nas curvas.", en: "A bar limiting body roll in corners." } },
      { term: { pt: "Suspensão ativa", en: "Active suspension" }, definition: { pt: "Controlada por computador e atuadores; proibida desde 1994.", en: "Controlled by computer and actuators; banned since 1994." } },
      { term: { pt: "FRIC", en: "FRIC" }, definition: { pt: "Suspensão interligada frente-trás; proibida em 2014.", en: "Front-to-rear interconnected suspension; banned in 2014." } },
    ],
    history: [
      { year: "1970", title: { pt: "Lotus 72", en: "Lotus 72" }, text: { pt: "Barras de torção e freios internos.", en: "Torsion bars and inboard brakes." } },
      { year: "1992", title: { pt: "Suspensão ativa", en: "Active suspension" }, text: { pt: "Williams FW14B domina.", en: "Williams FW14B dominates." } },
      { year: "1994", title: { pt: "Proibida", en: "Banned" }, text: { pt: "Fim dos sistemas ativos.", en: "Active systems prohibited." } },
      { year: "2006", title: { pt: "Amortecedor de massa", en: "Mass damper" }, text: { pt: "Sistema da Renault é proibido.", en: "Renault's system is banned." } },
      { year: "2014", title: { pt: "FRIC", en: "FRIC" }, text: { pt: "Suspensões interligadas proibidas.", en: "Interconnected suspension banned." } },
    ],
    related: ["aerodynamics", "chassis"],
    cars: ["lotus-72c", "williams-fw14b", "red-bull-rb19"],
    regs: [T("C10.2"), T("C10.3"), T("C10.4")],
  },

  /* ----------------------------------------------------------------- Cooling */
  {
    slug: "cooling",
    group: "engineering",
    tone: "blue",
    title: { pt: "Refrigeração", en: "Cooling" },
    summary: {
      pt: "Radiadores, dutos e calor — o compromisso constante entre temperatura e aerodinâmica.",
      en: "Radiators, ducts and heat — the constant compromise between temperature and aerodynamics.",
    },
    simple: {
      pt: "O motor, a bateria e os freios produzem um calor enorme. Para tirá-lo, é preciso ar — e cada abertura para o ar custa desempenho aerodinâmico. Refrigerar o suficiente, e nem um pouco mais, é uma arte.",
      en: "The engine, battery and brakes produce enormous heat. Getting rid of it takes air — and every opening for air costs aerodynamic performance. Cooling enough, and not a bit more, is an art.",
    },
    facts: [
      { label: { pt: "Radiadores laterais popularizados", en: "Side radiators popularised" }, value: { pt: "Lotus 72, 1970", en: "Lotus 72, 1970" } },
      { label: { pt: "Circuitos extras", en: "Additional circuits" }, value: { pt: "Bateria, eletrônica e intercooler na era híbrida", en: "Battery, electronics and intercooler in the hybrid era" } },
      { label: { pt: "Risco de calor", en: "Heat hazard" }, value: { pt: "Peso mínimo ajustado e refrigeração do piloto — art. C4.6", en: "Minimum mass adjusted and driver cooling — art. C4.6" } },
    ],
    sections: [
      {
        heading: { pt: "Radiadores e sidepods", en: "Radiators and sidepods" },
        body: [
          {
            pt: "Até o fim dos anos 1960, o radiador ficava no bico. O Lotus 72, de 1970, o levou para as laterais, abrindo espaço para um bico em cunha e definindo o formato dos carros por décadas. Hoje, líquido de arrefecimento, óleo e ar de admissão passam por trocadores de calor nos sidepods.",
            en: "Until the late 1960s the radiator sat in the nose. The 1970 Lotus 72 moved it to the sides, making room for a wedge nose and defining the shape of cars for decades. Today coolant, oil and charge air pass through heat exchangers in the sidepods.",
          },
          {
            pt: "O tamanho das entradas de ar é uma das decisões aerodinâmicas mais importantes. Sidepods estreitos ajudam o fluxo para a traseira, mas resfriam menos. Equipes levam pacotes diferentes para cada pista: carenagens mais abertas em lugares quentes, como Bahrein ou Singapura, e mais fechadas em pistas frias.",
            en: "The size of the cooling inlets is one of the most important aerodynamic decisions. Narrow sidepods help airflow to the rear but cool less. Teams bring different packages to each track: more open bodywork in hot places such as Bahrain or Singapore, tighter at cool tracks.",
          },
        ],
      },
      {
        heading: { pt: "O desafio da era híbrida", en: "The hybrid-era challenge" },
        body: [
          {
            pt: "Com o turbo, o ar comprimido precisa passar por um intercooler; a bateria e os componentes eletrônicos exigem temperaturas bem mais baixas que o motor, com circuitos de refrigeração separados. Superaquecer a bateria reduz a energia disponível e pode danificá-la.",
            en: "With the turbo, compressed air must pass through an intercooler; the battery and electronics need much lower temperatures than the engine, with separate cooling circuits. Overheating the battery reduces available energy and can damage it.",
          },
          {
            pt: "Atrás de outro carro, o ar mais quente e com menos pressão refrigera menos. Por isso as equipes às vezes pedem que o piloto se afaste do carro da frente para baixar as temperaturas, mesmo podendo atacar.",
            en: "Behind another car, warmer, lower-pressure air cools less. That is why teams sometimes ask a driver to drop back from the car ahead to bring temperatures down, even when they could attack.",
          },
        ],
      },
      {
        heading: { pt: "Refrigerar o piloto", en: "Cooling the driver" },
        body: [
          {
            pt: "A temperatura no cockpit pode passar de 50 °C em corridas quentes, e os pilotos perdem vários quilos de líquido. Depois do GP do Catar de 2023, quando pilotos passaram mal no carro, a FIA criou regras de “risco de calor”: quando ele é declarado, o carro pode levar um sistema de refrigeração do piloto e o peso mínimo é ajustado para que isso não traga desvantagem (art. C4.6).",
            en: "Cockpit temperatures can exceed 50 °C in hot races, and drivers lose several kilograms of fluid. After the 2023 Qatar Grand Prix, when drivers were taken ill in the car, the FIA created ‘heat hazard’ rules: when one is declared, the car may carry a driver cooling system and the minimum mass is adjusted so that it brings no disadvantage (Art. C4.6).",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "Trocador de calor", en: "Heat exchanger" }, definition: { pt: "Radiador que transfere calor de um fluido para o ar.", en: "A radiator transferring heat from a fluid to the air." } },
      { term: { pt: "Intercooler", en: "Intercooler" }, definition: { pt: "Resfria o ar comprimido pelo turbo antes de entrar no motor.", en: "Cools the turbo-compressed air before it enters the engine." } },
      { term: { pt: "Pacote de refrigeração", en: "Cooling package" }, definition: { pt: "Conjunto de aberturas e radiadores escolhido para a temperatura de cada pista.", en: "The set of openings and radiators chosen for each track's temperature." } },
      { term: { pt: "Risco de calor", en: "Heat hazard" }, definition: { pt: "Condição declarada pela FIA em calor extremo, com regras específicas.", en: "A condition declared by the FIA in extreme heat, with specific rules." } },
    ],
    history: [
      { year: "1970", title: { pt: "Radiadores laterais", en: "Side radiators" }, text: { pt: "O Lotus 72 tira o radiador do bico.", en: "The Lotus 72 moves the radiator from the nose." } },
      { year: "2014", title: { pt: "Refrigeração híbrida", en: "Hybrid cooling" }, text: { pt: "Bateria, eletrônica e intercooler.", en: "Battery, electronics and intercooler." } },
      { year: "2023", title: { pt: "Catar", en: "Qatar" }, text: { pt: "Calor extremo leva a novas regras.", en: "Extreme heat leads to new rules." } },
      { year: "2025", title: { pt: "Refrigeração do piloto", en: "Driver cooling" }, text: { pt: "Regras de risco de calor em vigor.", en: "Heat-hazard rules in force." } },
    ],
    related: ["power-units", "aerodynamics", "brakes"],
    cars: ["lotus-72c"],
    regs: [T("C7.4"), T("C14.6"), T("C4.6")],
  },

  /* ------------------------------------------------------- Safety structures */
  {
    slug: "safety-structures",
    group: "engineering",
    tone: "red",
    title: { pt: "Estruturas de segurança", en: "Safety structures" },
    summary: {
      pt: "As estruturas de impacto, o halo e os cabos de retenção que cercam o piloto.",
      en: "The impact structures, halo and tethers engineered around the driver.",
    },
    simple: {
      pt: "Num acidente, o carro é feito para se desmanchar de forma controlada — absorvendo a energia para que o corpo do piloto não precise absorvê-la. Enquanto isso, a célula onde ele está sentado não pode deformar.",
      en: "In an accident the car is designed to crush in a controlled way — absorbing energy so that the driver's body doesn't have to. Meanwhile, the cell the driver sits in must not deform.",
    },
    facts: [
      { label: { pt: "HANS obrigatório", en: "HANS mandatory" }, value: { pt: "2003", en: "2003" } },
      { label: { pt: "Halo obrigatório", en: "Halo mandatory" }, value: { pt: "2018", en: "2018" } },
      { label: { pt: "Laterais do cockpit elevadas", en: "Raised cockpit sides" }, value: { pt: "1996", en: "1996" } },
      { label: { pt: "Cabos de retenção das rodas", en: "Wheel tethers" }, value: { pt: "Desde 1999, reforçados várias vezes", en: "Since 1999, strengthened several times" } },
    ],
    sections: [
      {
        heading: { pt: "Estruturas de impacto", en: "Impact structures" },
        body: [
          {
            pt: "Na frente, atrás e dos lados do cockpit há estruturas de fibra de carbono feitas para se esmagar progressivamente, como uma sanfona. Nos testes da FIA, elas precisam absorver uma quantidade definida de energia sem que a desaceleração passe de certos limites e sem danificar a célula de sobrevivência.",
            en: "In front, behind and to the sides of the cockpit are carbon-fibre structures designed to crush progressively, like a concertina. In FIA tests they must absorb a defined amount of energy without deceleration exceeding set limits and without damaging the survival cell.",
          },
        ],
      },
      {
        heading: { pt: "Proteção da cabeça", en: "Head protection" },
        body: [
          {
            pt: "Depois de 1994, a cabeça do piloto virou prioridade. Em 1996, as laterais do cockpit foram elevadas e passaram a ter acolchoamento que absorve energia. Em 2003 o HANS — um suporte de cabeça e pescoço preso ao capacete — tornou-se obrigatório, reduzindo o risco de lesões graves no pescoço em impactos frontais.",
            en: "After 1994 the driver's head became a priority. In 1996 the cockpit sides were raised and fitted with energy-absorbing padding. In 2003 the HANS — a head and neck support tethered to the helmet — became mandatory, reducing the risk of serious neck injury in frontal impacts.",
          },
          {
            pt: "O halo, uma barra de titânio sobre o cockpit, é obrigatório desde 2018. Foi criticado pela aparência, mas logo provou seu valor: protegeu Charles Leclerc em Spa (2018), Romain Grosjean no Bahrein (2020), Lewis Hamilton em Monza (2021) e Guanyu Zhou em Silverstone (2022).",
            en: "The halo, a titanium bar over the cockpit, has been mandatory since 2018. It was criticised for its looks but soon proved its worth: it protected Charles Leclerc at Spa (2018), Romain Grosjean in Bahrain (2020), Lewis Hamilton at Monza (2021) and Guanyu Zhou at Silverstone (2022).",
          },
        ],
      },
      {
        heading: { pt: "Santantônio e cabos", en: "Roll structures and tethers" },
        body: [
          {
            pt: "A estrutura atrás da cabeça do piloto (santantônio) e a dianteira protegem em capotagens e precisam suportar cargas enormes. O acidente de Zhou em 2022, em que o santantônio cedeu, levou a testes mais severos.",
            en: "The roll structure behind the driver's head and the front roll structure protect in a rollover and must withstand enormous loads. Zhou's 2022 accident, in which the roll hoop failed, led to tougher tests.",
          },
          {
            pt: "Cabos de alta resistência prendem cada roda ao chassi, para que ela não se solte e atinja outros pilotos, fiscais ou o público quando a suspensão se rompe.",
            en: "High-strength tethers attach each wheel to the chassis, so it does not fly off and hit other drivers, marshals or spectators when the suspension breaks.",
          },
        ],
      },
      {
        heading: { pt: "Fogo e evacuação", en: "Fire and extraction" },
        body: [
          {
            pt: "O tanque de combustível é uma bolsa flexível à prova de perfuração dentro da célula de sobrevivência; macacões, luvas e balaclavas resistem ao fogo por um tempo definido; o piloto precisa conseguir sair do carro em poucos segundos; e o banco pode ser retirado com o piloto preso a ele em caso de lesão. No incêndio do Bahrein em 2020, Grosjean saiu de um carro em chamas em cerca de 30 segundos.",
            en: "The fuel tank is a puncture-resistant flexible bladder inside the survival cell; overalls, gloves and balaclavas resist fire for a defined time; the driver must be able to get out of the car within seconds; and the seat can be lifted out with the driver strapped in if they are injured. In the 2020 Bahrain fire, Grosjean escaped a burning car in around 30 seconds.",
          },
        ],
      },
    ],
    concepts: [
      { term: { pt: "Homologação", en: "Homologation" }, definition: { pt: "Aprovação de uma estrutura depois de passar nos testes da FIA.", en: "Approval of a structure after passing the FIA tests." } },
      { term: { pt: "Halo", en: "Halo" }, definition: { pt: "Proteção de titânio sobre a cabeça do piloto, obrigatória desde 2018.", en: "Titanium protection over the driver's head, mandatory since 2018." } },
      { term: { pt: "HANS", en: "HANS" }, definition: { pt: "Suporte de cabeça e pescoço preso ao capacete.", en: "Head and neck support attached to the helmet." } },
      { term: { pt: "Estrutura de impacto", en: "Impact structure" }, definition: { pt: "Parte feita para se esmagar e absorver energia.", en: "A part designed to crush and absorb energy." } },
      { term: { pt: "Cabo de retenção", en: "Wheel tether" }, definition: { pt: "Cabo que mantém a roda presa ao carro após uma quebra.", en: "A cable that keeps the wheel attached to the car after a failure." } },
    ],
    history: [
      { year: "1981", title: { pt: "Fibra de carbono", en: "Carbon fibre" }, text: { pt: "Monocoques de compósito transformam a segurança.", en: "Composite monocoques transform crash safety." } },
      { year: "1996", title: { pt: "Cockpit mais alto", en: "Higher cockpit sides" }, text: { pt: "Proteção da cabeça após Ímola.", en: "Head protection after Imola." } },
      { year: "1999", title: { pt: "Cabos nas rodas", en: "Wheel tethers" }, text: { pt: "Rodas presas ao chassi.", en: "Wheels tethered to the chassis." } },
      { year: "2003", title: { pt: "HANS", en: "HANS" }, text: { pt: "Obrigatório.", en: "Mandatory." } },
      { year: "2018", title: { pt: "Halo", en: "Halo" }, text: { pt: "Proteção obrigatória do cockpit.", en: "Mandatory cockpit protection." } },
      { year: "2020", title: { pt: "Bahrein", en: "Bahrain" }, text: { pt: "Grosjean sobrevive a um impacto e incêndio.", en: "Grosjean survives an impact and fire." } },
    ],
    related: ["chassis", "safety"],
    cars: ["mclaren-mp4-1"],
    regs: [T("C12.4"), T("C13.5"), T("C13.6"), T("C14.4")],
  },
];
