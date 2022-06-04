import React, { useEffect, useState } from 'react';
import circle from '../../assets/PlayerSigns/circle.png';
import cross from '../../assets/PlayerSigns/cross.png';
import { CellValue } from '../../Components/Cell/Cell';
import Cursor from '../../Components/Cursor/Cursor';
import ModalCard from '../../Components/ModalCard/ModalCard';
import * as Net from '../../Networking';
import { Point, RoomEvents, SocketEvents } from '../../Types';
import * as NetSubscriptions from '../../utils/EventBus';
import s from './Game.module.css';
import OfflineGame from './OfflineGame';
import OnlineGame from './OnlineGame';

export type GameType = {
	onGameEnd: Function;
	playerSign: CellValue;
	setPlayerSign: Function;
	setIsGameFinished: Function;
}

const Game = () => {
	const [playerSign, setPlayerSign] = useState<CellValue>(CellValue.empty);
	const [isGameFinished, setIsGameFinished] = useState<boolean>(false);
	const [isWin, setIsWin] = useState<boolean | 'deadHeat'>(false);
	const [isInGame, setIsInGame] = useState<boolean>(false);
	const [isOnline, setIsOnline] = useState<boolean>(false);
	const [countdown, setCountDown] = useState<number>(0);

	const [cursorPosition, setCursorPosition] = useState<Point>({x: -2000, y: -2000});
	const cursorImg = playerSign === CellValue.cross ? cross : circle;

	const playAgain = () => {
		Net.playAgain();
	};

	useEffect(() => {

		const _connectError = (err: any) => {
			console.log(err);
			setIsOnline(false);
			Net.leave();
		};

		const _onOnlineGameStarted = () => {
			setIsOnline(true);
			console.log('Is Online');
		};

		const _playAgain = () => {
			setIsGameFinished(false);
			setIsWin(false);
			console.log('Another player wanna to play again');
		};

		const _setCountdown = (count: number) => {
			setCountDown(count);
			console.log(countdown);
		};

		const _onLeave = () => {
			console.log('Player leaved room');
		};

		setIsInGame(true);
		Net.addToQueue();
		NetSubscriptions.subscribe(RoomEvents.gameStarted, _onOnlineGameStarted);
		NetSubscriptions.subscribe(SocketEvents.connectError, _connectError);
		NetSubscriptions.subscribe(RoomEvents.playAgain, _playAgain);
		NetSubscriptions.subscribe(RoomEvents.countdown, _setCountdown);
		NetSubscriptions.subscribe(RoomEvents.leave, _onLeave);

		return () => {
			NetSubscriptions.unsubscribe(RoomEvents.gameStarted, _onOnlineGameStarted);
			NetSubscriptions.unsubscribe(SocketEvents.connectError, _connectError);
			NetSubscriptions.unsubscribe(RoomEvents.playAgain, _playAgain);
			NetSubscriptions.unsubscribe(RoomEvents.countdown, _setCountdown);
		};
	}, []);

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
			{
				!isGameFinished && <Cursor
					img={cursorImg}
					y={cursorPosition.y}
					x={cursorPosition.x}
				/>
			}
			{
				isOnline ?
					<OnlineGame
						onGameEnd={setIsWin}
						playerSign={playerSign}
						setPlayerSign={setPlayerSign}
						setIsGameFinished={setIsGameFinished}
					/> :
					<>
						<div
							className={s.gameTitle}
						>
							While you waiting in queue, you can play with bot.
						</div>
						<OfflineGame
							onGameEnd={setIsWin}
							playerSign={playerSign}
							setPlayerSign={setPlayerSign}
							setIsGameFinished={setIsGameFinished}
						/>
					</>
			}

			{
				isGameFinished && isInGame ?
					(isWin ?
						<ModalCard
							title={'You win'}
							actionText={'Restart'}
							onClick={playAgain}
						/> :
						<ModalCard
							title={'You lose'}
							actionText={'Restart'}
							onClick={playAgain}
						/>) :
					null
			}
		</div>
	);
};

export default Game;
