const canvas = document.getElementById("tic-tac-toe");
const ctx = canvas.getContext("2d");
const statusDiv = document.getElementById("status");
const resetBtn = document.getElementById("reset-btn");

let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

function drawBoard() {
  ctx.strokeStyle = "#333";
  ctx.lineWidth = 2;

  // Draw vertical lines
  ctx.beginPath();
  ctx.moveTo(100, 0);
  ctx.lineTo(100, 300);
  ctx.moveTo(200, 0);
  ctx.lineTo(200, 300);
  ctx.stroke();

  // Draw horizontal lines
  ctx.beginPath();
  ctx.moveTo(0, 100);
  ctx.lineTo(300, 100);
  ctx.moveTo(0, 200);
  ctx.lineTo(300, 200);
  ctx.stroke();
}

function drawX(x, y) {
  ctx.strokeStyle = "#FF0000";
  ctx.lineWidth = 3;
  const offset = 20;
  ctx.beginPath();
  ctx.moveTo(x + offset, y + offset);
  ctx.lineTo(x + 100 - offset, y + 100 - offset);
  ctx.moveTo(x + 100 - offset, y + offset);
  ctx.lineTo(x + offset, y + 100 - offset);
  ctx.stroke();
}

function drawO(x, y) {
  ctx.strokeStyle = "#0000FF";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.arc(x + 50, y + 50, 40, 0, Math.PI * 2);
  ctx.stroke();
}

function checkWinner() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8], // Rows
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8], // Columns
    [0, 4, 8],
    [2, 4, 6], // Diagonals
  ];

  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      return gameBoard[a];
    }
  }

  if (gameBoard.every((cell) => cell !== "")) {
    return "draw";
  }

  return null;
}

function handleClick(event) {
  if (!gameActive) return;

  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;
  console.log(x, y);
  const col = Math.floor(x / 100);
  const row = Math.floor(y / 100);
  const index = row * 3 + col;

  if (gameBoard[index] === "") {
    gameBoard[index] = currentPlayer;
    const cellX = col * 100;
    const cellY = row * 100;

    if (currentPlayer === "X") {
      drawX(cellX, cellY);
    } else {
      drawO(cellX, cellY);
    }

    const winner = checkWinner();
    if (winner) {
      if (winner === "draw") {
        statusDiv.textContent = "It's a draw!";
      } else {
        statusDiv.textContent = `${winner} wins!`;
      }
      gameActive = false;
    } else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      statusDiv.textContent = `${currentPlayer}'s turn`;
    }
  }
}

function resetGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBoard();
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  statusDiv.textContent = "X's turn";
}

canvas.addEventListener("click", handleClick);
resetBtn.addEventListener("click", resetGame);

drawBoard();
