import type { Bi } from "./tech-types";

/**
 * The races that defined each decade — told as what happened and why it
 * mattered. Every race exists in the F1DB results (year + race slug), and the
 * finishing positions mentioned in the texts were checked against them.
 */
export type KeyRace = { year: number; slug: string; title: Bi; text: Bi };

export const KEY_RACES: Record<string, KeyRace[]> = {
  "1950s": [
    {
      year: 1950,
      slug: "great-britain",
      title: { pt: "A primeira corrida do Mundial", en: "The first World Championship race" },
      text: {
        pt: "Em 13 de maio de 1950, num antigo aeródromo militar em Silverstone, com o rei George VI na plateia, começou o Campeonato Mundial. Os Alfa Romeo 158 ocuparam os três primeiros lugares, e Giuseppe Farina venceu a corrida que abriria o caminho para o primeiro título da história.",
        en: "On 13 May 1950, on a former military airfield at Silverstone, with King George VI watching, the World Championship began. The Alfa Romeo 158s took the top three places, and Giuseppe Farina won the race that set him on the way to the first title in history.",
      },
    },
    {
      year: 1957,
      slug: "germany",
      title: { pt: "A maior corrida de Fangio", en: "Fangio's greatest drive" },
      text: {
        pt: "Fangio largou com pouco combustível para fazer uma parada, mas o pit stop foi lento e ele voltou quase um minuto atrás das Ferrari de Hawthorn e Collins. Nos 22 quilômetros do Nordschleife, quebrou o recorde da pista volta após volta, passou os dois nas voltas finais e venceu. Foi sua última vitória — e garantiu o quinto título.",
        en: "Fangio started light on fuel to make a stop, but the pit stop was slow and he rejoined almost a minute behind the Ferraris of Hawthorn and Collins. Around the 22 kilometres of the Nordschleife he broke the lap record lap after lap, passed both in the closing laps and won. It was his last victory — and it sealed his fifth title.",
      },
    },
    {
      year: 1958,
      slug: "morocco",
      title: { pt: "Decidido por um ponto", en: "Decided by one point" },
      text: {
        pt: "Stirling Moss venceu em Casablanca, mas Mike Hawthorn terminou em segundo e ficou com o título por um ponto — o primeiro campeão britânico. A Vanwall levou o primeiro campeonato de construtores. A festa acabou ofuscada: Stuart Lewis-Evans, companheiro de Moss, sofreu queimaduras graves na corrida e morreu dias depois.",
        en: "Stirling Moss won in Casablanca, but Mike Hawthorn finished second and took the title by a single point — Britain's first champion. Vanwall won the first constructors' championship. The celebration was overshadowed: Stuart Lewis-Evans, Moss's team-mate, suffered severe burns in the race and died days later.",
      },
    },
    {
      year: 1959,
      slug: "united-states",
      title: { pt: "Empurrando o carro até o título", en: "Pushing the car to the title" },
      text: {
        pt: "Em Sebring, Jack Brabham ficou sem combustível na última volta, desceu do carro e o empurrou até a linha de chegada, terminando em quarto — o suficiente para ser campeão. Seu companheiro Bruce McLaren, de 22 anos, venceu. Era a confirmação de que o motor traseiro da Cooper tinha mudado a Fórmula 1.",
        en: "At Sebring, Jack Brabham ran out of fuel on the last lap, climbed out and pushed his car to the finish line for fourth — enough to be champion. His team-mate Bruce McLaren, aged 22, won. It confirmed that Cooper's rear engine had changed Formula One.",
      },
    },
  ],
  "1960s": [
    {
      year: 1961,
      slug: "italy",
      title: { pt: "Título e tragédia em Monza", en: "Title and tragedy at Monza" },
      text: {
        pt: "Wolfgang von Trips chegou a Monza liderando o campeonato. Na segunda volta, tocou no carro de Jim Clark e sua Ferrari voou para a área do público, matando o piloto e 15 espectadores. Phil Hill venceu a corrida e se tornou o primeiro campeão americano, num dia que ninguém comemorou.",
        en: "Wolfgang von Trips arrived at Monza leading the championship. On the second lap he touched Jim Clark's car and his Ferrari flew into the crowd, killing him and 15 spectators. Phil Hill won the race and became America's first champion, on a day nobody celebrated.",
      },
    },
    {
      year: 1962,
      slug: "south-africa",
      title: { pt: "O título que vazou", en: "The title that leaked away" },
      text: {
        pt: "Jim Clark liderava com folga em East London e seria campeão, até que um vazamento de óleo tirou sua Lotus da corrida. Graham Hill herdou a vitória e o título — o único da BRM. Clark se vingaria nos anos seguintes.",
        en: "Jim Clark was leading comfortably at East London and would have been champion, until an oil leak put his Lotus out. Graham Hill inherited the win and the title — BRM's only one. Clark would have his revenge in the years that followed.",
      },
    },
    {
      year: 1967,
      slug: "netherlands",
      title: { pt: "O motor que vence na estreia", en: "The engine that won on debut" },
      text: {
        pt: "Em Zandvoort estrearam juntos o Lotus 49 e o motor Cosworth DFV, e Jim Clark venceu logo na primeira corrida. O DFV seria vendido a qualquer equipe e acabaria vencendo 155 Grandes Prêmios — o motor que democratizou a Fórmula 1.",
        en: "At Zandvoort the Lotus 49 and the Cosworth DFV engine made their debut together, and Jim Clark won first time out. The DFV would be sold to any team and went on to win 155 Grands Prix — the engine that democratised Formula One.",
      },
    },
    {
      year: 1969,
      slug: "italy",
      title: { pt: "Quatro carros em dois décimos", en: "Four cars in two tenths" },
      text: {
        pt: "No vácuo das longas retas de Monza, quatro carros cruzaram a linha praticamente juntos. Jackie Stewart venceu por oito centésimos sobre Jochen Rindt e garantiu seu primeiro título, com a Matra da equipe de Ken Tyrrell.",
        en: "In the slipstream of Monza's long straights, four cars crossed the line almost together. Jackie Stewart won by eight hundredths from Jochen Rindt and sealed his first title, in Ken Tyrrell's Matra.",
      },
    },
  ],
  "1970s": [
    {
      year: 1970,
      slug: "italy",
      title: { pt: "O campeão que não viu o título", en: "The champion who never saw his title" },
      text: {
        pt: "Jochen Rindt morreu num acidente no treino de Monza, liderando o campeonato com folga. Ninguém o alcançou nas corridas restantes, e ele se tornou o único campeão póstumo da Fórmula 1. Clay Regazzoni venceu a corrida para a Ferrari.",
        en: "Jochen Rindt was killed in a practice crash at Monza while leading the championship comfortably. Nobody caught him in the remaining races, and he became Formula One's only posthumous champion. Clay Regazzoni won the race for Ferrari.",
      },
    },
    {
      year: 1971,
      slug: "italy",
      title: { pt: "A chegada mais apertada da história", en: "The closest finish in history" },
      text: {
        pt: "Sem chicanes, Monza era uma corrida de vácuo. Peter Gethin venceu por um centésimo de segundo sobre Ronnie Peterson, com os cinco primeiros separados por seis décimos. No ano seguinte, as chicanes acabaram com esse tipo de corrida.",
        en: "Without chicanes, Monza was a slipstreaming race. Peter Gethin won by one hundredth of a second from Ronnie Peterson, with the first five covered by six tenths. The next year, chicanes ended that kind of race.",
      },
    },
    {
      year: 1976,
      slug: "germany",
      title: { pt: "O fogo no Nürburgring", en: "Fire at the Nürburgring" },
      text: {
        pt: "Niki Lauda bateu na segunda volta e sua Ferrari pegou fogo; outros pilotos pararam e o tiraram das chamas. Ele chegou a receber a extrema-unção e voltou a correr seis semanas depois, em Monza. James Hunt venceu a corrida, e a F1 nunca mais correu no Nordschleife.",
        en: "Niki Lauda crashed on the second lap and his Ferrari caught fire; other drivers stopped and pulled him from the flames. He was given the last rites and was racing again six weeks later, at Monza. James Hunt won the race, and F1 never raced on the Nordschleife again.",
      },
    },
    {
      year: 1976,
      slug: "japan",
      title: { pt: "Um ponto na chuva de Fuji", en: "One point in the rain at Fuji" },
      text: {
        pt: "Sob chuva forte, Lauda desistiu depois de duas voltas, dizendo que as condições eram perigosas demais. Hunt precisava terminar em terceiro: conseguiu, apesar de um pneu furado, e foi campeão por um ponto. Mario Andretti venceu a corrida.",
        en: "In heavy rain, Lauda withdrew after two laps, saying the conditions were too dangerous. Hunt needed third place: he got it despite a puncture and was champion by one point. Mario Andretti won the race.",
      },
    },
    {
      year: 1979,
      slug: "france",
      title: { pt: "A primeira vitória turbo — e a briga pelo segundo lugar", en: "The first turbo win — and the fight for second" },
      text: {
        pt: "Em Dijon, Jean-Pierre Jabouille deu à Renault a primeira vitória de um motor turbo, abrindo uma nova era. Mas quem viu a corrida lembra das voltas finais: Gilles Villeneuve e René Arnoux disputaram o segundo lugar roda a roda, trocando toques e posições até a bandeirada.",
        en: "At Dijon, Jean-Pierre Jabouille gave Renault the first win for a turbo engine, opening a new era. But those who watched remember the final laps: Gilles Villeneuve and René Arnoux fought for second wheel to wheel, touching and swapping places until the flag.",
      },
    },
  ],
  "1980s": [
    {
      year: 1982,
      slug: "san-marino",
      title: { pt: "A traição de Ímola", en: "The betrayal at Imola" },
      text: {
        pt: "Com várias equipes boicotando a corrida, as duas Ferrari lideravam com folga. Gilles Villeneuve entendeu que as posições deveriam ser mantidas, mas Didier Pironi o ultrapassou na última volta. Villeneuve nunca mais falou com ele — e morreu treze dias depois, no treino de Zolder.",
        en: "With several teams boycotting the race, the two Ferraris were well clear. Gilles Villeneuve understood that positions were to be held, but Didier Pironi passed him on the last lap. Villeneuve never spoke to him again — and was killed thirteen days later in practice at Zolder.",
      },
    },
    {
      year: 1984,
      slug: "monaco",
      title: { pt: "Senna na chuva", en: "Senna in the rain" },
      text: {
        pt: "Na chuva de Mônaco, um estreante com uma Toleman subia posições e se aproximava do líder Alain Prost quando a corrida foi interrompida. Ayrton Senna terminou em segundo. Como a prova não completou a distância, valeram meio ponto — e Prost perderia o título daquele ano para Lauda por meio ponto.",
        en: "In the Monaco rain, a rookie in a Toleman was climbing the order and closing on the leader, Alain Prost, when the race was stopped. Ayrton Senna finished second. Because the race was short of distance, half points were awarded — and Prost would lose that year's title to Lauda by half a point.",
      },
    },
    {
      year: 1986,
      slug: "australia",
      title: { pt: "O pneu de Mansell", en: "Mansell's tyre" },
      text: {
        pt: "Nigel Mansell só precisava de um terceiro lugar em Adelaide. Na reta mais rápida, o pneu traseiro explodiu e acabou com o seu campeonato. A Williams chamou Piquet aos boxes por precaução, e Alain Prost venceu a corrida e o título.",
        en: "Nigel Mansell needed only third place in Adelaide. On the fastest straight his rear tyre exploded and ended his championship. Williams called Piquet in as a precaution, and Alain Prost won the race and the title.",
      },
    },
    {
      year: 1988,
      slug: "japan",
      title: { pt: "O primeiro título de Senna", en: "Senna's first title" },
      text: {
        pt: "Na pole em Suzuka, Senna deixou o motor morrer na largada e caiu para o meio do pelotão. Com o carro andando de novo, fez uma recuperação lendária, passou Prost e venceu, garantindo o primeiro de seus três títulos.",
        en: "On pole at Suzuka, Senna stalled at the start and fell into the midfield. Once moving again he made a legendary recovery, passed Prost and won, securing the first of his three titles.",
      },
    },
    {
      year: 1989,
      slug: "japan",
      title: { pt: "A chicane", en: "The chicane" },
      text: {
        pt: "Senna precisava vencer. Ao tentar passar Prost na chicane, os dois se tocaram. Prost abandonou; Senna voltou pela área de escape, trocou o bico e cruzou em primeiro, mas foi desclassificado. Prost foi campeão, e a rivalidade entre os companheiros de McLaren virou guerra aberta.",
        en: "Senna had to win. Trying to pass Prost at the chicane, the two touched. Prost retired; Senna rejoined through the escape road, changed his nose and crossed the line first, but was disqualified. Prost was champion, and the rivalry between the McLaren team-mates became open war.",
      },
    },
  ],
  "1990s": [
    {
      year: 1990,
      slug: "japan",
      title: { pt: "A revanche na primeira curva", en: "Revenge at the first corner" },
      text: {
        pt: "Um ano depois, os papéis se inverteram: Prost, agora na Ferrari, precisava pontuar. Na primeira curva, Senna não aliviou e os dois saíram da pista. O título foi de Senna, que mais tarde admitiu que a batida foi intencional.",
        en: "A year later the roles were reversed: Prost, now at Ferrari, needed to score. At the first corner Senna did not back off and both went off. The title was Senna's, and he later admitted the crash was deliberate.",
      },
    },
    {
      year: 1993,
      slug: "europe",
      title: { pt: "A volta de abertura", en: "The opening lap" },
      text: {
        pt: "Em Donington, sob chuva, Senna largou em quarto e terminou a primeira volta em primeiro, passando Schumacher, Wendlinger, Damon Hill e Prost. Com uma McLaren inferior à Williams, venceu uma das corridas mais lembradas da história.",
        en: "At a wet Donington, Senna started fourth and completed the first lap in the lead, passing Schumacher, Wendlinger, Damon Hill and Prost. In a McLaren inferior to the Williams, he won one of the most celebrated races in history.",
      },
    },
    {
      year: 1994,
      slug: "san-marino",
      title: { pt: "O fim de semana mais sombrio", en: "The darkest weekend" },
      text: {
        pt: "Na sexta, Rubens Barrichello sofreu um acidente violento. No sábado, Roland Ratzenberger morreu no treino. No domingo, Ayrton Senna bateu na curva Tamburello e morreu. A Fórmula 1 mudou para sempre: o que veio depois foi a maior reforma de segurança da sua história.",
        en: "On Friday Rubens Barrichello had a violent crash. On Saturday Roland Ratzenberger was killed in qualifying. On Sunday Ayrton Senna crashed at Tamburello and died. Formula One changed forever: what followed was the biggest safety reform in its history.",
      },
    },
    {
      year: 1994,
      slug: "australia",
      title: { pt: "O toque de Adelaide", en: "The Adelaide collision" },
      text: {
        pt: "Schumacher liderava por um ponto. Depois de tocar o muro, voltou à pista e fechou Damon Hill, que tentava passar; os dois abandonaram, e Schumacher foi campeão pela primeira vez. Nigel Mansell venceu a corrida.",
        en: "Schumacher led by a point. After touching the wall he rejoined and closed the door on Damon Hill, who was trying to pass; both retired, and Schumacher was champion for the first time. Nigel Mansell won the race.",
      },
    },
    {
      year: 1997,
      slug: "europe",
      title: { pt: "Jerez", en: "Jerez" },
      text: {
        pt: "Na decisão, Jacques Villeneuve atacou por dentro e Schumacher jogou o carro sobre ele. Desta vez quem ficou fora foi Schumacher; Villeneuve terminou em terceiro e foi campeão. A FIA excluiu Schumacher da classificação final daquele campeonato. Mika Häkkinen venceu pela primeira vez.",
        en: "In the decider, Jacques Villeneuve attacked on the inside and Schumacher turned into him. This time it was Schumacher who went out; Villeneuve finished third and was champion. The FIA excluded Schumacher from that championship's final standings. Mika Häkkinen won for the first time.",
      },
    },
  ],
  "2000s": [
    {
      year: 2000,
      slug: "japan",
      title: { pt: "O fim de 21 anos de espera", en: "The end of a 21-year wait" },
      text: {
        pt: "Ao vencer em Suzuka contra Mika Häkkinen, Michael Schumacher deu à Ferrari seu primeiro título de pilotos desde Jody Scheckter, em 1979. Foi o início de cinco títulos seguidos — a fase mais dominante da história da equipe.",
        en: "By beating Mika Häkkinen at Suzuka, Michael Schumacher gave Ferrari its first drivers' title since Jody Scheckter in 1979. It began a run of five consecutive titles — the most dominant spell in the team's history.",
      },
    },
    {
      year: 2002,
      slug: "austria",
      title: { pt: "A ordem de equipe que vaiaram", en: "The team order that was booed" },
      text: {
        pt: "Rubens Barrichello dominou a corrida, mas, a metros da linha de chegada, tirou o pé por ordem da Ferrari para Schumacher vencer. O público vaiou e Schumacher empurrou o companheiro para o degrau mais alto do pódio. As ordens de equipe que interferissem no resultado foram proibidas no ano seguinte.",
        en: "Rubens Barrichello dominated the race but, metres from the line, lifted off on Ferrari's orders so Schumacher could win. The crowd booed and Schumacher pushed his team-mate onto the top step of the podium. Team orders that interfered with the result were banned the following year.",
      },
    },
    {
      year: 2005,
      slug: "united-states",
      title: { pt: "Seis carros", en: "Six cars" },
      text: {
        pt: "Depois de falhas nos pneus Michelin em Indianápolis, as sete equipes que usavam a marca recolheram seus carros após a volta de apresentação. Só os seis carros com Bridgestone correram, diante de um público furioso.",
        en: "After Michelin tyre failures at Indianapolis, the seven teams using the brand withdrew their cars after the formation lap. Only the six Bridgestone-shod cars raced, in front of a furious crowd.",
      },
    },
    {
      year: 2007,
      slug: "brazil",
      title: { pt: "Campeão por um ponto, vindo de trás", en: "Champion by a point, from behind" },
      text: {
        pt: "Kimi Räikkönen chegou a Interlagos sete pontos atrás de Lewis Hamilton e três atrás de Fernando Alonso. Venceu, Hamilton teve problemas e terminou em sétimo, e o finlandês foi campeão por um ponto sobre os dois pilotos da McLaren.",
        en: "Kimi Räikkönen arrived at Interlagos seven points behind Lewis Hamilton and three behind Fernando Alonso. He won, Hamilton had problems and finished seventh, and the Finn was champion by one point over both McLaren drivers.",
      },
    },
    {
      year: 2008,
      slug: "brazil",
      title: { pt: "A última curva", en: "The last corner" },
      text: {
        pt: "Felipe Massa venceu em casa e, por cerca de trinta segundos, foi campeão do mundo. Na chuva das voltas finais, Hamilton ultrapassou Timo Glock, que estava com pneus de pista seca, nas últimas curvas, terminou em quinto e ficou com o título por um ponto.",
        en: "Felipe Massa won at home and, for about thirty seconds, was world champion. In the rain of the final laps Hamilton passed Timo Glock, who was on dry tyres, in the last corners, finished fifth and took the title by one point.",
      },
    },
    {
      year: 2009,
      slug: "australia",
      title: { pt: "A equipe que quase não existiu", en: "The team that almost never was" },
      text: {
        pt: "Meses antes, a Honda tinha abandonado a Fórmula 1. Ross Brawn comprou a equipe, e na primeira corrida o carro com difusor duplo fez dobradinha com Jenson Button e Rubens Barrichello. A Brawn GP venceu os dois títulos e foi vendida à Mercedes no fim do ano.",
        en: "Months earlier Honda had left Formula One. Ross Brawn bought the team, and in its first race the double-diffuser car finished one-two with Jenson Button and Rubens Barrichello. Brawn GP won both titles and was sold to Mercedes at the end of the year.",
      },
    },
  ],
  "2010s": [
    {
      year: 2010,
      slug: "abu-dhabi",
      title: { pt: "Líder só depois da bandeirada", en: "Leader only after the flag" },
      text: {
        pt: "Quatro pilotos chegaram a Abu Dhabi com chances. A estratégia da Ferrari deixou Alonso preso atrás de Vitaly Petrov a corrida inteira, e Sebastian Vettel venceu. Foi a primeira vez que ele liderou o campeonato no ano — e ele se tornou o campeão mais jovem da história.",
        en: "Four drivers arrived in Abu Dhabi with a chance. Ferrari's strategy left Alonso stuck behind Vitaly Petrov all race, and Sebastian Vettel won. It was the first time all year he had led the championship — and he became the youngest champion in history.",
      },
    },
    {
      year: 2011,
      slug: "canada",
      title: { pt: "Do último ao primeiro", en: "From last to first" },
      text: {
        pt: "Na corrida mais longa da história, com mais de quatro horas por causa da chuva e de uma longa bandeira vermelha, Jenson Button fez seis paradas, envolveu-se em duas colisões e chegou a ser o último. Na última volta, pressionou Vettel até ele errar e venceu.",
        en: "In the longest race in history, over four hours long because of rain and a long red flag, Jenson Button made six pit stops, was involved in two collisions and at one point ran last. On the final lap he pressured Vettel into a mistake and won.",
      },
    },
    {
      year: 2012,
      slug: "brazil",
      title: { pt: "Rodada na primeira volta", en: "Spun on the first lap" },
      text: {
        pt: "Vettel foi tocado e rodou na primeira volta em Interlagos, caindo para o fim do pelotão com o carro danificado. Recuperou-se até o sexto lugar na chuva e venceu Fernando Alonso por três pontos, conquistando o terceiro título seguido.",
        en: "Vettel was hit and spun on the first lap at Interlagos, falling to the back with a damaged car. He recovered to sixth in the rain and beat Fernando Alonso by three points for his third straight title.",
      },
    },
    {
      year: 2014,
      slug: "japan",
      title: { pt: "Suzuka e o acidente de Bianchi", en: "Suzuka and Bianchi's accident" },
      text: {
        pt: "Na chuva do fim da corrida, Jules Bianchi perdeu o controle e bateu num trator que removia outro carro. Ele morreu meses depois. A resposta foi o Safety Car Virtual, criado em 2015 para neutralizar a corrida sem esperar o carro de segurança.",
        en: "In the rain late in the race, Jules Bianchi lost control and hit a tractor that was recovering another car. He died months later. The response was the Virtual Safety Car, created in 2015 to neutralise a race without waiting for the Safety Car.",
      },
    },
    {
      year: 2016,
      slug: "spain",
      title: { pt: "Dezoito anos", en: "Eighteen years old" },
      text: {
        pt: "As duas Mercedes de Hamilton e Rosberg se tocaram na primeira volta. Max Verstappen, em sua primeira corrida pela Red Bull, segurou Kimi Räikkönen até o fim e venceu aos 18 anos — o vencedor mais jovem da história.",
        en: "The two Mercedes of Hamilton and Rosberg collided on the first lap. Max Verstappen, in his first race for Red Bull, held off Kimi Räikkönen to the end and won at 18 — the youngest winner in history.",
      },
    },
    {
      year: 2016,
      slug: "abu-dhabi",
      title: { pt: "Campeão e aposentado", en: "Champion, then retired" },
      text: {
        pt: "Nico Rosberg precisava terminar em segundo. Hamilton liderou devagar de propósito para aproximar os rivais, mas Rosberg segurou a posição e foi campeão. Cinco dias depois, anunciou a aposentadoria.",
        en: "Nico Rosberg needed second place. Hamilton led deliberately slowly to bring the others closer, but Rosberg held on and was champion. Five days later he announced his retirement.",
      },
    },
  ],
  "2020s": [
    {
      year: 2020,
      slug: "bahrain",
      title: { pt: "Saindo do fogo", en: "Out of the fire" },
      text: {
        pt: "Na primeira volta, a Haas de Romain Grosjean atravessou o guard-rail, partiu-se ao meio e pegou fogo. Protegido pelo halo, ele saiu das chamas em cerca de 30 segundos. O acidente virou a maior prova de que a segurança moderna funciona.",
        en: "On the first lap Romain Grosjean's Haas went through the barrier, split in two and caught fire. Protected by the halo, he climbed out of the flames in about 30 seconds. The crash became the clearest proof that modern safety works.",
      },
    },
    {
      year: 2021,
      slug: "abu-dhabi",
      title: { pt: "A última volta", en: "The final lap" },
      text: {
        pt: "Hamilton e Verstappen chegaram empatados em pontos. Com Hamilton na frente, um Safety Car no fim mudou tudo: a direção de prova liberou só os retardatários entre os dois e relargou a corrida para uma última volta. Com pneus novos, Verstappen passou e foi campeão. A FIA depois reconheceu erro humano e trocou o diretor de prova.",
        en: "Hamilton and Verstappen arrived level on points. With Hamilton in front, a late Safety Car changed everything: race control let only the lapped cars between them through and restarted the race for one final lap. On fresh tyres Verstappen passed and became champion. The FIA later acknowledged human error and replaced the race director.",
      },
    },
    {
      year: 2023,
      slug: "singapore",
      title: { pt: "A única que escapou", en: "The one that got away" },
      text: {
        pt: "Em 2023 a Red Bull venceu 21 das 22 corridas. A exceção foi Singapura, onde Carlos Sainz controlou o ritmo à frente de Lando Norris e deu à Ferrari a única vitória do ano fora da Red Bull.",
        en: "In 2023 Red Bull won 21 of the 22 races. The exception was Singapore, where Carlos Sainz controlled the pace ahead of Lando Norris and gave Ferrari the only non-Red Bull win of the year.",
      },
    },
    {
      year: 2024,
      slug: "miami",
      title: { pt: "A primeira de Norris", en: "Norris's first win" },
      text: {
        pt: "Depois de mais de cem largadas sem vencer, Lando Norris ganhou em Miami, superando Max Verstappen. A vitória marcou a volta da McLaren à luta pelas vitórias — e o começo da fase que a levaria aos títulos.",
        en: "After more than a hundred starts without a win, Lando Norris won in Miami, beating Max Verstappen. The victory marked McLaren's return to winning ways — and the start of the spell that would take it to titles.",
      },
    },
  ],
};
