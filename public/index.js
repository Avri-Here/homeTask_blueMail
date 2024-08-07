



// const socket = io();
// const cells = document.querySelectorAll('.cell');
// const resetButton = document.getElementById('resetButton');


// cells.forEach(cell => {
//   cell.addEventListener('click', () => {
//     const index = cell.getAttribute('data-index');
//     socket.emit('makeMove', index);
//   });
// });

// resetButton.addEventListener('click', () => {
//   socket.emit('resetGame');
// });

// socket.on('gameState', ({ gameState }) => {

//   cells.forEach((cell, index) => { cell.textContent = gameState[index] });
//   const winner = checkWin(gameState);


//   if (winner) {
//     const displayMsg = winner === winner === 'Draw' ? "No one won !!" : `${winner} wins !`;
//     Swal.fire({

// })
//   }
// });

// const checkWin = (board) => {

//   const winPatterns = [
//     [0, 1, 2], [3, 4, 5],
//     [6, 7, 8], [0, 3, 6],
//     [1, 4, 7], [2, 5, 8],
//     [0, 4, 8], [2, 4, 6],
//   ];


//   for (let pattern of winPatterns) {
//     const [a, b, c] = pattern;
//     if (board[a] && board[a] === board[b] && board[a] === board[c]) {
//       return board[a];
//     }
//   };
//   return board.includes(null) ? null : 'Draw';
// };



const socket = io();
const cells = document.querySelectorAll('.cell');
const bodyHtml = document.getElementById('bodyHtml');
const resetButton = document.getElementById('resetButton');

cells.forEach(cell => {
  cell.addEventListener('click', () => {
    const index = cell.getAttribute('data-index');
    socket.emit('makeMove', index);
  });
});

resetButton.addEventListener('click', () => {
  socket.emit('resetGame');
});

socket.on('gameState', async ({ gameState }) => {
  cells.forEach((cell, index) => {
    cell.textContent = gameState[index];
  });

  const winner = checkWin(gameState);

  if (winner) {


    bodyHtml.style.display = 'none';
    const displayMsg = winner === 'Draw' ? "No one won !" : `${winner} wins !`;


    await Swal.fire({
      title: 'Game Is Over ..',
      text: displayMsg,
      icon: 'info',
      confirmButtonText: 'OK'
    });

     bodyHtml.style.display = 'block';
  }


});

const checkWin = (board) => {
  const winPatterns = [
    [0, 1, 2], [3, 4, 5],
    [6, 7, 8], [0, 3, 6],
    [1, 4, 7], [2, 5, 8],
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
