---
title: "O que são Liberdades no Go?"
description: "As liberdades são os pontos adjacentes vazios de uma pedra no Go. Entenda esse conceito fundamental: sem liberdades, uma pedra é capturada do tabuleiro."
date: 2026-03-27
draft: false
slug: "liberdades"
type: "artigo"
tags: ["go", "baduk", "glossario", "liberdades", "captura", "iniciante"]
---

# O que são Liberdades no Go?

Se você está aprendendo Go — também chamado de **Baduk** (coreano) ou **Weiqi** (chinês) — uma das primeiras coisas que precisa entender é o conceito de **liberdades**. Sem liberdades, uma pedra não pode existir no tabuleiro. Com apenas uma, ela está em perigo imediato. Com muitas, está segura e poderosa.

**Liberdade** (氣, *ki* em japonês, ou *qi* em chinês) é cada um dos pontos **vazios diretamente adjacentes** a uma pedra — ou seja, os pontos imediatamente à esquerda, direita, cima e baixo (nunca diagonais). Uma pedra isolada no centro do tabuleiro tem **4 liberdades**. Uma pedra na borda tem **3**. Uma pedra no canto tem apenas **2**.

{{< diagram sgf="/sgfs/glossario-liberdades.sgf" description="<p>Uma pedra preta isolada em <strong>E5</strong> (centro do tabuleiro 9×9). Os quatro <strong>círculos</strong> marcam suas liberdades: <strong>D5</strong> (esquerda), <strong>F5</strong> (direita), <strong>E6</strong> (cima) e <strong>E4</strong> (baixo).</p><p>Enquanto qualquer um desses pontos estiver vazio, a pedra está viva. O adversário precisa ocupar <em>todas as quatro</em> liberdades para capturá-la — e isso só é possível se a pedra estiver completamente isolada, sem conexão a outras pedras da mesma cor.</p>" >}}

## Grupos e liberdades compartilhadas

Quando pedras da mesma cor estão diretamente conectadas (ortogonalmente adjacentes), elas formam um **grupo** e compartilham suas liberdades. O grupo inteiro é tratado como uma unidade: se todas as liberdades do grupo forem preenchidas pelo adversário, o grupo inteiro é capturado e removido do tabuleiro.

Isso é crucial: não é cada pedra individualmente que importa, mas o **grupo como um todo**. Duas pedras conectadas têm mais liberdades do que cada uma separada — e quanto maior o grupo, mais liberdades ele geralmente tem, tornando-o mais difícil de capturar.

## Atari: a última liberdade

Quando um grupo tem **apenas uma liberdade restante**, ele está em [atari](/glossario/atari/) — o equivalente ao "xeque" no xadrez. O adversário pode capturar o grupo na próxima jogada ocupando essa última liberdade.

{{< diagram sgf="/sgfs/0-atari.sgf" description="<p>Uma pedra branca em <strong>C3</strong> está completamente cercada: pretas estão em <strong>C4</strong>, <strong>B3</strong> e <strong>D3</strong>. Sobrou apenas a liberdade em <strong>C2</strong> (marcada com 'a').</p><p>Esta é uma situação de <strong>atari</strong> — brancas estão com uma única liberdade restante. Se pretas jogarem em C2, a pedra branca é capturada e removida do tabuleiro. Brancas precisam responder imediatamente: fugindo (se houver saída) ou aceitando a captura.</p>" >}}

## A regra da irrestrição: suicídio é ilegal

No Go, é **ilegal** jogar uma pedra em um ponto que teria zero liberdades imediatas **a menos que** esse movimento capture pedras adversárias (liberando espaço). Essa regra evita o "suicídio" — colocar voluntariamente um grupo sem liberdades.

Se um ponto está cercado por pedras adversárias, você normalmente não pode jogar lá (seria suicídio). Mas se jogar lá captura pedras adversárias que liberam espaço, o movimento é legal — e geralmente muito eficaz.

Esta regra é explicada em mais detalhes em [movimentos ilegais](/movimentos-ilegais/).

## Liberdades e a luta pela vida

A luta por liberdades é constante no Go. Todo combate entre grupos pode ser resumido como: quem perde suas liberdades primeiro, perde.

Isso conecta as liberdades ao conceito de **vida e morte** ([tsumego](/glossario/tsumego/)): um grupo que não consegue criar dois olhos internos independentes eventualmente terá todas suas liberdades preenchidas. Um grupo com dois olhos tem liberdades internas que o adversário nunca pode preencher completamente sem violar a regra do suicídio — portanto, esse grupo está permanentemente vivo.

Para praticar o reconhecimento de liberdades, comece pelos [problemas de 50 kyu](/problemas-de-50-kyu/): são exercícios simples onde você aprende a contar liberdades e identificar capturas.

## Liberdades e eficiência

Um princípio estratégico importante no Go é que pedras com muitas liberdades são mais **eficientes** — contribuem mais ao jogo e são mais difíceis de atacar. Por isso, jogadores experientes tentam constantemente manter seus grupos com liberdades suficientes enquanto reduzem as liberdades dos grupos adversários.

A arte de manipular liberdades — aumentando as suas e diminuindo as do adversário — está no coração de todo combate no Go. Da captura mais simples no [tutorial básico](/como-capturar-pedras/) até as batalhas complexas de [tsumego difícil](/tsumego-facil/), tudo gira em torno das liberdades.

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
