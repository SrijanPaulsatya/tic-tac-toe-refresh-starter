const Screen = require("./screen");
const Cursor = require("./cursor");

class TTT {

  constructor() {

    this.playerTurn = "O";

    this.grid = [[' ',' ',' '],
                 [' ',' ',' '],
                 [' ',' ',' ']]

    this.cursor = new Cursor(3, 3);

    // Initialize a 3x3 tic-tac-toe grid
    Screen.initialize(3, 3);
    Screen.setGridlines(true);

    // Replace this with real commands
    Screen.addCommand('w', 'Move the Cursor Up', this.upCommand.bind(this));
    Screen.addCommand('d', 'Move the Cursor Right', this.rightCommand.bind(this));
    Screen.addCommand('s', 'Move the Cursor Down', this.downCommand.bind(this));
    Screen.addCommand('a', 'Move the Cursor Left', this.leftCommand.bind(this));


    Screen.render();
  }

  upCommand() {
    this.cursor.resetBackgroundColor();
    this.cursor.up();
    this.cursor.setBackgroundColor();
    Screen.render();
  }

  downCommand() {
    this.cursor.resetBackgroundColor();
    this.cursor.down();
    this.cursor.setBackgroundColor();
    Screen.render();
  }

  rightCommand() {
    this.cursor.resetBackgroundColor();
    this.cursor.right();
    this.cursor.setBackgroundColor();
    Screen.render();
  }

  leftCommand() {
    this.cursor.resetBackgroundColor();
    this.cursor.left();
    this.cursor.setBackgroundColor();
    Screen.render();
  }


  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    let emptyCount = 0;
    let horizontalWinForX = false;
    let horizontalWinForO = false;

    grid.forEach(row => {
      row.forEach(element => {
        if (element === " ") {
          emptyCount += 1;
        }
      });

      if (row.filter(element => element === "X").length === 3) {
        horizontalWinForX = true;
      }
      else if (row.filter(element => element === "O").length === 3) {
        horizontalWinForO = true;
      }

    });

    let checkColumnWin = (move) => {

      let gridLengthSquared = grid.length * grid.length;
      let col = 0;
      let columnWin = [];

      for (let i = 0; i < gridLengthSquared; i++) {
        if (columnWin === [move, move, move]) {
          break;
        }

        while (col < grid.length) {
          let currentElement = grid[i % grid.length][col];
          if (currentElement === move) {
            columnWin.push(currentElement);
          }

          if (col === 3) {
            col = 0;
          } else {
            col++;
          }
        }
      }
      return columnWin.length === 3;
    }

    let checkDiagonalWin = (move) => {
      let diagonalWin = [];
      let otherDiagonalWin = [];
      for (let i = 0; i < grid.length; i++) {
        for (let col = 0; col < grid.length; col++) {
          let currentElement = grid[i][col];
          if (currentElement === move) {
            diagonalWin.push(currentElement);
          }
        }
        for (let col = grid.length; col >= 0; col--) {
          let currentElement = grid[i][col];
          if (currentElement === move) {
            otherDiagonalWin.push(currentElement);
          }
        }
      }
      return ((diagonalWin.length === 3) || (otherDiagonalWin.length === 3))
    }
          
    if (horizontalWinForX || checkColumnWin("X") || checkDiagonalWin("X")) {
      return "X";
    }
    else if (horizontalWinForO || checkColumnWin("O") || checkDiagonalWin("O")) {
      return "O";
    }
    else if (emptyCount > 0) {
      return false;
    }
    else {
      return "T";
    }

  }

  static endGame(winner) {
    if (winner === 'O' || winner === 'X') {
      Screen.setMessage(`Player ${winner} wins!`);
    } else if (winner === 'T') {
      Screen.setMessage(`Tie game!`);
    } else {
      Screen.setMessage(`Game Over`);
    }
    Screen.render();
    Screen.quit();
  }

}


module.exports = TTT;
