import * as IoRedis from 'ioredis';
import { broker } from './broker';
import { logger } from './logger';
import { instanceId } from './config';

export const setupRedis = () => {
	return new IoRedis(process.env.REDIS_URL);
};

export const redis = setupRedis();

export async function connect(cdata) {
	const { connectionId } = cdata;
	broker.emit('connection.join', { connectionId, instanceId });
}

export async function disconnect(cdata) {
	const { connectionId } = cdata;
	broker.emit('connection.leave', { connectionId });
}

export async function login(token: string, cdata) {
	if (cdata.token === token) {
		return false;
	}

	const tokenData = await redis.get(`connectionToken:${token}`);

	if (!tokenData) {
		logger.error('Invalid token');
		return;
	}

	redis.del(`connectionToken:${token}`);

	cdata.token = token;
	const userId = parseInt(tokenData, 10);
	cdata.userId = userId;
	broker.emit('connection.login', {
		connectionId: cdata.connectionId,
		userId
	});
}

export async function join(roomId: number, cdata) {
	if (cdata.roomId == roomId) {
		return false;
	}

	cdata.roomId = roomId;
	broker.emit('connection.joinRoom', {
		connectionId: cdata.connectionId,
		roomId
	});
}

export async function leave(data: any, cdata) {
	const roomId = cdata.roomId;

	if (!roomId) {
		return false;
	}

	cdata.roomId = null;
	broker.emit('connection.leaveRoom', {
		connectionId: cdata.connectionId,
		roomId
	});
}
