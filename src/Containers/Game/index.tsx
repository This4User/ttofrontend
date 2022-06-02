import React, { useEffect, useState } from 'react';
import circle from '../../assets/PlayerSigns/circle.png';
import cross from '../../assets/PlayerSigns/cross.png';
import Board from '../../Components/Board/Board';
import { CellType, CellValue } from '../../Components/Cell/Cell';
import Cursor from '../../Components/Cursor/Cursor';
import ModalCard from '../../Components/ModalCard/ModalCard';
import * as Net from '../../Networking';
import * as NetSubscriptions from '../../Networking/eventbus';
import { BoardEvents, Point, RoomEvents } from '../../Types';
import s from './Game.module.css';

const Game = () => {
	const [playerSign, setPlayerSign] = useState<CellValue>(CellValue.empty);
	const [board, setBoard] = useState<Array<CellType>>();
	const [isWin, setIsWin] = useState<boolean>(false);
	const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
	const [isInGame, setIsInGame] = useState<boolean>(false);
	const [cursorPosition, setCursorPosition] = useState<Point>({x: -200, y: -200});
	const cursorImg = playerSign === CellValue.cross ? cross : circle;

	useEffect(() => {

		const _setBoard = (board: Array<CellType>) => {
			setBoard(board);
		};

		const _setPlayerSign = (playerSign: CellValue) => {
			setPlayerSign(playerSign);
		};

		const _setWinner = (winnerSign: CellValue) => {
			setIsGameFinished(true);
			console.log(winnerSign);
			console.log(playerSign);
			if (winnerSign === playerSign) {
				setIsWin(true);
			} else {
				setIsWin(false);
			}
		};

		setIsInGame(true);
		Net.addToQueue();
		NetSubscriptions.subscribe(BoardEvents.getBoard, _setBoard);
		NetSubscriptions.subscribe(BoardEvents.getPlayerSign, _setPlayerSign);
		NetSubscriptions.subscribe(BoardEvents.gameFinished, _setWinner);
		NetSubscriptions.subscribe(RoomEvents.leave, leave);

		return () => {
			NetSubscriptions.unsubscribe(BoardEvents.getBoard, _setBoard);
			NetSubscriptions.unsubscribe(BoardEvents.getPlayerSign, _setPlayerSign);
			NetSubscriptions.unsubscribe(BoardEvents.gameFinished, _setWinner);
			NetSubscriptions.unsubscribe(RoomEvents.leave, leave);
		};
	}, [playerSign]);

	const makeMove = (index: number): void => {
		Net.makeMove(index, playerSign);
	};

	const leave = () => {
		Net.leave();
		setIsInGame(false);
		setIsWin(false);
		setPlayerSign(CellValue.empty);
	};

	return (
		<div
			className={s.gameScreen}
			onMouseMove={(e) => {
				setCursorPosition({
					x: e.clientX,
					y: e.clientY,
				});
			}}
		>
			<Cursor img={cursorImg} y={cursorPosition.y} x={cursorPosition.x}/>
			{
				isInGame ?
					board && <Board
						board={board}
						onClick={makeMove}
					/> : null
			}
			{
				isGameFinished && isInGame ?
					(isWin ?
						<ModalCard
							title={'You win'}
							actionText={'Leave game'}
							onClick={leave}
						/> :
						<ModalCard
							title={'You lose'}
							actionText={'Leave game'}
							onClick={leave}
						/>) :
					null
			}
		</div>
	);
};

export default Game;
