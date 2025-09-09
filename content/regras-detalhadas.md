---
title: "Regras detalhadas"
date: 2021-08-05T09:37:54-03:00
draft: false
menu: "theory"
weight: 4
---

![Imagem de tableiro de Go](/img/go3.jpg)

## Regras básicas do Go

### 1. Go é jogado entre dois jogadores.
### 2. Um dos jogadores usa as pedras brancas e o outro as pretas. (Os jogadores se revezam colocando as pedras no tabuleiro, uma a uma. O primeiro movimento, isto é, a colocação da primeira pedra no tabuleiro, é feito pelas Pretas. Num jogo com "handicap", entretanto, Brancas jogam primeiro.)
### 3. A pedra deve ser colocada em um dos cruzamentos.
### 4. A pedra, uma vez colocada, não pode ser retirada (exceto quando se aplica a regra número 6).
### 5. O jogador que obtem mais território ganha o jogo.
### 6. As pedras que perderem suas liberdades, ou "espaço para respirar", são retiradas do tabuleiro.
### 7. Nenhuma pedra pode ser colocada num cruzamento onde não tenha liberdade.
### 8. Há restrições especiais nos movimentos de um jogador, na situação chamada Ko.
### 9. Regra referente ao jogo com "handicap" ou vantagem.

---

### Território (Regra número 5)

{{< diagram sgf="/sgfs/regras1.sgf" description="O jogador com mais território vence o jogo. Mas como contamos o território? O território consiste nos cruzamentos, cercados de tal maneira pelas peças do jogador, que o adversário não consegue invadi-lo. O número de cruzamentos cercados pelas peças Brancas e pelas Pretas consiste respectivamente no número de pontos obtidos pelo jogador das Brancas e pelo jogador com as Pretas.">}} 

---
### Limites (Cont. regra número 5)

{{< diagram sgf="/sgfs/regras2.sgf" description="A figura ao lado é uma análise do diagrama anterior. Observe que as Pretas delimitam um território sólido que cerca os <strong>triângulos</strong>, assim como as Brancas, que cercam as áreas marcadas com <strong>círculos</strong>.</p><p>As quantidades de triângulos e círculos no diagrama indicam os <strong>pontos</strong> dados a cada território. ">}} 


{{< diagram sgf="/sgfs/regras3.sgf" description="Pontuações:</p><p><ul><li>Pretas: 9 + 31 = 40</li><li>Brancas: 17 + 22 = 39</li></ul><p>Pretas venceram por 1 ponto.">}} 

---
### Liberdades ou espaços para respirar (Regra número 6)

{{< diagram sgf="/sgfs/regras4.sgf" description="Quando todos os pontos adjacentes a uma pedra, ou grupo de pedras, estão ocupados por pedras do adversário, a pedra(ou grupo de pedras) é capturada(o) e retirada(o) do tabuleiro.</p><p>Em A, B e C na figura, os pontos indicados por círculos são chamados de liberdades da pedra a qual se referem. Em D, E e F, todas as liberdades da Preta foram \"tomadas\" pelas Brancas. Assim, não podendo mais respirar, a peça Preta(ou conjunto de peças sem liberdade) é retirada(o) do tabuleiro.">}} 

---

### Removendo as peças capturadas (Cont. Regra número 6)


{{< diagram sgf="/sgfs/0-atari.sgf" description="Essa sequência refere-se a uma captura. Você pode ver que inicialmente a pedra branca tem uma liberdade (ponto \"a\").">}} 

{{< diagram sgf="/sgfs/1-before-catch.sgf" description="Após o jogador colocar a pedra Preta no ponto \"a\" ">}} 

{{< diagram sgf="/sgfs/2-after-catch.sgf" description="a pedra branca é capturada, retirada do tabuleiro e significará um ponto a menos para o jogador das Brancas.">}} 

Normalmente, no final da partida, para facilitar a contagem, as pedras capturadas são colocadas no território de mesma cor da pedra.

  
---
### O ponto "irrespirável" (Regra número 7)

{{< diagram sgf="/sgfs/regrairrespiravel.sgf" description="Nenhuma peça pode ser posta num lugar onde não haja liberdade. Assim, no diagrama, na situação \"A\" as Pretas não podem jogar em \"a\".</p><p>A situação B, entretanto, é diferente. Pretas podem jogar em \"b\", pois ela conseguiria capturar a pedra Branca marcada com um triângulo, ficando com um ponto para respirar (situação D): ponto \"c\".">}} 

Isso pode ser visto também na lição de [Movimentos ilegais](/movimentos-ilegais).


---
### Ko ( Regra número 8 )
Em uma situação em que, entre cruzamentos adjacentes, cada adversário possa alternativamente repetir a jogada de capturar a pedra do outro de forma infinita, a regra consiste em NÃO poder capturar na jogada imediatamente seguinte.

Para praticar volte até a aula de [Ko (eternidade)](/ko-eternidade) ou leia a explicação a seguir.

*Esta é a única exceção à regra de que se é livre para colocar sua pedra em qualquer ponto desocupado do tabuleiro.

{{< diagram sgf="/sgfs/regrasko1.sgf" description="Quando acontece uma situação como em \"A\", a Preta pode capturar a pedra Branca com um triângulo jogando em 1.">}} 
{{< diagram sgf="/sgfs/regrasko2.sgf" description="Pedra Preta 1 captura pedra Branca triângulo">}} 
{{< diagram sgf="/sgfs/regrasko3.sgf" description="Branca é removida do tabuleiro">}} 
{{< diagram sgf="/sgfs/regrasko4.sgf" description="Porém, na jogada imediatamente seguinte (em \"D\"), a Branca não pode jogar em \"2\", pois essa situação não terminaria nunca (\"Ko\"), assim a pedra Preta marcada com triângulo sobrevive mais uma jogada.">}} 

---
### "Handicap" ou Vantagem (Regra número 9)

{{< diagram sgf="/sgfs/handicap.sgf" description="Se pessoas de níveis diferentes jogam, pode-se usar o recurso de 'handicap'. Quanto maior a diferença de habilidade, mais pedras se colocam para equilibrar o jogo.</p><p>Se a diferença for de 'um grau' o jogador mais fraco joga com as Pretas e coloca apenas duas pedras no 'handicap'. Se for dois graus, três pedras e assim por diante. Ao lado, você pode ver um diagrama que mostra a colocação de 9 pedras:<ul><li>Para um 'handicap' de 6 pedras, retiram-se as pedras 5, 8 e 9;</li><li>Para um 'handicap' de 7 pedras, retiram-se as pedras 8 e 9;</li><li>Para um 'handicap' de 8 pedras, retira-se a pedra 5;</li><li>Para todos os outros níveis segue-se a ordem marcada nas pedras.">}} 

Para mais detalhes veja a aula de [Komi](/komi).

### 🎯 **Pronto para colocar em prática?**

**[🚀 Começar exercícios práticos agora →](/problemas-de-50-kyu)**  
*Tutorial passo-a-passo com exercícios do nível 50 kyu*

### 🧠 **Quer testar seus conhecimentos?**

**[⚡ Resolver problemas reais (Tsumego) →](/tsumego-facil)**  
*Problemas práticos para desenvolver sua estratégia*
