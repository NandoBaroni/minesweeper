const prompt = require('prompt-sync')({ sigint: true });

class Minesweeper {
  constructor(size, mineCount) {
    this.size = size;
    this.mineCount = mineCount;
    this.board = this.createBoard(size);
    this.minePositions = this.placeMines(size, mineCount);
    this.uncovered = [];
    this.flagged = [];
    this.gameOver = false;
  }

  createBoard(size) {
    return Array(size).fill(null).map(() => Array(size).fill('U'));
  }

  placeMines(size, mineCount) {
    const positions = [];
    while (positions.length < mineCount) {
      const row = Math.floor(Math.random() * size);
      const col = Math.floor(Math.random() * size);
      if (!positions.some(pos => pos[0] === row && pos[1] === col)) {
        positions.push([row, col]);
      }
    }
    return positions;
  }

  displayBoard() {
    console.log('\nCurrent Board:');
    this.board.forEach(row => {
      console.log(row.join(' '));
    });
    console.log('');
  }

  checkCell(row, col) {
    if (this.minePositions.some(pos => pos[0] === row && pos[1] === col)) {
      this.board[row][col] = '*';
      console.log('You hit a mine! Game Over.');
      this.gameOver = true;
    } else {
      const adjacentMines = this.countAdjacentMines(row, col);
      this.board[row][col] = adjacentMines.toString();
      this.uncovered.push([row, col]);
      if (this.uncovered.length + this.mineCount === this.size * this.size) {
        console.log('Congratulations! You have won the game!');
        this.gameOver = true;
      }
    }
  }

  countAdjacentMines(row, col) {
    let count = 0;
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1], [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
    directions.forEach(([dx, dy]) => {
      const newRow = row + dx;
      const newCol = col + dy;
      if (
        newRow >= 0 && newRow < this.size &&
        newCol >= 0 && newCol < this.size &&
        this.minePositions.some(pos => pos[0] === newRow && pos[1] === newCol)
      ) {
        count++;
      }
    });
    return count;
  }

  flagCell(row, col) {
    if (this.board[row][col] === 'F') {
      console.log('This cell is already flagged.');
    } else {
      this.board[row][col] = 'F';
      this.flagged.push([row, col]);
    }
  }

  removeFlag(row, col) {
    if (this.board[row][col] === 'F') {
      this.board[row][col] = 'U';
      this.flagged = this.flagged.filter(pos => pos[0] !== row || pos[1] !== col);
    } else {
      console.log('This cell is not flagged.');
    }
  }

  handleInput() {
    const choice = prompt('Your move:\n1. Uncover a cell\n2. Flag a cell\n3. Remove a flag\nYour choice: ');
    const [row, col] = prompt('Enter the row and column (e.g., 2 3): ').split(' ').map(Number);
    if (row < 0 || row >= this.size || col < 0 || col >= this.size) {
      console.log('Invalid input. Please try again.');
      return;
    }

    switch (choice) {
      case '1':
        this.checkCell(row, col);
        break;
      case '2':
        this.flagCell(row, col);
        break;
      case '3':
        this.removeFlag(row, col);
        break;
      default:
        console.log('Invalid choice. Try again.');
    }
  }

  play() {
    console.log('Welcome to Minesweeper!');
    while (!this.gameOver) {
      this.displayBoard();
      this.handleInput();
    }
    this.displayBoard();
    const replay = prompt('Would you like to play again? (Yes/No): ').toLowerCase();
    if (replay === 'yes') {
      startGame();
    } else {
      console.log('Thanks for playing!');
    }
  }
}

function startGame() {
  console.log('Choose a board size:\n1. Small (5x5)\n2. Large (10x10)');
  const sizeChoice = prompt('Your choice: ');
  let size, mineCount;

  if (sizeChoice === '1') {
    size = 5;
    mineCount = 5;
  } else if (sizeChoice === '2') {
    size = 10;
    mineCount = 15;
  } else {
    console.log('Invalid choice. Defaulting to Small (5x5).');
    size = 5;
    mineCount = 5;
  }

  const game = new Minesweeper(size, mineCount);
  game.play();
}

startGame();
