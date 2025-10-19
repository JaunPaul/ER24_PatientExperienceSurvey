<script lang="ts">
	import { navigating } from '$app/state';

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
	class="block divide-y divide-primary-200-800 overflow-hidden card border-[1px] border-primary-200-800 {data.variant ===
	'ghost'
		? 'rounded-none preset-filled-primary-900-100'
		: 'preset-outlined-primary-50-950'} card-hover"
>
	<article class="space-y-4 p-4">
		<div>
			<h2 class="h6 font-normal">{data.label}</h2>
			<h3 class="h2 {data.variant === 'ghost' ? '' : 'text-primary-500'}">{data.value}</h3>
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
