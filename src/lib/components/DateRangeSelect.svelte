<script lang="ts">
	import { goto } from '$app/navigation';

	type Option = {
		label: string;
		value: string;
	};
	type Props = {
		options: Option[];
	};

	let { options }: Props = $props();

	let selected: string | undefined = $state(undefined);

	$effect(() => {
		goto(`?filter=${selected}`, { replaceState: true });
	});
</script>

<form method="GET" class="ml-auto w-full max-w-xs space-y-4">
	<!-- Default -->
	<select bind:value={selected} class="select">
		{#each options as { value, label }}
			<option {value}>{label}</option>
		{/each}
	</select>
</form>
