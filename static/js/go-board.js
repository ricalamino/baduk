document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('go-board');
  const boardSize = 19; // Tamanho do tabuleiro (19x19)
  const cellSize = board.offsetWidth / (boardSize - 1); // Ajuste para 19 linhas e 19 interseções
  const stoneSize = cellSize * 0.9; // Ajuste do tamanho da pedra

  // Desenhe as linhas do tabuleiro
  function drawLines() {
    // Desenha as linhas horizontais
    for (let i = 0; i < boardSize; i++) {
      const line = document.createElement('div');
      line.className = 'line';
      line.style.width = `${board.offsetWidth}px`;
      line.style.height = '1px';
      line.style.top = `${i * cellSize}px`;
      board.appendChild(line);
    }

    // Desenha as linhas verticais
    for (let i = 0; i < boardSize; i++) {
      const line = document.createElement('div');
      line.className = 'line';
      line.style.width = '1px';
      line.style.height = `${board.offsetHeight}px`;
      line.style.left = `${i * cellSize}px`;
      board.appendChild(line);
    }
  }

  // Adiciona uma pedra ao tabuleiro
  function addStone(x, y, color) {
    const stone = document.createElement('div');
    stone.className = 'stone';
    stone.style.width = `${stoneSize}px`;
    stone.style.height = `${stoneSize}px`;
    stone.style.left = `${x * cellSize}px`;
    stone.style.top = `${y * cellSize}px`;
    stone.style.background = color; // Cor da pedra (branco ou preto)
    board.appendChild(stone);
  }

  // Função para enviar jogada e obter resposta da IA
  async function playGo(x, y, difficulty) {
    try {
      const response = await fetch('http://98.82.204.58:3000/play', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ move: `B [${x},${y}]`, level: difficulty }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      return data.move;
    } catch (error) {
      console.error('Erro ao comunicar com o servidor:', error);
    }
  }

  // Adiciona a jogada do usuário e processa a resposta da IA
  board.addEventListener('click', async (event) => {
    const rect = board.getBoundingClientRect();
    const x = Math.floor((event.clientX - rect.left) / cellSize);
    const y = Math.floor((event.clientY - rect.top) / cellSize);
    const difficulty = document.getElementById('difficulty').value;

    // Adiciona a jogada do usuário
    addStone(x, y, '#000'); // Adiciona uma pedra preta

    // Solicita a jogada da IA
    const aiMove = await playGo(x, y, difficulty);

    if (aiMove) {
      const [aiX, aiY] = aiMove.match(/\[(\d+),(\d+)\]/).slice(1).map(Number);
      addStone(aiX, aiY, '#fff'); // Adiciona uma pedra branca
    }
  });

  // Reset do tabuleiro
  document.querySelector('.reset').addEventListener('click', () => {
    board.innerHTML = ''; // Limpa o tabuleiro
    drawLines(); // Redesenha as linhas do tabuleiro
  });

  // Inicializa o tabuleiro
  drawLines();
});
