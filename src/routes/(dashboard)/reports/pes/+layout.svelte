<script lang="ts">
	import DateRangeSelect from '$lib/components/DateRangeSelect.svelte';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	let { children } = $props();
</script>

<header class="sticky top-0 z-20">
	<AppBar class="bg-surface-50-950/70 backdrop-blur">
		<AppBar.Toolbar class="md:grid-cols-[auto_1fr_auto]">
			<AppBar.Lead class="space-y-2">
				<a href="/reports/pes" class="btn preset-filled-primary-500 text-xs md:text-sm">Summary</a>
				<a href="/reports/pes/facility" class="btn preset-filled-primary-500 text-xs md:text-sm"
					>Facility</a
				>
				<a href="/reports/pes/medical-care" class="btn preset-filled-primary-500 text-xs md:text-sm"
					>Medical care</a
				>
				<a href="/reports/pes/staff" class="btn preset-filled-primary-500 text-xs md:text-sm"
					>Staff experience</a
				>
				<a href="/reports/pes/comments" class="btn preset-filled-primary-500 text-xs md:text-sm"
					>Comments</a
				>
			</AppBar.Lead>
			<AppBar.Trail>
				<DateRangeSelect
					options={[
						{ value: 'today', label: 'Today' },
						{ value: 'last_7', label: 'Last 7 days' },
						{ value: 'last_30', label: 'Last 30 days' },
						{ value: 'this_q', label: 'This quarter' },
						{ value: 'this_y', label: 'This year' }
					]}
				></DateRangeSelect>
			</AppBar.Trail>
		</AppBar.Toolbar>
	</AppBar>
</header>

<div class="py-4">
	{@render children?.()}
</div>
