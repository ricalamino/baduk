---
title: "Seu Primeiro Jogo de Go 9x9 — Passo a Passo"
description: "Guia passo a passo para seu primeiro jogo de Go em 9x9. Aprenda a abertura, o meio-jogo e o fim de jogo de forma simples e prática para iniciantes absolutos."
date: 2026-03-27
draft: false
slug: "primeiro-jogo-9x9"
type: "artigo"
tags: ["go", "baduk", "iniciante", "9x9", "primeiro-jogo", "guia"]
---

# Seu Primeiro Jogo de Go 9x9 — Passo a Passo

Você aprendeu as regras básicas do Go e agora quer jogar sua primeira partida real. Ótimo — mas onde começar? Qual é a primeira pedra a jogar? Como desenvolver sua posição? Quando a partida acaba?

Este guia vai te levar pela sua primeira partida de Go em um tabuleiro 9×9, passo a passo, com princípios simples que funcionam mesmo para iniciantes absolutos.

Por que 9×9? Porque é o tamanho ideal para aprender. As partidas duram entre 10 e 20 minutos, os conceitos são visíveis rapidamente, e você consegue jogar muitas partidas em pouco tempo — o que é essencial para aprender. Veja mais sobre os tamanhos em [tabuleiros de Go](/tamanhos-tabuleiro/).

{{< diagram sgf="/sgfs/comecar-2.sgf" description="<p>Abertura em 13×13 mostrando as primeiras 4 jogadas: cada jogador escolhe pontos nos cantos ou próximos a eles, projetando influência para o interior do tabuleiro. No 9×9, o princípio é o mesmo: comece nos cantos, depois os lados, depois o centro.</p><p>Por que os cantos? Porque são as regiões onde você consegue construir <a href='/glossario/territorio/'>território</a> com o menor número de pedras — as paredes do tabuleiro ajudam. Uma pedra no canto do 9×9 já 'cobre' um terço das fronteiras de um espaço de canto possível.</p>" >}}

## A fase de abertura (primeiras jogadas)

No tabuleiro 9×9, o centro é o ponto E5. Os quatro cantos são D4, D6, F4, F6 (em notação WGo). Os lados: D5, E4, E6, F5.

**Princípio:** Comece pelos cantos. Jogar no centro do 9×9 nas primeiras jogadas geralmente não é eficiente.

**Primeira jogada:** Jogue em um dos cantos — algo como D4, D6, F4 ou F6. Essas são boas posições próximas aos pontos de canto que estabelecem presença na região.

**Segunda jogada:** Se o adversário jogou em um canto, jogue em um canto diferente. Se possível, no canto oposto (se ele jogou em D4, considere F6).

**Terceiro e quarto movimentos:** Continue desenvolvendo os outros cantos ou expanda a partir do canto que já tem sua pedra.

## O meio-jogo

Após as primeiras 4-6 jogadas, o jogo entra na fase de combate e consolidação:

**Conecte seus grupos:** Pedras isoladas são vulneráveis. Tente conectar suas pedras para formar grupos sólidos com [liberdades](/glossario/liberdades/) suficientes.

**Faça dois olhos:** Cada grupo precisa ter (ou estar perto de conseguir) dois [olhos](/glossario/olhos/) independentes para sobreviver. Um grupo sem dois olhos é sempre uma ameaça de morte.

**Responda as ameaças:** Quando o adversário coloca um grupo seu em [atari](/glossario/atari/), você geralmente precisa responder — a menos que tenha algo mais urgente.

**Não jogue muito denso:** Uma concentração de 5 pedras em um espaço de 3×3 é ineficiente. As pedras precisam de espaço para funcionar.

{{< diagram sgf="/sgfs/exemplo1.sgf" description="<p>Uma partida completa de 9×9 do início ao fim. Observe a progressão: as primeiras jogadas estabelecem presença nos cantos; o meio-jogo gera combates e capturas; o fim de jogo fecha as fronteiras.</p><p>Esta posição final mostra como o tabuleiro 9×9 funciona na prática: cada ponto vazio nas regiões fechadas conta como <a href='/glossario/territorio/'>território</a>. Contar quem tem mais espaço cercado determina o vencedor. No seu primeiro jogo, não se preocupe tanto com a contagem — foque em fazer seus grupos sobreviverem e em construir algum território.</p>" >}}

## O fim do jogo

A partida termina quando ambos os jogadores passam consecutivamente (ou quando concordam que não há mais jogadas úteis). Então:

1. Remova as pedras mortas (grupos que não conseguem criar dois olhos)
2. Some os pontos de cada lado: pontos vazios cercados + pedras adversárias capturadas
3. Adicione o [komi](/komi/) (6,5 pontos para as brancas nas regras japonesas)
4. Quem tiver mais pontos vence

**Para iniciantes:** No começo, é normal ter dúvidas sobre se um grupo está "realmente morto" ou não. Quando em dúvida, continue jogando até o resultado ficar claro.

## Princípios para seu primeiro jogo

1. **Priorize fazer dois olhos nos seus grupos maiores**
2. **Não sacrifique grupos grandes por movimentos táticos pequenos**
3. **Responda os ataris adversários, a menos que esteja claramente avançando em outro lugar**
4. **Quando perder um grupo, continue jogando — pode virar o jogo com outros grupos**
5. **Tente fechar território antes de o adversário entrar**

Não espere ganhar nas primeiras partidas — aprender a não perder grupos desnecessariamente já é um grande progresso. Depois de 10-20 partidas, você vai começar a ver os padrões.

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
