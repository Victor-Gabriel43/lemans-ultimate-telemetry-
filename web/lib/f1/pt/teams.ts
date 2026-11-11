import type { Milestone } from "../types";

type TeamText = { summary: string; history: string[]; identity: string; timeline: Milestone[]; base?: string; founders?: string };

/** Portuguese (Brazil) editorial text for team profiles. Keys are editorial team slugs (= F1DB constructor ids). */
export const TEAMS_PT: Record<string, TeamText> = {
  ferrari: {
    summary: "A única equipe a disputar todas as temporadas do Mundial — e o construtor mais vitorioso.",
    history: [
      "A Scuderia Ferrari nasceu como braço de corridas da Alfa Romeo antes de Enzo Ferrari construir carros com o próprio nome. A Ferrari disputou todas as temporadas do Mundial desde 1950 e venceu sua primeira corrida do campeonato em Silverstone, em 1951.",
      "Sua história vem em ondas: os anos de Ascari no início da década de 1950, a 156 de 1,5 litro de 1961, a retomada liderada por Lauda em meados dos anos 1970 e a era Schumacher, que trouxe cinco títulos duplos seguidos, de 2000 a 2004.",
      "A Ferrari é única por construir tanto o chassi quanto os motores, e pela devoção popular — os tifosi — que inspira, sobretudo em Monza.",
    ],
    identity: "O rosso corsa — o vermelho de corrida da Itália — e o cavalinho rampante definem a equipe desde os primeiros dias.",
    timeline: [
      { year: "1950", title: "Estreia", text: "Disputa a primeira temporada do campeonato." },
      { year: "1952", title: "Primeiro título de pilotos", text: "Alberto Ascari." },
      { year: "1961", title: "Primeiro título de construtores", text: "Com a 156." },
      { year: "1975", title: "A retomada de Lauda", text: "A 312T devolve a Ferrari ao topo." },
      { year: "2000", title: "Os anos Schumacher", text: "Começam cinco títulos de pilotos seguidos." },
      { year: "2008", title: "Último título de construtores", text: "O 16º título de construtores." },
    ],
  },
  mclaren: {
    summary: "Fundada pelo neozelandês Bruce McLaren, uma das equipes mais vitoriosas da história do esporte.",
    history: [
      "Bruce McLaren fundou a equipe em 1963, e ela estreou na Fórmula 1 em 1966. Após a morte de McLaren num acidente em testes em 1970, a equipe seguiu em frente e conquistou os primeiros títulos com Emerson Fittipaldi em 1974.",
      "Sob o comando de Ron Dennis a partir do início dos anos 1980, a McLaren introduziu o monocoque de fibra de carbono e, com motores TAG-Porsche e depois Honda, tornou-se a equipe dominante do fim da década, culminando na temporada quase perfeita de 1988.",
      "Depois de um longo jejum, a equipe foi reconstruída nos anos 2020 e venceu o campeonato de construtores em 2024 e 2025, com Lando Norris conquistando o título de pilotos de 2025.",
    ],
    identity: "O laranja papaia era a cor original de Bruce McLaren; a equipe voltou a ela na era moderna, depois de décadas de pinturas de patrocinadores.",
    timeline: [
      { year: "1966", title: "Estreia na F1", text: "Bruce McLaren inscreve o próprio carro." },
      { year: "1974", title: "Primeiros títulos", text: "Fittipaldi vence o título de pilotos; a McLaren, o de construtores." },
      { year: "1981", title: "Fibra de carbono", text: "O MP4/1 introduz o monocoque de compósito." },
      { year: "1988", title: "MP4/4", text: "15 vitórias em 16 corridas." },
      { year: "2024", title: "De volta ao topo", text: "Primeiro título de construtores desde 1998." },
    ],
  },
  williams: {
    summary: "A grande equipe independente, campeã graças à engenharia de Patrick Head e Adrian Newey.",
    history: [
      "Frank Williams já dirigia equipes desde o fim dos anos 1960; a Williams Grand Prix Engineering, fundada com o engenheiro Patrick Head, começou a competir em 1977 e venceu pela primeira vez em Silverstone, em 1979.",
      "A Williams conquistou títulos com Alan Jones, Keke Rosberg e Nelson Piquet e dominou o início dos anos 1990 com motores Renault e suspensão ativa. Seu último título de construtores veio em 1997.",
      "A família Williams vendeu a equipe em 2020. Ela continua a correr a partir de Grove, em Oxfordshire.",
    ],
    identity: "Uma independente guiada pela engenharia, historicamente associada a pinturas azuis e brancas.",
    timeline: [
      { year: "1977", title: "Fundação", text: "Frank Williams e Patrick Head." },
      { year: "1980", title: "Primeiros títulos", text: "Alan Jones e o campeonato de construtores." },
      { year: "1992", title: "FW14B", text: "A suspensão ativa domina." },
      { year: "1997", title: "Nono título de construtores", text: "Villeneuve vence o título de pilotos." },
    ],
  },
  mercedes: {
    summary: "Das Flechas de Prata dos anos 1950 à equipe mais dominante da era híbrida.",
    history: [
      "A Mercedes-Benz estreou na Fórmula 1 em 1954 e 1955 com o W196, vencendo os dois títulos de pilotos com Fangio antes de se retirar das corridas.",
      "Voltou como fornecedora de motores nos anos 1990, equipando os títulos da McLaren. Em 2010 comprou a Brawn GP, cuja linhagem remonta a Honda, BAR e Tyrrell.",
      "A partir de 2014, com sua unidade de potência turbo-híbrida, a Mercedes venceu oito campeonatos de construtores seguidos — um recorde — e sete títulos de pilotos.",
    ],
    identity: "As “Flechas de Prata” — originalmente carrocerias de alumínio sem pintura nos anos 1930 — e um detalhe verde-água na era moderna.",
    timeline: [
      { year: "1954", title: "W196", text: "Estreia e primeiro título com Fangio." },
      { year: "2010", title: "Volta como equipe de fábrica", text: "Compra a Brawn GP." },
      { year: "2014", title: "Domínio híbrido", text: "O primeiro de oito títulos de construtores seguidos." },
      { year: "2021", title: "Oitavo seguido", text: "Um recorde no campeonato de construtores." },
    ],
  },
  "red-bull": {
    summary: "A equipe de uma fabricante de bebidas que se tornou tetracampeã dupla e fabricante de unidades de potência.",
    history: [
      "A Red Bull comprou a equipe Jaguar no fim de 2004. Com o projetista Adrian Newey, tornou-se a equipe de ponta do fim da era V8, vencendo quatro títulos duplos seguidos com Sebastian Vettel.",
      "Max Verstappen levou a equipe a novos títulos sob as regras de efeito solo de 2022, e o RB19 de 2023 venceu 21 de 22 corridas.",
      "Para 2026, a Red Bull constrói as próprias unidades de potência por meio da Red Bull Powertrains, em parceria com a Ford.",
    ],
    identity: "Azul-escuro com vermelho e amarelo — as cores da marca controladora.",
    timeline: [
      { year: "2005", title: "Primeira temporada", text: "Assume a inscrição da Jaguar." },
      { year: "2010", title: "Primeiros títulos", text: "Vettel e o campeonato de construtores." },
      { year: "2023", title: "RB19", text: "21 vitórias em 22 corridas." },
      { year: "2026", title: "Motores próprios", text: "Red Bull Powertrains com a Ford." },
    ],
  },
  lotus: {
    summary: "A equipe de Colin Chapman: a inovadora mais influente da história da Fórmula 1.",
    history: [
      "A Lotus introduziu o monocoque (Lotus 25), o motor estrutural (Lotus 49), os radiadores laterais e a cunha (Lotus 72) e o efeito solo (Lotus 78 e 79).",
      "Venceu sete campeonatos de construtores e seis títulos de pilotos com Clark, Hill, Rindt, Fittipaldi e Andretti. Após a morte de Chapman, em 1982, a equipe entrou em declínio e deixou de competir depois de 1994.",
    ],
    identity: "Verde de corrida britânico com amarelo, depois o vermelho, branco e dourado de 1968 e o preto e dourado dos anos 1970 — as primeiras grandes pinturas de patrocinadores.",
    timeline: [
      { year: "1962", title: "Lotus 25", text: "Chega o monocoque." },
      { year: "1967", title: "Lotus 49", text: "Estreia do Cosworth DFV." },
      { year: "1970", title: "Lotus 72", text: "O título de Rindt." },
      { year: "1978", title: "Lotus 79", text: "O efeito solo vence os dois títulos." },
    ],
  },
  brabham: {
    base: "Surrey",
    summary: "Fundada por um campeão, depois comprada por Bernie Ecclestone e casa dos projetos ousados de Gordon Murray.",
    history: [
      "Jack Brabham venceu o título de 1966 com o próprio carro e Denny Hulme repetiu em 1967, ambos com motores Repco.",
      "Sob o comando de Bernie Ecclestone, o projetista Gordon Murray criou carros inovadores, como o BT46B “carro-ventilador” e o BT52 de motor BMW, campeão em 1983. A equipe fechou em 1992.",
    ],
    identity: "Lembrada pelos carros brancos e azuis da era Parmalat.",
    timeline: [
      { year: "1966", title: "O título de Brabham", text: "Um piloto vence com o próprio carro." },
      { year: "1978", title: "BT46B", text: "O carro-ventilador." },
      { year: "1983", title: "Campeões turbo", text: "O segundo título de Piquet." },
    ],
  },
  tyrrell: {
    summary: "A equipe de Ken Tyrrell venceu com Jackie Stewart e correu com o famoso seis-rodas.",
    history: [
      "Ken Tyrrell inscreveu a Matra de Stewart em 1969 e depois passou a construir os próprios carros. A Tyrrell venceu o título de construtores em 1971 e os títulos de pilotos de Stewart em 1971 e 1973.",
      "Em 1976 o P34 de seis rodas venceu o GP da Suécia. A equipe foi vendida no fim de 1998 e virou BAR — o início da linhagem que leva à Mercedes atual.",
    ],
    identity: "Carros azul-escuros e a fama de equipe familiar que descobria talentos.",
    timeline: [
      { year: "1971", title: "Campeões", text: "Títulos de construtores e de pilotos." },
      { year: "1976", title: "P34", text: "Um carro de seis rodas vence." },
    ],
  },
  renault: {
    summary: "A montadora que introduziu o turbo e depois venceu com Fernando Alonso. Hoje corre como Alpine.",
    history: [
      "A Renault estreou em 1977 com o primeiro motor turbo da Fórmula 1, vencendo pela primeira vez em 1979. Como fornecedora de motores, levou Williams e Benetton a títulos nos anos 1990.",
      "A Renault comprou a equipe da Benetton em Enstone para 2002 e venceu títulos duplos em 2005 e 2006 com Alonso. Desde então, a equipe de Enstone correu como Lotus, Renault de novo e — desde 2021 — Alpine.",
    ],
    identity: "Amarelo e preto nos anos turbo; o azul e rosa da Alpine na era moderna.",
    timeline: [
      { year: "1977", title: "Estreia do turbo", text: "O RS01." },
      { year: "1979", title: "Primeira vitória turbo", text: "GP da França." },
      { year: "2005", title: "Campeões", text: "Alonso e o título de construtores." },
      { year: "2021", title: "Alpine", text: "A equipe passa a se chamar Alpine." },
    ],
  },
  benetton: {
    summary: "A equipe da marca de roupas que levou Michael Schumacher a dois títulos.",
    history: [
      "A Benetton comprou a equipe Toleman para 1986. Com Flavio Briatore e Ross Brawn, venceu os títulos de Schumacher em 1994 e 1995, e o campeonato de construtores de 1995 com motores Renault.",
      "A Renault comprou a equipe, que passou a se chamar Renault a partir de 2002.",
    ],
    identity: "Pinturas multicoloridas que refletiam a marca de roupas.",
    timeline: [
      { year: "1994", title: "Primeiro título de Schumacher", text: "Com o B194 de motor Ford." },
      { year: "1995", title: "Campeões duplos", text: "Com motores Renault." },
    ],
  },
  "aston-martin": {
    summary: "A equipe de fábrica da marca britânica de esportivos, com um novo complexo em Silverstone.",
    history: [
      "A Aston Martin correu brevemente na Fórmula 1 em 1959 e 1960. A equipe moderna adotou o nome em 2021, dando continuidade a uma linhagem de Silverstone que começou como Jordan em 1991.",
      "Fernando Alonso chegou em 2023. A partir de 2026 a equipe recebe unidades de potência de fábrica da Honda.",
    ],
    identity: "Verde de corrida britânico com detalhes em verde-limão.",
    timeline: [
      { year: "2021", title: "O nome Aston Martin", text: "A Racing Point é rebatizada." },
      { year: "2023", title: "Chega Alonso", text: "Um bicampeão mundial entra na equipe." },
      { year: "2026", title: "Parceria com a Honda", text: "Unidades de potência de fábrica." },
    ],
  },
  audi: {
    summary: "A equipe suíça de Peter Sauber, trampolim de futuros campeões, torna-se a equipe de fábrica da Audi em 2026.",
    history: [
      "A Sauber estreou na Fórmula 1 em 1993 e ficou conhecida por dar a estreia a pilotos como Kimi Räikkönen e Charles Leclerc. Foi a equipe de fábrica da BMW de 2006 a 2009 e correu com o nome Alfa Romeo de 2019 a 2023.",
      "A Audi comprou a equipe e estreia como montadora de fábrica em 2026.",
    ],
    identity: "Independência suíça, depois os quatro anéis da Audi.",
    timeline: [
      { year: "1993", title: "Estreia", text: "A Sauber chega à Fórmula 1." },
      { year: "2006", title: "BMW", text: "Torna-se BMW Sauber." },
      { year: "2026", title: "Audi", text: "Estreia como montadora de fábrica." },
    ],
  },
  "racing-bulls": {
    summary: "A segunda equipe da Red Bull, construída sobre as bases da Minardi, e celeiro de jovens pilotos.",
    history: [
      "Fundada como Minardi, uma independente italiana que correu de 1985 a 2005 e deu a estreia a Fernando Alonso. A Red Bull a comprou e a rebatizou como Toro Rosso a partir de 2006.",
      "Sebastian Vettel venceu o GP da Itália de 2008 pela equipe. Desde então ela correu como AlphaTauri, RB e Racing Bulls.",
    ],
    identity: "Um campo de formação para o programa de jovens pilotos da Red Bull.",
    timeline: [
      { year: "2006", title: "Toro Rosso", text: "A Red Bull assume a Minardi." },
      { year: "2008", title: "Monza", text: "A primeira vitória de Vettel." },
    ],
  },
  haas: {
    summary: "A equipe americana fundada por Gene Haas, construída sobre uma parceria técnica estreita com a Ferrari.",
    history: [
      "A Haas estreou em 2016, o primeiro construtor de comando americano em três décadas, e marcou pontos na estreia, na Austrália. Compra da Ferrari muitos componentes, incluindo as unidades de potência.",
    ],
    identity: "Cinza, branco e vermelho; bases na Carolina do Norte e em Banbury.",
    timeline: [{ year: "2016", title: "Estreia", text: "Pontos na primeira corrida." }],
  },
  cadillac: {
    base: "Fishers (Indiana) / Silverstone",
    summary: "A marca da General Motors chega como a 11ª equipe em 2026.",
    history: [
      "A inscrição da Cadillac foi aprovada em 2025, ampliando o grid para onze equipes em 2026. A equipe planeja construir as próprias unidades de potência mais adiante na década, usando motores Ferrari no início.",
    ],
    identity: "Um novo esforço de fábrica americano.",
    timeline: [{ year: "2026", title: "Temporada de estreia", text: "O grid cresce para onze equipes." }],
  },
  "alfa-romeo": {
    base: "Milão",
    summary: "Venceu os dois primeiros Mundiais com os 158 e 159 equipados com compressor.",
    history: [
      "O “Alfetta” da Alfa Romeo havia sido projetado antes da guerra. Venceu os dois primeiros campeonatos, com Farina em 1950 e Fangio em 1951, depois do que a Alfa se retirou.",
      "A marca voltou como construtora de 1979 a 1985 e depois emprestou o nome à equipe Sauber, de 2019 a 2023.",
    ],
    identity: "O vermelho de corrida italiano e o trevo de quatro folhas.",
    timeline: [
      { year: "1950", title: "Primeiro campeão", text: "Farina vence o título inaugural." },
      { year: "1951", title: "Fangio", text: "Segundo título, depois a retirada." },
    ],
  },
  maserati: {
    summary: "Fabricante do 250F, o carro com que Fangio venceu o quinto título.",
    history: [
      "A Maserati forneceu carros a muitas equipes particulares nos anos 1950. O 250F foi um dos grandes carros de Grand Prix de motor dianteiro, e Fangio venceu o título de 1957 com ele.",
    ],
    identity: "O tridente de Bolonha.",
    timeline: [{ year: "1957", title: "O quinto de Fangio", text: "Título com o 250F." }],
  },
  vanwall: {
    founders: "Tony Vandervell",
    summary: "O primeiro campeão de construtores, em 1958.",
    history: [
      "O industrial Tony Vandervell queria vencer as equipes italianas com um carro britânico. Com chassi de Colin Chapman e carroceria do aerodinamicista Frank Costin, a Vanwall venceu o primeiro campeonato de construtores, em 1958.",
    ],
    identity: "Verde de corrida britânico.",
    timeline: [{ year: "1958", title: "Primeiro campeão de construtores", text: "Moss e Tony Brooks vencem corridas." }],
  },
  cooper: {
    summary: "A equipe que tornou o motor central o padrão da Fórmula 1.",
    history: [
      "Os pequenos carros de Charles e John Cooper levavam o motor atrás do piloto. Jack Brabham venceu os campeonatos de 1959 e 1960 pela Cooper, e todas as equipes competitivas logo adotaram a configuração.",
    ],
    identity: "Carros verdes com uma faixa branca.",
    timeline: [
      { year: "1959", title: "Campeões duplos", text: "O carro de motor central vence." },
      { year: "1960", title: "De novo", text: "Segundo título duplo." },
    ],
  },
  brm: {
    summary: "British Racing Motors, campeã com Graham Hill em 1962.",
    history: ["A BRM nasceu como um ambicioso projeto nacional. Depois de anos de dificuldade, venceu os dois campeonatos de 1962 com Graham Hill."],
    identity: "Verde-escuro com uma faixa laranja no bico.",
    timeline: [{ year: "1962", title: "Campeões", text: "O primeiro título de Graham Hill." }],
  },
  matra: {
    base: "Île-de-France",
    summary: "Empresa aeroespacial francesa cujo carro, inscrito por Ken Tyrrell, venceu os títulos de 1969.",
    history: ["A Matra aplicou técnicas de construção aeroespacial aos carros de corrida. A Matra MS80 inscrita pela Tyrrell levou Jackie Stewart ao campeonato de 1969."],
    identity: "Azul da França.",
    timeline: [{ year: "1969", title: "Campeões", text: "Stewart e a MS80." }],
  },
  brawn: {
    summary: "Correu uma única temporada — e venceu os dois campeonatos.",
    history: [
      "Quando a Honda saiu, em dezembro de 2008, o chefe de equipe Ross Brawn liderou a compra pela própria direção. Com motor Mercedes e um carro projetado em torno do difusor duplo, a Brawn GP venceu os dois títulos de 2009 antes de se tornar a Mercedes.",
    ],
    identity: "Branco com detalhes amarelo-fluorescente.",
    timeline: [{ year: "2009", title: "Campeões duplos", text: "Na única temporada." }],
  },
};
