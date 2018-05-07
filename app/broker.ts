import { ServiceBroker } from 'moleculer';
import { logger } from 'app/logger';

export let broker = new ServiceBroker({
	transporter: process.env.NATS_URL,
	logger,
	logLevel: 'warn'
});

broker.start();
