import { WSAPI } from './server';
import { instanceId } from './config';
import { setupService } from './service';
import { logger } from './logger';

(async () => {
	const wsAPI = new WSAPI();
	await wsAPI.run();
	await setupService(wsAPI, instanceId);

	logger.info(`WSAPI Server ${instanceId} Is Ready`);
})();
