<script lang="ts">
	import Chart from 'chart.js/auto';
	import { onMount } from 'svelte';

	type Props = {
		title: string;
		chartLables: string[];
		chartData: number[];
		dataLabel: string;
	};
	let { title, chartLables, chartData, dataLabel }: Props = $props();

	let canvas: HTMLCanvasElement | null = $state(null);
	let chart: Chart | null = null;

	onMount(() => {
		if (canvas) {
			chart = new Chart(canvas, {
				type: 'bar',
				data: [],
				options: {
					indexAxis: 'y'
				},
				plugins: {
					legend: {
						position: 'right'
					}
				}
			});
		}
	});

	$effect(() => {
		if (!chart) return;
		chart.data = {
			labels: chartLables,
			datasets: $state.snapshot([
				{
					label: dataLabel,
					data: chartData
				}
			])
		};
		chart.update();
	});
</script>

<div
	class="min-h-lg block divide-y divide-primary-200-800 overflow-hidden card border-[1px] preset-outlined-primary-500 border-primary-200-800 card-hover"
>
	<article class="space-y-4 p-4">
		<div>
			<h2 class="h6">{title}</h2>
		</div>
		<canvas bind:this={canvas} class="min-h-lg h-full w-full"></canvas>
	</article>
</div>
