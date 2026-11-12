import type { Era } from "../eras";

type EraText = Pick<Era, "name" | "tagline" | "themes" | "intro" | "context" | "technology" | "developments" | "rivalries" | "regulationChanges">;

/** Portuguese (Brazil) text of the history chapters. */
export const ERAS_PT: Record<string, EraText> = {
  "1950s": {
    name: "Fangio e os carros de motor dianteiro",
    tagline: "Farina vence o primeiro campeonato, Fangio conquista cinco títulos e, no fim da década, a Cooper põe o motor atrás do piloto.",
    themes: ["Motor dianteiro", "Fabricantes do pré-guerra", "Os cinco títulos de Fangio"],
    intro:
      "O Campeonato Mundial de Pilotos de Fórmula 1 da FIA começou em Silverstone, em 13 de maio de 1950. Durante uma década, foi um campeonato de carros pesados com motor dianteiro, circuitos com pouca proteção e pilotos que muitas vezes eram amadores ricos ou profissionais experientes do pré-guerra.",
    context: [
      "As corridas de Grand Prix existiam muito antes de 1950. O que mudou foi a organização: pela primeira vez, uma série de Grandes Prêmios nacionais passou a valer um único título mundial de pilotos. A Europa ainda se reconstruía depois da Segunda Guerra, e muitos dos primeiros carros competitivos eram evoluções de projetos anteriores à guerra.",
      "O calendário era curto e quase todo europeu. As 500 Milhas de Indianápolis fizeram parte oficialmente do campeonato de 1950 a 1960, embora pouquíssimos pilotos disputassem tanto a prova americana quanto as etapas europeias.",
      "As corridas eram extremamente perigosas. Os circuitos usavam estradas públicas ladeadas por árvores, muros e espectadores; cintos de segurança raramente eram usados e os capacetes ofereciam pouca proteção. Muitos dos maiores pilotos da época morreram em acidentes.",
    ],
    technology: [
      "Os carros tinham o motor à frente do piloto, tracionando as rodas traseiras por meio de um longo eixo cardã. Os pneus eram estreitos, a aerodinâmica mal era considerada além de uma carroceria lisa, e os freios a tambor eram o padrão durante a maior parte da década, até que os freios a disco chegaram das provas de carros esporte.",
      "O regulamento de motores mudou várias vezes: primeiro 1,5 litro com compressor ou 4,5 litros aspirado, depois as regras da Fórmula 2 em 1952–53 e, a partir de 1954, motores de 2,5 litros. A Mercedes-Benz chegou em 1954 com o W196, trazendo injeção de combustível e comando desmodrômico de válvulas.",
      "No fim da década, pequenas equipes britânicas mostraram que colocar o motor atrás do piloto produzia um carro mais leve e ágil. Essa ideia mudaria o esporte.",
    ],
    developments: [
      { year: "1950", title: "A primeira corrida do Mundial", text: "O GP da Grã-Bretanha, em Silverstone, abre o campeonato. O Alfa Romeo 158 domina a temporada e Giuseppe Farina se torna o primeiro campeão mundial." },
      { year: "1952", title: "Regras de Fórmula 2", text: "Com poucos carros de Fórmula 1 competitivos disponíveis, o campeonato de 1952 e 1953 é disputado com regras de Fórmula 2. Alberto Ascari e a Ferrari vencem os dois títulos." },
      { year: "1954", title: "A volta da Mercedes-Benz", text: "Começa o novo regulamento de 2,5 litros e a Mercedes-Benz estreia com o W196. Juan Manuel Fangio conquista o título, depois de começar o ano pela Maserati." },
      { year: "1955", title: "A Mercedes se retira", text: "Após um segundo título com Fangio, a Mercedes-Benz deixa o automobilismo ao fim de uma temporada marcada pela tragédia de Le Mans." },
      { year: "1957", title: "O quinto título de Fangio", text: "Fangio conquista o quinto campeonato, pela Maserati — um recorde que duraria 46 anos." },
      { year: "1958", title: "Um campeonato para construtores", text: "É criada a Copa Internacional de Fabricantes de F1, vencida pela Vanwall. Mike Hawthorn se torna o primeiro campeão britânico, pela Ferrari." },
      { year: "1959", title: "A revolução do motor traseiro", text: "Jack Brabham e a Cooper vencem os dois campeonatos com um carro de motor central, anunciando o fim da era do motor dianteiro." },
    ],
    rivalries: [
      { title: "Fangio e Moss", text: "Companheiros na Mercedes-Benz em 1955 e rivais pelo resto da década. Moss foi vice de Fangio três vezes." },
      { title: "Hawthorn e Moss, 1958", text: "Dois britânicos decidiram o título por um ponto na última corrida, no Marrocos; a defesa que Moss fez de Hawthorn no início daquele ano ficou marcada como um gesto de esportividade." },
      { title: "Itália contra Alemanha", text: "Alfa Romeo, Ferrari e Maserati enfrentaram a Mercedes-Benz em 1954 e 1955 — a primeira grande batalha de fabricantes." },
    ],
    regulationChanges: [
      { year: "1950", title: "1,5 com compressor ou 4,5 aspirado", text: "O primeiro regulamento do Mundial permitia os dois tipos de motor." },
      { year: "1952", title: "Regras de Fórmula 2", text: "Com poucos carros de F1 competitivos, o campeonato usou as regras de Fórmula 2 (2,0 litros) por duas temporadas." },
      { year: "1954", title: "Fórmula de 2,5 litros", text: "Começou um novo regulamento: 2,5 litros aspirado (ou 750 cm³ com compressor)." },
      { year: "1958", title: "Combustível comercial e copa de construtores", text: "Os combustíveis à base de álcool deram lugar à gasolina de aviação, as corridas ficaram mais curtas e foi criado um campeonato para os fabricantes." },
    ],
  },
  "1960s": {
    name: "Clark, Lotus e os garagistas",
    tagline: "Pequenas equipes britânicas derrotam a Ferrari, a Lotus cria o monocoque, Jim Clark vence 25 corridas e chega o motor Cosworth DFV.",
    themes: ["Motor traseiro", "Chassi monocoque", "Cosworth DFV"],
    intro:
      "Os anos 1960 pertenceram a engenheiros que construíam carros leves de motor traseiro em pequenas oficinas — as equipes que Enzo Ferrari chamava, com desdém, de garagistas. Lotus, Cooper, BRM e Brabham transformaram a engenharia britânica no centro da Fórmula 1.",
    context: [
      "A cilindrada caiu para 1,5 litro em 1961, e quem se preparou melhor foi a Ferrari: Phil Hill tornou-se o primeiro campeão americano com a Ferrari 156 de “nariz de tubarão”. As equipes britânicas se adaptaram e dominaram o resto dos anos de motores pequenos.",
      "Jim Clark e a Lotus formaram a parceria que definiu a década. Clark venceu os títulos de 1963 e 1965 e era amplamente considerado o piloto mais rápido de sua geração até morrer numa prova de Fórmula 2 em Hockenheim, em 1968.",
      "No fim da década, o esporte mudou comercialmente. A partir de 1968, as equipes puderam usar as cores de patrocinadores em vez das cores nacionais — a Lotus apareceu em vermelho, branco e dourado de uma marca de cigarros — e nasceu a equipe moderna patrocinada.",
    ],
    technology: [
      "O Lotus 25, de 1962, substituiu o chassi tubular tradicional por um monocoque: uma estrutura resistente, no estilo da aviação, mais leve e mais rígida. Em poucos anos, todas as equipes sérias seguiram o exemplo.",
      "Em 1966 começou o regulamento de 3 litros. Em 1967, o Cosworth DFV V8, financiado pela Ford, estreou no Lotus 49 e venceu na primeira corrida. Como o DFV era parte estrutural do chassi e era vendido a equipes clientes, levaria carros a títulos por mais de uma década.",
      "As asas aerodinâmicas chegaram em 1968. As primeiras eram montadas no alto, sobre suportes ligados diretamente à suspensão; várias falhas levaram a restrições em 1969, mas a pressão aerodinâmica já era parte central do projeto.",
    ],
    developments: [
      { year: "1961", title: "O regulamento de 1,5 litro", text: "A cilindrada é reduzida. A Ferrari 156 domina e Phil Hill vence o título numa temporada marcada pela morte do companheiro Wolfgang von Trips em Monza." },
      { year: "1962", title: "Chega o monocoque", text: "O Lotus 25, de Colin Chapman, leva o chassi monocoque à Fórmula 1." },
      { year: "1964", title: "Duas rodas e quatro", text: "John Surtees vence o título pela Ferrari e se torna o único campeão mundial de motociclismo e de Fórmula 1." },
      { year: "1966", title: "O carro de Brabham", text: "Jack Brabham vence o campeonato num carro com o próprio nome — feito que nenhum outro piloto repetiu." },
      { year: "1967", title: "O Cosworth DFV", text: "O DFV estreia no Lotus 49 no GP da Holanda e Jim Clark vence na primeira corrida." },
      { year: "1968", title: "Patrocínio e asas", text: "As pinturas comerciais substituem as cores nacionais e surgem as asas. Graham Hill conquista o título pela Lotus após a morte de Clark." },
      { year: "1969", title: "Stewart e a Matra", text: "Jackie Stewart vence seu primeiro título com uma Matra inscrita pela equipe de Ken Tyrrell." },
    ],
    rivalries: [
      { title: "Clark e Graham Hill", text: "Lotus contra BRM em 1962 — título decidido na última corrida, na África do Sul — e companheiros de Lotus em 1967 e 1968." },
      { title: "Brabham e Hulme, 1967", text: "O dono da equipe e seu próprio piloto disputaram o campeonato; Hulme ficou com o título." },
      { title: "Os garagistas contra a Ferrari", text: "Pequenas equipes britânicas especializadas desafiaram a engenharia própria da Ferrari durante toda a década." },
    ],
    regulationChanges: [
      { year: "1961", title: "Motores de 1,5 litro", text: "A cilindrada caiu pela metade e a proteção contra capotamento passou a ser obrigatória." },
      { year: "1966", title: "Motores de 3 litros", text: "O “retorno da potência”: 3,0 litros aspirado ou 1,5 litro com compressor." },
      { year: "1969", title: "Asas altas restringidas", text: "Depois de falhas de asas altas presas à suspensão, a altura e a fixação das asas foram limitadas durante a temporada." },
    ],
  },
  "1970s": {
    name: "Stewart, Lauda, Hunt e o efeito solo",
    tagline: "Stewart briga por segurança, Lauda volta do fogo, Hunt é campeão por um ponto e a Lotus transforma o carro numa asa.",
    themes: ["Carros em cunha", "Campanhas de segurança", "Efeito solo"],
    intro:
      "Nos anos 1970 a Fórmula 1 tornou-se um esporte global da televisão e um laboratório aerodinâmico. Os carros ganharam asas, pontões laterais e, por fim, assoalhos com efeito solo, enquanto pilotos como Jackie Stewart obrigavam o esporte a encarar seu terrível histórico de segurança.",
    context: [
      "Jochen Rindt tornou-se o único campeão póstumo do esporte em 1970, morto num treino em Monza depois de abrir uma vantagem imbatível com o Lotus 72. Stewart, já campeão em 1969, venceu de novo em 1971 e 1973 e lutou sem descanso por barreiras, atendimento médico e circuitos mais seguros.",
      "A Ferrari se reconstruiu em torno de Niki Lauda e do 312T. Em 1976, Lauda sofreu queimaduras gravíssimas em Nürburgring, voltou seis semanas depois e perdeu o título para James Hunt por um único ponto, numa corrida final encharcada no Japão.",
      "Bernie Ecclestone, dono da Brabham, começou a organizar as equipes coletivamente para negociar com circuitos e emissoras, lançando as bases da estrutura comercial moderna do esporte.",
    ],
    technology: [
      "O Lotus 72 levou os radiadores para as laterais e adotou o perfil em cunha — um modelo seguido pela maioria das equipes. As equipes experimentavam com ousadia: a Tyrrell correu com um carro de seis rodas, o P34, e venceu com ele em 1976.",
      "A Lotus descobriu o efeito solo: moldar o fundo do carro como uma asa invertida, vedada por saias deslizantes, para gerar enorme pressão aerodinâmica com pouco arrasto. O Lotus 79 venceu os títulos de 1978; o “carro-ventilador” Brabham BT46B venceu sua única corrida antes de ser retirado.",
      "A Renault introduziu o motor turbo de 1,5 litro em 1977. No início era pouco confiável, mas a primeira vitória, no GP da França de 1979, anunciou a era turbo.",
    ],
    developments: [
      { year: "1970", title: "O Lotus 72", text: "Uma nova linguagem de projeto — bico em cunha, radiadores laterais. Rindt é campeão postumamente." },
      { year: "1973", title: "O terceiro título de Stewart", text: "Jackie Stewart conquista o terceiro campeonato e se aposenta, depois de sua campanha por segurança ter mudado o esporte." },
      { year: "1976", title: "Lauda e Hunt", text: "Lauda sobrevive ao acidente em Nürburgring; Hunt vence o título por um ponto. O seis-rodas da Tyrrell vence na Suécia." },
      { year: "1977", title: "Turbo e efeito solo", text: "A Renault estreia o motor turbo, e o Lotus 78 introduz a aerodinâmica de efeito solo." },
      { year: "1978", title: "O Lotus 79", text: "Mario Andretti vence o título com o Lotus 79, de efeito solo. O professor Sid Watkins inicia sua longa atuação como delegado médico do esporte." },
      { year: "1979", title: "Primeira vitória turbo", text: "A Renault vence em casa, em Dijon; a Williams conquista sua primeira vitória em Silverstone. Jody Scheckter é campeão pela Ferrari." },
    ],
    rivalries: [
      { title: "Lauda e Hunt, 1976", text: "Ferrari contra McLaren numa temporada de acidente, retorno e um título decidido por um ponto, sob chuva, em Fuji." },
      { title: "Stewart e o pelotão", text: "Os títulos de Jackie Stewart em 1971 e 1973 vieram contra Fittipaldi, Peterson e Cevert, numa era muito competitiva." },
      { title: "Andretti e Peterson, 1978", text: "Companheiros no dominante Lotus 79; a temporada terminou em tragédia, com a morte de Peterson em Monza." },
    ],
    regulationChanges: [
      { year: "1973", title: "Estruturas deformáveis", text: "Estruturas absorvedoras em torno dos tanques de combustível passaram a ser exigidas para reduzir o risco de incêndio após impactos." },
      { year: "1976", title: "Tomadas de ar altas proibidas", text: "As tomadas de ar altas acima da cabeça do piloto foram proibidas no início da temporada." },
      { year: "1978", title: "O carro-ventilador retirado", text: "O Brabham BT46B, com ventilador, correu uma vez antes de ser retirado em meio à polêmica." },
    ],
  },
  "1980s": {
    name: "Turbos, Senna e Prost",
    tagline: "Motores turbo com mais de mil cavalos em classificação, o chassi de fibra de carbono e Senna contra Prost dentro da McLaren.",
    themes: ["Motores turbo", "Chassi de fibra de carbono", "Prost e Senna"],
    intro:
      "Os anos 1980 começaram com um conflito político e terminaram com a rivalidade mais famosa da Fórmula 1. No meio vieram os chassis de fibra de carbono, os motores turbo com potências inéditas em configuração de classificação e a ascensão de McLaren, Williams e Honda.",
    context: [
      "A década começou com uma disputa de poder entre a entidade dirigente (FISA) e a associação das equipes (FOCA). O primeiro Pacto da Concórdia, assinado em 1981, definiu como o esporte seria governado e como suas receitas comerciais seriam divididas.",
      "Gilles Villeneuve, adorado por sua entrega, morreu na classificação em Zolder, em 1982. Aquela temporada teve onze vencedores diferentes e Keke Rosberg foi campeão com uma única vitória.",
      "Alain Prost e Ayrton Senna tornaram-se companheiros na McLaren em 1988. A rivalidade entre os dois — precisão técnica contra velocidade pura, culminando numa colisão em Suzuka em 1989 — definiu o fim da década.",
    ],
    technology: [
      "O McLaren MP4/1, de 1981, introduziu o monocoque de compósito de fibra de carbono, muito mais resistente e leve que o alumínio. Ele transformou tanto o desempenho quanto a segurança dos pilotos e se tornou universal.",
      "Os motores turbo de 1,5 litro assumiram o comando. Nelson Piquet venceu o título de 1983 com o Brabham BT52 de motor BMW, o primeiro campeão da era turbo. A entidade restringiu progressivamente a pressão do turbo e o combustível, e proibiu os turbos depois de 1988.",
      "As saias do efeito solo foram proibidas e o fundo plano tornou-se obrigatório a partir de 1983. Em 1989 o esporte passou a usar motores aspirados de 3,5 litros, e o câmbio semiautomático apareceu na Ferrari 640 no mesmo ano.",
    ],
    developments: [
      { year: "1981", title: "Fibra de carbono e Concórdia", text: "O McLaren MP4/1 estreia o monocoque de carbono; o Pacto da Concórdia encerra a guerra FISA–FOCA." },
      { year: "1983", title: "Primeiro campeão turbo", text: "Nelson Piquet e a Brabham-BMW vencem o título de pilotos com motor turbo." },
      { year: "1984", title: "Meio ponto", text: "Niki Lauda supera o companheiro Alain Prost por meio ponto — a menor margem da história do campeonato." },
      { year: "1986", title: "Adelaide", text: "Um pneu de Nigel Mansell estoura na última corrida e Prost mantém o título." },
      { year: "1988", title: "McLaren-Honda", text: "O MP4/4 vence 15 das 16 corridas. Senna conquista seu primeiro título." },
      { year: "1989", title: "Turbos proibidos", text: "Começa o regulamento de motores aspirados de 3,5 litros; Prost e Senna batem em Suzuka e Prost fica com o título." },
    ],
    rivalries: [
      { title: "Prost e Senna", text: "Companheiros na McLaren em 1988 e 1989. O duelo chegou ao auge com a colisão em Suzuka, em 1989, e continuou nos anos 1990." },
      { title: "Piquet e Mansell", text: "Companheiros na Williams-Honda em 1986 e 1987, numa rivalidade que permitiu a Prost roubar o título de 1986." },
      { title: "FISA contra FOCA", text: "A batalha entre a entidade dirigente e a associação das equipes por poder e dinheiro marcou o início da década." },
    ],
    regulationChanges: [
      { year: "1981", title: "Saias deslizantes proibidas", text: "Foi imposta uma altura mínima do solo para limitar o efeito solo; as equipes lutaram para contorná-la." },
      { year: "1983", title: "Fundo plano", text: "O fundo plano entre as rodas tornou-se obrigatório, encerrando a era do efeito solo." },
      { year: "1984", title: "Reabastecimento proibido e combustível limitado", text: "O reabastecimento durante a corrida foi proibido e criou-se um limite de combustível por prova, reduzido nos anos seguintes." },
      { year: "1989", title: "Turbos proibidos", text: "Depois de dois anos de pressão limitada, apenas motores aspirados de 3,5 litros foram permitidos." },
    ],
  },
  "1990s": {
    name: "Senna, Ímola e Schumacher",
    tagline: "A eletrônica domina e é proibida, Senna morre em Ímola e Michael Schumacher começa a reescrever os recordes.",
    themes: ["Auxílios eletrônicos", "Ímola 1994", "A ascensão de Schumacher"],
    intro:
      "O início dos anos 1990 produziu os carros tecnologicamente mais sofisticados que a Fórmula 1 já tinha visto, cheios de auxílios eletrônicos. Então, em 1994, as mortes de Roland Ratzenberger e Ayrton Senna em Ímola forçaram uma revisão profunda da segurança, que molda o esporte até hoje.",
    context: [
      "Senna venceu o segundo e o terceiro títulos em 1990 e 1991. Williams e Renault construíram então o carro dominante do início da década, levando Nigel Mansell ao título de 1992 e Alain Prost ao quarto, em 1993.",
      "Os auxílios eletrônicos foram proibidos em 1994, e o reabastecimento durante a corrida voltou. No GP de San Marino, Ratzenberger morreu na classificação e Senna na corrida. A FIA respondeu com mudanças amplas nos carros e nos circuitos.",
      "Michael Schumacher venceu pela Benetton em 1994 e 1995 e foi para a Ferrari em 1996 para reconstruir a equipe. Damon Hill (1996) e Jacques Villeneuve (1997) venceram pela Williams; Mika Häkkinen foi campeão em 1998 e 1999 pela McLaren-Mercedes.",
    ],
    technology: [
      "Suspensão ativa, controle de tração, freios ABS e câmbios semiautomáticos atingiram o auge nos Williams FW14B e FW15C. A maioria dos auxílios ao piloto foi proibida para 1994.",
      "Depois de Ímola, a FIA introduziu laterais de cockpit mais altas, testes de impacto mais rigorosos, motores menores (3,0 litros a partir de 1995), limite de velocidade nos boxes e mudanças em curvas perigosas de muitos circuitos.",
      "Em 1998, os carros ficaram mais estreitos e os pneus com sulcos substituíram os slicks — duas medidas para reduzir a velocidade nas curvas.",
    ],
    developments: [
      { year: "1990", title: "Suzuka de novo", text: "Senna e Prost batem na primeira curva no Japão; Senna é campeão." },
      { year: "1992", title: "Suspensão ativa", text: "Nigel Mansell vence o título com o Williams FW14B." },
      { year: "1994", title: "Ímola", text: "Roland Ratzenberger e Ayrton Senna morrem. Schumacher conquista o primeiro título após uma colisão com Damon Hill em Adelaide." },
      { year: "1995", title: "Motores de 3,0 litros", text: "A cilindrada é reduzida como parte do pacote de segurança pós-Ímola." },
      { year: "1996", title: "Schumacher na Ferrari", text: "Damon Hill é campeão, o primeiro filho de um campeão mundial a conquistar o título." },
      { year: "1998", title: "Carros estreitos, pneus com sulcos", text: "Novas regras reduzem a aderência; Mika Häkkinen vence o primeiro de dois títulos pela McLaren-Mercedes." },
    ],
    rivalries: [
      { title: "Senna e Prost, continuação", text: "Rivais em McLaren e Ferrari, bateram de novo em Suzuka em 1990, com o campeonato em jogo." },
      { title: "Schumacher e Damon Hill", text: "A colisão em Adelaide decidiu o título de 1994; voltaram a disputar em 1995." },
      { title: "Schumacher e Villeneuve, 1997", text: "Uma colisão na última corrida, em Jerez; Schumacher foi excluído da classificação do campeonato por provocá-la." },
      { title: "Häkkinen e Schumacher", text: "McLaren contra Ferrari a partir de 1998, uma rivalidade construída sobre respeito mútuo." },
    ],
    regulationChanges: [
      { year: "1994", title: "Auxílios eletrônicos proibidos, reabastecimento de volta", text: "Suspensão ativa e controle de tração foram proibidos; depois de Ímola, uma prancha de madeira sob o carro e outras medidas de segurança vieram durante a temporada." },
      { year: "1995", title: "Motores de 3,0 litros", text: "A cilindrada foi reduzida como parte do pacote de segurança pós-Ímola." },
      { year: "1998", title: "Carros estreitos e pneus com sulcos", text: "Os carros ficaram mais estreitos e os pneus ganharam sulcos, para reduzir a velocidade nas curvas." },
    ],
  },
  "2000s": {
    name: "Schumacher, Ferrari e as montadoras",
    tagline: "Cinco títulos seguidos de Schumacher com a Ferrari, a chegada de Alonso e Hamilton e o ano improvável da Brawn.",
    themes: ["Domínio da Ferrari", "Equipes de montadoras", "Do V10 ao V8"],
    intro:
      "Os anos 2000 começaram com a parceria piloto-equipe mais vitoriosa que o esporte já tinha visto — Michael Schumacher e Ferrari — e foram moldados por montadoras que compraram ou criaram equipes inteiras, gastando em níveis inéditos.",
    context: [
      "Schumacher venceu cinco títulos seguidos pela Ferrari, de 2000 a 2004, chegando ao recorde de sete. Fernando Alonso e a Renault encerraram a sequência em 2005 e 2006.",
      "BMW, Honda, Toyota, Renault, Mercedes-Benz e Ferrari tinham grande envolvimento de fábrica. Quando veio a crise financeira global, a Honda saiu no fim de 2008; sua equipe foi salva e tornou-se a Brawn GP.",
      "Lewis Hamilton estreou em 2007 e venceu o campeonato de 2008 por um único ponto, na última volta no Brasil. No mesmo ano, Singapura recebeu a primeira corrida noturna da Fórmula 1.",
    ],
    technology: [
      "Michelin e Bridgestone travaram uma guerra de pneus até 2006; o conflito culminou com apenas seis carros largando no GP dos Estados Unidos de 2005. A partir de 2007 houve um fornecedor único.",
      "Os motores passaram de V10 de 3,0 litros para V8 de 2,4 litros em 2006. Foram introduzidas exigências de durabilidade e congelamento do desenvolvimento para controlar custos.",
      "Em 2009 as regras foram reescritas: os pneus slick voltaram, a aerodinâmica foi simplificada para facilitar ultrapassagens e o KERS (sistema de recuperação de energia cinética) foi permitido — a primeira tecnologia híbrida da Fórmula 1. O difusor duplo da Brawn GP explorou as novas regras e venceu os dois campeonatos.",
    ],
    developments: [
      { year: "2000", title: "O primeiro título de pilotos da Ferrari em 21 anos", text: "Schumacher vence pela Ferrari, iniciando uma sequência de cinco anos." },
      { year: "2004", title: "O sétimo título", text: "Schumacher conquista o sétimo título, superando os cinco de Fangio." },
      { year: "2005", title: "Alonso e a guerra de pneus", text: "Alonso se torna o campeão mais jovem até então. Apenas seis carros largam em Indianápolis." },
      { year: "2006", title: "Motores V8", text: "Os motores passam a ser V8 de 2,4 litros. Alonso e Renault vencem de novo." },
      { year: "2008", title: "Corridas noturnas", text: "Singapura recebe a primeira corrida noturna; Hamilton vence o título por um ponto." },
      { year: "2009", title: "Brawn GP", text: "Uma equipe salva da saída da Honda vence os dois campeonatos com Jenson Button." },
    ],
    rivalries: [
      { title: "Schumacher e Häkkinen, 2000", text: "O duelo decisivo que devolveu o título de pilotos à Ferrari." },
      { title: "Alonso e Schumacher, 2006", text: "O jovem campeão contra o heptacampeão, na última temporada de Schumacher antes da primeira aposentadoria." },
      { title: "Hamilton e Alonso, 2007", text: "Companheiros na McLaren numa temporada turbulenta; ambos perderam o título para Räikkönen por um ponto." },
      { title: "Hamilton e Massa, 2008", text: "Um título decidido nas últimas curvas de Interlagos." },
    ],
    regulationChanges: [
      { year: "2003", title: "Nova pontuação e classificação de uma volta", text: "A pontuação foi estendida até o oitavo lugar; a classificação passou a ser uma única volta lançada por piloto." },
      { year: "2005", title: "Sem troca de pneus", text: "Um único jogo de pneus tinha de durar a corrida inteira, salvo em caso de dano." },
      { year: "2006", title: "Motores V8 e classificação eliminatória", text: "V8 de 2,4 litros substituíram os V10 e chegou a classificação eliminatória em três partes." },
      { year: "2008", title: "Eletrônica padronizada", text: "Foi introduzida uma central eletrônica padrão e o controle de tração foi proibido." },
      { year: "2009", title: "Slicks, KERS e nova aerodinâmica", text: "Uma grande reformulação para aproximar os carros nas disputas." },
    ],
  },
  "2010s": {
    name: "Vettel, Hamilton e a era híbrida",
    tagline: "Quatro títulos seguidos de Vettel com a Red Bull e, depois, a Mercedes híbrida de Hamilton vencendo quase tudo.",
    themes: ["Os quatro títulos da Red Bull", "Unidades de potência turbo-híbridas", "Dinastia Mercedes"],
    intro:
      "Os anos 2010 foram divididos por uma revolução técnica. Red Bull e Sebastian Vettel dominaram os últimos anos da era V8 com excelência aerodinâmica; depois, em 2014, a Fórmula 1 adotou as unidades de potência turbo-híbridas, e a Mercedes construiu uma dinastia.",
    context: [
      "O reabastecimento durante a corrida foi proibido em 2010 e foi introduzido o sistema moderno de pontos — 25 pontos pela vitória. Vettel venceu quatro títulos seguidos, de 2010 a 2013, tornando-se o campeão mais jovem da história em 2010.",
      "A partir de 2014, a Mercedes venceu todos os campeonatos de construtores da década. Lewis Hamilton conquistou cinco títulos de pilotos no período e Nico Rosberg um, em 2016, aposentando-se logo em seguida.",
      "Após o acidente de Jules Bianchi em Suzuka, em 2014, foi criado o Safety Car Virtual. Em 2017 a Liberty Media concluiu a compra dos direitos comerciais da Fórmula 1, iniciando uma nova fase de crescimento global.",
    ],
    technology: [
      "A Pirelli tornou-se fornecedora única de pneus em 2011, com pneus feitos de propósito para se degradar e criar variedade estratégica. O DRS (sistema de redução de arrasto) foi introduzido no mesmo ano para ajudar nas ultrapassagens.",
      "A unidade de potência de 2014 combinava um V6 turbo de 1,6 litro com dois sistemas de recuperação de energia — o MGU-K, que recupera energia das frenagens, e o MGU-H, que recupera energia do turbocompressor — atingindo eficiência térmica acima de 50%.",
      "Os carros ficaram mais largos e rápidos em 2017. O halo, proteção do cockpit, tornou-se obrigatório em 2018, apesar das críticas iniciais à sua aparência.",
    ],
    developments: [
      { year: "2010", title: "Fim do reabastecimento", text: "As corridas passam a ser disputadas sem reabastecimento; Vettel conquista o primeiro título." },
      { year: "2011", title: "Pirelli e DRS", text: "Um novo fornecedor de pneus e o DRS mudam a estratégia de corrida." },
      { year: "2014", title: "A era híbrida", text: "Chegam as unidades de potência turbo-híbridas de 1,6 litro. A Mercedes inicia sua sequência de títulos." },
      { year: "2015", title: "Safety Car Virtual", text: "Um novo procedimento de neutralização é introduzido após o acidente de Bianchi." },
      { year: "2017", title: "Carros mais largos", text: "Novas regras aerodinâmicas tornam os carros muito mais rápidos. A Liberty Media assume os direitos comerciais." },
      { year: "2018", title: "O halo", text: "A proteção do cockpit torna-se obrigatória em todos os carros." },
    ],
    rivalries: [
      { title: "Vettel e Alonso", text: "Red Bull contra Ferrari, com títulos decididos na última corrida em 2010 e 2012." },
      { title: "Hamilton e Rosberg", text: "Companheiros de Mercedes e amigos de infância cuja rivalidade decidiu três títulos, de 2014 a 2016." },
      { title: "Hamilton e Vettel", text: "Mercedes contra Ferrari em 2017 e 2018 — tetracampeões disputando o quinto título." },
    ],
    regulationChanges: [
      { year: "2010", title: "Reabastecimento proibido, escala de 25 pontos", text: "Os carros largavam com todo o combustível, e a pontuação foi estendida ao décimo lugar." },
      { year: "2011", title: "DRS e Pirelli", text: "O sistema de redução de arrasto e um novo fornecedor único de pneus." },
      { year: "2014", title: "Unidades de potência turbo-híbridas", text: "Motores V6 turbo de 1,6 litro com dois sistemas de recuperação de energia; fluxo e quantidade de combustível limitados." },
      { year: "2017", title: "Carros mais largos", text: "Carroceria e pneus mais largos tornaram os carros muito mais rápidos." },
      { year: "2018", title: "O halo", text: "Proteção do cockpit obrigatória." },
    ],
  },
  "2020s": {
    name: "Verstappen, McLaren e a nova F1",
    tagline: "Verstappen domina com a Red Bull, a McLaren volta ao topo e, em 2026, Antonelli é campeão com carros e motores totalmente novos.",
    themes: ["Teto de gastos", "Volta do efeito solo", "Regulamento de 2026"],
    intro:
      "A década atual começou com uma temporada encurtada pela pandemia e trouxe as reformas estruturais mais importantes da história da Fórmula 1: um teto de gastos, a volta da aerodinâmica de efeito solo em 2022 e um regulamento totalmente novo de carro e unidade de potência em 2026.",
    context: [
      "Lewis Hamilton conquistou o sétimo título em 2020, igualando o recorde de Michael Schumacher. Em 2021, Max Verstappen venceu o primeiro, após um duelo de temporada inteira decidido na última corrida, em Abu Dhabi.",
      "Verstappen e a Red Bull dominaram os primeiros anos das regras de efeito solo; o RB19 venceu todas as corridas de 2023 menos uma. A McLaren então subiu para vencer o campeonato de construtores em 2024 e 2025, com Lando Norris conquistando o título de pilotos de 2025.",
      "O grid passa a ter onze equipes em 2026 com a chegada da Cadillac, enquanto a Audi assume a equipe Sauber como montadora de fábrica.",
    ],
    technology: [
      "Um teto de gastos criado em 2021 limita o que as equipes podem gastar em desempenho, e o tempo de testes aerodinâmicos é distribuído em escala, de modo que as equipes menos bem colocadas recebem mais horas de túnel de vento e de CFD.",
      "As regras de 2022 trouxeram de volta os túneis de efeito solo sob o assoalho e simplificaram as asas para permitir que os carros se seguissem mais de perto, com rodas maiores, de 18 polegadas.",
      "O regulamento de 2026 introduz carros menores e mais leves com aerodinâmica ativa, unidades de potência com participação elétrica muito maior e sem MGU-H, e combustíveis que precisam ser totalmente sustentáveis.",
    ],
    developments: [
      { year: "2020", title: "Uma temporada remodelada", text: "O calendário é reconstruído em torno da pandemia. Hamilton iguala os sete títulos de Schumacher." },
      { year: "2021", title: "Teto de gastos e sprints", text: "Começa o teto de gastos e o formato sprint é testado. Verstappen vence em Abu Dhabi." },
      { year: "2022", title: "Volta do efeito solo", text: "Chegam os assoalhos com túneis Venturi e as rodas de 18 polegadas." },
      { year: "2023", title: "RB19", text: "A Red Bull vence 21 dos 22 Grandes Prêmios." },
      { year: "2025", title: "A dobradinha da McLaren", text: "Lando Norris conquista o título de pilotos e a McLaren mantém o de construtores." },
      { year: "2026", title: "Um novo regulamento", text: "Aerodinâmica ativa, novas unidades de potência, combustíveis sustentáveis e um grid de onze equipes." },
    ],
    rivalries: [
      { title: "Hamilton e Verstappen, 2021", text: "Um duelo de temporada inteira entre Mercedes e Red Bull, decidido na última volta em Abu Dhabi." },
      { title: "Verstappen e Norris", text: "Red Bull contra uma McLaren em ascensão em 2024 e 2025." },
      { title: "Norris e Piastri", text: "Companheiros de McLaren que disputaram entre si o título de 2025." },
    ],
    regulationChanges: [
      { year: "2021", title: "Teto de gastos e sprints", text: "O Regulamento Financeiro limitou os gastos das equipes; corridas sprint foram introduzidas em etapas selecionadas." },
      { year: "2022", title: "Volta do efeito solo", text: "Assoalhos com túneis Venturi, asas simplificadas e rodas de 18 polegadas." },
      { year: "2025", title: "Fim do ponto da volta mais rápida", text: "O ponto extra pela volta mais rápida foi eliminado." },
      { year: "2026", title: "Um novo regulamento", text: "Aerodinâmica ativa, novas unidades de potência com maior participação elétrica e sem MGU-H, e combustível totalmente sustentável." },
    ],
  },
};
