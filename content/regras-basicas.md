---
title: "Basic Rules"
date: 2021-08-05T09:37:54-03:00
draft: false
previous: "equipment"
next: "basic-techniques"
menu: "theory"
weight: 3
url: "basic-rules"
---

![Pageboard image of Go](/img/go3.jpg)

## 1. Go is played between two players.
## 2. One of the players uses the white stones and the other the black ones. (Players take turns placing stones on the board, one by one. The first move, that is, placing the first stone on the board, is made by Black. In a handicap game, however, White plays first.)
## 3. The stone must be placed at one of the intersections.
## 4. The stone, once placed, cannot be removed (except when rule number 6 applies).
## 5. The player who gets the most territory wins the game.
## 6. Stones that lose their freedom, or “breathing space”, are removed from the board.
## 7. No stone can be placed at an intersection where it does not have freedom.
## 8. There are special restrictions on a player's movements, in the situation called Ko.
## 9. Rule regarding handicap or advantage play.

---
### Did you like the rules? [Start right here with the hands-on tutorial!](/50-kyu-problems)

### Already know the basics? [Practice solving some real game problems (Tsumego)!](/tsumego-easy)
---


### Territory (Rule number 5)

{{< diagram sgf="/sgfs/regras1.sgf" description="The player with the most territory wins the game. But how do we count the territory? The territory consists of intersections, surrounded in such a way by the player's pieces, that the opponent cannot invade it. The number of crosses surrounded by the White and Black pieces consists respectively of the number of points obtained by the White player and the player with Black.">}}

---
### Limits (... rule number 5)

{{< diagram sgf="/sgfs/regras2.sgf" description="The figure to the left is an analysis of the previous diagram. Note that Black delimits a solid territory that surrounds the <strong>triangles</strong>, as does the White ones, which surround the areas marked with <strong>circles</strong>.</p><p>The numbers of triangles and circles in the diagram indicate the <strong>points</strong> given to each territory.">}}
{{< diagram sgf="/sgfs/regras3.sgf" description="Scores:</p><p><ul><li>Black: 9 + 31 = 40</li><li>White: 17 + 22 = 39</li></ul><p>Black won by 1 point.">}}

---
### Freedoms or spaces to breathe (Rule number 6)

{{< diagram sgf="/sgfs/regras4.sgf" description="When all points adjacent to a stone, or group of stones, are occupied by opponent's stones, the stone (or group of stones) is captured. ) and removed from the board.</p><p>In A, B and C in the figure, the points indicated by circles are called freedoms of the stone to which they refer. In D, E and F, all Black's liberties were \"taken\" by White. Thus, unable to breathe, Black's piece (or set of pieces without freedom) is removed from the board.">}}
---
### Removing captured pieces (... Rule number 6)


{{< diagram sgf="/sgfs/0-atari.sgf" description="This sequence refers to a capture. You can see that initially the white stone has a freedom (point \"a\").">}}

{{< diagram sgf="/sgfs/1-before-catch.sgf" description="After the player places the Black stone at the point \"a\" ">}}

{{< diagram sgf="/sgfs/2-after-catch.sgf" description="the white stone is captured, removed from the board and will mean one point less for White's player.">}}

Normally, at the end of the game, to make counting easier, the captured stones are placed in the territory of the same color as the stone.
  
---
### The "unbreathable" stitch (Rule number 7)

{{< diagram sgf="/sgfs/regrairrespiravel.sgf" description="No piece can be placed in a place where there is no freedom. Thus, in the diagram, in the situation \"A\" Black cannot play in \"a \".</p><p>Situation B, however, is different. Black can play in \"b\", as it would be able to capture the White stone marked with a breathing point, leaving it with a breathing point ( situation D ): dot \"c\"..">}}

This can be seen in the [Illegal moves](/illegal-moves) lesson.


---
### Ko (Rule number 8)
In a situation where, between adjacent crossings, each time they can alternatively execute the stone capture of the NO format, the rule can reach in the other execution possibility that follows.

To practice go back to the [Ko (eternity)](/ko-eternity) class or read the explanation below.

*This is a single exception to the rule that you are free to place your stone on any unoccupied spot on the board.

{{< diagram sgf="/sgfs/regrasko1.sgf" description="When a situation like \"A\" happens, Black can capture the White stone with a triangle playing at 1.">}}
{{< diagram sgf="/sgfs/regrasko2.sgf" description="Black Stone 1 captures White stone triangle">}}
{{< diagram sgf="/sgfs/regrasko3.sgf" description="White is the board diagram">}}
{{< diagram sgf="/sgfs/regrasko4.sgf" description="However, in the next move (on \"D\"), White cannot play on \"2\ would never end, as this situation would never end (\"Ko\"), so the triangle-marked Black stone survives one more move.">}}
---
### "Handicap" or Advantage (Rule number 9)

{{< diagram sgf="/sgfs/handicap.sgf" description="If people of different levels play, you can use the \"handicap\" feature. the game.</p><p>If the difference is “one degree” the weaker player plays Black and puts only two stones in the \"handicap\". If it is two degrees, three stones and so on On the side, you can see a diagram showing the placement of 9 stones:<ul><li>For a \"handicap\" of 6 stones, stones 5, 8 and 9 are removed;</li><li>For a \"handicap\" of 7 stones, stones 8 and 9 are removed;</li><li>For a \"handicap\" of 8 stones, stone 5 is removed;</li> ><li>For all other levels, follow the order marked on the stones.">}}

For more details see the [Komi](/komi) class.




