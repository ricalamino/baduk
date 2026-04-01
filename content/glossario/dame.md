---
title: "O que é Dame no Go? Pontos Neutros"
description: "Dame são os pontos neutros do Go: pontos vazios entre territórios que não valem ponto algum. Entenda sua função no fim do jogo e nas regras japonesas."
date: 2026-03-27
draft: false
slug: "dame"
type: "artigo"
tags: ["go", "baduk", "glossario", "dame", "fim-de-jogo", "iniciante"]
---

# O que é Dame no Go? Pontos Neutros

Ao final de uma partida de Go, quando ambos os jogadores concordam que não há mais jogadas valiosas a fazer, ainda sobram alguns pontos vazios no tabuleiro. Esses pontos estão na fronteira entre territórios — nenhum dos dois jogadores os controla, e jogar neles não muda a pontuação. Esses pontos neutros têm um nome específico: **dame** (ダメ).

No Go — chamado de **Baduk** em coreano e **Weiqi** em chinês — a palavra *dame* (駄目) originalmente significa "inútil" ou "sem valor" em japonês. No contexto do jogo, é exatamente isso: pontos que não contribuem para o território de ninguém.

{{< diagram sgf="/sgfs/fim-1.sgf" description="<p>Posição de fim de jogo em 5×5. A divisão é clara: brancas (coluna C) dividem o tabuleiro de pretas (coluna B). Os <strong>triângulos</strong> (coluna A) marcam território preto; os <strong>círculos</strong> (colunas D–E) marcam território branco.</p><p>Nessa posição não há pontos <strong>dame</strong> — as fronteiras estão completamente fechadas. Em posições reais de 19×19, os pontos entre as fronteiras que não pertencem a nenhum lado são os dame: ambos os jogadores os preenchem de forma alternada antes da contagem, sem custo para nenhum dos lados.</p>" >}}

## Onde o dame aparece

O dame tipicamente aparece em três situações:

**Fronteiras entre territórios:** Quando dois territórios (um preto e um branco) se encontram sem que haja uma linha clara de separação, os pontos na fronteira frequentemente se tornam dame.

**Região de [seki](/glossario/seki/):** Os pontos internos de uma posição de seki (onde dois grupos compartilham liberdades e nenhum pode atacar o outro) são, por definição, dame.

**Pontos isolados:** Pontos vazios que estão cercados de tal forma que nenhum dos dois lados consegue controlá-los.

## Como o dame é tratado no fim da partida

Nas **regras japonesas** (as mais usadas no Brasil e no Japão), os pontos dame **não são contados** e **não precisam ser preenchidos** para a contagem final. Ambos os jogadores simplesmente concordam que esses pontos são neutros e os desconsideram na contagem.

Na prática, ao final de uma partida, ambos os jogadores preenchem os dame juntos (de forma alternada) para "limpar" o tabuleiro antes de contar os territórios. Isso facilita a visualização e a contagem.

{{< diagram sgf="/sgfs/jogofim1.sgf" description="<p>Posição de fim de jogo em 13×13. Os <strong>triângulos</strong> marcam pedras mortas (grupos que não conseguem criar dois olhos e serão removidos antes da contagem). Após remover as pedras mortas, os pontos vazios adjacentes a elas se tornam território do adversário — exceto aqueles que ficam na fronteira entre os dois territórios, que se tornam <strong>dame</strong>.</p><p>Observe como, após a remoção das pedras marcadas, as fronteiras do tabuleiro ficam definidas. Os pontos na borda entre os dois territórios que não pertencem claramente a nenhum lado são os dame que serão preenchidos de forma alternada antes da contagem.</p>" >}}

## Dame e a ordem das jogadas no yose

Um erro comum de iniciantes é jogar os pontos dame **antes** de completar as jogadas de [yose](/glossario/yose/) (fim de jogo) que ainda têm valor. Como o dame não vale nada, preenchê-lo antes de uma jogada de yose real é, efetivamente, perder uma jogada.

A ordem correta é: primeiro, complete todas as jogadas de yose com valor real (fechando fronteiras, fazendo hane de borda, etc.); depois, preencha os dame juntos com o adversário.

## Dame no contexto do seki

Nos casos de [seki](/glossario/seki/) — o impasse onde dois grupos compartilham liberdades sem poder capturar um ao outro — os pontos internos compartilhados são tratados como dame especiais. **Nas regras japonesas, esses pontos não contam para nenhum dos jogadores**, mesmo que pareçam "dentro" de um grupo.

## A importância de reconhecer o dame

Reconhecer quais pontos são dame (e portanto podem ser ignorados na análise estratégica) é uma habilidade que ajuda a focar nas jogadas que realmente importam. Uma dica prática: se você está em dúvida se um ponto é dame ou tem valor de yose, pergunte: "se eu não jogar aqui, o adversário pode me prejudicar jogando?" Se a resposta for não, provavelmente é dame. Se for sim, tem valor de yose.

Entender o dame também conecta-se a entender o [fim do jogo](/fim-do-jogo/) como um todo, incluindo quando a partida termina e como a contagem é feita. Explore as [regras detalhadas](/regras-detalhadas/) para uma visão completa.

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
