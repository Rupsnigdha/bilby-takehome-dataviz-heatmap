<script lang="ts">
	import { CalendarDate, getLocalTimeZone, today } from '@internationalized/date';
	import { browser } from '$app/environment';
	import { trpc } from '$lib/trpc';

	import * as Tooltip from '$lib/shadcn/ui/tooltip';
	import Info from 'lucide-svelte/icons/info';

	import DateRangeDropdown from '$lib/components/TableControls/DateRangeDropdown.svelte';
	import Heatmap from '$lib/components/Charts/Heatmap.svelte';
	import SEO from '$lib/components/SEO.svelte';

	import { dateRangeStore } from '$lib/stores';
	import type { UniqueVisitorsResponse } from '$server/validations/visitors.schema';
	import MobileControls from '$lib/components/MobileControls.svelte';

	const localTimeZone = getLocalTimeZone();

	let tableData: UniqueVisitorsResponse[] = [];
	$: loading = true;
	/**
	 * updates the value of tableData based on the value of $dateRangeStore.
	 */
	const handleDateRangeChange = async () => {
		let finalDate = today(localTimeZone);
		let initialDate: CalendarDate;

		switch ($dateRangeStore) {
			case 'LAST_WEEK':
				initialDate = finalDate.subtract({ weeks: 1 });
				break;
			case 'LAST_TWO_WEEKS':
				initialDate = finalDate.subtract({ weeks: 2 });
				break;
			case 'LAST_MONTH':
				initialDate = finalDate.subtract({ months: 1 });
				break;
			case 'LAST_QUARTER':
				initialDate = finalDate.subtract({ months: 3 });
				break;
			case 'LAST_YEAR':
				initialDate = finalDate.subtract({ years: 1 });
				break;
		}
		let initialDateString = initialDate.toDate(localTimeZone).toISOString();
		let finalDateString = finalDate.toDate(localTimeZone).toISOString();

		try {
			loading = true;
			let data = await trpc.uniqueVisitors.getUniqueVisitorsByCountry.query({
				initialDate: initialDateString,
				finalDate: finalDateString
			});
			tableData = data.res;
		} catch (error) {
			console.error('Error fetching heatmap data:', error);
		} finally {
			loading = false;
		}
	};

	// makes the if-statement subscribe to $dateRangeStore and calls handleDateRangeChange() everytime the value of dateRangeStore changes.
	$: if (browser) {
		$dateRangeStore, handleDateRangeChange();
	}
</script>

<SEO />

<div class="h-full flex-1">
	<header class="container flex justify-between py-4 h-full flex-1">
		<div class="flex items-center gap-4">
			<h2 class="text-2xl font-medium">Web Traffics</h2>
			<Tooltip.Root openDelay={300}>
				<Tooltip.Trigger><Info class="h-3 w-3 text-muted-foreground" /></Tooltip.Trigger>
				<Tooltip.Content side="bottom" class="bg-muted">
					<p>The unique visitors to your site in various date ranges from various countries.</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</div>
		<!-- Dropdown to update the date range store -->
		 <div class="hidden lg:flex">
			 <DateRangeDropdown />
		 </div>
		 <MobileControls />
	</header>
	<main>
		<!-- The heatmap component -->
		<Heatmap data={tableData} {loading} />
	</main>
</div>
