import Board from './board';
import Cell from './cell';
import gameOfLife from './game';

test('still life - block', () => {
	compare({
		width: 4,
		height: 4,
		input: [[1, 1], [1, 2], [2, 1], [2, 2]],
		output: [[1, 1], [1, 2], [2, 1], [2, 2]],
	});
});

test('still life - beehive', () => {
	compare({
		width: 6,
		height: 5,
		input: [[1, 2], [1, 3], [2, 1], [2, 4], [3, 2], [3, 3]],
		output: [[1, 2], [1, 3], [2, 1], [2, 4], [3, 2], [3, 3]],
	});
});

test('oscillators - blinker', () => {
	compare({
		width: 5,
		height: 5,
		input: [[2, 1], [2, 2], [2, 3]],
		output: [[1, 2], [2, 2], [3, 2]],
	});

	compare({
		width: 5,
		height: 5,
		input: [[1, 2], [2, 2], [3, 2]],
		output: [[2, 1], [2, 2], [2, 3]],
	});
});

test('oscillators - toad', () => {
	compare({
		width: 6,
		height: 6,
		input: [[1, 2], [1, 3], [2, 4], [3, 1], [4, 2], [4, 3]],
		output: [[1, 3], [2, 2], [2, 3], [3, 2], [3, 3], [4, 2]],
	});

	compare({
		width: 6,
		height: 6,
		input: [[1, 3], [2, 2], [2, 3], [3, 2], [3, 3], [4, 2]],
		output: [[1, 2], [1, 3], [2, 4], [3, 1], [4, 2], [4, 3]],
	});
});

/**
 * Helper function to compare the gameOfLife function output
 * against the board input
 *
 * @param {int} width - The width of the board
 * @param {int} height - The height of the board
 * @param {2D array} input - [x, y] tuples indicating the positions of alive
 * cells before the GOL iteration
 * @param {2D array} output - [x, y] tuples indicating the positions of alive
 * cells after the GOL iteration
 *
 * NOTE: For this compare function to work properly, the coordinates in *input*
 * and *output* must be ordered first by x-coordinates and then by y-coordinates.
 */
const compare = ({ width, height, input, output }) => {
	// Create a blank board
	const boardInput = new Board({ width, height });

	// Update the board with live cells using the coordinates from input
	input.forEach(([x, y]) => {
		boardInput.mat[y][x] = new Cell().makeAlive();
	});

	const boardOutput = gameOfLife(boardInput);

	// Shift off the coordinates for live cell locations
	let coords = output.shift();

	for (let i = 0; i < width; i++) {
		if (output.length === 0) break;

		for (let j = 0; j < height; j++) {
			if (output.length === 0) break;

			const [x, y] = coords;
			if (i === x && j === y) {
				// A live cell should be here
				expect(boardOutput.mat[j][i].isAlive).toBe(true);

				// If test passes, then dispose of first batch of output coords
				// and get a new batch of coords for the next comparison
				coords = output.shift();
			} else {
				expect(boardOutput.mat[j][i].isAlive).toBe(false);
			}
		}
	}
};
