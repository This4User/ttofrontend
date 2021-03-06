import React from 'react';
import circle from '../../assets/PlayerSigns/circle.png';
import cross from '../../assets/PlayerSigns/cross.png';
import s from './Cell.module.css';


export enum CellValue {
	circle = 'circle',
	cross = 'cross',
	empty = 'empty'
}

export type CellType = {
	value: CellValue;
	index: number;
}

type CellPropsType = {
	cell: CellType;
	onClick: React.MouseEventHandler<HTMLDivElement>;
}

const getCellValue = (cell: CellType): string => {
	if (cell.value !== CellValue.empty) {
		return cell.value === 'cross' ? cross : circle;
	}
	return CellValue.empty;
};

const Cell: React.FunctionComponent<CellPropsType> = ({cell, onClick}) => {

	const cellValue = getCellValue(cell);

	return (
		<div
			className={s.cell}
			onClick={(e) => {
				e.preventDefault();
				onClick(e);
			}}
		>
			{
				cellValue !== CellValue.empty ?
					<img src={cellValue} alt={cellValue}/> :
					null
			}
		</div>
	);
};


export default Cell;