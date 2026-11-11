import type { Milestone } from "../types";

type DriverText = { knownFor: string; summary: string; bio: string[]; timeline: Milestone[] };

/** Portuguese (Brazil) editorial text for driver profiles. Keys are F1DB driver ids. */
export const DRIVERS_PT: Record<string, DriverText> = {
  "nino-farina": {
    knownFor: "O primeiro campeão mundial de Fórmula 1",
    summary: "Vencedor da primeira corrida do Mundial e primeiro campeão mundial, em 1950.",
    bio: [
      "Nino Farina já era um piloto de Grand Prix consagrado antes da guerra. Correndo pela Alfa Romeo em 1950, venceu a prova de abertura do novo campeonato em Silverstone e conquistou o título à frente dos companheiros Fangio e Fagioli.",
      "Conhecido pela posição de pilotagem ereta, com os braços estendidos, Farina depois correu pela Ferrari antes de se aposentar em meados dos anos 1950.",
    ],
    timeline: [
      { year: "1950", title: "Primeiro campeão mundial", text: "Vence o campeonato inaugural pela Alfa Romeo." },
      { year: "1952", title: "Ferrari", text: "Junta-se à Ferrari ao lado de Alberto Ascari." },
    ],
  },
  "juan-manuel-fangio": {
    knownFor: "Cinco títulos com quatro equipes diferentes",
    summary: "O piloto que definiu os anos 1950, campeão cinco vezes por quatro fabricantes diferentes.",
    bio: [
      "Fangio chegou da Argentina à Europa no fim dos anos 1940 e já passava dos 35 anos quando o Mundial começou. Venceu o primeiro título pela Alfa Romeo em 1951.",
      "Depois de um acidente grave que o tirou da temporada de 1952, voltou para vencer em 1954 (Maserati e Mercedes-Benz), 1955 (Mercedes-Benz), 1956 (Ferrari) e 1957 (Maserati). O quinto título foi um recorde que durou até 2003.",
      "Sua vitória no GP da Alemanha de 1957, em Nürburgring, recuperando uma grande desvantagem após um pit stop lento, ainda é considerada uma das maiores atuações da história do esporte.",
    ],
    timeline: [
      { year: "1951", title: "Primeiro título", text: "Campeão pela Alfa Romeo." },
      { year: "1954", title: "Mercedes-Benz", text: "Muda para a Mercedes no meio da temporada e vence o título." },
      { year: "1957", title: "Quinto título", text: "Vence em Nürburgring e garante o quinto campeonato pela Maserati." },
    ],
  },
  "alberto-ascari": {
    knownFor: "O primeiro campeão da Ferrari",
    summary: "Bicampeão mundial em 1952 e 1953 e primeiro piloto a dar um título à Ferrari.",
    bio: [
      "Filho do astro do pré-guerra Antonio Ascari, Alberto correu pela Ferrari quando o campeonato usou regras de Fórmula 2, em 1952 e 1953, e foi quase imbatível, vencendo os dois títulos.",
      "Depois foi para a Lancia. Em 1955 sobreviveu a uma queda no porto de Mônaco, mas morreu dias depois testando um carro esporte em Monza.",
    ],
    timeline: [
      { year: "1952", title: "Primeiro título", text: "Domina a temporada com a Ferrari 500." },
      { year: "1953", title: "Segundo título", text: "Mantém o campeonato." },
    ],
  },
  "stirling-moss": {
    knownFor: "O maior piloto que nunca foi campeão",
    summary: "Quatro vezes vice-campeão e muito chamado de o maior piloto que nunca venceu o Mundial.",
    bio: [
      "Moss correu numa variedade extraordinária de carros e categorias, muitas vezes por equipes particulares. Foi vice-campeão quatro vezes seguidas, de 1955 a 1958.",
      "Em 1958 perdeu o título para Mike Hawthorn por um único ponto, depois de ter defendido Hawthorn contra uma desclassificação que teria dado o campeonato a Moss — episódio sempre citado como exemplo de esportividade.",
      "Um acidente em Goodwood, em 1962, encerrou sua carreira de ponta.",
    ],
    timeline: [
      { year: "1955", title: "Companheiro de Fangio na Mercedes", text: "Vence o GP de casa, em Aintree." },
      { year: "1958", title: "Vice por um ponto", text: "Perde o título para Hawthorn." },
      { year: "1961", title: "Mônaco", text: "Vence em Mônaco com uma Lotus defasada, batendo as Ferrari, mais rápidas." },
    ],
  },
  "mike-hawthorn": {
    knownFor: "O primeiro campeão britânico",
    summary: "Venceu o campeonato de 1958 pela Ferrari por um ponto e se aposentou logo em seguida.",
    bio: [
      "Hawthorn conquistou o título de 1958 pela Ferrari, superando Stirling Moss por um único ponto, e tornou-se o primeiro campeão mundial britânico de Fórmula 1.",
      "Abalado pela morte do amigo e companheiro Peter Collins naquela temporada, aposentou-se no fim do ano. Morreu num acidente de trânsito poucos meses depois.",
    ],
    timeline: [{ year: "1958", title: "Campeão mundial", text: "Supera Moss por um ponto." }],
  },
  "jack-brabham": {
    knownFor: "Campeão num carro com o próprio nome",
    summary: "Tricampeão mundial e o único piloto a vencer o título com um carro de sua própria construção.",
    bio: [
      "O conhecimento mecânico de Brabham ajudou a Cooper a aperfeiçoar o carro de motor traseiro. Ele venceu os títulos de 1959 e 1960 pela Cooper.",
      "Depois fundou a própria equipe com o projetista Ron Tauranac. Em 1966, pilotando um Brabham, venceu o terceiro título — ainda a única vez em que um piloto foi campeão num carro com o próprio nome.",
    ],
    timeline: [
      { year: "1959", title: "Primeiro título", text: "Vence com o carro de motor central da Cooper." },
      { year: "1962", title: "Equipe Brabham", text: "Começa a correr com os próprios carros." },
      { year: "1966", title: "Terceiro título", text: "Campeão com um Brabham." },
    ],
  },
  "phil-hill": {
    knownFor: "O primeiro campeão americano",
    summary: "Venceu o campeonato de 1961 pela Ferrari, o primeiro campeão mundial nascido nos Estados Unidos.",
    bio: [
      "Piloto vitorioso em carros esporte, Phil Hill venceu o título de 1961 com a Ferrari 156. Confirmou o campeonato em Monza, na corrida em que seu companheiro e rival Wolfgang von Trips morreu.",
    ],
    timeline: [{ year: "1961", title: "Campeão mundial", text: "Campeão com a Ferrari 156 de “nariz de tubarão”." }],
  },
  "graham-hill": {
    knownFor: "O Senhor Mônaco e a Tríplice Coroa",
    summary: "Bicampeão mundial, cinco vezes vencedor em Mônaco e o único piloto a completar a Tríplice Coroa do automobilismo.",
    bio: [
      "Hill venceu o campeonato pela BRM em 1962 e de novo pela Lotus em 1968, quando manteve a equipe de pé após a morte de Jim Clark.",
      "Venceu em Mônaco cinco vezes e é o único piloto a ter vencido o Mundial de Fórmula 1, as 500 Milhas de Indianápolis e as 24 Horas de Le Mans. Seu filho Damon foi campeão mundial em 1996.",
    ],
    timeline: [
      { year: "1962", title: "Campeão pela BRM", text: "Primeiro título mundial." },
      { year: "1966", title: "500 Milhas de Indianápolis", text: "Vence em Indianápolis como estreante." },
      { year: "1968", title: "Campeão pela Lotus", text: "Segundo título." },
      { year: "1972", title: "Le Mans", text: "Vence em Le Mans e completa a Tríplice Coroa." },
    ],
  },
  "jim-clark": {
    knownFor: "O bicampeão da Lotus",
    summary: "Bicampeão mundial pela Lotus, considerado por muitos colegas o maior piloto de sua época.",
    bio: [
      "Fazendeiro escocês que só correu pela Lotus na Fórmula 1, Clark formou com Colin Chapman uma das grandes parcerias do esporte. Venceu o campeonato em 1963 e 1965 e as 500 Milhas de Indianápolis de 1965.",
      "Deu ao Cosworth DFV sua vitória de estreia em Zandvoort, em 1967. Clark morreu numa prova de Fórmula 2 em Hockenheim, em abril de 1968, uma perda que chocou o mundo do automobilismo.",
    ],
    timeline: [
      { year: "1963", title: "Primeiro título", text: "Temporada dominante com o Lotus 25." },
      { year: "1965", title: "Título e Indianápolis", text: "Vence o campeonato e as 500 Milhas." },
      { year: "1967", title: "Vitória de estreia do DFV", text: "Vence o GP da Holanda com o Lotus 49." },
    ],
  },
  "john-surtees": {
    knownFor: "Campeão em duas rodas e em quatro",
    summary: "Campeão mundial de motociclismo que venceu o título de Fórmula 1 de 1964 pela Ferrari.",
    bio: [
      "Surtees venceu vários títulos mundiais de motociclismo antes de passar aos carros. O campeonato de Fórmula 1 de 1964, pela Ferrari, faz dele o único campeão mundial nas duas modalidades.",
      "Mais tarde fundou e pilotou pela própria equipe, a Surtees.",
    ],
    timeline: [{ year: "1964", title: "Campeão mundial", text: "Vence o título pela Ferrari." }],
  },
  "denny-hulme": {
    knownFor: "O campeão da Nova Zelândia",
    summary: "Venceu o campeonato de 1967 pela Brabham, superando o próprio chefe de equipe, Jack Brabham.",
    bio: [
      "Hulme conquistou o título de 1967 pela Brabham, à frente do dono da equipe, Jack Brabham. Depois tornou-se peça fundamental da McLaren ao lado do compatriota Bruce McLaren.",
    ],
    timeline: [{ year: "1967", title: "Campeão mundial", text: "Campeão com a Brabham-Repco." }],
  },
  "jackie-stewart": {
    knownFor: "Três títulos e a revolução da segurança",
    summary: "Tricampeão mundial cuja campanha pela segurança transformou a Fórmula 1.",
    bio: [
      "Stewart venceu os títulos de 1969 (Matra), 1971 e 1973 (Tyrrell), formando uma parceria duradoura com o dono de equipe Ken Tyrrell.",
      "Depois de um acidente em Spa, em 1966, que o deixou preso no carro, tornou-se o principal defensor de circuitos mais seguros, barreiras, atendimento médico e cintos de segurança — muitas vezes enfrentando forte resistência. Aposentou-se no fim de 1973, antes do que seria seu 100º Grande Prêmio, após a morte do companheiro François Cevert.",
    ],
    timeline: [
      { year: "1966", title: "Spa", text: "Um acidente dá início à sua campanha pela segurança." },
      { year: "1969", title: "Primeiro título", text: "Campeão pela Matra." },
      { year: "1973", title: "Terceiro título e aposentadoria", text: "Aposenta-se como campeão." },
    ],
  },
  "jochen-rindt": {
    knownFor: "O único campeão póstumo",
    summary: "Abriu vantagem imbatível em 1970 antes de morrer em Monza; o único campeão póstumo.",
    bio: [
      "Rindt foi um dos pilotos mais rápidos de sua geração. Em 1970, com o revolucionário Lotus 72, venceu cinco corridas e liderava o campeonato com folga.",
      "Morreu no treino para o GP da Itália. Nenhum rival conseguiu superar seus pontos, e ele foi declarado campeão mundial postumamente.",
    ],
    timeline: [{ year: "1970", title: "Campeão póstumo", text: "Cinco vitórias pela Lotus." }],
  },
  "emerson-fittipaldi": {
    knownFor: "O primeiro campeão brasileiro",
    summary: "Campeão em 1972 pela Lotus e em 1974 pela McLaren; abriu caminho para gerações de pilotos brasileiros.",
    bio: [
      "Fittipaldi venceu o título de 1972 pela Lotus, tornando-se o campeão mais jovem até então, e deu à McLaren seu primeiro título de pilotos em 1974.",
      "Depois correu pela equipe brasileira do irmão e, mais tarde, teve uma carreira muito vitoriosa na Fórmula Indy americana.",
    ],
    timeline: [
      { year: "1972", title: "Primeiro título", text: "Campeão pela Lotus." },
      { year: "1974", title: "Segundo título", text: "O primeiro título de pilotos da McLaren." },
    ],
  },
  "niki-lauda": {
    knownFor: "A volta por cima",
    summary: "Tricampeão que voltou a correr seis semanas depois de queimaduras quase fatais.",
    bio: [
      "A abordagem analítica de Lauda ajudou a reconstruir a Ferrari, e ele venceu o título de 1975 com o 312T. Em 1976 sofreu queimaduras graves num acidente em Nürburgring, mas voltou a correr seis semanas depois, perdendo o título para James Hunt por um ponto.",
      "Venceu de novo pela Ferrari em 1977, aposentou-se, voltou pela McLaren e conquistou o terceiro título em 1984, por meio ponto sobre Alain Prost.",
    ],
    timeline: [
      { year: "1975", title: "Primeiro título", text: "Campeão pela Ferrari." },
      { year: "1976", title: "Nürburgring", text: "Sobrevive ao acidente e volta em semanas." },
      { year: "1977", title: "Segundo título", text: "Campeão de novo pela Ferrari." },
      { year: "1984", title: "Terceiro título", text: "Vence por meio ponto pela McLaren." },
    ],
  },
  "james-hunt": {
    knownFor: "Campeão de 1976 por um único ponto",
    summary: "Carismático campeão de 1976 pela McLaren, após um duelo de temporada inteira com Niki Lauda.",
    bio: [
      "Hunt se destacou na equipe particular Hesketh. Na McLaren em 1976, disputou o título com Lauda e o confirmou por um único ponto num encharcado GP do Japão.",
      "Depois de se aposentar, tornou-se um comentarista de televisão muito querido.",
    ],
    timeline: [{ year: "1976", title: "Campeão mundial", text: "Vence em Fuji por um único ponto." }],
  },
  "mario-andretti": {
    knownFor: "O campeão do efeito solo",
    summary: "Campeão de 1978 com o Lotus 79, de efeito solo, e um dos pilotos mais versáteis da história.",
    bio: [
      "Andretti venceu em quase todo tipo de corrida, incluindo as 500 Milhas de Indianápolis e a Daytona 500. Na Lotus ajudou a desenvolver a aerodinâmica de efeito solo e venceu o título de 1978 com o Lotus 79.",
    ],
    timeline: [{ year: "1978", title: "Campeão mundial", text: "Campeão com o Lotus 79." }],
  },
  "jody-scheckter": {
    knownFor: "O último campeão da Ferrari até 2000",
    summary: "Venceu o título de 1979 pela Ferrari — o último título de pilotos da equipe em 21 anos.",
    bio: [
      "Scheckter amadureceu de um jovem talento impetuoso para um candidato consistente ao título. Venceu pela Tyrrell na era do P34 de seis rodas e conquistou o campeonato de 1979 pela Ferrari.",
    ],
    timeline: [{ year: "1979", title: "Campeão mundial", text: "Campeão pela Ferrari." }],
  },
  "gilles-villeneuve": {
    knownFor: "Entrega total",
    summary: "O piloto adorado e destemido da Ferrari, morto em Zolder em 1982.",
    bio: [
      "Villeneuve nunca foi campeão, mas tornou-se um dos pilotos mais admirados da história pelo controle do carro e pela entrega. Seu duelo roda a roda com René Arnoux em Dijon, em 1979, é lendário.",
      "Morreu na classificação do GP da Bélgica de 1982. O circuito de Montreal leva seu nome, e seu filho Jacques foi campeão mundial em 1997.",
    ],
    timeline: [
      { year: "1978", title: "Primeira vitória", text: "Vence o primeiro GP disputado em Montreal." },
      { year: "1982", title: "Zolder", text: "Morre na classificação." },
    ],
  },
  "alan-jones": {
    knownFor: "O primeiro campeão da Williams",
    summary: "Venceu o campeonato de 1980, o primeiro título de pilotos da Williams.",
    bio: ["Jones deu à equipe de Frank Williams seu primeiro título de pilotos em 1980, com o FW07B de efeito solo."],
    timeline: [{ year: "1980", title: "Campeão mundial", text: "O primeiro título de pilotos da Williams." }],
  },
  "nelson-piquet": {
    knownFor: "O primeiro campeão da era turbo",
    summary: "Tricampeão — duas vezes pela Brabham, uma pela Williams.",
    bio: [
      "Piquet venceu pela Brabham em 1981 e de novo em 1983, quando o BT52 de motor BMW fez dele o primeiro campeão da era turbo. Conquistou o terceiro título pela Williams-Honda em 1987.",
    ],
    timeline: [
      { year: "1981", title: "Primeiro título", text: "Campeão pela Brabham." },
      { year: "1983", title: "Título turbo", text: "Brabham-BMW." },
      { year: "1987", title: "Terceiro título", text: "Campeão pela Williams-Honda." },
    ],
  },
  "keke-rosberg": {
    knownFor: "Campeão com uma única vitória",
    summary: "Venceu o campeonato de 1982 com uma vitória, numa temporada incomumente equilibrada.",
    bio: [
      "Na turbulenta temporada de 1982, a regularidade de Rosberg pela Williams lhe deu o título, apesar de vencer uma única vez. Seu filho Nico foi campeão mundial em 2016.",
    ],
    timeline: [{ year: "1982", title: "Campeão mundial", text: "Campeão pela Williams." }],
  },
  "alain-prost": {
    knownFor: "O Professor",
    summary: "Tetracampeão mundial, celebrado pela inteligência, pela suavidade e pela gestão de corrida.",
    bio: [
      "Apelidado de “O Professor” pela abordagem calculista, Prost venceu os títulos pela McLaren em 1985, 1986 e 1989, e pela Williams em 1993.",
      "Sua rivalidade com Ayrton Senna, sobretudo como companheiros na McLaren em 1988 e 1989, é a mais famosa da Fórmula 1. Aposentou-se no fim de 1993 como campeão.",
    ],
    timeline: [
      { year: "1985", title: "Primeiro título", text: "O primeiro campeão mundial francês." },
      { year: "1986", title: "Segundo título", text: "Vence em Adelaide." },
      { year: "1989", title: "Terceiro título", text: "Confirmado após a colisão em Suzuka." },
      { year: "1993", title: "Quarto título", text: "Aposenta-se como campeão pela Williams." },
    ],
  },
  "ayrton-senna": {
    knownFor: "Gênio da classificação, três títulos",
    summary: "Tricampeão mundial cuja velocidade, intensidade e morte em Ímola o tornaram um ícone permanente.",
    bio: [
      "Senna se apresentou ao mundo na chuva de Mônaco em 1984, pilotando uma Toleman. Na Lotus tornou-se mestre da classificação, e na McLaren venceu o campeonato em 1988, 1990 e 1991.",
      "Foi para a Williams em 1994 e morreu no GP de San Marino, em Ímola. Sua morte, um dia depois da de Roland Ratzenberger, levou a uma revisão ampla da segurança na Fórmula 1.",
    ],
    timeline: [
      { year: "1984", title: "Mônaco na chuva", text: "Segundo lugar com a Toleman." },
      { year: "1988", title: "Primeiro título", text: "Campeão pela McLaren-Honda." },
      { year: "1991", title: "Terceiro título", text: "Campeão novamente pela McLaren." },
      { year: "1994", title: "Ímola", text: "Morre durante o GP de San Marino." },
    ],
  },
  "nigel-mansell": {
    knownFor: "Il Leone",
    summary: "Campeão mundial de 1992 pela Williams, depois de anos batendo na trave.",
    bio: [
      "O estilo agressivo de Mansell o tornou muito popular. Depois de perder títulos por pouco em 1986 e 1987, dominou 1992 com o Williams FW14B de suspensão ativa.",
      "Foi para a Fórmula Indy americana em 1993 e venceu o campeonato na primeira tentativa.",
    ],
    timeline: [
      { year: "1986", title: "Adelaide", text: "Um pneu estourado lhe custa o título." },
      { year: "1992", title: "Campeão mundial", text: "Temporada dominante pela Williams." },
    ],
  },
  "michael-schumacher": {
    knownFor: "Sete títulos; reconstruiu a Ferrari",
    summary: "Heptacampeão mundial que liderou a era mais vitoriosa da Ferrari.",
    bio: [
      "Schumacher estreou pela Jordan em 1991 e venceu os títulos pela Benetton em 1994 e 1995. Foi para a Ferrari em 1996 e, com Jean Todt, Ross Brawn e Rory Byrne, reconstruiu a equipe até torná-la dominante.",
      "Venceu cinco títulos seguidos pela Ferrari, de 2000 a 2004, estabelecendo o recorde de sete campeonatos. Aposentou-se em 2006, voltou pela Mercedes de 2010 a 2012 e sofreu uma grave lesão cerebral num acidente de esqui em 2013.",
    ],
    timeline: [
      { year: "1994", title: "Primeiro título", text: "Campeão pela Benetton." },
      { year: "1996", title: "Ferrari", text: "Chega à Scuderia." },
      { year: "2000", title: "Campeão da Ferrari", text: "O primeiro de cinco títulos seguidos." },
      { year: "2004", title: "Sétimo título", text: "Um novo recorde histórico." },
    ],
  },
  "damon-hill": {
    knownFor: "Filho de campeão, campeão também",
    summary: "Campeão mundial de 1996 pela Williams e filho do bicampeão Graham Hill.",
    bio: [
      "Hill passou de piloto de testes a titular da Williams em 1993 e tornou-se o principal rival de Schumacher. Venceu o título de 1996 e depois deu à Jordan sua primeira vitória, em Spa, em 1998.",
    ],
    timeline: [{ year: "1996", title: "Campeão mundial", text: "Campeão pela Williams." }],
  },
  "jacques-villeneuve": {
    knownFor: "Campeão de 1997",
    summary: "Campeão da Fórmula Indy que venceu o título de Fórmula 1 de 1997 na segunda temporada.",
    bio: [
      "O filho de Gilles Villeneuve chegou da Fórmula Indy como campeão e vencedor das 500 Milhas de Indianápolis. Venceu o título de 1997 pela Williams após uma colisão com Schumacher na última corrida, em Jerez.",
    ],
    timeline: [{ year: "1997", title: "Campeão mundial", text: "Campeão pela Williams." }],
  },
  "mika-hakkinen": {
    knownFor: "O grande rival de Schumacher",
    summary: "Bicampeão mundial pela McLaren-Mercedes, em 1998 e 1999.",
    bio: [
      "Häkkinen se recuperou de um acidente quase fatal em Adelaide, em 1995, e tornou-se o líder da McLaren. Venceu os títulos de 1998 e 1999, e sua ultrapassagem sobre Schumacher em Spa, em 2000, continua entre as maiores da história.",
    ],
    timeline: [
      { year: "1998", title: "Primeiro título", text: "Campeão pela McLaren-Mercedes." },
      { year: "1999", title: "Segundo título", text: "Mantém o campeonato." },
    ],
  },
  "fernando-alonso": {
    knownFor: "O piloto completo; dois títulos pela Renault",
    summary: "Bicampeão mundial, com uma carreira de mais de duas décadas.",
    bio: [
      "Alonso estreou pela Minardi em 2001 e venceu dois títulos seguidos pela Renault, em 2005 e 2006, encerrando a sequência de Schumacher. Esteve muito perto de novos títulos pela Ferrari em 2010 e 2012.",
      "Também venceu as 24 Horas de Le Mans e o Mundial de Endurance antes de voltar à Fórmula 1, e hoje corre pela Aston Martin.",
    ],
    timeline: [
      { year: "2001", title: "Estreia", text: "Começa a carreira na Minardi." },
      { year: "2005", title: "Primeiro título", text: "O campeão mais jovem até então." },
      { year: "2006", title: "Segundo título", text: "Mantém o campeonato pela Renault." },
      { year: "2023", title: "Aston Martin", text: "Chega à equipe de Silverstone." },
    ],
  },
  "kimi-raikkonen": {
    knownFor: "O Homem de Gelo",
    summary: "Campeão mundial de 2007 pela Ferrari, famoso pela velocidade e pela personalidade lacônica.",
    bio: [
      "Räikkönen chegou à Fórmula 1 vindo das categorias de base com pouquíssimas corridas de carro no currículo. Em sua primeira temporada na Ferrari, 2007, venceu o título por um único ponto na última corrida.",
    ],
    timeline: [{ year: "2007", title: "Campeão mundial", text: "Vence o título por um ponto em Interlagos." }],
  },
  "jenson-button": {
    knownFor: "O campeão da Brawn GP",
    summary: "Campeão mundial de 2009 pela Brawn GP, conhecido pela suavidade em condições variáveis.",
    bio: [
      "A carreira de Button quase acabou quando a Honda saiu no fim de 2008. A equipe foi salva como Brawn GP, e Button venceu seis das sete primeiras corridas de 2009 a caminho do título.",
    ],
    timeline: [{ year: "2009", title: "Campeão mundial", text: "Campeão pela Brawn GP." }],
  },
  "lewis-hamilton": {
    knownFor: "Sete títulos; o piloto da era híbrida",
    summary: "Heptacampeão mundial, dividindo o recorde histórico com Michael Schumacher.",
    bio: [
      "Hamilton chegou perto do título como estreante pela McLaren em 2007 e o conquistou em 2008. Foi para a Mercedes em 2013 e tornou-se o piloto que definiu a era turbo-híbrida, vencendo seis títulos entre 2014 e 2020.",
      "Fora das pistas, tem sido uma voz influente sobre diversidade e inclusão no automobilismo. Chegou à Ferrari em 2025.",
    ],
    timeline: [
      { year: "2007", title: "Estreia", text: "Chega à McLaren." },
      { year: "2008", title: "Primeiro título", text: "Vence por um ponto no Brasil." },
      { year: "2013", title: "Mercedes", text: "Muda para a Mercedes." },
      { year: "2020", title: "Sétimo título", text: "Iguala o recorde de Schumacher." },
      { year: "2025", title: "Ferrari", text: "Chega à Scuderia." },
    ],
  },
  "sebastian-vettel": {
    knownFor: "Quatro títulos seguidos",
    summary: "Quatro títulos mundiais consecutivos pela Red Bull, de 2010 a 2013.",
    bio: [
      "Vettel venceu um GP da Itália encharcado pela Toro Rosso em 2008, tornando-se o vencedor mais jovem até então. Pela Red Bull, conquistou quatro campeonatos seguidos e tornou-se o campeão mais jovem em 2010.",
      "Depois correu pela Ferrari e pela Aston Martin, aposentando-se no fim de 2022.",
    ],
    timeline: [
      { year: "2008", title: "Monza", text: "Primeira vitória, pela Toro Rosso." },
      { year: "2010", title: "Primeiro título", text: "O campeão mais jovem da história." },
      { year: "2013", title: "Quarto título", text: "Completa quatro seguidos." },
    ],
  },
  "nico-rosberg": {
    knownFor: "Campeão — e aposentado",
    summary: "Campeão mundial de 2016 pela Mercedes, aposentou-se dias depois de conquistar o título.",
    bio: [
      "Filho do campeão de 1982 Keke Rosberg, Nico superou o companheiro Lewis Hamilton no título de 2016 e anunciou a aposentadoria dias depois.",
    ],
    timeline: [{ year: "2016", title: "Campeão mundial", text: "Supera Hamilton e se aposenta." }],
  },
  "max-verstappen": {
    knownFor: "Quatro títulos seguidos",
    summary: "Tetracampeão mundial pela Red Bull, o piloto dominante do início da nova era do efeito solo.",
    bio: [
      "Verstappen estreou pela Toro Rosso aos 17 anos e venceu em sua primeira corrida pela Red Bull, em Barcelona, em 2016, tornando-se o vencedor mais jovem de um Grande Prêmio.",
      "Venceu o título de 2021 depois de uma disputa de temporada inteira com Lewis Hamilton, dominou 2022 e 2023 e conquistou o quarto título em 2024.",
    ],
    timeline: [
      { year: "2015", title: "Estreia", text: "Começa pela Toro Rosso aos 17 anos." },
      { year: "2016", title: "Primeira vitória", text: "Vence na estreia pela Red Bull." },
      { year: "2021", title: "Primeiro título", text: "Decidido na última corrida." },
      { year: "2024", title: "Quarto título", text: "Quatro seguidos." },
    ],
  },
  "lando-norris": {
    knownFor: "O campeão da McLaren",
    summary: "Campeão mundial de 2025, que passou toda a carreira na Fórmula 1 pela McLaren.",
    bio: [
      "Norris chegou à McLaren em 2019 e cresceu junto com a equipe durante sua reconstrução. Venceu pela primeira vez em Miami, em 2024, e conquistou o campeonato de 2025.",
    ],
    timeline: [
      { year: "2019", title: "Estreia", text: "Chega à McLaren." },
      { year: "2024", title: "Primeira vitória", text: "Vence em Miami." },
      { year: "2025", title: "Campeão mundial", text: "O primeiro título de pilotos da McLaren desde 2008." },
    ],
  },
  "charles-leclerc": {
    knownFor: "O especialista em classificação da Ferrari",
    summary: "O líder de longo prazo da Ferrari, famoso pelo ritmo de uma volta.",
    bio: [
      "Leclerc venceu a GP3 e a Fórmula 2 em anos consecutivos antes de estrear pela Sauber em 2018. Chegou à Ferrari em 2019 e venceu em Monza naquele ano. Em 2024 venceu o GP de casa, em Mônaco.",
    ],
    timeline: [
      { year: "2019", title: "Ferrari", text: "Vence em Spa e em Monza." },
      { year: "2024", title: "Mônaco", text: "Vence a corrida de casa." },
    ],
  },
  "oscar-piastri": {
    knownFor: "Campeão de F3 e de F2 como estreante",
    summary: "Venceu a Fórmula 3 e a Fórmula 2 nas temporadas de estreia antes de chegar à McLaren.",
    bio: [
      "Piastri venceu a Fórmula Renault Eurocup, a Fórmula 3 e a Fórmula 2 em anos consecutivos. Chegou à McLaren em 2023 e venceu seu primeiro Grande Prêmio na Hungria, em 2024.",
    ],
    timeline: [
      { year: "2021", title: "Campeão da F2", text: "Vence como estreante." },
      { year: "2024", title: "Primeira vitória", text: "Vence na Hungria." },
    ],
  },
  "george-russell": {
    knownFor: "O líder da Mercedes",
    summary: "Campeão da GP3 e da Fórmula 2 que lidera a Mercedes na era de 2026.",
    bio: [
      "Russell venceu a GP3 e a Fórmula 2 antes de três temporadas pela Williams. Chegou à Mercedes em 2022 e venceu seu primeiro Grande Prêmio no Brasil naquele ano.",
    ],
    timeline: [
      { year: "2018", title: "Campeão da F2", text: "Vence o título." },
      { year: "2022", title: "Mercedes", text: "Primeira vitória, em Interlagos." },
    ],
  },
};
