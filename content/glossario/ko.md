---
title: "Regra do Ko no Go — Guia Completo"
description: "A regra do Ko proíbe repetir posições no Go (Baduk). Entenda o que é ko, como funciona a luta pelo ko e por que é uma das regras mais estratégicas do jogo."
date: 2026-03-27
draft: false
slug: "ko"
type: "artigo"
tags: ["go", "baduk", "glossario", "ko", "regras", "intermediario"]
---

# Regra do Ko no Go — Guia Completo

O Go tem poucas regras — mas uma delas é tão profunda que gera estratégias inteiras, lances de blefe e situações dramáticas que determinam o resultado de partidas inteiras. Essa regra é o **ko** (劫).

Ko é uma palavra japonesa que pode ser traduzida como "eternidade" ou "conflito perpétuo" — e o nome é muito adequado. Em coreano, o mesmo conceito é chamado de *kwae*; em chinês, de *jie*. Mas em todos os idiomas do Go, o mecanismo é o mesmo: **é proibido fazer uma jogada que recrie a mesma posição de tabuleiro que existia no turno anterior**.

Sem essa regra, dois jogadores poderiam simplesmente capturar e recapturar a mesma pedra indefinidamente, e a partida nunca terminaria. O ko impede esse loop eterno.

## Como o ko surge

O ko ocorre quando duas pedras (uma de cada cor) estão em uma configuração onde cada uma ameaça capturar a outra e, ao fazer isso, recriaria a posição anterior. Observe a sequência clássica:

{{< diagram sgf="/sgfs/regrasko1.sgf" description="<p>Posição inicial do ko num tabuleiro 7×7. A pedra branca em <strong>C5</strong> está em atari: sua única liberdade é <strong>D5</strong> (marcado A). Pretas podem jogar em D5 e capturar a pedra branca.</p><p>Mas após a captura, a nova pedra preta em D5 ficará em atari também — brancas gostariam de recapturar imediatamente em C5. É aqui que a regra do ko entra em cena.</p>" >}}

{{< diagram sgf="/sgfs/regrasko2.sgf" description="<p>Pretas jogaram em D5 (lance 1) e capturaram a pedra branca em C5 (triângulo). Agora a pedra preta em D5 tem apenas C5 como liberdade.</p><p>Brancas <strong>não podem</strong> recapturar imediatamente em C5 — isso recriaria a posição exata do diagrama anterior, o que a regra do ko proíbe. Brancas devem jogar em outro ponto primeiro, por exemplo em B (marcado), que é uma <em>ameaça de ko</em>.</p>" >}}

## A luta pelo ko

Quando existe um ko no tabuleiro, nenhum dos dois lados quer simplesmente ignorá-lo — o ponto em jogo costuma ser valioso. Isso dá origem a uma dinâmica chamada **luta pelo ko** (*ko fight*):

1. Jogador A captura o ko.
2. Jogador B não pode recapturar imediatamente. Então B faz uma **ameaça de ko** em outro ponto do tabuleiro — uma jogada que exige resposta.
3. Jogador A precisa decidir: respondo à ameaça ou recapturo o ko? Se A responder, B pode recapturar o ko. Se A ignorar, B completa sua ameaça, ganhando algo em outro ponto.
4. Agora é A quem faz uma nova ameaça, e assim por diante.

A luta pelo ko é um jogo dentro do jogo — uma sequência de apostas onde cada lado avalia o que perde mais: ceder o ko ou responder às ameaças. Dominar a luta pelo ko é uma habilidade que separa jogadores intermediários de avançados.

## Tipos de ko

Nem todos os ko são iguais. Com experiência, você aprenderá a distinguir:

**Ko simples:** O tipo mais comum. Um único ponto de ko, onde os dois lados alternam ameaças para ganhar o direito de recapturar.

**Ko de vida e morte:** Quando o ko determina se um grupo inteiro vive ou morre. Esses ko são especialmente tensos porque o valor em jogo é enorme — quem perde o ko pode perder um grupo inteiro.

**Ko direto:** Quando um jogador pode fazer uma ameaça tão grande que o adversário não tem escolha senão responder, e então o ko é decidido em poucos movimentos.

**Ko indireto (hanami ko):** Uma situação onde um dos lados tem muito mais ameaças de ko disponíveis do que o outro, tornando a luta assimétrica e previsível.

Para ver o ko em ação em partidas reais, confira as análises do [torneio Lee Sedol vs. AlphaGo](/leesedol-alphago/) — várias partidas contêm situações de ko fascinantes.

## Ko vs. outras situações especiais

O ko é frequentemente confundido com o **[seki](/glossario/seki/)**, mas são conceitos distintos. No seki, dois grupos coexistem porque nenhum pode capturar o outro sem morrer — não há captura ativa acontecendo. No ko, há capturas alternadas de pedras individuais, interrompidas pela regra.

O ko também é diferente de um simples [atari](/glossario/atari/). O atari é uma ameaça de captura; o ko é uma situação onde a captura já ocorreu e o ciclo de recapturas é o que define o ko.

A [regra básica de ko](/ko-eternidade/) é uma das [regras detalhadas](/regras-detalhadas/) do Go que vale a pena estudar com cuidado — ela é simples de enunciar, mas suas implicações estratégicas são profundas o suficiente para encher livros inteiros.

## Por que o ko torna o Go único

Muitos jogos de tabuleiro têm regras anti-repetição. O que torna o ko do Go especial é que a proibição é muito local e precisa: você não pode reproduzir apenas a posição **imediatamente anterior**, não toda posição já vista. Isso significa que, em situações com múltiplos ko simultâneos (chamados *double ko* ou *triple ko*), as regras ficam ainda mais complexas.

Para a maioria das partidas de iniciantes e intermediários, um ko simples já é desafiador o suficiente. A melhor forma de aprender é jogar e observar ko acontecendo em suas próprias partidas. Comece pelos [movimentos ilegais](/movimentos-ilegais/) para entender o contexto completo das regras do Go.

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
