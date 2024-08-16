import type { UniqueVisitorsResponse } from '$server/validations/visitors.schema';

export const parseUniqueVisitorsResponse = (response) => {
	const formatted: UniqueVisitorsResponse[] = [];
	const countries = response.aggregations.countries.buckets;
	countries.forEach((country) => {
		const countryCode = country.key;
		const hours = country.hours.buckets;
		hours.forEach((hour) => {
			const date = hour.key;
			const record: UniqueVisitorsResponse = {
				countryCode,
				hour: new Date(date).getUTCHours(),
				visitors: hour.visitors.value
			};

			if (
				formatted.some(
					(item) => item.countryCode === record.countryCode && item.hour === record.hour
				)
			) {
				formatted.forEach((item) => {
					if (item.countryCode === record.countryCode && item.hour === record.hour) {
						item.visitors += record.visitors;
					}
				});
			} else {
				formatted.push(record);
			}
		});
	});
	return formatted;
};
