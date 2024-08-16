<script lang="ts">
	import * as DropdownMenu from '$lib/shadcn/ui/dropdown-menu/index.js';
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import { Button } from '$lib/shadcn/ui/button/index.js';

	import { dateRangeStore } from '$lib/stores';
	import { dateRanges } from '$lib/config/';

	let isDropdownOpen = false;
</script>

<DropdownMenu.Root
	onOpenChange={() => {
		isDropdownOpen = !isDropdownOpen;
	}}
>
	<DropdownMenu.Trigger asChild let:builder>
		<Button variant="outline" builders={[builder]} class="w-full lg:w-64 justify-between">
			<div class="capitalize">
				{dateRanges.find((dateRange) => dateRange.value === $dateRangeStore)?.label}
			</div>
			<ChevronDown
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all opacity-50 {isDropdownOpen
					? 'rotate-180'
					: ''}"
			/>
		</Button>
	</DropdownMenu.Trigger>
	<DropdownMenu.Content class="w-[335px] lg:w-64">
		<DropdownMenu.Label>Select a date range</DropdownMenu.Label>
		<DropdownMenu.Separator />
		<DropdownMenu.RadioGroup bind:value={$dateRangeStore}>
			{#each dateRanges as dateRange}
				<DropdownMenu.RadioItem value={dateRange.value}>{dateRange.label}</DropdownMenu.RadioItem>
			{/each}
		</DropdownMenu.RadioGroup>
	</DropdownMenu.Content>
</DropdownMenu.Root>
