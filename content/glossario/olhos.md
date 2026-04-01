---
title: "O que são Olhos no Go? Como Fazer Dois Olhos"
description: "Olhos são espaços vazios protegidos dentro de um grupo de Go. Com dois olhos independentes, o grupo vive para sempre. Aprenda como criar e destruir olhos."
date: 2026-03-27
draft: false
slug: "olhos"
type: "artigo"
tags: ["go", "baduk", "glossario", "olhos", "vida-e-morte", "iniciante"]
---

# O que são Olhos no Go? Como Fazer Dois Olhos

Se existe um conceito que todo jogador de Go **precisa** dominar, é o de **olhos**. Saber fazer dois olhos é literalmente a diferença entre um grupo vivo e um grupo morto — e dominar esse conceito transforma completamente a forma como você joga.

No Go — chamado de **Baduk** em coreano e **Weiqi** em chinês — um **olho** é um ponto vazio interno a um grupo de pedras que está completamente cercado pelas pedras desse grupo. Por isso, o adversário não pode colocar uma pedra ali sem que seja imediatamente capturada por suicídio.

Um grupo com **um** olho ainda pode ser capturado. Um grupo com **dois olhos independentes** está **permanentemente vivo** — o adversário jamais poderá capturá-lo.

{{< diagram sgf="/sgfs/falseeye0.sgf" description="<p>O grupo preto (pedras em E5, D5, E4, F4, F5, F6, F7, G5, G6) aparentemente envolve dois espaços internos — mas atenção: o espaço no canto superior direito <em>não é um olho verdadeiro</em>.</p><p>As pedras brancas em posições diagonais ao ponto interno (canto superior direito) controlam esse espaço — o adversário pode preenchê-lo sem suicídio, pois as pedras brancas nos diagonais garantem conectividade. Esse é um <strong>olho falso</strong>: parece um olho mas não oferece proteção real. Um grupo com apenas um olho verdadeiro e um falso está morto.</p>" >}}

## Por que dois olhos garantem a vida

Vamos pensar com calma: para capturar um grupo, o adversário precisa preencher **todas** as suas [liberdades](/glossario/liberdades/). Se o grupo tem dois olhos separados, o adversário precisaria preencher ambos simultaneamente — e isso é impossível porque:

1. Preencher um olho seria suicídio (o adversário jogaria em um ponto completamente cercado pelo grupo)
2. Mesmo que não fosse suicídio, o adversário só pode preencher um olho de cada vez
3. Com o outro olho intacto, o grupo tem sempre pelo menos uma liberdade

Portanto: **dois olhos = vida eterna**. É uma das poucas garantias absolutas no Go.

## O ponto vital e o olho falso

Nem todo espaço interno é um olho genuíno. Um **olho falso** é uma intersecção que parece um olho, mas pode ser preenchida pelo adversário sem implicar suicídio — geralmente porque o adversário tem pedras em posições diagonais que "controlam" o interior do grupo.

{{< challenge sgf="/sgfs/nigan-iki-1.sgf" description="<p>Pretas jogam primeiro. O grupo preto está completamente cercado pelas brancas. Encontre o <strong>ponto vital</strong> para criar dois olhos independentes — dois espaços vazios internos que o adversário não pode preencher simultaneamente.</p><p>Atenção: a posição errada resulta em apenas um espaço interno (um único olho), o que não é suficiente para viver. Encontre a jogada que divide o espaço interno em <em>dois</em> olhos separados.</p>" >}}

## Como criar dois olhos

Para criar dois olhos, o grupo precisa de **espaço interno suficiente** e uma forma que permita dividi-lo em duas regiões separadas. Alguns princípios práticos:

**Jogue no ponto vital:** Em muitas posições, existe um único ponto que, se pretas jogam, cria dois olhos — mas se brancas jogam primeiro, reduz o grupo a apenas um espaço (ou menos). Esse é o "ponto vital" dos problemas de [tsumego](/glossario/tsumego/).

**Evite formas vulneráveis:** Grupos muito compactos (como uma linha de 3 pedras sem extensões) têm dificuldade de criar dois olhos independentes.

**Proteja os cantos:** Grupos de canto precisam de menos pedras para criar dois olhos, porque as paredes do tabuleiro funcionam como partes do olho.

**Conecte grupos em perigo:** Se um grupo está ameaçado, conectá-lo a outro grupo saudável pode garantir a vida. Veja como a [defesa](/defesa/) funciona no tutorial.

## Formas de grupo e olhos

Diferentes formas de grupo têm diferentes facilidades para criar dois olhos:

- **Linha de 3 ou menos:** Geralmente morto se cercado (apenas 1 ponto de olho)
- **L-shape (forma em L):** Pode criar dois olhos com jogada correta
- **Retângulo 2×3 ou maior:** Normalmente consegue criar dois olhos facilmente
- **Grupo em canto com 4+ pedras:** Geralmente vivo

Para ver exemplos práticos de grupos vivos e mortos, os [problemas de tsumego](/tsumego-facil/) são a melhor escola. Cada problema é um exercício de reconhecer se um grupo pode criar dois olhos — e como.

## Por que os olhos são centrais no Go

O conceito de dois olhos é o que conecta todas as batalhas do Go. Quando você ataca um grupo adversário, está tentando impedi-lo de criar dois olhos. Quando você defende um grupo, está garantindo que ele tenha dois olhos. As decisões mais importantes de cada partida giram em torno dessa dicotomia.

Entender profundamente os olhos transforma sua leitura do jogo: você começa a ver posições não como "pedras no tabuleiro", mas como "grupos que vivem ou morrem". Essa visão é o fundamento de tudo o mais que você aprenderá.

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
