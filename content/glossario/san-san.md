---
title: "O que é San-San? O Ponto 3-3 no Go"
description: "San-san é o ponto 3-3 do tabuleiro de Go, localizado no canto. Aprenda suas vantagens para garantir território de canto e como a invasão san-san funciona."
date: 2026-03-27
draft: false
slug: "san-san"
type: "artigo"
tags: ["go", "baduk", "glossario", "san-san", "abertura", "joseki", "iniciante"]
---

# O que é San-San? O Ponto 3-3 no Go

Entre os pontos de abertura do Go, o **san-san** (三々) é o mais especialista: enquanto o [hoshi](/glossario/hoshi/) (4-4) visa influência e o [komoku](/glossario/komoku/) (3-4) busca equilíbrio, o san-san faz uma aposta clara — **território de canto imediato** em troca de influência mínima.

**San-san** significa literalmente "três-três" em japonês, referindo-se à posição da intersecção: **terceira linha a partir da borda em ambas as direções** a partir do canto (por exemplo, C3 ou R17 em notação coluna-linha). No Go — chamado de **Baduk** em coreano e **Weiqi** em chinês — essa posição é conhecida por ser a mais próxima do canto entre os pontos de abertura tradicionais.

{{< diagram sgf="/sgfs/glossario-joseki.sgf" description="<p>Uma pedra preta no ponto <strong>D16</strong> — o hoshi (4-4) do canto superior esquerdo. Esta é a pedra de referência: o adversário pode invadir esse canto pelo ponto san-san (<strong>C17</strong>), iniciando a sequência joseki clássica de invasão.</p><p>Note como o hoshi em D16 projeta influência para o interior do tabuleiro (lados e centro), mas deixa o canto em si vulnerável à invasão em C17. O san-san é exatamente esse ponto de invasão — a 3ª coluna e 3ª linha a partir do canto mais próximo.</p>" >}}

## San-san como ponto de abertura

Jogar no san-san como primeira pedra de um canto é uma escolha deliberada por território:

**Vantagens:**
- O canto fica praticamente garantido com poucas jogadas adicionais
- A estrutura resultante é sólida e difícil de invadir
- Simples de entender — bom para iniciantes que querem pontos concretos

**Desvantagens:**
- A pedra fica "baixa" (perto da borda), com pouca influência sobre o centro e os lados
- O adversário fica com influência forte nas direções perpendiculares ao canto
- Posição mais previsível

Por essas razões, o san-san como primeiro movimento de canto era relativamente raro no Go clássico. Mas isso mudou com a revolução do AlphaGo — as IAs mostraram que o san-san, quando integrado a um plano global eficiente, pode ser extremamente poderoso.

## A invasão san-san: entrando no canto adversário

Além de ser um ponto de abertura, o san-san tem outro papel muito importante: **a invasão san-san** no canto de um adversário que jogou [hoshi](/glossario/hoshi/) (4-4).

Quando o adversário ocupa o hoshi (4-4) de um canto, o canto ainda não está garantido — a pedra no 4-4 projeta influência, mas não fecha o canto. Um jogador pode invadir diretamente no san-san (3-3), iniciando um [joseki](/glossario/joseki/) estabelecido onde:

- O invasor ganha o território de canto
- O defensor ganha influência forte sobre os dois lados adjacentes

{{< diagram sgf="/sgfs/glossario-joseki-m3.sgf" description="<p>A sequência completa da invasão san-san. Pretas iniciam no hoshi <strong>D16</strong> (4-4). Brancas invadem em <strong>C17</strong> (3-3, o san-san). Pretas bloqueiam em <strong>D17</strong>. Brancas jogam <strong>C16</strong>, pretas respondem em <strong>D15</strong>.</p><p>Resultado: brancas ficam com território sólido no canto (região C16-C17); pretas ganham influência forte apontando para o centro e os lados. Esse é o equilíbrio clássico da invasão san-san — <em>território vs. influência</em>. Brancas escolheram o concreto; pretas ficaram com o potencial.</p>" >}}

## Quando invadir no san-san

A decisão de invadir no san-san é estratégica e depende do contexto global:

**Invadir quando:** Você precisa de território concreto para equilibrar a partida, o adversário tem muita influência e pouco território real, ou a região do canto é crítica para o plano global.

**Evitar quando:** A influência que o adversário ganha com a invasão seria mais valiosa do que o território que você obtém, ou o adversário já tem pedras próximas que tornariam a invasão ineficiente.

A invasão san-san mudou o Go moderno: antes de AlphaGo, era considerada "muito fácil de responder" e portanto uma concessão de influência. Depois, jogadores perceberam que, em muitos contextos, tomar o canto imediatamente e deixar o adversário com influência é uma troca perfeitamente aceitável.

Para ver exemplos de partidas com invasões san-san bem executadas, confira as análises de [Ke Jie vs. AlphaGo](/kejie-alphago/).

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
