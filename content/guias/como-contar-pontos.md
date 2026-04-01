---
title: "Como Contar Pontos no Go — Método Simples"
description: "Aprenda a contar pontos no Go de forma simples e precisa. Entenda território, capturas, komi e pedras mortas para saber o resultado de qualquer partida."
date: 2026-03-27
draft: false
slug: "como-contar-pontos"
type: "artigo"
tags: ["go", "baduk", "pontos", "contagem", "territorio", "fim-de-jogo", "iniciante"]
---

# Como Contar Pontos no Go — Método Simples

Uma das coisas que confunde iniciantes no Go é saber **quem ganhou**. O jogo não termina com um "xeque-mate" óbvio — termina quando ambos os jogadores concordam que não há mais jogadas úteis. Então é hora de contar.

A boa notícia: a contagem no Go é simples. Com um método claro e um pouco de prática, você vai contar qualquer posição sem dificuldade.

{{< diagram sgf="/sgfs/fim-1.sgf" description="<p>Posição de fim de jogo em 5×5 para demonstração de contagem. Brancas (coluna C) dividem o tabuleiro: pretas (coluna B) têm as colunas à esquerda, brancas têm à direita.</p><p><strong>Contagem:</strong> Triângulos (coluna A) = 5 pontos de território preto. Círculos (colunas D–E) = 10 pontos de território branco. Nenhuma captura relevante. Resultado bruto: brancas 10 × pretas 5 = brancas venceriam por 5 pontos antes do komi. Este é o princípio fundamental: contar os pontos vazios dentro do território de cada lado.</p>" >}}

## O que conta como ponto

No Go (nas regras japonesas, as mais comuns no Brasil), cada jogador soma:

1. **Pontos de território:** Cada ponto vazio completamente cercado pelas pedras de um jogador vale 1 ponto
2. **Pedras capturadas:** Cada pedra adversária capturada durante a partida vale 1 ponto
3. **Komi:** As brancas recebem 6,5 pontos de compensação pelo direito das pretas de jogar primeiro

Quem tiver mais pontos no total vence.

## Passo a passo da contagem

**Passo 1 — Remover pedras mortas:** Após ambos os jogadores passarem, identifiquem os grupos que não conseguem criar dois olhos (pedras mortas). Removam essas pedras e adicionem à pilha de capturas do adversário.

Se houver discordância sobre quais grupos estão mortos, retomem o jogo para provar o resultado.

**Passo 2 — Preencher os dame:** Os pontos [dame](/glossario/dame/) (neutros, entre os dois territórios) são preenchidos de forma alternada pelos dois jogadores. Esses pontos não valem nada — apenas "limpam" o tabuleiro para a contagem.

**Passo 3 — Organizar o território:** Rearranjar as pedras em grupos de 10 ou contá-las sistematicamente. Nas regras japonesas, é comum mover as pedras de captura para "preencher" o território adversário, facilitando a contagem visual.

**Passo 4 — Contar:** Conte os pontos vazios de cada lado. Adicione as capturas. Brancas adicionam o komi.

## Exemplo prático: tabuleiro 9×9

{{< diagram sgf="/sgfs/jogofim1.sgf" description="<p>Posição de fim de partida em 13×13 com triângulos marcando as pedras mortas. Este é o momento do <strong>Passo 1</strong>: identificar e remover grupos que não conseguem criar dois olhos.</p><p>Após remover as pedras marcadas com triângulos, o tabuleiro fica com os territórios claramente definidos. Os pontos vazios dentro de cada região cercada são contados como território. Em um jogo real, você e seu adversário apontam as pedras mortas de comum acordo — se houver dúvida, continuem jogando até o resultado ser claro.</p>" >}}

Em um 9×9 típico com pontuação final:
- Pretas têm 30 pontos de território + 3 capturas = 33 pontos
- Brancas têm 25 pontos de território + 2 capturas + 6,5 de komi = 33,5 pontos
- Resultado: Brancas vencem por 0,5 ponto

O meio-ponto no komi (6,5 em vez de 6) é proposital — elimina empates.

## Contando durante a partida (estimativa)

Para jogadores intermediários, é útil estimar o placar durante a partida para guiar decisões estratégicas. Para isso, conte aproximadamente:

- Quanto território você tem garantido em cada região
- Quanto território o adversário tem
- Qual é a diferença, incluindo o komi

Se você está perdendo, precisa de um desequilíbrio (invasão, criação de conflito). Se está ganhando, jogue sólido e conservador.

## Pontos de atenção

- **Pedras que parecem certas podem estar mortas:** Um grupo que você acha que vai sobreviver pode não conseguir criar dois olhos. Quando em dúvida, calcule.
- **Komi é definitivo:** 6,5 pontos é uma vantagem real para as brancas no Go moderno. Pretas precisam ganhar pelo menos 7 pontos de vantagem no jogo para compensar.
- **Dame não contam:** Nunca conte pontos dame como território de qualquer lado.

Para ver como o fim do jogo funciona em contexto real, explore o tutorial de [fim do jogo](/fim-do-jogo/) e as [regras detalhadas](/regras-detalhadas/).

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
