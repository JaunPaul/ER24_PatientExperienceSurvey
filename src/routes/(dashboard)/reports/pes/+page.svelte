<script lang="ts">
	import KpiCard from '$lib/components/KpiCard.svelte';
	import LineChart from '$lib/components/LineChart.svelte';
	import type { DailySeriesRow } from '$lib/server/services/omnisol-surveys-sent.service';

	let { data } = $props();
</script>

<h1 class="h2">Patient Experience Survey Summary</h1>
<blockquote class="my-2 max-w-lg blockquote">
	Note that ER24 does not have a Meta account and therefore is not sending Whatsapp survey requests.
	Email requests will only go to patients with emails on record.
</blockquote>

<div class="mt-4 grid gap-3 md:grid-cols-3">
	{#each data.vm.kpis.sections.methods as card}
		<div class="grid md:col-span-1 md:row-span-2">
			<KpiCard data={card}></KpiCard>
		</div>
	{/each}
	{#each data.vm.kpis.sections.volume as card}
		<div class="col-span-1 row-span-1">
			<KpiCard data={card}></KpiCard>
		</div>
	{/each}

	{#each data.vm.kpis.sections.timing as card}
		<div class="col-span-1 row-span-1">
			<KpiCard data={card}></KpiCard>
		</div>
	{/each}
</div>

<div class="mt-3 grid">
	<LineChart
		title="Surveys sent {data.vm.summary.range.label}"
		chartLables={data.vm.series.map((s: DailySeriesRow) => s.day)}
		chartData={data.vm.series.map((s: DailySeriesRow) => s.count)}
		dataLabel="Volume"
	></LineChart>
</div>
