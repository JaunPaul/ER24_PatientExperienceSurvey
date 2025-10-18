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

<div class="space-y-3 card preset-filled-surface-100-900 p-4">
	<div class="items-center justify-between gap-3 md:flex">
		<h3 class="h5">Patient Experience Surveys</h3>
		<div class="flex gap-2">
			<span class="chip preset-tonal">Email</span>
			<span class="chip preset-tonal">WhatsApp (disabled)</span>
		</div>
	</div>
	<div class="prose text-sm opacity-80">
		<p>
			Between <strong>April 2025</strong> and <strong>October 2025</strong>, patients saw only three
			rating questions: overall experience, medical care, and staff interaction. Additional
			conditional questions appeared only when a rating was below <strong>3/5</strong>.
		</p>
		<p>
			As a result, period averages often include only topline ratings, with little detail by
			department or topic when average scores were high (e.g., 4/5). Starting <strong
				>mid‑October 2025</strong
			>, the survey will always include <strong>20+ questions</strong> to produce richer operational
			insights regardless of the top-level rating.
		</p>
	</div>
</div>

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
