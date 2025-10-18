<script lang="ts">
	import DateRangeSelect from '$lib/components/DateRangeSelect.svelte';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
	let { children } = $props();
</script>

<header class="sticky top-0 z-20">
	<AppBar class="bg-surface-50-950/80 backdrop-blur">
		<AppBar.Toolbar class="md:grid-cols-[auto_1fr_auto]">
			<AppBar.Lead class="space-y-2">
				<a href="/reports/visitations" class="btn preset-tonal text-xs md:text-sm">Visitations</a>
				<a href="/reports/visitations/payments" class="btn preset-tonal text-xs md:text-sm"
					>Payments</a
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
	<div class="space-y-3 card preset-filled-surface-100-900 p-4">
		<h3 class="h5">Visitations &amp; Payments</h3>
		<div class="prose max-w-none text-sm opacity-80">
			<p>
				Omnisol sends patient data on discharge and Medical Aid payment information later. The
				current webhook pattern is problematic:
			</p>
			<ul class="list-disc space-y-1 pl-5">
				<li>A <strong>$0 Medical Aid payment</strong> is sent at visitation time.</li>
				<li>The <strong>actual captured payment</strong> may arrive days or weeks later.</li>
			</ul>
			<p>
				Because of this delay and placeholder approach, it is <strong>not possible</strong> to compute
				accurate daily totals from webhook data alone. A better approach would be read APIs for on-demand
				reconciliation instead of interpreting push events.
			</p>
		</div>
	</div>
	<div class="mt-3 card border border-surface-300-700 preset-tonal p-4">
		<div class="flex items-start gap-3">
			<div class="mt-1 size-3 rounded-full bg-warning-500" aria-hidden="true"></div>
			<div class="space-y-1 text-sm">
				<p class="font-medium">Data shown ≠ full operational reality.</p>
				<p class="opacity-80">
					Webhook-only data means missing discharges are invisible, many fields are absent
					(diagnosis, doctor), and payment states remain <em>Pending</em>. For an accurate
					operational view, implement read APIs from Omnisol to this dashboard.
				</p>
			</div>
		</div>
	</div>
	<div class="py-4">
		{@render children?.()}
	</div>
</div>
