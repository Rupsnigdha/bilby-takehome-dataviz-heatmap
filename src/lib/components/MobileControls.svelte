<script lang="ts">
	import DateRangeDropdown from './TableControls/DateRangeDropdown.svelte';
    
	import * as Sheet from '$lib/shadcn/ui/sheet';
	import { Button } from '$lib/shadcn/ui/button/index.js';

    import Settings from 'lucide-svelte/icons/settings';
</script>

<Sheet.Root >
	<Sheet.Trigger asChild let:builder>
		<Button variant="outline" builders={[builder]} size="icon" class="lg:hidden">
			<Settings class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all" />
		</Button>
	</Sheet.Trigger>
	<Sheet.Content class='flex flex-col gap-4 lg:hidden'>
        <h2 class="text-2xl font-bold mb-4">Settings</h2>
		<DateRangeDropdown />
	</Sheet.Content>
</Sheet.Root>
