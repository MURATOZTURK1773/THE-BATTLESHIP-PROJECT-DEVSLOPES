const rs = require('readline-sync');

const startGame = () => {
  rs.keyIn("Press any key to start the game.");
  let shipSizes = [2, 3, 3, 4, 5];
  initializeGame(buildGrid(10), shipSizes);
}

const buildGrid = (size) => {
  let grid = [];
  for (let i = 0; i < size; i++) {
    grid[i] = [];
   for (let j = 0; j < size; j++) {
    grid[i][j] = '-';
    } 
  }
  return grid;
}

const initializeGame = (board) => {
  if(!board) {
    board = buildGrid(10);
  }

  let numEnemyShips = 5;
  let shipSizes = [2, 3, 3, 4, 5];
  let battleships = shipSizes.map((size, index) => ({
    id: index + 1,
    size,
    name : `Battleship ${index + 1}`,
    hits: 0,
    remaining: 1
   }));

   for (let ship of battleships) {
    let validPlacement = false;
    while (!validPlacement) {
      let isVertical = Math.random() >= 0.5;
      let row, col;
      if (isVertical) {
        row = Math.floor(Math.random() * (board.length - ship.size + 1));
        col = Math.floor(Math.random() * board.length);
        for(let i = row; i < row + ship.size; i++) {
          if(board[i][col] !== '-') {
            break;
          } else if (i === row + ship.size - 1) {
            validPlacement = true;
            for (let i = row; i < row + ship.size; i++) {
              board[i][col] = ship.id;
            }
          }
        }
      } else {
        row = Math.floor(Math.random() * board.length);
        col = Math.floor(Math.random() * (board.length - ship.size + 1));
        for (let j = col; j < col + ship.size; j++) {
          if (board[row][j] !== '-') {
            break;
          } else if (j === col + ship.size - 1) {
            validPlacement = true;
            for (let j = col; j < col + ship.size; j++) {
              board[row][j] = ship.id;
            }
          }
        }
      }
    }
  }

  let guessedLocations = [];
  let gameOver = false;

  while (!gameOver) {
    let location = rs.question("Enter a location to strike ie 'A2': ").toUpperCase();

    let row = location.charCodeAt(0) - 65;
    let col = Number(location.substring(1)) - 1;

    if (location.length < 2 || location.length > 3 || isNaN(row) || isNaN(col) || row >= board.length || col >= board.length || col < 0) {
      console.log(`Please enter a valid location in the format 'A1' to '${String.fromCharCode(board.length + 64)}${board.length}'.`);
      continue;
    }
    
    if (guessedLocations.includes(location)) {
      console.log('You have already picked this location. Miss!');
    } else {
      guessedLocations.push(location);
    }
    
    if (board[row][col] > 0) {
      let battleship = battleships.find(ship => ship.id === board[row][col]);
      battleship.hits++;
      board[row][col] = -board[row][col];
      if (battleship.hits === battleship.size) {
        numEnemyShips--;
        console.log(`Hit. You have sunk ${battleship.name}. ${numEnemyShips} ship(s) remaining.`);
        battleship.size = 0;
        battleship.remaining = 0;
      } else {
        console.log(`Hit. ${battleship.name} has been hit ${battleship.hits} time(s).`);
      }
    } else if (board[row][col] < 0) {                                         
      console.log('You have already picked this location. Miss!');
    } else {
      console.log('You have missed!');
    }
    if (numEnemyShips < 1) {
      gameOver = true;
    }
  }

  console.log('You have won!');
  let answer = rs.keyInYN("You have destroyed all battleships. Would you like to play again? Y/N--");
  if (answer) {
    rs.keyIn("Press any key to start the game.");
    initializeGame(buildGrid(10));  
  } else if (answer === false) {  
    process.exit();  
  } else {  
    console.log("Invalid input. Please enter 'y' or 'n'.");  
  }    
}

startGame();