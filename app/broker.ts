import { ServiceBroker } from 'moleculer';
import { logger } from './logger';
import { natsUrl } from './config';

export let broker = new ServiceBroker({
	transporter: natsUrl,
	logger,
	logLevel: 'warn'
});

broker.start();
