---
title: "How to capture stones"
date: 2021-08-05T09:37:54-03:00
draft: false
previous: ""
next: "50-kyu-problems"
menu: "main"
weight: 2
url: "how-to-capture-stones"
---
- The objective in Go is to create a "territory" bigger than the opponent.
- First, choosing a place for a stone can be difficult because you can place it on the board almost anywhere.
- One way to create a land is to obtain enemy stones.
- Surrounded stones are removed from the board and taken by the enemy as prisoners.
- Each prisoner is worth one point.




{{< diagram sgf="/sgfs/0-atari.sgf" description="On the next turn, white will be completely surrounded and will be removed.<br>About the stones that can be removed with one move, we say they are on Atari .">}}



{{< diagram sgf="/sgfs/1-before-catch.sgf" description="The white stone is now surrounded and that's why...">}}

{{< diagram sgf="/sgfs/2-after-catch.sgf" description="... it is removed from the board.">}}

{{< diagram sgf="/sgfs/3-extend.sgf" description="If there is a white move, it can escape by connecting the stones.">}}