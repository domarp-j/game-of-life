import Board from './board';
import Cell from './cell';

import { calculateNeighbors } from './helpers';

/**
 * Given a Conway's GOL board, return a new board with updates cells
 *
 * @param {Board} board - A GOL board
 *
 * @return {Board} - A new GOL board with updated cells
 */
export default board => {
	// Create a copy of the board that will contain the new cell states
	const newBoard = new Board({ width: board.width, height: board.height });

	// Iterate through each cell on the board
	for (let x = 0; x < board.width; x++) {
		for (let y = 0; y < board.height; y++) {
			// Calculate number of live neighbors
			let neighborCount = calculateNeighbors({ mat: board.mat, x, y });

			// Live cell -> dead cell if:
			// - < 2 live neighbors
			// - > 3 live neighbors
			if (board.mat[y][x].isAlive && (neighborCount < 2 || neighborCount > 3)) {
				newBoard.mat[y][x] = new Cell().makeDead();
			}

			// Dead cell -> live cell if exactly three neighbors
			else if (board.mat[y][x].isDead && neighborCount === 3) {
				newBoard.mat[y][x] = new Cell().makeAlive();
			}

			// Copy cell to new board as-is otherwise
			else {
				newBoard.mat[y][x] = new Cell({ state: board.mat[y][x].state });
			}
		}
	}

	return newBoard;
};
