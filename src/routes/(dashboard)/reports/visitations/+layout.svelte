<script lang="ts">
	import DateRangeSelect from '$lib/components/DateRangeSelect.svelte';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	let { children } = $props();
</script>

<header class="sticky">
	<AppBar class="backdrop-blur">
		<AppBar.Toolbar class="md:grid-cols-[auto_1fr_auto]">
			<AppBar.Lead class="space-y-2">
				<a href="/reports/visitations" class="btn preset-tonal">Visitations</a>
				<a href="/reports/visitations/payments" class="btn preset-tonal">Payments</a>
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
