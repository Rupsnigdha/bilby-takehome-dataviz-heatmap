import { env } from '$env/dynamic/private';
import { elasticClient } from '$server/elastic';
import { parseUniqueVisitorsResponse } from '$server/utils/parseUniqueVisitorsResponse';
import { type UniqueVisitorsParams } from '$server/validations/visitors.schema';

export class VisitorsService {
	async getUniqueVisitors(params: UniqueVisitorsParams) {
		const res = await elasticClient.search({
			index: env.ELASTIC_SEARCH_INDEX,
			query: {
				bool: {
					must: {
						range: {
							'@timestamp': {
								gte: params.initialDate,
								lte: params.finalDate,
								format: 'strict_date_optional_time'
							}
						}
					}
				}
			},
			body: {
				size: 0,
				aggs: {
					countries: {
						terms: {
							field: 'geo.dest'
						},
						aggs: {
							hours: {
								date_histogram: {
									field: '@timestamp',
									calendar_interval: 'hour'
								},
								aggs: {
									visitors: {
										cardinality: {
											field: 'clientip'
										}
									}
								}
							}
						}
					}
				}
			}
		});
		console.log(res);
		const parsedRes = parseUniqueVisitorsResponse(res);
		return { res: parsedRes };
	}
}
