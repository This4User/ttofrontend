import React, { useEffect, useState } from 'react';
import Board from '../../Components/Board/Board';
import { CellType, CellValue } from '../../Components/Cell/Cell';
import BoardService from '../../utils/OfflineGame/OfflineGameService';
import { GameType } from './index';

const boardService = new BoardService();

const OnlineGame: React.FunctionComponent<GameType> = ({onGameEnd, setPlayerSign, playerSign, startCountdown}) => {
	const [board, setBoard] = useState<Array<CellType>>();
	const [isInGame, setIsInGame] = useState<boolean>(false);

	useEffect(() => {
		setIsInGame(true);
		boardService.initBoard();
		setBoard(boardService.getBoard());
		setPlayerSign(boardService.getPlayerSign());
		console.log('Offline game start');

		return () => {
			restart();
		};
	}, [setPlayerSign]);

	const checkWinner = (isWin: CellValue | boolean | undefined) => {
		if (isWin) {
			startCountdown();
			setTimeout(() => {
				restart();
			}, 5000);
			if (isWin !== CellValue.empty) {
				if (isWin) {
					onGameEnd(true);
				} else {
					onGameEnd(false);
				}
			} else {
				onGameEnd(isWin);
			}
		}
	};

	const makeMove = (index: number): void => {
		const isWin = boardService.makeMove({value: playerSign, index});
		setBoard(boardService.getBoard());
		checkWinner(isWin);
	};

	const restart = () => {
		boardService.clearBoard();
		boardService.initBoard();
		setPlayerSign(boardService.getPlayerSign());
		setBoard(boardService.getBoard());
	};

	return (
		<>
			{
				isInGame ?
					board && <Board
						board={board}
						onClick={makeMove}
					/> : null
			}
		</>
	);
};

export default OnlineGame;
