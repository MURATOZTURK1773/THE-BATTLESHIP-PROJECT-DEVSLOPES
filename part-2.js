const rs = require('readline-sync');
const prompt = require('prompt-sync')({signit: true});

const startGame = () => {
  prompt("Press any key to start the game.");
  initializeGame(buildGrid(10));
  console.log(board);
}

const buildGrid = (size) => {
  let grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
   for (let j = 0; j < size; j++) {
    grid[i][j] = 0;
    } 
  }
  return grid;
}

const initializeGame = (board) => {
  if(!board) {
    board = buildGrid(10);
  }

  let numEnemyShips = 6;
  let shipSizes = [2, 3, 3, 4, 5];

  for (let shipSize of shipSizes) {
    let validPlacement  = false;
    while (!validPlacement) {
      let isVertical = Math.random() >= 0.5;
      let row, col;
      if (isVertical) {
        row = Math.floor(Math.random() * (board.length - shipSize + 1));
        col = Math.floor(Math.random() * board.length);
        for(let i = row; i < row + shipSize; i++) {
          if(board[i][col] !== 0) {
            break;
          } else if (i === row + shipSize - 1) {
            validPlacement = true;
            for (let i = row; i < row + shipSize; i++) {
              board[i][col] = shipSize;
            }
          }
        }
      } else {
        row = Math.floor(Math.random() * board.length);
        col = Math.floor(Math.random() * (board.length - shipSize + 1));
        for (let j = col; j < col + shipSize; j++) {
          if (board[row][j] !== 0) {
            break;
          } else if (j === col + shipSize - 1) {
            validPlacement = true;
            for (let j = col; j < col + shipSize; j++) {
              board[row][j] = shipSize;
            }
          }
        }
      }
    }
  }

  let guessedLocations = [];

  while (true) {
    let location = rs.question("Enter a location to strike ie 'A2': ").toUpperCase();

    let row = location.charCodeAt(0) - 65;
    let col = Number(location.charAt(1)) - 1;

    if (location.length !== 2 || isNaN(row) || isNaN(col) || row >= board.length || col >= board.length || col < 0) {
      console.log(`Please enter a valid location in the format 'A1' to '${String.fromCharCode(board.length + 64)}${board.length}'.`);
      continue;
    }

    if (guessedLocations.includes(location)) {
      console.log('You have already picked this location. Miss!');
    } else {
      guessedLocations.push(location);
    }

    if (board[row][col] > 1) {
      board[row][col] = -board[row][col];
      numEnemyShips--;
      console.log(`Hit. You have sunk a battleship. ${numEnemyShips} ship(s) remaining.`);

      if (numEnemyShips === 0) {
        console.log('You have won!');
        let answer = prompt("You have destroyed all battleships. Would you like to play again? Y/N--");
        if (answer.toLowerCase() === "y") {
          initializeGame(prompt("Press any key to start the game."));
        } else if (answer.toLowerCase() === "n") {
          process.exit();
        } else {
          console.log("Invalid input. Please enter 'y' or 'n'.");
        }
      }
    } else {
      console.log('You have missed!');
    }
  }
}

startGame();