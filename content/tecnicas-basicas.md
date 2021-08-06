---
title: "Técnicas básicas"
date: 2021-08-05T09:37:54-03:00
draft: false
previous: "regras-basicas"
next: "jogo-exemplo"
---

### Grupos

![Grupos](/img/tecnicas1.gif)


A união faz a força no Go: duas ou mais peças podem unir-se formando blocos. Esses blocos de peças são chamados **grupos** e têm tantas liberdades quanto a soma das liberdades de cada peça que o forma.

Grupo A: **13** liberdades.

Grupo B: **14** liberdades.

Grupo C: **11** liberdades.

---

### Grupos sendo capturados

![Grupos sendo capturados](/img/tecnicas2.gif)

Na figura acima podemos ver exemplos de grupos sendo capturados. Eles são capturados com a jogada 1 pois perderam todas as suas liberdades.

---
### Grupos já capturados

![Grupos já capturados](/img/tecnicas3.gif)

A situação acima corresponde a do diagrama anterior porém com as peças já capturadas. Essas peças capturadas serão colocadas no fim do jogo para diminuir o território adversário.

---
### Olhos verdadeiros X Olhos falsos

![Olhos verdadeiros e falsos](/img/tecnicas4.gif)

No diagrama acima você pode ver situações nas quais podemos ter a impressão de que os territórios estão completamente garantidos. Porém podemos ver que se as pedras **Brancas** jogarem nos pontos marcados com "x" (**olhos falsos**) elas capturam parte das pedras **Pretas** e em uma jogada seguinte podem jogar no outro “buraco” e acabar capturando todas as peças adversárias.

Isso já não acontece nos exemplos à direita. Se as **Brancas** jogarem em quaisquer dos buracos (**olhos verdadeiros**) entre as **Pretas**, estaria caracterizado o suicídio da pedra, o que não é permitido no Go.
