export interface DateRange {
	label:
		| 'Show Me Last Week'
		| 'Show Me Last Two Weeks'
		| 'Show Me Last Month'
		| 'Show Me Last Quarter'
		| 'Show Me Last Year';
	value: 'LAST_WEEK' | 'LAST_TWO_WEEKS' | 'LAST_MONTH' | 'LAST_QUARTER' | 'LAST_YEAR';
}

export const dateRanges: DateRange[] = [
	{
		label: 'Show Me Last Week',
		value: 'LAST_WEEK'
	},
	{
		label: 'Show Me Last Two Weeks',
		value: 'LAST_TWO_WEEKS'
	},
	{
		label: 'Show Me Last Month',
		value: 'LAST_MONTH'
	},
	{
		label: 'Show Me Last Quarter',
		value: 'LAST_QUARTER'
	},
	{
		label: 'Show Me Last Year',
		value: 'LAST_YEAR'
	}
];
