---
title: "Como capturar pedras?"
date: 2021-08-05T09:37:54-03:00
draft: false
previous: ""
next: "problemas-de-50-kyu"
menu: "main"
weight: 2
---

-  O objetivo em Go &eacute; criar um "territ&oacute;rio" maior que o advers&aacute;rio. 
-  Primeiramente, escolher um lugar para uma pedra pode ser dif&iacute;cil, porque voc&ecirc; pode coloc&aacute;-la no quadro em quase todos os lugares. 
-  Uma forma de criar um terreno &eacute; obter pedras inimigas. 
-  Pedras cercadas s&atilde;o removidas do tabuleiro e tomadas pelo inimigo como prisioneiros. 
-  Cada prisioneiro vale um ponto. 




{{< diagram sgf="/sgfs/0-atari.sgf" description="Na próxima jogada, o branco será completamente cercado e será removido.<br >Sobre as pedras que podem ser removidas com um movimento, dizemos que elas estão no Atari .">}} 



{{< diagram sgf="/sgfs/1-before-catch.sgf" description="A pedra branca agora est&aacute; cercada e &eacute; por isso que ... ">}} 

{{< diagram sgf="/sgfs/2-after-catch.sgf" description="... &eacute; removido do tabuleiro.">}} 

{{< diagram sgf="/sgfs/3-extend.sgf" description="Se houver um movimento branco, ele pode escapar combinando pedras.">}} 

