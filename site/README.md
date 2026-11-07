# ORBIT — landing experimental

Projeto separado do RACEOPS. HTML/CSS/JS puro, sem build e sem dependências
(só as fontes Geist via Google Fonts).

## Rodar

```bash
cd site && python3 -m http.server 3200
```

Abra http://localhost:3200.

## Trocar nome e textos

Tudo fica no objeto `CONTENT` no topo de `main.js` (nome, frase de cada etapa,
título final, saudações). O nome também vira a palavra gigante da abertura e a
forma de partículas da etapa 02.

## O que acontece na rolagem

0. Contador 000→100 e a palavra gigante; a câmera atravessa a primeira letra.
1. Globo de partículas.
2. As partículas formam o nome.
3. Anel.
4. Celular.
5. Poeira + campo de e-mail (sem backend ainda: só confirma na tela).

O mouse empurra as partículas. O botão **1984** troca para papel claro, tinta
preta e pixels. Respeita `prefers-reduced-motion`.
