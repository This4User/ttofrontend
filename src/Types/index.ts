import { Socket } from 'socket.io-client';

export enum BoardEvents {
	initBoard = 'initBoard',
	makeMove = 'makeMove',
	getBoard = 'getBoard',
	getPlayerSign = 'getPlayerSign',
	gameFinished = 'gameFinished',
}

export enum SocketEvents {
	connect = 'connect',
	connectError = 'connect_error',
	disconnect = 'disconnect'
}

export type UserType = {
	id: string;
	name?: string;
	socket?: Socket;
};

export enum RoomEvents {
	leave = 'leave',
	restart = 'restart',
	gameStarted = 'gameStarted',
	countdown = 'countdown'
}

export type Point = {
	x: number
	y: number;
}

