import io, { Socket } from 'socket.io-client';
import { CellValue } from '../Components/Cell/Cell';
import { BoardEvents, RoomEvents, SocketEvents } from '../Types';
import { broadcast } from '../utils/EventBus';

const socket: Socket = io('http://192.168.0.109:2800/');

socket.on(SocketEvents.connect, () => broadcast(SocketEvents.connect, socket.id));
socket.on(SocketEvents.disconnect, () => broadcast(SocketEvents.disconnect));
socket.on(SocketEvents.connectError, (err => broadcast(SocketEvents.connectError, err)));

socket.on(BoardEvents.getBoard, (board) => broadcast(BoardEvents.getBoard, board));
socket.on(BoardEvents.getPlayerSign, (playerSign) => broadcast(BoardEvents.getPlayerSign, playerSign));
socket.on(BoardEvents.gameFinished, (isWin) => broadcast(BoardEvents.gameFinished, isWin));
socket.on(RoomEvents.gameStarted, () => broadcast(RoomEvents.gameStarted));

socket.on(RoomEvents.leave, () => broadcast(RoomEvents.leave));

export const addToQueue = () => {
	socket.emit('addToQueue');
	console.log('add to Queue');
};

export const makeMove = (index: number, playerSign: CellValue) => {
	socket.emit(BoardEvents.makeMove, {
		index: index,
		value: playerSign,
	});
};

export const leave = () => {
	socket.emit(RoomEvents.leave);
};
