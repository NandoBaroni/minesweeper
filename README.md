# Project: Terminal-Based Minesweeper Game in JavaScript

#### Objective

Your goal is to create a text-based Minesweeper game that runs in the terminal. The game should allow the user to uncover cells to find mines, while also providing flags to mark suspected mines.

#### Features and Requirements

1. **Board Size**: The game should offer at least two different board sizes: small (e.g., 5x5) and large (e.g., 10x10).
2. **Mines**: Each board size should have a pre-defined number of randomly placed mines.
3. **User Interaction**: Use an npm package like `prompt-sync` to interact with the user. Prompt the user to choose a board size before starting the game.
4. **Cell Representation**: Use characters to represent the state of each cell on the board. For example, you can use:

   - 'U' for an uncovered cell
   - 'F' for a flagged cell
   - '\*' for a mine

5. **Gameplay**: The user should be prompted to perform one of the following actions on each turn:

   - Uncover a cell
   - Flag a cell
   - Remove a flag from a cell

6. **Validation**: Validate the user input to ensure it corresponds to a valid cell on the board.
7. **Winning and Losing**:

   - The game is won when all non-mine cells are uncovered.
   - The game is lost if a mine is uncovered.

8. **Hints**: When a cell without a mine is uncovered, display the number of adjacent mines. Use this information to update the board state.
9. **Status Updates**: After each move, display the current state of the board and any relevant messages (e.g., "You found a mine! Game over.")
10. **End Game**: Provide options for the user to restart the game or quit after each game ends.

#### Optional Features

1. **Time Tracking**: Track the amount of time taken to win the game and display it at the end.
2. **High Scores**: Implement a high-score system that considers both the board size and the time taken to win.
3. **Safe Start**: Ensure that the first cell uncovered is never a mine.

#### Technical Notes

- You're only allowed to use plain JavaScript and the terminal for this project.
- Use an npm package like `prompt-sync` to gather user input. Install this package using npm.

#### Example

```
Welcome to Minesweeper!

Choose a board size:
1. Small (5x5)
2. Large (10x10)

Your choice: 1

Current Board:
UUUUU
UUUUU
UUUUU
UUUUU
UUUUU

Your move:
1. Uncover a cell
2. Flag a cell
3. Remove a flag

Your choice: 1
Enter the row and column to uncover (e.g., 2 3): 2 3

[Board updates...]

Would you like to play again? (Yes/No)
```
