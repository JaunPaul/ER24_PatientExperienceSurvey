<script lang="ts">
	import KpiCard from '$lib/components/KpiCard.svelte';
	import StackedBarChart from '$lib/components/StackedBarChart.svelte';

	let { data } = $props();

	$inspect(data);
</script>

<div class="space-y-10 text-surface-950-50">
	<div>
		<h1 class="h2">Payments</h1>
		<blockquote class="my-2 max-w-lg blockquote">
			The values here come from Omnisol events. They are triggered in two ways.
		</blockquote>
	</div>
	<div>
		<div class="mt-4 grid gap-3 md:grid-cols-3">
			{#each data.vm.kpis as card}
				<div class="col-span-1 row-span-2 grid">
					<KpiCard data={card}></KpiCard>
				</div>
			{/each}
		</div>

		<div class="mt-4 grid gap-3 md:grid-cols-2">
			{#each data.vm.groupedMethods as method}
				<KpiCard
					data={{
						label: method.method,
						value: String(method.total),
						detail: `${String(method.count)} payments`
					}}
				>
					<div class="grid grid-cols-2">
						{#each method.currencies as curr}
							<KpiCard
								data={{
									label: curr.currency,
									value: String(curr.total),
									detail: `${String(curr.count)} payments`,
									variant: 'ghost'
								}}
							></KpiCard>
						{/each}
					</div>
				</KpiCard>
			{/each}
		</div>
	</div>
	<div class="mt-4">
		<StackedBarChart
			title="USD vs ZWG payments {data.vm.payments.summary.range.label}"
			chartLables={data.vm.stackedSeries.labels}
			chartData={data.vm.stackedSeries.series.map((s) => {
				return { data: s.data, label: s.name };
			})}
		></StackedBarChart>
	</div>
</div>
