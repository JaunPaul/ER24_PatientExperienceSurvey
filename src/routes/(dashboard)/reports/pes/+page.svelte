<script lang="ts">
	import LineChart from '$lib/components/LineChart.svelte';
	import type { DailySeriesRow } from '$lib/server/services/omnisol-surveys-sent.service';
	import type { PageProps } from './$types';
	let { data }: PageProps = $props();
	$inspect(data);
</script>

<h1 class="h2">Patient Experience Survey Summary</h1>

{#snippet summaryCard(card: { label: string; value: string; detail?: string })}
	<div
		class="block max-w-md divide-y divide-surface-200-800 overflow-hidden card border-[1px] border-surface-200-800 preset-filled-surface-100-900 card-hover"
	>
		<article class="space-y-4 p-4">
			<div>
				<h2 class="h6">{card.label}</h2>
				<h3 class="h2">{card.value}</h3>
			</div>
			{#if card.detail}
				<p class="opacity-60">
					{card.detail}
				</p>
			{/if}
		</article>
	</div>
{/snippet}
<div class="mt-4 grid grid-cols-3 gap-3">
	{#each data.vm.kpis.sections.methods as card}
		<div class="col-span-1 row-span-2 grid">
			{@render summaryCard(card)}
		</div>
	{/each}
	{#each data.vm.kpis.sections.volume as card}
		<div class="col-span-1 row-span-1">
			{@render summaryCard(card)}
		</div>
	{/each}

	{#each data.vm.kpis.sections.timing as card}
		<div class="col-span-1 row-span-1">
			{@render summaryCard(card)}
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
