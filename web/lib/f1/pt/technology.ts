import type { TechArticle } from "../technology";

type TechText = Pick<TechArticle, "title" | "summary" | "simple" | "sections" | "concepts" | "history">;

/** Portuguese (Brazil) text of the engineering and regulation articles. */
export const TECH_PT: Record<string, TechText> = {
  aerodynamics: {
    title: "Aerodinâmica",
    summary: "Como um carro de Fórmula 1 usa o ar para se pressionar contra a pista.",
    simple: "A asa de um avião gera sustentação. Um carro de Fórmula 1 usa asas e o fundo de cabeça para baixo, gerando “pressão aerodinâmica”, que empurra os pneus contra o asfalto para o carro fazer curvas muito mais rápido.",
    sections: [
      { heading: "Pressão aerodinâmica e arrasto", body: ["A pressão aerodinâmica aumenta a aderência sem acrescentar peso, permitindo velocidades muito maiores nas curvas. O preço é o arrasto — a resistência do ar, que freia o carro nas retas. Cada circuito exige um compromisso diferente: muita pressão em Mônaco, pouca em Monza."] },
      { heading: "Asas e assoalhos", body: ["As asas dianteira e traseira são os dispositivos mais visíveis, mas o assoalho costuma ser o mais poderoso. Assoalhos de efeito solo aceleram o ar sob o carro, baixando sua pressão e puxando o carro para baixo. Esse princípio dominou de 1977 a 1982 e voltou em 2022."] },
      { heading: "Ar sujo", body: ["Um carro deixa atrás de si ar turbulento, o “ar sujo”. O carro que vem atrás perde pressão aerodinâmica nessa esteira e tem dificuldade para andar próximo nas curvas. As mudanças de 2022 buscaram reduzir esse efeito."] },
      { heading: "Aerodinâmica ativa em 2026", body: ["A partir de 2026, elementos móveis nas asas dianteira e traseira permitem alternar entre uma configuração de alta pressão para as curvas e uma de baixo arrasto para as retas. Quando e onde podem ser usados é definido pelo Regulamento Esportivo."] },
    ],
    concepts: [
      { term: "Pressão aerodinâmica (downforce)", definition: "Força aerodinâmica que empurra o carro contra a pista." },
      { term: "Arrasto", definition: "Resistência aerodinâmica que se opõe ao movimento." },
      { term: "DRS", definition: "Sistema de redução de arrasto — uma aba da asa traseira que se abre para ajudar a ultrapassar (2011–2025)." },
      { term: "Porpoising", definition: "Quicar aerodinâmico visto em assoalhos de efeito solo em alta velocidade." },
    ],
    history: [
      { year: "1968", title: "Asas", text: "A pressão aerodinâmica chega à Fórmula 1." },
      { year: "1977", title: "Efeito solo", text: "O Lotus 78 usa o fundo como asa." },
      { year: "2011", title: "DRS", text: "Introduzido o auxílio à ultrapassagem." },
      { year: "2022", title: "Volta do efeito solo", text: "Túneis Venturi sob o carro." },
    ],
  },
  chassis: {
    title: "Chassi",
    summary: "A estrutura em torno da qual o carro inteiro é construído — e a carcaça que protege o piloto.",
    simple: "O chassi é a espinha dorsal do carro. Hoje é uma carcaça de fibra de carbono chamada monocoque, ao mesmo tempo muito leve e extremamente resistente.",
    sections: [
      { heading: "Dos chassis tubulares aos monocoques", body: ["Os primeiros carros usavam chassis tubulares de aço. O Lotus 25 introduziu o monocoque de alumínio em 1962, e o McLaren MP4/1 trouxe o compósito de fibra de carbono em 1981."] },
      { heading: "A célula de sobrevivência", body: ["O monocoque atual — chamado de célula de sobrevivência no regulamento — precisa passar por testes estáticos e dinâmicos exigentes e incorpora proteção contra impactos laterais, painéis anti-intrusão e os pontos de fixação do halo."] },
    ],
    concepts: [
      { term: "Monocoque", definition: "Estrutura em que a própria casca suporta as cargas." },
      { term: "Elemento estrutural", definition: "Componente, como o motor, que também faz parte da estrutura." },
      { term: "Célula de sobrevivência", definition: "O termo do regulamento para o monocoque que protege o piloto." },
    ],
    history: [
      { year: "1962", title: "Monocoque", text: "O Lotus 25." },
      { year: "1967", title: "Motor estrutural", text: "O Lotus 49." },
      { year: "1981", title: "Fibra de carbono", text: "O McLaren MP4/1." },
    ],
  },
  "power-units": {
    title: "Motores e unidades de potência",
    summary: "Dos oito cilindros em linha aos turbo-híbridos: o coração de um carro de Fórmula 1.",
    simple: "O “motor” atual da Fórmula 1 é uma unidade de potência — um motor a combustão trabalhando junto com um motor-gerador elétrico e uma bateria.",
    sections: [
      { heading: "Os regulamentos de motor ao longo da história", body: ["A Fórmula 1 já usou muitos regulamentos de motor: 1,5 litro com compressor e 4,5 litros (1950), 2,5 litros (1954), 1,5 litro (1961), 3,0 litros (1966), turbos de 1,5 litro ao lado de motores de 3,0 litros (a partir de 1977), 3,5 litros (1989), 3,0 litros (1995), V8 de 2,4 litros (2006) e V6 turbo-híbridos de 1,6 litro (2014)."] },
      { heading: "A unidade de potência de 2014–2025", body: ["Um motor a combustão V6 turbo de 1,6 litro trabalhava com dois motores-geradores: o MGU-K, que recupera energia nas frenagens, e o MGU-H, que recupera energia dos gases de escape no turbo. A energia era armazenada numa bateria e reaproveitada como potência extra."] },
      { heading: "A unidade de potência de 2026", body: ["As regras de 2026 mantêm um V6 de 1,6 litro, mas eliminam o MGU-H e aumentam muito a potência do MGU-K, de modo que a parte elétrica responde por uma fatia muito maior do total. Os motores usam combustível totalmente sustentável. A especificação do motor — cilindrada, disposição dos cilindros, válvulas — está no Artigo C5.1 do Regulamento Técnico."] },
    ],
    concepts: [
      { term: "ICE", definition: "Motor de combustão interna." },
      { term: "MGU-K", definition: "Motor-gerador cinético: recupera energia das frenagens e fornece potência elétrica." },
      { term: "MGU-H", definition: "Motor-gerador térmico: ligado ao turbocompressor (2014–2025)." },
      { term: "Energy Store", definition: "A bateria." },
    ],
    history: [
      { year: "1967", title: "Cosworth DFV", text: "Estreia o motor mais vitorioso da história da F1." },
      { year: "1977", title: "Turbo", text: "Chega o turbo da Renault." },
      { year: "2014", title: "Híbrido", text: "Unidades de potência V6 turbo-híbridas." },
      { year: "2026", title: "Novas unidades de potência", text: "Mais potência elétrica, combustível sustentável." },
    ],
  },
  "hybrid-systems": {
    title: "Sistemas híbridos",
    summary: "Como os carros de Fórmula 1 recuperam, armazenam e reutilizam energia.",
    simple: "Quando um carro de Fórmula 1 freia, um motor elétrico funciona como gerador e carrega uma bateria. Essa energia é depois usada para acelerar.",
    sections: [
      { heading: "KERS", body: ["O sistema de recuperação de energia cinética foi permitido pela primeira vez em 2009. Oferecia um impulso curto por volta e era opcional; várias equipes preferiram não usá-lo no início."] },
      { heading: "Sistemas de recuperação de energia", body: ["A partir de 2014, o MGU-K e o MGU-H tornaram a potência híbrida central para o desempenho. Decidir quando recuperar e quando usar a energia passou a ser parte fundamental da pilotagem e da estratégia."] },
      { heading: "Regras de uso em 2026", body: ["Sem o DRS, o Regulamento Esportivo define limites e condições para o uso da energia, incluindo uma liberação adicional disponível ao piloto que está próximo do carro da frente."] },
    ],
    concepts: [
      { term: "Recuperação (harvesting)", definition: "Recuperar energia para a bateria." },
      { term: "Liberação (deployment)", definition: "Usar a energia armazenada como potência extra." },
      { term: "Lift and coast", definition: "Tirar o pé do acelerador antes da frenagem para economizar combustível ou recuperar energia." },
    ],
    history: [
      { year: "2009", title: "KERS", text: "A primeira tecnologia híbrida." },
      { year: "2014", title: "ERS", text: "Unidades de potência totalmente híbridas." },
    ],
  },
  tyres: {
    title: "Pneus",
    summary: "O único contato com a pista — e a maior variável da estratégia de corrida.",
    simple: "Pneus mais macios são mais rápidos, mas se desgastam depressa. Os mais duros duram mais, porém são mais lentos. Escolher quando usar cada um é o coração da estratégia.",
    sections: [
      { heading: "Compostos", body: ["Um fornecedor único — a Pirelli, desde 2011 — leva a cada corrida uma seleção de compostos para pista seca, identificados como macio (vermelho), médio (amarelo) e duro (branco), além dos intermediários (verde) e de chuva forte (azul). Quantos jogos cada piloto recebe e como devem ser usados está no Regulamento Esportivo."] },
      { heading: "Degradação e temperatura", body: ["Os pneus só funcionam numa faixa estreita de temperatura. Frios, falta aderência; quentes demais, superaquecem e se desgastam rápido. Os pilotos administram os pneus ao longo de todo o stint, equilibrando ritmo e durabilidade."] },
      { heading: "História", body: ["Guerras de pneus entre fabricantes concorrentes elevaram o desempenho várias vezes. Os slicks foram proibidos em favor dos pneus com sulcos de 1998 a 2008 e voltaram em 2009. As rodas passaram de 13 para 18 polegadas em 2022."] },
    ],
    concepts: [
      { term: "Composto", definition: "A mistura da borracha — os mais macios aderem mais, mas se desgastam mais rápido." },
      { term: "Degradação", definition: "Perda de desempenho com o desgaste ou o superaquecimento do pneu." },
      { term: "Granulação (graining)", definition: "Borracha que se rasga e enrola na superfície do pneu, reduzindo a aderência." },
    ],
    history: [
      { year: "1998", title: "Pneus com sulcos", text: "Adotados para reduzir a aderência." },
      { year: "2009", title: "Volta dos slicks", text: "Os pneus lisos voltam." },
      { year: "2011", title: "Pirelli", text: "Fornecedor único." },
      { year: "2022", title: "Rodas de 18 polegadas", text: "Rodas maiores, pneus de perfil mais baixo." },
    ],
  },
  fuel: {
    title: "Combustível",
    summary: "De misturas exóticas à base de álcool a combustíveis totalmente sustentáveis.",
    simple: "Os carros de Fórmula 1 usam um combustível parecido, em princípio, com a gasolina das ruas, mas rigorosamente regulamentado — e, a partir de 2026, totalmente sustentável.",
    sections: [
      { heading: "Combustível regulamentado", body: ["Os primeiros carros de Grand Prix usavam potentes misturas à base de álcool; a gasolina de aviação passou a ser obrigatória em 1958. As regras atuais definem com precisão as propriedades e a composição do combustível, e amostras são testadas em todos os eventos."] },
      { heading: "Limites de combustível e reabastecimento", body: ["Na era turbo-híbrida, as regras limitaram tanto o total de combustível por corrida quanto a vazão máxima, premiando a eficiência. O reabastecimento durante a corrida é proibido desde 2010, então os carros largam com todo o combustível de que precisam."] },
      { heading: "Combustível sustentável", body: ["A partir de 2026, o combustível precisa ser totalmente sustentável — produzido a partir de fontes não fósseis. Suas propriedades e composição exigidas estão no Capítulo C16 do Regulamento Técnico."] },
    ],
    concepts: [
      { term: "Limite de vazão", definition: "Teto para a velocidade com que o combustível pode entrar no motor." },
      { term: "Reabastecimento", definition: "Colocar combustível durante a corrida — proibido desde 2010." },
    ],
    history: [
      { year: "1958", title: "Gasolina de aviação", text: "Combustíveis à base de álcool substituídos por combustível comercial de aviação." },
      { year: "1994", title: "Volta do reabastecimento", text: "Permitido de 1994 a 2009." },
      { year: "2010", title: "Reabastecimento proibido", text: "Os carros largam com todo o combustível." },
      { year: "2026", title: "Combustível sustentável", text: "Combustível 100% sustentável obrigatório." },
    ],
  },
  brakes: {
    title: "Freios",
    summary: "Freios de carbono que ficam incandescentes e param um carro de mais de 300 km/h em segundos.",
    simple: "Os freios da Fórmula 1 são de carbono, funcionam melhor quando estão muito quentes e trabalham junto com a recuperação de energia elétrica.",
    sections: [
      { heading: "Carbono-carbono", body: ["Desde os anos 1980, a Fórmula 1 usa discos e pastilhas de carbono-carbono. São leves e funcionam em temperaturas altíssimas, com dutos de arrefecimento projetados para cada circuito."] },
      { heading: "Freio por fio (brake-by-wire)", body: ["Como o MGU-K também desacelera o carro enquanto recupera energia, a frenagem traseira é controlada eletronicamente e dividida entre os freios por atrito e o sistema de recuperação. Os pilotos ajustam a distribuição de frenagem entre dianteira e traseira várias vezes por volta."] },
    ],
    concepts: [
      { term: "Distribuição de frenagem", definition: "A divisão da força de frenagem entre dianteira e traseira." },
      { term: "Travada", definition: "Uma roda que para de girar com o carro ainda em movimento, deixando o pneu com uma área plana." },
    ],
    history: [
      { year: "1950s", title: "Freios a disco", text: "Os discos substituem os tambores." },
      { year: "1980s", title: "Carbono", text: "Os freios de carbono viram padrão." },
      { year: "2014", title: "Brake-by-wire", text: "Frenagem traseira combinada com a recuperação de energia." },
    ],
  },
  suspension: {
    title: "Suspensão",
    summary: "Manter a plataforma aerodinâmica estável e os pneus no chão.",
    simple: "A suspensão de um carro de Fórmula 1 é muito rígida — sua principal função é manter o carro na altura certa para que a aerodinâmica funcione.",
    sections: [
      { heading: "Controle da plataforma", body: ["A suspensão moderna usa pushrods ou pullrods para acionar molas e amortecedores dentro da carroceria. A prioridade é controlar a altura e a arfagem do carro, porque o assoalho é extremamente sensível à distância do solo."] },
      { heading: "Suspensão ativa", body: ["A suspensão ativa controlada por computador, aperfeiçoada pela Williams em 1992, foi proibida para 1994. Desde então as equipes encontraram muitas soluções passivas engenhosas para obter efeitos parecidos dentro das regras."] },
    ],
    concepts: [
      { term: "Pushrod / pullrod", definition: "Duas formas de ligar a roda às molas e aos amortecedores." },
      { term: "Altura do solo", definition: "A distância entre o assoalho e a pista." },
    ],
    history: [
      { year: "1992", title: "Suspensão ativa", text: "O Williams FW14B domina." },
      { year: "1994", title: "Proibida", text: "Sistemas ativos vetados." },
    ],
  },
  cooling: {
    title: "Arrefecimento",
    summary: "Radiadores, dutos e calor — o eterno compromisso entre temperatura e aerodinâmica.",
    simple: "Um carro de Fórmula 1 produz um calor enorme no motor, na bateria e nos freios. Livrar-se dele exige ar — e toda abertura para o ar custa desempenho aerodinâmico.",
    sections: [
      { heading: "Radiadores e pontões", body: ["O líquido de arrefecimento, o óleo e o ar de admissão passam por trocadores de calor instalados nos pontões. O tamanho das entradas de ar é uma decisão aerodinâmica crucial: aberturas maiores arrefecem melhor, mas aumentam o arrasto. O Lotus 72, de 1970, popularizou os radiadores laterais."] },
      { heading: "Componentes híbridos", body: ["Baterias e eletrônicos precisam ficar em faixas estreitas de temperatura, o que acrescenta circuitos de arrefecimento separados ao carro."] },
      { heading: "Arrefecer o piloto", body: ["Em condições de muito calor, o regulamento permite um sistema de arrefecimento para o piloto e ajusta o peso mínimo quando é declarado um risco de calor (Heat Hazard)."] },
    ],
    concepts: [
      { term: "Trocador de calor", definition: "Radiador que transfere calor de um fluido para o ar." },
      { term: "Pacote de arrefecimento", definition: "O conjunto de radiadores e dutos que a equipe escolhe conforme a temperatura do circuito." },
    ],
    history: [
      { year: "1970", title: "Radiadores laterais", text: "O Lotus 72 leva os radiadores do bico para as laterais." },
      { year: "2014", title: "Arrefecimento híbrido", text: "Baterias e eletrônicos trazem novas exigências." },
    ],
  },
  "safety-structures": {
    title: "Estruturas de segurança",
    summary: "As estruturas de impacto, o halo e os cabos de retenção projetados em volta do piloto.",
    simple: "Ao redor do piloto, um carro de Fórmula 1 é projetado para se deformar de forma controlada num acidente — absorvendo energia para que o piloto não precise absorvê-la.",
    sections: [
      { heading: "Estruturas de impacto", body: ["As estruturas de impacto dianteira, lateral e traseira precisam absorver quantidades definidas de energia nos testes da FIA antes que o carro possa correr. Elas são projetadas para se deformar progressivamente enquanto a célula de sobrevivência permanece intacta."] },
      { heading: "Estruturas antivolta e o halo", body: ["As estruturas acima da cabeça do piloto e o halo o protegem se o carro capotar ou for atingido por destroços ou por outro carro."] },
      { heading: "Cabos de retenção das rodas", body: ["Cabos de alta resistência mantêm as rodas presas ao carro depois de falhas de suspensão, protegendo outros pilotos, fiscais e espectadores."] },
    ],
    concepts: [
      { term: "Homologação", definition: "Aprovação de uma estrutura de segurança após passar nos testes da FIA." },
      { term: "Halo", definition: "Proteção de titânio acima da cabeça do piloto, obrigatória desde 2018." },
    ],
    history: [
      { year: "1981", title: "Fibra de carbono", text: "Os monocoques de compósito transformam a segurança em acidentes." },
      { year: "1994", title: "Laterais do cockpit mais altas", text: "Parte do pacote de segurança pós-Ímola." },
      { year: "2018", title: "Halo", text: "Proteção do cockpit obrigatória." },
    ],
  },
  sporting: {
    title: "Regulamento esportivo",
    summary: "As regras que definem como o campeonato é disputado: o fim de semana, a corrida, os procedimentos e as punições.",
    simple: "Se o regulamento técnico descreve o que um carro pode ser, o esportivo descreve como equipes e pilotos podem competir com ele.",
    sections: [
      { heading: "O que ele cobre", body: ["O Regulamento Esportivo define o formato de uma competição — treinos, classificação, sprint e corrida — além dos procedimentos de largada, regras do pit lane, procedimentos do Safety Car, alocação de pneus e aplicação de punições. No documento de 2026 ele forma a Seção B."] },
      { heading: "Quem escreve e quem aplica", body: ["A FIA publica o regulamento após consulta às equipes e ao detentor dos direitos comerciais da Fórmula 1, por meio da Comissão de F1; as mudanças são aprovadas pelo Conselho Mundial de Automobilismo da FIA. Em cada evento, os comissários julgam os incidentes e aplicam punições, e o diretor de prova conduz a corrida."] },
    ],
    concepts: [
      { term: "Parque fechado", definition: "Condição em que as equipes não podem fazer mudanças significativas no carro, da classificação até a corrida." },
      { term: "Comissários", definition: "Os oficiais que investigam incidentes e decidem as punições." },
      { term: "Superlicença", definition: "A licença que o piloto precisa ter para disputar a Fórmula 1." },
    ],
    history: [
      { year: "1950", title: "Um campeonato de pilotos", text: "Pontos para os cinco primeiros, mais a volta mais rápida." },
      { year: "1958", title: "Título de construtores", text: "Criado um campeonato para os fabricantes." },
      { year: "2010", title: "25 pontos pela vitória", text: "Chega a escala de pontos moderna." },
      { year: "2021", title: "Sprints", text: "Uma corrida mais curta é introduzida em etapas selecionadas." },
    ],
  },
  technical: {
    title: "Regulamento técnico",
    summary: "O livro de regras que define o que um carro de Fórmula 1 pode ser — dimensões, materiais, unidades de potência e estruturas de segurança.",
    simple: "Cada equipe projeta o próprio carro, mas ele precisa caber dentro de uma “caixa” de regras. As melhores equipes encontram mais desempenho dentro dessa caixa.",
    sections: [
      { heading: "Um envelope de projeto", body: ["O Regulamento Técnico especifica dimensões, peso mínimo, as formas que as superfícies aerodinâmicas podem ter, a arquitetura da unidade de potência, os materiais permitidos e as estruturas e testes de segurança obrigatórios. Em 2026 ele forma a Seção C."] },
      { heading: "Interpretação e inovação", body: ["Boa parte da história da Fórmula 1 é a história de engenheiros encontrando brechas no texto das regras: o carro-ventilador, o difusor duplo e muitos outros. A FIA pode esclarecer ou fechar brechas, às vezes imediatamente e às vezes para a temporada seguinte."] },
    ],
    concepts: [
      { term: "Volumes de legalidade", definition: "Volumes definidos dentro dos quais a carroceria pode existir." },
      { term: "Peso mínimo", definition: "A menor massa permitida do carro com o piloto — usa-se lastro para atingi-la." },
      { term: "Homologação", definition: "Aprovação do projeto de um componente, muitas vezes congelando-o por um período." },
    ],
    history: [
      { year: "1983", title: "Fundo plano", text: "Saias de efeito solo proibidas; fundo plano obrigatório." },
      { year: "1994", title: "Auxílios proibidos", text: "Suspensão ativa e controle de tração vetados." },
      { year: "2014", title: "Unidades de potência", text: "Chegam os V6 turbo-híbridos." },
      { year: "2026", title: "Novo regulamento", text: "Aerodinâmica ativa e novas unidades de potência." },
    ],
  },
  financial: {
    title: "Regulamento financeiro",
    summary: "O teto de gastos: quanto uma equipe pode gastar em desempenho — e o que acontece se gastar mais.",
    simple: "Desde 2021, cada equipe tem um limite de quanto pode gastar por ano para deixar o carro mais rápido. Ela informa seus gastos à FIA, que os confere.",
    sections: [
      { heading: "O que o teto cobre", body: ["O Regulamento Financeiro define os custos que contam para o teto e os que ficam de fora, como a remuneração dos pilotos. As equipes entregam relatórios anuais revisados pela Administração do Teto de Gastos da FIA."] },
      { heading: "Infrações e sanções", body: ["O regulamento diferencia infrações de procedimento de estouros de diferentes tamanhos e define as sanções possíveis, de multas a punições esportivas."] },
      { heading: "Fabricantes de unidades de potência", body: ["A partir de 2026, um conjunto separado de Regulamentos Financeiros se aplica aos fabricantes de unidades de potência."] },
    ],
    concepts: [
      { term: "Teto de gastos", definition: "O gasto relevante máximo permitido num período de apuração." },
      { term: "Exclusões", definition: "Custos que não contam para o teto." },
    ],
    history: [
      { year: "2021", title: "Criação do teto de gastos", text: "O Regulamento Financeiro entra em vigor." },
      { year: "2026", title: "Regulamento financeiro das UPs", text: "O teto passa a valer também para os fabricantes de unidades de potência." },
    ],
  },
  safety: {
    title: "Segurança",
    summary: "Dos fardos de palha ao halo: como a Fórmula 1 ficou muito mais segura.",
    simple: "Correr a mais de 300 km/h nunca será isento de risco, mas carros, circuitos e atendimento médico tornaram as lesões graves muito mais raras do que nas primeiras décadas.",
    sections: [
      { heading: "As primeiras décadas", body: ["Nos anos 1950 e 1960 os circuitos tinham árvores, muros e espectadores perto da pista, e muitos pilotos morreram. A campanha de Jackie Stewart a partir de 1966 trouxe barreiras, áreas de escape, melhores serviços médicos e capacetes fechados."] },
      { heading: "Depois de Ímola", body: ["As mortes de Roland Ratzenberger e Ayrton Senna em 1994 levaram a uma abordagem sistemática e baseada em pesquisa: laterais do cockpit mais altas, testes de impacto cada vez mais exigentes, cabos de retenção das rodas, limite de velocidade nos boxes e o HANS, dispositivo de apoio de cabeça e pescoço."] },
      { heading: "O halo e além", body: ["O halo tornou-se obrigatório em 2018. Ele é apontado como decisivo para proteger pilotos em vários acidentes graves, incluindo o de Romain Grosjean no Bahrein, em 2020."] },
    ],
    concepts: [
      { term: "Célula de sobrevivência", definition: "O monocoque em torno do piloto, projetado para não se deformar num impacto." },
      { term: "HANS", definition: "Dispositivo de apoio de cabeça e pescoço, que segura a cabeça em impactos frontais." },
      { term: "Halo", definition: "Proteção do cockpit acima da cabeça do piloto." },
    ],
    history: [
      { year: "1978", title: "Delegado médico", text: "O professor Sid Watkins começa seu trabalho no esporte." },
      { year: "1994", title: "Ímola", text: "Um marco na pesquisa de segurança." },
      { year: "2015", title: "Safety Car Virtual", text: "Criado após o acidente de Bianchi." },
      { year: "2018", title: "O halo", text: "Proteção do cockpit obrigatória." },
    ],
  },
  history: {
    title: "Como os regulamentos mudaram",
    summary: "Setenta e seis anos de mudanças nas regras — motores, aerodinâmica, segurança e formato esportivo.",
    simple: "As regras são reescritas a cada poucos anos para controlar a velocidade, aumentar a segurança, reduzir custos ou melhorar as disputas. Cada grande reformulação muda a competição.",
    sections: [
      { heading: "Regulamentos de motor", body: ["As regras de motor mudaram mais do que qualquer outra área: 1,5 litro com compressor ou 4,5 litros (1950), 2,5 litros (1954), 1,5 litro (1961), 3,0 litros (1966), era turbo (1977–1988), 3,5 litros (1989), 3,0 litros (1995), V8 (2006), turbo-híbridos (2014) e as unidades de potência de 2026."] },
      { heading: "Aerodinâmica", body: ["As asas foram restringidas em 1969, as saias de efeito solo proibidas em 1981 e o fundo plano exigido a partir de 1983. A aerodinâmica foi simplificada em 2009, os carros ficaram mais largos em 2017, o efeito solo voltou em 2022 e a aerodinâmica ativa chegou em 2026."] },
      { heading: "Formato esportivo", body: ["Sistemas de pontos, formatos de classificação, reabastecimento, regras de pneus, sprints e o teto de gastos mudaram várias vezes. Cada página de temporada do Paddock mostra o sistema de pontos usado naquele ano."] },
    ],
    concepts: [
      { term: "Ciclo de regulamento", definition: "O período em que as principais regras técnicas ficam estáveis." },
      { term: "Reformulação", definition: "Uma grande reescrita das regras que muda os carros substancialmente." },
    ],
    history: [
      { year: "1950", title: "Primeiro campeonato", text: "Motores de 1,5 litro com compressor ou 4,5 litros." },
      { year: "1966", title: "Regulamento de 3 litros", text: "O retorno da potência." },
      { year: "1989", title: "Turbos proibidos", text: "Motores aspirados de 3,5 litros." },
      { year: "2014", title: "Turbo-híbridos", text: "Unidades de potência V6 de 1,6 litro." },
      { year: "2026", title: "Novo regulamento", text: "Aerodinâmica ativa e novas unidades de potência." },
    ],
  },
};
