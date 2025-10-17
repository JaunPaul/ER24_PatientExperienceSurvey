<script lang="ts">
	type Card = {
		label: string;
		value: string;
		detail?: string;
		variant?: 'default' | 'ghost';
	};

	type Props = {
		data: Card;
		children?: any;
	};

	let { data, children }: Props = $props();
</script>

<div
	class="block divide-y divide-surface-200-800 overflow-hidden card border-[1px] border-surface-200-800 {data.variant ===
	'ghost'
		? 'preset-tonal'
		: 'preset-filled-surface-100-900'} card-hover"
>
	<article class="space-y-4 p-4">
		<div>
			<h2 class="h6">{data.label}</h2>
			<h3 class="h2">{data.value}</h3>
		</div>
		{#if data.detail}
			<p class="opacity-60">
				{data.detail}
			</p>
		{/if}
	</article>

	{#if children}
		<footer>
			{@render children?.()}
		</footer>
	{/if}
</div>
