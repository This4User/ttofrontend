import React, { useEffect, useState } from 'react';
import Board from '../../Components/Board/Board';
import { CellType, CellValue } from '../../Components/Cell/Cell';
import * as Net from '../../Networking';
import { BoardEvents } from '../../Types';
import * as NetSubscriptions from '../../utils/EventBus';
import { GameType } from './index';

const OnlineGame: React.FunctionComponent<GameType> = ({onGameEnd, playerSign, setPlayerSign}) => {
	const [board, setBoard] = useState<Array<CellType>>();
	const [isInGame, setIsInGame] = useState<boolean>(false);

	useEffect(() => {
		const _setBoard = (board: Array<CellType>) => {
			setBoard(board);
			console.log(board);
		};

		const _onGameEnd = (isWin: boolean | CellValue.empty) => {
			setTimeout(() => {
				Net.leave();
			}, 10000);

			if (isWin !== CellValue.empty) {
				if (isWin) {
					onGameEnd(true);
				} else {
					onGameEnd(false);
				}
			} else {
				onGameEnd(isWin);
			}
		};

		const _setPlayerSign = (playerSign: CellValue) => {
			setPlayerSign(playerSign);
			console.log(playerSign);
		};

		setIsInGame(true);

		NetSubscriptions.subscribe(BoardEvents.getBoard, _setBoard);
		NetSubscriptions.subscribe(BoardEvents.gameFinished, _onGameEnd);
		NetSubscriptions.subscribe(BoardEvents.getPlayerSign, _setPlayerSign);

		return () => {
			NetSubscriptions.unsubscribe(BoardEvents.getBoard, _setBoard);
			NetSubscriptions.unsubscribe(BoardEvents.gameFinished, _onGameEnd);
			NetSubscriptions.unsubscribe(BoardEvents.getPlayerSign, _setPlayerSign);
		};
	}, []);

	const makeMove = (index: number): void => {
		Net.makeMove(index, playerSign);
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
