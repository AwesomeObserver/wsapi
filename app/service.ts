import { Service, Event, BaseSchema } from 'moleculer-decorators';
import { broker } from 'app/broker';
import { objFilter } from 'app/utils';

export const setupService = (wsAPI, instanceId) => {
	@Service({
		name: 'wsapi',
		dependencies: ['connection']
	})
	class WSAPIService extends BaseSchema {
		@Event()
		'wsapi.publish'(ctx) {
			const { eventName, payload, filterData } = ctx;
			wsAPI.send(eventName, payload, (cdata) => objFilter(cdata, filterData));
		}

		started() {
			console.log(instanceId);

			broker.call('connection.createInstance', { instanceId });

			setInterval(() => {
				broker.call('connection.instanceAlive', { instanceId });
			}, 2000);
		}
	}

	return broker.createService(WSAPIService);
};
