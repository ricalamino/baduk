---
title: "O que é Escada (Shicho) no Go?"
description: "A escada ou shicho é uma sequência de capturas em zigue-zague no Go. Aprenda como funciona, quando é eficaz e como uma única pedra pode neutralizá-la."
date: 2026-03-27
draft: false
slug: "escada"
type: "artigo"
tags: ["go", "baduk", "glossario", "escada", "shicho", "tatica", "intermediario"]
---

# O que é Escada (Shicho) no Go?

No Go — chamado de **Baduk** em coreano e **Weiqi** em chinês — existem padrões táticos que se repetem com tal frequência que recebem nomes específicos. Um dos mais famosos e elegantes é a **escada**, conhecida em japonês como **shicho** (シチョウ).

A escada é uma sequência de capturas em zigue-zague onde um jogador persegue uma pedra (ou grupo) adversário com uma série de [atari](/glossario/atari/)s consecutivos. A pedra fugitiva vai "descendo" em diagonal pelo tabuleiro, tentando escapar, mas é sistematicamente bloqueada até que eventualmente atinja a borda — onde é capturada.

O que torna a escada fascinante é que ela parece simples, mas tem uma particularidade devastadora: **uma única pedra adversária no caminho certo pode anular a escada completamente**, transformando uma sequência de vitória garantida em uma catástrofe para quem a iniciou.

## Como a escada funciona

Imagine que pretas têm uma pedra perseguindo uma pedra branca com uma série de ataques em diagonal. A pedra branca tenta escapar a cada lance, mas pretas a bloqueiam repetidamente, mantendo-a em [atari](/glossario/atari/). A sequência continua em zigue-zague até que a pedra branca não tenha mais para onde ir.

{{< diagram sgf="/sgfs/shicho-1.sgf" description="<p>Posição inicial de uma escada. A pedra branca está cercada e tentando escapar em direção ao canto superior direito do tabuleiro.</p><p>Pretas perseguem com uma série de ataris em diagonal — cada jogada branca de fuga é bloqueada imediatamente. A escada vai descendo pelo tabuleiro em zigue-zague até atingir a borda.</p>" >}}

{{< diagram sgf="/sgfs/shicho-2.sgf" description="<p>A sequência da escada avançada. A pedra branca continua fugindo em diagonal, mas pretas mantêm o controle com ataris consecutivos.</p><p>Quando a escada funciona (sem pedras brancas no caminho), brancas são inevitavelmente capturadas ao atingir a borda. A beleza da escada está na sua inevitabilidade — uma vez iniciada corretamente, o resultado é determinado.</p>" >}}

## Quando a escada funciona — e quando não

A escada só funciona se o **caminho de fuga da pedra adversária estiver livre de aliados**. Se houver uma pedra da mesma cor que a pedra fugitiva no caminho diagonal da escada, a sequência quebra: em vez de fugir para uma posição perdedora, a pedra se conecta ao aliado e escapa.

Isso cria uma das situações mais estratégicas do Go: a **pedra de quebra de escada** (*shicho kuzushi* em japonês). Um jogador que coloca uma pedra antecipadamente na diagonal da possível escada futura está fazendo uma jogada que serve dois propósitos:
1. Desenvolver território ou pressão naquele ponto
2. Garantir que, se a escada for iniciada, ela não funcionará

A arte de calcular se uma escada funciona ou não — e de colocar pedras de quebra sutis — é uma habilidade que aparece em partidas de alto nível com surpreendente frequência.

## Por que a escada é especial

A escada exige **leitura de longo alcance**: você precisa visualizar 10, 20 ou até 30 movimentos à frente para saber se ela funciona. Essa capacidade de calcular sequências longas é central no Go.

Iniciantes frequentemente cometem o erro de iniciar uma escada sem ter calculado se ela funciona, descobrindo tarde demais que o adversário tem uma pedra no caminho. O resultado costuma ser catastrófico: muitas pedras em posições ruins, sem captura.

A lição: **nunca inicie uma escada sem ter calculado até a borda**. Se você vê uma escada potencial, rastreie cada passo até o fim antes de jogar.

## Variações da escada

Além da escada clássica, existem variações táticas relacionadas:

**Escada de captura incompleta:** Em alguns casos, a escada não termina em captura mas força o adversário a uma posição tão ruim que equivale a uma desvantagem grande.

**Escada dupla:** Duas escadas simultâneas em direções diferentes — o adversário só pode escapar de uma, garantindo a captura da outra.

Para praticar escadas, veja os [problemas de 45 kyu de escada](/problemas-de-45-kyu-escada/) — são exercícios específicos para treinar o reconhecimento e cálculo de shicho.

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
