<script lang="ts">
	import Logo from './Logo.svelte';
	import ThemeSwitch from './ThemeSwitch.svelte';
</script>

<div class="border-b">
	<div class="container flex justify-between py-4">
		<a href="/" class="flex items-center">
			<div class="flex gap-4 items-center">
				<div class=""><Logo /></div>
				<h1 class="text-xl font-bold text-primary">Web Traffics</h1>
			</div>
		</a>
		<ThemeSwitch />
	</div>
</div>
