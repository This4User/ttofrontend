import { CellType, CellValue } from '../../Components/Cell/Cell';

class BoardService {
	private board: Array<CellType> = [];
	private winnerSign: CellValue = CellValue.empty;
	private activePlayerSign: boolean = Math.random() < 0.5;
	private isCanMove: boolean = true;

	initBoard(): string {
		this.isCanMove = true;
		this.winnerSign = CellValue.empty;
		if (this.board.length < 9) {
			for (let i = 0; i < 9; i++) {
				const cell = {value: CellValue.empty, index: i};
				this.board.push(cell);
			}
		}

		return 'Board initialize';
	}

	getBoard(): Array<CellType> {
		return this.board;
	}

	getPlayerSign() {
		if (this.activePlayerSign) {
			return CellValue.cross;
		} else {
			return CellValue.circle;
		}
	}

	makeMove(moveData: CellType): CellValue | boolean | undefined {
		if (this.isCanMove) {
			this.board[moveData.index] = {
				value: moveData.value,
				index: moveData.index,
			};
			this.isCanMove = false;

			this.botMove();

			return this.checkWinner();
		}
	}

	botMove() {
		const isBoardNotFull = this.board.find(cell => cell.value === CellValue.empty);
		const botSign = this.getPlayerSign() === CellValue.circle ? CellValue.cross : CellValue.circle;

		if (isBoardNotFull) {
			let randomCellIndex = Math.floor(Math.random() * this.board.length);
			if (this.winnerSign !== CellValue.empty) {
				return;
			}
			if (this.board[randomCellIndex].value === CellValue.empty) {
				this.board[randomCellIndex] = {
					value: botSign,
					index: randomCellIndex,
				};
				this.isCanMove = true;
				console.log('botMove');
				return;
			} else {
				randomCellIndex = Math.floor(Math.random() * this.board.length);
				this.botMove();
			}
		}
	}

	checkBoard(): CellValue | undefined {
		const isBoardFull = !this.board.find(cell => cell.value === CellValue.empty);
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];
		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (this.board[a].value !== CellValue.empty
				&& this.board[a].value === this.board[b].value
				&& this.board[a].value === this.board[c].value) {
				this.winnerSign = this.board[a].value;
				return this.board[a].value;
			}
		}

		if (isBoardFull) {
			this.winnerSign = CellValue.empty;
			return CellValue.empty;
		}

		return undefined;
	}

	checkWinner(): CellValue | undefined {
		const winnerSign = this.checkBoard();
		if (winnerSign) {
			if (winnerSign !== CellValue.empty) {
				this.isCanMove = false;
				return winnerSign;
			} else {
				return CellValue.empty;
			}
		}
	}

	clearBoard(): void {
		this.board = [];
	}
}

export default BoardService;