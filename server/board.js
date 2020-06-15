import Cell from './cell';

/**
 * Create a Conway's Game of Life board
 *
 * @property {int} width - The width of the board
 * @property {int} height - The height of the board
 * @property {array} mat - A 2D width x height matrix representing the board state
 *
 * Example: myBoard
 * [ x x x x ]
 * [ x x x x ]
 * [ x 0 x x ]
 *
 * myBoard.width == 4, myBoard.height == 3
 * The live cell indicated by 0 is located at X-Y coords (1,2)
 * It is accessed using myBoard.mat[2][1] (note the X-Y swap!)
 */
export default class Board {
	constructor({ width, height } = {}) {
		this.width = width;
		this.height = height;
		this.mat = [];

		this.setup();
	}

	// Initialize board as a 2D matrix filled with "dead" cells
	setup() {
		for (let x = 0; x < this.width; x++) {
			for (let y = 0; y < this.height; y++) {
				if (!this.mat[y]) this.mat[y] = [];
				this.mat[y][x] = new Cell().makeDead();
			}
		}
	}
}
