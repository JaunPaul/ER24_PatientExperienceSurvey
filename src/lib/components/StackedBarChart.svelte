<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	type Props = {
		title: string;
		chartLables: string[];
		chartData: { data: number[]; label: string }[];
	};
	let { title, chartLables, chartData }: Props = $props();

	let canvas: HTMLCanvasElement | null = $state(null);
	let chart: Chart | null = null;

	onMount(() => {
		if (canvas) {
			chart = new Chart(canvas, {
				type: 'bar',
				data: []
			});
		}
	});

	$effect(() => {
		if (!chart) return;
		chart.data = {
			labels: chartLables,
			datasets: $state.snapshot([...chartData])
		};
		chart.update();
	});
</script>

<div
	class="block divide-y divide-surface-200-800 overflow-hidden card border-[1px] preset-outlined-surface-500 border-surface-200-800 text-surface-950-50 card-hover"
>
	<article class="space-y-4 p-4">
		<div>
			<h2 class="h6 font-normal">{title}</h2>
		</div>
		<canvas bind:this={canvas} class="min-h-md h-full w-full"></canvas>
	</article>
</div>
