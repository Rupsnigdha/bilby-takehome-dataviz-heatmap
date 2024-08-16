import { env } from '$env/dynamic/private';
import { Client } from '@elastic/elasticsearch';

export const elasticClient = new Client({
	cloud: {
		id: env.ELASTIC_SEARCH_CLOUD_ID
	},
	auth: {
		apiKey: env.ELASTIC_SEARCH_API_KEY
	}
});
