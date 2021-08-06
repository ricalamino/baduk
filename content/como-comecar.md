---
title: "Como começar"
date: 2021-08-05T14:10:17-03:00
draft: true
previous: "problemas-de-37-kyu"
next: "comecando"
---

Até agora você pode até já ter entendido como matar as pedras. Entretanto, no começo de um jogo real, você tem que jogar no tabuleiro vazio.

O objetivo do Go é cercar o máximo de território possível. No início você tem que tentar cercar território, isto é, espaços vazios.


{{< diagram sgf="/sgfs/comecar-1.sgf" description="Na figura, há dois grupos de pedras pretas: um no canto superior esquerdo e um do lado direito. Cada um deles tem 9 espaços, ou 9 <strong>pontos</strong>.<br />Um grupo branco no meio também tem 9 pontos. Esses espaços completamente cercados por pedras da mesma cor são chamados de <strong>territórios</strong>.<br />Agora, os três grupos acima, cada um deles tem um território de 9 pontos. Conte o número de pedras necessárias para cercar o território.<ul><li>Canto - 6 pedras</li><li>Lado - 9 pedras</li><li>Centro - 12 pedras</li></ul><br />Portanto, você pode cercar territórios nos cantos mais eficientemente, enquanto que territórios no meio são menos eficientes. Assim, no começo do jogo, cada jogador irá tentar cercar os cantos do tabuleiro. Você raramente vê jogadas no centro.">}} 

---
Você pode ver como jogos reais começam num tabuleiro 13x13 logo abaixo.

{{< review sgf="/sgfs/comecar-2.sgf" description="Primeiro, cada jogador jogou em posições perto de dois cantos. O primeiro movimento das pretas é chamado de <strong>3-3 pontos</strong> (ou <strong>san-san</strong>) pois está localizado na terceira linha vertical e horizantal contando a partir do lado mais próximo. Esse movimento garante uma posição que pode obter o canto.<br />Na próxima jogada, brancas também jogaram um 3-3 pontos. O próximo movimento das pretas e chamado de <strong>4-4 pontos</strong> (ou <strong>hoshi</strong>) onde está marcado com um pequeno círculo preto. Esse ponto pode cercar um canto maior que uma jogada em 3-3 pontos. Entretanto, ele pode ser invadido mais facimente pois tem mais espaços entre ele e o limite do tabuleiro.<br />O quarto movimento das brancas também é muito popular.<br />É claro, você pode jogar em qualquer lugar no tabuleiro se não for um movimento ilegal. Geralmente, um jogo prossegue dos cantos aos lados e eventualmente para o centro. Embora os cantos sejam os melhores lugares para se ganhar território, ninguém faria movimentos como M2 ou N1 pois o ganho seria muito pequeno.">}} 
