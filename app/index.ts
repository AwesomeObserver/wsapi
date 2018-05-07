import { WSAPI } from 'app/server';
import { instanceId } from 'app/config';
import { setupService } from 'app/service';
import { logger } from 'app/logger';

(async () => {
	const wsAPI = new WSAPI();
	await wsAPI.run();
	await setupService(wsAPI, instanceId);

	logger.info(`WSAPI Server ${instanceId} Is Ready`);
})();
