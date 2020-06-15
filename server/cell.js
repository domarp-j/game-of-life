/**
 * Create a Conway's Game of Life cell
 *
 * @property {enum} state - Indicates if cell is alive (1) or dead (0)
 */
export default class Cell {
	constructor({ state } = {}) {
		this.state = state || 0;
	}

	makeAlive() {
		this.state = 1;
		return this;
	}

	makeDead() {
		this.state = 0;
		return this;
	}

	get isAlive() {
		return this.state === 1;
	}

	get isDead() {
		return !this.isAlive;
	}
}
