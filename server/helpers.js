/**
 * Calculate the number of live neighbors at a given cell position
 *
 * @param {array} mat - A 2D array representing the board state
 * @param {int} x - The cell's x position
 * @param {int} y - The cell's y position
 *
 * @return {int} - The number of live neighbors
 */
export const calculateNeighbors = ({ mat, x, y }) => {
	let neighborCount = 0;

	/**
	 * Check cells above the current cell, if possible
	 * [ x x x ]
	 * [ 0 - 0 ]
	 * [ 0 0 0 ]
	 */
	if (mat[y - 1]) {
		if (mat[y - 1][x - 1] && mat[y - 1][x - 1].isAlive) {
			neighborCount++;
		}

		if (mat[y - 1][x].isAlive) {
			neighborCount++;
		}

		if (mat[y - 1][x + 1] && mat[y - 1][x + 1].isAlive) {
			neighborCount++;
		}
	}

	/**
	 * Check cells below the current cell, if possible
	 * [ 0 0 0 ]
	 * [ 0 - 0 ]
	 * [ x x x ]
	 */
	if (mat[y + 1]) {
		if (mat[y + 1][x - 1] && mat[y + 1][x - 1].isAlive) {
			neighborCount++;
		}

		if (mat[y + 1][x].isAlive) {
			neighborCount++;
		}

		if (mat[y + 1][x + 1] && mat[y + 1][x + 1].isAlive) {
			neighborCount++;
		}
	}

	/**
	 * Check cells to left & right, if possible
	 * [ 0 0 0 ]
	 * [ x - x ]
	 * [ 0 0 0 ]
	 */
	if (mat[y][x - 1] && mat[y][x - 1].isAlive) {
		neighborCount++;
	}
	if (mat[y][x + 1] && mat[y][x + 1].isAlive) {
		neighborCount++;
	}

	return neighborCount;
};
