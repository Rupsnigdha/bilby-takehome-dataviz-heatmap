import { persisted } from 'svelte-persisted-store';
import type { DateRange } from './config';

export const dateRangeStore = persisted<DateRange['value']>('dateRange', 'LAST_WEEK');
export const selectedHeatmapColorTheme = persisted('color', '#800020');
