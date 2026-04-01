# Baduk — Tutorial principal (export para PDF)

_Texto gerado a partir do menu «Tutorial» do site. Figuras: substituir pelos teus desenhos._

---

## 🏠 Home

_(ordem menu: 1 · ficheiro: `_index.md`)_

📣 Curso
    Curso Intensivo de Go para Iniciantes

    Aulas diárias por WhatsApp + PDF (10 Erros Fatais de quem começa no Go) + análise de partidas + videochamada. De iniciante a 20 kyu.

    Aulas individuais (1:1) · 30 dias · R$ 97

Ver curso e inscrever-se

    🎯 Bem-vindo ao Baduk!

    O jogo mais antigo do mundo, agora em português. Aprenda Go de forma interativa e divertida!

    🎮
    Jogue e Aprenda

    Interaja diretamente com o tabuleiro e aprenda as regras na prática

Começar Agora

    🧠
    Problemas de Go

    Resolva centenas de problemas interativos para treinar sua estratégia

Resolver Problemas

    ⚡
    Partidas Famosas

    Assista e analise jogos históricos do AlphaGo e grandes mestres

Ver Partidas

  🎯 Três Princípios Básicos do Go

      1
      Jogadores Alternados

      Dois jogadores (preto e branco) fazem movimentos colocando uma pedra no tabuleiro alternadamente

      2
      Intersecções

      As pedras devem ser colocadas na intersecção de linhas verticais e horizontais

      3
      Pedras Fixas

      Quando a pedra é colocada, ela não pode ser movida, exceto em situações especiais

    🚀 Pronto para Começar?

    Explore nosso tutorial completo e torne-se um jogador de Go!

      📚 Tutorial Completo
      🎯 Problemas de Go

      📣 Curso
      Curso Intensivo de Go para Iniciantes

      Aulas diárias por WhatsApp + PDF (10 Erros Fatais de quem começa no Go) + análise de partidas + videochamada. De iniciante a 20 kyu.

      Aulas individuais (1:1) · 30 dias · R$ 97

Ver curso e inscrever-se

    💝 Apoie o Projeto

    Este site é mantido gratuitamente. Sua doação ajuda a remover propagandas e melhorar o conteúdo!

💝 Fazer Doação

