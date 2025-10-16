<script lang="ts">
	import {
		BookIcon,
		HouseIcon,
		PopcornIcon,
		SettingsIcon,
		SkullIcon,
		TvIcon,
		ClipboardPlusIcon,
		HospitalIcon,
		WebhookIcon
	} from '@lucide/svelte';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';

	let { children } = $props();

	const linksSidebar = {
		reports: [
			{ label: 'Patient experience survey', href: '/reports/pes', icon: ClipboardPlusIcon },
			{ label: 'Visitations', href: '/reports/visitations', icon: HospitalIcon },
			{ label: 'Omnisol events', href: '/reports/omnisol', icon: WebhookIcon }
		]
	};

	let anchorSidebar = 'btn hover:preset-tonal justify-start px-2 w-full';
</script>

<div class="grid h-[728px] w-full grid-cols-[auto_1fr] items-stretch border border-surface-200-800">
	<!-- --- -->
	<Navigation layout="sidebar" class="grid grid-rows-[auto_1fr_auto] gap-4">
		<Navigation.Header>
			<a href="https://www.skeleton.dev" class="btn-icon btn-icon-lg preset-filled-primary-500">
				<SkullIcon class="size-6" />
			</a>
			<span>ER24</span>
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
							<a href={link.href} class={anchorSidebar} title={link.label} aria-label={link.label}>
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
	<!-- --- -->
	<div class="p-4">
		{@render children?.()}
	</div>
</div>
