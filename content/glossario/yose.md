---
title: "O que é Yose? O Fim de Jogo no Go"
description: "Yose é a fase final do Go onde cada jogada conta pontos diretamente. Aprenda os princípios do fim de jogo e como maximizar seu território nessa fase crucial."
date: 2026-03-27
draft: false
slug: "yose"
type: "artigo"
tags: ["go", "baduk", "glossario", "yose", "fim-de-jogo", "intermediario"]
---

# O que é Yose? O Fim de Jogo no Go

A maioria das partidas de Go é decidida não nas grandes batalhas do meio de jogo, mas nos pequenos movimentos do fim — onde cada ponto conta, onde a ordem das jogadas importa e onde erros de 1 ou 2 pontos determinam o vencedor. Essa fase final do jogo se chama **yose** (ヨセ).

No Go — chamado de **Baduk** em coreano e **Weiqi** em chinês — o yose começa quando os contornos do [território](/glossario/territorio/) de ambos os jogadores estão razoavelmente definidos e o jogo passa a ser uma questão de **fechar fronteiras** e **maximizar pontos** dentro de cada território.

{{< diagram sgf="/sgfs/fim-3.sgf" description="<p>Posição de fim de jogo em 5×5. Brancas têm pedras na borda esquerda (coluna A), pretas têm pedras na coluna B e D. Os pontos vazios na borda superior e nas colunas centrais são <strong>yose</strong> — jogadas de fim de jogo que fecham as fronteiras e garantem pontos.</p><p>A ordem das jogadas importa muito: se pretas fecham primeiro um ponto de fronteira na borda superior, ganham 1 ponto extra. O adversário que joga as jogadas de yose mais valiosas primeiro vence a fase de fim de jogo.</p>" >}}

## Como o yose funciona

No yose, cada jogada tem um valor contável em pontos. Enquanto no meio de jogo as jogadas têm valores difusos e estratégicos, no yose a contagem é direta: "se eu jogar aqui antes do adversário, ganho X pontos".

O princípio básico é **jogar as jogadas de maior valor primeiro**. Se você tem uma jogada de yose que vale 10 pontos e o adversário tem uma que vale 6, você joga a sua, o adversário joga a dele, e assim por diante — em ordem decrescente de valor.

Esse princípio parece simples, mas envolve:

**Calcular o valor correto de cada jogada:** Uma jogada de yose que "fecha" uma fronteira e impede a entrada adversária vale mais do que parece — não apenas os pontos ganhos, mas os pontos que o adversário não consegue ganhar.

**Reconhecer jogadas em sente vs. gote:** Uma jogada de yose em [sente](/glossario/sente/) (que exige resposta) tem valor diferente de uma em [gote](/glossario/gote/). Jogadas de sente devem ser executadas primeiro.

**Não desperdiçar jogadas no dame:** Os pontos [dame](/glossario/dame/) (neutros) não valem nada — preenchê-los antes das jogadas de yose reais é um erro que custa pontos.

## Tipos de jogadas de yose

**Yose de borda (sente):** Jogadas que, se não respondidas, permitem ao jogador avançar mais dentro do território adversário. Como exigem resposta, são jogadas em sente — e devem ser executadas cedo.

**Yose de fechamento:** Fechar uma fronteira aberta que o adversário poderia invadir. O valor depende de quão profundo o adversário poderia entrar.

**Hane de yose:** O [hane](/glossario/hane/) no fim de jogo é uma das técnicas mais comuns. Um hane na borda pode converter 2-4 pontos a seu favor com poucos movimentos.

{{< diagram sgf="/sgfs/fim-4.sgf" description="<p>Outra posição de yose em 5×5. Brancas têm presença nas colunas C–E, pretas nas colunas A–C. As fronteiras ainda não estão completamente fechadas — há pontos de yose disponíveis para ambos os lados.</p><p>Nesta posição, calcule: quais pontos, se ocupados agora, garantem o maior ganho? Quais podem esperar mais um ou dois movimentos sem custo? Essa análise contínua de valor é o cerne do yose bem jogado.</p>" >}}

## Yose e a contagem

O yose está intimamente ligado à habilidade de contar pontos durante a partida — uma habilidade que distingue jogadores avançados. Saber, ao entrar no yose, quem está à frente e por quantos pontos permite decidir se você precisa jogar arriscar ou se pode jogar seguro.

Aprenda mais sobre como a contagem funciona no [fim do jogo](/fim-do-jogo/) e como as pedras mortas são removidas antes da contagem final.

## Como melhorar no yose

O yose é uma das fases mais treináveis do Go: tem regras claras, valores calculáveis e muita literatura específica. Para melhorar:

**Estude o valor das jogadas de yose:** Aprenda a calcular com precisão o valor de cada movimento de fronteira.

**Jogue até o fim:** Muitos iniciantes param de jogar antes do yose ou o fazem de qualquer jeito. Jogar cada partida até o final com atenção ao yose desenvolve o instinto.

**Resolva problemas de fim de jogo:** Assim como o [tsumego](/glossario/tsumego/) treina a visão tática, existem problemas específicos de yose que treinam o reconhecimento de sequências de fim de jogo.

O yose pode parecer menos dramático do que as batalhas de meio de jogo, mas é onde partidas são ganhas e perdidas com mais frequência do que a maioria imagina.

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
