<script lang="ts">
	import { navigating } from '$app/state';
	import '../app.css';

	let { children } = $props();
</script>

{#if navigating.to}
	<div
		class="absolute z-50 flex h-screen w-full items-center justify-center bg-stone-900/75 text-white"
	>
		<p>Loading...</p>
	</div>
{/if}
{@render children()}
