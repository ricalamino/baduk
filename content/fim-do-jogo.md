---
title: "End game"
date: 2021-08-05T09:37:54-03:00
draft: false
previous: "36-kyu-problems"
next: "end-game-2"
menu: "main"
weight: 23
url: "end-game"
---
Here you will learn when a game is about to end and how to count territory using 5x5 boards.



{{< diagram sgf="/sgfs/fim-1.sgf" description="Both sides have made 5 moves each and the game is considered over. Black has 5 dots on the left and white has 10 dots on the right.</ p><p>Therefore white won by 5 points.</p><p>You can calculate territory by counting the intersections of vertical and horizontal lines. Corners and edges are also territory. Remember that stones <strong>not </strong> are counted as territory.">}}

{{< diagram sgf="/sgfs/fim-2.sgf" description="A game is considered finished when both sides pass because they don't want to make any more moves.</p><p>Why can we consider- lo a game over? Continuing the game, assume that Black has made a move into White's territory.</p><p>White can easily capture the invader. See figure.</p><p>Therefore, black don't need to make such a move.">}}

{{< diagram sgf="/sgfs/fim-3.sgf" description="Now, what happens if you make a move within your own territory?</p><p>With that move you would reduce your territory of 1 point. Nobody wants to do that!</p><p>Therefore, the first picture on this page is considered game over. (Although sometimes you have to play within your own territory to make two eyes or to strengthen its limits.)">}}

{{< diagram sgf="/sgfs/fim-4.sgf" description="Black has 5 points and White has 6 points - White won for 1 point.</p><p>And those 2 points in the center? They they are called \"<strong>Dame</strong>\" - neutral area - which doesn't belong to either side.</p><p>You can play here if you want, although you won't lose or gain any points. ">}}

---

### When is a game over?

- When both sides don't want to play anywhere and successively pass. Then both territories are counted and the bigger one wins. Your final score is your territory on the board, plus the stones you've captured that have been removed from the board.
- When one side thinks it can't win no matter what it does and then gives up. (Unlike many other games, this is considered an honorable exit. Continuing to play in the face of imminent defeat is not.)