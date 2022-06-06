import React, { useEffect, useState } from 'react';
import circle from '../../assets/PlayerSigns/circle.png';
import cross from '../../assets/PlayerSigns/cross.png';
import { CellValue } from '../../Components/Cell/Cell';
import Cursor from '../../Components/Cursor/Cursor';
import Title from '../../Components/Title/Title';
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
	startCountdown: Function;
}

const Game = () => {
	const [playerSign, setPlayerSign] = useState<CellValue>(CellValue.empty);
	const [isOnline, setIsOnline] = useState<boolean>(false);

	const [winCount, setWinCount] = useState<number>(0);
	const [loseCount, setLoseCount] = useState<number>(0);

	const [cursorPosition, setCursorPosition] = useState<Point>({x: -2000, y: -2000});
	const cursorImg = playerSign === CellValue.cross ? cross : circle;

	const [title, setTitle] = useState<string>('While you waiting in queue, you can play with bot.');
	const [countdown, setCountdown] = useState<number>(5);
	const [isCountdownStart, setIsCountdownStart] = useState<boolean>(false);

	const onGameEnd = (isWin: boolean | CellValue.empty) => {
		if (isWin !== CellValue.empty) {
			if (isWin) {
				setTitle('You win!');
				setWinCount(winCount + 1);
			} else {
				setTitle('You lose.');
				setLoseCount(loseCount + 1);
			}
		} else {
			setTitle('Draw!');
		}

		console.log(isWin);
	};
	const startCountdown = () => {
		setIsCountdownStart(true);
	};

	useEffect(() => {
		if (isCountdownStart) {
			if (countdown > 0) {
				setTimeout(() => setCountdown(countdown - 1), 1000);
			} else {
				setIsCountdownStart(false);
				setCountdown(5);
			}
		}

	}, [countdown, isCountdownStart]);

	useEffect(() => {

		const _connectError = (err: any) => {
			console.log(err);
			setIsOnline(false);
			Net.leave();
		};

		const _onOnlineGameStarted = () => {
			setIsOnline(true);
			console.log('Is online: ' + isOnline);
			setTitle('');
		};

		const _onLeave = () => {
			if (!isOnline) {
				setTitle('Now you waiting new player in queue and can play with bot.');
				setIsOnline(false);
				console.log('Player leaved room');
			}
		};

		Net.addToQueue();
		NetSubscriptions.subscribe(RoomEvents.gameStarted, _onOnlineGameStarted);
		NetSubscriptions.subscribe(SocketEvents.connectError, _connectError);
		NetSubscriptions.subscribe(RoomEvents.leave, _onLeave);

		return () => {
			NetSubscriptions.unsubscribe(RoomEvents.gameStarted, _onOnlineGameStarted);
			NetSubscriptions.unsubscribe(SocketEvents.connectError, _connectError);
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
			<Cursor
				img={cursorImg}
				y={cursorPosition.y}
				x={cursorPosition.x}
			/>
			<Title>
				Win: {winCount} | Lose: {loseCount}
			</Title>
			<Title>
				{title}
			</Title>
			{
				isOnline ?
					<>
						<OnlineGame
							onGameEnd={onGameEnd}
							playerSign={playerSign}
							setPlayerSign={setPlayerSign}
							startCountdown={startCountdown}
						/>
					</>
					:
					<>
						<OfflineGame
							onGameEnd={onGameEnd}
							playerSign={playerSign}
							setPlayerSign={setPlayerSign}
							startCountdown={startCountdown}
						/>
					</>
			}
			{
				isCountdownStart && <Title>
					{countdown}
				</Title>
			}
		</div>
	);
};

export default Game;
