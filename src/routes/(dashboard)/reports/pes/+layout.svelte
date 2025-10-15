<script lang="ts">
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	let { children } = $props();
</script>

<header class="sticky">
	<AppBar>
		<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
			<AppBar.Lead>
				<a href="/reports/pes/facility" class="btn preset-tonal">Facility</a>
				<a href="/reports/pes/medical-care" class="btn preset-tonal">Medical care</a>
				<a href="/reports/pes/staff" class="btn preset-tonal">Staff experience</a>
			</AppBar.Lead>
		</AppBar.Toolbar>
	</AppBar>
</header>

<div class="p-4">
	{@render children?.()}
</div>
