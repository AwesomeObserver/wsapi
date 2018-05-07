import * as crypto from 'crypto';

export const instanceId = crypto.randomBytes(4).toString('hex');
export const natsUrl = process.env.NATS_URL || 'nats://nats:4222';
export const redisUrl = process.env.REDIS_URL || 'redis://redis:6379';
