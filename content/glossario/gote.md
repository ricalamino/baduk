---
title: "O que é Gote no Go?"
description: "Gote no Go (Baduk): jogada que resolve localmente e cede o próximo tema ao oponente. Quando é aceitável, prioridade no tabuleiro e relação com sente no jogo."
date: 2026-03-27
draft: false
slug: "gote"
type: "artigo"
tags: ["go", "baduk", "glossario", "gote", "iniciante"]
---

# O que é Gote no Go?

**Gote** (後手, "mão de trás") é o par conceitual de **sente** no **Go** — jogo também chamado de **Baduk** (coreano) e **Weiqi** (chinês). Enquanto sente carrega a ideia de **manter a iniciativa**, gote indica uma jogada que, em troca de algo importante (vida, conexão, pontos), **entrega o próximo grande tema** ao oponente.

"Ser gote" não significa "jogada ruim". Muitas vezes você **precisa** cair em gote para salvar um grupo, fechar um território ou evitar um [corte](/corte/) desastroso. O erro típico de iniciante é **achar que gote é vergonha** e acabar jogando movimentos "ativos" que na verdade são **inseguros** ou **pequenos demais** para o risco. Outro erro é confundir gote com "passividade": às vezes o melhor plano é **consertar bases** e aceitar que o oponente vai escolher o próximo campo de batalha — desde que o que você ganhou localmente pague essa troca.

O vocabulário descreve **ritmo**: quem escolhe o próximo assunto depois da sequência. Por isso, gote aparece em análise junto de contagem aproximada de pontos e de ideias de [fim do jogo](/fim-do-jogo/), quando cada jogada tem preço visível.

{{< diagram sgf="/sgfs/glossario-gote-antes.sgf" description="<strong>Antes da conexão</strong>: pretas têm dois stones separados em D7 e F7. A branca em E6 pressiona de baixo — se brancas jogarem em E7, ficam entre as pretas e dificultam qualquer conexão. O ponto E7 (marcado) é onde pretas podem ligar os dois stones.</p><p>Se pretas <em>não</em> conectarem, os grupos permanecem vulneráveis a futuros ataques." >}}

{{< diagram sgf="/sgfs/glossario-gote-depois.sgf" description="<strong>Depois da conexão</strong>: pretas jogaram E7, unindo D7-E7-F7 em uma linha sólida. O grupo está seguro.</p><p>A branca em E6 continua lá, mas já não ameaça cortar. O problema local foi resolvido — mas pretas <em>usaram o lance</em> para isso. O adversário agora pode escolher qualquer grande ponto do tabuleiro. Isso é <strong>gote</strong>: você consertou, mas cedeu o ritmo." >}}

## Quando uma jogada é considerada gote

Em análise, chama-se de gote a jogada que **resolve** uma questão local de forma que o adversário **não é obrigado** a continuar ali — ele pode ir para uma área maior na abertura ou no meio-fim, dependendo do estágio.

Exemplos típicos: **conectar** pedras expostas para não ser cortado; **viver** um grupo com dois olhos (veja [fazendo dois olhos](/fazendo-dois-olhos/)); **fechar** um território quando não há mais invasão lucrativa. São jogadas "certas" que ainda assim podem ser gote porque **não forçam** resposta imediata em outro lugar.

A nuance é: **gote de muitos pontos** pode ser ótimo; **gote cedo demais por poucos pontos** pode ser péssimo. A conta é sempre **tamanho do que você ganhou** versus **o que o oponente fez enquanto você jogava localmente**. Se você não souber estimar isso ainda, não tem problema: comece comparando "meu grupo ficou vivo?" com "onde o oponente expandiu enquanto eu vivia".

{{< diagram sgf="/sgfs/glossario-gote-proximo-lance.sgf" description="No 19x19, a história fica clara: pretas jogam D17, brancas pressionam em E16, pretas conectam em E17 (gote) — e brancas aproveitam o tempo para jogar Q4, um grande ponto no lado oposto do tabuleiro (último lance marcado).</p><p>Enquanto pretas consertavam o grupo no canto superior, brancas conquistaram Q4 de graça. Este é o <strong>custo real do gote</strong>: o adversário ganhou o próximo tema." >}}

## Gote, sente e leitura honesta

Para não confundir, separe duas perguntas: (1) **"Eu preciso responder?"** — isso é sobrevivência e [defesa](/defesa/). (2) **"Depois que eu terminar, quem escolhe o próximo tópico?"** — isso é sente/gote.

Uma sequência pode ter várias respostas forçadas e ainda **terminar em gote** no último movimento da linha — por exemplo, você ataca (sente), o oponente defende, e seu último reforço **não** ameaça mais nada grande: aí você caiu em gote, mas a troca pode ter sido justa. O contrário também existe: uma jogada que parece "calma" pode ser sente se cria uma ameaça enorme que o oponente não pode ignorar.

Estudar [técnicas básicas](/tecnicas-basicas/) ajuda a ver quando um "fim de linha" realmente fecha o assunto e quando ainda há **aji** (potencial) para ambos os lados. Aji não é "mistério": é pedra a pedra que ainda podem virar **corte**, **atari** ou **olhos** dependendo do próximo lance.

## Erros comuns ligados a gote

Dois extremos aparecem muito em quem está aprendendo: **(a)** jogar sempre "ativo" e esquecer de consolidar bases — grupos fracos viram alvo; **(b)** ficar só consertando e nunca contestar o plano do adversário. O equilíbrio vem de ler **prioridades** no tabuleiro inteiro.

Um hábito simples em revisão: quando você perde por ritmo, marque o momento em que **duas jogadas gote seguidas** deram ao oponente duas chances de expandir. Muitas vezes o problema não foi "ser gote", e sim **ser gote pequeno** duas vezes. Outra revisão útil é comparar com [regras detalhadas](/regras-detalhadas/) quando houver dúvida sobre fim de partida — às vezes o "gote" foi na verdade **perder pontos no yose** por não contar bem.

Para treinar prioridade e captura, use o [tutorial sobre captura](/como-capturar-pedras/) e problemas curtos no [tsumego fácil](/tsumego-facil/). Eles não substituem partida longa, mas aceleram o reflexo de "isso é urgente ou posso ignorar?" — que é o coração da discussão sente/gote.

---

**Quer aprender Go na prática?** Comece pelo nosso [tutorial interativo](/como-capturar-pedras/) ou pratique com [problemas de tsumego](/tsumego-facil/).
