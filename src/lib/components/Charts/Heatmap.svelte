<script lang="ts">
	export let data: UniqueVisitorsResponse[] = [];
	export let loading = false;
	import { scaleLinear, scalePoint } from 'd3-scale';
	import { axisBottom, axisLeft } from 'd3-axis';
	import { select } from 'd3-selection';
	import { max } from 'd3-array';
	import type { UniqueVisitorsResponse } from '$server/validations/visitors.schema';
	import { onMount } from 'svelte';

	import { colors } from '$lib/config/';

	import Button from '$lib/shadcn/ui/button/button.svelte';
	import { selectedHeatmapColorTheme } from '$lib/stores';
	import Check from 'lucide-svelte/icons/check';

	const sortData = (data: UniqueVisitorsResponse[]) => {
		return data.sort((a, b) => a.hour - b.hour);
	};

	$: sortedData = sortData(data);

	// HTML components for the graph. gx and gy are the x and y axes.
	let parentContainer: HTMLDivElement;
	let gx;
	let gy;
	let svg;

	// the tooltip HTML component.
	let tooltip: HTMLDivElement;

	// dimensions of the graph.
	let height = 400;
	let marginTop = 20;
	let marginRight = 5;
	let marginBottom = 30;
	let marginLeft = 30;
	let width = 1920;
	onMount(() => {
		width = parentContainer.clientWidth;
	});

	// reactive tooltip data for the tooltip component.
	$: tooltipCountry = '';
	$: tooltipHour = 0;
	$: tooltipVisitors = 0;

	// a d3 scale for the x-axis. maps the hour to the x-coordinate.
	$: xAxis = scalePoint()
		.domain(sortedData.map((d) => d.hour.toString()))
		.range([marginLeft, width - marginRight])
		.padding(0.5);

	// a d3 scale for the y-axis. maps the country-code to the y-coordinate.
	$: yAxis = scalePoint()
		.domain(sortedData.map((d) => d.countryCode))
		.range([height - marginBottom, marginTop])
		.padding(0.5);
	// a d3 scale for the color scheme of the heatmap. maps the number of visitors to a color.
	$: colorScale = scaleLinear()
		.domain([0, max(sortedData, (d) => d.visitors)])
		.range(['#FFFFFF00', $selectedHeatmapColorTheme]);

	$: select(gx).call(axisBottom(xAxis).tickFormat((d) => (d % 3 === 0 ? d + ':00' : '')));
	$: select(gy).call(axisLeft(yAxis));

	// color scale for the legend of the heatmap
	const legendData = [0, 1, 2, 3, 4, 5];
	$: legendScale = scaleLinear().domain([0, 5]).range(['#FFFFFF00', $selectedHeatmapColorTheme]);
	/**
	 * Handles the mouseover events for the data points.
	 *
	 * @param event the mouseOver event.
	 * @param data the data of the data point.
	 */
	const handleMouseOverDatapoint = (d: UniqueVisitorsResponse) => {
		tooltipCountry = d.countryCode;
		tooltipHour = d.hour;
		tooltipVisitors = d.visitors;
		tooltip.style.left = xAxis(d.hour.toString()).toString() + 'px';
		tooltip.style.top = yAxis(d.countryCode).toString() + 'px';
		tooltip.style.opacity = '1';
	};

	const handleMouseLeaveDatapoint = () => {
		tooltip.style.opacity = '0';
	};

	const handleColorPaletteChange = (color: string) => {
		$selectedHeatmapColorTheme = color;
	};
</script>

<div class="container pt-8">
	<div class="flex justify-end lg:justify-between">
		<h2 class="hidden lg:block">Unique Visitors Heatmap</h2>
		<div class="flex gap-4 items-center">
			<div class="text-sm">Least</div>
			{#each legendData as legend}
				<div
					style="width: {(Math.min(10, width / 72) * 2).toString()}px; height: {(
						Math.min(10, width / 72) * 2
					).toString()}px; background-color: {legendScale(
						legend
					)}; border-color: {$selectedHeatmapColorTheme}"
					class="rounded-full border"
				/>
			{/each}
			<div class="text-sm">Most</div>
		</div>
	</div>
	<div class="w-full h-[400px] relative" bind:this={parentContainer}>
		{#if loading}
			<div class="h-full w-full flex items-center justify-center">
				<h3 class="text-3xl font-medium">Loading...</h3>
			</div>
		{:else if data.length === 0}
			<div class="h-full w-full flex items-center justify-center">
				<h3 class="text-3xl font-medium">No data found. Try changing the date range maybe?</h3>
			</div>
		{:else}
			<svg {width} {height} bind:this={svg} class="absolute">
				<g bind:this={gx} transform={`translate(0,${height - marginBottom})`} />
				<g bind:this={gy} transform={`translate(${marginLeft},0)`} />
				{#each sortedData as d, i}
					<circle
						cx={xAxis(d.hour.toString())}
						cy={yAxis(d.countryCode)}
						r={Math.min(10, width / 72).toString()}
						fill={colorScale(d.visitors).toString()}
						stroke={$selectedHeatmapColorTheme}
						class="cursor-help focus:outline-1 focus:ring-0"
						role="button"
						tabindex={i}
						on:mouseover={() => {
							handleMouseOverDatapoint(d);
						}}
						on:mouseleave={() => {
							handleMouseLeaveDatapoint();
						}}
						on:focus={() => {
							handleMouseOverDatapoint(d);
						}}
						on:blur={() => {
							handleMouseLeaveDatapoint();
						}}
					/>
				{/each}
			</svg>
			<div
				class="tooltip bg-slate-800 text-white p-2 rounded-md absolute translate-x-[-50%] translate-y-6 pointer-events-none opacity-0 z-10"
				bind:this={tooltip}
			>
				<p>
					{tooltipVisitors} unique visitors in {tooltipCountry} at {tooltipHour === 0
						? '12:00 AM'
						: tooltipHour < 12
							? tooltipHour.toString() + ':00 AM'
							: (tooltipHour - 12).toString() + ':00 PM'}
				</p>
			</div>
		{/if}
	</div>
	<div class="flex justify-end mt-4">
		<div class="flex gap-4 items-center">
			<p>Select color palette</p>
			{#each colors as color}
				<Button
					variant="outline"
					class="w-10 h-10 p-0 rounded-full transition-all"
					style="background-color: {color.code};"
					on:click={() => {
						handleColorPaletteChange(color.code);
					}}
				>
					<Check
						class="h-4 w-4 text-white {$selectedHeatmapColorTheme === color.code ? '' : 'hidden'}"
					/>
				</Button>
			{/each}
		</div>
	</div>
</div>
