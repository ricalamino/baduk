---
title: "O que é Atari no Go?"
description: "Atari no Go (Baduk): pedra ou grupo com só uma liberdade, ameaça imediata de captura. Entenda o termo japonês, como reagir e por que isso aparece em todo jogo."
date: 2026-03-27
draft: false
slug: "atari"
type: "artigo"
tags: ["go", "baduk", "glossario", "atari", "iniciante"]
---

# O que é Atari no Go?

Se você está começando no **Go** — também chamado de **Baduk** (coreano) ou **Weiqi** (chinês) —, logo vai ouvir a palavra **atari**. Ela descreve uma situação simples e muito frequente: uma pedra ou um grupo de pedras ficou com **apenas uma liberdade**; na próxima jogada do oponente, se nada for feito, essa pedra ou grupo pode ser **capturado**.

Atari não é uma "regra" separada: é **vocabulário** para falar de tabuleiro. A captura em si segue as [regras básicas](/regras-basicas/): pedras são removidas quando perdem todas as liberdades. O atari é o "último aviso" antes disso acontecer — o momento em que ainda dá para reagir, mas a ameaça já está explícita.

Nos materiais em japonês, "atari" aparece como rótulo de posição; em português entre jogadores, costuma-se dizer que algo "está em atari" ou que alguém "deu atari". O importante é reconhecer o padrão: **uma liberdade restante** para o grupo ameaçado. Treinar isso acelera tudo o que vem depois: leitura de lutas, [técnicas básicas](/tecnicas-basicas/) e até o [fim do jogo](/fim-do-jogo/), quando pequenas ameaças decidem pontos.

{{< diagram sgf="/sgfs/glossario-atari.sgf" description="A pedra branca em F6 tem apenas <strong>uma</strong> liberdade: E6 (círculo). Pretas já ocupam F5, G6 e F7 — todas as outras vizinhanças ortogonais.</p><p>Se pretas jogarem em E6, a pedra branca é capturada. Isso é <strong>atari</strong>: uma liberdade restante, captura iminente." >}}

## Como reconhecer o Atari

No Go, cada pedra ocupa um ponto; as **liberdades** são os pontos vazios **ortogonais** (em cruz: cima, baixo, esquerda, direita) tocando o grupo. Diagonal **não** conta. Quando só sobra **uma** dessas casas vazias, o grupo está em atari.

{{< diagram sgf="/sgfs/glossario-atari-2libs.sgf" description="Ainda <strong>não</strong> é atari: a branca em F6 tem <strong>duas</strong> liberdades ortogonais — E6 e G6 (círculos). Pretas ocupam F5 e F7, mas deixaram dois lados abertos.</p><p>Compare com o diagrama anterior: lá preta também estava em G6, e sobrava só E6. Uma liberdade a mais muda tudo." >}}

{{< diagram sgf="/sgfs/glossario-atari-canto.sgf" description="No <strong>canto inferior esquerdo</strong>: a branca está em A1, o vértice do tabuleiro. Com preta em A2, a única liberdade restante é B1 (círculo) — <strong>atari</strong> com um único ponto de fuga.</p><p>Em qualquer canto só existem <strong>duas</strong> vizinhanças ortogonais; por isso atari no canto chega mais rápido do que no centro." >}}

Se for a sua pedra, você normalmente vai **estender** (aumentar liberdades), **conectar** a outro grupo, **capturar** uma pedra inimiga menor, ou **sacrificar** se o grupo não vale o esforço — dependendo do que a posição exige. Se for a pedra do adversário, o atari é a ferramenta para forçar respostas e ganhar **sente** (iniciativa). Em muitos diagramas didáticos, o atari aparece como passo intermediário antes de uma captura maior ou antes de uma sequência que muda a forma inteira do canto.

## Atari duplo e leitura

Uma ideia poderosa é o **atari duplo**: uma jogada que coloca **dois** grupos adversários em atari ao mesmo tempo. Como o adversário só joga uma pedra por vez, algo cai — na prática, você transforma leitura em ganho material ou de forma. Esse tema aparece em problemas curtos e também em partidas reais, especialmente perto de [corte](/corte/) e de pedras "cabeçudas" que tentam cortar tudo ao mesmo tempo.

{{< diagram sgf="/sgfs/glossario-atari-duplo.sgf" description="Se pretas jogarem em D6 (marcado), os grupos brancos D7-E7 e C6-C5 ficam com <strong>uma liberdade</strong> cada ao mesmo tempo — <strong>atari duplo</strong>. Brancas só conseguem salvar um grupo por lance.</p><p>Pratique este padrão nos <a href='/problemas-de-47-kyu-atari-duplo/'>problemas de 47 kyu</a>." >}}

Para treinar o olho para ameaças e capturas, nada melhor que o básico: veja [como capturar pedras](/como-capturar-pedras/) e pratique sequências simples nos [problemas de 50 kyu](/problemas-de-50-kyu/). Erros comuns de iniciante incluem não notar atari "de canto" (onde liberdades somem rápido), esquecer que **capturar** pode mudar liberdades de grupos vizinhos, e subestimar quando um atari é apenas **ameaça de troca** — ou seja, o oponente pode aceitar perder algo pequeno para ganhar outra coisa maior.

## Atari, escada e sequências forçadas

Um caso clássico ligado a atari é a **escada** (*shicho* em japonês): uma corrida em linha em que cada resposta mantém o grupo em atari repetido até o fim da tábua. Entender escada não é "teoria exótica": é entender **atari mecânico** e limites do tabuleiro. Para treinar esse padrão com calma, use os [problemas de 45 kyu sobre escada](/problemas-de-45-kyu-escada/).

Outra confusão frequente é achar que "sempre que estou em atari, devo salvar". Às vezes a sequência inteira é má para você — aí o certo pode ser **sacrificar cedo** e mudar de assunto, em vez de ser puxado por atari atrás de atari até formar uma pedra pesada e pequena demais.

## Atari e ilegalidades

Dar atari não é ilegal; o que importa é não violar regras como **suicídio** (jogar num ponto sem liberdades, exceto quando a jogada captura) e o **ko**, quando a recaptura repetir a mesma posição. O tema do ko costuma aparecer em situações de "pé quente" perto de capturas; nosso material sobre [ko e eternidade](/ko-eternidade/) ajuda a não confundir atari com repetição. Também vale lembrar os [movimentos ilegais](/movimentos-ilegais/) no geral — atari é pressão, mas ainda precisa respeitar o regulamento.

Quando você domina atari, o tabuleiro "fala mais alto": você enxerga não só pedras, mas **prazos** — o que é urgente, o que pode esperar, e onde uma única pedra muda tudo.

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
