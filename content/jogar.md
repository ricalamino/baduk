---
title: "Jogar Go"
date: 2024-09-16T09:00:00-03:00
draft: false
---

<div class="go-board-container">
  <div id="go-board" class="go-board">
    <!-- O tabuleiro será desenhado aqui -->
  </div>
  <div class="status">
    <p>Sua vez.</p>
    <label for="difficulty">Dificuldade:</label>
    <select id="difficulty">
      <option value="easy">Fácil</option>
      <option value="medium">Médio</option>
      <option value="hard">Difícil</option>
    </select>
    <a class="reset button">Jogar novamente.</a>
  </div>
</div>

<!-- Inclua o script ao final do body para garantir que o DOM esteja carregado -->
<script src="/js/go-board.js"></script>
