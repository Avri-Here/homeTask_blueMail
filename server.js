

const http = require('http'); 
const express = require('express'); 
const socketIo = require('socket.io'); 


const app = express();
app.use(express.static('public'));  

const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3000;


let gameState = Array(9).fill(null);  
let currentPlayer = 'X'; 


const checkWin = (board) => {

  const winPatterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6],
  ];


  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a]; 
    }
  }
  return board.includes(null) ? null : 'Draw'; 
};

io.on('connection', (socket) => {
 
  socket.emit('gameState', { gameState, winner: checkWin(gameState) });


  socket.on('makeMove', (index) => {
    if (gameState[index] === null && checkWin(gameState) === null) {
      gameState[index] = currentPlayer;
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      
      const winner = checkWin(gameState);  
      
      io.emit('gameState', { gameState, currentPlayer, winner });
    }
  });

  socket.on('resetGame', () => {
    gameState = Array(9).fill(null);
    currentPlayer = 'X';
    io.emit('gameState', { gameState, currentPlayer, winner: null });
  });
});

server.listen(PORT, () => { console.log(`Server running on port ${PORT}`) });
