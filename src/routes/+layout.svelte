<script>
	import '../app.css';
	import { ModeWatcher } from 'mode-watcher';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<ModeWatcher />
<div class="min-h-screen flex flex-col">
	<Navbar />
	<slot />
	<Footer />
</div>
