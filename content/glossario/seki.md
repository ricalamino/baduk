---
title: "O que é Seki no Go? Impasse de Vida e Morte"
description: "O seki ocorre quando dois grupos de Go compartilham as últimas liberdades e nenhum pode capturar o outro sem morrer primeiro. Veja como esse impasse funciona."
date: 2026-03-27
draft: false
slug: "seki"
type: "artigo"
tags: ["go", "baduk", "glossario", "seki", "vida-e-morte", "avancado"]
---

# O que é Seki no Go? Impasse de Vida e Morte

Imagine dois grupos de pedras — um preto, um branco — presos em uma situação onde nenhum consegue atacar o outro sem se destruir. Nenhum dos dois tem dois olhos independentes, mas nenhum pode ser capturado. Eles coexistem em um impasse permanente. Esse estado fascinante tem um nome: **seki** (関).

A palavra japonesa *seki* significa literalmente "impasse" ou "posição bloqueada". Em coreano, o equivalente é *gong-bae*; em chinês, *gongjin*. Mas o conceito é universal no Go: seki é uma posição onde dois grupos **dividem as mesmas liberdades** de tal forma que qualquer jogador que tente capitalizar sobre ela acaba se destruindo.

O seki é uma das situações mais elegantes e contraintuitivas do jogo. Enquanto a maioria dos conceitos do Go segue a lógica de "atacar ou defender", o seki exige algo raro: saber quando **não jogar**.

## Como o seki funciona

Para entender o seki, é preciso lembrar que um grupo no Go só sobrevive se tiver pelo menos duas **liberdades internas independentes** (dois olhos). Sem dois olhos, o grupo pode ser capturado quando o adversário preencher todas as suas liberdades.

No seki, dois grupos opostos compartilham exatamente as mesmas liberdades — e cada grupo depende dessas liberdades para não ser capturado imediatamente. Se um jogador preenche uma das liberdades compartilhadas, seu próprio grupo fica com apenas uma liberdade restante e pode ser capturado pelo adversário no próximo lance.

{{< diagram sgf="/sgfs/glossario-seki.sgf" description="<p>Um seki perfeito: o grupo de pretas (C7-C6-C5) e o grupo de brancas (E6-E5) compartilham exatamente as mesmas duas liberdades: <strong>D6</strong> e <strong>D5</strong> (círculos).</p><p>Se pretas jogarem em D6: o grupo preto fica com apenas D5 como liberdade — brancas capturam. Se brancas jogarem em D6: o grupo branco fica com apenas D5 — pretas capturam. O mesmo vale para D5. <strong>Nenhum dos dois lados pode jogar nas liberdades compartilhadas sem morrer.</strong> Esse é o seki.</p>" >}}

## Seki e a contagem de pontos

Uma das implicações práticas do seki é que os **pontos dentro de um seki não contam para nenhum dos lados**. As liberdades compartilhadas (como D6 e D5 no diagrama) são consideradas **dame** — pontos neutros que não pertencem a ninguém.

No final da partida, nenhum jogador tenta preencher os pontos de um seki, porque fazer isso seria suicida. Esses pontos simplesmente não são contados. Isso contrasta com situações normais, onde pontos vazios dentro do território de um jogador contam a seu favor.

Para entender melhor a contagem de pontos no Go, veja nosso artigo sobre o [fim do jogo](/fim-do-jogo/).

## Como identificar um seki

Reconhecer um seki exige prática. As características principais são:

**Liberdades compartilhadas:** Os dois grupos têm em comum pelo menos um ponto vazio que serve de liberdade para ambos. Nenhum tem liberdades independentes além dessas.

**Equilíbrio instável:** Se qualquer jogador tenta melhorar sua posição jogando em uma liberdade compartilhada, acaba criando uma vulnerabilidade imediata para seu próprio grupo.

**Ausência de dois olhos:** Nenhum dos grupos em seki tem dois olhos independentes — mas também não podem ser capturados por causa da interdependência das liberdades.

O seki mais simples envolve dois grupos compartilhando dois pontos vazios (como no diagrama). Variações mais complexas podem envolver três ou mais pontos compartilhados, múltiplos grupos, ou interações com o [ko](/glossario/ko/).

## Seki vs. outras situações de vida e morte

O seki é frequentemente confundido com outros resultados de batalhas de vida e morte:

**Seki vs. vivo com dois olhos:** Um grupo vivo com dois olhos independentes está completamente seguro — o adversário não pode ameaçá-lo. No seki, o grupo tecnicamente não tem dois olhos, mas também não pode ser atacado.

**Seki vs. morto:** Um grupo morto não tem como criar dois olhos e será capturado no final da partida. Um grupo em seki, embora também sem dois olhos, está imune à captura por causa do impasse.

**Seki vs. ko:** No ko, há uma captura ativa de pedras individuais com a proibição de recaptura imediata. No seki, não há capturas — os grupos simplesmente coexistem. O seki é mais "estático"; o ko é dinâmico e envolve ameaças constantes.

Para aprofundar sua compreensão de vida e morte, explore nossos [problemas de tsumego](/tsumego-facil/) — muitos deles terminam em seki quando a solução não é encontrada.

## Seki na prática das partidas

Para jogadores iniciantes, o seki raramente aparece de forma óbvia. Mas à medida que as partidas ficam mais complexas, situações de seki emergem naturalmente nos combates de canto e nas sequências de [joseki](/glossario/joseki/) mais avançadas.

A habilidade de reconhecer que uma posição resultará em seki — e aceitar isso como o melhor resultado possível — é um sinal de maturidade tática no Go. Muitos iniciantes tentam "melhorar" uma posição de seki e acabam perdendo o grupo inteiro. Às vezes, o melhor lance é simplesmente não jogar.

Como dizem os jogadores experientes: no seki, a ausência de jogada é a própria jogada.

Entender o seki é parte fundamental das [regras detalhadas](/regras-detalhadas/) do jogo. Se você ainda está nos primeiros passos, garanta que domina o [básico de como capturar pedras](/como-capturar-pedras/) antes de se aventurar nos detalhes do seki.

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
