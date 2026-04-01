---
title: "O que é Tenuki no Go? Quando Ignorar o Adversário"
description: "Tenuki é jogar em outro ponto do tabuleiro em vez de responder localmente no Go. Aprenda quando ignorar o adversário é a jogada estratégica mais eficiente."
date: 2026-03-27
draft: false
slug: "tenuki"
type: "artigo"
tags: ["go", "baduk", "glossario", "tenuki", "estrategia", "intermediario"]
---

# O que é Tenuki no Go? Quando Ignorar o Adversário

Uma das lições mais contraintuitivas do Go para quem começa a aprender é que **nem sempre você precisa responder ao adversário**. Na verdade, uma das habilidades mais importantes do jogo é saber **quando ignorar** uma jogada local e jogar em outro ponto do tabuleiro. Essa técnica tem nome: **tenuki** (手抜き).

No Go — chamado de **Baduk** em coreano e **Weiqi** em chinês — **tenuki** significa literalmente "retirar a mão" — ou seja, não jogar a resposta local esperada e ir para outra região do tabuleiro. É uma declaração estratégica: "Este ponto local não é urgente o suficiente para minha atenção agora. Há algo mais importante em outro lugar."

Saber quando fazer tenuki — e quando não fazer — é uma das habilidades que mais separa iniciantes de jogadores avançados.

{{< diagram sgf="/sgfs/comecando.sgf" description="<p>Posição de abertura em 13×13 mostrando um momento típico de decisão de tenuki. Pretas têm pedras no canto superior esquerdo e lados; brancas têm presença no lado direito. Quando brancas jogam próximo ao grupo preto do canto, pretas precisam decidir: responder localmente ou fazer <strong>tenuki</strong> e jogar em outro ponto mais urgente do tabuleiro.</p><p>A decisão de tenuki depende de calcular: o que o adversário pode fazer <em>se eu não responder</em>? Se o dano máximo for menor do que o ganho de jogar em outro lugar, o tenuki é correto.</p>" >}}

## Por que o tenuki existe

O Go é jogado em um tabuleiro enorme (19×19 pontos), e ao longo de uma partida surgem dezenas de situações que "pedem" uma resposta. Se você sempre responds localmente, o adversário controla o ritmo da partida — ele decide onde você joga, e você segue passivamente.

O tenuki quebra esse padrão. Ao ignorar uma situação local, você:

1. **Toma a iniciativa em outro ponto:** Em vez de responder, você cria uma nova ameaça que o adversário precisa lidar
2. **Avalia o que é realmente urgente:** Nem toda ameaça é imediata; muitas podem ser respondidas mais tarde sem grande custo
3. **Desafias o adversário a executar a ameaça:** Às vezes o adversário ameaça algo que é menos valioso do que parece — fazer tenuki o força a mostrar se a ameaça era real

## Quando o tenuki é apropriado

O tenuki é adequado quando:

**A situação local pode esperar:** Um grupo ligeiramente ameaçado mas com liberdades suficientes pode sobreviver mais alguns movimentos enquanto você desenvolve posição em outro lugar.

**O tenuki vale mais pontos:** Se a jogada em outro ponto do tabuleiro vale, digamos, 15 pontos, mas responder localmente valeria apenas 5 pontos, o tenuki é matematicamente a escolha certa.

**Você quer inverter o sente:** Se o adversário está jogando em [gote](/glossario/gote/) (perdendo a iniciativa), fazer tenuki pode dar início a uma nova sequência onde você está no controle.

**A ameaça local é uma blefe:** Adversários experientes fazem ameaças que parecem urgentes mas que, na análise, não são executáveis ou valem menos do que parecem.

## Quando o tenuki é perigoso

O tenuki também tem riscos sérios:

**Grupos em atari ou quase mortos:** Fazer tenuki quando um grupo tem apenas uma ou duas liberdades é muito arriscado — o adversário pode capturá-lo rapidamente. Leia nosso artigo sobre [liberdades](/glossario/liberdades/) para entender quando um grupo está em perigo real.

**Ko ativo:** Durante uma luta de [ko](/glossario/ko/), o tenuki pode ser uma ameaça de ko, mas precisa ser calibrado com cuidado.

**Joseki incompletos:** Se você está no meio de uma sequência de [joseki](/glossario/joseki/), fazer tenuki prematuramente pode deixar seu canto em uma posição pior do que o previsto.

**Situações de vida e morte iminente:** Se um grupo precisa urgentemente criar dois olhos ([olhos](/glossario/olhos/)), adiar pode custar o grupo inteiro.

{{< diagram sgf="/sgfs/exemplo1.sgf" description="<p>Uma partida de 9×9 completa demonstrando múltiplos momentos de decisão de tenuki. Ao longo do jogo, cada jogador precisa avaliar continuamente: esta ameaça local é urgente suficiente para responder, ou devo jogar em outro ponto?</p><p>Observe as primeiras jogadas: pretas e brancas alternam entre responder ameaças locais e fazer tenuki para pontos mais urgentes no tabuleiro. Uma partida de 9×9 é um laboratório perfeito para treinar o julgamento de tenuki, pois o tabuleiro menor torna os efeitos de cada decisão mais visíveis.</p>" >}}

## Tenuki e o ritmo da partida

No nível avançado, o tenuki é uma ferramenta de **gestão do ritmo** da partida. Um bom jogador não simplesmente "ignora" o adversário por capricho — ele calcula com precisão o que a situação local vai custar se ficar sem resposta, e compara esse custo com o ganho do tenuki.

Quando o tenuki é bem executado, ele demonstra uma visão superior do tabuleiro. O adversário percebe que você não está sendo forçado a responder localmente, o que cria pressão psicológica: "ele sabe algo que eu não sei?"

Para desenvolver o julgamento do tenuki, o melhor caminho é jogar muitas partidas, analisar onde você deveria ter ignorado uma jogada adversária, e verificar o raciocínio. Com o tempo, o instinto para urgência local vs. oportunidade global vai se desenvolvendo naturalmente.

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
