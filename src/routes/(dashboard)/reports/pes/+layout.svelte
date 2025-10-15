<script lang="ts">
	import { CalendarIcon, CircleUserIcon, MenuIcon, SearchIcon } from '@lucide/svelte';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	let { children } = $props();
</script>

<AppBar>
	<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
		<AppBar.Lead>
			<a href="/reports/pes/facility" class="btn preset-tonal">Facility</a>
			<a href="/reports/pes/medical-care" class="btn preset-tonal">Medical care</a>
			<a href="/reports/pes/staff" class="btn preset-tonal">Staff experience</a>
		</AppBar.Lead>

		<AppBar.Trail>
			<button type="button" class="btn-icon hover:preset-tonal"
				><SearchIcon class="size-6" /></button
			>
			<button type="button" class="btn-icon hover:preset-tonal"
				><CalendarIcon class="size-6" /></button
			>
			<button type="button" class="btn-icon hover:preset-tonal"
				><CircleUserIcon class="size-6" /></button
			>
		</AppBar.Trail>
	</AppBar.Toolbar>
</AppBar>
<div class="p-4">
	{@render children?.()}
</div>
