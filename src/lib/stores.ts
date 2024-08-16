import { writable } from 'svelte/store';
import type { DateRange } from './config';

export const dateRangeStore = writable<DateRange['value']>('LAST_YEAR');
