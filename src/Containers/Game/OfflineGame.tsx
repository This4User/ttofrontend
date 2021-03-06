import React, { useEffect, useState } from 'react';
import Board from '../../Components/Board/Board';
import { CellType, CellValue } from '../../Components/Cell/Cell';
import BoardService from '../../utils/OfflineGame/OfflineGameService';
import { GameType } from './index';

const boardService = new BoardService();

const OnlineGame: React.FunctionComponent<GameType> = ({onGameEnd, setPlayerSign, playerSign, startCountdown}) => {
	const [board, setBoard] = useState<Array<CellType>>();
	const [isInGame, setIsInGame] = useState<boolean>(false);
	const [isRoundEnd, setIsRoundEnd] = useState<boolean>(false);

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

	const checkWinner = (winnerSign: CellValue | boolean | undefined) => {
		if (winnerSign) {
			setIsRoundEnd(true);
			startCountdown();
			setTimeout(() => {
				restart();
			}, 5000);
			if (winnerSign !== CellValue.empty) {
				if (winnerSign === playerSign) {
					onGameEnd(true);
				} else {
					onGameEnd(false);
				}
			} else {
				onGameEnd(winnerSign);
			}
		}
	};

	const makeMove = (index: number): void => {
		if (!isRoundEnd) {
			const isWin = boardService.makeMove({value: playerSign, index});
			setBoard(boardService.getBoard());
			checkWinner(isWin);
			checkWinner(boardService.checkBoard());
			setBoard(boardService.getBoard());
		}
	};

	const restart = () => {
		boardService.clearBoard();
		boardService.initBoard();
		setPlayerSign(boardService.getPlayerSign());
		setBoard(boardService.getBoard());
		setIsRoundEnd(false);
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
