<script lang="ts">
	import Info from 'lucide-svelte/icons/info';
	import * as Tooltip from '$lib/shadcn/ui/tooltip';
	import DateRangeDropdown from '$lib/components/TableControls/DateRangeDropdown.svelte';
	import Heatmap from '$lib/components/Charts/Heatmap.svelte';
	
	let form : HTMLFormElement;
	export let data;
	console.log(data);
</script>

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
		<div class="hidden items-center gap-4 lg:flex">
			<DateRangeDropdown />
		</div>
		
	</header>
	<main>
		<Heatmap />
	</main>
</div>
