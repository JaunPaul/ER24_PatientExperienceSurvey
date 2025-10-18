<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	let { children } = $props();
</script>

<header class="sticky top-0 z-20">
	<AppBar class="bg-surface-50-950/80 backdrop-blur">
		<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
			<AppBar.Lead>
				<a href="/reports/omnisol" class="btn preset-tonal text-xs md:text-sm">All</a>
			</AppBar.Lead>
		</AppBar.Toolbar>
	</AppBar>
</header>

<div class="py-4">
	<div class="space-y-2 card preset-filled-surface-100-900 p-4">
		<h3 class="h5">Omnisol Events Feed</h3>
		<p class="text-sm opacity-80">
			The events page lists the most recent <strong>20 webhook events</strong> for visitations and payments.
			Use it to diagnose why figures on other pages appear incomplete or out of sync.
		</p>
	</div>
	{@render children?.()}
</div>
