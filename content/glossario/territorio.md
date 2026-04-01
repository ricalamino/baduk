---
title: "Território no Go — Como Contar Pontos"
description: "Território no Go é o conjunto de pontos vazios cercados por pedras de uma cor. Aprenda como contar, construir e defender território para vencer as partidas."
date: 2026-03-27
draft: false
slug: "territorio"
type: "artigo"
tags: ["go", "baduk", "glossario", "territorio", "pontuacao", "iniciante"]
---

# Território no Go — Como Contar Pontos

O objetivo final do Go é simples: ao final da partida, o jogador que controlar **mais território** vence. Mas construir território de forma eficiente, defendê-lo e entender quando contar os pontos — tudo isso envolve uma compreensão que vai muito além do simples "cercar pontos vazios".

No Go — chamado de **Baduk** em coreano e **Weiqi** em chinês — **território** (地, *chi* em japonês) é o conjunto de pontos vazios do tabuleiro que estão completamente cercados pelas pedras de um jogador. No final da partida, esses pontos são contados e somados às pedras capturadas para determinar o vencedor.

{{< diagram sgf="/sgfs/fim-1.sgf" description="<p>Fim de jogo simplificado em um tabuleiro 5×5. As <strong>pedras brancas</strong> formam uma linha divisória na coluna C; as <strong>pedras pretas</strong> na coluna B. Os <strong>triângulos</strong> (coluna A) indicam o território preto — pontos vazios completamente cercados por pretas. Os <strong>círculos</strong> (colunas D–E) indicam o território branco.</p><p>Nesta posição, pretas têm 5 pontos de território (coluna A) e brancas têm 10 pontos (colunas D e E). Brancas vencem por 5 pontos antes do komi.</p>" >}}

## O que conta como território

Para que um conjunto de pontos vazios seja considerado território de um jogador, ele precisa estar **completamente cercado** — sem que o adversário tenha como invadir sem ser capturado. Na prática, isso significa que os pontos internos do território não têm conexão com o exterior do tabuleiro por espaços que o adversário possa ocupar.

As bordas e cantos do tabuleiro funcionam como "paredes" naturais: um grupo que toca a borda já está parcialmente cercado pelas paredes do tabuleiro, o que torna mais fácil (e comum) construir território nos cantos e nas laterais.

Por isso, a sabedoria tradicional do Go ensina: **cantos primeiro, depois lados, por último o centro**. O [fuseki](/glossario/fuseki/) (abertura) típico começa pelos cantos exatamente porque são as regiões mais eficientes para construir território com menos pedras.

## Como o território é contado

Ao final da partida, ambos os jogadores passam (indicam que não têm mais jogadas relevantes). Então:

1. Pedras mortas (grupos que não conseguem fazer dois olhos) são removidas do tabuleiro e adicionadas às capturas
2. Os pontos vazios cercados por cada cor são contados
3. As pedras capturadas de cada jogador são somadas como pontos do adversário
4. O **komi** (compensação para as brancas) é adicionado ao total das brancas — geralmente 6,5 pontos nas regras japonesas

O jogador com mais pontos (território + capturas + komi) vence.

{{< diagram sgf="/sgfs/fim-2.sgf" description="<p>Outra posição de fim de jogo em 5×5 mostrando uma divisão de território mais irregular. Brancas controlam parte da coluna C e D; pretas controlam as colunas B e parte de D.</p><p>Note que nem toda posição final é perfeitamente simétrica. Contar território requer identificar claramente quais pontos vazios estão completamente cercados por cada cor — e ignorar os pontos <a href='/glossario/dame/'>dame</a> (neutros) que ficam entre as duas posições.</p>" >}}

## Construindo território eficientemente

A construção de território eficiente é uma arte em si no Go. Algumas diretrizes básicas:

**Use os cantos e as bordas:** Os cantos requerem o menor número de pedras para cercar uma área porque as paredes do tabuleiro ajudam. Um ponto de canto como [komoku](/glossario/komoku/) (3-4) ou [hoshi](/glossario/hoshi/) (4-4) é a base de uma boa estratégia de território.

**Pense em larga escala:** Construir território aos poucos ponto a ponto é menos eficiente do que estabelecer uma estrutura ampla — um [moyo](/glossario/moyo/) — e depois solidificá-la.

**Equilíbrio entre influência e território:** Um grupo que aponta para o interior do tabuleiro (influência) cria pressão mas não garante pontos imediatamente. Um grupo solidamente fechado no canto garante território mas pode não pressionar o adversário.

**Defenda os pontos críticos:** Há momentos no jogo em que um único ponto, se ocupado pelo adversário, pode reduzir seu território em muitos pontos. Reconhecer esses pontos críticos (especialmente no [yose](/glossario/yose/)) é habilidade essencial.

## Território vs. influência

Uma distinção fundamental na estratégia do Go é entre **território** (pontos fechados e contáveis) e **influência** (pressão exercida sobre regiões abertas do tabuleiro que podem se tornar território mais tarde). Algumas aberturas — como jogar no [hoshi](/glossario/hoshi/) (4-4) — priorizam influência. Outras — como o [komoku](/glossario/komoku/) (3-4) — equilibram influência e território. O [san-san](/glossario/san-san/) (3-3) prioriza território imediato no canto.

Para praticar a visão de território e pontuação, jogue partidas em 9×9 e resolva [problemas de tsumego](/tsumego-facil/) para desenvolver o instinto de quais grupos realmente sobrevivem e contribuem para o território.

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
