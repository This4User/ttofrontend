import React from 'react';
import Cell, { CellType } from '../Cell/Cell';

import s from './Board.module.css';

interface BoardI {
	board: Array<CellType>;
	onClick: (index: number) => void;
}

const Board = ({board, onClick}: BoardI) => {
	return (
		<div className={s.board}>
			{
				board.map((cell, index) => <Cell
					key={cell.index}
					cell={cell}
					onClick={() => {
						onClick(index);
					}}
					onTouch={() => {
						onClick(index);
					}}
				/>)
			}
		</div>
	);
};

export default Board;