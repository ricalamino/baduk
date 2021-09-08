---
title: "Fim do jogo"
date: 2021-08-05T09:37:54-03:00
draft: false
previous: "problemas-de-36-kyu"
next: "fim-do-jogo-2"
menu: "main"
weight: 23
---

Aqui você aprenderá quando um jogo está para acabar e como contar território usando tabuleiros de 5x5.



{{< diagram sgf="/sgfs/fim-1.sgf" description="Ambos os lados fizeram 5 movimentos cada e o jogo é considerado acabado. Pretas têm 5 pontos à esquerda e as brancas têm 10 pontos à direita.</p><p>Portanto brancas ganharam por 5 pontos.</p><p>Você pode calcular o território contando as interseções de linhas verticais e horizontais. Cantos e bordas também são território. Lembre-se que as pedras <strong>não</strong> são contadas como território.">}} 

{{< diagram sgf="/sgfs/fim-2.sgf" description="Um jogo é considerado acabado quando ambos os lados passam, pois eles não querem fazer mais movimentos.</p><p>Por que podemos considerá-lo um jogo terminado? Continuando o jogo, assuma que as pretas fizeram um movimento dentro do território das brancas.</p><p>As brancas podem facilemente capturar a invasora. Veja na figura.</p><p>Portanto as pretas não precisam fazer tal movimento.">}} 

{{< diagram sgf="/sgfs/fim-3.sgf" description="Agora, o que acontece se você fizer um movimento dentro do seu próprio território?</p><p>Com esse movimento você reduziria o seu território de 1 ponto. Ninguém quer fazer isso!</p><p>Portanto, a primeira figura dessa página é considerada como fim do jogo. (Embora algumas vezes você tenha que jogar dentro do seu próprio território para fazer dois olhos ou para fortalecer seus limites.)">}} 

{{< diagram sgf="/sgfs/fim-4.sgf" description="Pretas têm 5 pontos e Brancas têm 6 pontos - brancas ganharam por 1 ponto.</p><p>E esses 2 pontos no centro? Eles são chamados \"<strong>Dame</strong>\" - área neutra - a qual não pertence a nenhum lado.</p><p>Você pode jogar aqui se você quiser, embora você não perderá nem ganhará nenhum ponto.">}} 

---

### Quando um jogo acaba?

- Quando ambos os lados não querem jogar em lugar nenhum e passam sucessivamente. Então ambos os territórios são contados e o maior vence. Sua pontuação final é seu território no tabuleiro, mais as pedras capturadas por você que foram removidas do tabuleiro.
- Quando um dos lados acha que não pode ganhar não importando o que faça e então desiste. (Diferente de muitos outros jogos, isso é considerado uma saída honrosa. Continuar jogando face a uma derrotata iminente não o é.)

