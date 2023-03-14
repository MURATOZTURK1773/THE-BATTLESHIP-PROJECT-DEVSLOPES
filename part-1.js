let rs = require('readline-sync');

const startGame = () => {
  rs.keyIn("Press any key to start the game.");
  initializeGame();
}

const initializeGame = () => {
  let numEnemyShips = 2;

  let board = [    
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  for (let i = 0; i < 2; i++) {
    let enemyRow, enemyCol;
    do {
      enemyRow = Math.floor(Math.random() * 3);
      enemyCol = Math.floor(Math.random() * 3);
    } while (board[enemyRow][enemyCol] === 1);
    board[enemyRow][enemyCol] = 1;
  }

  let guessedLocations = [];

  while (true) {
    let location = rs.question("Enter a location to strike ie 'A2'").toUpperCase();

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

    if (board[row][col] === 1) {
      board[row][col] = 2;
      numEnemyShips--;
      console.log(`Hit. You have sunk a battleship. ${numEnemyShips} ship(s) remaining.`);

      if (numEnemyShips === 0) {
        console.log('You have won!');
        let answer = rs.keyInYN("You have destroyed all battleships. Would you like to play again? Y/N--");
        if (answer) {
          initializeGame(rs.keyIn("Press any key to start the game."));
        } else if (answer === false) {
          process.exit();
        } else {
          console.log("Invalid input. Please enter 'y' or 'n'.");
          rs.keyInYN("You have destroyed all battleships. Would you like to play again? Y/N--");
        }
      }
    } else {
      console.log('You have missed!');
    }
  }
};

startGame();
