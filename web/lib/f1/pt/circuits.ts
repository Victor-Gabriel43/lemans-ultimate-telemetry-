import type { Milestone } from "../types";

type CircuitText = { summary: string; history: string[]; characteristics: string[]; events: Milestone[]; evolution: string[] };

/** Portuguese (Brazil) editorial text for circuits. Keys are F1DB circuit ids. */
export const CIRCUITS_PT: Record<string, CircuitText> = {
  silverstone: {
    summary: "Um antigo aeródromo militar e palco da primeira corrida da história do Mundial.",
    history: [
      "Silverstone foi construído sobre uma base de bombardeiros da Real Força Aérea. Em 13 de maio de 1950 recebeu o GP da Grã-Bretanha, primeira etapa do novo Campeonato Mundial.",
      "O GP da Grã-Bretanha alternou com Aintree e Brands Hatch por alguns anos, mas Silverstone é sua sede fixa desde 1987. Muitas equipes ficam a poucos minutos do circuito.",
    ],
    characteristics: ["Curvas muito rápidas e fluidas", "Exige muito dos pneus em longas mudanças de direção rápidas", "Clima exposto e muitas vezes instável"],
    events: [
      { year: "1950", title: "A primeira corrida do Mundial", text: "Vencida por Giuseppe Farina, da Alfa Romeo." },
      { year: "1951", title: "Primeira vitória da Ferrari", text: "José Froilán González dá à Ferrari sua primeira vitória no campeonato." },
      { year: "1979", title: "Primeira vitória da Williams", text: "Clay Regazzoni vence pela equipe de Frank Williams." },
    ],
    evolution: ["O traçado original, nas estradas de contorno do aeródromo, era rápido e simples. Chicanes e curvas redesenhadas vieram entre os anos 1970 e 1990, e uma grande reforma em 2010–2011 acrescentou o setor “Arena” e levou os boxes para o novo prédio “Wing”."],
  },
  monaco: {
    summary: "As ruas estreitas de Monte Carlo: a corrida mais lenta, mais glamourosa e menos tolerante do ano.",
    history: [
      "O GP de Mônaco foi disputado pela primeira vez em 1929. Fez parte da primeira temporada do Mundial, em 1950, e está no calendário quase todos os anos desde 1955.",
      "Ultrapassar é extremamente difícil, o que torna a classificação mais decisiva aqui do que em qualquer outro lugar. Uma vitória em Mônaco está entre as mais cobiçadas do automobilismo.",
    ],
    characteristics: ["Barreiras próximas, sem margem de erro", "A menor velocidade média da temporada", "A posição de largada é crucial"],
    events: [
      { year: "1955", title: "No porto", text: "A Lancia de Alberto Ascari cai no porto; ele sobrevive." },
      { year: "1984", title: "Senna na chuva", text: "O jovem Ayrton Senna escala o pelotão com uma Toleman antes de a corrida ser interrompida." },
    ],
    evolution: ["O traçado foi ajustado muitas vezes — ao redor da piscina, na beira do porto e na saída do túnel —, mas seu caráter essencial, passando pela Praça do Cassino e pelo grampo, não mudou."],
  },
  monza: {
    summary: "O Templo da Velocidade — o circuito mais rápido da Fórmula 1 e lar espiritual dos tifosi da Ferrari.",
    history: [
      "Construído em 1922 no parque da vila real de Monza, recebeu o GP da Itália em todas as temporadas do Mundial, exceto em 1980, quando a corrida foi para Ímola.",
      "O antigo oval inclinado, usado em alguns anos até 1961, ainda existe no parque.",
    ],
    characteristics: ["Retas longas, acertos de pouca pressão aerodinâmica", "Frenagens fortes para as chicanes", "Disputas no vácuo"],
    events: [
      { year: "1961", title: "Von Trips", text: "Wolfgang von Trips e espectadores morrem; Phil Hill garante o título." },
      { year: "1970", title: "Rindt", text: "Jochen Rindt morre no treino; torna-se campeão póstumo." },
      { year: "2008", title: "Vettel", text: "Sebastian Vettel vence na chuva pela Toro Rosso." },
    ],
    evolution: ["Chicanes foram acrescentadas nos anos 1970 para reduzir a velocidade; o caráter de retas longas permanece."],
  },
  "spa-francorchamps": {
    summary: "O favorito dos pilotos, pela floresta das Ardenas, com a Eau Rouge e a Raidillon como assinatura.",
    history: [
      "O Spa original era uma pista de estrada muito rápida, com cerca de 14 quilômetros. Foi considerado perigoso demais depois de 1970, e o GP da Bélgica passou a outros circuitos até a volta de um Spa encurtado e modernizado, em 1983.",
    ],
    characteristics: ["Volta longa com grandes desníveis", "Clima notoriamente variável ao longo da volta", "Compressão de pé no fundo na Raidillon"],
    events: [
      { year: "1966", title: "O acidente de Stewart", text: "O acidente de Jackie Stewart dá início à sua campanha por segurança." },
      { year: "1991", title: "Estreia de Schumacher", text: "Michael Schumacher estreia pela Jordan." },
      { year: "2000", title: "A ultrapassagem", text: "Häkkinen ultrapassa Schumacher enquanto colocam uma volta em Ricardo Zonta." },
    ],
    evolution: ["O circuito moderno, usado desde 1983, mantém o trecho original da Eau Rouge e parte da antiga pista de estrada."],
  },
  nurburgring: {
    summary: "O Nordschleife — o “Inferno Verde” — foi o teste supremo dos anos 1950 aos 1970.",
    history: [
      "O Nordschleife, um traçado sinuoso de mais de 20 quilômetros pelas colinas do Eifel, recebeu o GP da Alemanha em boa parte das três primeiras décadas do Mundial.",
      "Depois do acidente de Niki Lauda em 1976, deixou de ser usado pela Fórmula 1. Um novo circuito de Grand Prix, mais curto, foi construído ao lado em 1984.",
    ],
    characteristics: ["Nordschleife: mais de 150 curvas, cristas cegas e saltos", "Circuito GP moderno: técnico, de traçado convencional"],
    events: [
      { year: "1957", title: "A obra-prima de Fangio", text: "Fangio se recupera de um pit stop lento para vencer e garantir o quinto título." },
      { year: "1976", title: "Lauda", text: "Niki Lauda sofre queimaduras graves; a F1 deixa o Nordschleife." },
    ],
    evolution: ["O Nordschleife segue em uso para outras corridas e para o público; o moderno GP-Strecke recebeu a F1 de 1984 até os anos 2010 e em 2020."],
  },
  imola: {
    summary: "Um circuito à moda antiga, em sentido anti-horário, para sempre ligado ao fim de semana de 1994.",
    history: [
      "Ímola recebeu o GP da Itália de 1980 e depois o GP de San Marino de 1981 a 2006. Voltou nos anos 2020 como GP da Emília-Romanha.",
      "Em 1994, Roland Ratzenberger e Ayrton Senna morreram aqui em dias consecutivos, o que levou a mudanças profundas na segurança da Fórmula 1.",
    ],
    characteristics: ["Traçado estreito, fluido e tradicional", "Chicanes que exigem zebras", "Poucas ultrapassagens"],
    events: [{ year: "1994", title: "Um fim de semana negro", text: "Ratzenberger e Senna morrem." }],
    evolution: ["A Tamburello e a Villeneuve, antes curvas de pé no fundo, foram transformadas em chicanes depois de 1994."],
  },
  zandvoort: {
    summary: "Um circuito litorâneo entre as dunas, revivido com curvas de grande inclinação.",
    history: [
      "Zandvoort recebeu regularmente o GP da Holanda dos anos 1950 até 1985. Foi onde o Cosworth DFV venceu na estreia, em 1967.",
      "A corrida voltou em 2021, num traçado modernizado com as últimas curvas inclinadas, impulsionada pela popularidade de Max Verstappen.",
    ],
    characteristics: ["Estreito e ondulado", "Curvas inclinadas", "Areia soprada para a pista"],
    events: [
      { year: "1967", title: "A estreia do DFV", text: "Jim Clark vence com o Lotus 49." },
      { year: "2021", title: "A volta", text: "A Fórmula 1 volta depois de 36 anos." },
    ],
    evolution: ["A inclinação da Hugenholtzbocht e da Arie Luyendykbocht foi acrescentada para o retorno de 2021."],
  },
  spielberg: {
    summary: "Uma volta curta e íngreme nas montanhas da Estíria, com longa história no mesmo local.",
    history: [
      "O rápido Österreichring foi inaugurado neste local em 1969 e recebeu o GP da Áustria a partir de 1970. Um traçado encurtado, o A1-Ring, veio nos anos 1990, e o modernizado Red Bull Ring voltou ao calendário em 2014.",
    ],
    characteristics: ["Volta curta, com poucas curvas", "Subidas íngremes e frenagens fortes", "Diferenças mínimas na classificação"],
    events: [{ year: "2020", title: "Abertura da temporada", text: "Recebe duas corridas para abrir a temporada adiada pela pandemia." }],
    evolution: ["O rápido Österreichring original foi encurtado para o traçado do A1-Ring, usado até hoje."],
  },
  hungaroring: {
    summary: "O primeiro Grande Prêmio atrás da Cortina de Ferro, num traçado sinuoso e empoeirado.",
    history: ["O GP da Hungria de 1986 foi a primeira corrida do Mundial de Fórmula 1 disputada no Bloco do Leste."],
    characteristics: ["Sinuoso e travado — “Mônaco sem os muros”", "Alta pressão aerodinâmica", "Calor e ultrapassagens difíceis"],
    events: [
      { year: "1986", title: "Atrás da Cortina de Ferro", text: "Nelson Piquet passa Ayrton Senna por fora para vencer a primeira corrida." },
      { year: "2024", title: "Piastri", text: "Oscar Piastri vence seu primeiro Grande Prêmio." },
    ],
    evolution: ["Pequenas mudanças ao longo dos anos; o caráter é praticamente o mesmo."],
  },
  catalunya: {
    summary: "A pista de testes tradicional do esporte — as equipes conhecem cada metro dela.",
    history: [
      "Inaugurado em 1991, o circuito de Barcelona recebeu o GP da Espanha por mais de três décadas e foi o local mais comum de testes de pré-temporada, o que o tornou referência de desempenho dos carros.",
    ],
    characteristics: ["Todos os tipos de curva", "Exigente com os pneus", "Referência aerodinâmica"],
    events: [{ year: "2016", title: "Verstappen", text: "Max Verstappen vence na estreia pela Red Bull, aos 18 anos." }],
    evolution: ["A chicane final, criada em 2007, foi removida em 2023, restaurando as rápidas curvas finais originais."],
  },
  interlagos: {
    summary: "Uma arena em sentido anti-horário que recebeu algumas das decisões de título mais dramáticas.",
    history: [
      "Interlagos recebeu o primeiro GP do Brasil válido pelo campeonato em 1973. Depois de anos em Jacarepaguá, no Rio, a corrida voltou a uma Interlagos encurtada em 1990.",
    ],
    characteristics: ["Sentido anti-horário", "Anfiteatro natural, com muitas ondulações", "Clima imprevisível"],
    events: [
      { year: "1991", title: "A vitória de Senna em casa", text: "Senna vence em casa apesar de problemas no câmbio." },
      { year: "2008", title: "Título na última curva", text: "Lewis Hamilton conquista o título na última volta." },
    ],
    evolution: ["O longo traçado original foi reduzido a cerca da metade em 1990."],
  },
  montreal: {
    summary: "Um circuito semipermanente numa ilha do rio São Lourenço, batizado em homenagem a Gilles Villeneuve.",
    history: [
      "Construído no local da Expo 67, o circuito recebeu seu primeiro Grande Prêmio em 1978 — vencido por Gilles Villeneuve. Foi rebatizado em sua homenagem após sua morte, em 1982.",
    ],
    characteristics: ["Para-e-acelera: retas longas e chicanes fechadas", "Muito exigente com os freios", "Muros próximos da pista"],
    events: [{ year: "1978", title: "Vitória em casa", text: "Gilles Villeneuve vence a primeira corrida aqui." }],
    evolution: ["O muro externo da chicane final ficou famoso como o “Muro dos Campeões”."],
  },
  "mexico-city": {
    summary: "Grande altitude, ar rarefeito e um trecho de estádio lotado de torcedores.",
    history: [
      "Batizado em homenagem aos irmãos pilotos Ricardo e Pedro Rodríguez, recebeu o GP do México nos anos 1960, de novo de 1986 a 1992 e novamente desde 2015.",
    ],
    characteristics: ["Altitude muito elevada: o ar rarefeito reduz a pressão aerodinâmica e o arrefecimento", "Reta principal longa", "Trecho dentro do estádio"],
    events: [{ year: "1965", title: "Primeira vitória da Honda", text: "Richie Ginther vence pela Honda." }],
    evolution: ["A temida curva inclinada Peraltada foi contornada por dentro de um estádio de beisebol em 2015."],
  },
  austin: {
    summary: "Um circuito moderno inspirado em curvas clássicas de todo o mundo.",
    history: [
      "O primeiro circuito construído especificamente para a Fórmula 1 nos Estados Unidos foi inaugurado em 2012 e deu ao GP dos EUA uma sede estável, depois de anos mudando de local.",
    ],
    characteristics: ["Subida íngreme até a curva 1", "Esses de alta velocidade que lembram Silverstone", "Piso ondulado"],
    events: [{ year: "2012", title: "Primeira corrida", text: "Lewis Hamilton vence a corrida inaugural." }],
    evolution: ["Praticamente inalterado; recapeamentos para corrigir as ondulações."],
  },
  "las-vegas": {
    summary: "Uma corrida noturna pela Strip de Las Vegas, promovida pela própria Fórmula 1.",
    history: [
      "A Fórmula 1 correu num estacionamento de Las Vegas em 1981 e 1982. O moderno GP de Las Vegas, promovido pelos donos da Fórmula 1, começou em 2023 num circuito de rua que passa pelos famosos cassinos da cidade.",
    ],
    characteristics: ["Retas muito longas", "Temperaturas noturnas baixas dificultam o aquecimento dos pneus", "Pouca pressão aerodinâmica"],
    events: [{ year: "2023", title: "De volta a Vegas", text: "A primeira corrida na Strip." }],
    evolution: ["Circuito novo."],
  },
  miami: {
    summary: "Um circuito temporário em volta do Hard Rock Stadium.",
    history: ["Criado para 2022 ao redor de um complexo de estádio da NFL, fez parte da rápida expansão da Fórmula 1 nos Estados Unidos."],
    characteristics: ["Retas longas", "Trecho lento de chicane", "Calor e umidade"],
    events: [{ year: "2024", title: "Primeira vitória de Norris", text: "Lando Norris vence pela primeira vez." }],
    evolution: ["Circuito novo."],
  },
  suzuka: {
    summary: "O único circuito em forma de oito do calendário e um verdadeiro teste para os pilotos.",
    history: [
      "Construído pela Honda como pista de testes, Suzuka recebe o GP do Japão desde 1987 (exceto em 2007–2008, em Fuji). Muitos campeonatos foram decididos aqui.",
    ],
    characteristics: ["Traçado em oito com cruzamento por ponte", "Primeiro setor rápido e fluido", "Brita e grama punitivas"],
    events: [
      { year: "1989", title: "Prost e Senna", text: "Os companheiros batem na chicane; Prost é campeão." },
      { year: "1990", title: "Curva 1", text: "Eles batem de novo, na primeira curva; Senna é campeão." },
      { year: "2014", title: "Bianchi", text: "O acidente de Jules Bianchi leva à criação do Safety Car Virtual." },
    ],
    evolution: ["Pequenas revisões; os “S” e a 130R continuam sendo sua assinatura."],
  },
  "marina-bay": {
    summary: "A primeira corrida noturna da Fórmula 1, sob holofotes e umidade tropical.",
    history: ["Singapura recebeu a primeira corrida noturna da história da Fórmula 1 em 2008."],
    characteristics: ["A corrida fisicamente mais dura: calor, umidade, muitas curvas", "Ruas onduladas", "Safety Cars são comuns"],
    events: [
      { year: "2008", title: "Primeira corrida noturna", text: "Um novo tipo de Grande Prêmio." },
      { year: "2023", title: "Sainz", text: "A única corrida de 2023 não vencida pela Red Bull." },
    ],
    evolution: ["O traçado foi simplificado em 2023 após obras na área sob a antiga arquibancada."],
  },
  shanghai: {
    summary: "Um grande circuito moderno cujo traçado, diz-se, segue o ideograma chinês “shang”.",
    history: ["O GP da China foi disputado pela primeira vez em 2004. Depois de uma pausa nos anos da pandemia, voltou em 2024."],
    characteristics: ["Reta oposta muito longa", "Primeira curva longa, que vai se fechando", "Exigência no pneu dianteiro esquerdo"],
    events: [{ year: "2004", title: "Primeira corrida", text: "Rubens Barrichello vence pela Ferrari." }],
    evolution: ["Inalterado desde a inauguração."],
  },
  bahrain: {
    summary: "O primeiro Grande Prêmio do Oriente Médio, no deserto de Sakhir.",
    history: ["O Bahrein recebeu a primeira corrida de Fórmula 1 do Oriente Médio em 2004 e muitas vezes abriu a temporada."],
    characteristics: ["Frenagens fortes, desgaste dos pneus traseiros", "Corrida noturna desde 2014", "Areia trazida pelo vento"],
    events: [{ year: "2020", title: "Grosjean", text: "Romain Grosjean escapa de um acidente com fogo; o halo é apontado como responsável por salvar sua vida." }],
    evolution: ["Um traçado alternativo “externo” foi usado no GP de Sakhir de 2020."],
  },
  jeddah: {
    summary: "Um dos circuitos de rua mais rápidos já construídos, à beira do Mar Vermelho.",
    history: ["Jidá entrou no calendário em 2021."],
    characteristics: ["Velocidade média altíssima para um circuito de rua", "Curvas cegas entre muros", "Corrida noturna"],
    events: [{ year: "2021", title: "Estreia", text: "Uma primeira corrida dramática na disputa pelo título." }],
    evolution: ["A visibilidade e algumas curvas foram modificadas após as primeiras corridas, por segurança."],
  },
  baku: {
    summary: "Muralhas medievais e um dos mais longos trechos de pé no fundo da Fórmula 1.",
    history: ["Baku recebeu a Fórmula 1 pela primeira vez como GP da Europa em 2016, e como GP do Azerbaijão a partir de 2017."],
    characteristics: ["Trecho de aceleração total muito longo até a linha de chegada", "Trecho extremamente estreito na cidade velha", "Corridas caóticas e imprevisíveis"],
    events: [{ year: "2016", title: "Estreia", text: "Primeira corrida, como GP da Europa." }],
    evolution: ["Circuito novo."],
  },
  lusail: {
    summary: "Um circuito rápido e fluido, construído para o motociclismo.",
    history: ["Lusail recebeu seu primeiro Grande Prêmio em 2021 e tornou-se etapa regular a partir de 2023."],
    characteristics: ["Muitas curvas de média e alta velocidade", "Fisicamente exigente", "Corrida noturna"],
    events: [{ year: "2021", title: "Estreia", text: "Primeiro GP do Catar." }],
    evolution: ["Limites de pista e zebras foram revistos após as primeiras edições."],
  },
  "yas-marina": {
    summary: "Uma corrida ao entardecer e o tradicional encerramento da temporada.",
    history: ["Inaugurado em 2009, Yas Marina costuma receber a última etapa, incluindo várias decisões de título."],
    characteristics: ["Corrida do dia para a noite", "Retas longas e último setor travado", "Saída dos boxes por baixo da pista"],
    events: [{ year: "2021", title: "Decisão na última volta", text: "Max Verstappen conquista o título na última volta." }],
    evolution: ["O traçado foi revisto em 2021 para melhorar as disputas."],
  },
  melbourne: {
    summary: "Ruas de um parque em volta de um lago, e muitas vezes a abertura da temporada.",
    history: ["O GP da Austrália mudou de Adelaide para Melbourne em 1996 e muitas vezes abriu a temporada."],
    characteristics: ["Ruas rápidas e fluidas dentro do parque", "Asfalto com pouca aderência no início do fim de semana", "Público perto da ação"],
    events: [{ year: "2009", title: "A estreia da Brawn", text: "A Brawn GP termina em primeiro e segundo na estreia." }],
    evolution: ["Revisado em 2022 para eliminar a antiga chicane e alargar curvas."],
  },
};
