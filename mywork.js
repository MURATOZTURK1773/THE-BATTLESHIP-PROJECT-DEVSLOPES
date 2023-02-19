let rs = require('readline-sync');
const prompt = require('prompt-sync')({signit: true});

const startGame = () => {
  prompt("Press any key to start the game.");
  initializeGame();
}

const initializeGame = () => {
  let numEnemyShips = 2;

  let board = [    
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];

  // for (let i = 0; i < 2; i++) {
  //   let playerRow, playerCol;
  //   do {
  //     playerRow = Math.floor(Math.random() * 3);
  //     playerCol = Math.floor(Math.random() * 3);
  //   } while (board[playerRow][playerCol] === 1);
  //   board[playerRow][playerCol] = 1;
  // }

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

    if (location.length !== 2 || isNaN(row) || isNaN(col)) {
      console.log("Please enter a valid location in the format 'A2'.");
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
};

startGame();
// this one for part 4 multiplayer