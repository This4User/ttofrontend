import { Socket } from 'socket.io-client';

export enum BoardEvents {
	initBoard = 'initBoard',
	makeMove = 'makeMove',
	getBoard = 'getBoard',
	getPlayerSign = 'getPlayerSign',
	gameFinished = 'gameFinished',
}

export type UserType = {
	id: string;
	name?: string;
	socket: Socket;
};

export enum RoomEvents {
	leave = 'leave',
	restart = 'restart'
}

export type Point = {
	x: number
	y: number;
}

