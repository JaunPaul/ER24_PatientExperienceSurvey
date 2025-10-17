<script lang="ts">
	import BarChart from '$lib/components/BarChart.svelte';
	import DognutChart from '$lib/components/DognutChart.svelte';
	import HorizontalBarChart from '$lib/components/HorizontalBarChart.svelte';
	import KpiCard from '$lib/components/KpiCard.svelte';
	import LineChart from '$lib/components/LineChart.svelte';
	import StackedBarChart from '$lib/components/StackedBarChart.svelte';

	let { data } = $props();
	$inspect(data);
</script>

<h1 class="h2">Visitations</h1>
<blockquote class="my-2 max-w-lg blockquote">
	The values here come from Omnisol events. They are triggered in two ways.
</blockquote>
<h1 class="mt-4 h3">KPIs</h1>
<div class="mt-2 grid gap-3 md:grid-cols-3">
	{#each data.vm.demographicsKpis as kpi}
		<KpiCard data={kpi}></KpiCard>
	{/each}
</div>

<h1 class="mt-4 h3">Demographics</h1>

<div class="mt-2 grid gap-3 md:grid-cols-3">
	<DognutChart
		title="Gender"
		chartLables={data.vm.visitations.demographics.gender.map((g) => g.key)}
		chartData={data.vm.visitations.demographics.gender.map((g) => g.count)}
		dataLabel="Count"
	></DognutChart>

	<DognutChart
		title="Patient category"
		chartLables={data.vm.visitations.demographics.categoryMix.map((b) => b.key)}
		chartData={data.vm.visitations.demographics.categoryMix.map((b) => b.count)}
		dataLabel="Count"
	></DognutChart>
	<BarChart
		title="Contactability"
		chartLables={['Email', 'Phone']}
		chartData={[
			data.vm.visitations.demographics.contactability.withEmail,
			data.vm.visitations.demographics.contactability.withPhone
		]}
		dataLabel="Count"
	></BarChart>

	<div class="col-span-2">
		<HorizontalBarChart
			title="Age groups"
			dataLabel="Volume"
			chartData={data.vm.visitations.demographics.ageBuckets.map((b) => b.count)}
			chartLables={data.vm.visitations.demographics.ageBuckets.map((b) => b.key)}
		></HorizontalBarChart>
	</div>
	<DognutChart
		title="Status"
		chartLables={data.vm.visitations.demographics.statusMix.map((b) => b.key)}
		chartData={data.vm.visitations.demographics.statusMix.map((b) => b.count)}
		dataLabel="Count"
	></DognutChart>
</div>

<h1 class="mt-4 h3">Trends</h1>
<div class="mt-2">
	<LineChart
		title="Visitations over time"
		dataLabel="Visitations"
		chartLables={data.vm.visitations.dailySeries.map((s) => s.day)}
		chartData={data.vm.visitations.dailySeries.map((s) => s.count)}
	></LineChart>
</div>
