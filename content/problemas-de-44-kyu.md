---
title: "44 Kyu Problems"
date: 2021-08-05T14:10:17-03:00
draft: false
previous: "making-two-eyes"
next: "43-kyu-problems"
menu: "main"
weight: 12
url: "44-kyu-problems"
---

### Making two eyes

{{< challenge sgf="/sgfs/nigan-iki-1.sgf" description="Black is now completely surrounded. What's the move?">}}

Although black has 3 spaces in the middle, they are just one eye.

So you should make two eyes by making a partition there.

If you don't, White will play where Black should have played.

{{< challenge sgf="/sgfs/nigan-iki-2.sgf" description="For this figure, where should you play, making a partition?">}}

As you can see, if your territory is too small, you will have a difficult life.

Always try to make your territory big enough and don't let yourself be surrounded.

And the next case?

{{< diagram sgf="/sgfs/3-alive.sgf" description="In that case, you don't need to make a partition. If White makes a move on A, respond to it with a move on B. If White plays B, play A">}}

So you can always make two eyes even if white tries to attack.

However, if you ignore White's attack, he will play A and B.

In this case, you will only have one eye, and you will surely be dead.
