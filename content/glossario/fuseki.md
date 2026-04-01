---
title: "O que é Fuseki? A Abertura no Go"
description: "Fuseki no Go (Baduk): abertura e primeiras jogadas no tabuleiro inteiro. Entenda cantos, lados e como o planejamento global molda a partida de Go no 19x19."
date: 2026-03-27
draft: false
slug: "fuseki"
type: "artigo"
tags: ["go", "baduk", "glossario", "fuseki", "iniciante"]
---

# O que é Fuseki? A Abertura no Go

**Fuseki** (布石) designa a **fase de abertura** no **Go** — jogo também conhecido como **Baduk** (coreano) e **Weiqi** (chinês). "Fu" remete a **espalhar**; "seki" a **pedras**. Na prática, é o trecho em que as primeiras dezenas de jogadas **mapeiam intenções**: cantos, lados, eventualmente centro, sempre equilibrando **velocidade**, **segurança** e **planejamento**.

Fuseki não tem "receita única" nas regras: o que muda é **estratégia**. Você ainda está sujeito a tudo que vale no resto do jogo — [movimentos ilegais](/movimentos-ilegais/), **ko**, capturas — mas o foco mental é outro: **onde** investir pedras no tabuleiro grande antes das brigas locais ficarem definitivas.

Para iniciantes, fuseki é menos sobre memorizar "primeiras linhas" e mais sobre **não quebrar o próprio jogo cedo**: não criar grupos cortáveis sem necessidade, não abrir demais os **cortes** na hora errada, e entender que **komi** (compensação ao branco em jogos even) influencia o ritmo aceitável de pretas. Em tabuleiros menores (9x9 e 13x13), "fuseki" existe, mas o ritmo é mais rápido: erros de base aparecem cedo — por isso muita gente aprende bem alternando tamanhos.

{{< diagram sgf="/sgfs/glossario-fuseki-m1.sgf" description="Lance 1: pretas jogam em D16, o ponto 4-4 (<em>hoshi</em> — ponto estrela) no canto superior esquerdo.</p><p>Uma única pedra já comunica intenção: pretas querem <strong>influência</strong> para o centro mais do que território imediato. É daqui que o fuseki começa a se desenhar — e a abertura de toda a partida depende de como os quatro cantos serão disputados." >}}

{{< diagram sgf="/sgfs/glossario-fuseki-m4.sgf" description="Quatro primeiros lances: pretas jogam D16 e D4 (dois cantos do lado esquerdo), brancas respondem em Q16 e Q4 (lado direito). Todos os quatro pontos estrela (<em>hoshi</em>) ocupados — último lance marcado.</p><p>O tabuleiro inteiro está em jogo desde o primeiro stone. Fuseki é exatamente isso: decisões de escala global <em>antes</em> das brigas locais. Relacione com <a href='/komi/'>komi</a>: em jogos even, brancas precisam compensar que pretas escolheram primeiro." >}}

## Ideias centrais na abertura

Três eixos aparecem em quase toda explicação de fuseki:

**Cantos primeiro** — porque são mais fáceis de tornar **território** com menos pedras. **Lados depois** — expandir de canto para lado costuma ser mais eficiente que brigar no centro sem base. **Centro por último** (em regra geral para iniciantes) — o centro pode dar **influência**, mas é mais difícil de consolidar em pontos seguros sem apoios.

Essas ideias conversam com o que você verá em [como começar](/como-comecar/) e em textos de [regras detalhadas](/regras-detalhadas/) quando for amarrar conceitos de pontuação e fim de partida. Fuseki é o "capítulo 0" disso: colocar pedras onde elas **ainda podem virar algo grande** sem ficarem indefesas.

Nada disso substitui leitura: fuseki bom com grupos fracos ainda perde. Por isso, mesmo quando o tema é "abertura", a prática local continua sendo alicerce — especialmente [defesa](/defesa/) e ideias de [extensão simples](/extensao-simples/).

{{< diagram sgf="/sgfs/glossario-joseki.sgf" description="Fuseki em macro, joseki em micro: a pedra em D16 (o <em>hoshi</em> que vimos na abertura) é o ponto de partida quando brancas decidirem <strong>entrar</strong> nesse canto.</p><p>Veja o artigo de <a href='/glossario/joseki/'>joseki</a>: brancas podem invadir em C17 (3-3 / san-san) e o que se segue é joseki local — não mais fuseki global. Macro e micro precisam conversar." >}}

## Fuseki, joseki e o tabuleiro inteiro

É comum confundir **fuseki** com **joseki**. Fuseki é **macro** (tabuleiro inteiro); joseki é **micro** (sequências típicas de **canto**). Uma escolha de joseki pode ser ótima no diagrama e péssima no **seu** fuseki se deixar um grupo exposto perto de forças inimigas — por isso jogadores fortes falam "esse joseki não combina com o resto".

Outro ponto: **handicap** muda completamente o fuseki. Em partidas com pedras extras de preto, a leitura de "equilíbrio" não é a mesma de uma partida **even** com **komi** — pretas já têm peso no tabuleiro; brancas têm outros planos. Se você joga com handicap, priorize **simplicidade** e **bases sólidas** antes de teorias avançadas. A ideia não é "parecer profissional" na abertura; é **não dar alvos gratuitos**.

## Fuseki no 19x19 versus tabuleiros menores

No **19x19**, a abertura é longa e as decisões de direção importam mais. No **9x9**, quase tudo vira contato cedo — fuseki existe, mas com menos "espaço para errar sem pagar". No **13x13**, você costuma sentir um meio-termo: ainda dá para pensar em cantos e lados, porém o jogo fecha mais rápido que no 19x19.

Se você está subindo de 9x9 para 13x13 ou 19x19, espere um salto não só de tempo de partida, mas de **quantidade de frentes**: fuseki grande exige mais disciplina para não correr atrás de tudo ao mesmo tempo.

## Como praticar fuseki sem se perder

Quatro hábitos simples: (1) alterne entre tabuleiros menores e o 19x19 para não saturar; (2) depois de cada partida, identifique **um** grupo ruim na abertura e procure o **primeiro desvio** que o causou; (3) estude [técnicas básicas](/tecnicas-basicas/) para que suas primeiras pedras não entrem em defesa de emergência cedo demais; (4) use [extensão simples](/extensao-simples/) como vocabulário para discutir distâncias razoáveis.

Para consolidar leitura de captura e ritmo, o [tutorial interativo](/como-capturar-pedras/) e o [tsumego fácil](/tsumego-facil/) continuam sendo o melhor "academia" — fuseki floresce quando o olho local já é confiável.

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
