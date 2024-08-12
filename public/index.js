


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


socket.on('gameState', async ({ gameState, winner }) => {

  cells.forEach((cell, index) => {
    cell.textContent = gameState[index];
  });

  if (winner) {
    bodyHtml.style.display = 'none';
    const displayMsg = winner === 'Draw' ? "No one won!" : `${winner} wins!`;

    await Swal.fire({
      title: 'Game Over',
      text: displayMsg,
      icon: 'info',
      confirmButtonText: 'OK'
    });

    socket.emit('resetGame');
    bodyHtml.style.display = 'block';
  }
});

