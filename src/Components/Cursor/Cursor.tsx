import React, { useEffect, useState } from 'react';
import { Point } from '../../Types';

import s from './Cursor.module.css';

type CursorPropsType = {
	img: string;
	x: number;
	y: number;
}

const Cursor: React.FunctionComponent<CursorPropsType> = ({img, x, y}) => {
	const [cursorPosition, setCursorPosition] = useState<Point>({x: 0, y: 0});

	useEffect(()=>{
		document.body.className = "cursorNone";
	}, [])

	useEffect(() => {
		const screenWidth = document.body.clientWidth - 50;
		const screenHeight = document.body.clientHeight - 50;
		const isCanMove = x < screenWidth && y < screenHeight && !(x < 50) && !(y < 50);

		if (isCanMove) {
			setCursorPosition({x, y});
		}

	}, [x, y]);

	return (
		<div
			className={s.cursor}
			style={{
				top: cursorPosition.y,
				left: cursorPosition.x,
			}}
		>
			<img
				src={img}
				alt="cursor"
			/>
		</div>
	);
};

export default Cursor;