---

  📚 Créditos

  Versão original: Hiroki Mori (http://playgo.to)

Tradução: Ricardo Alamino

Baseado na tradução de: Andrzej Bojar

Layout original: Associação dos Jogos Honte (http://honte.pl)

Código fonte: GitHub

---

## Como capturar pedras?

_(ordem menu: 2 · ficheiro: `como-capturar-pedras.md`)_

-  O objetivo em Go é criar um "território" maior que o adversário. 
-  Primeiramente, escolher um lugar para uma pedra pode ser difícil, porque você pode colocá-la no quadro em quase todos os lugares. 
-  Uma forma de criar um terreno é obter pedras inimigas. 
-  Pedras cercadas são removidas do tabuleiro e tomadas pelo inimigo como prisioneiros. 
-  Cada prisioneiro vale um ponto. 






[FIGURA 1 — tipo: diagram | referência SGF: `/sgfs/0-atari.sgf`]
Legenda sugerida: Na próxima jogada, o branco será completamente cercado e será removido.
Sobre as pedras que podem ser removidas com um movimento, dizemos que elas estão no Atari .

 





[FIGURA 2 — tipo: diagram | referência SGF: `/sgfs/1-before-catch.sgf`]
Legenda sugerida: A pedra branca agora está cercada e é por isso que ...

 



[FIGURA 3 — tipo: diagram | referência SGF: `/sgfs/2-after-catch.sgf`]
Legenda sugerida: ... é removido do tabuleiro.

 



[FIGURA 4 — tipo: diagram | referência SGF: `/sgfs/3-extend.sgf`]
Legenda sugerida: Se houver um movimento branco, ele pode escapar combinando pedras.

---

## Problemas de 50 Kyu

_(ordem menu: 3 · ficheiro: `problemas-de-50-kyu.md`)_

### Capture as pedras do Oponente em Atari!

Você pode clicar no tabuleiro e capturar as pedras do oponente.

Se você ver cometer um erro, continue tentando até encontrar uma solução. 

Aqui, um tabuleiro 9 x 9 é usado. Normalmente, um tabuleiro 19 x 19 é usado.

O menor é recomendado para iniciantes.





[FIGURA 5 — tipo: challenge | referência SGF: `/sgfs/50K-1.sgf`]
Legenda sugerida: Vez das pretas. Capture a pedra branca em atari.

 



[FIGURA 6 — tipo: challenge | referência SGF: `/sgfs/50K-2.sgf`]
Legenda sugerida: Vez das pretas. Duas pedras brancas estão em atari. Capture as duas com um movimento!





[FIGURA 7 — tipo: challenge | referência SGF: `/sgfs/50K-3.sgf`]
Legenda sugerida: Vez das pretas. Mesmo se existirem outras pedras por perto, apenas faça o mesmo.



Apenas repita os problemas até que você os entenda completamente.

Quando você entendê-los, eu lhe concedo o nível de 50 Kyu - o nível mais baixo no meu sistema de ranking

----
### Sobre o ranking de Go

No mundo amador de Go, 30 kyu é normalmente o nível mais baixo. Quanto menor o número, mais forte é o jogador.

Acima de 1 kyu vem 1 dan. Conforme o dan aumenta, mais forte ficará.

Jogadores com Dan são considerados os melhores.

---

## Problemas de 49 Kyu

_(ordem menu: 4 · ficheiro: `problemas-de-49-kyu.md`)_

### Um pouco mais difícil



[FIGURA 8 — tipo: challenge | referência SGF: `/sgfs/49K-1.sgf`]
Legenda sugerida: No canto do tabuleiro, a situação é um pouco diferente.
As pedras grudadas nos cantos estão quase cercadas - e portanto é fácil matá-las.

 



[FIGURA 9 — tipo: challenge | referência SGF: `/sgfs/49K-2.sgf`]
Legenda sugerida: Uma pedra no canto está em Atari.





[FIGURA 10 — tipo: challenge | referência SGF: `/sgfs/49K-3.sgf`]
Legenda sugerida: Agora, duas pedras brancas estão em Atari.



Você foi promovido agora para **49 Kyu**!

---

## Problemas de 48 Kyu

_(ordem menu: 5 · ficheiro: `problemas-de-48-kyu.md`)_

### Capture de qualquer modo!

De agora em diante, você **não** conseguirá sucesso sempre com apenas um movimento.



[FIGURA 11 — tipo: challenge | referência SGF: `/sgfs/48K-1-3shi.sgf`]
Legenda sugerida: Fuja das três pedras brancas!
Isso leva dois movimentos para ser feito. Porém, o primeiro movimento é o mais importante.

 



[FIGURA 12 — tipo: challenge | referência SGF: `/sgfs/48K-2-hashi.sgf`]
Legenda sugerida: Tente capturar as pedras brancas no canto esquerdo.
É difícil "fugir" com pedras nos cantos.





[FIGURA 13 — tipo: challenge | referência SGF: `/sgfs/48K-3-many.sgf`]
Legenda sugerida: Muitas pedras! Apenas tome cuidado com as pedras que estão em Atari.
Se você fizer um movimento errado, suas pedras serão mortas!

---

## Um momento de descanso

_(ordem menu: 6 · ficheiro: `um-momento-de-descanso.md`)_

### Capture de qualquer modo!

Neste quadro, apenas o preto pode fazer jogadas.

Isso significa que o branco nunca lhe responderá.



[FIGURA 14 — tipo: blackplay | referência SGF: `/sgfs/0.sgf`]
Legenda sugerida: Remova todas as pedras brancas.
No entanto, faça o menor número de movimentos possível.

 

Você precisa de, no mínimo, 33 movimentos para remover todas as pedras brancas.

---

## Problemas de 47 kyu - atari duplo

_(ordem menu: 7 · ficheiro: `problemas-de-47-kyu-atari-duplo.md`)_

### Atari Duplo

Em certas posições, as pretas podem fazer dois Ataris simultâneos nas brancas.

Como as brancas não podem salvar ambos, as pretas conseguem capturar pelo menos uma pedra branca.

Isso é chamado de "Atari Duplo".



[FIGURA 15 — tipo: challenge | referência SGF: `/sgfs/ryoatari-1.sgf`]
Legenda sugerida: As brancas têm muitos pontos fracos para conseguir cercar as pretas no canto superior esquerdo.

 



[FIGURA 16 — tipo: challenge | referência SGF: `/sgfs/ryoatari-2.sgf`]
Legenda sugerida: Onde você pode fazer um Atari duplo?

---

## Movimentos ilegais

_(ordem menu: 8 · ficheiro: `movimentos-ilegais.md`)_

Você pode jogar em quase todos os lugares do tabuleiro.

Entretanto, há alguns lugares onde as regras impedem a jogada.



[FIGURA 17 — tipo: diagram | referência SGF: `/sgfs/illegal-1.sgf`]
Legenda sugerida: Pretas não podem fazer um movimento para A. (Brancas podem.)
Pois, se as pretas jogarem lá, aquela pedra já estaria cercada.
Suicídio não é permitido no Go.

 



[FIGURA 18 — tipo: diagram | referência SGF: `/sgfs/illegal-2.sgf`]
Legenda sugerida: Entretanto, pretas podem jogar em B.






[FIGURA 19 — tipo: diagram | referência SGF: `/sgfs/illegal-3.sgf`]
Legenda sugerida: Com uma pedra preta em B, as duas pedras brancas seriam cercadas e capturadas. (Veja a figura)

---

## Problemas de 46 Kyu

_(ordem menu: 9 · ficheiro: `problemas-de-46-kyu.md`)_

Agora, você já pode clicar no tabuleiro de novo.



[FIGURA 20 — tipo: challenge | referência SGF: `/sgfs/46K-1.sgf`]
Legenda sugerida: É a vez das pretas. Num primeiro momento, parece que é uma jogada ilegal...

 



[FIGURA 21 — tipo: challenge | referência SGF: `/sgfs/46K-2.sgf`]
Legenda sugerida: 4 pedras pretas estão em perigo!
Mate as pedras brancas antes de morrer!





[FIGURA 22 — tipo: challenge | referência SGF: `/sgfs/46K-3-2shi.sgf`]
Legenda sugerida: Capture as 2 pedras brancas tocando nas pretas.
Aqui, você não consegue capturar as brancas com um movimento apenas.






[FIGURA 23 — tipo: challenge | referência SGF: `/sgfs/46K-4-kake.sgf`]
Legenda sugerida: Se você consegue capturar a pedra branca (A) que está separando as pretas, será um jogo fácil.
[Dica] Não tente atacar o inimigo diretamente.



---

### Por que temos que capturar as pedras do oponente?

Pois **ao remover as pedras do oponente que estão separando as suas, suas pedras que estavam divididas podem ser conectadas.**

Esse é um aspecto muito importante no Go.

**Apenas se lembre de jogar de modo que todas as suas pedras estejam conectadas umas as outras quando puder.**

---

## Problemas de 45 Kyu - Escada

_(ordem menu: 10 · ficheiro: `problemas-de-45-kyu-escada.md`)_

### Aprendendo a Escada

Aqui, você aprenderá a forma chamada de **escada** (às vezes é também conhecido pelo nome japonês **shicho**.)

Você logo perceberá porque isso é chamado assim.



[FIGURA 24 — tipo: challenge | referência SGF: `/sgfs/shicho-1.sgf`]
Legenda sugerida: Capture a pedra branca.
Tente fazer sucessivos Ataris conforme as brancas vão tentando escapar.

 



[FIGURA 25 — tipo: challenge | referência SGF: `/sgfs/shicho-2.sgf`]
Legenda sugerida: A escada de novo. Infelizmente, é sua vez de escapar.
Porém nesse caso, diferente do último, você pode escapar.
Boa sorte!




Você conseguiu escapar do ataque persistente das brancas?

Como você pode ver, se há ajuda (na forma de pedras amigas) no caminho, você consegue escapar do ataque pois você pode se estender mais rápido que o atacante.

O que aconteceria depois com o atacante?

Ele terá uma [vida difícil...](/vida-dificil)

Seja cauteloso quando estiver tentando fugir de um ataque no caso da escada.

> Não jogue Go se você não conhece a escada.

---

## Pedras que não podem ser capturadas - Fazendo 2 olhos!

_(ordem menu: 11 · ficheiro: `fazendo-dois-olhos.md`)_

O paraíso das pretas de novo - as brancas não irão responder. Entretanto, fique atento aos movimentos ilegais.



[FIGURA 26 — tipo: blackplay | referência SGF: `/sgfs/BlackHeaven2.sgf`]
Legenda sugerida: Mate todas as pedras brancas.

 

---

### Pedras que não podem ser capturadas

Como você deve ter percebido no último exemplo, mesmo grupos com muitas pedras podem ser mortos uma vez que estejam cercados.



[FIGURA 27 — tipo: diagram | referência SGF: `/sgfs/0-can-kill.sgf`]
Legenda sugerida: Por exemplo, na figura, as pretas estão completamente cercadas - não há saída - só esperar para serem mortas pelo movimento das brancas no centro.



Mas e no próximo caso?



[FIGURA 28 — tipo: diagram | referência SGF: `/sgfs/1-two-eyes.sgf`]
Legenda sugerida: Embora as pretas estejam cercadas, as brancas não podem capturá-las. Há ainda 2 lugares para matar o grupo preto - eles estão ambos cercados por pedras pretas onde as brancas não podem jogar.



Portanto, uma vez que você faça 2 espaços separados, ou **2 olhos**, suas pedras nunca serão capturadas.

Tal grupo de pedras é considerado **vivo**.

---

Paraíso das pretas novamente.



[FIGURA 29 — tipo: blackplay | referência SGF: `/sgfs/BlackHeaven3.sgf`]
Legenda sugerida: Tente matar todas as pedras brancas.

 

Você conseguiu capturá-las?

Aposto que não! Elas estão vivas pois cada grupo tem 2 olhos.

---

## Problemas de 44 Kyu

_(ordem menu: 12 · ficheiro: `problemas-de-44-kyu.md`)_

### Fazer Dois Olhos



[FIGURA 30 — tipo: challenge | referência SGF: `/sgfs/nigan-iki-1.sgf`]
Legenda sugerida: Agora, as pretas estão completamente cercadas. Qual é a jogada a ser feita?

 

Embora as pretas tenham 3 espaços no meio, eles são apenas um olho.
		
Portanto, você deve fazer dois olhos fazendo uma partição lá.

Se você não fizer, as brancas irão jogar onde as pretas deveriam ter jogado.



[FIGURA 31 — tipo: challenge | referência SGF: `/sgfs/nigan-iki-2.sgf`]
Legenda sugerida: Para esta figura, onde você deve jogar, fazendo uma partição?



<p>Como você pode ver, se seu território é muito pequeno, você terá uma vida difícil.</p>
    <p> Sempre tente fazer seu território grande o suficiente e não se deixe ser cercado. </p>
    <p>E o próximo caso?</p>



[FIGURA 32 — tipo: diagram | referência SGF: `/sgfs/3-alive.sgf`]
Legenda sugerida: Nesse caso, você não necessita fazer uma partição.
Se as brancas fizerem um movimento em A, responda a ele com um movimento em B.
Se as brancas jogarem em B, jogue em A

 

Portanto, você pode sempre fazer dois olhos mesmo que as brancas tentarem atacar.

Entretanto, se você ignorar o ataque das brancas, elas jogarão em <strong>A</strong> e		<strong>B</strong>.

Neste caso, você terá apenas um olho, e certamente estará morto.

---

## Problemas de 43 Kyu

_(ordem menu: 13 · ficheiro: `problemas-de-43-kyu.md`)_

### Semeai (ataque mútuo)



[FIGURA 33 — tipo: challenge | referência SGF: `/sgfs/43K-1-semeai.sgf`]
Legenda sugerida: É a vez das pretas. Dois grupos se cercando.
Ou as 3 pretas ou as 3 brancas irão triunfar.

 

Como acima, quando brancas e pretas se cercam e nenhum dos grupos têm 2 olhos, ambos os lados tentam preencher os espaços vagos, ou **liberdades**, para matar as pedras do adversário.
Essa situação é chamada de "**Semeai**" - ataque mútuo.

No problema acima, ambos os lados têm 3 liberdades. Entretanto, as pretas podem matar as brancas uma jogada antes pois era a vez das pretas jogarem.
Se fosse a vez das brancas, elas ganhariam o Semeai.



[FIGURA 34 — tipo: challenge | referência SGF: `/sgfs/43K-2-semeai.sgf`]
Legenda sugerida: As pretas podem vencer o Semeai.

 



[FIGURA 35 — tipo: challenge | referência SGF: `/sgfs/43K-3-semeai.sgf`]
Legenda sugerida: Salve as três pedras pretas deixadas sozinhas no canto!

---

## Problemas de 42 Kyu

_(ordem menu: 14 · ficheiro: `problemas-de-42-kyu.md`)_

### Dando o troco

Nessa página, você irá aprender a técnica chamada de "dando o troco" (**Uttegaeshi** em Japonês).



[FIGURA 36 — tipo: challenge | referência SGF: `/sgfs/utte-1.sgf`]
Legenda sugerida: É a vez das pretas. Você pode capturar 4 pedras brancas.
[Dica] Você precisa sacrificar uma pedra primeiro.

 




[FIGURA 37 — tipo: challenge | referência SGF: `/sgfs/utte-2.sgf`]
Legenda sugerida: Do mesmo modo.
Ajude as duas pedras pretas matando 2 brancas no meio do tabuleiro.
Assim todas as pedras pretas estarão conectadas.

 




[FIGURA 38 — tipo: challenge | referência SGF: `/sgfs/utte-3.sgf`]
Legenda sugerida: Dando o troco no canto.

---

## Ko (eternidade)

_(ordem menu: 15 · ficheiro: `ko-eternidade.md`)_

Agora, eu irei descrever a regra adicional chamada de **Ko** - que significa eternidade em japonês.

Essa é a última regra para lembrar. Se você ler esta página, você terá entendido todas as regras de Go.

O conceito de Ko é um pouco mais difícil que as regras anteriormente descritas.

Boa sorte!



[FIGURA 39 — tipo: freeplay | referência SGF: `/sgfs/ko-1.sgf`]
Legenda sugerida: Uma pedra branca está em Atari. Capture-a
Já a capturou? Agora olhe cuidadosamente o tabuleiro.
Você verá que a pedra preta F6 acabou de ficar em Atari!
Poderia parecer que as brancas poderiam capturá-la, mas...
O que acontecerá se as brancas jogarem em E6?
Resultará na mesma posição do tabuleiro do início.
Ou seja, ambas pretas e brancas iriam se capturar para sempre!
Portanto, os movimentos que produzem a mesma posição no tabuleiro são proibidas.
Esse é o conceito do Ko (eternidade).
No tabuleiro acima, você pode também fazer os movimentos pelas brancas. Então, tente pegar a pedra preta do meio..
Você verá a mensagem - Jogada ilegal - KO.

 

Nunca mais as brancas poderão capturar aquela pedra preta?

Elas poderão. Porém elas precisam antes jogar em outro lugar.

Assim, isso ocasionará uma posição no tabuleiro diferente. Portanto, **você pode recapturar a pedra do Ko uma vez que você jogue em outro lugar primeiro.**

Faça um movimento aonde você quiser para as brancas no tabuleiro abaixo.

E faça também um movimento com as pretas também.
Agora é a vez das brancas. Elas podem agora pegar a pedra preta de volta.

Confirme você mesmo no tabuleiro acima.

Agora é a vez das pretas. Entretanto elas não podem capturar a pedra branca imediatamente.

Confirme você mesmo no tabuleiro. Você verá de novo a mensagem - **Jogada ilegal - KO**.

Elas podem capturar a pedra branca se elas fizerem movimentos em outros lugares como as brancas fizeram.

No tabuleiro acima, você pode fazer movimentos pelas brancas e pelas pretas.

Tente entender o conceito da regra do Ko jogando nele.

Você pode desfazer seus movimentos pressionando o botão **Voltar**.

---

### Como o Ko aparece num jogo real?



[FIGURA 40 — tipo: freeplay | referência SGF: `/sgfs/ko-2.sgf`]
Legenda sugerida: Olhe o diagrama. Cinco pedras pretas na parte de cima do tabuleiro estão prestes a morrer.
Primeiro, capture uma pedra branca jogando em E8.
Agora, a batalha do Ko começou!
Cinco pedras brancas estão em perigo e elas não podem capturar a pedra preta jogando em D8 porque estamos num caso de Ko.
Então, elas jogam em algum lugar onde as pretas não podem ignorar como por exemplo E2.
Como 8 pedras pretas serão capturadas se isso for ignorado, as pretas jogam em E1.
Agora, as brancas podem capturar a pedra do Ko de volta jogando em D8.
Então, as pretas irão jogar num lugar onde as brancas não podem ignorar, como por exemplo B4. Se as brancas responderemem A4, as pretas podem capturar as pedras do Ko de novo jogando em E8
Nós chamamos isso de uma batalha de Ko.

 

A coisa mais importante é: para ganhar uma batalha de Ko, ache uma ameaça - um lugar onde você pode ganhar muito com 2 movimentos sucessivos. Se o oponente não permitir, a batalha de Ko continua. Se ele ignorar a ameaça, você pode fazer dois movimentos sucessivos enquanto ele ganha o Ko.

Ko é difícil pois uma batalha de Ko envolve muitos movimentos estratégicos no tabuleiro todo.

Para os iniciantes, **apenas se lembre que movimentos que produzem a mesma posição no tabuleiro são proibidos.**
É isso. A regra do Ko, não permite que situações como essa aconteçam.

Ko não é apenas uma regra restritiva do Go, mas sim uma emoção a mais numa partida.

---

## Problemas de 40 Kyu

_(ordem menu: 16 · ficheiro: `problemas-de-40-kyu.md`)_

Quando você é de 40 Kyu, você necessita resolver problemas que são um pouco mais difíceis.

Boa sorte!



[FIGURA 41 — tipo: challenge | referência SGF: `/sgfs/tsuru.sgf`]
Legenda sugerida: Capture as 3 pedras brancas.

 

Esse formato é conhecido como "Ave no Ninho" no Japão.

É muito interessante quando você faz isso em jogos reais!




[FIGURA 42 — tipo: challenge | referência SGF: `/sgfs/nigan.sgf`]
Legenda sugerida: As pretas estão cercadas ou cercando???
Todas as pedras pretas irão desaparecer com mais 2 movimentos das brancas.
Antes que isso aconteça, mate as brancas.

 

Esse problema é um tipo de [Semeai](/problemas-de-43-kyu).

---

## Problemas de 39 Kyu

_(ordem menu: 17 · ficheiro: `problemas-de-39-kyu.md`)_

Se, por azar, um grupo de pedras suas for cercado, tente formar um território com elas.

Ou seja, tente fazer dois olhos.

Se você ainda não entende o conceito de dois olhos, [clique aqui](/fazendo-dois-olhos).



[FIGURA 43 — tipo: freeplay | referência SGF: `/sgfs/falseeye0.sgf`]
Legenda sugerida: Aqui você aprenderá o conceito de um olho falso - parece ser um olho mas não é.
Na figura, o grupo preto tem dois olhos?
Há um olho em F5.
D5 parece ser um outro olho pois está cercado por 4 pedras pretas.
Entretanto, ele não é um olho pois C5 está em Atari e você tem que conectar em D5.
Portanto você só tem um olho - o que significa morte.
Nós chamamos um olho como o D5 de um olho falso.
Jogue livremente para explorar as possibilidades.

 



[FIGURA 44 — tipo: challenge | referência SGF: `/sgfs/falseeye1.sgf`]
Legenda sugerida: Tente não fazer um olho falso.

 



[FIGURA 45 — tipo: challenge | referência SGF: `/sgfs/falseeye2.sgf`]
Legenda sugerida: Ambos os olhos ainda não estão muito claros.

 



[FIGURA 46 — tipo: challenge | referência SGF: `/sgfs/falseeye3.sgf`]
Legenda sugerida: Preta está quase cercada.
Tente viver nessa situação.

 

Para iniciantes, pode ser muito difícil saber se um olho é verdadeiro ou é falso.

---

## Problemas de 38 Kyu - Luta no canto

_(ordem menu: 18 · ficheiro: `problemas-de-38-kyu-luta-no-canto.md`)_

Próximo aos cantos do tabuleiro, há menos maneiras de escapar e pode ser capturado mais facilmente.

Portanto as variações tendem a ser mais complexas.

É dito que a marca de um mestre do Go é a habilidade de sobreviver nos cantos.



[FIGURA 47 — tipo: challenge | referência SGF: `/sgfs/corner1.sgf`]
Legenda sugerida: Essa é a situação de Semeai no canto.

 



[FIGURA 48 — tipo: challenge | referência SGF: `/sgfs/corner2.sgf`]
Legenda sugerida: Capture as pedras brancas as quais estão cortando as pretas.
Fique atento ao lado por onde você faz o Atari.

---

## Problemas de 37 Kyu

_(ordem menu: 19 · ficheiro: `problemas-de-37-kyu.md`)_

[FIGURA 49 — tipo: challenge | referência SGF: `/sgfs/chika1.sgf`]
Legenda sugerida: Isso me deixa tonto...

 



[FIGURA 50 — tipo: challenge | referência SGF: `/sgfs/chika2.sgf`]
Legenda sugerida: O que eu devo fazer primeiro?
Dica: Escape primeiro, ataque depois.

---

## Como começar

_(ordem menu: 20 · ficheiro: `como-comecar.md`)_

Até agora você pode até já ter entendido como matar as pedras. Entretanto, no começo de um jogo real, você tem que jogar no tabuleiro vazio.

O objetivo do Go é cercar o máximo de território possível. No início você tem que tentar cercar território, isto é, espaços vazios.




[FIGURA 51 — tipo: diagram | referência SGF: `/sgfs/comecar-1.sgf`]
Legenda sugerida: Na figura, há dois grupos de pedras pretas: um no canto superior esquerdo e um do lado direito. Cada um deles tem 9 espaços, ou 9 pontos.
Um grupo branco no meio também tem 9 pontos. Esses espaços completamente cercados por pedras da mesma cor são chamados de territórios.
Agora, os três grupos acima, cada um deles tem um território de 9 pontos. Conte o número de pedras necessárias para cercar o território.• Canto - 6 pedras
• Lado - 9 pedras
• Centro - 12 pedras

Portanto, você pode cercar territórios nos cantos mais eficientemente, enquanto que territórios no meio são menos eficientes. Assim, no começo do jogo, cada jogador irá tentar cercar os cantos do tabuleiro. Você raramente vê jogadas no centro.

 

---
Você pode ver como jogos reais começam num tabuleiro 13x13 logo abaixo.



[FIGURA 52 — tipo: review | referência SGF: `/sgfs/comecar-2.sgf`]
Legenda sugerida: Primeiro, cada jogador jogou em posições perto de dois cantos. O primeiro movimento das pretas é chamado de 3-3 pontos (ou san-san) pois está localizado na terceira linha vertical e horizantal contando a partir do lado mais próximo. Esse movimento garante uma posição que pode obter o canto.
Na próxima jogada, brancas também jogaram um 3-3 pontos. O próximo movimento das pretas e chamado de 4-4 pontos (ou hoshi) onde está marcado com um pequeno círculo preto. Esse ponto pode cercar um canto maior que uma jogada em 3-3 pontos. Entretanto, ele pode ser invadido mais facimente pois tem mais espaços entre ele e o limite do tabuleiro.
O quarto movimento das brancas também é muito popular.
É claro, você pode jogar em qualquer lugar no tabuleiro se não for um movimento ilegal. Geralmente, um jogo prossegue dos cantos aos lados e eventualmente para o centro. Embora os cantos sejam os melhores lugares para se ganhar território, ninguém faria movimentos como M2 ou N1 pois o ganho seria muito pequeno.

---

## Começando

_(ordem menu: 21 · ficheiro: `comecando.md`)_

Continuação da [página anterior](/como-comecar).




[FIGURA 53 — tipo: review | referência SGF: `/sgfs/comecando.sgf`]
Legenda sugerida: No quinto movimento, as pretas reforçaram o seu canto inferior esquerdo ao jogar em F3. Esses tipos de jogadas de fortalecimento são chamadas de Shimari( ou movimentos de 'cerco')
No movimento seguinte, as brancas também fortaleceram o seu canto inferior direito com um shimari diferente.
Em seguida, as pretas colocaram uma pedra perto de uma pedra branca.(J10) Esse movimento implica que se as brancas ignorarem a pedra preta, as pretas invadirão o canto jogando em algum lugar como por exemplo em L11. Esse tipo de aproximação é chamado de Kakari(atacando ou 'mirando').
Então as brancas "tocaram" a pedra preta ao jogar em J11 para contra atacar. Depois disso, cada lado se fortaleceu.(K11,G10)
As brancas acharam que estava parecendo como se o lado esquerdo do tabuleiro fosse se tornar território das pretas. Portanto elas invadiram o lado esquerdo para evitar isso! Esses movimentos são chamados de Uchikomi (quebrando, entrando subitamente ou invadindo) - A propósito, você não tem que se lembrar dessas palavras japonesas agora.
Esse é um dos exemplos de como os jogos começam.

---

## Problemas de 36 Kyu

_(ordem menu: 22 · ficheiro: `problemas-de-36-kyu.md`)_

[FIGURA 54 — tipo: challenge | referência SGF: `/sgfs/kamitori.sgf`]
Legenda sugerida: As pretas estão bloqueadas no canto inferior esquerdo. O grupo só tem 1 olho.
Faça um olho a mais para sobreviver.

 



[FIGURA 55 — tipo: challenge | referência SGF: `/sgfs/oiotoshi.sgf`]
Legenda sugerida: Você poderia fazer um outro olho capturando uma pedra branca.
As pretas estão bloqueando as brancas no canto inferior. As brancas ainda não têm 2 olhos.
Então as brancas jogaram em G2.
Olhe o que acontece se as pretas responderem em F1 ( ou G1) antes de encontrar a resposta correta.

 

Se as brancas conseguirem capturar duas pedras pretas no canto inferior, elas podem sobreviver facilmente.

Suas pedras estavam em Atari. Então você está fugindo.

No próximo momento todas as suas pedras estão perdidas!

Essa tragédia é chamada de "**Oiotoshi**".

[DICA]: Você deve escapar **antes** de ficar em Atari.

---

## Fim do jogo

_(ordem menu: 23 · ficheiro: `fim-do-jogo.md`)_

Aqui você aprenderá quando um jogo está para acabar e como contar território usando tabuleiros de 5x5.





[FIGURA 56 — tipo: diagram | referência SGF: `/sgfs/fim-1.sgf`]
Legenda sugerida: Ambos os lados fizeram 5 movimentos cada e o jogo é considerado acabado. Pretas têm 5 pontos à esquerda e as brancas têm 10 pontos à direita.

Portanto brancas ganharam por 5 pontos.

Você pode calcular o território contando as interseções de linhas verticais e horizontais. Cantos e bordas também são território. Lembre-se que as pedras não são contadas como território.

 



[FIGURA 57 — tipo: diagram | referência SGF: `/sgfs/fim-2.sgf`]
Legenda sugerida: Um jogo é considerado acabado quando ambos os lados passam, pois eles não querem fazer mais movimentos.

Por que podemos considerá-lo um jogo terminado? Continuando o jogo, assuma que as pretas fizeram um movimento dentro do território das brancas.

As brancas podem facilemente capturar a invasora. Veja na figura.

Portanto as pretas não precisam fazer tal movimento.

 



[FIGURA 58 — tipo: diagram | referência SGF: `/sgfs/fim-3.sgf`]
Legenda sugerida: Agora, o que acontece se você fizer um movimento dentro do seu próprio território?

Com esse movimento você reduziria o seu território de 1 ponto. Ninguém quer fazer isso!

Portanto, a primeira figura dessa página é considerada como fim do jogo. (Embora algumas vezes você tenha que jogar dentro do seu próprio território para fazer dois olhos ou para fortalecer seus limites.)

 



[FIGURA 59 — tipo: diagram | referência SGF: `/sgfs/fim-4.sgf`]
Legenda sugerida: Pretas têm 5 pontos e Brancas têm 6 pontos - brancas ganharam por 1 ponto.

E esses 2 pontos no centro? Eles são chamados "Dame" - área neutra - a qual não pertence a nenhum lado.

Você pode jogar aqui se você quiser, embora você não perderá nem ganhará nenhum ponto.

 

---

### Quando um jogo acaba?

- Quando ambos os lados não querem jogar em lugar nenhum e passam sucessivamente. Então ambos os territórios são contados e o maior vence. Sua pontuação final é seu território no tabuleiro, mais as pedras capturadas por você que foram removidas do tabuleiro.
- Quando um dos lados acha que não pode ganhar não importando o que faça e então desiste. (Diferente de muitos outros jogos, isso é considerado uma saída honrosa. Continuar jogando face a uma derrotata iminente não o é.)

---

## Fim do jogo - Parte 2

_(ordem menu: 24 · ficheiro: `fim-do-jogo-2.md`)_

Agora, voltemos ao tabuleiro 9x9.



[FIGURA 60 — tipo: diagram | referência SGF: `/sgfs/fim2-1.sgf`]
Legenda sugerida: Será nesta figura podemos considerar o fim de uma partida?

Parece que as brancas tiveram uma grande vitória. Entretanto...

 



[FIGURA 61 — tipo: diagram | referência SGF: `/sgfs/fim2-2.sgf`]
Legenda sugerida: Se você cercar uma área muito larga, seu adversário pode invadi-la.

As pretas entram na área das brancas. Como há uma grande área onde as pretas podem jogar dentro da "suposta" área branca, se as pretas jogarem bem, elas podem ganhar território lá.

Isso pode ser um pouco difícil pois as brancas fizeram um muro muito forte no lado esquerdo dessa área.

Se as pretas tiverem sucesso, ele pode reduzir em muito o território branco.

 



[FIGURA 62 — tipo: diagram | referência SGF: `/sgfs/fim2-3.sgf`]
Legenda sugerida: Embora esteja longe do fim do jogo, as brancas têm melhores chances de ganhar esse jogo.

Você já consegue ver por quê?

---

## Corte

_(ordem menu: 25 · ficheiro: `corte.md`)_

[FIGURA 63 — tipo: challenge | referência SGF: `/sgfs/kiri1.sgf`]
Legenda sugerida: Parece que as brancas têm um território maior que o das pretas.

Entretanto, o muro delas tem um ponto fraco.

 

Isso nos mostra que é possível "cortar" pedras que estão diagonalmente conectadas.

Se as pedras são cortadas em duas partes, cada parte tem que viver separadamente - você estará em uma situação difícil.



[FIGURA 64 — tipo: challenge | referência SGF: `/sgfs/kiri2.sgf`]
Legenda sugerida: Pretas têm 30 pontos enquanto que as brancas têm 31 pontos. Portanto parece que as brancas ganharam por um ponto.

Entretanto, o território no lado inferior não é de fato das brancas.

Apenas corte o muro das brancas.

---

## Defesa

_(ordem menu: 26 · ficheiro: `defesa.md`)_

Agora você sabe que pedras conectadas diagonalmente podem ser cortadas pelo oponente. Antes de ser cortado, você pode se defender.



[FIGURA 65 — tipo: diagram | referência SGF: `/sgfs/defesa1.sgf`]
Legenda sugerida: Se o branco joga aqui um corte em F6, duas pedras pedras (F7 e E6) estarão em perigo.

É por isso que o preto deve jogar a defensivamente antes do corte.

Este é um movimento de conexão.

 



[FIGURA 66 — tipo: diagram | referência SGF: `/sgfs/defesa2.sgf`]
Legenda sugerida: Aqui, depois de F6, o preto conecta suas pedras com força.

Isso é uma conexão direta. O branco não poderá mais cortá-las.

 

Abaixo, você pode ver uma **conexão indireta**.




[FIGURA 67 — tipo: freeplay | referência SGF: `/sgfs/defesa3.sgf`]
Legenda sugerida: O branco pode, claro, jogar F6 , mas ele será morto instantaneamente com F5 . Por favor, tente analisá-lo no quadro.

As pedras estão virtualmente conectadas.

Jogue à vontade no tabuleiro.

 

Esses tipos de conexões indiretas são jogadas mais elaboradas do que as conexões diretas.

Se você souber exatamente quando deve fazer uma conexão indireta, você não é um mais iniciante, com certeza.



[FIGURA 68 — tipo: freeplay | referência SGF: `/sgfs/defesa4.sgf`]
Legenda sugerida: Na figura, as pretas têm dois pontos de corte em E5 e F4.

Você pode pensar qual deles será cortado... Há um bom movimento o qual defende os dois pontos fracos simultaneamente!

Por favor, faça um movimento em F5. Agora as brancas não podem jogar nem em E5 nem em F4. Esse é o motivo pelo qual F5 é uma conexão indireta para ambos.

Por causa da forma, essa conexão é chamada de conexão trombeta.

---

## Um ponto acima

_(ordem menu: 27 · ficheiro: `um-ponto-acima.md`)_

Aqui, você aprenderá como jogar quando as pedras brancas e as pretas não estão diretamente atacando umas as outras

Essa é a hora de você fazer movimentos que fortaleçam sua posição, preparando-se para uma futura guerra ou ainda fazendo algum território.



[FIGURA 69 — tipo: diagram | referência SGF: `/sgfs/acima1.sgf`]
Legenda sugerida: Esse movimento ( D5) é chamado Um Ponto Acima (ou Ikken tobi).

O movimento de pulo para D5 está quase conectado ao D3. Portanto, tal movimento pode ser usado de muitas maneiras como ataque, defesa ou fuga.

 

> Nenhum movimento de Um Ponto Acima é um mau movimento.

> Faça o Um Ponto Acima se você não tem a menor ideia de onde jogar.



[FIGURA 70 — tipo: diagram | referência SGF: `/sgfs/acima2.sgf`]
Legenda sugerida: Se a branca jogar bem perto de sua posição, o Um Ponto Acima é bem recomendado.

Esse movimento defende sua pedra C3 enquanto você aumenta o seu território à esquerda.

 



[FIGURA 71 — tipo: diagram | referência SGF: `/sgfs/acima3.sgf`]
Legenda sugerida: Se você ignorar o movimento de aproximação da branca E3 e jogar em lugares irrelevantes como G7, sua pedra C3 pode ser atacada de ambos os lados.

---

## Mais sobre pulos

_(ordem menu: 28 · ficheiro: `mais-sobre-pulos.md`)_

[FIGURA 72 — tipo: diagram | referência SGF: `/sgfs/maispulos1.sgf`]
Legenda sugerida: Esse é chamado de Dois Pontos Acima (ou Niken tobi).

Embora ele lhe dará maior influência sobre o tabuleiro, ele é mais fácil de ser cortado pelo inimigo já que há um espaço maior entre as pedras.

Há também o Três Pontos Acima e Quatro Pontos Acima.

Esses grandes pulos são freqüentemente usados como movimentos no início da partida.

 



[FIGURA 73 — tipo: diagram | referência SGF: `/sgfs/maispulos2.sgf`]
Legenda sugerida: Esse pulo é chamado de Jogada de Cavalo (Keima) como no xadrez.

Jogadas de Cavalo são freqüentemente usados para cercar território nos cantos como está mostrado à esquerda.

 



[FIGURA 74 — tipo: diagram | referência SGF: `/sgfs/maispulos3.sgf`]
Legenda sugerida: Esse é chamado de Kosumi - um movimento diagonal.

As duas pedras estão virtualmente conectadas mas é um pouco lento pois a extensão de território cercado a partir da primeira pedra é menor que a do caso anterior.

---

## Um tapa na cara

_(ordem menu: 29 · ficheiro: `um-tapa-na-cara.md`)_

Aqui, você aprenderá algumas técnicas práticas necessárias para iniciar um jogo real.

---




[FIGURA 75 — tipo: diagram | referência SGF: `/sgfs/tsukehane1.sgf`]
Legenda sugerida: Você joga com as Pretas, como sempre.

As brancas colocam uma pedra E4 muito perto de você - este movimento é chamado de "toque".

Como você deve responder ao toque?

 





[FIGURA 76 — tipo: diagram | referência SGF: `/sgfs/tsukehane2.sgf`]
Legenda sugerida: Neste caso, o movimento do preto F4 mostrado abaixo é bom.

Este movimento diminui a liberdade da pedra branca de 3 para 2.

É quase como se o preto estivesse dando um tapa na cara do branco.

Ataque o atacante!

 




[FIGURA 77 — tipo: diagram | referência SGF: `/sgfs/tsukehane3.sgf`]
Legenda sugerida: Continuando o diagrama de cima, se o branco jogou em outro lugar como E7, o preto pode continuar atacando a pedra branca como abaixo. Agora a pedra E4 está no Atari - com mais um movimento, você pode capturá-la.

 

---



[FIGURA 78 — tipo: diagram | referência SGF: `/sgfs/tsukehane4.sgf`]
Legenda sugerida: Continuando a partir da primeira figura, se o preto não responder ao toque do branco e jogar em outro lugar como F7, como o branco jogaria?

O branco continuará atacando dando um tapa na cara do preto.

Você consegue ver que E3 preto está com problemas?

 

---

### É hora de praticar!



[FIGURA 79 — tipo: challenge | referência SGF: `/sgfs/tsukehane.sgf`]
Legenda sugerida: As brancas acabaram de tocar na sua pedra. Qual a resposta mais apropriada?

Há duas respostas corretas. Tente acertar!

---

## Extensão simples

_(ordem menu: 30 · ficheiro: `extensao-simples.md`)_

Mais uma técnica prática necessária em jogos.

---



[FIGURA 80 — tipo: diagram | referência SGF: `/sgfs/hanenobi1.sgf`]
Legenda sugerida: Desta vez, você é o atacante.

Você tocou a pedra branca em E7 e então o branco atacou de volta com F6.

Qual é o melhor próximo movimento?

 




[FIGURA 81 — tipo: diagram | referência SGF: `/sgfs/hanenobi2.sgf`]
Legenda sugerida: Quando você se estende da pedra em E6 jogando D6, você fortalece as pedras aumentando sua liberdade de 2 para 4.

 




[FIGURA 82 — tipo: diagram | referência SGF: `/sgfs/hanenobi3.sgf`]
Legenda sugerida: Você também pode estender em direção à parte inferior como abaixo.

A direção que você deve estender depende da situação.

Você não precisa pensar sobre isso por enquanto, mas lembre-se de "estender".

 




[FIGURA 83 — tipo: diagram | referência SGF: `/sgfs/hanenobi4.sgf`]
Legenda sugerida: Se o preto não se estendesse, o que aconteceria?

Provavelmente, o branco irá atacar a pedra em E6.

Você deveria ter continuado atacando as brancas depois de jogar E6, tocando E7.

 


---

### É hora de praticar!



[FIGURA 84 — tipo: challenge | referência SGF: `/sgfs/hanenobi.sgf`]
Legenda sugerida: Estenda sua pedra depois de levar um tapa na cara.

Existem duas respostas certas. Encontre as duas!

Lembre-se de que um movimento de extensão pode proteger suas pedras.

---

## Aproximando-se do fim do jogo

_(ordem menu: 31 · ficheiro: `aproximando-o-fim-do-jogo.md`)_

Quando o jogo vai chegando ao fim, e ambos os lados já têm os seus territórios definidos, tudo o que você deve fazer é delimitar as bordas do seu território claramente.

Nesse ponto, você deve tentar empurrar a borda para dentro do território inimigo, aumentando o seu território o máximo possível e ao mesmo tempo reduzindo o do adversário.



[FIGURA 85 — tipo: challenge | referência SGF: `/sgfs/yose1.sgf`]
Legenda sugerida: As pretas ocupam o lado esquerdo e as brancas controlam o lado direito.

Entretanto, ainda há alguns lugares onde os limites não estão claros. Onde você pode jogar que possibilitará maior lucro de território?

 



[FIGURA 86 — tipo: challenge | referência SGF: `/sgfs/yose2.sgf`]
Legenda sugerida: As pretas têm o lado esquerdo e as brancas o lado direito. O jogo está quase no fim.

Mas seja cuidadoso até o jogo acabar de verdade!

Brancas acabaram de jogar em D1.

Se você ignorar, seu precioso território será invadido.

---

## Use seu instinto!

_(ordem menu: 32 · ficheiro: `use-seu-instinto.md`)_

[FIGURA 87 — tipo: challenge | referência SGF: `/sgfs/hitome-1.sgf`]
Legenda sugerida: Sempre tente conectar suas pedras.

Pois quanto maior o grupo de pedras suas, mais difícil fica cercá-lo.

 




[FIGURA 88 — tipo: challenge | referência SGF: `/sgfs/hitome-2.sgf`]
Legenda sugerida: Brancas acabram de jogar em E3.

Como você responderia?

 




[FIGURA 89 — tipo: challenge | referência SGF: `/sgfs/hitome-3.sgf`]
Legenda sugerida: Continuando a situação anterior...

Brancas cortam você ao jogar em F2.

Essa é uma jogada imprudente. Mas como você a puniria?

---

## Jogos de exemplo

_(ordem menu: 33 · ficheiro: `jogos-exemplo.md`)_

No tabuleiro abaixo, você pode ver um jogo real do primeiro movimento ao último.

Clicando no botão **">"**, você pode avançar um movimento com a sua explicação.

Fique apertando até que páre de avançar.

Esse é um jogo num tabuleiro 9 x 9.





[FIGURA 90 — tipo: review | referência SGF: `/sgfs/exemplo1.sgf`]
Legenda sugerida: (sem legenda no site)

 

No fim as pretas têm 28 pontos e as brancas fizeram 24 pontos.

Mas como você pode ver as pedras **capturadas (Capturas)** são: 1 pedra branca foi capturada portanto o território das brancas é diminuído de um ponto.

Assim, as pretas ganharam por 5 pontos.

Nesse jogo, as pretas controlaram o canto esquerdo e as brancas o lado direito amistosamente, sem muita agressividade, do início até o fim do jogo.

---

O próximo jogo é bem mais emocionante!




[FIGURA 91 — tipo: review | referência SGF: `/sgfs/exemplo2.sgf`]
Legenda sugerida: (sem legenda no site)

 

Não se preocupe se você não esteja entendendo o que está acontecendo.

No primeiro jogo, ambos os jogadores tentaram cercar os espaços vagos compartilhando territórios.

Nesse último jogo, a partir do quarto movimento das brancas - o corte - ambos tentaram capturar as pedras do oponente.

Finalmente, as pretas ocuparam o canto superior direito e o inferior esquerdo, e as brancas obtiveram o inferior direito e o superior esquerdo.

Brancas têm 18 pontos e pretas 14 pontos.

Além disso, as pretas capturaram 2 pedras brancas enquanto que as brancas mataram 7 pedras pretas.

Note que as 2 pedras pretas no canto superior esquerdo estão mortas pois não há como escapar da posição em que estão e estarão certamente mortas.

As brancas não tem que se incomodar em pegar essas duas jogando em **C9**.

Entretanto, quando o jogo acaba, as brancas podem tirá-las do tabuleiro e adicioná-las as pedras capturadas.

O resultado final é:

- Pretas : 14 - 7 = 7 pontos
- Brancas: 18 - 2 = 16 pontos

Desse modo, as brancas venceram por 9 pontos.

---

## Komi

_(ordem menu: 34 · ficheiro: `komi.md`)_

### Komi

Em jogos normais, as pretas sempre jogam primeiro.

Portanto, **as pretas têm uma pequena vantagem** sobre as brancas.

Para compensar, as brancas às vezes recebem alguns pontos de bônus chamados de **Komi**, ao contar o território no fim do jogo.

Esse bônus é normalmente **6.5 pontos**. Isso significa que o valordo primeiro movimento é considerado com sendo de aproximadamente 6 pontos e meio.

O meio ponto adicional é colocado para evitar empate.

Por exemplo, se as pretas têm 7 territórios a mais que as brancas, as pretas ganham por 0,5 ponto.

Se as pretas têm 6 pontos a mais, as brancas ganham por 0,5 ponto.

Antigamente não havia o sistema de Komi. Como as pessoas foram percebendo a ligeira vantagem das pretas, Komi foi sendo introduzido.

A pontuação do Komi tem mudado ao longo do tempo. Quando ele foi introduzido nos jogos Profissionais Japoneses, ele era de 4,5 pontos.

Entretanto, as pretas ainda tinham maior chance de ganhar, então Komi foi aumentado para 5,5 pontos e, mais atualmente, para 6,5.

Com o sistema de Komi, **Go quase não tem mais empates** e se tornou um jogo mais emocionante e justo.

Se quiser mais informações sobre Komi, [entre aqui no site Sensei's Library](https://senseis.xmp.net/?Komi), uma referência para o Go.

---

### O Handicap

Quando a habilidade dos dois jogadores é diferente, o mais fraco coloca algum número de peças no tabuleiro antes de começar o jogo. Isso é chamado de "**handicap**".

Em jogos com handicap, **o mais fraco joga com as pretas**.

As pretas jogam as pedras do handicap nos pontos marcados e então as brancas fazem o primeiro movimento.

O núemro de pedras no handicap reflete a diferença dos dois jogadores.

Se o mais fraco é 5 Kyu e o mais forte é 2 Kyu, 3 handicaps seriam usados

Com as pedras de handicap, as preta têm vantagem sobre todos os aspectos do jogo - ataque, defesa, cerco de territórios, etc.

Dizem que **uma pedra de handicap é equivalente a 10 pontos** de territórios.

Portanto, se você jogasse um jogo comigo e perdesse por 50 pontos, um handicap de 5 pedras seria apropriado para que ficássemos com as mesmas chances de ganhar.

A posição das pedras do handicap é convencionamente especificada abaixo.




[FIGURA 92 — tipo: diagram | referência SGF: `/sgfs/komi1.sgf`]
Legenda sugerida: Handicap de 9

 



[FIGURA 93 — tipo: diagram | referência SGF: `/sgfs/komi2.sgf`]
Legenda sugerida: Handicap de 6

 



[FIGURA 94 — tipo: diagram | referência SGF: `/sgfs/komi3.sgf`]
Legenda sugerida: Handicap de 5

 



[FIGURA 95 — tipo: diagram | referência SGF: `/sgfs/komi4.sgf`]
Legenda sugerida: Handicap de 4

 

Em todos os casos, as pedras de handicap são colocadas nos **pontos 4-4 (pontos de estrela)** os quais estão marcados com pequenos círculos pretos. Entretanto, você pode ter mais de 9 pedras de handicap colocando-as em quaisquer outros lugares.

Num jogo com handicap, **todos podem se divertir jogando Go com a mesma chance de ganhar não importando a diferença de habilidade entre os jogadores**, sem alterar as regras.

---

## Epílogo

_(ordem menu: 35 · ficheiro: `epilogo.md`)_

### Aprenda a Jogar Go Interativamente (tradução do The Interactive Way To Go) acabou.

Espero que você tenha gostado e que possa jogar esse interessante e realmente excitante jogo chamado Go.

Agora, o que você deve fazer para continuar jogando Go e para ficar cada vez melhor?

### 1. Jogue Go
   
Go é um jogo. Divirta-se jogando o mais possível. Você aprenderá muito apenas jogando.

Se não tiver ninguém com quem jogar, vá para os servidores de Go na Internet.

Há muitos servidores de Go na Net:

- [KGS Go Server](https://www.gokgs.com/) - Na minha opinião, esse é o melhor lugar para jogar Go. Um dos mais famosos servidores de Go.
- [Pandanet IGS](http://pandanet-igs.com/) - Famoso servidor de Go também. Ótimo local para praticar.
- [OGS](https://online-go.com/) - Outro ótimo servidor para praticar Go.
- [Play Go](http://www.playok.com/pt/go/) - Outro local para jogar Go.
Você pode também jogar com programas de computador e apps para celular. Muitos produtos estão por aí. Programas para jogar Go são geralmente muito fracos, mas estão cada vez mais fortes e então dá pra aprender e se divertir bastante.

[Igowin](http://www.smart-games.com/igowin.html) é um dos melhores softwares para principiantes. É gratuito.

Não deixe de visitar o incrível site sobre Go [Sensei's Library](http://senseis.xmp.net/) com inúmeras informações e constantemente atualizado (em Inglês).

### 2. Observe jogos
Nos servidores de Go, você pode assistir pessoas jogando Go.

Você pode aprender bastante observando jogos de pessoas experientes.

Aprender com jogadores profissionais é o melhor jeito de se aperfeiçoar.

### 3. Resolva problemas
   
Os [Problemas de vida e morte (Tsumego)](/tsumego-facil) são problemas de como matar grupos localmente e como não deixar que sejam mortos. Há muitas técnicas úteis lá.

---
Continua com a nova área de problemas de Go, as partidas jogadas pelo AlphaGo e um pouco mais sobre os fundamentos do Go...

---

