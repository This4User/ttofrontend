import io, { Socket } from 'socket.io-client';
import { CellValue } from '../Components/Cell/Cell';
import { BoardEvents, RoomEvents } from '../Types';
import { broadcast } from './eventbus';

const socket: Socket = io('http://192.168.0.109:2800/');

socket.on('connect',
	() => broadcast('connect', socket.id));
socket.on(BoardEvents.getBoard,
	(board) => broadcast(BoardEvents.getBoard, board));
socket.on(BoardEvents.getPlayerSign,
	(playerSign) => broadcast(BoardEvents.getPlayerSign, playerSign));
socket.on(BoardEvents.gameFinished,
	(winnerSign) => broadcast(BoardEvents.gameFinished, winnerSign));
socket.on(RoomEvents.leave,
	() => broadcast(RoomEvents.leave));

export const addToQueue = () => {
	socket.emit('addToQueue');
};

export const makeMove = (index: number, playerSign: CellValue) => {
	socket.emit(BoardEvents.makeMove, {
		index: index,
		value: playerSign,
	});
};

export const leave = () => {
	socket.emit(RoomEvents.leave)
	socket.disconnect();
}
