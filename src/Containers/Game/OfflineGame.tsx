import React, { useEffect, useState } from 'react';
import Board from '../../Components/Board/Board';
import { CellType, CellValue } from '../../Components/Cell/Cell';
import BoardService from '../../utils/OfflineGame/OfflineGameService';
import { GameType } from './index';

const boardService = new BoardService();

const OnlineGame: React.FunctionComponent<GameType> = ({onGameEnd, setPlayerSign, playerSign}) => {
	const [board, setBoard] = useState<Array<CellType>>();
	const [isInGame, setIsInGame] = useState<boolean>(false);

	useEffect(() => {
		setIsInGame(true);
		boardService.initBoard();
		setBoard(boardService.getBoard());
		setPlayerSign(boardService.getPlayerSign());
		console.log('Offline game start');
	}, [setPlayerSign]);

	const checkWinner = (winnerSign: CellValue) => {
		if (winnerSign !== CellValue.empty) {
			if (winnerSign === playerSign) {
				onGameEnd(true);
			} else {
				onGameEnd(false);
			}
		}
	};

	const makeMove = (index: number): void => {
		const winnerSign = boardService.makeMove({value: playerSign, index});
		setBoard(boardService.getBoard());
		if (winnerSign) {
			checkWinner(winnerSign);
		}
		setTimeout(() => {
			checkWinner(boardService.checkBoard());
			setBoard(boardService.getBoard());
		}, 500);
	};

	const restart = () => {
		boardService.clearBoard();
		setBoard(boardService.getBoard());
		setIsInGame(false);
		onGameEnd(false);
		setPlayerSign(CellValue.empty);
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
