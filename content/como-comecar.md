---
title: "How to start"
date: 2021-08-05T14:10:17-03:00
draft: false
previous: "problemas-de-37-kyu"
next: "starting"
menu: "main"
weight: 20
url: "how-to-start"
---

By now you may have already figured out how to kill the stones. However, at the beginning of a real game, you have to play on the empty board.

The objective of Go is to encircle as much territory as possible. In the beginning you have to try to encircle territory, that is, empty spaces.


{{< diagram sgf="/sgfs/comecar-1.sgf" description="In the figure, there are two groups of black stones: one in the upper left corner and one on the right side. Each of them has 9 spaces, or 9 <strong>dots</strong>.<br />A white group in the middle also has 9. These spaces completely surrounded by stones of the same color are called <strong>territories</strong>.<br />Now the three groups above, each of them has a territory of 9. Count the number of stones needed to encircle the territory.<ul><li>Corner - 6 stones</li><li>Side - 9 stones</li> <li>Center - 12 Stones</li></ul><br />Therefore, you can encircle territories in the corners more efficiently, while territories in the middle are less efficient, so at the beginning of the game, each player will try to surround the corners of the board. You rarely see moves in the center.">}}

---
You can see how real games start on a 13x13 board below.

{{< review sgf="/sgfs/comecar-2.sgf" description="First, each player played in positions near two corners. Black's first move is called <strong>3-3 points</strong> (or <strong>san-san</strong>) as it is located on the third vertical and horizontal line counting from the nearest side. This move guarantees a position that can get the corner.<br />On the next move, white they also played a 3-3 points. Black's next move is called <strong>4-4 points</strong> (or <strong>hoshi</strong>) where it is marked with a small black circle. encircle a corner bigger than a move in 3-3 points. However, it can be invaded more easily as it has more spaces between it and the edge of the board.<br />White's fourth move is also very popular.<br />Of course, you can play anywhere on the board if it's not an illegal move. Generally, a game proceeds from the corners to the sides and eventually to the center. if corners are the best places to gain territory, no one would make moves like M2 or N1 as the gain would be very small.">}}
