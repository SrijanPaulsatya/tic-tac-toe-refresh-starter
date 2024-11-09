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
    Screen.addCommand('h', 'Help', this.helpCommand.bind(this));
    Screen.addCommand('space', 'Place Move', this.placeMoveCommand.bind(this));


    Screen.render();
  }

  helpCommand() {
    Screen.printCommands();
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

  placeMoveCommand() {
    let { row, col } = this.cursor;
    if (this.grid[row][col] === " ") {
      this.grid[row][col] = this.playerTurn;
      Screen.setGrid(row, col, this.playerTurn);
      Screen.setTextColor(row, col, "blue");
    

      const winner = TTT.checkWin(this.grid);
      if (winner) {
        TTT.endGame(winner);
        return;
      }

      this.playerTurn = this.playerTurn === "O" ? "X" : "O";
      Screen.setMessage(`Player ${this.playerTurn}'s turn`);
      Screen.render();
      Screen.printCommands();

    } else {
      Screen.setMessage("Cell is already occupied, Choose Another Cell");
      Screen.render();
    }
  }


  static checkWin(grid) {

    // Return 'X' if player X wins
    // Return 'O' if player O wins
    // Return 'T' if the game is a tie
    // Return false if the game has not ended

    let checkHorizontalWin = (move) => {
      for (let row of grid) {
        if (row[0] === move && row[1] === move && row[2] === move) {
          return true;
        }
      }
      return false;
    };

    let checkColumnWin = (move) => {

      for (let col = 0; col < grid.length; col++) {
        if (
          grid[0][col] === move &&
          grid[1][col] === move &&
          grid[2][col] === move ) {
            return true;
        }
      }
      return false;

    }

    let checkDiagonalWin = (move) => {

      const diagonal1 = 
        grid[0][0] === move &&
        grid[1][1] === move &&
        grid[2][2] === move;

      const diagonal2 = 
        grid[0][2] === move &&
        grid[1][1] === move &&
        grid[2][0] === move;
      
      return diagonal1 || diagonal2;

    };

 
    if (checkHorizontalWin("X") || checkColumnWin("X") || checkDiagonalWin("X")) {
      return "X";
    }
    if (checkHorizontalWin("O") || checkColumnWin("O") || checkDiagonalWin("O")) {
      return "O";
    }

    let emptySpaces = grid.flat().filter(cell => cell === " ").length;
    return emptySpaces > 0 ? false : "T";

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
