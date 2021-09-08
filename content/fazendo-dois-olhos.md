---
title: "Making 2 eyes! Stones cannot be captured."
date: 2021-08-05T14:10:17-03:00
draft: false
next: "problemas-de-44-kyu"
previous: "problemas-de-45-kyu-escada"
menu: "main"
weight: 11
url: "making-two-eyes"
---
Black's paradise again - White won't respond. However, be aware of illegal movements.

{{< blackplay sgf="/sgfs/BlackHeaven2.sgf" description="Kill all white stones.">}}

---

### Stones that cannot be captured

As you may have noticed in the last example, even groups with a lot of stones can be killed once they are surrounded.

{{< diagram sgf="/sgfs/0-can-kill.sgf" description="For example, in the figure, black is completely surrounded - there is no way out - just wait to be killed by the movement of white in the center." >}}

But what about the next case?

{{< diagram sgf="/sgfs/1-two-eyes.sgf" description="Although black is surrounded, white cannot capture them. There are still 2 places to kill the black group - they are both surrounded by black stones where white ones cannot play.">}}

So once you make 2 separate spaces, or **2 eyes**, your stones will never be captured.

Such a group of stones is considered **alive**.

---

Black's paradise again.

{{< blackplay sgf="/sgfs/BlackHeaven3.sgf" description="Try to kill all white stones.">}}

Did you manage to capture them?

I bet not! They are alive as each group has 2 eyes.