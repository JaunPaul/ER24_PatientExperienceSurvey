<script lang="ts">
	import { navigating } from '$app/state';
	import {
		HouseIcon,
		SettingsIcon,
		SkullIcon,
		ClipboardPlusIcon,
		HospitalIcon,
		WebhookIcon
	} from '@lucide/svelte';
	import { MediaQuery } from 'svelte/reactivity';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';

	let { children } = $props();

	const linksSidebar = {
		reports: [
			{ label: 'Surveys', href: '/reports/pes', icon: ClipboardPlusIcon },
			{ label: 'Visitations', href: '/reports/visitations', icon: HospitalIcon },
			{ label: 'Omnisol events', href: '/reports/omnisol', icon: WebhookIcon }
		]
	};

	let anchorSidebar = 'btn hover:preset-tonal justify-start px-2 w-full';
	let anchorBar = 'btn hover:preset-tonal flex-col items-center gap-1';
	const large = new MediaQuery('min-width: 500px');
</script>

{#if large.current}
	<div
		class="grid h-[728px] w-full grid-cols-[auto_1fr] items-stretch border border-surface-200-800"
	>
		<Navigation layout="sidebar" class="grid grid-rows-[auto_1fr_auto] gap-4">
			<Navigation.Header>
				<div class="flex items-center gap-3">
					<img src="/er24-logo.jpeg" alt="Logo" class="w-20 rounded-md" />
					<span class="font-medium">Emergency Rooms 24</span>
				</div>
			</Navigation.Header>
			<Navigation.Content>
				<Navigation.Group>
					<Navigation.Menu>
						<a href="/" class={anchorSidebar}>
							<HouseIcon class="size-4" />
							<span>Home</span>
						</a>
					</Navigation.Menu>
				</Navigation.Group>
				{#each Object.entries(linksSidebar) as [category, links]}
					<Navigation.Group>
						<Navigation.Label class="pl-2 capitalize">{category}</Navigation.Label>
						<Navigation.Menu>
							{#each links as link (link)}
								{@const Icon = link.icon}
								<a
									href={link.href}
									class={anchorSidebar}
									title={link.label}
									aria-label={link.label}
								>
									<Icon class="size-4" />
									<span>{link.label}</span>
								</a>
							{/each}
						</Navigation.Menu>
					</Navigation.Group>
				{/each}
			</Navigation.Content>
			<Navigation.Footer>
				<a href="/" class={anchorSidebar} title="Settings" aria-label="Settings">
					<SettingsIcon class="size-4" />
					<span>Settings</span>
				</a>
			</Navigation.Footer>
		</Navigation>
		<div class="relative p-4">
			{#if navigating.to}
				<div class="absolute z-10 flex h-screen w-full items-center justify-center bg-stone-900/75">
					<p>Loading...</p>
				</div>
			{/if}
			{@render children?.()}
		</div>
	</div>
{:else}
	<div class="grid grid-rows-[1fr_auto] border border-surface-200-800">
		<div class="relative p-4 pb-20">
			{#if navigating.to}
				<div class="absolute z-10 flex h-screen w-full items-center justify-center bg-stone-900/75">
					<p>Loading...</p>
				</div>
			{/if}
			{@render children?.()}
		</div>
		<Navigation layout="bar" class="fixed bottom-0 z-10 mt-auto w-screen">
			<Navigation.Content>
				<Navigation.Group>
					<Navigation.Menu class="grid grid-cols-4 gap-2">
						<a href="/" class={anchorBar}>
							<HouseIcon class="size-5" />
							<span class="text-[10px]">Home</span>
						</a>
						{#each Object.entries(linksSidebar) as [category, links]}
							{#each links as link (link)}
								{@const Icon = link.icon}
								<a href={link.href} class={anchorBar} title={link.label} aria-label={link.label}>
									<Icon class="size-5" />
									<span class="text-[10px]">{link.label}</span>
								</a>
							{/each}
						{/each}
					</Navigation.Menu>
				</Navigation.Group>
			</Navigation.Content>
		</Navigation>
	</div>
{/if}
