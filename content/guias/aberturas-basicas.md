---
title: "Aberturas Básicas no Go — Primeiras Jogadas para Iniciantes"
description: "Guia de aberturas básicas no Go: os pontos de canto mais importantes, princípios de fuseki e como estruturar suas primeiras jogadas para um bom desenvolvimento."
date: 2026-03-27
draft: false
slug: "aberturas-basicas"
type: "artigo"
tags: ["go", "baduk", "abertura", "fuseki", "iniciante", "hoshi", "komoku"]
---

# Aberturas Básicas no Go — Primeiras Jogadas para Iniciantes

As primeiras jogadas de uma partida de Go — a fase chamada de [fuseki](/glossario/fuseki/) (abertura) — definem o tom estratégico de tudo que vem depois. Para um iniciante, o tabuleiro vazio pode parecer intimidador: 361 intersecções, infinitas possibilidades. Mas existem princípios sólidos que orientam as primeiras jogadas e tornam a abertura muito menos misteriosa.

{{< diagram sgf="/sgfs/glossario-hoshi.sgf" description="<p>Os quatro pontos <strong>hoshi</strong> de canto no tabuleiro 19×19: <strong>D16</strong>, <strong>D4</strong>, <strong>Q16</strong> e <strong>Q4</strong>. Esses são os pontos 4-4 de cada canto — o ponto de abertura mais popular no Go moderno, especialmente após as revelações do AlphaGo.</p><p>Jogar no hoshi (4-4) estabelece influência forte que aponta para o interior do tabuleiro. O canto não está garantido imediatamente — o adversário pode invadir pelo <a href='/glossario/san-san/'>san-san</a> — mas em troca você tem desenvolvimento rápido e flexibilidade estratégica. É um excelente ponto de partida para iniciantes.</p>" >}}

## Por que começar nos cantos?

O princípio mais básico da abertura no Go é: **cantos primeiro, depois lados, por último o centro**. Isso existe porque:

- No canto, você precisa de menos pedras para cercar [território](/glossario/territorio/) (as paredes do tabuleiro ajudam)
- No lado, você precisa de mais pedras para a mesma quantidade de território
- No centro, é quase impossível criar território eficiente no início

A sabedoria popular do Go diz: "o canto vale 10 pontos, o lado vale 5, o centro vale 1". Isso é uma simplificação, mas captura a essência.

## Os três pontos de canto principais

Cada canto tem três pontos de abertura tradicionais, com filosofias diferentes:

**[Hoshi](/glossario/hoshi/) — Ponto 4-4 (ex: D4 ou Q16):**
O ponto mais popular no Go moderno. Joga alto (linha 4 em ambas as direções), projetando influência para o interior. O canto não está garantido, mas o desenvolvimento é rápido. Escolha quando quiser construir moyo ou priorizar influência.

**[Komoku](/glossario/komoku/) — Ponto 3-4 (ex: C4 ou R16):**
O ponto clássico do Go tradicional japonês. Equilibra influência e território. Mais próximo ao canto que o hoshi, tem mais tendência a garantir o espaço de canto. Escolha quando quiser equilíbrio.

**[San-san](/glossario/san-san/) — Ponto 3-3 (ex: C3 ou R17):**
O ponto mais próximo do canto. Garante território imediatamente, mas projeta pouca influência. Favorito das IAs em contextos específicos, mas geralmente considerado conservador para iniciantes.

## Princípios de abertura para iniciantes

{{< diagram sgf="/sgfs/comecar-2.sgf" description="<p>Abertura em 13×13: as 4 primeiras jogadas mostram cada jogador estabelecendo presença nos cantos do tabuleiro. Pretas em <strong>C11</strong> e <strong>D4</strong>, brancas em <strong>K3</strong> e <strong>K10</strong> — cada pedra aponta para o interior do tabuleiro.</p><p>Note como nenhum jogador coloca duas pedras no mesmo canto logo de início: em vez disso, cada jogada cobre um novo canto ou lado. Este princípio — 'não concentre, distribua' — é a base da boa abertura. Uma pedra que cobre um novo canto é quase sempre mais eficiente do que uma segunda pedra no mesmo canto.</p>" >}}

**Princípio 1 — Não se concentre em um lugar:** Coloque a primeira pedra em um canto, a segunda em outro, a terceira em outro. Não jogue três pedras seguidas no mesmo canto.

**Princípio 2 — Mantenha distância:** Quando você já tem uma pedra em um lado do tabuleiro, a próxima pedra naquele lado deve estar a 3-5 intersecções de distância para criar espaço eficiente sem deixar buracos.

**Princípio 3 — Responda ataques diretos:** Se o adversário jogar perto de uma pedra sua, geralmente você precisa responder. Ignorar um contato próximo (kakari) pode resultar em seu canto sendo tomado.

**Princípio 4 — Jogue alto para influência, baixo para território:** Pedras nas linhas 4-5 projetam influência; pedras nas linhas 1-3 garantem território mais próximo da borda.

## A abertura em 9×9

No tabuleiro 9×9, a abertura é muito mais comprimida — o ponto central (E5) é muito mais importante. Os princípios adaptados para 9×9:

- Jogue primeiro perto dos cantos (D4, D6, F4, F6 ou similar)
- O segundo movimento geralmente vai para um canto diferente
- Após 4-6 movimentos, o tabuleiro 9×9 já entra no combate direto

Para aprender a abertura em 9×9 na prática, veja nosso [guia do primeiro jogo 9×9](/primeiro-jogo-9x9/).

## Avançando além da abertura básica

Quando você dominar os princípios básicos, o próximo passo é estudar [joseki](/glossario/joseki/) — as sequências padrão de canto que estabelecem como cada jogador desenvolve cada canto após o contato inicial. Conhecer 2-3 joseki comuns para seu ponto favorito de abertura é suficiente para começar.

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
