<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	let { children } = $props();
</script>

<header class="sticky">
	<AppBar class="backdrop-blur">
		<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
			<AppBar.Lead>
				<a href="/reports/omnisol" class="btn preset-tonal">All</a>
			</AppBar.Lead>
		</AppBar.Toolbar>
	</AppBar>
</header>

<div class="py-4">
	{@render children?.()}
</div>
