<SYSTEM>This is the developer documentation for Skeleton, an adaptive design system powered by Tailwind CSS, featuring Svelte specific examples.</SYSTEM>

# Introduction

Skeleton integrates with Tailwind to provide an opinionated solution for generating adaptive design systems. Including easy to use components for your favorite web frameworks.

## Our Philosophy

Skeleton provides a uniform design language and structured framework for controlling the look and feel of your product and user experience. It serves as an opinionated design system that aims to greatly reduce the amount of time spent managing design elements and patterns, allowing you to more quickly build and manage your frontend interfaces at scale.

## Additional Benefits

---

## Get Started

### Using Skeleton

Ready to get started? Check out our comprehensive [installation guides](/docs/get-started/installation) and begin [learning the fundamentals](/docs/get-started/fundamentals).

### Contributing

Please refer to our dedicated [Contribution Guidelines](/docs/resources/contribute) if you wish to contribute directly.

# Next.js

Install and configure Skeleton for Next.js.

## Requirements

\| Tooling | Minimum Supported |
\| ------------------------------------ | ----------------- |
\| [Next.js](https://nextjs.org/) | 15 |
\| [React](https://react.dev/) | 18 |
\| [Tailwind](https://tailwindcss.com/) | 4 |

## Installation

# Installation

Learn how to install and setup Skeleton for your project.

## Mixing UI Libraries

Skeleton's design system is perfect for complementing headless component libraries, such as [Bits UI](/docs/headless/bits-ui), [Melt UI](/docs/headless/melt-ui), [Radix](/docs/headless/radix-ui), and [Zag.js](https://zagjs.com/). As well as "Tailwind component" libraries such as the [Tailwind Plus](https://tailwindcss.com/plus). Supporting any component system that supports Tailwind, but very specifically allows you to insert or substitute Skeleton-provided utility classes.

### Unsupported Libraries

Unfortunately, Skeleton cannot integrate with [Flowbite React](https://flowbite-react.com/), [Flowbite Svelte](https://flowbite-svelte.com/), or [Daisy UI](https://daisyui.com/) at this time. Similar to Skeleton, these libraries make changes to Tailwind that directly overlaps with many of our core features, including class names and color values.

# SvelteKit

Install and configure Skeleton for SvelteKit.

## Requirements

\| Tooling | Minimum Supported |
\| ------------------------------------ | ----------------- |
\| [SvelteKit](https://svelte.dev/) | 2 |
\| [Svelte](https://svelte.dev/) | 5 |
\| [Tailwind](https://tailwindcss.com/) | 4 |

## Installation

# Fundamentals

An introduction to the core concepts of Skeleton.

---

## Design System

### Figma UI Kit

A fully featured [Figma UI Kit](/figma) is available to designers, allowing them to quickly draft visual concept of your project.

### Iconography

Skeleton is icon agnostic, meaning you may bring your own iconography solution. However, we highly recommend [Lucide](https://lucide.dev/) and utilize it for all examples in our documentation. Refer to our integration guides for [React](/docs/integrations/iconography/react) and [Svelte](/docs/integrations/iconography/svelte).

### Core Features

The following features fall under the umbrella of our design system. Provided via the Skeleton core.

---

## Tailwind Components

Tailwind components that act as primitives for creating complex interfaces. Provided via the Skeleton core.

---

## Functional Components

Skeleton also offers optional component packages for select component frameworks. Each component automatically adapts to Skeleton's design system. While still allowing a high level of customization.

\| Framework | NPM Package | Description |
\| --------- | ------------------------------- | ------------------------------- |
\| React | `@skeletonlabs/skeleton-react` | Contains all React components. |
\| Svelte | `@skeletonlabs/skeleton-svelte` | Contains all Svelte components. |

### Powered by Zag.js

Skeleton's components are built on **Zag.js**, which provides a collection of framework-agnostic UI component patterns to manage logic and state. Zag is actively maintained by industry veterans, such as [Segun Adebayo](https://github.com/segunadebayo) - the creator and core maintainer for [Chakra UI](https://www.chakra-ui.com/), [Ark UI](https://ark-ui.com/), and [PandaCSS](https://panda-css.com/).

### Importing Components

You may import components per each Skeleton framework as follows.

```ts
import { Avatar } from '@skeletonlabs/skeleton-{react|svelte}';
```

This also includes access to the component prop types.

```ts
import type { AvatarRootProps, ... } from '@skeletonlabs/skeleton-{react|svelte}';
```

### Composed Pattern

Skeleton components are granular. This offers direct access to all children within the tree, similar to working with raw HTML. This allows passing in arbitrary props and attributes directly to the the template within. Including: `required`, `data-*`, `style`, `class`, and more.

```svelte
<Avatar>
	<Avatar.Image src="https://i.pravatar.cc/150?img=48" />
	<Avatar.Fallback>SK</Avatar.Fallback>
</Avatar>
```

### Styling Components

Skeleton components implement a universal convention for accepting CSS utility classes via the `class` attribute. Use this to pass any CSS utility class.

```svelte
<Avatar class="rounded-2xl">
	<Avatar.Image src="https://i.pravatar.cc/150?img=48" class="greyscale" />
	<Avatar.Fallback>SK</Avatar.Fallback>
</Avatar>
```

By default, all internal styles are auto-prefixed to ensure they are assigned to the `@base` layer in the Tailwind bundle. This ensures any classes you pass through the `class` attribute are automatically given precedence. No mental overhead, it just works.

```css
@custom-variant skb {
	@layer base {
		@slot;
	}
}
```

### Extensible Markup

Skeleton components provide a mechanism for overwriting the internal HTML with custom markup. Use the `element` prop in React, and the `element` snippet in Svelte to obtain the internal `attributes`. Then spread these to your custom elements. Note that this is an optional and advanced feature aimed at power users, and show not be needed for normal usage.

**React:**

```tsx
export default function () {
	return (
		<Accordion>
			{/* ... */}
			<Accordion.Item value="item-1">
				<h3>
					<Accordion.ItemTrigger
						element={(attributes) => <button {...attributes}>My Own Button</button>}
					/>
				</h3>
				<Accordion.ItemContent>Content for Item 1</Accordion.ItemContent>
			</Accordion.Item>
			{/* ... */}
		</Accordion>
	);
}
```

**Svelte:**

```svelte
<Accordion>
	<!-- ... -->
	<Accordion.Item value="item-1">
		<h3>
			<Accordion.ItemTrigger>
				{#snippet element({ attributes })}
					<button {...attributes}>My Own Button</button>
				{/snippet}
			</Accordion.ItemTrigger>
		</h3>
		<Accordion.ItemContent>Content for Item 1</Accordion.ItemContent>
	</Accordion.Item>
	<!-- ... -->
</Accordion>
```

### Custom Animations

However, using the extensible markup pattern, you may implement custom animations. While we showcase this below with [Svelte Transitions](https://svelte.dev/docs/svelte/transition), but you could also use framework agnostic solutions such as [Motion](https://motion.dev/), [Anime.js](https://animejs.com/), or [Animate.css](https://animate.style/).

```ts
import { slide } from 'svelte/transition';
```

```svelte
<Accordion>
	<!-- ... -->
	<Accordion.Item value="item-1">
		<h3>
			<Accordion.ItemTrigger>Item 1</Accordion.ItemTrigger>
		</h3>
		<Accordion.ItemContent>
			{#snippet element(attributes)}
				{#if !attributes.hidden}
					<div {...attributes} hidden={false} transition:slide>Content 1</div>
				{/if}
			{/snippet}
		</Accordion.ItemContent>
	</Accordion.Item>
	<!-- ... -->
</Accordion>
```

1. Implement the `element` snippet to gain access to the `attributes`.
2. Spread the `attributes` to the custom element, a `<div>` in this example.
3. Override the `hidden` attribute to `false` to prevent it from showing/hiding the element too soon.
4. Add the `transition:slide` and configure your preferred options.
5. Then implement the wrapping `#if` block that triggers transitions when `attribute.hidden` is toggled.

### Provider Pattern

Most Skeleton components also support the Provider Pattern. This utilizes a provider component that replaces the root and provides access to the inner component APIs. In practice, this allows direct access to Zag.js API features, such as programmatic control for overlay components, the ability to clear input components, and more.

```svelte
<script lang="ts">
	import { Portal, Tooltip, useTooltip } from '@skeletonlabs/skeleton-svelte';

	const id = $props.id();
	const tooltip = useTooltip({ id });
</script>

<!-- External trigger using the Zag.js `open` state and `setOpen()` method -->
<button type="button" onclick={() => tooltip().setOpen(!tooltip().open)}>Trigger</button>

<!-- Tooltip provider and reference value -->
<Tooltip.Provider value={tooltip}>
	<Tooltip.Trigger>Anchor</Tooltip.Trigger>
	<Portal>
		<Tooltip.Positioner>
			<Tooltip.Content>Content</Tooltip.Content>
		</Tooltip.Positioner>
	</Portal>
</Tooltip.Provider>
```

### Learn More

For a comprehensive guide to how Skeleton implements components, refer to our [contribution guidelines](/docs/resources/contribute/components).

# Vite + React

Install and configure Skeleton for Vite + React.

## Requirements

\| Tooling | Minimum Supported |
\| ------------------------------------ | ----------------- |
\| [Vite](https://vite.dev/) | 6 |
\| [React](https://react.dev/) | 18 |
\| [Tailwind](https://tailwindcss.com/) | 4 |

## Installation

# Core API

Learn about the specific features Skeleton introduces to Tailwind.

---

## @base

Extends Tailwind's base layer with a set of opinionated global styles.

- Sets the root color scheme to match Dark Mode settings.
- Updates scrollbars to utilize theme colors.
- Updates global text selection to utilize theme colors.
- Defines the `<body>` background colors and base font styles.
- Implements global default styles for disabled states, such as buttons.

## @theme

Uses Tailwind's `@theme` to implement a variety of new properties and utility classes.

### Colors

Extends colors to include the [Skeleton color palette](/docs/design/colors).

\| Class | Theme Property |
\| ------------------------------------- | ------------------------------------ |
\| `[property]-[color]-[shade]` | {`--`}color-\[color]-\[shade] |
\| `[property]-[color]-contrast-[shade]` | {`--`}color-\[color]-contrast-\[shade] |
\| `body-background-color` | {`--`}body-background-color |
\| `body-background-color-dark` | {`--`}body-background-color-dark |

### Color Pairings

Extends colors to implement [Color Pairing](/docs/design/colors#color-pairings), which balance colors between light and dark mode.

\| Class | Theme Property |
\| ------------------------------------ | ----------------------------------- |
\| `[property]-[color]-[shade]-[shade]` | {`--`}color-\[color]-\[shade]-\[shade] |

### Spacing

Integrates Tailwind's [spacing property](https://tailwindcss.com/docs/functions-and-directives#spacing-function) to modify [dynamic scaling](/docs/design/spacing) for various utility classes.

\| Class | Theme Property |
\| --------- | -------------- |
\| (various) | {`--`}spacing |

### Typography

Introduces a [typographic scale](https://designcode.io/typographic-scales) to all Tailwind [font sizes](https://tailwindcss.com/docs/font-size) using the following formula.

```plaintext
--text-{size}: calc({remSize} * var(--text-scaling));
--text-{size}--line-height: calc(calc(1 / {remSize}) * var(--text-scaling));
```

#### Base

Controls the style of the global page text.

\| Class | Theme Property |
\| ---------------------- | -------------------------- |
\| `base-font-color` | {`--`}base-font-color |
\| `base-font-color-dark` | {`--`}base-font-color-dark |
\| `base-font-family` | {`--`}base-font-family |
\| `base-font-size` | {`--`}base-font-size |
\| `base-line-height` | {`--`}base-line-height |
\| `base-font-weight` | {`--`}base-font-weight |
\| `base-font-style` | {`--`}base-font-style |
\| `base-letter-spacing` | {`--`}base-letter-spacing |

#### Heading

Controls the style of the heading text.

\| Class | Theme Property |
\| ------------------------- | ----------------------------- |
\| `heading-font-color` | {`--`}heading-font-color |
\| `heading-font-color-dark` | {`--`}heading-font-color-dark |
\| `heading-font-family` | {`--`}heading-font-family |
\| `heading-font-size` | {`--`}heading-font-size |
\| `heading-line-height` | {`--`}heading-line-height |
\| `heading-font-weight` | {`--`}heading-font-weight |
\| `heading-font-style` | {`--`}heading-font-style |
\| `heading-letter-spacing` | {`--`}heading-letter-spacing |

#### Anchor

Controls the style of anchor links.

\| Class | Theme Property |
\| ------------------------------- | ----------------------------------- |
\| `anchor-font-color` | {`--`}anchor-font-color |
\| `anchor-font-color-dark` | {`--`}anchor-font-color-dark |
\| `anchor-font-family` | {`--`}anchor-font-family |
\| `anchor-font-size` | {`--`}anchor-font-size |
\| `anchor-line-height` | {`--`}anchor-line-height |
\| `anchor-font-weight` | {`--`}anchor-font-weight |
\| `anchor-font-style` | {`--`}anchor-font-style |
\| `anchor-letter-spacing` | {`--`}anchor-letter-spacing |
\| `anchor-text-decoration` | {`--`}anchor-text-decoration |
\| `anchor-text-decoration-active` | {`--`}anchor-text-decoration-active |
\| `anchor-text-decoration-focus` | {`--`}anchor-text-decoration-focus |
\| `anchor-text-decoration-hover` | {`--`}anchor-text-decoration-hover |

### Radius

Extends Tailwind's radius properties with theme-specific sizes.

\| Class | Theme Property |
\| ------------------- | ---------------------- |
\| `rounded-base` | {`--`}radius-base |
\| `rounded-container` | {`--`}radius-container |

### Edges

Sets the default width for border, divide, and ring width to match the active theme properties.

\| Class | Theme Property |
\| -------- | -------------------------- |
\| `border` | {`--`}default-border-width |
\| `ring` | {`--`}default-ring-width |
\| `divide` | {`--`}default-divide-width |

## @utility

### Tailwind Components

Allow you to style semantic HTML elements with utility classes.

## @variant

### Themes

Enables you to target and style elements for a particular theme.

```html
<div class="bg-green-500 theme-cerberus:bg-red-500">...</div>
<div class="bg-green-500 theme-mona:bg-red-500">...</div>
<div class="bg-green-500 theme-vox:bg-red-500">...</div>
```

## Optional

### Presets

Provides a canned set of styles for use with buttons, badges, cards, and more.

### Preset Themes

Provides a hand curated set of themes for Skeleton.

# Vite + Svelte

Install and configure Skeleton for Vite + Svelte.

## Requirements

\| Tooling | Minimum Supported |
\| ------------------------------------ | ----------------- |
\| [Vite](https://vite.dev/) | 6 |
\| [Svelte](https://svelte.dev/) | 5 |
\| [Tailwind](https://tailwindcss.com/) | 4 |

## Installation

# Astro

Install and configure Skeleton for Astro.

## Requirements

\| Tooling | Minimum Supported |
\| ------------------------------------ | ----------------- |
\| [Astro](https://vite.dev/) | 5 |
\| [React](https://react.dev/) | 18 |
\| [Svelte](https://svelte.dev/) | 5 |
\| [Tailwind](https://tailwindcss.com/) | 4 |

## Installation

Learn how to install the Skeleton core into your Astro project. We'll cover using components in the section below.

## Using Components in Astro

While Astro can support [multiple Frontend frameworks](https://docs.astro.build/en/guides/integrations-guide/), please be aware this comes with some notable restrictions:

- With the exception of this [experimental React flag](https://docs.astro.build/en/guides/integrations-guide/react/#children-parsing), components cannot utilize slotted content in `.astro` files.
- You will need to install additional packages for both Astro and Skeleton per your framework of choice.
- You may need a _wrapper_ component to use to utilize all component feature. We'll demo this below.

# Other Frameworks

Install Skeleton for other frameworks.

## Requirements

Skeleton's [Core Package](/docs/get-started/core-api) is framework agnostic, meaning many of the Design System and Tailwind-centric features can used on any number of frameworks. This includes everything _except_ components. In order to install Skeleton for additional framework, your app must be able to support the following:

\| Tooling | Minimum Supported |
\| ------------------------------------ | --------------------- |
\| Package Management | NPM, PNPM, Yarn, etc. |
\| [Tailwind](https://tailwindcss.com/) | 4 |

The exact instructions for installing Skeleton will differ per framework, however we've provided a general guidance below. Use this as a foundation for getting started in any number of unofficially supported frameworks.

## Installation

## Support

While we officially limit support for Skeleton to React, Svelte, and Astro for now, Skeleton has an active community of users on [GitHub](https://github.com/skeletonlabs/skeleton/discussions) and [Discord](https://discord.gg/EXqV7W8MtY). If you need support (directly related to Skeleton) considering reaching out in these spaces. Other members of the community may be able to assist you.

# Migrate from v2

Learn how to migrate from Skeleton v2 to the latest version.

## Introduction

Version 3 represents a major overhaul to Skeleton. This includes a ground up rewrite of quite literally every feature in the library. We have provided a migration CLI to help automate this process. However, some portions of this migration will still required manual intervention. This is not a trivial migration from prior versions, so please use caution when updating and ensure you follow this guide very carefully.

## Prerequisites

While Skeleton v3 introduces support for multiple frameworks, we’ve historically only supported SvelteKit. As such, this guide is only intended for users migrating from Skeleton v2 and SvelteKit. If you you are coming from another meta-framework, this will be outside the scope of this guide. However, this may still provide a valuable insight to the primary objectives for migration.

### Create a Migration Branch

We recommend you handle all migration changes on a dedicated feature branch. This ensures you can easily drop or revert changes if something goes wrong.

```shell
git checkout -b migration
```

### Prepare Your Skeleton App

Please make sure you have accounted for the following:

- Your app is running the latest release of Skeleton v2.x
- All critical dependencies have been updated (optional but recommended)
- Your app is in a functional state before you proceed

---

## Migrate Core Technologies

Skeleton is built on top of the following technologies. These must be migrated individually before proceeding with the Skeleton-specific migration. Note that Svelte and Tailwind provide dedicated CLIs to automate this process.

### Svelte v5

Migrate to the latest release of Svelte v5.

### SvelteKit v2

Migrate to the latest release of SvelteKit v2.

### Tailwind v4

Before migration to tailwind v4 using their upgrade guide some manual steps are required:

1. Remove the `skeleton` plugin from your `tailwind.config` file.
2. Rename your `app.postcss` or `app.pcss` to `app.css`.
3. Remove the `purgecss` (`vite-plugin-tailwind-purgecss`) vite plugin from your `vite.config` (if installed).

Migrate to the latest release of Tailwind v4.

> TIP: Having trouble running Tailwind's automated migration script due to `@apply`? Remove the classes temporarily, then follow [these steps](/docs/get-started/migrate-from-v2#replacing-apply) to adapt to native CSS custom properties and Tailwind's new utilities.

---

## Migrate to the Tailwind Vite Plugin

Use the following steps to migrate to from PostCSS to the Vite plugin:

1. Delete `postcss.config.mjs`
2. Run `npm uninstall postcss @tailwindcss/postcss`
3. Run `npm install @tailwindcss/vite`
4. Open your `vite.config` in the root of your project
5. Import the following at the top of the file: `import tailwindcss from '@tailwindcss/vite'`
6. Finally, add the Vite plugin ABOVE your specific framework plugin:

```ts
plugins: [
	tailwindcss(),
	sveltekit() // or svelte()
];
```

---

## Automated Migration

We’ve provided a dedicated migration script as part of the Skeleton CLI to help automate much of this process.

> TIP: Please ensure you've committed all pending changes before proceeding.

```console
npx skeleton migrate skeleton-3
```

What WILL be migrated...

- Update all required `package.json` dependencies
- Implement all required Skeleton imports in your global stylesheet `app.css`
- Modify `data-theme` in `app.html` if you’re using a Skeleton preset theme.
- Temporarily disable custom theme imports to allow for theme migration.
- Migrate all modified Skeleton utility classes (ex: `variant-*` to `preset-*`)
- Update all Skeleton imports throughout your entire project
- Renames all relevant Skeleton components
- Some Component imports will also be pruned as they are no longer supported. We’ll cover these features in detail below.

What will NOT be migrated...

- Component props will not be updated. Unfortunately there’s too many permutations.
- Most v2 Utility features will not be migrated (ex: popovers, code blocks, etc)

Make sure to consult your local Git Diff to compare what has been modified before progressing forward or committing these automated changes.

---

## Additional Migration

With automated migration complete, please follow the remaining manual migration steps.

### Migrate Themes

#### For Preset Themes

Your preset theme should be automatically migrated by the CLI, you're all set!

#### For Custom Themes

1. Use the [Import feature](https://themes.skeleton.dev/themes/import) provided by the new Theme Generator.
2. Drag and Drop your v2 theme into the file upload field.
3. Your theme will be automatically converted to the newest format.
4. Update and modify any theme settings in the live preview.
5. Make sure to set a valid theme name in the right-hand panel.
6. Tap the “Code” tab to preview your generated theme code.
7. Copy the theme code, then following our [custom theme instructions](/docs/design/themes#custom-themes).
8. Similar to preset themes, you will need to both register and set an active theme.

### Replace AppShell with Custom Layouts

Skeleton has sunset the ([troublesome](https://github.com/skeletonlabs/skeleton/issues/2383)) `<AppShell>` component in favor of user-defined custom layouts. We've provided a [Layouts](/docs/guides/layouts) guide for replicating common page structures using only semantic HTML and Tailwind - no Skeleton specific features needed!

### Migrating Components

> NOTE: if you're aiming to migrate to Skeleton v4, we recommend you skip this specific step and follow [the v4 migration guide instead](/docs/get-started/migrate-from-v3). Once complete, resume from the "Tailwind 4 Changes" section below, and continue through the remainder of this guide.

Components have undergone the biggest update in Skeleton v3. Given the sheer number of changes, we recommend you compare each component to it's equivalent v3 documentation. We’ve highlighted a few of the key changes below:

- Changes to adopt the new [Svelte 5 APIs](https://svelte.dev/docs/svelte/v5-migration-guide) like runes, snippets, event handlers, etc.
- Changes to support [Zag.js](https://zagjs.com/), which serves as a foundation of our cross-framework components.
- Changes to the import path: `@skeletonlabs/skeleton-svelte`.
- Changes to the component name and/or structure (including sub-components)
- Changes based on newly introduces features and properties.
- Changes to adopt the new [style prop conventions](/docs/get-started/fundamentals#style-props) and cross-framework standardization.

Here's an example of changes for a single component from v2 to the new equivalent:

```svelte
<!-- Skeleton v2 -->

<script lang="ts">
	import { RangeSlider } from '@skeletonlabs/skeleton';

	let value = 15;
</script>

<RangeSlider name="amount" bind:value ticked />
```

```svelte
<!-- Skeleton v3 -->

<script lang="ts">
	import { Slider } from '@skeletonlabs/skeleton-svelte';

	let value = $state([15]);
</script>

<Slider name="amount" {value} onValueChange={(e) => (value = e.value)} markers={[25, 50, 75]} />
```

We’ve denoted the most notable changes to each component in the table below:

\| Name | v2 | v3 | Notes |
\| ------------------ | ----------------------------------------------------------- | --------------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
\| `<AppRail>` | [Link](https://v2.skeleton.dev/components/app-rail) | [Link](/docs/components/navigation/svelte) | Renamed `<Navigation>` - greatly expanded features |
\| `<FileButton>` | [Link](https://v2.skeleton.dev/components/file-buttons) | [Link](/docs/components/file-upload/svelte) | Renamed `<FileUpload>` - merges `<FileDropzone>` features |
\| `<FileDropzone>` | [Link](https://v2.skeleton.dev/components/file-buttons) | [Link](/docs/components/file-upload/svelte) | Renamed `<FileUpload>` - merges `<FileButton>` features |
\| `<InputChip>` | [Link](https://v2.skeleton.dev/components/input-chips) | [Link](/docs/components/tags-input/svelte) | Renamed `<TagsInput>` |
\| `<Paginator>` | [Link](https://v2.skeleton.dev/components/paginators) | [Link](/docs/components/pagination/svelte) | Renamed `<Pagination>` |
\| `<ProgressBar>` | [Link](https://v2.skeleton.dev/components/progress-bars) | [Link](/docs/components/progress/svelte) | Renamed `<Progress>` |
\| `<ProgressRadial>` | [Link](https://v2.skeleton.dev/components/progress-radials) | [Link](/docs/components/progress-ring/svelte) | Renamed `<ProgressRing>` |
\| `<RadioGroup>` | [Link](https://v2.skeleton.dev/components/radio-groups) | [Link](/docs/components/segment/svelte) | Renamed `<Segment>` (aka Segmented Control) |
\| `<RangeSlider>` | [Link](https://v2.skeleton.dev/components/range-sliders) | [Link](/docs/components/slider/svelte) | Renamed `<Slider>` |
\| `<SlideToggle>` | [Link](https://v2.skeleton.dev/components/slide-toggles) | [Link](/docs/components/switch/svelte) | Renamed `<Switch>` |
\| `<TabGroup>` | [Link](https://v2.skeleton.dev/components/tabs) | [Link](/docs/components/tabs/svelte) | Renamed `<Tabs>` |
\| `<TreeView>` | [Link](https://v2.skeleton.dev/components/tree-views) | -- | Coming soon - [Track progress](https://github.com/skeletonlabs/skeleton/issues/2358#issuecomment-2313215789) |

### Tailwind v4 Changes

Taliwind v4 represents a major update for Tailwind. We've detailed the most notable features as they may relate to your Skeleton project. Please consult the [Tailwind v4 announcement](https://tailwindcss.com/blog/tailwindcss-v4) post for the full roster of changes.

- The `tailwing.config` has been removed in favor of [CSS-base configuration](https://tailwindcss.com/blog/tailwindcss-v4#css-first-configuration) in your global stylesheet.
- Make sure you’re using the newest strategies for supporting [Dark Mode](/docs/guides/mode).
- You are still required to implement the [Tailwind Forms Plugin](/docs/tailwind/forms#prerequisites) to use Skeleton form elements.
- The Skeleton `data-theme` attribute has moved from `<body>` to `<html>`
- Themes colors are now stored in the [oklch format](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl), but optionally support any format.

### Replacing @apply

We strongly encourage you take this opportunity to move away from any usage of `@apply`. Tailwind has long since advocated against heavy use of this, and Tailwind v4 introduces new directives and functions that make this much easier to avoid. Here's a trivial example:

```css
/* Before */

.foo {
	@apply bg-surface-50-950 p-4 text-surface-950 dark:text-surface-50;
}
```

```css
/* After */

.foo {
	background-color: var(--color-surface-50-950);
	color: var(--color-surface-950);
	padding: --spacing(4);
	@variant dark {
		color: var(--color-surface-50);
	}
}
```

- Usage of `@apply` may be found in your global stylesheet or component `<style>` blocks.
- Refer to the Skeleton [Core API](/docs/get-started/core-api) documentation for a full list of Skeleton's CSS custom properties.
- Refer to the Tailwind's [functions and directives](https://tailwindcss.com/docs/functions-and-directives) for information on how to utilize these new features.

### Replace Unsupported Features

Skeleton v3 represents a point of reflection on what features should remain as part of the core experience. As such, we've identified a number of features that fall outside of this scope. Don't fret though, we've gone out of our way to detail each feature and provide the best alternative available.

#### Svelte Actions

\| Name | v2 | Alternative | Notes |
\| ---------- | -------------------------------------------------- | ----------------------------------------- | ------------------------------ |
\| Clipboard | [Link](https://v2.skeleton.dev/actions/clipboard) | [Link](/docs/guides/cookbook/clipboard) | Provided via Cookbook guide |
\| SVG Filter | [Link](https://v2.skeleton.dev/actions/filters) | [Link](/docs/guides/cookbook/svg-filters) | Provided via Cookbook guide |
\| Focus Trap | [Link](https://v2.skeleton.dev/actions/focus-trap) | [Link](/docs/integrations/popover/svelte) | Provided via Integration guide |

> TIP: We also recommend [Runed](https://runed.dev/docs) for a similar approach to small composable features for Svelte 5.

#### Components

\| Name | v2 | Alternative | Notes |
\| ----------------- | --------------------------------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------- |
\| `<AppShell>` | [Link](https://v2.skeleton.dev/components/app-shell) | [Link](/docs/guides/layouts) | Replaced with custom layouts |
\| `<Autocomplete>` | [Link](https://v2.skeleton.dev/components/autocomplete) | [Link](/docs/integrations/popover/svelte#combobox) | Provided via Integration guide |
\| `<ConicGradient>` | [Link](https://v2.skeleton.dev/components/conic-gradients) | [Link](https://tailwindcss.com/docs/background-image#adding-a-radial-gradient) | Now built into Tailwind |
\| `<Lightswitch>` | [Link](https://v2.skeleton.dev/docs/dark-mode#custom-component) | [Link](/docs/guides/mode#lightswitch) | Removed in favor of custom components |
\| `<ListBox>` | [Link](https://v2.skeleton.dev/components/listboxes) | -- | Removed |
\| `<Stepper>` | [Link](https://v2.skeleton.dev/components/steppers) | [Link](/docs/guides/cookbook/stepper) | Provided via Cookbook guide |
\| `<Table>` | [Link](https://v2.skeleton.dev/components/tables) | [Link](/docs/tailwind/tables) | Removed in favor of a Tailwind component |

#### Utilities

\| Name | v2 | Alternative | Notes |
\| ----------------- | -------------------------------------------------------------- | ------------------------------------------------- | ------------------------------ |
\| Code Blocks | [Link](https://v2.skeleton.dev/utilities/codeblocks) | [Link](/docs/integrations/code-block/svelte) | Provided via Integration guide |
\| Drawers | [Link](https://v2.skeleton.dev/utilities/drawers) | [Link](/docs/integrations/popover/svelte#modal) | Provided via Integration guide |
\| Modals | [Link](https://v2.skeleton.dev/utilities/modals) | [Link](/docs/integrations/popover/svelte#modal) | Provided via Integration guide |
\| Popovers | [Link](https://v2.skeleton.dev/utilities/popovers) | [Link](/docs/integrations/popover/svelte#popover) | Provided via Integration guide |
\| Toasts | [Link](https://v2.skeleton.dev/utilities/toasts) | [Link](/docs/integrations/toasts/svelte) | Provided via Integration guide |
\| Table of Contents | [Link](https://v2.skeleton.dev/utilities/table-of-contents) | [Link](/docs/guides/cookbook/table-of-contents) | Provided via Cookbook guide |
\| Persisted Store | [Link](https://v2.skeleton.dev/utilities/local-storage-stores) | -- | Incompatible with Svelte 5 |

#### Popovers and Modals

Members of the both the Skeleton team and the Svelte community are actively building [Floating UI Svelte](https://floating-ui-svelte.vercel.app/). The long term goal is to use this as a best-in-class solution for: popovers, tooltips, modals, drawers, and more. Until then, we are providing a [select set of components](/docs/integrations/popover/svelte), powered by Zag.js, to help bridge the gap. These components will be supported for the full duration of Skeleton v3.x. However, they will be replaced with a dedicated guide ([similar to React](/docs/integrations/popover/react)) in the future. We ask that you please be patient during this transitory phase.

### Migration Complete

If you’ve completed all steps above in full, your application should once again be in a function state. Run your application's local dev server to confirm, and remember to merge all changes into your primary branch.

```shell
npm run dev
```

---

## Troubleshooting

If you’re receiving errors, they may indicate components or features that require additional manual migration on your part. Use each error to identify the location of the feature and make any required changes. Consult each component’s documentation for the most current usage examples and API reference. In many cases this may just involve adding/removing/renaming a prop.

## Reporting Issues

If you get stuck or need to report an issue with either Skeleton v3 or this migration guide, please reach out via either the Skeleton [GitHub](https://github.com/skeletonlabs/skeleton/) or [Discord](https://discord.gg/EXqV7W8MtY) support channels.

# Migrate from v3

Learn how to migrate from Skeleton v3 to the latest version.

Skeleton v4 introduces a top-to-bottom overhaul of the component APIs. The goal has been to stabilized the internal and external APIs of our component system and ensure we can continue to introduce new components and new component frameworks over time. It also aims to make Skeleton's components as simple and intuitive to use as possible for new users.

## Prerequisites

We recommend you handle all migration changes on a dedicated feature branch. This ensures you can easily drop and revert if anything goes wrong.

```console
git checkout -b migration
```

Make sure you've accounted for the following:

- Ensure both Skeleton packages (core and framework) are updated to the latest v3.x release.
- Update all critical dependencies in your app to their latest version (optional but recommended)
- Make sure your app has been tested and is in a functional state.

---

## Automated Migration

To begin, we will run a quick automated migration.

```console
npx skeleton migrate skeleton-4
```

This will handle the package and stylesheet updates in the next couple steps. If you opt for the CLI, feel free to skip down to the [Manual Migration](/docs/get-started/migrate-from-v3#manual-migration) steps below. Note the manual steps are required for all migrations.

### Update NPM Packages

For the Release Candidate, please update each Skeleton package to the early access `@next` version. Note that we will be updating these package frequently leading up to the full release.

**React**

```console
npm install @skeletonlabs/skeleton@latest @skeletonlabs/skeleton-react@latest
```

**Svelte**

```console
npm install @skeletonlabs/skeleton@latest @skeletonlabs/skeleton-svelte@latest
```

### Update Stylesheet Imports

The following migration steps apply to your global stylesheet (ex: `app.css`).

The `@source` rules for sourcing component styles have been replaced with simpler and more intuitive `@import` rules.

```diff
- @source '../node_modules/@skeletonlabs/skeleton-{framework}/dist';
+ @import '@skeletonlabs/skeleton-{framework}';
```

In Skeleton v3 the [Preset styles](/docs/design/presets) were split to an optional stylesheet to allow them to be opt-in. However, due to popular demand, these have now been combined back into the core package. If this optional import is present, please remove it:

```diff
- @import '@skeletonlabs/skeleton/optional/presets';
```

---

## Manual Migration

Assuming all above steps have been completed in full, you will now be required to handle the manual portion of the migration. The steps below are not optional and must be completed to finalize your migration to Skeleton v4.

### Migrating Components

Below is an example of that process specifically tailored for the Avatar component.

**Was (v3)**

```svelte
<Avatar src="https://i.pravatar.cc/150?img=48" name="Jane Doe" />
```

**Now (v4 RC)**

```svelte
<Avatar>
	<Avatar.Image src="https://i.pravatar.cc/150?img=48" alt="Jane Doe" />
	<Avatar.Fallback>SK</Avatar.Fallback>
</Avatar>
```

1. Consult the Avatar documentation for [React](/docs/components/avatar/react) or [Svelte](/docs/components/avatar/svelte).
2. Keep the import as is; no changes are required for this component.
3. The root component `<Avatar>` remains; remove the `src`, `alt`, and or `name` props.
4. Implement the new `<Avatar.Image>` child and pass the `src` path and `alt` text.
5. Initials are no longer generated via the `name`; instead specify a fallback with `<Avatar.Fallback>`

> TIP: To locate components, search your project by the v3 component name, such `<Avat...` for Avatar. We recommend commenting out each Skeleton component instance, then enabling them one-by-one as you migrate to the new format.

### Rename Components

As part of this update, select components have been renamed. We now aim to follow the [Zag.js](https://zagjs.com/) naming conventions.

\| Was (v3) | Now (v4) | v4 Docs |
\| ------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------- |
\| `<Modal>` | `<Dialog>` | [React](/docs/components/dialog/react) / [Svelte](/docs/components/dialog/svelte) |
\| `<Navigation.Bar>` | `<Navigation layout="bar">` | [React](/docs/components/navigation/react) / [Svelte](/docs/components/navigation/svelte) |
\| `<Navigation.Rail>` | `<Navigation layout="rail">` | [React](/docs/components/navigation/react) / [Svelte](/docs/components/navigation/svelte) |
\| `<ProgressRing>` | `<Progress>` | [React](/docs/components/progress-circular/react) / [Svelte](/docs/components/progress-circular/svelte) |
\| `<Ratings>` | `<RatingGroup>` | [React](/docs/components/rating-group/react) / [Svelte](/docs/components/rating-group/svelte) |
\| `<Segment>` | `<SegmentedControl>` | [React](/docs/components/segmented-control/react) / [Svelte](/docs/components/segmented-control/svelte) |
\| `<Toaster>` | `<Toast.Group>` | [React](/docs/components/toast/react) / [Svelte](/docs/components/toast/svelte) |

---

## Support and Feedback

If you have any questions or issues about the migration process, please contact us on Discord (the `#contributors` channel) or via [GitHub](https://github.com/skeletonlabs/skeleton/discussions). We are here to help!

# Alerts

General purpose notifications to attract attention and provide critical actions.

```astro
<div class="w-full card preset-outlined-surface-950-50 grid grid-cols-1 items-center gap-4 p-4 lg:grid-cols-[1fr_auto]">
	<div>
		<p class="font-bold">Hey, heads up!</p>
		<p class="text-xs opacity-60">Something of moderate importance has occurred.</p>
	</div>
	<div class="flex gap-1">
		<button class="btn preset-tonal hover:preset-filled">Dismiss</button>
	</div>
</div>

```

## Styling

For even more customization, try mixing and matching various [Presets](/docs/design/presets) classes.

```astro
---
import { TriangleAlertIcon } from 'lucide-react';
---

<div class="w-full space-y-8">
	{/* Success */}
	<div class="card preset-outlined-success-500 grid grid-cols-1 items-center gap-4 p-4 lg:grid-cols-[1fr_auto]">
		<div>
			<p class="font-bold">Success</p>
			<p class="text-xs opacity-60">The task has been completed successfully.</p>
		</div>
		<div class="flex gap-1">
			<button class="btn preset-tonal hover:preset-filled">Dismiss</button>
		</div>
	</div>
	{/* Warning */}
	<div class="card preset-outlined-warning-500 grid grid-cols-1 items-center gap-4 p-4 lg:grid-cols-[auto_1fr_auto]">
		<TriangleAlertIcon />
		<div>
			<p class="font-bold">Warning</p>
			<p class="text-xs opacity-60">Beware of this important notice.</p>
		</div>
		<div class="flex gap-1">
			<button class="btn preset-tonal hover:preset-filled">Dismiss</button>
		</div>
	</div>
	{/* Error */}
	<div class="card preset-outlined-error-500 grid grid-cols-1 items-center gap-4 p-4 lg:grid-cols-[auto_1fr_auto]">
		<TriangleAlertIcon />
		<div>
			<p class="font-bold">Error</p>
			<p class="text-xs opacity-60">Something has gone wrong.</p>
		</div>
		<div class="flex gap-1">
			<button class="btn preset-tonal hover:preset-filled">Dismiss</button>
		</div>
	</div>
</div>

```

# Breadcrumbs

Displays the current navigation hierarchy.

```astro
<ol class="flex items-center gap-4">
	<li><a class="opacity-60 hover:underline" href="#">Blog</a></li>
	<li class="opacity-50" aria-hidden>&rsaquo;</li>
	<li><a class="opacity-60 hover:underline" href="#">Category</a></li>
	<li class="opacity-50" aria-hidden>&rsaquo;</li>
	<li>Article</li>
</ol>

```

## Icons

Feel free to mix in icons for the anchor labels or separators.

```astro
---
import { ChevronRightIcon, CogIcon, HouseIcon } from 'lucide-react';
---

<ol class="flex items-center gap-4">
	<li>
		<a class="opacity-60 hover:opacity-100" href="#">
			<HouseIcon size={24} />
		</a>
	</li>
	<li class="opacity-50" aria-hidden>
		<ChevronRightIcon size={14} />
	</li>
	<li>
		<a class="opacity-60 hover:opacity-100" href="#">
			<CogIcon size={24} />
		</a>
	</li>
	<li class="opacity-50" aria-hidden>
		<ChevronRightIcon size={14} />
	</li>
	<li>Current</li>
</ol>

```

# Chat

Create a custom chat feed or AI prompt interface.

## Layout Columns

Use Tailwind's [grid column](https://tailwindcss.com/docs/grid-template-columns) utility classes to define horizontal columns for your layout.

```astro
<!--
https://tailwindcss.com/docs/grid-template-columns#arbitrary-values
- auto: size to content widths
- 1fr: fill available space evenly
- {amount}: set fixed size (ex: 320px)
-->
<div class="w-full grid grid-cols-[auto_1fr_auto] gap-1">
	<div class="bg-surface-100-900 p-4">(nav)</div>
	<div class="bg-surface-100-900 p-4">(feed)</div>
	<div class="bg-surface-100-900 p-4">(online)</div>
</div>

```

## Layout Rows

Use Tailwind's [grid row](https://tailwindcss.com/docs/grid-template-rows) utility classes to define vertical layout rows for your layout.

```astro
<!--
https://tailwindcss.com/docs/grid-template-rows#arbitrary-values
- auto: size to content widths
- 1fr: fill available space evenly
- {amount}: set fixed size (ex: 320px)
-->
<div class="w-full grid grid-cols-2 gap-10">
	<!-- Three Row Layout -->
	<div class="h-full grid grid-rows-[auto_1fr_auto] gap-1">
		<div class="bg-surface-100-900 p-4">(search)</div>
		<div class="bg-surface-100-900 p-4">(list)</div>
		<div class="bg-surface-100-900 p-4">(footer)</div>
	</div>
	<!-- Two Row Layout -->
	<div class="h-full grid grid-rows-[1fr_auto] gap-1">
		<!-- We've set a max height here to trigger the vertical overflow. -->
		<!-- Removed max-h and space-y in your project. -->
		<div class="bg-surface-100-900 p-4 overflow-y-auto max-h-[128px] space-y-4">
			<p>(feed)</p>
			<p>
				Lorem, ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit dolor ullam, qui et itaque quam distinctio dicta nostrum
				veritatis harum iure hic sequi aperiam, explicabo earum totam deserunt. Fugiat, temporibus.
			</p>
		</div>
		<div class="bg-surface-100-900 p-4">(prompt)</div>
	</div>
</div>

```

## Message Feed

The feed simply loops through the available feed data. Each `<pre>` tag represents a single _bubble_ element.

```astro
---
let messageFeed = [
	{
		id: 0,
		host: true,
		avatar: 48,
		name: 'Jane',
		timestamp: 'Yesterday @ 2:30pm',
		message: 'Some message text.',
		color: 'variant-soft-primary',
	},
	{
		id: 1,
		host: false,
		avatar: 14,
		name: 'Michael',
		timestamp: 'Yesterday @ 2:45pm',
		message: 'Some message text.',
		color: 'variant-soft-primary',
	},
];
---

<section class="w-full max-h-[400px] overflow-y-auto space-y-4">
	<!-- Loop through the messageFeed array -->
	{
		messageFeed.map((bubble) => {
			// Determine if host/guest role
			const role = bubble.host === true ? 'host' : 'guest';
			// Render the bubble template
			return <pre class="pre">{JSON.stringify({ role, ...bubble }, null, 2)}</pre>;
		})
	}
</section>

```

## Message Bubbles

Provide styling to each bubble element.

```astro
---
let messageFeed = [
	{
		id: 0,
		host: true,
		avatar: 48,
		name: 'Jane',
		timestamp: 'Yesterday @ 2:30pm',
		message: 'Some message text.',
		color: 'preset-tonal-primary',
	},
	{
		id: 1,
		host: false,
		avatar: 14,
		name: 'Michael',
		timestamp: 'Yesterday @ 2:45pm',
		message: 'Some message text.',
		color: 'preset-tonal-primary',
	},
];
---

<section class="w-full max-h-[400px] overflow-y-auto space-y-4">
	<!-- Loop through the messageFeed array -->
	{
		messageFeed.map((bubble) => {
			return (
				<>
					{/* If Host, else Guest */}
					{bubble.host ? (
						// Host Bubble
						<div class="grid grid-cols-[auto_1fr] gap-2">
							{/* <Avatar src={`https://i.pravatar.cc/?img=${bubble.avatar}`} name={bubble.name} size="size-12" /> */}
							<div class="card p-4 preset-tonal rounded-tl-none space-y-2">
								<header class="flex justify-between items-center">
									<p class="font-bold">{bubble.name}</p>
									<small class="opacity-50">{bubble.timestamp}</small>
								</header>
								<p>{bubble.message}</p>
							</div>
						</div>
					) : (
						// Guest Bubble
						<div class="grid grid-cols-[1fr_auto] gap-2">
							<div class={`card p-4 rounded-tr-none space-y-2 ${bubble.color}`}>
								<header class="flex justify-between items-center">
									<p class="font-bold">{bubble.name}</p>
									<small class="opacity-50">{bubble.timestamp}</small>
								</header>
								<p>{bubble.message}</p>
							</div>
							{/* <Avatar src={`https://i.pravatar.cc/?img=${bubble.avatar}`} name={bubble.name} size="size-12" /> */}
						</div>
					)}
				</>
			);
		})
	}
</section>

```

## Prompt

Use Skeleton's [input group](/docs/tailwind/forms#groups) styles to create a custom text prompt.

---

## Scroll to Bottom

Bind your scrollable feed panel element reference ([Svelte](https://svelte.dev/docs/svelte/bind) | [React](https://react.dev/learn/referencing-values-with-refs#refs-and-the-dom)), then use [scrollTo](https://developer.mozilla.org/en-US/docs/Web/API/Element/scrollTo) to scroll the panel to the bottom on demand. Scroll behavior can be set via `behavior: 'smooth'`.

```ts
function scrollChatBottom(behavior?: 'auto' | 'instant' | 'smooth' = 'smooth') {
	// `elemChat` represents our scrollable panel element
	elemChat.scrollTo({ top: elemChat.scrollHeight, behavior });
}
```

## Add a Message

Below we'll cover how to append the message feed with a new message from the host user. Per our above examples, we'll use the same `messageFeed` data structure.

```ts
let messageFeed = [
	/* ...*/
];
```

Then bind to the textarea for your prompt in order to capture any message typed by the user.

Here's an example of how we might append a new message to the `messageFeed` array.

```ts
function addMessage(): void {
	const newMessage = {
		id: messageFeed.length,
		host: true,
		avatar: 48,
		name: 'Jane',
		timestamp: new date(),
		message: elemPrompt.value,
		color: 'preset-tonal-primary'
	};
	// Append the new message to the message feed
	messageFeed = [...messageFeed, newMessage];
	// Clear the textarea message
	elemPrompt.value = '';
	// Smoothly scroll to the bottom of the feed
	setTimeout(() => {
		scrollChatBottom('smooth');
	}, 0);
}
```

This can be triggered when the prompt's SEND button is clicked.

```svelte
<button ... onclick={addMessage}>Send</button>
```

# Clipboard API

Learn how to integrate the native browser clipboard API.

## How It Works

Refer to the [Clipboard API](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) documentation for details.

## Programmatic

```astro
<button class="btn preset-filled" data-button>Copy to Clipboard</button>

<script>
	// Define your source data
	const sourceData = 'Hello world';

	// Select your trigger element
	const elemButton: HTMLButtonElement | null = document.querySelector('[data-button]');

	// Add a click event handler to the trigger
	elemButton?.addEventListener('click', () => {
		// Call the Clipboard API
		navigator.clipboard
			// Use the `writeText` method write content to the clipboard
			.writeText(sourceData)
			// Handle confirmation
			.then(() => console.log('Source data copied to clipboard!'));
	});
</script>

```

## Using Inputs

```astro
<div class="flex items-center gap-4">
	<input type="text" class="input" value="Hello Skeleton" data-source />
	<button class="btn preset-filled" data-trigger>Copy</button>
</div>

<script>
	// Create element references
	const elemButton: HTMLButtonElement | null = document.querySelector('[data-trigger]');
	const elemInput: HTMLInputElement | null = document.querySelector('[data-source]');

	// Add a click event handler to the trigger
	elemButton?.addEventListener('click', () => {
		// Call the Clipboard API
		navigator.clipboard
			// Use the `writeText` method write content to the clipboard
			.writeText(elemInput?.value || '')
			// Handle confirmation
			.then(() => console.log('Input value copied to clipboard!'));
	});
</script>

```

# Dialog Element

Implement a simple popup dialog using the native HTML element.

```astro
<!-- Dialog -->
<dialog
	data-dialog
	class="rounded-container bg-surface-100-900 text-inherit max-w-[640px] top-1/2 left-1/2 -translate-1/2 p-4 space-y-4 z-10 backdrop:bg-surface-50/75 dark:backdrop:bg-surface-950/75"
>
	<h2 class="h3">Hello world!</h2>
	<p>This is an example popover created using the native Dialog element.</p>
	<form method="dialog" class="flex justify-end">
		<button type="button" class="btn preset-tonal" data-dialog-close>Close</button>
	</form>
</dialog>
<!-- Interface -->
<div class="flex justify-center items-center">
	<!-- Trigger -->
	<button class="btn preset-filled" data-dialog-show>Open Modal</button>
</div>

<script>
	// DOM Element References
	const elemModal: HTMLDialogElement | null = document.querySelector('[data-dialog]');
	const elemTrigger: HTMLButtonElement | null = document.querySelector('[data-dialog-show]');
	const elemClose: HTMLButtonElement | null = document.querySelector('[data-dialog-close]');

	// Button Click Handlers
	elemTrigger?.addEventListener('click', () => elemModal?.showModal());
	elemClose?.addEventListener('click', () => elemModal?.close());
</script>

<style>
	/* NOTE: add the following styles to your global stylesheet. */
	dialog,
	dialog::backdrop {
		--anim-duration: 250ms;
		transition:
			display var(--anim-duration) allow-discrete,
			overlay var(--anim-duration) allow-discrete,
			opacity var(--anim-duration);
		opacity: 0;
	}
	/* Animate In */
	dialog[open],
	dialog[open]::backdrop {
		opacity: 1;
	}
	/* Animate Out */
	@starting-style {
		dialog[open],
		dialog[open]::backdrop {
			opacity: 0;
		}
	}
</style>

```

## How It Works

This is enabled by the native [Dialog](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/dialog) element, which includes a dedicated Javascript API for toggling the display.

## Animations

Animating `display: none` with CSS alone has limited browser support. However, per the video below, we can use progressive enhancement our dialog to ensure animations degrade gracefully for unsupported browsers.

## Alternatives

If you need finer grain control, consider Skeleton's integration guides for [Floating UI](https://floating-ui.com/).

- [React Popovers](/docs/integrations/popover/react) - powered by Floating UI React.
- [Svelte Popovers](/docs/integrations/popover/svelte) - powered by Floating UI Svelte.

# Dynamic Theme Loading

Load skeleton themes on demand.

## About Themes

The most common way to load skeleton themes is by importing them in your root stylesheet.

This will bundle your themes when you build your application, for that reason you should only import the themes you need because they will increase your CSS bundle size.

While this is sufficient for most applications this might not be flexible enough for your needs, you may want themes to be
user specific, editable, organization specific and so on, since skeleton themes are just CSS variables there are many ways
you can load themes on demand, read further to see how.

## Creating Stylesheets on layout load

This approach assumes the CSS variables of the skeleton theme you want is available during the load function (eg: on your database or in memory).

In this example we will add a default theme that that can be used as a fallback.

> ⚠️ _Important_ make sure you sanitize the CSS before inserting it or you'll be vulnerable to CSS injection.

After doing so you should be able to toggle themes on demand by changing the `data-theme` attribute on the `html` tag.

Note that there are multiple ways to go about this problem, another way could be to generate CSS files with
the same content as the one in this example and then load only the css files you want, while this
is more complex than storing and retrieving themes as JSON on a database this approach could benefit
from the browser caching mechanism.

# Floating UI Attachments

A Svelte-focused guide around integrating Floating UI and Svelte attachments.

Please note that this is a Svelte-only guide based around the [attachments](https://svelte.dev/docs/svelte/svelte-attachments) feature
introduced in Svelte `v5.29`.

### Summary

The following will guide you through integrating [Floating UI](https://floating-ui.com/) in Svelte and generating a baseline [attachment](https://svelte.dev/docs/svelte/svelte-attachments) that can be used to scaffold any number of custom popover interfaces, including but not limited to: popovers, tooltips, dialogs, drawers, combobox, context menus, and more.

### Accessibility Warning

This guide is not a drop-in replacement for Skeleton's [Svelte Popovers](/docs/components/popover/svelte) as it does not replicate all recommended accessbility features out of the box (such as ARIA attributes, focus states, keyboard interactions, etc). These features are out of scope of this guide. It will be your responsibility to handle these features before using this in a production environment.

### Target Audience

This guide is intended for advanced Svelte users that wish to integrate directly with Floating UI, build custom floating interfaces, and go beyond the scope of Skeleton's [Svelte Popovers](/docs/integrations/popover/svelte). This can be used to generate interfaces not covered by Skeleton's Popover components.

## Installing Floating UI

To begin, install the standard version of Floating UI.

```console
npm install @floating-ui/dom
```

If this is your first time using Floating UI, we recommend following the [guided tutorial](https://floating-ui.com/docs/tutorial) to learn the basics.

## Creating a Svelte Attachment

Next, let's generate our custom attachment. If you're working with SvelteKit, we recommend adding this to `/src/lib/attachments/floating.svelte.ts`.

This attachment will handle the following critical functionality:

1. This imports the Svelte attachment and Floating UI dependencies.
2. Scaffolds a simple `PopoverOptions` interface, which defines our configuraton options.
3. Implement the `Popover` class, which handles all the business logic for creating and using the attachment.
4. And of course sets the default configuration via `options`.

We'll cover each additional method below.

### reference()

When implemented, this is spread to the **Trigger** element and handles interaction such as `click` and `hover`.

### floating()

When implemented, this is spread to the **Popover** element itself. This uses [createAttachmentKey](https://svelte.dev/docs/svelte/svelte-attachments#createAttachmentKey) to generate the attachment relationship itself.

### isOpen()

Returns the current `open` state as a boolean value. We'll use this to show and hide the popover on demand.

### #updatePosition()

This scaffolds [computePosition](https://floating-ui.com/docs/computePosition), which handles most of Floating UI's functionality.

## Making the Tooltip Float

Floating UI [requires these CSS styles](https://floating-ui.com/docs/tutorial#making-the-tooltip-float) to ensure the popover element "floats" over other UI. For this guide we'll handle this with a convention by adding the following your to global stylesheet. For SvelteKit this is located in `/src/app.css`.

```css
[data-floating] {
	width: max-content;
	position: absolute;
	top: 0;
	left: 0;
}
```

## Usage

### Popover

Add the following to any page within your application to generate a basic popover.

1. First, import the Popover attachment and generate an instance using `new Popover()`.
2. Next, create a wrapping `<span>` to ensure your popover is not affected by the flow of the document.
3. Add your trigger button and spread the `popover.reference()`
4. Add your popover element and spread the `popover.floating()`
5. Apply `data-floating` to the popover element.
6. Wrap the popover element with `#if popover.isOpen()` to show/hide the popover.

> TIP: you can optionally import a [Svelte transition](https://svelte.dev/docs/svelte/svelte-transition), such as `slide`. Then use this to trigger animations on the open/close state for the popover.

### Tooltip

Add the following to any page within your application to generate a basic tooltip.

1. Similar to the Popover - we import, initialize, and scaffold the common attachment requirements.
2. Unlike the Popover though, we configure `new Popover({ ... })` to adjust `interaction` and `placement` settings.
3. We can also use a different transition, such as `fade`, as shown above.

## Handling Accessibility

We recommend you follow the [Aria APG patterns](https://www.w3.org/WAI/ARIA/apg/patterns/) when generating popover interfaces for production use. We've linked a few of the common patterns below to help you get started. This covers `aria` and `role` attributes, keyboard interactions, and other best practices.

- [Alert and Message Dialogs Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/)
- [Alert Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/alert/)
- [Combobox Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/combobox/)
- [Dialog (Modal) Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/)
- [Menu and Menubar Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/menubar/)
- [Tooltip](https://www.w3.org/WAI/ARIA/apg/patterns/tooltip/)

# Image Layouts

Layouts for displaying sets of images.

## Grid

```astro
<section class="grid grid-cols-2 gap-6 md:grid-cols-3">
	<!-- Row -->
	<img class="w-48 h-48 bg-surface-500 rounded-container" src="https://picsum.photos/192/192?random=1" />
	<img class="w-48 h-48 bg-surface-500 rounded-container" src="https://picsum.photos/192/192?random=2" />
	<img class="w-48 h-48 bg-surface-500 rounded-container" src="https://picsum.photos/192/192?random=3" />
	<!-- Row -->
	<img class="w-48 h-48 bg-surface-500 rounded-container" src="https://picsum.photos/192/192?random=4" />
	<img class="w-48 h-48 bg-surface-500 rounded-container" src="https://picsum.photos/192/192?random=5" />
	<img class="w-48 h-48 bg-surface-500 rounded-container" src="https://picsum.photos/192/192?random=6" />
	<!-- Row -->
	<img class="w-48 h-48 bg-surface-500 rounded-container" src="https://picsum.photos/192/192?random=7" />
	<img class="w-48 h-48 bg-surface-500 rounded-container" src="https://picsum.photos/192/192?random=8" />
	<img class="w-48 h-48 bg-surface-500 rounded-container" src="https://picsum.photos/192/192?random=9" />
</section>

```

## Quad

```astro
<section class="grid grid-cols-2 gap-4">
	<!-- Row -->
	<img class="h-64 w-64 bg-surface-500 rounded-container" src="https://picsum.photos/256/256?random=1" />
	<img class="h-64 w-64 bg-surface-500 rounded-container" src="https://picsum.photos/256/256?random=2" />
	<!-- Row -->
	<img class="h-64 w-64 bg-surface-500 rounded-container" src="https://picsum.photos/256/256?random=3" />
	<img class="h-64 w-64 bg-surface-500 rounded-container" src="https://picsum.photos/256/256?random=4" />
</section>

```

## Masonry

```astro
<section class="grid grid-cols-2 gap-4 md:grid-cols-4">
	<!-- Column -->
	<div class="grid gap-4">
		<img class="bg-surface-500 rounded-container" src="https://picsum.photos/220/320?random=1" />
		<img class="bg-surface-500 rounded-container" src="https://picsum.photos/220/120?random=2" />
		<img class="bg-surface-500 rounded-container" src="https://picsum.photos/220/280?random=3" />
	</div>
	<!-- Column -->
	<div class="grid gap-4">
		<img class="bg-surface-500 rounded-container" src="https://picsum.photos/220/300?random=4" />
		<img class="bg-surface-500 rounded-container" src="https://picsum.photos/220/280?random=5" />
		<img class="bg-surface-500 rounded-container" src="https://picsum.photos/220/140?random=6" />
	</div>
	<!-- Column -->
	<div class="grid gap-4">
		<img class="bg-surface-500 rounded-container" src="https://picsum.photos/220/280?random=7" />
		<img class="bg-surface-500 rounded-container" src="https://picsum.photos/220/320?random=8" />
		<img class="bg-surface-500 rounded-container" src="https://picsum.photos/220/140?random=9" />
	</div>
	<!-- Column -->
	<div class="grid gap-4">
		<img class="bg-surface-500 rounded-container" src="https://picsum.photos/220/320?random=10" />
		<img class="bg-surface-500 rounded-container" src="https://picsum.photos/220/140?random=11" />
		<img class="bg-surface-500 rounded-container" src="https://picsum.photos/220/280?random=12" />
	</div>
</section>

```

## Featured

```astro
<section class="grid gap-4">
	<!-- Featured -->
	<header>
		<img class="h-auto max-w-full bg-surface-500 rounded-container" src="https://picsum.photos/960/512?random=1" />
	</header>
	<!-- Row -->
	<div class="grid grid-cols-5 gap-4">
		<img class="h-full w-full bg-surface-500 rounded-container" src="https://picsum.photos/200/200?random=2" />
		<img class="h-full w-full bg-surface-500 rounded-container" src="https://picsum.photos/200/200?random=3" />
		<img class="h-full w-full bg-surface-500 rounded-container" src="https://picsum.photos/200/200?random=4" />
		<img class="h-full w-full bg-surface-500 rounded-container" src="https://picsum.photos/200/200?random=5" />
		<img class="h-full w-full bg-surface-500 rounded-container" src="https://picsum.photos/200/200?random=6" />
	</div>
</section>

```

## Attribution

Images courtesy of [Lorem Picsum](https://picsum.photos/). Markup and styles inspired by [Flowbite](https://flowbite.com/docs/components/gallery/#masonry-grid).

# Light Switch

Learn how to create a Light Switch toggle.

Use [Dark Mode](/docs/guides/mode) to make use of either a base or `dark:` variant for your utility class styles. By default, Tailwind uses the `prefers-color-scheme` media query to determine and match the user's operating system settings. However, if you wish to provide your users manual control, you'll need to adjust the Dark Mode strategy for Tailwind, as well as provide the toggle interface (aka a light switch). This guide will show you how to fulfill both requirements.

## User Interface

While we utilize a primitive Switch for the minimal example above, feel free to adjust the logic and interface to your preference. We provide a more detailed Switch example for [React](/docs/components/switch/react#light-switch) and [Svelte](/docs/components/switch/svelte#light-switch) respectively.

## Next.js Users

For Next.js users, you will need to [suppressHydrationWarning](https://nextjs.org/docs/messages/react-hydration-error#solution-3-using-suppresshydrationwarning) to `true` on the root `<html>` element. This will suppress hydration warnings.

# Logo Clouds

Provides a grid for presenting a set of logos, brands, or sponsors.

```astro
<nav class="rounded-container grid w-full grid-cols-1 gap-1 overflow-hidden md:grid-cols-3">
	<a class="card preset-filled-surface-100-900 rounded-none p-4 py-8 text-center" href="#">Twitch</a>
	<a class="card preset-filled-surface-100-900 rounded-none p-4 py-8 text-center" href="#">YouTube</a>
	<a class="card preset-filled-surface-100-900 rounded-none p-4 py-8 text-center" href="#">TicTok</a>
</nav>

```

## Rows

```astro
<nav class="rounded-container grid w-full grid-cols-2 gap-1 overflow-hidden md:grid-cols-4">
	<a class="card preset-filled-surface-100-900 rounded-none p-4 py-8 text-center" href="#">Optimize</a>
	<a class="card preset-filled-surface-100-900 rounded-none p-4 py-8 text-center" href="#">Brand</a>
	<a class="card preset-filled-surface-100-900 rounded-none p-4 py-8 text-center" href="#">Mesh</a>
	<a class="card preset-filled-surface-100-900 rounded-none p-4 py-8 text-center" href="#">Matrix</a>
	<a class="card preset-filled-surface-100-900 rounded-none p-4 py-8 text-center" href="#">Utilize</a>
	<a class="card preset-filled-surface-100-900 rounded-none p-4 py-8 text-center" href="#">Syndicate</a>
	<a class="card preset-filled-surface-100-900 rounded-none p-4 py-8 text-center" href="#">Incubate</a>
	<a class="card preset-filled-surface-100-900 rounded-none p-4 py-8 text-center" href="#">Orchestrate</a>
</nav>

```

# Scroll Containers

Create scrolling containers using the scroll snap features from Tailwind.

## Scroll Snap

Implements Tailwind's [Scroll Snap Alignment](https://tailwindcss.com/docs/scroll-snap-align) utility classes.

```astro
<div class="w-full">
	<!-- Scroll Container -->
	<div class="snap-x scroll-px-4 snap-mandatory scroll-smooth flex gap-4 overflow-x-auto px-4 py-10">
		<!-- Generate a array of 8 items; loop through each item -->
		{
			Array.from({ length: 8 }).map((_, i) => (
				// Each scrollable card element
				<div class="snap-start shrink-0 card preset-filled py-20 w-40 md:w-80 text-center">
					<span>{i + 1}</span>
				</div>
			))
		}
	</div>
</div>

```

## Carousels

Using Scroll Containers, we can create a fully functional carousel, complete with thumbnail selection.

```astro
---
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

const generatedArray = Array.from({ length: 6 });
---

<div class="w-full">
	<!-- Carousel -->
	<div class="card p-4 grid grid-cols-[auto_1fr_auto] gap-4 items-center">
		<!-- Button: Left -->
		<button type="button" class="btn-icon preset-filled" data-carousel-left title="Previous slide" aria-label="Previous slide">
			<ArrowLeftIcon size={16} />
		</button>
		<!-- Full Images -->
		<div data-carousel class="snap-x snap-mandatory scroll-smooth flex overflow-x-auto">
			<!-- Loop X many times. -->
			{
				generatedArray.map((_, i: number) => (
					<img
						class="snap-center w-[1024px] rounded-container"
						src={`https://picsum.photos/seed/${i + 1}/1024/768`}
						alt={`full-${i}`}
						loading="lazy"
					/>
				))
			}
		</div>
		<!-- Button: Right -->
		<button type="button" class="btn-icon preset-filled" data-carousel-right title="Next slide" aria-label="Next slide">
			<ArrowRightIcon size={16} />
		</button>
	</div>
	<!-- Thumbnails -->
	<div class="card p-4 grid grid-cols-6 gap-4">
		<!-- Loop X many times. -->
		{
			generatedArray.map((_, i: number) => (
				<button type="button" data-thumbnail>
					<img
						class="rounded-container hover:brightness-125"
						src={`https://picsum.photos/seed/${i + 1}/256`}
						alt={`thumb-${i}`}
						loading="lazy"
					/>
				</button>
			))
		}
	</div>
</div>

<script>
	// Query Element References
	const elemCarousel: HTMLDivElement | null = document.querySelector('[data-carousel]');
	const elemCarouselLeft: HTMLButtonElement | null = document.querySelector('[data-carousel-left]');
	const elemCarouselRight: HTMLButtonElement | null = document.querySelector('[data-carousel-right]');
	const elemThumbnails: NodeListOf<HTMLElement> = document.querySelectorAll('[data-thumbnail]');

	// Set Left/Right arrow click handlers
	elemCarouselLeft?.addEventListener('click', () => carouselLeft());
	elemCarouselRight?.addEventListener('click', () => carouselRight());

	// Set thumbnail click handler
	if (elemThumbnails.length > 0) {
		elemThumbnails.forEach((elemButton: HTMLElement, index: number) => {
			elemButton?.addEventListener('click', () => carouselThumbnail(index));
		});
	}

	/** On navigation left, scroll the container */
	function carouselLeft() {
		if (!elemCarousel) {
			return;
		}
		const x =
			elemCarousel.scrollLeft === 0
				? elemCarousel.clientWidth * elemCarousel.childElementCount // loop
				: elemCarousel.scrollLeft - elemCarousel.clientWidth; // step left
		elemCarousel.scroll(x, 0);
	}

	/** On navigation right, scroll the container */
	function carouselRight() {
		if (!elemCarousel) {
			return;
		}
		const x =
			elemCarousel.scrollLeft === elemCarousel.scrollWidth - elemCarousel.clientWidth
				? 0 // loop
				: elemCarousel.scrollLeft + elemCarousel.clientWidth; // step right
		elemCarousel.scroll(x, 0);
	}

	/** On thumbnail click, scroll large image into view */
	function carouselThumbnail(index: number) {
		if (elemCarousel) {
			elemCarousel.scroll(elemCarousel.clientWidth * index, 0);
		}
	}
</script>

```

## Multi-Column

Using Scroll Containers, we can scroll sets of items.

```astro
---
import { ArrowLeftIcon, ArrowRightIcon } from 'lucide-react';

interface Movie {
	name: string;
	imageUrl: string;
	url: string;
}

// Data and images via: https://www.themoviedb.org/
export const movies: Movie[] = [
	{
		name: 'The Flash',
		imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rktDFPbfHfUbArZ6OOOKsXcv0Bm.jpg',
		url: 'https://www.themoviedb.org/movie/298618-the-flash',
	},
	{
		name: 'Guardians of the Galaxy Vol. 3',
		imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
		url: 'https://www.themoviedb.org/movie/447365-guardians-of-the-galaxy-vol-3',
	},
	{
		name: 'Black Panther: Wakanda Forever',
		imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/sv1xJUazXeYqALzczSZ3O6nkH75.jpg',
		url: 'https://www.themoviedb.org/movie/505642-black-panther-wakanda-forever',
	},
	{
		name: 'Avengers: Infinity War',
		imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
		url: 'https://www.themoviedb.org/movie/299536-avengers-infinity-war',
	},
	{
		name: 'Spider-Man: No Way Home',
		imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg',
		url: 'https://www.themoviedb.org/movie/634649-spider-man-no-way-home',
	},
	{
		name: 'The Batman',
		imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/74xTEgt7R36Fpooo50r9T25onhq.jpg',
		url: 'https://www.themoviedb.org/movie/414906-the-batman',
	},
	{
		name: 'Iron Man',
		imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/78lPtwv72eTNqFW9COBYI0dWDJa.jpg',
		url: 'https://www.themoviedb.org/movie/1726-iron-man',
	},
	{
		name: 'Venom: Let There Be Carnage',
		imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/rjkmN1dniUHVYAtwuV3Tji7FsDO.jpg',
		url: 'https://www.themoviedb.org/movie/580489-venom-let-there-be-carnage',
	},
	{
		name: 'Deadpool',
		imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/3E53WEZJqP6aM84D8CckXx4pIHw.jpg',
		url: 'https://www.themoviedb.org/movie/293660-deadpool',
	},
];
---

<div class="w-ful">
	<div class="grid grid-cols-[auto_1fr_auto] gap-4 items-center">
		<!-- Button: Left -->
		<button type="button" class="btn-icon preset-filled" data-multi-column-left title="Scroll left" aria-label="Scroll left">
			<ArrowLeftIcon size={16} />
		</button>
		<!-- Carousel -->
		<div data-multi-column class="snap-x snap-mandatory scroll-smooth flex gap-2 pb-2 overflow-x-auto">
			<!-- Loop through our array of movies. -->
			{
				movies.map((movie) => (
					<a href={movie.url} target="_blank" class="shrink-0 w-[28%] snap-start">
						<img
							class="rounded-container-token hover:brightness-125"
							src={movie.imageUrl}
							alt={movie.name}
							title={movie.name}
							loading="lazy"
						/>
					</a>
				))
			}
		</div>
		<!-- Button-Right -->
		<button type="button" class="btn-icon preset-filled" data-multi-column-right title="Scroll right" aria-label="Scroll right">
			<ArrowRightIcon size={16} />
		</button>
	</div>
</div>

<script>
	// Query Element References
	const elemMovies: HTMLDivElement | null = document.querySelector('[data-multi-column]')!;
	const elemBtnLeft: HTMLButtonElement | null = document.querySelector('[data-multi-column-left]');
	const elemBtnRight: HTMLButtonElement | null = document.querySelector('[data-multi-column-right]');

	// Add Button click handlers
	elemBtnLeft?.addEventListener('click', () => multiColumnLeft());
	elemBtnRight?.addEventListener('click', () => multiColumnRight());

	/** Handles the left scroll event. */
	function multiColumnLeft() {
		if (!elemMovies) {
			return;
		}
		let x = elemMovies.scrollWidth;
		if (elemMovies.scrollLeft !== 0) {
			x = elemMovies.scrollLeft - elemMovies.clientWidth;
		}
		elemMovies.scroll(x, 0);
	}

	/** Handles the right scroll event. */
	function multiColumnRight() {
		if (!elemMovies) {
			return;
		}
		let x = 0;
		// -1 is used because different browsers use different methods to round scrollWidth pixels.
		if (elemMovies.scrollLeft < elemMovies.scrollWidth - elemMovies.clientWidth - 1) {
			x = elemMovies.scrollLeft + elemMovies.clientWidth;
		}
		elemMovies.scroll(x, 0);
	}
</script>

```

> Images courtesy of [The Movie Database](https://www.themoviedb.org/)

## API Reference

Learn more about Tailwind's utility classes for scroll behavior and scroll snap.

\| Feature | Description |
\| ------------------------------------------------------------------- | ------------------------------------------------------------------- |
\| [scroll-behavior](https://tailwindcss.com/docs/scroll-behavior) | Controls the scroll behavior of an element. |
\| [scroll-margin](https://tailwindcss.com/docs/scroll-margin) | Controls the scroll offset around items in a snap container. |
\| [scroll-padding](https://tailwindcss.com/docs/scroll-padding) | Controls an element's scroll offset within a snap container. |
\| [scroll-snap-align](https://tailwindcss.com/docs/scroll-snap-align) | Controls the scroll snap alignment of an element. |
\| [scroll-snap-stop](https://tailwindcss.com/docs/scroll-snap-stop) | Controls whether you can skip past possible snap positions. |
\| [scroll-snap-type](https://tailwindcss.com/docs/scroll-snap-type) | Controls how strictly snap points are enforced in a snap container. |

# Stepper

Divide and present content in sequenced steps.

## Using Components

Optionally, you can substitute primitive data for components and props.

# SVG Filters

Apply filter effects to elements and images.

## How It Works

This feature is enabled by [SVG filters](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/filter) paired with [feColorMatrix](https://developer.mozilla.org/en-US/docs/Web/SVG/Element/feColorMatrix) transformations.

## Usage

Apply a filter to any element using the Filter style property and passing the unique SVG Filter ID.

```astro
<!-- The Target Element -->
<img ... style="filter: url(#Apollo)" />

<!-- Via arbitrary Tailwind syntax -->
<Avatar classes="[filter:url(#Apollo)]" />

<!-- The SVG Filter with a matching unique ID -->
<svg><filter id="Apollo">...</filter></svg>
```

We've provided a curated collection of SVG Filters to choose from below.

## Create a Filter

We recommend [SVG Color Matrix Mixer](https://fecolormatrix.com/) by [Rik Schennink](https://x.com/rikschennink/) to create your own filters.

## Tips

- The SVG must be in the same scope as the elements you wish to filter. Global scope is acceptable.
- Consder storing your SVGs within your local project for quick and reusable imports.
- All Vite-based frameworks support [SVG imports](https://vite.dev/guide/assets.html#importing-asset-as-url).
- Optionally you can embed the SVG within a imported component (ex: `Apollo.svelte`, `Apollo.tsx`).
- Filter SVGs are affected by the flow DOM, including class styles such as `space-{x|y}`.

# Table of Contents

Navigate the hierarchy of headings for the current page.

```astro
---
interface PageHeadings {
	/** The text value within the heading tag; stripped of HTML. */
	text: string;
	/** A generated slug value based on the text. */
	slug: string;
	/** Depth indicates headings H1-H6. */
	depth: number;
}

/** The generated list of page headings, slugs, and depth. */
const headings: PageHeadings[] = [
	{ text: 'Real World Example', slug: 'real-world-example', depth: 1 },
	{ text: 'Semantic Markup', slug: 'semantic-markup', depth: 1 },
	{ text: 'Utilities', slug: 'utilities', depth: 1 },
	{ text: 'Grid', slug: 'grid', depth: 2 },
	{ text: 'Alignment', slug: 'alignment', depth: 2 },
	{ text: 'Responsive Design', slug: 'responsive-design', depth: 2 },
	{ text: 'In Conclusion', slug: 'in-conclusion', depth: 1 },
];

/** Provide a padding-left class based on the depth. */
function setIndentationClass(depth: number) {
	// prettier-ignore
	switch(depth) {
		case(6): { return 'pl-12';
		}
		case(5): { return 'pl-10';
		}
		case(4): { return 'pl-8';
		}
		case(3): { return 'pl-6';
		}
		case(2): { return 'pl-4';
		}
		case(1): { return 'pl-2';
		}
		default: { return 'pl-0';
		}
	}
}
---

<nav class="card bg-surface-100-900 p-4">
	<!-- Table of Contents -->
	<div class="text-sm space-y-2">
		<!-- Label -->
		<div class="font-bold">On This Page</div>
		<!-- Links -->
		<ul class="space-y-2">
			<!-- Consider a fixed scroll position at the top of your page layouts. -->
			<li><a href={`#_top`} class="anchor block">Overview</a></li>
			<!-- Loop through the available headings. -->
			{
				headings.map((heading: PageHeadings) => (
					<li>
						{/* Apply a indentation class based on the depth. */}
						<a href={`#${heading.slug}`} class="anchor block" class:list={setIndentationClass(heading.depth)}>
							{heading.text}
						</a>
					</li>
				))
			}
		</ul>
	</div>
</nav>

```

## Deep Linking

Browsers allow you to deep link to any element via the ID. This is accomplished with an anchor tag and hashed (`#`) href value. When interacting with these anchors, the viewport will automatically attempt to scroll the `<body>` element and bring the element into view.

```html
<h2 class="#some-example-slug">
	Some Example Heading
	<h2></h2>
</h2>
```

```html
<a href="#real-world-example" class="anchor">Some Example Heading</a>
```

> TIP: If you abstract scrolling away from the `<body>` element, this will not work.

## Scroll Behavior

You may optionally choose to implement a smooth [scroll behavior](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-behavior) using CSS.

```html
<body class="smooth-scroll"></body>
```

```css
body {
	scroll-behavior: smooth;
}
```

## Generate a Slug

The following provides a barebones implementation for generating a slug based on a heading text value.

```ts
function generateSlug(text: string, prefix?: string = '', suffix?: string = '') {
	// Format the slug from the text value.
	const slug = text
		.toLowerCase()
		.replaceAll(/[^a-zA-Z0-9 ]/g, '')
		.replaceAll(' ', '-')
		.toLowerCase();
	// Note that you can optionally apply a prefix/suffix.
	return `${prefix}${slug}${suffix}`;
}

// Usage
generateSlug('An Example Header'); // result: an-example-header
generateSlug('An Example Header', 'skeleton-'); // result: skeleton-an-example-header
generateSlug('An Example Header', '', '-skeleton'); // result: an-example-header-skeleton
```

## Guides

Specific instructions for generating headings will differ based on your meta-framework and your application architecture. Below are a few suggestions, but this is neither a definitive or exhaustive list of all available options.

- [Astro](https://kld.dev/building-table-of-contents/) - enables you to automatically generate headings using built-in MDX features.
- [Svelte](https://www.melt-ui.com/docs/builders/table-of-contents) - Melt UI provides a headless component solution for Svelte.
- [Next.js](https://nextra.site/docs/docs-theme/theme-configuration#toc-sidebar) - Nextra provides a headless component solution for Next.js + MDX.
- [Rehype Plugin](https://github.com/stefanprobst/rehype-extract-toc) - a general purpose Rehype plugin for generating a table of contents.

# 1 - Setup & Usage

Get Started with Skeleton.

## How to Install the Figma Library

---

## How to Use the Figma Library

---

## Guides

# 2 - Import Themes

Customize Your Design with Skeleton Themes

## Prerequisites

- [Chapter 1: Set-up Skeleton Figma Library](chapter-1)

---

## Import Custom Theme

---

## Apply Custom Theme in Project

### Prerequisites

- Completed [Chapter 1: Set-up Skeleton Figma Library](chapter-1#how-to-install-the-figma-library)
- Completed [Chapter 2: Import Custom Theme](#import-custom-theme)

---

## Guides

# 3 - Update Figma library

Keep Your Skeleton Library Up to Date

## How to update the library

---

### Remove previous version

After updating the Skeleton Figma library, please remove previous versions. Keeping multiple versions can create multiple copies of the same components, leading to design inconsistencies.

Open the project that utilizes the old version of Skeleton v3 Figma UI library. Open `Assets`¹ tab and click on <span class="badge-icon preset-filled"><BookOpen size={16} /></span> ² icon to open `Manage libraries` popup.

In the `Libraries added to this file` section, click the `Remove`³ button next to the old version of the Skeleton v3 Figma UI library.

---

## Guides

# Dark Mode

Learn how to use Tailwind's dark mode feature for your Skeleton project.

## Dark Mode

Tailwind [multiple strategies](https://tailwindcss.com/docs/dark-mode) for configuring Dark Mode.

### Media Strategy

Enable by default. Uses CSS's [prefers-color-scheme](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme) and sets the active mode based on operating system settings.

### Selector Strategy

Activates dark mode by adding or removing the `.dark` class to your application's `<html>` element.

```css title="app.css"
@custom-variant dark (&:where(.dark, .dark *));
```

```html title="app.html"
<html class="dark">
	...
</html>
```

### Data Attribute Strategy

Uses a data attribute instead of a class to activate dark mode.

```css title="app.css"
@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *));
```

```html title="app.html"
<html data-mode="dark">
	...
</html>
```

### Using the Dark Variant

Apply a base style, then with Tailwind's `dark:` variant.

```html title="app.html"
<!-- Light Mode: White | Dark Mode: Black -->
<div class="bg-white dark:bg-black">...</div>
```

---

## Color Scheme

Skeleton now supports Tailwind's [Color Scheme](https://tailwindcss.com/docs/color-scheme) feature, which enables toggling light or dark interfaces at any scope. By default, the scheme matches the current Dark Mode setting. This feature is enabled by [Color Pairings](/docs/design/colors#color-pairings), which implement the native CSS property [light-dark](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark).

```html
<div class="bg-primary-50-950">Light or Dark</div>

<div class="scheme-light">
	<div class="bg-primary-50-950">Always Light Scheme</div>
</div>

<div class="scheme-dark">
	<div class="bg-primary-50-950">Always Dark Scheme</div>
</div>
```

---

## Light Switch

Legacy versions of Skeleton offer a unique Light Switch component for controlling the Dark Mode `selector` strategy. Unfortunately this is no longer available due to the number of permutations required per framework and required feature capabilities, including:

- Supporting one or more combinations of Dark Mode strategies.
- Supporting the unique APIs of each meta-framework.
- Handling state and persistence; ex: local vs remote vs account-based storage

We now recommend you generate your own component following [Tailwind's best practices](https://tailwindcss.com/docs/dark-mode). To help you get started, we've provided a Cookbook recipe covering the basics.

# Layouts

Learn best practices for creating responsive layouts using semantic HTML and Tailwind.

## Real World Example

See our real world three column example, which implements many of the concepts introduced below.

## Semantic Markup

When creating custom layouts, it's recommended to use semantic HTML to denote each region of the page.

\| Element | Description | Source |
\| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ |
\| `<header>` | Represents introductory content, typically a group of introductory or navigational aids. It may contain some heading elements but also a logo, a search form, an author name, and other elements. | [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/header) |
\| `<main>` | Represents the dominant content within the document `<body>`. The main content area consists of content that is directly related to or expands upon the central topic of a document, or the central functionality of an application. | [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/main) |
\| `<footer>` | Represents a footer for its nearest ancestor sectioning content or sectioning root element. Typically contains information about the author of the section, copyright data or links to related documents. | [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/footer) |
\| `<aside>` | Represents a portion of a document whose content is only indirectly related to the document's main content. Asides are frequently presented as sidebars or call-out boxes. | [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/aside) |
\| `<article>` | Represents a self-contained composition in a document, page, application, or site, which is intended to be independently distributable or reusable (e.g., in syndication). Examples include: a forum post, a magazine or newspaper article, or a blog entry, a product card, a user-submitted comment, an interactive widget or gadget, or any other independent item of content. | [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/article) |

## Using Body Scroll

Prioritize the `<body>` element as the scrollable page element over child elements. Otherwise you risk the following pitfalls:

1. Mobile browser's "pull to refresh" feature will not work as expected.
2. The Mobile Safari's browser interface will not auto-hide when scrolling vertically.
3. CSS print styles may not work as expected.
4. Accessibility may be adversely affected, especially on touch screen devices.
5. May introduce inconsistent behavior between your app framework's layout solution.

## Tailwind Utilities

Tailwind provides several utility classes that may be helpful when generating custom layouts.

### Grid

Learn more about [CSS grid](https://css-tricks.com/snippets/css/complete-guide-grid/).

\| Utility | Description |
\| -------------------------------------------------------------- | -------------------------------------------------------------------------------- |
\| [Columns](https://tailwindcss.com/docs/grid-template-columns) | Utilities for specifying the columns in a grid layout. |
\| [Column Start/End](https://tailwindcss.com/docs/grid-column) | Utilities for controlling how elements are sized and placed across grid columns. |
\| [Rows](https://tailwindcss.com/docs/grid-template-rows) | Utilities for specifying the rows in a grid layout. |
\| [Row Start/End](https://tailwindcss.com/docs/grid-row) | Utilities for controlling how elements are sized and placed across grid rows. |
\| [Auto Flow](https://tailwindcss.com/docs/grid-auto-flow) | Utilities for controlling how elements in a grid are auto-placed. |
\| [Auto Columns](https://tailwindcss.com/docs/grid-auto-columns) | Utilities for controlling the size of implicitly-created grid columns. |
\| [Auto Rows](https://tailwindcss.com/docs/grid-auto-rows) | Utilities for controlling the size of implicitly-created grid rows. |
\| [Gap](https://tailwindcss.com/docs/gap) | Utilities for controlling gutters between grid and flexbox items. |

### Alignment

The following options are available for both [Flexbox](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) and [Grid](https://css-tricks.com/snippets/css/complete-guide-grid/) styles.

\| Utility | Description |
\| --------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
\| [Justify Content](https://tailwindcss.com/docs/justify-content) | Utilities for controlling how flex and grid items are positioned along a container's main axis. |
\| [Justify Items](https://tailwindcss.com/docs/justify-items) | Utilities for controlling how grid items are aligned along their inline axis. |
\| [Justify Self](https://tailwindcss.com/docs/justify-self) | Utilities for controlling how an individual grid item is aligned along its inline axis. |
\| [Align Content](https://tailwindcss.com/docs/align-content) | Utilities for controlling how rows are positioned in multi-row flex and grid containers. |
\| [Align Items](https://tailwindcss.com/docs/align-items) | Utilities for controlling how flex and grid items are positioned along a container's cross axis. |
\| [Align Self](https://tailwindcss.com/docs/align-self) | Utilities for controlling how an individual flex or grid item is positioned along its container's cross axis. |
\| [Place Content](https://tailwindcss.com/docs/place-content) | Utilities for controlling how content is justified and aligned at the same time. |
\| [Place Items](https://tailwindcss.com/docs/place-items) | Utilities for controlling how items are justified and aligned at the same time. |
\| [Place Self](https://tailwindcss.com/docs/place-self) | Utilities for controlling how an individual item is justified and aligned at the same time. |

### Responsive Design

We recommend you utilize Tailwind's built-in [responsive breakpoints](https://tailwindcss.com/docs/responsive-design) for handling responsive design.

```html
<!-- Use a single column on small screens; show multiple columns at the medium breakpoint or wider -->
<div class="grid grid-cols-1 md:grid-cols-[auto_1fr]">
	<!-- Hide the sidebar on small screens; show at the medium breakpoint or wider -->
	<aside class="hidden md:block">(sidebar)</aside>
	<!-- Remains visible at all breakpoints -->
	<main>(main)</main>
</div>
```

By default, your `<html>` and `<body>` may collapse vertically and not extend to full height of the viewport. Consider a reset:

```css
html,
body {
	@apply h-full;
}
```

## The Basics

Let's start by creating traditional layouts using a combination of semantic HTML and Tailwind utility classes.

### One Column

### Two Column

### Three Column

## Sticky Positioning

If you wish for your header or sidebar to remain fixed while scrolling, try the following techniques.

### Sticky Header

For `<header>`, we'll implement a few specific utility classes:

- [sticky](https://tailwindcss.com/docs/position#sticky-positioning-elements) - Sets the CSS display to a value of sticky.
- [top-0](https://tailwindcss.com/docs/top-right-bottom-left) - Sets the top offset to a value of 0px.
- [z-10](https://tailwindcss.com/docs/z-index) - Sets the z-index stacking to a value of 10.

> TIP: Use [backdrop-blur](https://tailwindcss.com/docs/backdrop-blur) to produce the hazy glass-like effect for overlapped semi-transparent elements.

### Sticky Sidebar

For `<aside>`, we introduce two addition utility classes:

- [col-span-1](https://tailwindcss.com/docs/grid-column) - we must define our columns explicitly to ensure all styles are display as expected.
- [h-screen](https://tailwindcss.com/docs/height#viewport-height) - ensures our sidebar matches the viewport height. See Calculate Offsets below for more complex layouts.

## Advanced Techniques

### Calculate Offsets

You may use the [calc](https://developer.mozilla.org/en-US/docs/Web/CSS/calc) property to calculate numeric amounts, which can be handy when you have multiple sticky elements.

```html
<aside class="... sticky top-0 h-[calc(100vh-100px)]">(sidebar)</aside>
```

1. Sets the `height` value using an arbitrary syntax
2. The initial value is set to 100vh (100% of the viewport height)
3. Finally we subtract the offset for our header (ex: 100px)

### Smart Grid Rows

Combine the grid arbitrary syntax with [minmax](https://developer.mozilla.org/en-US/docs/Web/CSS/minmax) to dynamically set a min and max range for your columns or rows. This is useful when creating a three column layout that need to adhere to a max container width.

```html
<div class="container mx-auto grid grid-cols-[200px_minmax(0px,_1fr)_300px]">
	<aside>(sidebar)</aside>
	<main>(main)</main>
	<aside>(sidebar)</aside>
</div>
```

### Grid Template

If you wish to go beyond Tailwind, native CSS also offers [grid-template](https://developer.mozilla.org/en-US/docs/Web/CSS/grid-template). This provides a declarative shorthand for defining grid columns, rows, and areas. Take care to match your [media query breakpoints](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries) configured by Tailwind by default, or extended within your application's [Tailwind configuration](https://tailwindcss.com/docs/responsive-design).

# Figma UI kit

Welcome to the Skeleton Figma Design System Tutorials!

## Get Access

Review the benefits of the Figma UI Kit for Skeleton.

## Guides

Follow along with our step-by-step guides.

# Cookbook

A collection of recipes for crafting interface features that utilize Skeleton primitives.

## What's This?

Learn how [recipes](https://bigmedium.com/ideas/the-art-of-design-system-recipes.html) can help you augment and expand the Skeleton design system and component library.

## Browse

# Themes

The Skeleton theme system.

---

## Preset Themes

Skeleton is provided with high quality set of hand curated themes, as shown below.

Tap the theme preview above to copy the theme name to your clipboard. Then implement any desired theme in your app's global stylesheet.

```css title="app.css" {3}
/* @import '@skeletonlabs/skeleton'; */
@import '@skeletonlabs/skeleton/themes/{theme-name}';
```

> Make sure to replace `{theme-name}` with your desired theme names.

## Custom Themes

Use our powerful Theme Generator app to create your own themes.

1. Open the Theme Generator and customize to your preference.
2. Make sure to set a unique name for your theme.
3. Tap the "code" view from the menu at top-right corner.
4. Tap the "copy" button at the top of copy the theme contents.
5. Paste the contents into a new file at your project root, such as `my-theme-name.css` (any name is fine).

Follow the step below to register any number of custom themes. Take care to match each theme's file name.

## Register Themes

You may register any number of themes by adding addition theme imports to your global stylesheet. Please note that each theme will slightly increase the final CSS bundle size.

```css
/* @import '@skeletonlabs/skeleton'; */

/* Register Preset Themes */
@import '@skeletonlabs/skeleton/themes/cerberus';
@import '@skeletonlabs/skeleton/themes/mona';
@import '@skeletonlabs/skeleton/themes/vox';

/* Register a Custom Themes */
/* Make sure to resolve the relative path. */
/* Note the .css extension is optional. */
@import '../{my-theme-name}';
```

## Activate a Theme

You may define the active theme using the `data-theme` attribute on your `<html>` element.

```html
<html data-theme="cerberus">
	...
</html>
```

> TIP: If you wish to create a theme switcher, this is the value you should aim to modify.

---

## Customize and Extend

### Modify Properties

You can modify any [theme property](/docs/get-started/core-api) on demand using the following technique. Simply add this to your global stylesheet, following all Tailwind and Skeleton configuration. Use this to override preset theme properties.

```css title="app.css"
[data-theme='cerberus'] {
	--spacing: 0.22rem;
	--radius-container: 0.375rem;
	--heading-font-weight: bolder;
}
```

### Target Themes

If your application supports multiple themes, you may isolate selection using the `data-theme` attribute. Just make sure to account for light and dark mode color values.

```css title="app.css"
/** Target only Cerberus .h1 elements. */
[data-theme='cerberus'] .h1 {
	color: red;
	@variant dark {
		color: green;
	}
}
/** Target only Mona .h1 elements. */
[data-theme='mona'] .h1 {
	color: blue;
	@variant dark {
		color: yellow;
	}
}
```

### Backgrounds

Your app's light and dark mode background color values can be adjusted using the following [theme properties](/docs/get-started/core-api#colors).

```css title="app.css"
[data-theme='cerberus'] body {
	--body-background-color: pink;
	--body-background-color-dark: green;
}
```

Background images are supported, including CSS mesh gradients. The following example adheres to theme colors.

```css title="app.css"
[data-theme='cerberus'] body {
	background-image: radial-gradient(
			at 24% 25%,
			color-mix(in oklab, var(--color-primary-500) 30%, transparent) 0px,
			transparent 30%
		),
		radial-gradient(
			at 35% 13%,
			color-mix(in oklab, var(--color-success-500) 18%, transparent) 0px,
			transparent 30%
		),
		radial-gradient(
			at 100% 64%,
			color-mix(in oklab, var(--color-error-500) 3%, transparent) 0px,
			transparent 40%
		);
	background-attachment: fixed;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
}
```

We recommend Mesher for generating custom mesh gradients. This will generate colors using RGB, but can be migrated to utilize `var()` for colors and `color-mix()` for transparency, per the example above.

### Custom Fonts

Skeleton recommends the use of [Fontsource](https://fontsource.org/) for installing and managing custom fonts.

Install your font of choice.

```console
npm install @fontsource/open-sans
```

Then import each font at the top of your global stylesheet, but below your Tailwind configuration.

```css title="app.css"
@import '@fontsource/open-sans';
```

Finally, use the following [theme properties](/docs/get-started/core-api#base-1) to set each respective font-family property. Note that for custom themes, these settings are can be defined directly within each respective theme file.

```css title="app.css"
[data-theme='cerberus'] {
	--heading-font-family: 'Open Sans', sans-serif;
	--base-font-family: 'Open Sans', sans-serif;
	--anchor-font-family: 'inherit';
}
```

## Core API

For more information, please refer to the full [Core API](/docs/get-started/core-api) documentation.

# Colors

The Skeleton color system.

## Color Palette

Supports <u>all</u> standard Tailwind color utility classes using the following pattern.

```
{property}-{color}-{shade}
```

\| Key | Accepted Values |
\| -------- | ---------------------------------------------------------------------------------------------------------------- |
\| Property | `accent`, `bg`, `border`, `caret`, `decoration`, `divide`, `fill`, `outline`, `ring`, `shadow`, `stroke`, `text` |
\| Color | `primary`, `secondary`, `tertiary`, `success`, `warning`, `error`, `surface` |
\| Shade | `50`, `100`, `200`, `300`, `400`, `500`, `600`, `700`, `800`, `900`, `950` |

```html
<div class="bg-primary-500">...</div>
<div class="border border-secondary-600">...</div>
<svg class="fill-surface-950">...</svg>
```

---

## Contrast Colors

Contrast color values are available for every shade. Use these to set accessible text color and icon fill values.

```
{property}-{color}-contrast-{shade}
```

```astro
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
	<!-- Standard Colors -->
	<div class="bg-primary-500 text-primary-contrast-500">
		<p class="text-center p-4">Standard Colors</p>
	</div>
	<!-- Color Pairings -->
	<div class="bg-secondary-200-800 text-secondary-contrast-200-800">
		<p class="text-center p-4">Color Pairings</p>
	</div>
</div>

```

See the [Preset system](/docs/design/presets) for additional utility classes that automatically mix each color and contrast tone.

---

## Color Pairings

Provides a condensed syntax of dual-tone color values balanced to swap between light and dark mode. These are supported for all the same properties standard colors support (`bg`, `border`, `fill`, etc).

```
{property}-{color}-{lightModeShade}-{darkModeShade}
```

For example:

- `bg-surface-200-800`
- `text-primary-400-600`
- `border-secondary-50-950`

### How Pairings Work

Color Pairing are enabled through the use of the CSS [light-dark](https://developer.mozilla.org/en-US/docs/Web/CSS/color_value/light-dark) function. For example, the `text-primary-300-700` pairing will be implemented in your CSS bundle as follows:

```css
.text-primary-300-700 {
	color: light-dark(var(--color-primary-300), var(--color-primary-700));
}
```

This roughly equivalent to the following, just more compact, and enabling support for Tailwind's [Color Scheme](https://tailwindcss.com/docs/color-scheme) utilities.

```html
<div class="text-primary-300 dark:text-primary-700">...</div>
```

By default, Skeleton sets the overall app's color scheme to match light or dark mode.

### Pairing Previews

The following is a static representation of each pairing. Only `primary` is shown, but all Skeleton colors are supported.

The following shows actual Color Pairings. Toggle this website between light and dark mode to see how these react.

### When to use Pairings

Color Parings are useful for generating a hierarchy of visual layers, ranging from foreground to background elements. Each reuse the same color ramp but, but inverts the order when toggling from light to dark mode.

- We can use shade `950` for light mode and `50` from dark mode to represent our body text color.
- Then use shade `50` from light mode and `950` from dark mode to represent our app background.
- Use the static `500` shade for key branding elements, such as buttons or banners.
- Then reserve multiple layers between for elements such as cards, inputs, and more.

---

## Transparency

Both Skeleton Colors and Color Pairings support Tailwind's color transparency syntax.

```html
<div class="bg-primary-500/25">Primary Color @ 25% transparency</div>
<div class="bg-surface-50-950/60">Surface Pairing 50/950 @ 60% transparency</div>
```

# Presets

Canned styles for your interface elements.

```astro
---
import { BookmarkIcon } from 'lucide-react';

const diagramCircle = 'preset-tonal w-8 aspect-square flex justify-center items-center rounded-full';

const presets = [
	{
		label: 'Filled',
		class: 'preset-filled-primary-500',
	},
	{
		label: 'Tonal',
		class: 'preset-tonal-primary',
	},
	{
		label: 'Outlined',
		class: 'preset-outlined-primary-500',
	},
	{
		label: 'Glass',
		class: 'preset-glass-primary',
	},
	{
		label: 'Elevated',
		class: 'preset-filled-surface-100-900 shadow-xl',
	},
	{
		label: 'Ghost',
		class: 'hover:preset-tonal',
	},
	{
		label: 'Ghost (Icon)',
		class: 'hover:preset-tonal-primary',
		icon: BookmarkIcon,
	},
	{
		label: 'Gradient',
		class: 'preset-gradient',
	},
];
---

<div class="grid grid-cols-2 md:grid-cols-4 gap-10">
	{
		presets.map((preset, index) => (
			<div class="flex flex-col items-center gap-4">
				<button type="button" class={`btn ${preset.class}`}>
					{preset.icon ? <preset.icon /> : preset.label}
				</button>
				<div class={diagramCircle}>{index + 1}</div>
			</div>
		))
	}
</div>

<style>
	/* Create a custom preset in your global stylesheet */
	.preset-gradient {
		background-image: linear-gradient(-45deg, var(--color-primary-300), var(--color-primary-700));
		color: var(--color-primary-contrast-500);
	}
	.preset-glass-primary {
		background: color-mix(in oklab, var(--color-primary-500) 40%, transparent);
		box-shadow: 0 0px 30px color-mix(in oklab, var(--color-primary-500) 50%, transparent) inset;
		backdrop-filter: blur(16px);
	}
</style>

```

1. **Filled** - a filled preset of the primary brand color.
2. **Tonal** - a tonal preset of the primary brand color.
3. **Outlined** - an outlined preset of the primary brand color.
4. **Glass** - a custom preset using background transparency and backdrop blur.
5. **Elevated** - mixes a filled preset with a shadow.
6. **Ghost** - has no style by default, but shows a tonal preset on hover.
7. **Ghost Icon** - has no style by default, but shows a branded tonal preset on hover.
8. **Gradient** - a custom preset generated using Tailwind gradient primitives.

## Skeleton Presets

Skeleton's provides the following opinionated set of styles, including accessible backgrounds and text colors.

### Filled

```
preset-filled-{color}-{lightModeShade}-{darkModeShade}
```

```astro
<div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-2">
	{/* Neutral */}
	<div class="preset-filled flex items-center justify-center p-4">(neutral)</div>
	{/* Colors */}
	<div class="preset-filled-primary-950-50 flex items-center justify-center p-4">950-50</div>
	<div class="preset-filled-primary-900-100 flex items-center justify-center p-4">900-100</div>
	<div class="preset-filled-primary-800-200 flex items-center justify-center p-4">800-200</div>
	<div class="preset-filled-primary-700-300 flex items-center justify-center p-4">700-300</div>
	<div class="preset-filled-primary-600-400 flex items-center justify-center p-4">600-400</div>
	<div class="preset-filled-primary-500 flex items-center justify-center p-4">500</div>
	<div class="preset-filled-primary-400-600 flex items-center justify-center p-4">400-600</div>
	<div class="preset-filled-primary-300-700 flex items-center justify-center p-4">300-700</div>
	<div class="preset-filled-primary-200-800 flex items-center justify-center p-4">200-800</div>
	<div class="preset-filled-primary-100-900 flex items-center justify-center p-4">100-900</div>
	<div class="preset-filled-primary-50-950 flex items-center justify-center p-4">50-950</div>
</div>

```

### Tonal

```
preset-tonal-{color}
```

```astro
<div class="w-full grid grid-cols-2 lg:grid-cols-4 gap-2">
	{/* Neutral */}
	<div class="preset-tonal flex items-center justify-center p-4">(neutral)</div>
	{/* Colors */}
	<div class="preset-tonal-primary flex items-center justify-center p-4">primary</div>
	<div class="preset-tonal-secondary flex items-center justify-center p-4">secondary</div>
	<div class="preset-tonal-tertiary flex items-center justify-center p-4">tertiary</div>
	<div class="preset-tonal-success flex items-center justify-center p-4">success</div>
	<div class="preset-tonal-warning flex items-center justify-center p-4">warning</div>
	<div class="preset-tonal-error flex items-center justify-center p-4">error</div>
	<div class="preset-tonal-surface flex items-center justify-center p-4">surface</div>
</div>

```

### Outlined

```
preset-outlined-{color}-{shade}-{shade}
```

```astro
<div class="grid w-full grid-cols-2 gap-2 lg:grid-cols-4">
	{/* Neutral */}
	<div class="preset-outlined flex items-center justify-center p-4">(neutral)</div>
	{/* Colors */}
	<div class="preset-outlined-primary-950-50 flex items-center justify-center p-4">950-50</div>
	<div class="preset-outlined-primary-900-100 flex items-center justify-center p-4">900-100</div>
	<div class="preset-outlined-primary-800-200 flex items-center justify-center p-4">800-200</div>
	<div class="preset-outlined-primary-700-300 flex items-center justify-center p-4">700-300</div>
	<div class="preset-outlined-primary-600-400 flex items-center justify-center p-4">600-400</div>
	<div class="preset-outlined-primary-500 flex items-center justify-center p-4">500</div>
	<div class="preset-outlined-primary-400-600 flex items-center justify-center p-4">400-600</div>
	<div class="preset-outlined-primary-300-700 flex items-center justify-center p-4">300-700</div>
	<div class="preset-outlined-primary-200-800 flex items-center justify-center p-4">200-800</div>
	<div class="preset-outlined-primary-100-900 flex items-center justify-center p-4">100-900</div>
	<div class="preset-outlined-primary-50-950 flex items-center justify-center p-4">50-950</div>
</div>

```

## Custom Presets

Consider these best practices when creating presets:

- Custom presets are only limited by your imagination.
- Use any combination of Skeleton or Tailwind-provided primitive to generate a preset.
- Apply presets to any relevant element, including: buttons, cards, inputs, and more.
- Use a set naming convention, such as `preset-{foo}` to keep things standardized.
- Implement all presets in using Tailwind's [@utility directive](https://tailwindcss.com/docs/functions-and-directives#utility-directive) in your global stylesheet.
- Abstrast presets to a stylesheet or NPM package for shared used between projects.

Please be aware the following presets are not included by Skeleton. Rather, these are examples of how you might utilize the Preset pattern.

### Input Presets

```astro
<div class="w-full max-w-[320px] grid grid-rows-3 gap-4">
	<input type="text" class="input" value="Default Input State!" />
	<input type="text" class="input preset-input-success" value="Valid Input State!" />
	<input type="text" class="input preset-input-error" value="Invalid Input State!" />
</div>

<style>
	/* Add each custom preset to your global stylesheet. */
	.preset-input-success {
		background-color: var(--color-success-100);
		color: var(--color-success-900);
	}
	.preset-input-error {
		background-color: var(--color-error-100);
		color: var(--color-error-900);
	}
</style>

```

### Gradient Presets

Tailwind provides a number of powerful [Gradient](https://tailwindcss.com/docs/gradient-color-stops) utility classes that can be used to generate presets.

```astro
<div class="w-full space-y-4">
	<div class="grid grid-cols-3 gap-4">
		<button class="btn preset-gradient-one">Button</button>
		<button class="btn preset-gradient-two">Button</button>
		<button class="btn preset-gradient-three">Button</button>
	</div>
	<div class="grid grid-cols-3 gap-4 text-center">
		<div class="card p-4 preset-gradient-one">Card</div>
		<div class="card p-4 preset-gradient-two">Card</div>
		<div class="card p-4 preset-gradient-three">Card</div>
	</div>
</div>

<style>
	/* Create a custom preset in your global stylesheet */
	.preset-gradient-one {
		background-image: linear-gradient(45deg, var(--color-primary-500), var(--color-tertiary-500));
		color: var(--color-primary-contrast-500);
	}
	.preset-gradient-two {
		background-image: linear-gradient(45deg, var(--color-error-500), var(--color-warning-500));
		color: var(--color-error-contrast-500);
	}
	.preset-gradient-three {
		background-image: linear-gradient(45deg, var(--color-success-500), var(--color-warning-500));
		color: var(--color-success-contrast-500);
	}
</style>

```

### Glass Presets

```astro
---
const baseClasses = 'card p-4 text-white text-center flex justify-start items-center';
---

<div
	class="w-full space-y-4 bg-[url(https://picsum.photos/id/249/1024/1024)] bg-center bg-no-repeat bg-cover rounded-container flex justify-center items-center p-4"
>
	<div class="w-full grid grid-cols-1 gap-2">
		<div class:list={`${baseClasses} preset-glass-neutral`}>Neutral</div>
		<div class:list={`${baseClasses} preset-glass-primary`}>Primary</div>
		<div class:list={`${baseClasses} preset-glass-secondary`}>Secondary</div>
		<div class:list={`${baseClasses} preset-glass-tertiary`}>Tertiary</div>
		<div class:list={`${baseClasses} preset-glass-success`}>Success</div>
		<div class:list={`${baseClasses} preset-glass-warning`}>Warning</div>
		<div class:list={`${baseClasses} preset-glass-error`}>Error</div>
		<div class:list={`${baseClasses} preset-glass-surface`}>Surface</div>
	</div>
</div>

<style>
	/* Create a custom preset in your global stylesheet */
	.preset-glass-neutral {
		background: color-mix(in oklab, var(--color-surface-50-950) 30%, transparent);
		box-shadow: 0 0px 30px color-mix(in oklab, var(--color-surface-50-950) 30%, transparent) inset;
		backdrop-filter: blur(16px);
	}
	.preset-glass-primary {
		background: color-mix(in oklab, var(--color-primary-500) 40%, transparent);
		box-shadow: 0 0px 30px color-mix(in oklab, var(--color-primary-500) 50%, transparent) inset;
		backdrop-filter: blur(16px);
	}
	.preset-glass-secondary {
		background: color-mix(in oklab, var(--color-secondary-500) 40%, transparent);
		box-shadow: 0 0px 30px color-mix(in oklab, var(--color-secondary-500) 50%, transparent) inset;
		backdrop-filter: blur(16px);
	}
	.preset-glass-tertiary {
		background: color-mix(in oklab, var(--color-tertiary-500) 40%, transparent);
		box-shadow: 0 0px 30px color-mix(in oklab, var(--color-tertiary-500) 50%, transparent) inset;
		backdrop-filter: blur(16px);
	}
	.preset-glass-success {
		background: color-mix(in oklab, var(--color-success-500) 40%, transparent);
		box-shadow: 0 0px 30px color-mix(in oklab, var(--color-success-500) 50%, transparent) inset;
		backdrop-filter: blur(16px);
	}
	.preset-glass-warning {
		background: color-mix(in oklab, var(--color-warning-500) 40%, transparent);
		box-shadow: 0 0px 30px color-mix(in oklab, var(--color-warning-500) 50%, transparent) inset;
		backdrop-filter: blur(16px);
	}
	.preset-glass-error {
		background: color-mix(in oklab, var(--color-error-500) 40%, transparent);
		box-shadow: 0 0px 30px color-mix(in oklab, var(--color-error-500) 50%, transparent) inset;
		backdrop-filter: blur(16px);
	}
	.preset-glass-surface {
		background: color-mix(in oklab, var(--color-surface-500) 40%, transparent);
		box-shadow: 0 0px 30px color-mix(in oklab, var(--color-surface-500) 50%, transparent) inset;
		backdrop-filter: blur(16px);
	}
</style>

```

# Typography

The Skeleton typography system.

## Typographic Scale

Skeleton introduces customizable [Typographic Scale](https://designcode.io/typographic-scales) to Tailwind's [font-size](https://tailwindcss.com/docs/font-size) properties.

## Utility Classes

Use the following utility classes to quickly style semantic HTML elements. These classes are opt-in by default, providing a simple escape hatch when you need to break from convention.

### Headings

```astro
<div class="space-y-4">
	<h1 class="h1">Heading 1</h1>
	<h2 class="h2">Heading 2</h2>
	<h3 class="h3">Heading 3</h3>
	<h4 class="h4">Heading 4</h4>
	<h5 class="h5">Heading 5</h5>
	<h6 class="h6">Heading 6</h6>
</div>

```

### Paragraphs

```astro
<p>The quick brown fox jumps over the lazy dog</p>

```

### Blockquotes

```astro
<blockquote class="blockquote">
	"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, aliquid. Molestias, odio illum voluptatibus natus dignissimos, quidem
	est unde aspernatur veniam pariatur fuga distinctio esse in quas, repellendus neque reiciendis!"
</blockquote>

```

### Anchor

```astro
<a href="/" class="anchor">Anchor</a>

```

### Pre-Formatted

```astro
<pre class="pre">The quick brown fox jumps over the lazy dog.</pre>

```

### Code

```astro
<div>Insert the <code class="code">.example</code> class here.</div>

```

### Keyboard

```astro
<div>Press <kbd class="kbd">⌘</kbd> + <kbd class="kbd">C</kbd> to copy.</div>

```

### Insert & Delete

```astro
<div class="w-full">
	<del class="del"><s>Always</s> Gonna Give You Up</del>
	<ins class="ins" cite="https://youtu.be/dQw4w9WgXcQ" datetime="10-31-2022"> Never Gonna Give You Up </ins>
</div>

```

### Mark

```astro
<!-- prettier-ignore -->
<p>
	Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nesciunt, <mark class="mark">aliquid</mark>. Molestias, odio illum voluptatibus <mark class="mark">natus dignissimos</mark>, quidem est unde aspernatur veniam pariatur fuga.
</p>

```

## Lists

Skeleton defers to Tailwind's built-in utility classes for common list styles.

### Unordered

```astro
<ul class="list-inside list-disc space-y-2">
	<li>Id maxime optio soluta placeat ea eaque similique consectetur dicta tempore.</li>
	<li>Repellat veritatis et harum ad sint reprehenderit tenetur, possimus tempora.</li>
	<li>Lorem ipsum dolor sit amet consectetur adipisicing elit harum ad sint.</li>
</ul>

```

### Ordered

```astro
<ul class="list-inside list-decimal space-y-2">
	<li>Id maxime optio soluta placeat ea eaque similique consectetur dicta tempore.</li>
	<li>Repellat veritatis et harum ad sint reprehenderit tenetur, possimus tempora.</li>
	<li>Lorem ipsum dolor sit amet consectetur adipisicing elit harum ad sint.</li>
</ul>

```

### Basic

```astro
<ul class="list-inside list-none space-y-2">
	<li>Id maxime optio soluta placeat ea eaque similique consectetur dicta tempore.</li>
	<li>Repellat veritatis et harum ad sint reprehenderit tenetur, possimus tempora.</li>
	<li>Lorem ipsum dolor sit amet consectetur adipisicing elit harum ad sint.</li>
</ul>

```

### Description

```astro
<dl class="space-y-2">
	<div>
		<dt class="font-bold">Item A</dt>
		<dd class="opacity-60">Id maxime optio soluta placeat ea eaque similique consectetur dicta tempore.</dd>
	</div>
	<div>
		<dt class="font-bold">Item B</dt>
		<dd class="opacity-60">Repellat veritatis et harum ad sint reprehenderit tenetur, possimus tempora.</dd>
	</div>
	<div>
		<dt class="font-bold">Item C</dt>
		<dd class="opacity-60">Lorem ipsum dolor sit amet consectetur adipisicing elit harum ad sint.</dd>
	</div>
</dl>

```

### Navigation

```astro
<nav class="space-y-2">
	<!-- Optional Heading -->
	<p class="text-lg font-bold">Explore</p>
	<!-- / -->
	<ul class="space-y-2">
		<li>
			<a class="anchor" href="#">Home</a>
		</li>
		<li>
			<a class="anchor" href="#">About</a>
		</li>
		<li>
			<a class="anchor" href="#">Blog</a>
		</li>
	</ul>
</nav>

```

## Semantic Typography

When working with your designers, they may craft a semantic typography set for your project. To handle this, we recommend implementing [custom presets](/docs/design/presets#custom-presets) that mix CSS primitives with semantic HTML elements to replicate all desired styles. Feel free to use the boilerplate below, adding each style to your global stylesheet.

```svelte
<div class="table-wrap">
	<table class="table">
		<thead>
			<tr>
				<th>Class</th>
				<th>Preview</th>
			</tr>
		</thead>
		<tbody>
			<!-- preset-typo-display-4 -->
			<tr>
				<td><code class="code">preset-typo-display-4</code></td>
				<td><h1 class="preset-typo-display-4">Aa</h1></td>
			</tr>
			<!-- preset-typo-display-3 -->
			<tr>
				<td><code class="code">preset-typo-display-3</code></td>
				<td><h2 class="preset-typo-display-3">Aa</h2></td>
			</tr>
			<!-- preset-typo-display-2 -->
			<tr>
				<td><code class="code">preset-typo-display-2</code></td>
				<td><h3 class="preset-typo-display-2">Aa</h3></td>
			</tr>
			<!-- preset-typo-display-1 -->
			<tr>
				<td><code class="code">preset-typo-display-1</code></td>
				<td><h4 class="preset-typo-display-1">Aa</h4></td>
			</tr>
			<!-- preset-typo-headline -->
			<tr>
				<td><code class="code">preset-typo-headline</code></td>
				<td><p class="preset-typo-headline">Headline</p></td>
			</tr>
			<!-- preset-typo-title -->
			<tr>
				<td><code class="code">preset-typo-title</code></td>
				<td><p class="preset-typo-title">Title</p></td>
			</tr>
			<!-- preset-typo-subtitle -->
			<tr>
				<td><code class="code">preset-typo-subtitle</code></td>
				<td><p class="preset-typo-subtitle">Subtitle</p></td>
			</tr>
			<!-- preset-typo-body-1 -->
			<tr>
				<td><code class="code">preset-typo-body-1</code></td>
				<td>
					<p class="preset-typo-body-1">Body 1</p>
				</td>
			</tr>
			<!-- preset-typo-body-2 -->
			<tr>
				<td><code class="code">preset-typo-body-2</code></td>
				<td>
					<p class="preset-typo-body-2">Body 2</p>
				</td>
			</tr>
			<!-- preset-typo-caption -->
			<tr>
				<td><code class="code">preset-typo-caption</code></td>
				<td><span class="preset-typo-caption">Caption</span></td>
			</tr>
			<!-- preset-typo-menu -->
			<tr>
				<td><code class="code">preset-typo-menu</code></td>
				<td><span class="preset-typo-menu">Menu</span></td>
			</tr>
			<!-- preset-typo-button -->
			<tr>
				<td><code class="code">preset-typo-button</code></td>
				<td><span class="preset-typo-button">Button</span></td>
			</tr>
		</tbody>
	</table>
</div>

<style lang="postcss">
	/* IGNORE THIS: this is only required for our example <style> block. */
	/* https://tailwindcss.com/docs/functions-and-directives#reference-directive */
	@reference "@/app.css";

	/*
		Copy the following classes to your global stylesheet. Rename and modify as desired.
		Reference: http://skeleton.dev/docs/get-started/core-api#typography
	*/

	/* Headings */
	.preset-typo-display-4,
	.preset-typo-display-3,
	.preset-typo-display-2,
	.preset-typo-display-1,
	.preset-typo-headline,
	.preset-typo-title,
	.preset-typo-subtitle,
	.preset-typo-caption,
	.preset-typo-menu,
	.preset-typo-button {
		color: var(--heading-font-color);
		font-family: var(--heading-font-family);
		font-weight: var(--heading-font-weight);
		@variant dark {
			color: var(--heading-font-color-dark);
		}
	}

	/* Body */
	.preset-typo-body-1,
	.preset-typo-body-2,
	.preset-typo-caption,
	.preset-typo-menu,
	.preset-typo-button {
		color: var(--heading-font-color);
		@variant dark {
			color: var(--heading-font-color-dark);
		}
	}

	/* Unique Properties */
	.preset-typo-display-4 {
		font-size: var(--text-7xl);
		@variant lg {
			font-size: var(--text-9xl);
		}
	}
	.preset-typo-display-3 {
		font-size: var(--text-6xl);
		@variant lg {
			font-size: var(--text-8xl);
		}
	}
	.preset-typo-display-2 {
		font-size: var(--text-5xl);
		@variant lg {
			font-size: var(--text-7xl);
		}
	}
	.preset-typo-display-1 {
		font-size: var(--text-4xl);
		@variant lg {
			font-size: var(--text-6xl);
		}
	}
	.preset-typo-headline {
		font-size: var(--text-2xl);
		@variant lg {
			font-size: var(--text-4xl);
		}
	}
	.preset-typo-title {
		font-size: var(--text-xl);
		@variant lg {
			font-size: var(--text-3xl);
		}
	}
	.preset-typo-subtitle {
		font-size: var(--text-base);
		font-family: var(--heading-font-family);
		color: var(--color-surface-700-300);
		@variant lg {
			font-size: var(--text-xl);
		}
	}
	.preset-typo-body-1 {
		font-size: var(--text-xl);
		@variant lg {
			font-size: var(--text-3xl);
		}
	}
	.preset-typo-body-2 {
		font-size: var(--text-lg);
		@variant lg {
			font-size: var(--text-xl);
		}
	}
	.preset-typo-caption {
		font-size: var(--text-sm);
		color: var(--color-surface-700-300);
	}
	.preset-typo-menu {
		font-weight: bold;
	}
	.preset-typo-button {
		font-weight: bold;
	}
</style>
```

# Spacing

Set a dynamic scale for application whitespace.

This is enabled by the [Tailwind spacing system](https://tailwindcss.com/blog/tailwindcss-v4#dynamic-utility-values-and-variants).

This affects the following utilities.

- `padding`
- `margin`
- `width`
- `minWidth`
- `maxWidth`
- `height`
- `minHeight`
- `maxHeight`
- `gap`
- `inset`
- `space`
- `translate`

# Badges

Provides a robust set of non-interactive badge styles.

```astro
---
import { HeartIcon } from 'lucide-react';
---

<div class="flex items-center gap-4">
	<!-- A simple icon badge -->
	<span class="badge-icon preset-filled">
		<HeartIcon size={16} />
	</span>
	<!-- A standard badge -->
	<span class="badge preset-filled">Badge</span>
	<!-- A badge + icon -->
	<span class="badge preset-filled">
		<HeartIcon size={16} />
		<span>Badge</span>
	</span>
</div>

```

## Presets

Provides full support of [Presets](/docs/design/presets).

```html
<div class="space-y-4">
	<div class="flex gap-4">
		<span class="badge preset-filled-primary-500">Badge</span>
		<span class="badge preset-tonal-primary">Badge</span>
		<span class="badge preset-outlined-primary-500">Badge</span>
	</div>
	<div class="flex gap-4">
		<span class="badge preset-filled-secondary-500">Badge</span>
		<span class="badge preset-tonal-secondary">Badge</span>
		<span class="badge preset-outlined-secondary-500">Badge</span>
	</div>
	<div class="flex gap-4">
		<span class="badge preset-filled-tertiary-500">Badge</span>
		<span class="badge preset-tonal-tertiary">Badge</span>
		<span class="badge preset-outlined-tertiary-500">Badge</span>
	</div>
	<div class="flex gap-4">
		<span class="badge preset-filled-success-500">Badge</span>
		<span class="badge preset-tonal-success">Badge</span>
		<span class="badge preset-outlined-success-500">Badge</span>
	</div>
	<div class="flex gap-4">
		<span class="badge preset-filled-warning-500">Badge</span>
		<span class="badge preset-tonal-warning">Badge</span>
		<span class="badge preset-outlined-warning-500">Badge</span>
	</div>
	<div class="flex gap-4">
		<span class="badge preset-filled-error-500">Badge</span>
		<span class="badge preset-tonal-error">Badge</span>
		<span class="badge preset-outlined-error-500">Badge</span>
	</div>
	<div class="flex gap-4">
		<span class="badge preset-filled-surface-500">Badge</span>
		<span class="badge preset-tonal-surface">Badge</span>
		<span class="badge preset-outlined-surface-500">Badge</span>
	</div>
</div>
```

## Overlap

Use `badge-icon` to create overlapping numeric or icon badges.

```astro
---
const imgSrc =
	'https://images.unsplash.com/photo-1620122303020-87ec826cf70d?q=80&w=256&h=256&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
---

<div class="relative inline-block">
	<span class="badge-icon preset-filled-primary-500 absolute -right-0 -top-0 z-10">2</span>
	<img class="size-20 overflow-hidden rounded-full grayscale" src={imgSrc} alt="Avatar" />
</div>

```

# Buttons

Provide a variety of button, including customizable sizes and types.

```astro
---
import { ArrowRightIcon } from 'lucide-react';
---

<div class="flex items-center gap-4">
	<!-- A simple icon button -->
	<button type="button" class="btn-icon preset-filled" title="Go" aria-label="Go"><ArrowRightIcon size={18} /></button>
	<!-- A standard button -->
	<button type="button" class="btn preset-filled">Button</button>
	<!-- A button + icon -->
	<button type="button" class="btn preset-filled">
		<span>Button</span>
		<ArrowRightIcon size={18} />
	</button>
</div>

```

## Presets

Provides full support of [Presets](/docs/design/presets).

```astro
<div class="space-y-4">
	<div class="flex gap-4">
		<button type="button" class="btn preset-filled-primary-500">Button</button>
		<button type="button" class="btn preset-tonal-primary">Button</button>
		<button type="button" class="btn preset-outlined-primary-500">Button</button>
	</div>
	<div class="flex gap-4">
		<button type="button" class="btn preset-filled-secondary-500">Button</button>
		<button type="button" class="btn preset-tonal-secondary">Button</button>
		<button type="button" class="btn preset-outlined-secondary-500">Button</button>
	</div>
	<div class="flex gap-4">
		<button type="button" class="btn preset-filled-tertiary-500">Button</button>
		<button type="button" class="btn preset-tonal-tertiary">Button</button>
		<button type="button" class="btn preset-outlined-tertiary-500">Button</button>
	</div>
	<div class="flex gap-4">
		<button type="button" class="btn preset-filled-success-500">Button</button>
		<button type="button" class="btn preset-tonal-success">Button</button>
		<button type="button" class="btn preset-outlined-success-500">Button</button>
	</div>
	<div class="flex gap-4">
		<button type="button" class="btn preset-filled-warning-500">Button</button>
		<button type="button" class="btn preset-tonal-warning">Button</button>
		<button type="button" class="btn preset-outlined-warning-500">Button</button>
	</div>
	<div class="flex gap-4">
		<button type="button" class="btn preset-filled-error-500">Button</button>
		<button type="button" class="btn preset-tonal-error">Button</button>
		<button type="button" class="btn preset-outlined-error-500">Button</button>
	</div>
	<div class="flex gap-4">
		<button type="button" class="btn preset-filled-surface-500">Button</button>
		<button type="button" class="btn preset-tonal-surface">Button</button>
		<button type="button" class="btn preset-outlined-surface-500">Button</button>
	</div>
</div>

```

## Sizes

```astro
<div class="flex items-center gap-4">
	<button type="button" class="btn btn-sm preset-filled">Small</button>
	<button type="button" class="btn btn-base preset-filled">Base</button>
	<button type="button" class="btn btn-lg preset-filled">Large</button>
</div>

```

## Disabled

When applied to a `<button>` element, you can use the `disabled` attribute.

```astro
<button type="button" class="btn preset-filled-primary-500" disabled>Button</button>

```

## Group

```astro
<nav class="btn-group preset-outlined-surface-200-800 flex-col p-2 md:flex-row">
	<button type="button" class="btn preset-filled">January</button>
	<button type="button" class="btn hover:preset-tonal">February</button>
	<button type="button" class="btn hover:preset-tonal">March</button>
</nav>

```

# Cards

Provides container elements that wrap and separate content.

```astro
<div class="card w-full max-w-md preset-filled-surface-100-900 p-4 text-center">
	<p>Card</p>
</div>

```

```astro
---
const imgSrc =
	'https://images.unsplash.com/photo-1463171515643-952cee54d42a?q=80&w=450&h=190&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
---

<a
	href="#"
	class="card preset-filled-surface-100-900 border-[1px] border-surface-200-800 card-hover divide-surface-200-800 block max-w-md divide-y overflow-hidden"
>
	{/* Header */}
	<header>
		<img src={imgSrc} class="aspect-[21/9] w-full grayscale hue-rotate-90" alt="banner" />
	</header>
	{/* Article */}
	<article class="space-y-4 p-4">
		<div>
			<h2 class="h6">Announcements</h2>
			<h3 class="h3">Skeleton is Awesome</h3>
		</div>
		<p class="opacity-60">
			Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam aspernatur provident eveniet eligendi cumque consequatur tempore sint
			nisi sapiente. Iste beatae laboriosam iure molestias cum expedita architecto itaque quae rem.
		</p>
	</article>
	{/* Footer */}
	<footer class="flex items-center justify-between gap-4 p-4">
		<small class="opacity-60">By Alex</small>
		<small class="opacity-60">On {new Date().toLocaleDateString()}</small>
	</footer>
</a>

```

## Presets

Provides full support of [Presets](/docs/design/presets).

```astro
<div class="w-full grid grid-cols-3 gap-4">
	<div class="card p-4 preset-filled-primary-500">Card</div>
	<div class="card p-4 preset-tonal-primary">Card</div>
	<div class="card p-4 preset-outlined-primary-500">Card</div>

	<div class="card p-4 preset-filled-secondary-500">Card</div>
	<div class="card p-4 preset-tonal-secondary">Card</div>
	<div class="card p-4 preset-outlined-secondary-500">Card</div>

	<div class="card p-4 preset-filled-tertiary-500">Card</div>
	<div class="card p-4 preset-tonal-tertiary">Card</div>
	<div class="card p-4 preset-outlined-tertiary-500">Card</div>

	<div class="card p-4 preset-filled-success-500">Card</div>
	<div class="card p-4 preset-tonal-success">Card</div>
	<div class="card p-4 preset-outlined-success-500">Card</div>

	<div class="card p-4 preset-filled-warning-500">Card</div>
	<div class="card p-4 preset-tonal-warning">Card</div>
	<div class="card p-4 preset-outlined-warning-500">Card</div>

	<div class="card p-4 preset-filled-error-500">Card</div>
	<div class="card p-4 preset-tonal-error">Card</div>
	<div class="card p-4 preset-outlined-error-500">Card</div>

	<div class="card p-4 preset-filled-surface-500">Card</div>
	<div class="card p-4 preset-tonal-surface">Card</div>
	<div class="card p-4 preset-outlined-surface-500">Card</div>
</div>

```

# Chips

Provides a robust set of interactive chip styles.

```astro
---
import { CheckIcon } from 'lucide-react';
---

<div class="flex items-center gap-4">
	<!-- A simple icon chip -->
	<button type="button" class="chip-icon preset-filled">
		<CheckIcon size={16} />
	</button>
	<!-- A standard chip -->
	<button type="button" class="chip preset-filled">Chip</button>
	<!-- A chip + icon -->
	<button type="button" class="chip preset-filled">
		<span>Chip</span>
		<CheckIcon size={16} />
	</button>
</div>

```

## Presets

Provides full support of [Presets](/docs/design/presets).

```astro
<div class="space-y-4">
	<div class="flex gap-4">
		<button type="button" class="chip preset-filled-primary-500">Chip</button>
		<button type="button" class="chip preset-tonal-primary">Chip</button>
		<button type="button" class="chip preset-outlined-primary-500">Chip</button>
	</div>
	<div class="flex gap-4">
		<button type="button" class="chip preset-filled-secondary-500">Chip</button>
		<button type="button" class="chip preset-tonal-secondary">Chip</button>
		<button type="button" class="chip preset-outlined-secondary-500">Chip</button>
	</div>
	<div class="flex gap-4">
		<button type="button" class="chip preset-filled-tertiary-500">Chip</button>
		<button type="button" class="chip preset-tonal-tertiary">Chip</button>
		<button type="button" class="chip preset-outlined-tertiary-500">Chip</button>
	</div>
	<div class="flex gap-4">
		<button type="button" class="chip preset-filled-success-500">Chip</button>
		<button type="button" class="chip preset-tonal-success">Chip</button>
		<button type="button" class="chip preset-outlined-success-500">Chip</button>
	</div>
	<div class="flex gap-4">
		<button type="button" class="chip preset-filled-warning-500">Chip</button>
		<button type="button" class="chip preset-tonal-warning">Chip</button>
		<button type="button" class="chip preset-outlined-warning-500">Chip</button>
	</div>
	<div class="flex gap-4">
		<button type="button" class="chip preset-filled-error-500">Chip</button>
		<button type="button" class="chip preset-tonal-error">Chip</button>
		<button type="button" class="chip preset-outlined-error-500">Chip</button>
	</div>
	<div class="flex gap-4">
		<button type="button" class="chip preset-filled-surface-500">Chip</button>
		<button type="button" class="chip preset-tonal-surface">Chip</button>
		<button type="button" class="chip preset-outlined-surface-500">Chip</button>
	</div>
</div>

```

## Disabled

When applied to a `<button>` element, you can use the `disabled` attribute.

```astro
<button type="button" class="chip preset-filled" disabled>Chip</button>

```

## Selection

# Dividers

Horizontal and vertical rule styling.

```astro
<div class="w-full space-y-4 text-center">
	<p>Above the divider.</p>

	<hr class="hr" />

	<p>Below the divider.</p>
</div>

```

## Size

Use Tailwind's [border width](https://tailwindcss.com/docs/border-width) utilities to adjust thickness.

```astro
<div class="w-full space-y-4">
	<code class="inline-block code">Default</code>
	<hr class="hr" />

	<code class="inline-block code">border-t-2</code>
	<hr class="hr border-t-2" />

	<code class="inline-block code">border-t-4</code>
	<hr class="hr border-t-4" />

	<code class="inline-block code">border-t-8</code>
	<hr class="hr border-t-8" />
</div>

```

## Style

Use Tailwind's [border style](https://tailwindcss.com/docs/border-style) utilities to adjust visual style.

```astro
<div class="w-full space-y-4">
	<code class="inline-block code">border-solid</code>
	<hr class="hr border-solid" />

	<code class="inline-block code">border-dashed</code>
	<hr class="hr border-dashed" />

	<code class="inline-block code">border-dotted</code>
	<hr class="hr border-dotted" />

	<code class="inline-block code">border-double</code>
	<hr class="hr border-4 border-double" />
</div>

```

## Colors

Use any Tailwind or Skeleton [colors or pairing](/docs/design/colors).

```astro
<div class="w-full space-y-4">
	<code class="inline-block code">border-primary-500</code>
	<hr class="hr border-primary-500" />

	<code class="inline-block code">border-secondary-500</code>
	<hr class="hr border-secondary-500" />

	<code class="inline-block code">border-tertiary-500</code>
	<hr class="hr border-tertiary-500" />

	<code class="inline-block code">border-success-500</code>
	<hr class="hr border-success-500" />

	<code class="inline-block code">border-warning-500</code>
	<hr class="hr border-warning-500" />

	<code class="inline-block code">border-error-500</code>
	<hr class="hr border-error-500" />

	<code class="inline-block code">border-surface-950-50</code>
	<hr class="hr border-surface-950-50" />
</div>

```

## Vertical

Use `vr` for a vertical rule, which supports all above styles. Make sure to set the height.

```astro
<div class="grid h-20 grid-cols-[1fr_auto_auto_auto_auto_1fr] items-center gap-4">
	<span><code class="code">Default</code> &rarr;</span>

	<span class="vr"></span>
	<span class="vr border-l-2"></span>
	<span class="vr border-l-4"></span>
	<span class="vr border-l-8"></span>

	<span>&larr; <code class="code">border-l-8</code></span>
</div>

```

# Forms and Inputs

Various form and input styles.

## Prerequisites

### Tailwind Forms

Skeleton relies on the official [Tailwind Forms](https://github.com/tailwindlabs/tailwindcss-forms) plugin to normalize form styling. This plugin is required if you wish to make use of any utility classes provided on this page.

Install the `@tailwindcss/forms` package.

```sh
npm install -D @tailwindcss/forms
```

Implement the plugin using the `@plugin` directive immediately following the `tailwindcss` import.

```css {2}
@import 'tailwindcss';
@plugin '@tailwindcss/forms';

/* ...Skeleton config here... */
```

### Browser Support

The display of native and semantic HTML form elements can vary between both operating systems and browsers. Skeleton does its best to adhere to progressive enhancement best practices. However, we advise you validate support for each element per your target audience.

## Inputs

```astro
<label class="label">
	<span class="label-text">Input</span>
	<input class="input" type="text" placeholder="Input" />
</label>

```

## Select

```astro
<form class="mx-auto w-full max-w-md space-y-4">
	<!-- Default -->
	<select class="select">
		<option value="1">Option 1</option>
		<option value="2">Option 2</option>
		<option value="3">Option 3</option>
		<option value="4">Option 4</option>
		<option value="5">Option 5</option>
	</select>

	<!--
		NOTE: the following Select element variants are included purely for legacy support. It is not longer advised you use these variants in production apps. Currently the styles are too limited and the style API vary greatly between browser vendors. Expect these styles to be removed in the next major version of Skeleton (v4.0). In the meantime, consider a replacement using a custom Listbox component if you need this type of interface in your application. We've provided some resources below to guide you in this process.

		ARIA APG Guidelines:
		https://www.w3.org/WAI/ARIA/apg/patterns/listbox/

		Zag.js Listbox component:
		(NOTE: this will come to Skeleton in the future)
		https://zagjs.com/components/react/listbox
		https://zagjs.com/components/svelte/listbox

		Similar components may also exist or third party libraries such as Bits, Melt, or Radix:
		https://www.skeleton.dev/docs/headless/bits-ui
		https://www.skeleton.dev/docs/headless/melt-ui
		https://www.skeleton.dev/docs/headless/radix-ui
	-->

	<!-- Size Variant -->
	<!-- <select class="select rounded-container" size="4" value="1">
		<option value="1">Option 1</option>
		<option value="2">Option 2</option>
		<option value="3">Option 3</option>
		<option value="4">Option 4</option>
		<option value="5">Option 5</option>
	</select> -->

	<!-- Multiple Variant -->
	<!-- <select class="select rounded-container" multiple value="['1', '2']">
		<option value="1">Option 1</option>
		<option value="2">Option 2</option>
		<option value="3">Option 3</option>
		<option value="4">Option 4</option>
		<option value="5">Option 5</option>
	</select> -->
</form>

```

## Checkboxes

```astro
<form class="space-y-2">
	<label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" checked />
		<p>Option 1</p>
	</label>
	<label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" />
		<p>Option 2</p>
	</label>
	<label class="flex items-center space-x-2">
		<input class="checkbox" type="checkbox" />
		<p>Option 3</p>
	</label>
</form>

```

## Radio Groups

```astro
<form class="space-y-2">
	<label class="flex items-center space-x-2">
		<input class="radio" type="radio" checked name="radio-direct" value="1" />
		<p>Option 1</p>
	</label>
	<label class="flex items-center space-x-2">
		<input class="radio" type="radio" name="radio-direct" value="2" />
		<p>Option 2</p>
	</label>
	<label class="flex items-center space-x-2">
		<input class="radio" type="radio" name="radio-direct" value="3" />
		<p>Option 3</p>
	</label>
</form>

```

## Kitchen Sink

Display and functionality of these elements may vary greatly between devices and browsers.

```astro
<form class="mx-auto w-full max-w-md space-y-4">
	<!-- Date Picker -->
	<label class="label">
		<span class="label-text">Date</span>
		<input class="input" type="date" />
	</label>
	<!-- File Input -->
	<label class="label">
		<span class="label-text">File Input</span>
		<input class="input" type="file" />
	</label>
	<!-- Range -->
	<label class="label">
		<span class="label-text">Range</span>
		<input class="input" type="range" value="75" max="100" />
	</label>
	<!-- Progress -->
	<label class="label">
		<span class="label-text">Progress</span>
		<progress class="progress" value="50" max="100"></progress>
	</label>
	<!-- Color -->
	<!-- TODO: convert to mini-component for reactive value -->
	<div class="grid grid-cols-[auto_1fr] gap-2">
		<input class="input" type="color" value="#bada55" />
		<input class="input" type="text" value="#bada55" readonly tabindex="-1" />
	</div>
</form>

```

## Groups

Input groups support a subset of form elements and button styles. These pair well with [Presets](/docs/design/presets).

```astro
---
import { CheckIcon, CircleDollarSignIcon, SearchIcon } from 'lucide-react';
---

<form class="w-full space-y-8">
	<!-- Website -->
	<div class="input-group grid-cols-[auto_1fr_auto]">
		<div class="ig-cell preset-tonal">https://</div>
		<input class="ig-input" type="text" placeholder="www.example.com" />
	</div>
	<!-- Amount -->
	<div class="input-group grid-cols-[auto_1fr_auto]">
		<div class="ig-cell preset-tonal">
			<CircleDollarSignIcon size={16} />
		</div>
		<input class="ig-input" type="text" placeholder="Amount" />
		<select class="ig-select">
			<option>USD</option>
			<option>CAD</option>
			<option>EUR</option>
		</select>
	</div>
	<!-- Username -->
	<div class="input-group grid-cols-[1fr_auto]">
		<input class="ig-input" type="text" placeholder="Enter Username..." />
		<button class="ig-btn preset-filled" title="Username already in use.">
			<CheckIcon size={16} />
		</button>
	</div>
	<!-- Search -->
	<div class="input-group grid-cols-[auto_1fr_auto]">
		<div class="ig-cell preset-tonal">
			<SearchIcon size={16} />
		</div>
		<input class="ig-input" type="search" placeholder="Search..." />
		<button class="ig-btn preset-filled">Submit</button>
	</div>
</form>

```

\| Class | Usage |
\| ------------- | --------------------------------------- |
\| `input-group` | Defines the parent input group set. |
\| `ig-cell` | Defines a child cell for text or icons. |
\| `ig-input` | Defines a child input of `type="text"`. |
\| `ig-select` | Defines a child select element. |
\| `ig-btn` | Defines a child button. |

# Placeholders

Provides "skeleton" placeholders that can display while content loads.

```html
<div class="w-full space-y-4">
	<div class="flex items-center justify-between">
		<div class="flex items-center justify-center space-x-4">
			<div class="placeholder-circle size-16 animate-pulse"></div>
			<div class="placeholder-circle size-14 animate-pulse"></div>
			<div class="placeholder-circle size-10 animate-pulse"></div>
		</div>
	</div>
	<div class="space-y-4">
		<div class="placeholder animate-pulse"></div>
		<div class="grid grid-cols-4 gap-4">
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
			<div class="placeholder animate-pulse"></div>
		</div>
		<div class="placeholder animate-pulse"></div>
		<div class="placeholder animate-pulse"></div>
	</div>
</div>
```

## Animated

```html
<div class="placeholder animate-pulse">...</div>
```

# Tables

Provides a set of styles for native HTML table elements.

```astro
---
const tableData = [
	{ position: '0', name: 'Iron', symbol: 'Fe', atomic_no: '26' },
	{ position: '1', name: 'Rhodium', symbol: 'Rh', atomic_no: '45' },
	{ position: '2', name: 'Iodine', symbol: 'I', atomic_no: '53' },
	{ position: '3', name: 'Radon', symbol: 'Rn', atomic_no: '86' },
	{ position: '4', name: 'Technetium', symbol: 'Tc', atomic_no: '43' },
];
---

<div class="table-wrap">
	<table class="table caption-bottom">
		<tbody class="[&>tr]:hover:preset-tonal-primary">
			{
				tableData.map((row) => (
					<tr>
						<td>{row.position}</td>
						<td>{row.symbol}</td>
						<td>{row.name}</td>
						<td class="text-right">{row.atomic_no}</td>
					</tr>
				))
			}
		</tbody>
	</table>
</div>

```

## Extras

Optionally add a header, footer, and caption.

```astro
---
const tableData = [
	{ position: '0', name: 'Iron', symbol: 'Fe', atomic_no: '26' },
	{ position: '1', name: 'Rhodium', symbol: 'Rh', atomic_no: '45' },
	{ position: '2', name: 'Iodine', symbol: 'I', atomic_no: '53' },
	{ position: '3', name: 'Radon', symbol: 'Rn', atomic_no: '86' },
	{ position: '4', name: 'Technetium', symbol: 'Tc', atomic_no: '43' },
];
---

<div class="table-wrap">
	<table class="table caption-bottom">
		<caption class="pt-4">A list of elements from the periodic table.</caption>
		<thead>
			<tr>
				<th>Position</th>
				<th>Symbol</th>
				<th>Name</th>
				<th class="!text-right">Weight</th>
			</tr>
		</thead>
		<tbody class="[&>tr]:hover:preset-tonal-primary">
			{
				tableData.map((row) => (
					<tr>
						<td>{row.position}</td>
						<td>{row.symbol}</td>
						<td>{row.name}</td>
						<td class="text-right">{row.atomic_no}</td>
					</tr>
				))
			}
		</tbody>
		<tfoot>
			<tr>
				<td colspan="3">Total</td>
				<td class="text-right">{tableData.length} Elements</td>
			</tr>
		</tfoot>
	</table>
</div>

```

## Navigation

Native HTML tables do not support interaction. For accessibility, use anchors or buttons within the last cell.

```astro
---
const tableData = [
	{ first: 'Liam', last: 'Steele', email: 'liam@email.com' },
	{ first: 'Athena', last: 'Marks', email: 'athena@email.com' },
	{ first: 'Angela', last: 'Rivers', email: 'angela@email.com' },
];
---

<div class="table-wrap">
	<table class="table caption-bottom">
		<tbody>
			<thead>
				<tr>
					<th>First Name</th>
					<th>Last Name</th>
					<th>Email</th>
					<th>&nbsp;</th>
				</tr>
			</thead>
			{
				tableData.map((row) => (
					<tr>
						<td>{row.first}</td>
						<td>{row.last}</td>
						<td>{row.email}</td>
						<td class="text-right">
							<a class="btn btn-sm preset-filled" href="#">
								View &rarr;
							</a>
						</td>
					</tr>
				))
			}
		</tbody>
	</table>
</div>

```

## Layout

See [Tailwind's utility classes](https://tailwindcss.com/docs/table-layout) for adjusting the table layout algorithm. Apply this to the Table element.

## Hover Rows

Add a visual hover effect using the following Tailwind syntax.

```html
<tbody class="[&>tr]:hover:preset-tonal-primary">
	...
</tbody>
```

## Pagination

Pair with the Skeleton [Pagination](/docs/components/pagination/react) component for large data sets.

# Accordion

Divide content into collapsible sections.

```svelte
<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton-svelte';

	// Attribution: https://www.healthline.com/health/fun-facts-about-the-skeletal-system#8-More-than-half-your-bones-are-in-your-hands-and-feet
	const content = [
		{
			id: '001',
			title: 'Your skeleton is made of more than 200 bones',
			description:
				'Inside your body are 206 bones. Each bone plays a very important role in making all the mechanics of your body function properly. If a bone is broken, all the bones around it can’t perform their duty properly.'
		},
		{
			id: '002',
			title: 'The smallest bone in the body is in your ear',
			description:
				'The stapes, a bone in your inner ear, is the smallest of all your bones. This bone is also sometimes called the stirrup because of its Y shape. Together with the anvil and hammer bones, the stapes helps translate sounds you hear into waves your brain can understand.'
		},
		{
			id: '003',
			title: 'One bone isn’t connected to any other bones',
			description:
				'The hyoid bone, which is in your throat, is the only bone that doesn’t connect to a joint. The hyoid is responsible for holding your tongue in place.'
		}
	];
</script>

<Accordion>
	{#each content as item (item)}
		<Accordion.Item value={item.id}>
			<h3>
				<Accordion.ItemTrigger class="font-bold">{item.title}</Accordion.ItemTrigger>
			</h3>
			<Accordion.ItemContent>{item.description}</Accordion.ItemContent>
		</Accordion.Item>
	{/each}
</Accordion>
```

## Controlled

Use `value` and `onValueChange` to control the value of the Accordion.

```svelte
<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton-svelte';

	let value = $state(['1']);
</script>

<Accordion {value} onValueChange={(details) => (value = details.value)}>
	{#each ['1', '2', '3'] as item (item)}
		<Accordion.Item value={item}>
			<h3>
				<Accordion.ItemTrigger>Item {item}</Accordion.ItemTrigger>
			</h3>
			<Accordion.ItemContent>Content for item {item}</Accordion.ItemContent>
		</Accordion.Item>
	{/each}
</Accordion>
```

## Indicator

Add an indicator to the trigger with `Accordion.ItemIndicator`.

```svelte
<script lang="ts">
	import { PlusIcon, MinusIcon } from '@lucide/svelte';
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
</script>

<Accordion>
	{#each ['1', '2', '3'] as item (item)}
		<Accordion.Item value={item}>
			<h3>
				<Accordion.ItemTrigger class="flex items-center justify-between">
					Item {item}
					<Accordion.ItemIndicator class="group">
						<MinusIcon class="hidden size-4 group-data-[state=open]:block" />
						<PlusIcon class="block size-4 group-data-[state=open]:hidden" />
					</Accordion.ItemIndicator>
				</Accordion.ItemTrigger>
			</h3>
			<Accordion.ItemContent>Content for item {item}</Accordion.ItemContent>
		</Accordion.Item>
	{/each}
</Accordion>
```

## Collapsible

By default you can't close open items. Adding `collapsible` changes this behavior.

```svelte
<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
</script>

<Accordion collapsible>
	{#each ['1', '2', '3'] as item (item)}
		<Accordion.Item value={item}>
			<h3>
				<Accordion.ItemTrigger>Item {item}</Accordion.ItemTrigger>
			</h3>
			<Accordion.ItemContent>Content for item {item}</Accordion.ItemContent>
		</Accordion.Item>
	{/each}
</Accordion>
```

## Multiple

Adding `multiple` allows items to open independently.

```svelte
<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
</script>

<Accordion multiple>
	{#each ['1', '2', '3'] as item (item)}
		<Accordion.Item value={item}>
			<h3>
				<Accordion.ItemTrigger>Item {item}</Accordion.ItemTrigger>
			</h3>
			<Accordion.ItemContent>Content for item {item}</Accordion.ItemContent>
		</Accordion.Item>
	{/each}
</Accordion>
```

## Orientation

Use the `orientation` prop to change the layout direction of the Accordion.

```svelte
<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
</script>

<Accordion orientation="horizontal">
	{#each ['1', '2', '3'] as item (item)}
		<Accordion.Item value={item} class="data-[state=open]:flex-1">
			<h3>
				<Accordion.ItemTrigger>Item {item}</Accordion.ItemTrigger>
			</h3>
			<Accordion.ItemContent>Content for item {item}</Accordion.ItemContent>
		</Accordion.Item>
	{/each}
</Accordion>
```

## Direction

```svelte
<script lang="ts">
	import { Accordion } from '@skeletonlabs/skeleton-svelte';
</script>

<Accordion dir="rtl">
	{#each ['1', '2', '3'] as item (item)}
		<Accordion.Item value={item}>
			<h3>
				<Accordion.ItemTrigger>Item {item}</Accordion.ItemTrigger>
			</h3>
			<Accordion.ItemContent>Content for item {item}</Accordion.ItemContent>
		</Accordion.Item>
	{/each}
</Accordion>
```

## API Reference

### AccordionRootProps

| Property       | Default    | Type                                                                                                                                                       | Description                                                                                                           |
| -------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| ids?           | -          | Partial\<\{ root: string; item: (value: string) => string; itemContent: (value: string) => string; itemTrigger: (value: string) => string; }> \| undefined | The ids of the elements in the accordion. Useful for composition.                                                     |
| multiple?      | false      | boolean \| undefined                                                                                                                                       | Whether multiple accordion items can be expanded at the same time.                                                    |
| collapsible?   | false      | boolean \| undefined                                                                                                                                       | Whether an accordion item can be closed after it has been expanded.                                                   |
| value?         | -          | string\[] \| undefined                                                                                                                                     | The controlled value of the expanded accordion items.                                                                 |
| defaultValue?  | -          | string\[] \| undefined                                                                                                                                     | The initial value of the expanded accordion items.&#xA;Use when you don't need to control the value of the accordion. |
| disabled?      | -          | boolean \| undefined                                                                                                                                       | Whether the accordion items are disabled                                                                              |
| onValueChange? | -          | ((details: ValueChangeDetails) => void) \| undefined                                                                                                       | The callback fired when the state of expanded/collapsed accordion items changes.                                      |
| onFocusChange? | -          | ((details: FocusChangeDetails) => void) \| undefined                                                                                                       | The callback fired when the focused accordion item changes.                                                           |
| orientation?   | "vertical" | "horizontal" \| "vertical" \| undefined                                                                                                                    | The orientation of the accordion items.                                                                               |
| dir?           | "ltr"      | "ltr" \| "rtl" \| undefined                                                                                                                                | The document's text/writing direction.                                                                                |
| getRootNode?   | -          | (() => ShadowRoot \| Node \| Document) \| undefined                                                                                                        | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                            |
| element?       | -          | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                                                                                                           | Render the element yourself                                                                                           |

### AccordionRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => AccordionApi\<PropTypes>                   | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### AccordionRootContextProps

| Property | Default | Type                                        | Description |
| -------- | ------- | ------------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => AccordionApi\<PropTypes>]> | -           |

### AccordionItemProps

| Property  | Default | Type                                             | Description                             |
| --------- | ------- | ------------------------------------------------ | --------------------------------------- |
| value     | -       | string                                           | The value of the accordion item.        |
| disabled? | -       | boolean \| undefined                             | Whether the accordion item is disabled. |
| element?  | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself             |

### AccordionItemTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### AccordionItemIndicatorProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### AccordionItemContentProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

# App Bar

A header element for the top of your page layout.

```svelte
<script lang="ts">
	import { CalendarIcon, CircleUserIcon, MenuIcon, SearchIcon } from '@lucide/svelte';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
</script>

<AppBar>
	<AppBar.Toolbar class="grid-cols-[auto_1fr_auto]">
		<AppBar.Lead>
			<button type="button" class="btn-icon btn-icon-lg hover:preset-tonal"><MenuIcon /></button>
		</AppBar.Lead>
		<AppBar.Headline>
			<p class="text-2xl">Skeleton</p>
		</AppBar.Headline>
		<AppBar.Trail>
			<button type="button" class="btn-icon hover:preset-tonal"
				><SearchIcon class="size-6" /></button
			>
			<button type="button" class="btn-icon hover:preset-tonal"
				><CalendarIcon class="size-6" /></button
			>
			<button type="button" class="btn-icon hover:preset-tonal"
				><CircleUserIcon class="size-6" /></button
			>
		</AppBar.Trail>
	</AppBar.Toolbar>
</AppBar>
```

## Centered

Control the layout using a [grid-cols-\*](https://tailwindcss.com/docs/grid-column) utility class.

```svelte
<script lang="ts">
	import { CalendarIcon, CircleUserIcon, MenuIcon, SearchIcon } from '@lucide/svelte';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
</script>

<AppBar>
	<AppBar.Toolbar class="grid-cols-[1fr_2fr_1fr]">
		<AppBar.Lead>
			<button type="button" class="btn-icon btn-icon-lg hover:preset-tonal"><MenuIcon /></button>
		</AppBar.Lead>
		<AppBar.Headline class="flex justify-center">
			<p>Headline</p>
		</AppBar.Headline>
		<AppBar.Trail class="justify-end">
			<button type="button" class="btn-icon hover:preset-tonal"
				><SearchIcon class="size-6" /></button
			>
			<button type="button" class="btn-icon hover:preset-tonal"
				><CalendarIcon class="size-6" /></button
			>
			<button type="button" class="btn-icon hover:preset-tonal"
				><CircleUserIcon class="size-6" /></button
			>
		</AppBar.Trail>
	</AppBar.Toolbar>
</AppBar>
```

## Extended

Move the `<AppBar.Headline>` to a new row within the root.

```svelte
<script lang="ts">
	import { CalendarIcon, CircleUserIcon, MenuIcon, SearchIcon } from '@lucide/svelte';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
</script>

<AppBar>
	<AppBar.Toolbar class="grid-cols-[auto_auto]">
		<AppBar.Lead>
			<button type="button" class="btn-icon btn-icon-lg hover:preset-tonal"><MenuIcon /></button>
		</AppBar.Lead>
		<AppBar.Trail>
			<button type="button" class="btn-icon hover:preset-tonal"
				><SearchIcon class="size-6" /></button
			>
			<button type="button" class="btn-icon hover:preset-tonal"
				><CalendarIcon class="size-6" /></button
			>
			<button type="button" class="btn-icon hover:preset-tonal"
				><CircleUserIcon class="size-6" /></button
			>
		</AppBar.Trail>
	</AppBar.Toolbar>
	<AppBar.Headline>
		<h2 class="h2">Headline</h2>
	</AppBar.Headline>
</AppBar>
```

## Responsive

```svelte
<script lang="ts">
	import { CalendarIcon, CircleUserIcon, MenuIcon, SearchIcon } from '@lucide/svelte';
	import { AppBar } from '@skeletonlabs/skeleton-svelte';
</script>

<!-- 1. Set dynamic spacing -->
<AppBar class="space-y-0 md:space-y-4">
	<!-- 2. Set dynamic layout columns -->
	<AppBar.Toolbar class="grid-cols-[auto_1fr_auto] md:grid-cols-[auto_auto]">
		<AppBar.Lead>
			<button type="button" class="btn-icon btn-icon-lg hover:preset-tonal"><MenuIcon /></button>
		</AppBar.Lead>

		<!-- 3. Set Mobile display -->
		<AppBar.Headline class="md:hidden">
			<p class="text-2xl">Headline</p>
		</AppBar.Headline>

		<AppBar.Trail>
			<button type="button" class="btn-icon hover:preset-tonal"
				><SearchIcon class="size-6" /></button
			>
			<button type="button" class="btn-icon hover:preset-tonal"
				><CalendarIcon class="size-6" /></button
			>
			<button type="button" class="btn-icon hover:preset-tonal"
				><CircleUserIcon class="size-6" /></button
			>
		</AppBar.Trail>
	</AppBar.Toolbar>

	<!-- 4. Set Desktop display -->
	<AppBar.Headline class="hidden md:block">
		<p class="text-2xl">Headline</p>
	</AppBar.Headline>
</AppBar>
```

## API Reference

### AppBarRootProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"header">]> \| undefined | Render the element yourself |

### AppBarToolbarProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### AppBarLeadProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"nav">]> \| undefined | Render the element yourself |

### AppBarHeadlineProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### AppBarTrailProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"nav">]> \| undefined | Render the element yourself |

# Avatar

An image with a fallback for representing the user.

```svelte
<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
</script>

<Avatar>
	<Avatar.Image src="https://i.pravatar.cc/150?img=48" />
	<Avatar.Fallback>SK</Avatar.Fallback>
</Avatar>
```

## Fallback

Use `<Avatar.Fallback>` to provide initials, icons, or a framework-specific image component.

```svelte
<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
</script>

<Avatar>
	<Avatar.Fallback>SK</Avatar.Fallback>
</Avatar>
```

## Filter

Avatars can implement [SVG Filters](/docs/guides/cookbook/svg-filters) using the image `class` attribute.

```svelte
<script lang="ts">
	import { Avatar } from '@skeletonlabs/skeleton-svelte';
</script>

<Avatar>
	<Avatar.Image src="https://i.pravatar.cc/150?img=48" class="filter-[url(#apollo)]" />
	<Avatar.Fallback>SK</Avatar.Fallback>
</Avatar>

<svg class="absolute -left-full h-0 w-0">
	<filter
		id="apollo"
		filterUnits="objectBoundingBox"
		primitiveUnits="userSpaceOnUse"
		color-interpolation-filters="sRGB"
	>
		<feColorMatrix
			values="0.8 0.6 -0.4 0.1 0,
    0 1.2 0.05 0 0,
    0 -1 3 0.02 0,
    0 0 0 50 0"
			result="final"
			in="SourceGraphic"
		></feColorMatrix>
	</filter>
</svg>
```

## API Reference

### AvatarRootProps

| Property        | Default | Type                                                                       | Description                                                                                |
| --------------- | ------- | -------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| onStatusChange? | -       | ((details: StatusChangeDetails) => void) \| undefined                      | Functional called when the image loading status changes.                                   |
| ids?            | -       | Partial\<\{ root: string; image: string; fallback: string; }> \| undefined | The ids of the elements in the avatar. Useful for composition.                             |
| getRootNode?    | -       | (() => ShadowRoot \| Node \| Document) \| undefined                        | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron. |
| dir?            | "ltr"   | "ltr" \| "rtl" \| undefined                                                | The document's text/writing direction.                                                     |
| element?        | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                           | Render the element yourself                                                                |

### AvatarRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => AvatarApi\<PropTypes>                      | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### AvatarRootContextProps

| Property | Default | Type                                     | Description |
| -------- | ------- | ---------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => AvatarApi\<PropTypes>]> | -           |

### AvatarImageProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"img">]> \| undefined | Render the element yourself |

### AvatarFallbackProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

# Collapsible

A container that can be expanded or collapsed to show or hide content.

```svelte
<script lang="ts">
	import { Collapsible } from '@skeletonlabs/skeleton-svelte';
</script>

<Collapsible>
	<Collapsible.Trigger class="btn preset-filled">Toggle</Collapsible.Trigger>
	<Collapsible.Content>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam assumenda veritatis modi
		repellendus enim accusantium inventore architecto maxime voluptates quibusdam velit perferendis
		mollitia, quas, aliquam sapiente adipisci illo nostrum vitae?
	</Collapsible.Content>
</Collapsible>
```

## Controlled

```svelte
<script lang="ts">
	import { Collapsible } from '@skeletonlabs/skeleton-svelte';

	let open = $state(false);
</script>

<Collapsible {open} onOpenChange={(details) => (open = details.open)}>
	<Collapsible.Trigger class="btn preset-filled">{open ? 'Close' : 'Open'}</Collapsible.Trigger>
	<Collapsible.Content>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam assumenda veritatis modi
		repellendus enim accusantium inventore architecto maxime voluptates quibusdam velit perferendis
		mollitia, quas, aliquam sapiente adipisci illo nostrum vitae?
	</Collapsible.Content>
</Collapsible>
```

## Indicator

```svelte
<script lang="ts">
	import { MinusIcon, PlusIcon } from '@lucide/svelte';
	import { Collapsible } from '@skeletonlabs/skeleton-svelte';
</script>

<Collapsible>
	<Collapsible.Trigger class="btn preset-filled">
		<span>Toggle</span>
		<Collapsible.Indicator class="group">
			<MinusIcon class="hidden size-4 group-data-[state=open]:block" />
			<PlusIcon class="block size-4 group-data-[state=open]:hidden" />
		</Collapsible.Indicator>
	</Collapsible.Trigger>
	<Collapsible.Content>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam assumenda veritatis modi
		repellendus enim accusantium inventore architecto maxime voluptates quibusdam velit perferendis
		mollitia, quas, aliquam sapiente adipisci illo nostrum vitae?
	</Collapsible.Content>
</Collapsible>
```

## Disabled

```svelte
<script lang="ts">
	import { Collapsible } from '@skeletonlabs/skeleton-svelte';
</script>

<Collapsible disabled>
	<Collapsible.Trigger class="btn preset-filled">Toggle</Collapsible.Trigger>
	<Collapsible.Content>
		Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus ea reiciendis veritatis
		quae mollitia, nulla minima cupiditate quisquam soluta sunt? Necessitatibus non dolorum voluptas
		ea maiores itaque laborum officiis quia.
	</Collapsible.Content>
</Collapsible>
```

## Alignment

```svelte
<script lang="ts">
	import { Collapsible } from '@skeletonlabs/skeleton-svelte';
</script>

<Collapsible class="flex flex-col items-center">
	<Collapsible.Trigger class="btn preset-filled">Toggle</Collapsible.Trigger>
	<Collapsible.Content>
		Lorem ipsum, dolor sit amet consectetur adipisicing elit. Numquam assumenda veritatis modi
		repellendus enim accusantium inventore architecto maxime voluptates quibusdam velit perferendis
		mollitia, quas, aliquam sapiente adipisci illo nostrum vitae?
	</Collapsible.Content>
</Collapsible>
```

## API Reference

### CollapsibleRootProps

| Property         | Default | Type                                                                        | Description                                                                                                                        |
| ---------------- | ------- | --------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| ids?             | -       | Partial\<\{ root: string; content: string; trigger: string; }> \| undefined | The ids of the elements in the collapsible. Useful for composition.                                                                |
| open?            | -       | boolean \| undefined                                                        | The controlled open state of the collapsible.                                                                                      |
| defaultOpen?     | -       | boolean \| undefined                                                        | The initial open state of the collapsible when rendered.&#xA;Use when you don't need to control the open state of the collapsible. |
| onOpenChange?    | -       | ((details: OpenChangeDetails) => void) \| undefined                         | The callback invoked when the open state changes.                                                                                  |
| onExitComplete?  | -       | VoidFunction \| undefined                                                   | The callback invoked when the exit animation completes.                                                                            |
| disabled?        | -       | boolean \| undefined                                                        | Whether the collapsible is disabled.                                                                                               |
| collapsedHeight? | -       | string \| number \| undefined                                               | The height of the content when collapsed.                                                                                          |
| collapsedWidth?  | -       | string \| number \| undefined                                               | The width of the content when collapsed.                                                                                           |
| getRootNode?     | -       | (() => ShadowRoot \| Node \| Document) \| undefined                         | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                         |
| dir?             | "ltr"   | "ltr" \| "rtl" \| undefined                                                 | The document's text/writing direction.                                                                                             |
| element?         | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                            | Render the element yourself                                                                                                        |

### CollapsibleRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => CollapsibleApi\<PropTypes>                 | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### CollapsibleRootContextProps

| Property | Default | Type                                          | Description |
| -------- | ------- | --------------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => CollapsibleApi\<PropTypes>]> | -           |

### CollapsibleTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### CollapsibleIndicatorProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### CollapsibleContentProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

# Combobox

A combobox is an input widget with an associated popup that enables users to select a value from a collection of possible values.

```svelte
<script lang="ts">
	import {
		Combobox,
		Portal,
		type ComboboxRootProps,
		useListCollection
	} from '@skeletonlabs/skeleton-svelte';

	const data = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Carrot', value: 'carrot' },
		{ label: 'Broccoli', value: 'broccoli' },
		{ label: 'Spinach', value: 'spinach' }
	];

	let items = $state(data);

	const collection = $derived(
		useListCollection({
			items: items,
			itemToString: (item) => item.label,
			itemToValue: (item) => item.value
		})
	);

	const onOpenChange = () => {
		items = data;
	};

	const onInputValueChange: ComboboxRootProps['onInputValueChange'] = (event) => {
		const filtered = data.filter((item) =>
			item.value.toLowerCase().includes(event.inputValue.toLowerCase())
		);
		if (filtered.length > 0) {
			items = filtered;
		} else {
			items = data;
		}
	};
</script>

<Combobox
	class="w-full max-w-md"
	placeholder="Search..."
	{collection}
	{onOpenChange}
	{onInputValueChange}
>
	<Combobox.Label>Label</Combobox.Label>
	<Combobox.Control>
		<Combobox.Input />
		<Combobox.Trigger />
	</Combobox.Control>
	<Portal>
		<Combobox.Positioner class="z-[1]!">
			<Combobox.Content>
				{#each items as item (item.value)}
					<Combobox.Item {item}>
						<Combobox.ItemText>{item.label}</Combobox.ItemText>
						<Combobox.ItemIndicator />
					</Combobox.Item>
				{/each}
			</Combobox.Content>
		</Combobox.Positioner>
	</Portal>
</Combobox>
```

## Groups

Create labelled groups for your items.

```svelte
<script lang="ts">
	import {
		Combobox,
		Portal,
		type ComboboxRootProps,
		useListCollection
	} from '@skeletonlabs/skeleton-svelte';

	const data = [
		{ label: 'Apple', value: 'apple', type: 'Fruits' },
		{ label: 'Banana', value: 'banana', type: 'Fruits' },
		{ label: 'Orange', value: 'orange', type: 'Fruits' },
		{ label: 'Carrot', value: 'carrot', type: 'Vegetables' },
		{ label: 'Broccoli', value: 'broccoli', type: 'Vegetables' },
		{ label: 'Spinach', value: 'spinach', type: 'Vegetables' }
	];

	let items = $state(data);

	const collection = $derived(
		useListCollection({
			items: items,
			itemToString: (item) => item.label,
			itemToValue: (item) => item.value,
			groupBy: (item) => item.type
		})
	);

	const onOpenChange = () => {
		items = data;
	};

	const onInputValueChange: ComboboxRootProps['onInputValueChange'] = (event) => {
		const filtered = data.filter((item) =>
			item.value.toLowerCase().includes(event.inputValue.toLowerCase())
		);
		if (filtered.length > 0) {
			items = filtered;
		} else {
			items = data;
		}
	};
</script>

<Combobox
	class="w-full max-w-md"
	placeholder="Search..."
	{collection}
	{onOpenChange}
	{onInputValueChange}
>
	<Combobox.Control>
		<Combobox.Input />
		<Combobox.Trigger />
	</Combobox.Control>
	<Portal>
		<Combobox.Positioner class="z-[1]!">
			<Combobox.Content>
				{#each collection.group() as [type, items] (type)}
					<Combobox.ItemGroup>
						<Combobox.ItemGroupLabel>{type}</Combobox.ItemGroupLabel>
						{#each items as item (item.value)}
							<Combobox.Item {item}>
								<Combobox.ItemText>{item.label}</Combobox.ItemText>
								<Combobox.ItemIndicator />
							</Combobox.Item>
						{/each}
					</Combobox.ItemGroup>
				{/each}
			</Combobox.Content>
		</Combobox.Positioner>
	</Portal>
</Combobox>
```

## Auto Highlight

Search for any option, then tap Enter on your keyboard to automatically select it.

```svelte
<script lang="ts">
	import {
		Combobox,
		Portal,
		type ComboboxRootProps,
		useListCollection
	} from '@skeletonlabs/skeleton-svelte';

	const data = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Carrot', value: 'carrot' },
		{ label: 'Broccoli', value: 'broccoli' },
		{ label: 'Spinach', value: 'spinach' }
	];

	let items = $state(data);

	const collection = $derived(
		useListCollection({
			items: items,
			itemToString: (item) => item.label,
			itemToValue: (item) => item.value
		})
	);

	const onOpenChange = () => {
		items = data;
	};

	const onInputValueChange: ComboboxRootProps['onInputValueChange'] = (event) => {
		const filtered = data.filter((item) =>
			item.value.toLowerCase().includes(event.inputValue.toLowerCase())
		);
		if (filtered.length > 0) {
			items = filtered;
		} else {
			items = data;
		}
	};
</script>

<Combobox
	class="w-full max-w-md"
	placeholder="Search..."
	{collection}
	{onOpenChange}
	{onInputValueChange}
	inputBehavior="autohighlight"
>
	<Combobox.Control>
		<Combobox.Input />
		<Combobox.Trigger />
	</Combobox.Control>
	<Portal>
		<Combobox.Positioner class="z-[1]!">
			<Combobox.Content>
				{#each items as item (item.value)}
					<Combobox.Item {item}>
						<Combobox.ItemText>{item.label}</Combobox.ItemText>
						<Combobox.ItemIndicator />
					</Combobox.Item>
				{/each}
			</Combobox.Content>
		</Combobox.Positioner>
	</Portal>
</Combobox>
```

## Multiple

To maintain filtering functionality and improve clarity for users, we recommend displaying each selected value outside the perimeter of the Combobox component.

```svelte
<script lang="ts">
	import {
		Combobox,
		Portal,
		type ComboboxRootProps,
		useListCollection
	} from '@skeletonlabs/skeleton-svelte';

	const data = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Carrot', value: 'carrot' },
		{ label: 'Broccoli', value: 'broccoli' },
		{ label: 'Spinach', value: 'spinach' }
	];

	let value: string[] = $state([]);
	let items = $state(data);

	const collection = $derived(
		useListCollection({
			items: items,
			itemToString: (item) => item.label,
			itemToValue: (item) => item.value
		})
	);

	const onOpenChange = () => {
		items = data;
	};

	const onInputValueChange: ComboboxRootProps['onInputValueChange'] = (event) => {
		const filtered = data.filter((item) =>
			item.value.toLowerCase().includes(event.inputValue.toLowerCase())
		);
		if (filtered.length > 0) {
			items = filtered;
		} else {
			items = data;
		}
	};

	const onValueChange: ComboboxRootProps['onValueChange'] = (event) => {
		value = event.value;
	};
</script>

<div class="grid w-full max-w-md gap-2">
	<Combobox
		placeholder="Search..."
		{collection}
		{onOpenChange}
		{onInputValueChange}
		{value}
		{onValueChange}
		multiple
	>
		<Combobox.Control>
			<Combobox.Input />
			<Combobox.Trigger />
		</Combobox.Control>
		<Portal>
			<Combobox.Positioner class="z-[1]!">
				<Combobox.Content>
					{#each items as item (item.value)}
						<Combobox.Item {item}>
							<Combobox.ItemText>{item.label}</Combobox.ItemText>
							<Combobox.ItemIndicator />
						</Combobox.Item>
					{/each}
				</Combobox.Content>
			</Combobox.Positioner>
		</Portal>
	</Combobox>
	<div class="flex flex-wrap gap-2">
		{#each value as item (item)}
			<span class="badge preset-filled">
				{item}
			</span>
		{/each}
	</div>
</div>
```

## Disabled Item

```svelte
<script lang="ts">
	import {
		Combobox,
		Portal,
		type ComboboxRootProps,
		useListCollection
	} from '@skeletonlabs/skeleton-svelte';

	const data = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Carrot', value: 'carrot' },
		{ label: 'Broccoli', value: 'broccoli' },
		{ label: 'Spinach', value: 'spinach' }
	];

	let items = $state(data);

	const collection = $derived(
		useListCollection({
			items: items,
			itemToString: (item) => item.label,
			itemToValue: (item) => item.value,
			isItemDisabled: (item) => item.value === 'banana'
		})
	);

	const onOpenChange = () => {
		items = data;
	};

	const onInputValueChange: ComboboxRootProps['onInputValueChange'] = (event) => {
		const filtered = data.filter((item) =>
			item.value.toLowerCase().includes(event.inputValue.toLowerCase())
		);
		if (filtered.length > 0) {
			items = filtered;
		} else {
			items = data;
		}
	};
</script>

<Combobox
	class="w-full max-w-md"
	placeholder="Search..."
	{collection}
	{onOpenChange}
	{onInputValueChange}
>
	<Combobox.Control>
		<Combobox.Input />
		<Combobox.Trigger />
	</Combobox.Control>
	<Portal>
		<Combobox.Positioner class="z-[1]!">
			<Combobox.Content>
				{#each items as item (item.value)}
					<Combobox.Item {item}>
						<Combobox.ItemText>{item.label}</Combobox.ItemText>
						<Combobox.ItemIndicator />
					</Combobox.Item>
				{/each}
			</Combobox.Content>
		</Combobox.Positioner>
	</Portal>
</Combobox>
```

## Custom Filter

Try mistyping `apple` or `banana` to see the custom filter using the fuzzy search from [Fuse.js](https://fusejs.io/) in action.

```svelte
<script lang="ts">
	import {
		Combobox,
		Portal,
		type ComboboxRootProps,
		useListCollection
	} from '@skeletonlabs/skeleton-svelte';
	import Fuse from 'fuse.js';

	const data = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Carrot', value: 'carrot' },
		{ label: 'Broccoli', value: 'broccoli' },
		{ label: 'Spinach', value: 'spinach' }
	];

	const fuse = new Fuse(data, {
		keys: ['label', 'value'],
		threshold: 0.3
	});

	let items = $state(data);

	const collection = $derived(
		useListCollection({
			items: items,
			itemToString: (item) => item.label,
			itemToValue: (item) => item.value
		})
	);

	const onOpenChange = () => {
		items = data;
	};

	const onInputValueChange: ComboboxRootProps['onInputValueChange'] = (event) => {
		const results = fuse.search(event.inputValue);
		if (results.length > 0) {
			items = results.map((result) => result.item);
		} else {
			items = data;
		}
	};
</script>

<Combobox
	class="w-full max-w-md"
	placeholder="Search..."
	{collection}
	{onOpenChange}
	{onInputValueChange}
>
	<Combobox.Control>
		<Combobox.Input />
		<Combobox.Trigger />
	</Combobox.Control>
	<Portal>
		<Combobox.Positioner class="z-[1]!">
			<Combobox.Content>
				{#each items as item (item.value)}
					<Combobox.Item {item}>
						<Combobox.ItemText>{item.label}</Combobox.ItemText>
						<Combobox.ItemIndicator />
					</Combobox.Item>
				{/each}
			</Combobox.Content>
		</Combobox.Positioner>
	</Portal>
</Combobox>
```

## Direction

```svelte
<script lang="ts">
	import {
		Combobox,
		Portal,
		type ComboboxRootProps,
		useListCollection
	} from '@skeletonlabs/skeleton-svelte';

	const data = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Carrot', value: 'carrot' },
		{ label: 'Broccoli', value: 'broccoli' },
		{ label: 'Spinach', value: 'spinach' }
	];

	let items = $state(data);

	const collection = $derived(
		useListCollection({
			items: items,
			itemToString: (item) => item.label,
			itemToValue: (item) => item.value
		})
	);

	const onOpenChange = () => {
		items = data;
	};

	const onInputValueChange: ComboboxRootProps['onInputValueChange'] = (event) => {
		const filtered = data.filter((item) =>
			item.value.toLowerCase().includes(event.inputValue.toLowerCase())
		);
		if (filtered.length > 0) {
			items = filtered;
		} else {
			items = data;
		}
	};
</script>

<Combobox
	class="w-full max-w-md"
	placeholder="Search..."
	{collection}
	{onOpenChange}
	{onInputValueChange}
	dir="rtl"
>
	<Combobox.Label>Label</Combobox.Label>
	<Combobox.Control>
		<Combobox.Input />
		<Combobox.Trigger />
	</Combobox.Control>
	<Portal>
		<Combobox.Positioner class="z-[1]!">
			<Combobox.Content>
				{#each items as item (item.value)}
					<Combobox.Item {item}>
						<Combobox.ItemText>{item.label}</Combobox.ItemText>
						<Combobox.ItemIndicator />
					</Combobox.Item>
				{/each}
			</Combobox.Content>
		</Combobox.Positioner>
	</Portal>
</Combobox>
```

## Guidelines

### Z-Index

By default we do not take an opinionated stance regarding z-index stacking. The result is the component can sometimes be occluded beneath other elements with a higher index. The Z-Index can controlled by applying a utility class to the Positioner component part.

```svelte
<script lang="ts">
	import {
		Combobox,
		Portal,
		type ComboboxRootProps,
		useListCollection
	} from '@skeletonlabs/skeleton-svelte';

	const data = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Carrot', value: 'carrot' },
		{ label: 'Broccoli', value: 'broccoli' },
		{ label: 'Spinach', value: 'spinach' }
	];

	let items = $state(data);

	const collection = $derived(
		useListCollection({
			items: items,
			itemToString: (item) => item.label,
			itemToValue: (item) => item.value
		})
	);

	const onOpenChange = () => {
		items = data;
	};

	const onInputValueChange: ComboboxRootProps['onInputValueChange'] = (event) => {
		const filtered = data.filter((item) =>
			item.value.toLowerCase().includes(event.inputValue.toLowerCase())
		);
		if (filtered.length > 0) {
			items = filtered;
		} else {
			items = data;
		}
	};
</script>

<Combobox
	class="w-full max-w-md"
	placeholder="Search..."
	{collection}
	{onOpenChange}
	{onInputValueChange}
>
	<Combobox.Control>
		<Combobox.Input />
		<Combobox.Trigger />
	</Combobox.Control>
	<Portal>
		<Combobox.Positioner class="z-50">
			<Combobox.Content>
				{#each items as item (item.value)}
					<Combobox.Item {item}>
						<Combobox.ItemText>{item.label}</Combobox.ItemText>
						<Combobox.ItemIndicator />
					</Combobox.Item>
				{/each}
			</Combobox.Content>
		</Combobox.Positioner>
	</Portal>
</Combobox>
```

### Max Items

We recommend no more than 500 items max. For normal usage, a few dozen will provide the best performance.

## API Reference

### ComboboxRootProps

| Property                 | Default                        | Type                                                                                                                                                                                                                                                                                                                           | Description                                                                                                                                                                                                                                              |
| ------------------------ | ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| open?                    | -                              | boolean \| undefined                                                                                                                                                                                                                                                                                                           | The controlled open state of the combobox                                                                                                                                                                                                                |
| defaultOpen?             | -                              | boolean \| undefined                                                                                                                                                                                                                                                                                                           | The initial open state of the combobox when rendered.&#xA;Use when you don't need to control the open state of the combobox.                                                                                                                             |
| ids?                     | -                              | Partial\<\{ root: string; label: string; control: string; input: string; content: string; trigger: string; clearTrigger: string; item: (id: string, index?: number \| undefined) => string; positioner: string; itemGroup: (id: string \| number) => string; itemGroupLabel: (id: string \| number) => string; }> \| undefined | The ids of the elements in the combobox. Useful for composition.                                                                                                                                                                                         |
| inputValue?              | -                              | string \| undefined                                                                                                                                                                                                                                                                                                            | The controlled value of the combobox's input                                                                                                                                                                                                             |
| defaultInputValue?       | ""                             | string \| undefined                                                                                                                                                                                                                                                                                                            | The initial value of the combobox's input when rendered.&#xA;Use when you don't need to control the value of the combobox's input.                                                                                                                       |
| name?                    | -                              | string \| undefined                                                                                                                                                                                                                                                                                                            | The \`name\` attribute of the combobox's input. Useful for form submission                                                                                                                                                                               |
| form?                    | -                              | string \| undefined                                                                                                                                                                                                                                                                                                            | The associate form of the combobox.                                                                                                                                                                                                                      |
| disabled?                | -                              | boolean \| undefined                                                                                                                                                                                                                                                                                                           | Whether the combobox is disabled                                                                                                                                                                                                                         |
| readOnly?                | -                              | boolean \| undefined                                                                                                                                                                                                                                                                                                           | Whether the combobox is readonly. This puts the combobox in a "non-editable" mode&#xA;but the user can still interact with it                                                                                                                            |
| invalid?                 | -                              | boolean \| undefined                                                                                                                                                                                                                                                                                                           | Whether the combobox is invalid                                                                                                                                                                                                                          |
| required?                | -                              | boolean \| undefined                                                                                                                                                                                                                                                                                                           | Whether the combobox is required                                                                                                                                                                                                                         |
| placeholder?             | -                              | string \| undefined                                                                                                                                                                                                                                                                                                            | The placeholder text of the combobox's input                                                                                                                                                                                                             |
| defaultHighlightedValue? | -                              | string \| null \| undefined                                                                                                                                                                                                                                                                                                    | The initial highlighted value of the combobox when rendered.&#xA;Use when you don't need to control the highlighted value of the combobox.                                                                                                               |
| highlightedValue?        | -                              | string \| null \| undefined                                                                                                                                                                                                                                                                                                    | The controlled highlighted value of the combobox                                                                                                                                                                                                         |
| value?                   | -                              | string\[] \| undefined                                                                                                                                                                                                                                                                                                         | The controlled value of the combobox's selected items                                                                                                                                                                                                    |
| defaultValue?            | \[]                            | string\[] \| undefined                                                                                                                                                                                                                                                                                                         | The initial value of the combobox's selected items when rendered.&#xA;Use when you don't need to control the value of the combobox's selected items.                                                                                                     |
| inputBehavior?           | "none"                         | "autohighlight" \| "autocomplete" \| "none" \| undefined                                                                                                                                                                                                                                                                       | Defines the auto-completion behavior of the combobox.&#xA;&#xA;- \`autohighlight\`: The first focused item is highlighted as the user types&#xA;- \`autocomplete\`: Navigating the listbox with the arrow keys selects the item and the input is updated |
| selectionBehavior?       | "replace"                      | "clear" \| "replace" \| "preserve" \| undefined                                                                                                                                                                                                                                                                                | The behavior of the combobox input when an item is selected&#xA;&#xA;- \`replace\`: The selected item string is set as the input value&#xA;- \`clear\`: The input value is cleared&#xA;- \`preserve\`: The input value is preserved                      |
| autoFocus?               | -                              | boolean \| undefined                                                                                                                                                                                                                                                                                                           | Whether to autofocus the input on mount                                                                                                                                                                                                                  |
| openOnClick?             | false                          | boolean \| undefined                                                                                                                                                                                                                                                                                                           | Whether to open the combobox popup on initial click on the input                                                                                                                                                                                         |
| openOnChange?            | true                           | boolean \| ((details: InputValueChangeDetails) => boolean) \| undefined                                                                                                                                                                                                                                                        | Whether to show the combobox when the input value changes                                                                                                                                                                                                |
| allowCustomValue?        | -                              | boolean \| undefined                                                                                                                                                                                                                                                                                                           | Whether to allow typing custom values in the input                                                                                                                                                                                                       |
| alwaysSubmitOnEnter?     | false                          | boolean \| undefined                                                                                                                                                                                                                                                                                                           | Whether to always submit on Enter key press, even if popup is open.&#xA;Useful for single-field autocomplete forms where Enter should submit the form.                                                                                                   |
| loopFocus?               | true                           | boolean \| undefined                                                                                                                                                                                                                                                                                                           | Whether to loop the keyboard navigation through the items                                                                                                                                                                                                |
| positioning?             | \{ placement: "bottom-start" } | PositioningOptions \| undefined                                                                                                                                                                                                                                                                                                | The positioning options to dynamically position the menu                                                                                                                                                                                                 |
| onInputValueChange?      | -                              | ((details: InputValueChangeDetails) => void) \| undefined                                                                                                                                                                                                                                                                      | Function called when the input's value changes                                                                                                                                                                                                           |
| onValueChange?           | -                              | ((details: ValueChangeDetails\<any>) => void) \| undefined                                                                                                                                                                                                                                                                     | Function called when a new item is selected                                                                                                                                                                                                              |
| onHighlightChange?       | -                              | ((details: HighlightChangeDetails\<any>) => void) \| undefined                                                                                                                                                                                                                                                                 | Function called when an item is highlighted using the pointer&#xA;or keyboard navigation.                                                                                                                                                                |
| onSelect?                | -                              | ((details: SelectionDetails) => void) \| undefined                                                                                                                                                                                                                                                                             | Function called when an item is selected                                                                                                                                                                                                                 |
| onOpenChange?            | -                              | ((details: OpenChangeDetails) => void) \| undefined                                                                                                                                                                                                                                                                            | Function called when the popup is opened                                                                                                                                                                                                                 |
| translations?            | -                              | IntlTranslations \| undefined                                                                                                                                                                                                                                                                                                  | Specifies the localized strings that identifies the accessibility elements and their states                                                                                                                                                              |
| collection?              | -                              | ListCollection\<any> \| undefined                                                                                                                                                                                                                                                                                              | The collection of items                                                                                                                                                                                                                                  |
| multiple?                | -                              | boolean \| undefined                                                                                                                                                                                                                                                                                                           | Whether to allow multiple selection.&#xA;&#xA;\*\*Good to know:\*\* When \`multiple\` is \`true\`, the \`selectionBehavior\` is automatically set to \`clear\`.&#xA;It is recommended to render the selected items in a separate container.              |
| closeOnSelect?           | -                              | boolean \| undefined                                                                                                                                                                                                                                                                                                           | Whether to close the combobox when an item is selected.                                                                                                                                                                                                  |
| openOnKeyPress?          | true                           | boolean \| undefined                                                                                                                                                                                                                                                                                                           | Whether to open the combobox on arrow key press                                                                                                                                                                                                          |
| scrollToIndexFn?         | -                              | ((details: ScrollToIndexDetails) => void) \| undefined                                                                                                                                                                                                                                                                         | Function to scroll to a specific index                                                                                                                                                                                                                   |
| composite?               | true                           | boolean \| undefined                                                                                                                                                                                                                                                                                                           | Whether the combobox is a composed with other composite widgets like tabs                                                                                                                                                                                |
| disableLayer?            | -                              | boolean \| undefined                                                                                                                                                                                                                                                                                                           | Whether to disable registering this a dismissable layer                                                                                                                                                                                                  |
| navigate?                | -                              | ((details: NavigateDetails) => void) \| null \| undefined                                                                                                                                                                                                                                                                      | Function to navigate to the selected item                                                                                                                                                                                                                |
| dir?                     | "ltr"                          | "ltr" \| "rtl" \| undefined                                                                                                                                                                                                                                                                                                    | The document's text/writing direction.                                                                                                                                                                                                                   |
| getRootNode?             | -                              | (() => ShadowRoot \| Node \| Document) \| undefined                                                                                                                                                                                                                                                                            | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                                                                                                                                               |
| onPointerDownOutside?    | -                              | ((event: PointerDownOutsideEvent) => void) \| undefined                                                                                                                                                                                                                                                                        | Function called when the pointer is pressed down outside the component                                                                                                                                                                                   |
| onFocusOutside?          | -                              | ((event: FocusOutsideEvent) => void) \| undefined                                                                                                                                                                                                                                                                              | Function called when the focus is moved outside the component                                                                                                                                                                                            |
| onInteractOutside?       | -                              | ((event: InteractOutsideEvent) => void) \| undefined                                                                                                                                                                                                                                                                           | Function called when an interaction happens outside the component                                                                                                                                                                                        |
| element?                 | -                              | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                                                                                                                                                                                                                                                                               | Render the element yourself                                                                                                                                                                                                                              |

### ComboboxRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => ComboboxApi\<PropTypes, any>               | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ComboboxRootContextProps

| Property | Default | Type                                            | Description |
| -------- | ------- | ----------------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => ComboboxApi\<PropTypes, any>]> | -           |

### ComboboxLabelProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"label">]> \| undefined | Render the element yourself |

### ComboboxControlProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ComboboxInputProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"input">]> \| undefined | Render the element yourself |

### ComboboxTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### ComboboxPositionerProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ComboboxContentProps

| Property | Default | Type                                            | Description                 |
| -------- | ------- | ----------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"ul">]> \| undefined | Render the element yourself |

### ComboboxItemGroupProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ComboboxItemGroupLabelProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ComboboxItemProps

| Property      | Default | Type                                            | Description                                                 |
| ------------- | ------- | ----------------------------------------------- | ----------------------------------------------------------- |
| persistFocus? | -       | boolean \| undefined                            | Whether hovering outside should clear the highlighted state |
| item          | -       | any                                             | The item to render                                          |
| element?      | -       | Snippet\<\[HTMLAttributes\<"li">]> \| undefined | Render the element yourself                                 |

### ComboboxItemTextProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

### ComboboxItemIndicatorProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

# Date Picker

Select dates from a calendar interface.

```svelte
<script lang="ts">
	import { DatePicker, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<DatePicker>
	<DatePicker.Label>Label</DatePicker.Label>
	<DatePicker.Control>
		<DatePicker.Input placeholder="mm/dd/yyyy" />
		<DatePicker.Trigger />
	</DatePicker.Control>
	<Portal>
		<DatePicker.Positioner>
			<DatePicker.Content>
				<DatePicker.View view="day">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableHead>
									<DatePicker.TableRow>
										{#each datePicker().weekDays as weekDay, id (id)}
											<DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
										{/each}
									</DatePicker.TableRow>
								</DatePicker.TableHead>
								<DatePicker.TableBody>
									{#each datePicker().weeks as week, id (id)}
										<DatePicker.TableRow>
											{#each week as day, id (id)}
												<DatePicker.TableCell value={day}>
													<DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
				<DatePicker.View view="month">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableBody>
									{#each datePicker().getMonthsGrid( { columns: 4, format: 'short' } ) as months, id (id)}
										<DatePicker.TableRow>
											{#each months as month, id (id)}
												<DatePicker.TableCell value={month.value}>
													<DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
				<DatePicker.View view="year">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableBody>
									{#each datePicker().getYearsGrid({ columns: 4 }) as years, id (id)}
										<DatePicker.TableRow>
											{#each years as year, id (id)}
												<DatePicker.TableCell value={year.value}>
													<DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
			</DatePicker.Content>
		</DatePicker.Positioner>
	</Portal>
</DatePicker>
```

## Controlled

Manage the selected date value with Svelte state.

```svelte
<script lang="ts">
	import { DatePicker, parseDate, Portal } from '@skeletonlabs/skeleton-svelte';

	let value = $state([parseDate('2025-10-15')]);
</script>

<DatePicker {value} onValueChange={(e) => (value = e.value)}>
	<DatePicker.Label>Picked date: {value.at(0)?.toString()}</DatePicker.Label>
	<DatePicker.Control>
		<DatePicker.Input placeholder="mm/dd/yyyy" />
		<DatePicker.Trigger />
	</DatePicker.Control>
	<Portal>
		<DatePicker.Positioner>
			<DatePicker.Content>
				<DatePicker.View view="day">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableHead>
									<DatePicker.TableRow>
										{#each datePicker().weekDays as weekDay, id (id)}
											<DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
										{/each}
									</DatePicker.TableRow>
								</DatePicker.TableHead>
								<DatePicker.TableBody>
									{#each datePicker().weeks as week, id (id)}
										<DatePicker.TableRow>
											{#each week as day, id (id)}
												<DatePicker.TableCell value={day}>
													<DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
				<DatePicker.View view="month">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableBody>
									{#each datePicker().getMonthsGrid( { columns: 4, format: 'short' } ) as months, id (id)}
										<DatePicker.TableRow>
											{#each months as month, id (id)}
												<DatePicker.TableCell value={month.value}>
													<DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
				<DatePicker.View view="year">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableBody>
									{#each datePicker().getYearsGrid({ columns: 4 }) as years, id (id)}
										<DatePicker.TableRow>
											{#each years as year, id (id)}
												<DatePicker.TableCell value={year.value}>
													<DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
			</DatePicker.Content>
		</DatePicker.Positioner>
	</Portal>
</DatePicker>
```

## Disabled

Disable the date picker to prevent user interaction.

```svelte
<script lang="ts">
	import { DatePicker, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<DatePicker disabled>
	<DatePicker.Label>Label</DatePicker.Label>
	<DatePicker.Control>
		<DatePicker.Input placeholder="mm/dd/yyyy" />
		<DatePicker.Trigger />
	</DatePicker.Control>
	<Portal>
		<DatePicker.Positioner>
			<DatePicker.Content>
				<DatePicker.View view="day">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableHead>
									<DatePicker.TableRow>
										{#each datePicker().weekDays as weekDay, id (id)}
											<DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
										{/each}
									</DatePicker.TableRow>
								</DatePicker.TableHead>
								<DatePicker.TableBody>
									{#each datePicker().weeks as week, id (id)}
										<DatePicker.TableRow>
											{#each week as day, id (id)}
												<DatePicker.TableCell value={day}>
													<DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
				<DatePicker.View view="month">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableBody>
									{#each datePicker().getMonthsGrid( { columns: 4, format: 'short' } ) as months, id (id)}
										<DatePicker.TableRow>
											{#each months as month, id (id)}
												<DatePicker.TableCell value={month.value}>
													<DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
				<DatePicker.View view="year">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableBody>
									{#each datePicker().getYearsGrid({ columns: 4 }) as years, id (id)}
										<DatePicker.TableRow>
											{#each years as year, id (id)}
												<DatePicker.TableCell value={year.value}>
													<DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
			</DatePicker.Content>
		</DatePicker.Positioner>
	</Portal>
</DatePicker>
```

## Minimum and Maximum

Restrict date selection to a specific range using the `min` and `max` props with the `parseDate` helper function.

```svelte
<script lang="ts">
	import { DatePicker, parseDate, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<DatePicker min={parseDate('2024-01-01')} max={parseDate('2024-12-31')}>
	<DatePicker.Label>Label</DatePicker.Label>
	<DatePicker.Control>
		<DatePicker.Input placeholder="mm/dd/yyyy" />
		<DatePicker.Trigger />
	</DatePicker.Control>
	<Portal>
		<DatePicker.Positioner>
			<DatePicker.Content>
				<DatePicker.View view="day">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableHead>
									<DatePicker.TableRow>
										{#each datePicker().weekDays as weekDay, id (id)}
											<DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
										{/each}
									</DatePicker.TableRow>
								</DatePicker.TableHead>
								<DatePicker.TableBody>
									{#each datePicker().weeks as week, id (id)}
										<DatePicker.TableRow>
											{#each week as day, id (id)}
												<DatePicker.TableCell value={day}>
													<DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
				<DatePicker.View view="month">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableBody>
									{#each datePicker().getMonthsGrid( { columns: 4, format: 'short' } ) as months, id (id)}
										<DatePicker.TableRow>
											{#each months as month, id (id)}
												<DatePicker.TableCell value={month.value}>
													<DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
				<DatePicker.View view="year">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableBody>
									{#each datePicker().getYearsGrid({ columns: 4 }) as years, id (id)}
										<DatePicker.TableRow>
											{#each years as year, id (id)}
												<DatePicker.TableCell value={year.value}>
													<DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
			</DatePicker.Content>
		</DatePicker.Positioner>
	</Portal>
</DatePicker>
```

## Range Selection

Enable range selection by setting `selectionMode="range"` on the root component. Use two input fields with `index={0}` and `index={1}` to represent the start and end dates.

```svelte
<script lang="ts">
	import { DatePicker, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<DatePicker selectionMode="range">
	<DatePicker.Label>Select Date Range</DatePicker.Label>
	<DatePicker.Control>
		<DatePicker.Input index={0} placeholder="Start date..." />
		<DatePicker.Input index={1} placeholder="End date..." />
		<DatePicker.Trigger />
	</DatePicker.Control>
	<Portal>
		<DatePicker.Positioner>
			<DatePicker.Content>
				<DatePicker.View view="day">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableHead>
									<DatePicker.TableRow>
										{#each datePicker().weekDays as weekDay, id (id)}
											<DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
										{/each}
									</DatePicker.TableRow>
								</DatePicker.TableHead>
								<DatePicker.TableBody>
									{#each datePicker().weeks as week, id (id)}
										<DatePicker.TableRow>
											{#each week as day, id (id)}
												<DatePicker.TableCell value={day}>
													<DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
				<DatePicker.View view="month">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableBody>
									{#each datePicker().getMonthsGrid( { columns: 4, format: 'short' } ) as months, id (id)}
										<DatePicker.TableRow>
											{#each months as month, id (id)}
												<DatePicker.TableCell value={month.value}>
													<DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
				<DatePicker.View view="year">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableBody>
									{#each datePicker().getYearsGrid({ columns: 4 }) as years, id (id)}
										<DatePicker.TableRow>
											{#each years as year, id (id)}
												<DatePicker.TableCell value={year.value}>
													<DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
			</DatePicker.Content>
		</DatePicker.Positioner>
	</Portal>
</DatePicker>
```

## Inline calendar

Display the calendar inline without a popover by adding the `inline` prop to the root component. When using inline mode, omit the `Portal` and `Positioner` components.

```svelte
<script lang="ts">
	import { DatePicker } from '@skeletonlabs/skeleton-svelte';
</script>

<DatePicker inline>
	<DatePicker.Label>Label</DatePicker.Label>
	<DatePicker.Content>
		<DatePicker.View view="day">
			<DatePicker.Context>
				{#snippet children(datePicker)}
					<DatePicker.ViewControl>
						<DatePicker.PrevTrigger />
						<DatePicker.ViewTrigger>
							<DatePicker.RangeText />
						</DatePicker.ViewTrigger>
						<DatePicker.NextTrigger />
					</DatePicker.ViewControl>
					<DatePicker.Table>
						<DatePicker.TableHead>
							<DatePicker.TableRow>
								{#each datePicker().weekDays as weekDay, id (id)}
									<DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
								{/each}
							</DatePicker.TableRow>
						</DatePicker.TableHead>
						<DatePicker.TableBody>
							{#each datePicker().weeks as week, id (id)}
								<DatePicker.TableRow>
									{#each week as day, id (id)}
										<DatePicker.TableCell value={day}>
											<DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
										</DatePicker.TableCell>
									{/each}
								</DatePicker.TableRow>
							{/each}
						</DatePicker.TableBody>
					</DatePicker.Table>
				{/snippet}
			</DatePicker.Context>
		</DatePicker.View>
		<DatePicker.View view="month">
			<DatePicker.Context>
				{#snippet children(datePicker)}
					<DatePicker.ViewControl>
						<DatePicker.PrevTrigger />
						<DatePicker.ViewTrigger>
							<DatePicker.RangeText />
						</DatePicker.ViewTrigger>
						<DatePicker.NextTrigger />
					</DatePicker.ViewControl>
					<DatePicker.Table>
						<DatePicker.TableBody>
							{#each datePicker().getMonthsGrid({ columns: 4, format: 'short' }) as months, id (id)}
								<DatePicker.TableRow>
									{#each months as month, id (id)}
										<DatePicker.TableCell value={month.value}>
											<DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
										</DatePicker.TableCell>
									{/each}
								</DatePicker.TableRow>
							{/each}
						</DatePicker.TableBody>
					</DatePicker.Table>
				{/snippet}
			</DatePicker.Context>
		</DatePicker.View>
		<DatePicker.View view="year">
			<DatePicker.Context>
				{#snippet children(datePicker)}
					<DatePicker.ViewControl>
						<DatePicker.PrevTrigger />
						<DatePicker.ViewTrigger>
							<DatePicker.RangeText />
						</DatePicker.ViewTrigger>
						<DatePicker.NextTrigger />
					</DatePicker.ViewControl>
					<DatePicker.Table>
						<DatePicker.TableBody>
							{#each datePicker().getYearsGrid({ columns: 4 }) as years, id (id)}
								<DatePicker.TableRow>
									{#each years as year, id (id)}
										<DatePicker.TableCell value={year.value}>
											<DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
										</DatePicker.TableCell>
									{/each}
								</DatePicker.TableRow>
							{/each}
						</DatePicker.TableBody>
					</DatePicker.Table>
				{/snippet}
			</DatePicker.Context>
		</DatePicker.View>
	</DatePicker.Content>
</DatePicker>
```

## Month and Year Selection

Optionally add `<DatePicker.MonthSelect />` and `<DatePicker.YearSelect />` components to provide dropdown selectors for quickly changing the month and year.

```svelte
<script lang="ts">
	import { DatePicker, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<DatePicker>
	<DatePicker.Label>Label</DatePicker.Label>
	<DatePicker.Control>
		<DatePicker.Input placeholder="mm/dd/yyyy" />
		<DatePicker.Trigger />
	</DatePicker.Control>
	<Portal>
		<DatePicker.Positioner>
			<DatePicker.Content>
				<DatePicker.YearSelect />
				<DatePicker.MonthSelect />
				<DatePicker.View view="day">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger disabled>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableHead>
									<DatePicker.TableRow>
										{#each datePicker().weekDays as weekDay, id (id)}
											<DatePicker.TableHeader>{weekDay.short}</DatePicker.TableHeader>
										{/each}
									</DatePicker.TableRow>
								</DatePicker.TableHead>
								<DatePicker.TableBody>
									{#each datePicker().weeks as week, id (id)}
										<DatePicker.TableRow>
											{#each week as day, id (id)}
												<DatePicker.TableCell value={day}>
													<DatePicker.TableCellTrigger>{day.day}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
				<DatePicker.View view="month">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableBody>
									{#each datePicker().getMonthsGrid( { columns: 4, format: 'short' } ) as months, id (id)}
										<DatePicker.TableRow>
											{#each months as month, id (id)}
												<DatePicker.TableCell value={month.value}>
													<DatePicker.TableCellTrigger>{month.label}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
				<DatePicker.View view="year">
					<DatePicker.Context>
						{#snippet children(datePicker)}
							<DatePicker.ViewControl>
								<DatePicker.PrevTrigger />
								<DatePicker.ViewTrigger>
									<DatePicker.RangeText />
								</DatePicker.ViewTrigger>
								<DatePicker.NextTrigger />
							</DatePicker.ViewControl>
							<DatePicker.Table>
								<DatePicker.TableBody>
									{#each datePicker().getYearsGrid({ columns: 4 }) as years, id (id)}
										<DatePicker.TableRow>
											{#each years as year, id (id)}
												<DatePicker.TableCell value={year.value}>
													<DatePicker.TableCellTrigger>{year.label}</DatePicker.TableCellTrigger>
												</DatePicker.TableCell>
											{/each}
										</DatePicker.TableRow>
									{/each}
								</DatePicker.TableBody>
							</DatePicker.Table>
						{/snippet}
					</DatePicker.Context>
				</DatePicker.View>
			</DatePicker.Content>
		</DatePicker.Positioner>
	</Portal>
</DatePicker>
```

## Guidelines

### Portal

The Date Picker content is rendered inside a [Portal](/docs/components/portal) component by default to avoid z-index stacking issues. The Portal renders the content at the end of the document body.

### Views

The Date Picker supports three different views:

- **Day view** - Select a specific day from the calendar
- **Month view** - Select a month by clicking the view trigger when in day view
- **Year view** - Select a year by clicking the view trigger when in month view

Use the `<DatePicker.View>` component with the `view` prop to define each view's layout.

### Context

The `<DatePicker.Context>` component provides access to the date picker API for rendering dynamic content like weeks, months, and years grids. Use the children snippet pattern to access the API.

### Parse Date

Use the `parseDate` helper function to convert strings or Date objects to the appropriate date format. Zag.js adjusts this using [@internationalized/date](https://github.com/adobe/react-spectrum/tree/main/packages/@internationalized/date) under the hood.

```svelte
<script lang="ts">
	import { parseDate } from '@skeletonlabs/skeleton-svelte';

	const date = parseDate('2025-10-15');
	const minDate = parseDate('2024-01-01');
	const maxDate = parseDate('2024-12-31');
</script>
```

## API Reference

### DatePickerRootProps

| Property              | Default  | Type                                                                                                                                                                                                                                                      | Description                                                                                                                                                                                 |
| --------------------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| locale?               | "en-US"  | string \| undefined                                                                                                                                                                                                                                       | The locale (BCP 47 language tag) to use when formatting the date.                                                                                                                           |
| translations?         | -        | IntlTranslations \| undefined                                                                                                                                                                                                                             | The localized messages to use.                                                                                                                                                              |
| ids?                  | -        | Partial\<\{ root: string; label: (index: number) => string; table: (id: string) => string; tableHeader: (id: string) => string; tableBody: (id: string) => string; tableRow: (id: string) => string; ... 11 more ...; positioner: string; }> \| undefined | The ids of the elements in the date picker. Useful for composition.                                                                                                                         |
| name?                 | -        | string \| undefined                                                                                                                                                                                                                                       | The \`name\` attribute of the input element.                                                                                                                                                |
| timeZone?             | "UTC"    | string \| undefined                                                                                                                                                                                                                                       | The time zone to use                                                                                                                                                                        |
| disabled?             | -        | boolean \| undefined                                                                                                                                                                                                                                      | Whether the calendar is disabled.                                                                                                                                                           |
| readOnly?             | -        | boolean \| undefined                                                                                                                                                                                                                                      | Whether the calendar is read-only.                                                                                                                                                          |
| outsideDaySelectable? | false    | boolean \| undefined                                                                                                                                                                                                                                      | Whether day outside the visible range can be selected.                                                                                                                                      |
| min?                  | -        | DateValue \| undefined                                                                                                                                                                                                                                    | The minimum date that can be selected.                                                                                                                                                      |
| max?                  | -        | DateValue \| undefined                                                                                                                                                                                                                                    | The maximum date that can be selected.                                                                                                                                                      |
| closeOnSelect?        | true     | boolean \| undefined                                                                                                                                                                                                                                      | Whether the calendar should close after the date selection is complete.&#xA;This is ignored when the selection mode is \`multiple\`.                                                        |
| value?                | -        | DateValue\[] \| undefined                                                                                                                                                                                                                                 | The controlled selected date(s).                                                                                                                                                            |
| defaultValue?         | -        | DateValue\[] \| undefined                                                                                                                                                                                                                                 | The initial selected date(s) when rendered.&#xA;Use when you don't need to control the selected date(s) of the date picker.                                                                 |
| focusedValue?         | -        | DateValue \| undefined                                                                                                                                                                                                                                    | The controlled focused date.                                                                                                                                                                |
| defaultFocusedValue?  | -        | DateValue \| undefined                                                                                                                                                                                                                                    | The initial focused date when rendered.&#xA;Use when you don't need to control the focused date of the date picker.                                                                         |
| numOfMonths?          | -        | number \| undefined                                                                                                                                                                                                                                       | The number of months to display.                                                                                                                                                            |
| startOfWeek?          | -        | number \| undefined                                                                                                                                                                                                                                       | The first day of the week.&#xA; \`0\` - Sunday&#xA; \`1\` - Monday&#xA; \`2\` - Tuesday&#xA; \`3\` - Wednesday&#xA; \`4\` - Thursday&#xA; \`5\` - Friday&#xA; \`6\` - Saturday              |
| fixedWeeks?           | -        | boolean \| undefined                                                                                                                                                                                                                                      | Whether the calendar should have a fixed number of weeks.&#xA;This renders the calendar with 6 weeks instead of 5 or 6.                                                                     |
| onValueChange?        | -        | ((details: ValueChangeDetails) => void) \| undefined                                                                                                                                                                                                      | Function called when the value changes.                                                                                                                                                     |
| onFocusChange?        | -        | ((details: FocusChangeDetails) => void) \| undefined                                                                                                                                                                                                      | Function called when the focused date changes.                                                                                                                                              |
| onViewChange?         | -        | ((details: ViewChangeDetails) => void) \| undefined                                                                                                                                                                                                       | Function called when the view changes.                                                                                                                                                      |
| onOpenChange?         | -        | ((details: OpenChangeDetails) => void) \| undefined                                                                                                                                                                                                       | Function called when the calendar opens or closes.                                                                                                                                          |
| isDateUnavailable?    | -        | ((date: DateValue, locale: string) => boolean) \| undefined                                                                                                                                                                                               | Returns whether a date of the calendar is available.                                                                                                                                        |
| selectionMode?        | "single" | SelectionMode \| undefined                                                                                                                                                                                                                                | The selection mode of the calendar.&#xA;- \`single\` - only one date can be selected&#xA;- \`multiple\` - multiple dates can be selected&#xA;- \`range\` - a range of dates can be selected |
| format?               | -        | ((date: DateValue, details: LocaleDetails) => string) \| undefined                                                                                                                                                                                        | The format of the date to display in the input.                                                                                                                                             |
| parse?                | -        | ((value: string, details: LocaleDetails) => DateValue \| undefined) \| undefined                                                                                                                                                                          | Function to parse the date from the input back to a DateValue.                                                                                                                              |
| placeholder?          | -        | string \| undefined                                                                                                                                                                                                                                       | The placeholder text to display in the input.                                                                                                                                               |
| view?                 | -        | DateView \| undefined                                                                                                                                                                                                                                     | The view of the calendar                                                                                                                                                                    |
| defaultView?          | "day"    | DateView \| undefined                                                                                                                                                                                                                                     | The default view of the calendar                                                                                                                                                            |
| minView?              | "day"    | DateView \| undefined                                                                                                                                                                                                                                     | The minimum view of the calendar                                                                                                                                                            |
| maxView?              | "year"   | DateView \| undefined                                                                                                                                                                                                                                     | The maximum view of the calendar                                                                                                                                                            |
| positioning?          | -        | PositioningOptions \| undefined                                                                                                                                                                                                                           | The user provided options used to position the date picker content                                                                                                                          |
| open?                 | -        | boolean \| undefined                                                                                                                                                                                                                                      | The controlled open state of the date picker                                                                                                                                                |
| defaultOpen?          | -        | boolean \| undefined                                                                                                                                                                                                                                      | The initial open state of the date picker when rendered.&#xA;Use when you don't need to control the open state of the date picker.                                                          |
| inline?               | -        | boolean \| undefined                                                                                                                                                                                                                                      | Whether to render the date picker inline                                                                                                                                                    |
| dir?                  | "ltr"    | "ltr" \| "rtl" \| undefined                                                                                                                                                                                                                               | The document's text/writing direction.                                                                                                                                                      |
| getRootNode?          | -        | (() => ShadowRoot \| Node \| Document) \| undefined                                                                                                                                                                                                       | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                                                                                  |
| element?              | -        | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                                                                                                                                                                                                          | Render the element yourself                                                                                                                                                                 |

### DatePickerRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => DatePickerApi\<PropTypes>                  | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### DatePickerRootContextProps

| Property | Default | Type                                         | Description |
| -------- | ------- | -------------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => DatePickerApi\<PropTypes>]> | -           |

### DatePickerLabelProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"label">]> \| undefined | Render the element yourself |

### DatePickerControlProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### DatePickerPresetTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| value    | -       | PresetTriggerValue                                  | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### DatePickerInputProps

| Property   | Default | Type                                               | Description                             |
| ---------- | ------- | -------------------------------------------------- | --------------------------------------- |
| index?     | -       | number \| undefined                                | The index of the input to focus.        |
| fixOnBlur? | true    | boolean \| undefined                               | Whether to fix the input value on blur. |
| element?   | -       | Snippet\<\[HTMLAttributes\<"input">]> \| undefined | Render the element yourself             |

### DatePickerTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### DatePickerPositionerProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### DatePickerContentProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### DatePickerYearSelectProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"select">]> \| undefined | Render the element yourself |

### DatePickerMonthSelectProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"select">]> \| undefined | Render the element yourself |

### DatePickerViewProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| view     | -       | DateView                                         | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### DatePickerViewControlProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### DatePickerPrevTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### DatePickerViewTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### DatePickerRangeTextProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### DatePickerNextTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### DatePickerTableProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"table">]> \| undefined | Render the element yourself |

### DatePickerTableHeadProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"thead">]> \| undefined | Render the element yourself |

### DatePickerTableRowProps

| Property | Default | Type                                            | Description                 |
| -------- | ------- | ----------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"tr">]> \| undefined | Render the element yourself |

### DatePickerTableHeaderProps

| Property | Default | Type                                            | Description                 |
| -------- | ------- | ----------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"th">]> \| undefined | Render the element yourself |

### DatePickerTableBodyProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"tbody">]> \| undefined | Render the element yourself |

### DatePickerTableCellProps

| Property      | Default | Type                                            | Description                 |
| ------------- | ------- | ----------------------------------------------- | --------------------------- |
| disabled?     | -       | boolean \| undefined                            | -                           |
| value         | -       | number \| DateValue                             | -                           |
| columns?      | -       | number \| undefined                             | -                           |
| visibleRange? | -       | VisibleRange \| undefined                       | -                           |
| element?      | -       | Snippet\<\[HTMLAttributes\<"td">]> \| undefined | Render the element yourself |

### DatePickerTableCellTriggerProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

# Dialog

A modal dialog for displaying content and actions.

```svelte
<script lang="ts">
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<Dialog>
	<Dialog.Trigger class="btn preset-filled">Trigger</Dialog.Trigger>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center">
			<Dialog.Content class="w-md space-y-2 card bg-surface-100-900 p-4 shadow-xl">
				<Dialog.Title class="text-2xl font-bold">Hello World</Dialog.Title>
				<Dialog.Description>This is an example of a basic dialog.</Dialog.Description>
				<Dialog.CloseTrigger class="btn preset-tonal">Close</Dialog.CloseTrigger>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
```

## Alert Dialog

The [alertdialog](https://w3c.github.io/aria/#alertdialog) role enables assistive technologies and browsers to distinguish alert dialogs from other dialogs so they have the option of giving alert dialogs special treatment, such as playing a system alert sound.

```svelte
<script lang="ts">
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<Dialog role="alertdialog">
	<Dialog.Trigger class="btn preset-filled">Trigger</Dialog.Trigger>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-error-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center">
			<Dialog.Content class="w-md space-y-2 card preset-filled-error-500 p-4 shadow-xl">
				<Dialog.Title class="text-2xl font-bold">Alert</Dialog.Title>
				<Dialog.Description>Something important has happened!</Dialog.Description>
				<Dialog.CloseTrigger class="btn preset-tonal-error">Close</Dialog.CloseTrigger>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
```

## Interaction

If desired, you can disable click to close interactions for the backdrop. We recommend using this sparingly, as this traps the
user in this experience.

```svelte
<script lang="ts">
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<Dialog closeOnInteractOutside={false}>
	<Dialog.Trigger class="btn preset-filled">Trigger</Dialog.Trigger>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center">
			<Dialog.Content class="w-md space-y-2 card bg-surface-100-900 p-4 shadow-xl">
				<Dialog.Title class="text-2xl font-bold">Dialog Title</Dialog.Title>
				<Dialog.Description
					>This dialog will only close with the Close button or via programmatic controls.</Dialog.Description
				>
				<Dialog.CloseTrigger class="btn preset-tonal">Close</Dialog.CloseTrigger>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
```

## Drawer

This example repurposes the Dialog for use as a side-panel Drawer. It also introduces basic transition animations.

```svelte
<script lang="ts">
	import { XIcon } from '@lucide/svelte';
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<Dialog>
	<Dialog.Trigger class="btn preset-filled">Trigger</Dialog.Trigger>
	<Portal>
		<Dialog.Backdrop
			class="fixed inset-0 z-50 bg-surface-50-950/50 opacity-0 transition transition-discrete data-[state=open]:opacity-100 starting:data-[state=open]:opacity-0"
		/>
		<Dialog.Positioner class="fixed inset-0 z-50 flex justify-start">
			<Dialog.Content
				class="h-screen w-sm -translate-x-full space-y-4 card bg-surface-100-900 p-4 opacity-0 shadow-xl transition transition-discrete data-[state=open]:translate-x-0 data-[state=open]:opacity-100 starting:data-[state=open]:-translate-x-full starting:data-[state=open]:opacity-0"
			>
				<header class="flex items-center justify-between">
					<Dialog.Title class="text-2xl font-bold">Drawer Title</Dialog.Title>
					<Dialog.CloseTrigger class="btn-icon preset-tonal">
						<XIcon />
					</Dialog.CloseTrigger>
				</header>
				<p>This is example content for the slide out drawer panel.</p>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
```

## Z-Index

By default we do not take an opinionated stance regarding z-index stacking. The result is the component can sometimes be occluded beneath other elements with a higher index. The Z-Index can controlled by applying a utility class to the `Positioner` component part.

```svelte
<script lang="ts">
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<Dialog>
	<Dialog.Trigger class="btn preset-filled">Trigger</Dialog.Trigger>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center">
			<Dialog.Content class="w-md space-y-2 card bg-surface-100-900 p-4 shadow-xl">
				<Dialog.Title class="text-2xl font-bold">Setting Z-Index</Dialog.Title>
				<Dialog.Description>This dialog will have a z-index value of 50.</Dialog.Description>
				<Dialog.CloseTrigger class="btn preset-tonal">Close</Dialog.CloseTrigger>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
```

## Direction

```svelte
<script lang="ts">
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<Dialog dir="rtl">
	<Dialog.Trigger class="btn preset-filled">Trigger</Dialog.Trigger>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center">
			<Dialog.Content class="w-md space-y-2 card bg-surface-100-900 p-4 shadow-xl">
				<Dialog.Title class="text-2xl font-bold">Hello World</Dialog.Title>
				<Dialog.Description>This is an example of a basic dialog.</Dialog.Description>
				<Dialog.CloseTrigger class="btn preset-tonal">Close</Dialog.CloseTrigger>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
```

## Headless

Unlike most components in Skeleton, this feature is provided "headless". This means no default styles are applied out of the box. This ensures you retain full control of all styling.

```svelte
<script lang="ts">
	import { SkullIcon } from '@lucide/svelte';
	import { Dialog, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<Dialog>
	<Dialog.Trigger>
		<SkullIcon class="size-12" />
	</Dialog.Trigger>
	<Portal>
		<Dialog.Backdrop class="fixed inset-0 z-50 bg-surface-50-950/50" />
		<Dialog.Positioner class="fixed inset-0 z-50 flex items-center justify-center p-4">
			<Dialog.Content>
				<div
					class="bg-surface-50-900/30 w-full max-w-xl space-y-4 card border border-surface-200/30 p-4 shadow-xl backdrop-blur-sm"
				>
					<header class="flex items-center justify-between">
						<Dialog.Title class="text-2xl font-bold">Hello Skeleton</Dialog.Title>
						<Dialog.CloseTrigger class="btn-icon hover:preset-tonal">&times</Dialog.CloseTrigger>
					</header>
					<img
						class="w-full overflow-hidden rounded-container"
						src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWVmbzcxanp6YmtxZ28xcXBqaXBscThsdDZ5Nm9ncWxkeWtqaHJ2bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dg/dn1PN6NtunfnUjUGFC/giphy.gif"
						alt="Skeleton Gif"
					/>
					<Dialog.Description class="text-center">Three spooky skeletons!</Dialog.Description>
				</div>
			</Dialog.Content>
		</Dialog.Positioner>
	</Portal>
</Dialog>
```

The benefits are as follows:

- You can make the `Trigger` surround any element, including an icon, button, image, etc.
- You can modify the entire structure within `Content`, including custom markup and styling.
- You may place the `CloseTrigger` anywhere, and use it as an X close option.

## API Reference

### DialogRootProps

| Property                | Default  | Type                                                                                                                                                          | Description                                                                                                                    |
| ----------------------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| dir?                    | "ltr"    | "ltr" \| "rtl" \| undefined                                                                                                                                   | The document's text/writing direction.                                                                                         |
| role?                   | "dialog" | "dialog" \| "alertdialog" \| undefined                                                                                                                        | The dialog's role                                                                                                              |
| aria-label?             | -        | string \| undefined                                                                                                                                           | Human readable label for the dialog, in event the dialog title is not rendered                                                 |
| ids?                    | -        | Partial\<\{ trigger: string; positioner: string; backdrop: string; content: string; closeTrigger: string; title: string; description: string; }> \| undefined | The ids of the elements in the dialog. Useful for composition.                                                                 |
| trapFocus?              | true     | boolean \| undefined                                                                                                                                          | Whether to trap focus inside the dialog when it's opened                                                                       |
| preventScroll?          | true     | boolean \| undefined                                                                                                                                          | Whether to prevent scrolling behind the dialog when it's opened                                                                |
| modal?                  | true     | boolean \| undefined                                                                                                                                          | Whether to prevent pointer interaction outside the element and hide all content below it                                       |
| initialFocusEl?         | -        | (() => MaybeElement) \| undefined                                                                                                                             | Element to receive focus when the dialog is opened                                                                             |
| finalFocusEl?           | -        | (() => MaybeElement) \| undefined                                                                                                                             | Element to receive focus when the dialog is closed                                                                             |
| restoreFocus?           | -        | boolean \| undefined                                                                                                                                          | Whether to restore focus to the element that had focus before the dialog was opened                                            |
| closeOnInteractOutside? | true     | boolean \| undefined                                                                                                                                          | Whether to close the dialog when the outside is clicked                                                                        |
| closeOnEscape?          | true     | boolean \| undefined                                                                                                                                          | Whether to close the dialog when the escape key is pressed                                                                     |
| open?                   | -        | boolean \| undefined                                                                                                                                          | The controlled open state of the dialog                                                                                        |
| defaultOpen?            | false    | boolean \| undefined                                                                                                                                          | The initial open state of the dialog when rendered.&#xA;Use when you don't need to control the open state of the dialog.       |
| onOpenChange?           | -        | ((details: OpenChangeDetails) => void) \| undefined                                                                                                           | Function to call when the dialog's open state changes                                                                          |
| getRootNode?            | -        | (() => Node \| ShadowRoot \| Document) \| undefined                                                                                                           | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                     |
| onEscapeKeyDown?        | -        | ((event: KeyboardEvent) => void) \| undefined                                                                                                                 | Function called when the escape key is pressed                                                                                 |
| onRequestDismiss?       | -        | ((event: LayerDismissEvent) => void) \| undefined                                                                                                             | Function called when this layer is closed due to a parent layer being closed                                                   |
| onPointerDownOutside?   | -        | ((event: PointerDownOutsideEvent) => void) \| undefined                                                                                                       | Function called when the pointer is pressed down outside the component                                                         |
| onFocusOutside?         | -        | ((event: FocusOutsideEvent) => void) \| undefined                                                                                                             | Function called when the focus is moved outside the component                                                                  |
| onInteractOutside?      | -        | ((event: InteractOutsideEvent) => void) \| undefined                                                                                                          | Function called when an interaction happens outside the component                                                              |
| persistentElements?     | -        | (() => Element \| null)\[] \| undefined                                                                                                                       | Returns the persistent elements that:&#xA;- should not have pointer-events disabled&#xA;- should not trigger the dismiss event |
| children?               | -        | Snippet\<\[]> \| undefined                                                                                                                                    | The default slot content to be rendered within the component.                                                                  |

### DialogRootProviderProps

| Property  | Default | Type                        | Description                                                   |
| --------- | ------- | --------------------------- | ------------------------------------------------------------- |
| value     | -       | () => DialogApi\<PropTypes> | -                                                             |
| children? | -       | Snippet\<\[]> \| undefined  | The default slot content to be rendered within the component. |

### DialogRootContextProps

| Property | Default | Type                                     | Description |
| -------- | ------- | ---------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => DialogApi\<PropTypes>]> | -           |

### DialogTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### DialogBackdropProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### DialogPositionerProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### DialogContentProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### DialogTitleProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### DialogDescriptionProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### DialogCloseTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

# File Upload

A component for uploading files with drag-and-drop and browse support.

```svelte
<script lang="ts">
	import { FileUpload } from '@skeletonlabs/skeleton-svelte';
</script>

<FileUpload>
	<FileUpload.Label>Label</FileUpload.Label>
	<FileUpload.Dropzone>
		<FileUpload.Trigger>Browse Files</FileUpload.Trigger>
		<FileUpload.HiddenInput />
	</FileUpload.Dropzone>
	<FileUpload.ItemGroup>
		<FileUpload.Context>
			{#snippet children(fileUpload)}
				{#each fileUpload().acceptedFiles as file (file.name)}
					<FileUpload.Item {file}>
						<FileUpload.ItemName>{file.name}</FileUpload.ItemName>
						<FileUpload.ItemSizeText>{file.size} bytes</FileUpload.ItemSizeText>
						<FileUpload.ItemDeleteTrigger />
					</FileUpload.Item>
				{/each}
			{/snippet}
		</FileUpload.Context>
	</FileUpload.ItemGroup>
</FileUpload>
```

## Custom Content

Supply your own text and icons within the dropzone.

```svelte
<script lang="ts">
	import { FileIcon } from '@lucide/svelte';
	import { FileUpload } from '@skeletonlabs/skeleton-svelte';
</script>

<FileUpload>
	<FileUpload.Dropzone>
		<FileIcon class="size-10" />
		<span>Select file or drag here.</span>
		<FileUpload.Trigger>Browse Files</FileUpload.Trigger>
		<FileUpload.HiddenInput />
	</FileUpload.Dropzone>
	<FileUpload.ItemGroup>
		<FileUpload.Context>
			{#snippet children(fileUpload)}
				{#each fileUpload().acceptedFiles as file (file.name)}
					<FileUpload.Item {file}>
						<FileUpload.ItemName>{file.name}</FileUpload.ItemName>
						<FileUpload.ItemSizeText>{file.size} bytes</FileUpload.ItemSizeText>
						<FileUpload.ItemDeleteTrigger />
					</FileUpload.Item>
				{/each}
			{/snippet}
		</FileUpload.Context>
	</FileUpload.ItemGroup>
</FileUpload>
```

## Disabled

```svelte
<script lang="ts">
	import { FileUpload } from '@skeletonlabs/skeleton-svelte';
</script>

<FileUpload disabled={true}>
	<FileUpload.Dropzone>
		<FileUpload.Trigger>Browse Files</FileUpload.Trigger>
		<FileUpload.HiddenInput />
	</FileUpload.Dropzone>
	<FileUpload.ItemGroup>
		<FileUpload.Context>
			{#snippet children(fileUpload)}
				{#each fileUpload().acceptedFiles as file (file.name)}
					<FileUpload.Item {file}>
						<FileUpload.ItemName>{file.name}</FileUpload.ItemName>
						<FileUpload.ItemSizeText>{file.size} bytes</FileUpload.ItemSizeText>
						<FileUpload.ItemDeleteTrigger />
					</FileUpload.Item>
				{/each}
			{/snippet}
		</FileUpload.Context>
	</FileUpload.ItemGroup>
</FileUpload>
```

## Button Only

```svelte
<script lang="ts">
	import { FileUpload } from '@skeletonlabs/skeleton-svelte';
</script>

<FileUpload class="w-fit" onFileAccept={console.log}>
	<FileUpload.Trigger>Browse Files</FileUpload.Trigger>
	<FileUpload.HiddenInput />
</FileUpload>
```

## Clear Files

Use the [Provider Pattern](/docs/get-started/fundamentals#provider-pattern) to gain access to the `clearFiles` method.

```svelte
<script lang="ts">
	import { FileUpload, useFileUpload } from '@skeletonlabs/skeleton-svelte';

	const id = $props.id();
	const fileUpload = useFileUpload({
		id,
		defaultAcceptedFiles: [new File(['file'], 'example.png', { type: 'image/png' })]
	});
</script>

<div class="grid w-full gap-4">
	<FileUpload.Provider value={fileUpload}>
		<FileUpload.Dropzone>
			<FileUpload.Trigger>Browse Files</FileUpload.Trigger>
			<FileUpload.HiddenInput />
		</FileUpload.Dropzone>
		<FileUpload.ItemGroup>
			<FileUpload.Context>
				{#snippet children(fileUpload)}
					{#each fileUpload().acceptedFiles as file (file.name)}
						<FileUpload.Item {file}>
							<FileUpload.ItemName>{file.name}</FileUpload.ItemName>
							<FileUpload.ItemSizeText>{file.size} bytes</FileUpload.ItemSizeText>
							<FileUpload.ItemDeleteTrigger />
						</FileUpload.Item>
					{/each}
				{/snippet}
			</FileUpload.Context>
		</FileUpload.ItemGroup>
	</FileUpload.Provider>

	<button
		class="btn w-fit preset-filled hover:preset-filled-error-500"
		onclick={() => fileUpload().clearFiles()}>Clear Files</button
	>
</div>
```

## Direction

```svelte
<script lang="ts">
	import { FileUpload } from '@skeletonlabs/skeleton-svelte';
</script>

<FileUpload dir="rtl">
	<FileUpload.Label>Label</FileUpload.Label>
	<FileUpload.Dropzone>
		<FileUpload.Trigger>Browse Files</FileUpload.Trigger>
		<FileUpload.HiddenInput />
	</FileUpload.Dropzone>
	<FileUpload.ItemGroup>
		<FileUpload.Context>
			{#snippet children(fileUpload)}
				{#each fileUpload().acceptedFiles as file (file.name)}
					<FileUpload.Item {file}>
						<FileUpload.ItemName>{file.name}</FileUpload.ItemName>
						<FileUpload.ItemSizeText>{file.size} bytes</FileUpload.ItemSizeText>
						<FileUpload.ItemDeleteTrigger />
					</FileUpload.Item>
				{/each}
			{/snippet}
		</FileUpload.Context>
	</FileUpload.ItemGroup>
</FileUpload>
```

## API Reference

### FileUploadRootProps

| Property              | Default  | Type                                                                                                                                                                                                                                                        | Description                                                                                                       |
| --------------------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| name?                 | -        | string \| undefined                                                                                                                                                                                                                                         | The name of the underlying file input                                                                             |
| ids?                  | -        | Partial\<\{ root: string; dropzone: string; hiddenInput: string; trigger: string; label: string; item: (id: string) => string; itemName: (id: string) => string; itemSizeText: (id: string) => string; itemPreview: (id: string) => string; }> \| undefined | The ids of the elements. Useful for composition.                                                                  |
| translations?         | -        | IntlTranslations \| undefined                                                                                                                                                                                                                               | The localized messages to use.                                                                                    |
| accept?               | -        | Record\<string, string\[]> \| FileMimeType \| FileMimeType\[] \| undefined                                                                                                                                                                                  | The accept file types                                                                                             |
| disabled?             | -        | boolean \| undefined                                                                                                                                                                                                                                        | Whether the file input is disabled                                                                                |
| required?             | -        | boolean \| undefined                                                                                                                                                                                                                                        | Whether the file input is required                                                                                |
| allowDrop?            | true     | boolean \| undefined                                                                                                                                                                                                                                        | Whether to allow drag and drop in the dropzone element                                                            |
| maxFileSize?          | Infinity | number \| undefined                                                                                                                                                                                                                                         | The maximum file size in bytes                                                                                    |
| minFileSize?          | 0        | number \| undefined                                                                                                                                                                                                                                         | The minimum file size in bytes                                                                                    |
| maxFiles?             | 1        | number \| undefined                                                                                                                                                                                                                                         | The maximum number of files                                                                                       |
| preventDocumentDrop?  | true     | boolean \| undefined                                                                                                                                                                                                                                        | Whether to prevent the drop event on the document                                                                 |
| validate?             | -        | ((file: File, details: FileValidateDetails) => FileError\[] \| null) \| undefined                                                                                                                                                                           | Function to validate a file                                                                                       |
| defaultAcceptedFiles? | -        | File\[] \| undefined                                                                                                                                                                                                                                        | The default accepted files when rendered.&#xA;Use when you don't need to control the accepted files of the input. |
| acceptedFiles?        | -        | File\[] \| undefined                                                                                                                                                                                                                                        | The controlled accepted files                                                                                     |
| onFileChange?         | -        | ((details: FileChangeDetails) => void) \| undefined                                                                                                                                                                                                         | Function called when the value changes, whether accepted or rejected                                              |
| onFileAccept?         | -        | ((details: FileAcceptDetails) => void) \| undefined                                                                                                                                                                                                         | Function called when the file is accepted                                                                         |
| onFileReject?         | -        | ((details: FileRejectDetails) => void) \| undefined                                                                                                                                                                                                         | Function called when the file is rejected                                                                         |
| capture?              | -        | "user" \| "environment" \| undefined                                                                                                                                                                                                                        | The default camera to use when capturing media                                                                    |
| directory?            | -        | boolean \| undefined                                                                                                                                                                                                                                        | Whether to accept directories, only works in webkit browsers                                                      |
| invalid?              | -        | boolean \| undefined                                                                                                                                                                                                                                        | Whether the file input is invalid                                                                                 |
| transformFiles?       | -        | ((files: File\[]) => Promise\<File\[]>) \| undefined                                                                                                                                                                                                        | Function to transform the accepted files to apply transformations                                                 |
| locale?               | "en-US"  | string \| undefined                                                                                                                                                                                                                                         | The current locale. Based on the BCP 47 definition.                                                               |
| dir?                  | "ltr"    | "ltr" \| "rtl" \| undefined                                                                                                                                                                                                                                 | The document's text/writing direction.                                                                            |
| getRootNode?          | -        | (() => ShadowRoot \| Node \| Document) \| undefined                                                                                                                                                                                                         | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                        |
| element?              | -        | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                                                                                                                                                                                                            | Render the element yourself                                                                                       |

### FileUploadRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => FileUploadApi\<PropTypes>                  | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### FileUploadRootContextProps

| Property | Default | Type                                         | Description |
| -------- | ------- | -------------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => FileUploadApi\<PropTypes>]> | -           |

### FileUploadLabelProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"label">]> \| undefined | Render the element yourself |

### FileUploadDropzoneProps

| Property      | Default | Type                                             | Description                                        |
| ------------- | ------- | ------------------------------------------------ | -------------------------------------------------- |
| disableClick? | -       | boolean \| undefined                             | Whether to disable the click event on the dropzone |
| element?      | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself                        |

### FileUploadTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### FileUploadHiddenInputProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"input">]> \| undefined | Render the element yourself |

### FileUploadItemGroupProps

| Property | Default | Type                                            | Description                 |
| -------- | ------- | ----------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"ul">]> \| undefined | Render the element yourself |

### FileUploadItemProps

| Property | Default | Type                                            | Description                 |
| -------- | ------- | ----------------------------------------------- | --------------------------- |
| file     | -       | File                                            | -                           |
| type?    | -       | ItemType \| undefined                           | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"li">]> \| undefined | Render the element yourself |

### FileUploadItemNameProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### FileUploadItemSizeTextProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### FileUploadItemDeleteTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

# Listbox

Select one or more items from a list of options.

```svelte
<script lang="ts">
	import { Listbox, useListCollection } from '@skeletonlabs/skeleton-svelte';

	const data = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Carrot', value: 'carrot' },
		{ label: 'Broccoli', value: 'broccoli' },
		{ label: 'Spinach', value: 'spinach' }
	];

	const collection = useListCollection({
		items: data,
		itemToString: (item) => item.label,
		itemToValue: (item) => item.value
	});
</script>

<Listbox class="w-full max-w-md" {collection}>
	<Listbox.Label>Label</Listbox.Label>
	<Listbox.Content>
		{#each collection.items as item (item.value)}
			<Listbox.Item {item}>
				<Listbox.ItemText>{item.label}</Listbox.ItemText>
				<Listbox.ItemIndicator />
			</Listbox.Item>
		{/each}
	</Listbox.Content>
</Listbox>
```

## Groups

Create labelled groups for your items.

```svelte
<script lang="ts">
	import { Listbox, useListCollection } from '@skeletonlabs/skeleton-svelte';

	const data = [
		{ label: 'Apple', value: 'apple', type: 'Fruits' },
		{ label: 'Banana', value: 'banana', type: 'Fruits' },
		{ label: 'Orange', value: 'orange', type: 'Fruits' },
		{ label: 'Carrot', value: 'carrot', type: 'Vegetables' },
		{ label: 'Broccoli', value: 'broccoli', type: 'Vegetables' },
		{ label: 'Spinach', value: 'spinach', type: 'Vegetables' }
	];

	const collection = useListCollection({
		items: data,
		itemToString: (item) => item.label,
		itemToValue: (item) => item.value,
		groupBy: (item) => item.type
	});
</script>

<Listbox class="w-full max-w-md" {collection}>
	<Listbox.Label>Label</Listbox.Label>
	<Listbox.Content>
		{#each collection.group() as [type, items] (type)}
			<Listbox.ItemGroup>
				<Listbox.ItemGroupLabel>{type}</Listbox.ItemGroupLabel>
				{#each items as item (item.value)}
					<Listbox.Item {item}>
						<Listbox.ItemText>{item.label}</Listbox.ItemText>
						<Listbox.ItemIndicator />
					</Listbox.Item>
				{/each}
			</Listbox.ItemGroup>
		{/each}
	</Listbox.Content>
</Listbox>
```

## Multiple

Select multiple items from the list.

```svelte
<script lang="ts">
	import { Listbox, useListCollection } from '@skeletonlabs/skeleton-svelte';

	const data = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Carrot', value: 'carrot' },
		{ label: 'Broccoli', value: 'broccoli' },
		{ label: 'Spinach', value: 'spinach' }
	];

	const collection = useListCollection({
		items: data,
		itemToString: (item) => item.label,
		itemToValue: (item) => item.value
	});
</script>

<Listbox class="w-full max-w-md" {collection} selectionMode="multiple">
	<Listbox.Label>Label</Listbox.Label>
	<Listbox.Content>
		{#each collection.items as item (item.value)}
			<Listbox.Item {item}>
				<Listbox.ItemText>{item.label}</Listbox.ItemText>
				<Listbox.ItemIndicator />
			</Listbox.Item>
		{/each}
	</Listbox.Content>
</Listbox>
```

## Disabled

Disable the entire listbox.

```svelte
<script lang="ts">
	import { Listbox, useListCollection } from '@skeletonlabs/skeleton-svelte';

	const data = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Carrot', value: 'carrot' },
		{ label: 'Broccoli', value: 'broccoli' },
		{ label: 'Spinach', value: 'spinach' }
	];

	const collection = useListCollection({
		items: data,
		itemToString: (item) => item.label,
		itemToValue: (item) => item.value
	});
</script>

<Listbox class="w-full max-w-md" {collection} disabled={true}>
	<Listbox.Label>Label</Listbox.Label>
	<Listbox.Content>
		{#each collection.items as item (item.value)}
			<Listbox.Item {item}>
				<Listbox.ItemText>{item.label}</Listbox.ItemText>
				<Listbox.ItemIndicator />
			</Listbox.Item>
		{/each}
	</Listbox.Content>
</Listbox>
```

## Disabled Item

Disable specific items in the list.

```svelte
<script lang="ts">
	import { Listbox, useListCollection } from '@skeletonlabs/skeleton-svelte';

	const data = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Carrot', value: 'carrot' },
		{ label: 'Broccoli', value: 'broccoli' },
		{ label: 'Spinach', value: 'spinach' }
	];

	const collection = useListCollection({
		items: data,
		itemToString: (item) => item.label,
		itemToValue: (item) => item.value,
		isItemDisabled: (item) => item.value === 'banana'
	});
</script>

<Listbox class="w-full max-w-md" {collection}>
	<Listbox.Label>Label</Listbox.Label>
	<Listbox.Content>
		{#each collection.items as item (item.value)}
			<Listbox.Item {item}>
				<Listbox.ItemText>{item.label}</Listbox.ItemText>
				<Listbox.ItemIndicator />
			</Listbox.Item>
		{/each}
	</Listbox.Content>
</Listbox>
```

## Search

Add a search input to filter items.

```svelte
<script lang="ts">
	import { Listbox, useListCollection } from '@skeletonlabs/skeleton-svelte';

	const data = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Carrot', value: 'carrot' },
		{ label: 'Broccoli', value: 'broccoli' },
		{ label: 'Spinach', value: 'spinach' }
	];

	let query = $state('');

	const collection = $derived(
		useListCollection({
			items: data.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
			itemToString: (item) => item.label,
			itemToValue: (item) => item.value
		})
	);
</script>

<Listbox class="w-full max-w-md" {collection}>
	<Listbox.Label>Label</Listbox.Label>
	<Listbox.Input
		placeholder="Type to search..."
		value={query}
		onchange={(e) => (query = e.currentTarget.value)}
	/>
	<Listbox.Content>
		{#each collection.items as item (item.value)}
			<Listbox.Item {item}>
				<Listbox.ItemText>{item.label}</Listbox.ItemText>
				<Listbox.ItemIndicator />
			</Listbox.Item>
		{/each}
	</Listbox.Content>
</Listbox>
```

## Direction

Control the text direction of the listbox.

```svelte
<script lang="ts">
	import { Listbox, useListCollection } from '@skeletonlabs/skeleton-svelte';

	const data = [
		{ label: 'Apple', value: 'apple' },
		{ label: 'Banana', value: 'banana' },
		{ label: 'Orange', value: 'orange' },
		{ label: 'Carrot', value: 'carrot' },
		{ label: 'Broccoli', value: 'broccoli' },
		{ label: 'Spinach', value: 'spinach' }
	];

	const collection = useListCollection({
		items: data,
		itemToString: (item) => item.label,
		itemToValue: (item) => item.value
	});
</script>

<Listbox class="w-full max-w-md" {collection} dir="rtl">
	<Listbox.Label>Label</Listbox.Label>
	<Listbox.Content>
		{#each collection.items as item (item.value)}
			<Listbox.Item {item}>
				<Listbox.ItemText>{item.label}</Listbox.ItemText>
				<Listbox.ItemIndicator />
			</Listbox.Item>
		{/each}
	</Listbox.Content>
</Listbox>
```

## API Reference

### ListboxRootProps

| Property                 | Default    | Type                                                                                                                                                                                                             | Description                                                                                                                                                                                                                                                                       |
| ------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| orientation?             | "vertical" | "horizontal" \| "vertical" \| undefined                                                                                                                                                                          | The orientation of the listbox.                                                                                                                                                                                                                                                   |
| collection               | -          | ListCollection\<any> \| GridCollection\<any>                                                                                                                                                                     | The item collection                                                                                                                                                                                                                                                               |
| ids?                     | -          | Partial\<\{ root: string; content: string; label: string; item: (id: string \| number) => string; itemGroup: (id: string \| number) => string; itemGroupLabel: (id: string \| number) => string; }> \| undefined | The ids of the elements in the listbox. Useful for composition.                                                                                                                                                                                                                   |
| disabled?                | -          | boolean \| undefined                                                                                                                                                                                             | Whether the listbox is disabled                                                                                                                                                                                                                                                   |
| disallowSelectAll?       | -          | boolean \| undefined                                                                                                                                                                                             | Whether to disallow selecting all items when \`meta+a\` is pressed                                                                                                                                                                                                                |
| onHighlightChange?       | -          | ((details: HighlightChangeDetails\<any>) => void) \| undefined                                                                                                                                                   | The callback fired when the highlighted item changes.                                                                                                                                                                                                                             |
| onValueChange?           | -          | ((details: ValueChangeDetails\<any>) => void) \| undefined                                                                                                                                                       | The callback fired when the selected item changes.                                                                                                                                                                                                                                |
| value?                   | -          | string\[] \| undefined                                                                                                                                                                                           | The controlled keys of the selected items                                                                                                                                                                                                                                         |
| defaultValue?            | \[]        | string\[] \| undefined                                                                                                                                                                                           | The initial default value of the listbox when rendered.&#xA;Use when you don't need to control the value of the listbox.                                                                                                                                                          |
| highlightedValue?        | -          | string \| null \| undefined                                                                                                                                                                                      | The controlled key of the highlighted item                                                                                                                                                                                                                                        |
| defaultHighlightedValue? | -          | string \| null \| undefined                                                                                                                                                                                      | The initial value of the highlighted item when opened.&#xA;Use when you don't need to control the highlighted value of the listbox.                                                                                                                                               |
| loopFocus?               | false      | boolean \| undefined                                                                                                                                                                                             | Whether to loop the keyboard navigation through the options                                                                                                                                                                                                                       |
| selectionMode?           | "single"   | SelectionMode \| undefined                                                                                                                                                                                       | How multiple selection should behave in the listbox.&#xA;&#xA;- \`single\`: The user can select a single item.&#xA;- \`multiple\`: The user can select multiple items without using modifier keys.&#xA;- \`extended\`: The user can select multiple items by using modifier keys. |
| scrollToIndexFn?         | -          | ((details: ScrollToIndexDetails) => void) \| undefined                                                                                                                                                           | Function to scroll to a specific index                                                                                                                                                                                                                                            |
| selectOnHighlight?       | -          | boolean \| undefined                                                                                                                                                                                             | Whether to select the item when it is highlighted                                                                                                                                                                                                                                 |
| deselectable?            | -          | boolean \| undefined                                                                                                                                                                                             | Whether to disallow empty selection                                                                                                                                                                                                                                               |
| typeahead?               | -          | boolean \| undefined                                                                                                                                                                                             | Whether to enable typeahead on the listbox                                                                                                                                                                                                                                        |
| onSelect?                | -          | ((details: SelectionDetails) => void) \| undefined                                                                                                                                                               | Function called when an item is selected                                                                                                                                                                                                                                          |
| dir?                     | "ltr"      | "ltr" \| "rtl" \| undefined                                                                                                                                                                                      | The document's text/writing direction.                                                                                                                                                                                                                                            |
| getRootNode?             | -          | (() => ShadowRoot \| Node \| Document) \| undefined                                                                                                                                                              | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                                                                                                                                                                        |
| element?                 | -          | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                                                                                                                                                                 | Render the element yourself                                                                                                                                                                                                                                                       |

### ListboxRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => ListboxApi\<PropTypes, any>                | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ListboxRootContextProps

| Property | Default | Type                                           | Description |
| -------- | ------- | ---------------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => ListboxApi\<PropTypes, any>]> | -           |

### ListboxLabelProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"label">]> \| undefined | Render the element yourself |

### ListboxInputProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"input">]> \| undefined | Render the element yourself |

### ListboxContentProps

| Property | Default | Type                                            | Description                 |
| -------- | ------- | ----------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"ul">]> \| undefined | Render the element yourself |

### ListboxItemGroupProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ListboxItemGroupLabelProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ListboxItemProps

| Property          | Default | Type                                            | Description                            |
| ----------------- | ------- | ----------------------------------------------- | -------------------------------------- |
| item              | -       | any                                             | The item to render                     |
| highlightOnHover? | -       | boolean \| undefined                            | Whether to highlight the item on hover |
| element?          | -       | Snippet\<\[HTMLAttributes\<"li">]> \| undefined | Render the element yourself            |

### ListboxItemTextProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

### ListboxItemIndicatorProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

# Navigation

A flexible navigation interface for large, medium, and small screens.

## Bar

```svelte
<script lang="ts">
	import { BikeIcon, BookIcon, HouseIcon, TreePalmIcon } from '@lucide/svelte';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';

	const links = [
		{ label: 'Home', href: '#', icon: HouseIcon },
		{ label: 'Entertainment', href: '#', icon: BookIcon },
		{ label: 'Recreation', href: '#', icon: BikeIcon },
		{ label: 'Relaxation', href: '#', icon: TreePalmIcon }
	];
	let anchorBar = 'btn hover:preset-tonal flex-col items-center gap-1';
</script>

<div class="grid h-[667px] w-[375px] grid-rows-[1fr_auto] border border-surface-200-800">
	<div class="flex items-center justify-center">
		<p>Contents</p>
	</div>
	<!-- --- -->
	<Navigation layout="bar">
		<Navigation.Menu class="grid grid-cols-4 gap-2">
			{#each links as link (link)}
				{@const Icon = link.icon}
				<a href={link.href} class={anchorBar}>
					<Icon class="size-5" />
					<span class="text-[10px]">{link.label}</span>
				</a>
			{/each}
		</Navigation.Menu>
	</Navigation>
	<!-- --- -->
</div>
```

- Recommended for small sized screens (ex: mobile).
- Ideal for vertical screen layouts.
- Should be fixed to the bottom of the viewport.
- Supports 3-5 tiles based on contents and viewport width.
- Consider progressive enhancement with the [Virtual Keyboard API](https://developer.mozilla.org/en-US/docs/Web/API/VirtualKeyboard_API).

## Rail

```svelte
<script lang="ts">
	import {
		BikeIcon,
		BookIcon,
		HouseIcon,
		SettingsIcon,
		SkullIcon,
		TreePalmIcon
	} from '@lucide/svelte';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';

	const links = [
		{ label: 'Home', href: '#', icon: HouseIcon },
		{ label: 'Entertainment', href: '#', icon: BookIcon },
		{ label: 'Recreation', href: '#', icon: BikeIcon },
		{ label: 'Relaxation', href: '#', icon: TreePalmIcon }
	];
	let anchorRail =
		'btn hover:preset-tonal aspect-square w-full max-w-[84px] flex flex-col items-center gap-0.5';
</script>

<div class="grid h-[640px] w-full grid-cols-[auto_1fr] border border-surface-200-800">
	<!-- --- -->
	<Navigation layout="rail">
		<Navigation.Header>
			<a href="/" class={anchorRail} title="View Homepage" aria-label="View Homepage">
				<SkullIcon class="size-8" />
			</a>
		</Navigation.Header>
		<Navigation.Content>
			<Navigation.Menu>
				{#each links as link (link)}
					{@const Icon = link.icon}
					<a href={link.href} class={anchorRail}>
						<Icon class="size-5" />
						<span class="text-xs">{link.label}</span>
					</a>
				{/each}
			</Navigation.Menu>
		</Navigation.Content>
		<Navigation.Footer>
			<a href="/settings" class={anchorRail} title="Settings" aria-label="Settings">
				<SettingsIcon class="size-5" />
			</a>
		</Navigation.Footer>
	</Navigation>
	<!-- --- -->
	<div class="flex items-center justify-center">
		<p class="opacity-50">Contents</p>
	</div>
</div>
```

- Recommended for medium sized screens (ex: tablet).
- Ideal for horizontal screen layouts.
- Should be fixed to the left or right of the viewport.
- Supports 3-7 tiles based on contents and viewport height.

## Sidebar

```svelte
<script lang="ts">
	import {
		BedDoubleIcon,
		BikeIcon,
		BookIcon,
		BubblesIcon,
		HouseIcon,
		MountainIcon,
		PopcornIcon,
		SailboatIcon,
		SettingsIcon,
		SkullIcon,
		TreePalmIcon,
		TvIcon
	} from '@lucide/svelte';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';

	const linksSidebar = {
		entertainment: [
			{ label: 'Books', href: '#', icon: BookIcon },
			{ label: 'Movies', href: '#', icon: PopcornIcon },
			{ label: 'Television', href: '#', icon: TvIcon }
		],
		recreation: [
			{ label: 'Biking', href: '#', icon: BikeIcon },
			{ label: 'Sailing', href: '#', icon: SailboatIcon },
			{ label: 'Hiking', href: '#', icon: MountainIcon }
		],
		relaxation: [
			{ label: 'Lounge', href: '#', icon: TreePalmIcon },
			{ label: 'Spa', href: '#', icon: BubblesIcon },
			{ label: 'Sleep', href: '#', icon: BedDoubleIcon }
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
	<div class="flex items-center justify-center">
		<p class="opacity-50">Contents</p>
	</div>
</div>
```

- Recommended for large sized screens (ex: desktop).
- Ideal for horizontal screen layouts.
- Should be fixed to the left or right of the viewport.
- Supports multiple groups of links for deep navigation.
- Supports a label field per each group.
- Can scroll vertically if contents extend beyond the viewport height.

## Toggle Layout

Using reactive state we can dynamically switch between multiple layouts. Tap the double arrow icon to toggle.

```svelte
<script lang="ts">
	import { ArrowLeftRightIcon, BikeIcon, BookIcon, HouseIcon, TreePalmIcon } from '@lucide/svelte';
	import { Navigation } from '@skeletonlabs/skeleton-svelte';

	const links = [
		{ label: 'Home', href: '#', icon: HouseIcon },
		{ label: 'Entertainment', href: '#', icon: BookIcon },
		{ label: 'Recreation', href: '#', icon: BikeIcon },
		{ label: 'Relaxation', href: '#', icon: TreePalmIcon }
	];

	const buttonClasses = 'btn hover:preset-tonal';
	let anchorRail = `${buttonClasses} aspect-square w-full max-w-[84px] flex flex-col items-center gap-0.5`;
	let anchorSidebar = `${buttonClasses} justify-start px-2 w-full`;

	let layoutRail = $state(true);

	function toggleLayout() {
		layoutRail = !layoutRail;
	}
</script>

<div class="grid h-[728px] w-full grid-cols-[auto_1fr] items-stretch border border-surface-200-800">
	<!-- --- -->
	<Navigation
		layout={layoutRail ? 'rail' : 'sidebar'}
		class={layoutRail ? '' : 'grid grid-rows-[1fr_auto] gap-4'}
	>
		<Navigation.Content>
			<Navigation.Menu>
				{#each links as link (link)}
					{@const Icon = link.icon}
					<a href={link.href} class={layoutRail ? anchorRail : anchorSidebar}>
						<Icon class={layoutRail ? 'size-5' : 'size-4'} />
						<span class={layoutRail ? 'text-[10px]' : ''}>{link.label}</span>
					</a>
				{/each}
			</Navigation.Menu>
		</Navigation.Content>
		<Navigation.Footer>
			<button type="button" class={layoutRail ? anchorRail : anchorSidebar} onclick={toggleLayout}>
				<ArrowLeftRightIcon class={layoutRail ? 'size-5' : 'size-4'} />
				{#if !layoutRail}<span>Resize</span>{/if}
			</button>
		</Navigation.Footer>
	</Navigation>
	<!-- --- -->
	<div class="flex items-center justify-center">
		<pre class="pre">Layout: {layoutRail ? 'Rail' : 'Sidebar'}</pre>
	</div>
</div>
```

## API Reference

### NavigationRootProps

| Property | Default | Type                                             | Description                                                                                  |
| -------- | ------- | ------------------------------------------------ | -------------------------------------------------------------------------------------------- |
| layout?  | bar     | "bar" \| "rail" \| "sidebar" \| undefined        | Sets the data-layout attribute, which modifies the visual presentation of the component set. |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself                                                                  |

### NavigationHeaderProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"header">]> \| undefined | Render the element yourself |

### NavigationContentProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### NavigationGroupProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### NavigationLabelProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### NavigationMenuProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### NavigationFooterProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"footer">]> \| undefined | Render the element yourself |

# Pagination

Navigate between multiple pages of content.

```svelte
<script lang="ts" module>
	import { faker } from '@faker-js/faker';

	const users = Array.from({ length: 500 }, (_, i) => ({
		id: i + 1,
		name: faker.person.fullName(),
		email: faker.internet.email(),
		country: faker.location.country()
	}));

	const PAGE_SIZE = 5;
</script>

<script>
	import { ArrowLeftIcon, ArrowRightIcon } from '@lucide/svelte';
	import { Pagination } from '@skeletonlabs/skeleton-svelte';

	let page = $state(1);

	const start = $derived((page - 1) * PAGE_SIZE);
	const end = $derived(start + PAGE_SIZE);
	const data = $derived(users.slice(start, end));
</script>

<div class="grid w-full place-items-center gap-4">
	<table class="table table-auto">
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Email</th>
				<th>Country</th>
			</tr>
		</thead>
		<tbody>
			{#each data as user}
				<tr>
					<td>{user.id}</td>
					<td>{user.name}</td>
					<td>{user.email}</td>
					<td>{user.country}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<Pagination
		count={users.length}
		pageSize={PAGE_SIZE}
		{page}
		onPageChange={(event) => (page = event.page)}
	>
		<Pagination.PrevTrigger>
			<ArrowLeftIcon class="size-4" />
		</Pagination.PrevTrigger>
		<Pagination.Context>
			{#snippet children(pagination)}
				{#each pagination().pages as page, index (page)}
					{#if page.type === 'page'}
						<Pagination.Item {...page}>
							{page.value}
						</Pagination.Item>
					{:else}
						<Pagination.Ellipsis {index}>&#8230;</Pagination.Ellipsis>
					{/if}
				{/each}
			{/snippet}
		</Pagination.Context>
		<Pagination.NextTrigger>
			<ArrowRightIcon class="size-4" />
		</Pagination.NextTrigger>
	</Pagination>
</div>
```

## Page Size

```svelte
<script lang="ts" module>
	import { faker } from '@faker-js/faker';

	const users = Array.from({ length: 500 }, (_, i) => ({
		id: i + 1,
		name: faker.person.fullName(),
		email: faker.internet.email(),
		country: faker.location.country()
	}));
</script>

<script>
	import { ArrowLeftIcon, ArrowRightIcon } from '@lucide/svelte';
	import { Pagination } from '@skeletonlabs/skeleton-svelte';

	let page = $state(1);
	let pageSize = $state(5);

	const start = $derived((page - 1) * pageSize);
	const end = $derived(start + pageSize);
	const data = $derived(users.slice(start, end));
</script>

<div class="grid w-full place-items-center gap-4">
	<table class="table table-auto">
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Email</th>
				<th>Country</th>
			</tr>
		</thead>
		<tbody>
			{#each data as user}
				<tr>
					<td>{user.id}</td>
					<td>{user.name}</td>
					<td>{user.email}</td>
					<td>{user.country}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<div class="flex w-full items-center justify-between gap-4">
		<label class="label">
			<span class="sr-only">Page Size</span>
			<select
				class="select w-fit"
				value={String(pageSize)}
				onchange={(e) => (pageSize = Number(e.currentTarget.value))}
			>
				<option value="5">5</option>
				<option value="10">10</option>
				<option value="20">20</option>
			</select>
		</label>
		<Pagination
			count={users.length}
			{pageSize}
			{page}
			onPageChange={(event) => (page = event.page)}
		>
			<Pagination.PrevTrigger>
				<ArrowLeftIcon class="size-4" />
			</Pagination.PrevTrigger>
			<Pagination.Context>
				{#snippet children(pagination)}
					{#each pagination().pages as page, index (page)}
						{#if page.type === 'page'}
							<Pagination.Item {...page}>
								{page.value}
							</Pagination.Item>
						{:else}
							<Pagination.Ellipsis {index}>&#8230;</Pagination.Ellipsis>
						{/if}
					{/each}
				{/snippet}
			</Pagination.Context>
			<Pagination.NextTrigger>
				<ArrowRightIcon class="size-4" />
			</Pagination.NextTrigger>
		</Pagination>
	</div>
</div>
```

## Direction

```svelte
<script lang="ts" module>
	import { faker } from '@faker-js/faker';

	const users = Array.from({ length: 500 }, (_, i) => ({
		id: i + 1,
		name: faker.person.fullName(),
		email: faker.internet.email(),
		country: faker.location.country()
	}));

	const PAGE_SIZE = 5;
</script>

<script>
	import { ArrowLeftIcon, ArrowRightIcon } from '@lucide/svelte';
	import { Pagination } from '@skeletonlabs/skeleton-svelte';

	let page = $state(1);

	const start = $derived((page - 1) * PAGE_SIZE);
	const end = $derived(start + PAGE_SIZE);
	const data = $derived(users.slice(start, end));
</script>

<div class="grid w-full place-items-center gap-4">
	<table class="table table-auto">
		<thead>
			<tr>
				<th>ID</th>
				<th>Name</th>
				<th>Email</th>
				<th>Country</th>
			</tr>
		</thead>
		<tbody>
			{#each data as user}
				<tr>
					<td>{user.id}</td>
					<td>{user.name}</td>
					<td>{user.email}</td>
					<td>{user.country}</td>
				</tr>
			{/each}
		</tbody>
	</table>

	<Pagination
		count={users.length}
		pageSize={PAGE_SIZE}
		{page}
		onPageChange={(event) => (page = event.page)}
		dir="rtl"
	>
		<Pagination.PrevTrigger>
			<ArrowRightIcon class="size-4" />
		</Pagination.PrevTrigger>
		<Pagination.Context>
			{#snippet children(pagination)}
				{#each pagination().pages as page, index (page)}
					{#if page.type === 'page'}
						<Pagination.Item {...page}>
							{page.value}
						</Pagination.Item>
					{:else}
						<Pagination.Ellipsis {index}>&#8230;</Pagination.Ellipsis>
					{/if}
				{/each}
			{/snippet}
		</Pagination.Context>
		<Pagination.NextTrigger>
			<ArrowLeftIcon class="size-4" />
		</Pagination.NextTrigger>
	</Pagination>
</div>
```

## Total Count

For server-side pagination, your data source may be truncated. Make sure to specify the total records using `count`.

```json
{
	"data": [...],
	"pagination": {
		"page": 1,
		"limit": 10,
		"count": 500,
	}
}
```

```svelte
<Pagination
	page={response.pagination.page}
	count={response.pagination.count}
	pageSize={response.pagination.limit}
>
	...
</Pagination>
```

## API Reference

### PaginationRootProps

| Property          | Default  | Type                                                                                                                                                     | Description                                                                                                                      |
| ----------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| ids?              | -        | Partial\<\{ root: string; ellipsis: (index: number) => string; prevTrigger: string; nextTrigger: string; item: (page: number) => string; }> \| undefined | The ids of the elements in the accordion. Useful for composition.                                                                |
| translations?     | -        | IntlTranslations \| undefined                                                                                                                            | Specifies the localized strings that identifies the accessibility elements and their states                                      |
| count?            | -        | number \| undefined                                                                                                                                      | Total number of data items                                                                                                       |
| pageSize?         | -        | number \| undefined                                                                                                                                      | The controlled number of data items per page                                                                                     |
| defaultPageSize?  | 10       | number \| undefined                                                                                                                                      | The initial number of data items per page when rendered.&#xA;Use when you don't need to control the page size of the pagination. |
| siblingCount?     | 1        | number \| undefined                                                                                                                                      | Number of pages to show beside active page                                                                                       |
| page?             | -        | number \| undefined                                                                                                                                      | The controlled active page                                                                                                       |
| defaultPage?      | 1        | number \| undefined                                                                                                                                      | The initial active page when rendered.&#xA;Use when you don't need to control the active page of the pagination.                 |
| onPageChange?     | -        | ((details: PageChangeDetails) => void) \| undefined                                                                                                      | Called when the page number is changed                                                                                           |
| onPageSizeChange? | -        | ((details: PageSizeChangeDetails) => void) \| undefined                                                                                                  | Called when the page size is changed                                                                                             |
| type?             | "button" | "button" \| "link" \| undefined                                                                                                                          | The type of the trigger element                                                                                                  |
| getPageUrl?       | -        | ((details: PageUrlDetails) => string) \| undefined                                                                                                       | Function to generate href attributes for pagination links.&#xA;Only used when \`type\` is set to "link".                         |
| dir?              | "ltr"    | "ltr" \| "rtl" \| undefined                                                                                                                              | The document's text/writing direction.                                                                                           |
| getRootNode?      | -        | (() => ShadowRoot \| Node \| Document) \| undefined                                                                                                      | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                       |
| element?          | -        | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                                                                                                         | Render the element yourself                                                                                                      |

### PaginationRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => PaginationApi\<PropTypes>                  | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### PaginationRootContextProps

| Property | Default | Type                                         | Description |
| -------- | ------- | -------------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => PaginationApi\<PropTypes>]> | -           |

### PaginationPrevTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### PaginationItemProps

| Property | Default | Type                                           | Description                 |
| -------- | ------- | ---------------------------------------------- | --------------------------- |
| type     | -       | "page"                                         | -                           |
| value    | -       | number                                         | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"a">]> \| undefined | Render the element yourself |

### PaginationEllipsisProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| index    | -       | number                                            | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

### PaginationNextTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

# Popover

A component that displays content in a floating panel, triggered by user interaction.

```svelte
<script>
	import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<Popover>
	<Popover.Trigger class="btn preset-filled">Trigger</Popover.Trigger>
	<Portal>
		<Popover.Positioner>
			<Popover.Content class="max-w-md space-y-2 card bg-surface-100-900 p-4 shadow-xl">
				<Popover.Title class="font-bold">Example</Popover.Title>
				<Popover.Description>This is a basic example of a popover.</Popover.Description>
				<Popover.CloseTrigger class="btn preset-tonal">Close</Popover.CloseTrigger>
			</Popover.Content>
		</Popover.Positioner>
	</Portal>
</Popover>
```

## Arrow

You may optionally enable arrows via the `Arrow` and `ArrowTip` component parts. Note that Zag.js opts to style these with CSS custom properties, which can be adjusted using a `style` attribute.

```svelte
<script>
	import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<Popover>
	<Popover.Trigger class="btn preset-filled">Trigger</Popover.Trigger>
	<Portal>
		<Popover.Positioner>
			<Popover.Content class="max-w-md space-y-2 card bg-surface-100-900 p-4 shadow-xl">
				<Popover.Description>This example will have a small arrow.</Popover.Description>
				<Popover.Arrow
					style="--arrow-size: calc(var(--spacing) * 2); --arrow-background: var(--color-surface-100-900);"
				>
					<Popover.ArrowTip />
				</Popover.Arrow>
			</Popover.Content>
		</Popover.Positioner>
	</Portal>
</Popover>
```

## Z-Index

By default we do not take an opinionated stance regarding z-index stacking. The result is the component can sometimes be occluded beneath other elements with a higher index. The Z-Index can controlled by applying a utility class to the `Positioner` component part.

> NOTE: This will need to be forced using `!` for `!important` to override the Zag.js defaults.

```svelte
<script>
	import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<div class="grid grid-cols-2 gap-4">
	<Popover>
		<Popover.Trigger class="btn preset-filled">Default (auto)</Popover.Trigger>
		<Portal>
			<Popover.Positioner>
				<Popover.Content class="max-w-md space-y-2 card bg-surface-100-900 p-4">
					<Popover.Description>This example will be below the sibling.</Popover.Description>
				</Popover.Content>
			</Popover.Positioner>
		</Portal>
	</Popover>

	<Popover>
		<Popover.Trigger class="btn preset-filled">Above (20)</Popover.Trigger>
		<Portal>
			<Popover.Positioner class="z-20!">
				<Popover.Content class="max-w-md space-y-2 card bg-surface-100-900 p-4 shadow-xl">
					<Popover.Description>This example will be above the sibling.</Popover.Description>
				</Popover.Content>
			</Popover.Positioner>
		</Portal>
	</Popover>

	<div class="relative col-span-2 h-[100px]">
		<div
			class="absolute z-10 flex h-full w-full items-center justify-center rounded bg-primary-200-800/75"
		>
			Sibling (10)
		</div>
	</div>
</div>
```

## Programmatic Control

This is made possible via the Provider Pattern.

```svelte
<script>
	import { Popover, Portal, usePopover } from '@skeletonlabs/skeleton-svelte';

	const id = $props.id();
	const popover = usePopover({
		id: id,
		closeOnInteractOutside: false
	});

	function showAndHide() {
		popover().setOpen(true);
		setTimeout(() => {
			popover().setOpen(false);
		}, 3000);
	}
</script>

<div class="flex flex-col gap-4">
	<button class="btn preset-filled" onclick={showAndHide}>Show for 3 seconds</button>

	<Popover.Provider value={popover}>
		<Popover.Trigger class="btn preset-tonal">Anchor</Popover.Trigger>
		<Portal>
			<Popover.Positioner>
				<Popover.Content class="max-w-sm space-y-2 card bg-surface-100-900 p-4 shadow-xl">
					<Popover.Description
						>This popover will appear, stay open for three seconds, then close on it's own.</Popover.Description
					>
				</Popover.Content>
			</Popover.Positioner>
		</Portal>
	</Popover.Provider>
</div>
```

## Direction

```svelte
<script>
	import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<Popover dir="rtl">
	<Popover.Trigger class="btn preset-filled">Trigger</Popover.Trigger>
	<Portal>
		<Popover.Positioner>
			<Popover.Content class="max-w-md space-y-2 card bg-surface-100-900 p-4 shadow-xl">
				<Popover.Title class="font-bold">Example</Popover.Title>
				<Popover.Description>This is a basic example of a popover.</Popover.Description>
				<Popover.CloseTrigger class="btn preset-tonal">Close</Popover.CloseTrigger>
			</Popover.Content>
		</Popover.Positioner>
	</Portal>
</Popover>
```

## Headless

Unlike most components in Skeleton, this feature is provided "headless". This means no default styles are applied out of the box. This ensures you retain full control of all styling.

```svelte
<script>
	import { SkullIcon } from '@lucide/svelte';
	import { Popover, Portal } from '@skeletonlabs/skeleton-svelte';
</script>

<Popover>
	<Popover.Trigger>
		<SkullIcon class="size-12" />
	</Popover.Trigger>
	<Portal>
		<Popover.Positioner>
			<Popover.Content>
				<div
					class="max-w-md space-y-2 card border border-surface-500/30 bg-surface-200-800/30 p-2 shadow-xl backdrop-blur-sm"
				>
					<header class="flex items-center justify-between">
						<Popover.Title class="font-bold">Hello Skeleton</Popover.Title>
						<Popover.CloseTrigger class="btn-icon hover:preset-tonal">&times</Popover.CloseTrigger>
					</header>
					<img
						class="size-72"
						src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWVmbzcxanp6YmtxZ28xcXBqaXBscThsdDZ5Nm9ncWxkeWtqaHJ2bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dg/dn1PN6NtunfnUjUGFC/giphy.gif"
						alt="Skeleton Gif"
					/>
					<Popover.Description class="text-center text-xs"
						>Three spooky skeletons!</Popover.Description
					>
				</div>
			</Popover.Content>
		</Popover.Positioner>
	</Portal>
</Popover>
```

The benefits are as follows:

- You can make the `Trigger` surround any element, including an icon, button, image, etc.
- You can modify the entire structure within `Content`, including custom markup and styling.
- You may place the `CloseTrigger` anywhere, and use it as an X close option.

## API Reference

### PopoverRootProps

| Property                | Default | Type                                                                                                                                                                       | Description                                                                                                                                                                                                                                           |
| ----------------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| dir?                    | "ltr"   | "ltr" \| "rtl" \| undefined                                                                                                                                                | The document's text/writing direction.                                                                                                                                                                                                                |
| ids?                    | -       | Partial\<\{ anchor: string; trigger: string; content: string; title: string; description: string; closeTrigger: string; positioner: string; arrow: string; }> \| undefined | The ids of the elements in the popover. Useful for composition.                                                                                                                                                                                       |
| modal?                  | false   | boolean \| undefined                                                                                                                                                       | Whether the popover should be modal. When set to \`true\`:&#xA;- interaction with outside elements will be disabled&#xA;- only popover content will be visible to screen readers&#xA;- scrolling is blocked&#xA;- focus is trapped within the popover |
| portalled?              | true    | boolean \| undefined                                                                                                                                                       | Whether the popover is portalled. This will proxy the tabbing behavior regardless of the DOM position&#xA;of the popover content.                                                                                                                     |
| autoFocus?              | true    | boolean \| undefined                                                                                                                                                       | Whether to automatically set focus on the first focusable&#xA;content within the popover when opened.                                                                                                                                                 |
| initialFocusEl?         | -       | (() => HTMLElement \| null) \| undefined                                                                                                                                   | The element to focus on when the popover is opened.                                                                                                                                                                                                   |
| closeOnInteractOutside? | true    | boolean \| undefined                                                                                                                                                       | Whether to close the popover when the user clicks outside of the popover.                                                                                                                                                                             |
| closeOnEscape?          | true    | boolean \| undefined                                                                                                                                                       | Whether to close the popover when the escape key is pressed.                                                                                                                                                                                          |
| onOpenChange?           | -       | ((details: OpenChangeDetails) => void) \| undefined                                                                                                                        | Function invoked when the popover opens or closes                                                                                                                                                                                                     |
| positioning?            | -       | PositioningOptions \| undefined                                                                                                                                            | The user provided options used to position the popover content                                                                                                                                                                                        |
| open?                   | -       | boolean \| undefined                                                                                                                                                       | The controlled open state of the popover                                                                                                                                                                                                              |
| defaultOpen?            | -       | boolean \| undefined                                                                                                                                                       | The initial open state of the popover when rendered.&#xA;Use when you don't need to control the open state of the popover.                                                                                                                            |
| getRootNode?            | -       | (() => Node \| ShadowRoot \| Document) \| undefined                                                                                                                        | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                                                                                                                                            |
| onEscapeKeyDown?        | -       | ((event: KeyboardEvent) => void) \| undefined                                                                                                                              | Function called when the escape key is pressed                                                                                                                                                                                                        |
| onRequestDismiss?       | -       | ((event: LayerDismissEvent) => void) \| undefined                                                                                                                          | Function called when this layer is closed due to a parent layer being closed                                                                                                                                                                          |
| onPointerDownOutside?   | -       | ((event: PointerDownOutsideEvent) => void) \| undefined                                                                                                                    | Function called when the pointer is pressed down outside the component                                                                                                                                                                                |
| onFocusOutside?         | -       | ((event: FocusOutsideEvent) => void) \| undefined                                                                                                                          | Function called when the focus is moved outside the component                                                                                                                                                                                         |
| onInteractOutside?      | -       | ((event: InteractOutsideEvent) => void) \| undefined                                                                                                                       | Function called when an interaction happens outside the component                                                                                                                                                                                     |
| persistentElements?     | -       | (() => Element \| null)\[] \| undefined                                                                                                                                    | Returns the persistent elements that:&#xA;- should not have pointer-events disabled&#xA;- should not trigger the dismiss event                                                                                                                        |
| children?               | -       | Snippet\<\[]> \| undefined                                                                                                                                                 | The default slot content to be rendered within the component.                                                                                                                                                                                         |

### PopoverRootProviderProps

| Property  | Default | Type                         | Description                                                   |
| --------- | ------- | ---------------------------- | ------------------------------------------------------------- |
| value     | -       | () => PopoverApi\<PropTypes> | -                                                             |
| children? | -       | Snippet\<\[]> \| undefined   | The default slot content to be rendered within the component. |

### PopoverRootContextProps

| Property | Default | Type                                      | Description |
| -------- | ------- | ----------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => PopoverApi\<PropTypes>]> | -           |

### PopoverTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### PopoverPositionerProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### PopoverContentProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### PopoverArrowProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### PopoverArrowTipProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### PopoverTitleProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### PopoverDescriptionProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### PopoverCloseTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

# Portal

Renders children into a DOM node that exists outside the DOM hierarchy.

```svelte
<script lang="ts">
	import { SkullIcon } from '@lucide/svelte';
	import { Portal } from '@skeletonlabs/skeleton-svelte';

	let disabled = $state(true);
	let target: HTMLElement | undefined = $state();

	const cardClasses = 'card preset-outlined-surface-300-700 size-24 grid place-items-center p-4';
	const buttonClasses = 'col-span-2 btn preset-filled';
</script>

<div class="grid grid-cols-2 gap-4">
	<!-- Source -->
	<div class={cardClasses}>
		<Portal {disabled} {target}>
			<SkullIcon class="size-8" />
		</Portal>
	</div>

	<!-- Target -->
	<div class={cardClasses} bind:this={target}>
		<!-- (the content will appear here) -->
	</div>

	<!-- Trigger -->
	<button class={buttonClasses} onclick={() => (disabled = !disabled)}>
		{disabled ? 'Enable' : 'Disable'}
	</button>
</div>
```

## How It Works

When enabled, the content will move from the source to the target element.

## API Reference

### PortalRootProps

| Property  | Default       | Type                     | Description                                                                       |
| --------- | ------------- | ------------------------ | --------------------------------------------------------------------------------- |
| disabled? | false         | boolean \| undefined     | If true, the portal functionality is disabled and children are rendered in place. |
| target?   | document.body | HTMLElement \| undefined | The HTML element to which the portal content will be appended.                    |
| children  | -             | Snippet\<\[]>            | The default slot content to be rendered within the component.                     |

# Progress Circular

An indicator showing the progress or completion of a task.

```svelte
<script lang="ts">
	import { Progress, Slider } from '@skeletonlabs/skeleton-svelte';

	let value = $state(50);
</script>

<div class="flex flex-col items-center gap-8">
	<Progress {value} class="w-fit items-center">
		<Progress.Label>Label</Progress.Label>
		<Progress.Circle>
			<Progress.CircleTrack />
			<Progress.CircleRange />
		</Progress.Circle>
		<Progress.ValueText />
	</Progress>
	<Slider class="w-full" value={[value]} onValueChange={(e) => (value = e.value[0])} step={10}>
		<Slider.Control>
			<Slider.Track>
				<Slider.Range />
			</Slider.Track>
			<Slider.Thumb index={0}>
				<Slider.HiddenInput />
			</Slider.Thumb>
		</Slider.Control>
	</Slider>
</div>
```

## Size

```svelte
<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
</script>

<div class="flex w-full items-center justify-evenly gap-4">
	<Progress value={75} class="w-fit">
		<Progress.Circle style="--size: 48px; --thickness: 6px;">
			<Progress.CircleTrack />
			<Progress.CircleRange />
		</Progress.Circle>
	</Progress>
	<Progress value={75} class="w-fit">
		<Progress.Circle>
			<Progress.CircleTrack />
			<Progress.CircleRange />
		</Progress.Circle>
	</Progress>
	<Progress value={75} class="w-fit">
		<Progress.Circle style="--size: 125px; --thickness: 12px;">
			<Progress.CircleTrack />
			<Progress.CircleRange />
		</Progress.Circle>
	</Progress>
</div>
```

## Color

```svelte
<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
</script>

<div class="flex w-full items-center justify-evenly gap-4">
	<Progress value={40} class="w-fit">
		<Progress.Circle>
			<Progress.CircleTrack class="stroke-primary-500/30" />
			<Progress.CircleRange class="stroke-primary-500" />
		</Progress.Circle>
	</Progress>
	<Progress value={40} class="w-fit">
		<Progress.Circle>
			<Progress.CircleTrack class="stroke-secondary-500/30" />
			<Progress.CircleRange class="stroke-secondary-500" />
		</Progress.Circle>
	</Progress>
	<Progress value={40} class="w-fit">
		<Progress.Circle>
			<Progress.CircleTrack class="stroke-tertiary-500/30" />
			<Progress.CircleRange class="stroke-tertiary-500" />
		</Progress.Circle>
	</Progress>
</div>
```

## Centered Content

```svelte
<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
</script>

<Progress class="relative w-fit">
	<div class="absolute inset-0 flex items-center justify-center">
		<Progress.ValueText />
	</div>
	<Progress.Circle>
		<Progress.CircleTrack />
		<Progress.CircleRange />
	</Progress.Circle>
</Progress>
```

## Indeterminate

Set the value to `null` to make the progress indeterminate.

```svelte
<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
</script>

<Progress class="w-fit items-center" value={null}>
	<Progress.Circle>
		<Progress.CircleTrack />
		<Progress.CircleRange />
	</Progress.Circle>
	<Progress.ValueText />
</Progress>
```

## Format

Use the `format` prop to customize the output of the `ValueText` component, options are:

- `percentage` (default) - shows the percentage value
- `decimal` - shows the decimal value (0.0 - 1.0)
- Provide formatting using the [Intl API](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl)

```svelte
<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
</script>

<div class="flex w-full items-center justify-evenly gap-4">
	<Progress class="w-fit items-center" formatOptions={{ style: 'percent' }}>
		<Progress.Circle>
			<Progress.CircleTrack />
			<Progress.CircleRange />
		</Progress.Circle>
		<Progress.ValueText />
	</Progress>
	<Progress class="w-fit items-center" formatOptions={{ style: 'decimal' }}>
		<Progress.Circle>
			<Progress.CircleTrack />
			<Progress.CircleRange />
		</Progress.Circle>
		<Progress.ValueText />
	</Progress>
	<Progress class="w-fit items-center" formatOptions={{ style: 'currency', currency: 'EUR' }}>
		<Progress.Circle>
			<Progress.CircleTrack />
			<Progress.CircleRange />
		</Progress.Circle>
		<Progress.ValueText />
	</Progress>
</div>
```

## Custom Value Text

```svelte
<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
</script>

<Progress class="w-fit items-center">
	<Progress.Circle>
		<Progress.CircleTrack />
		<Progress.CircleRange />
	</Progress.Circle>
	<Progress.ValueText>
		<Progress.Context>
			{#snippet children(progress)}
				{progress().value} of {progress().max}
			{/snippet}
		</Progress.Context>
	</Progress.ValueText>
</Progress>
```

## API Reference

### ProgressRootProps

| Property       | Default               | Type                                                                                    | Description                                                                                                                |
| -------------- | --------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ids?           | -                     | Partial\<\{ root: string; track: string; label: string; circle: string; }> \| undefined | The ids of the elements in the progress bar. Useful for composition.                                                       |
| value?         | -                     | number \| null \| undefined                                                             | The controlled value of the progress bar.                                                                                  |
| defaultValue?  | 50                    | number \| null \| undefined                                                             | The initial value of the progress bar when rendered.&#xA;Use when you don't need to control the value of the progress bar. |
| min?           | 0                     | number \| undefined                                                                     | The minimum allowed value of the progress bar.                                                                             |
| max?           | 100                   | number \| undefined                                                                     | The maximum allowed value of the progress bar.                                                                             |
| translations?  | -                     | IntlTranslations \| undefined                                                           | The localized messages to use.                                                                                             |
| onValueChange? | -                     | ((details: ValueChangeDetails) => void) \| undefined                                    | Callback fired when the value changes.                                                                                     |
| formatOptions? | \{ style: "percent" } | NumberFormatOptions \| undefined                                                        | The options to use for formatting the value.                                                                               |
| locale?        | "en-US"               | string \| undefined                                                                     | The locale to use for formatting the value.                                                                                |
| dir?           | "ltr"                 | "ltr" \| "rtl" \| undefined                                                             | The document's text/writing direction.                                                                                     |
| getRootNode?   | -                     | (() => ShadowRoot \| Node \| Document) \| undefined                                     | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                 |
| orientation?   | "horizontal"          | "horizontal" \| "vertical" \| undefined                                                 | The orientation of the element.                                                                                            |
| element?       | -                     | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                                        | Render the element yourself                                                                                                |

### ProgressRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => ProgressApi\<PropTypes>                    | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ProgressRootContextProps

| Property | Default | Type                                       | Description |
| -------- | ------- | ------------------------------------------ | ----------- |
| children | -       | Snippet\<\[() => ProgressApi\<PropTypes>]> | -           |

### ProgressLabelProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ProgressValueTextProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

### ProgressTrackProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ProgressRangeProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ProgressCircleProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"svg">]> \| undefined | Render the element yourself |

### ProgressCircleTrackProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"circle">]> \| undefined | Render the element yourself |

### ProgressCircleRangeProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"circle">]> \| undefined | Render the element yourself |

# Progress Linear

An indicator showing the progress or completion of a task.

```svelte
<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';

	let value = $state(75);
</script>

<Progress {value}>
	<Progress.Label>{value}%</Progress.Label>
	<Progress.Track>
		<Progress.Range />
	</Progress.Track>
</Progress>
```

## Color

Provide background color values for the track and range to customize the colors.

```svelte
<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
</script>

<div class="flex w-full flex-col gap-8">
	<Progress>
		<Progress.Track>
			<Progress.Range class="bg-primary-500" />
		</Progress.Track>
	</Progress>
	<Progress>
		<Progress.Track>
			<Progress.Range class="bg-secondary-500" />
		</Progress.Track>
	</Progress>
	<Progress>
		<Progress.Track>
			<Progress.Range class="bg-tertiary-500" />
		</Progress.Track>
	</Progress>
</div>
```

## Height

```svelte
<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
</script>

<div class="flex w-full flex-col gap-8">
	<Progress>
		<Progress.Track class="h-1">
			<Progress.Range />
		</Progress.Track>
	</Progress>
	<Progress>
		<Progress.Track class="h-4">
			<Progress.Range />
		</Progress.Track>
	</Progress>
	<Progress>
		<Progress.Track class="h-6">
			<Progress.Range />
		</Progress.Track>
	</Progress>
</div>
```

## Orientation

For vertical orieintation, a height must be defined on the Track component. The default is `h-[100px]`.

```svelte
<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
</script>

<Progress orientation="vertical">
	<Progress.Track>
		<Progress.Range />
	</Progress.Track>
</Progress>
```

## Indeterminate

You must explicitely specify a `null` value to trigger indeterminate mode.

```svelte
<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
</script>

<Progress value={null}>
	<Progress.Track>
		<Progress.Range />
	</Progress.Track>
</Progress>
```

### Custom Animation

```svelte
<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
</script>

<Progress value={null}>
	<Progress.Track>
		<Progress.Range class="animate-[custom-animation_2s_ease-in-out_infinite]" />
	</Progress.Track>
</Progress>

<style>
	@keyframes -global-custom-animation {
		from {
			scale: 0.5 1;
			transform: translateX(-200%);
		}
		25% {
			transform: translateX(50%);
		}
		50% {
			transform: translateX(-50%);
		}
		75% {
			transform: translateX(150%);
		}
		to {
			scale: 0.5 1;
			transform: translateX(200%);
		}
	}
</style>
```

Consider using following variants to target the orientation and state.

- `data-[orientation=horizontal]:my-custom-animation` - target the horizontal orientation.
- `data-[orientation=vertical]:my-custom-animation` - target the vertical orientation.
- `data-[state=indeterminate]:my-custom-animation` - target the indeterminate state.

## Native Alternative

The native [`progress`](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/progress) element is available cross browser, but does not support indeterminate animations.

```svelte
<progress class="progress" value="50" max="100"></progress>
```

## Direction

```svelte
<script lang="ts">
	import { Progress } from '@skeletonlabs/skeleton-svelte';
</script>

<Progress dir="rtl">
	<Progress.Label>Label</Progress.Label>
	<Progress.Track>
		<Progress.Range />
	</Progress.Track>
</Progress>
```

## API Reference

### ProgressRootProps

| Property       | Default               | Type                                                                                    | Description                                                                                                                |
| -------------- | --------------------- | --------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ids?           | -                     | Partial\<\{ root: string; track: string; label: string; circle: string; }> \| undefined | The ids of the elements in the progress bar. Useful for composition.                                                       |
| value?         | -                     | number \| null \| undefined                                                             | The controlled value of the progress bar.                                                                                  |
| defaultValue?  | 50                    | number \| null \| undefined                                                             | The initial value of the progress bar when rendered.&#xA;Use when you don't need to control the value of the progress bar. |
| min?           | 0                     | number \| undefined                                                                     | The minimum allowed value of the progress bar.                                                                             |
| max?           | 100                   | number \| undefined                                                                     | The maximum allowed value of the progress bar.                                                                             |
| translations?  | -                     | IntlTranslations \| undefined                                                           | The localized messages to use.                                                                                             |
| onValueChange? | -                     | ((details: ValueChangeDetails) => void) \| undefined                                    | Callback fired when the value changes.                                                                                     |
| formatOptions? | \{ style: "percent" } | NumberFormatOptions \| undefined                                                        | The options to use for formatting the value.                                                                               |
| locale?        | "en-US"               | string \| undefined                                                                     | The locale to use for formatting the value.                                                                                |
| dir?           | "ltr"                 | "ltr" \| "rtl" \| undefined                                                             | The document's text/writing direction.                                                                                     |
| getRootNode?   | -                     | (() => ShadowRoot \| Node \| Document) \| undefined                                     | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                 |
| orientation?   | "horizontal"          | "horizontal" \| "vertical" \| undefined                                                 | The orientation of the element.                                                                                            |
| element?       | -                     | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                                        | Render the element yourself                                                                                                |

### ProgressRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => ProgressApi\<PropTypes>                    | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ProgressRootContextProps

| Property | Default | Type                                       | Description |
| -------- | ------- | ------------------------------------------ | ----------- |
| children | -       | Snippet\<\[() => ProgressApi\<PropTypes>]> | -           |

### ProgressLabelProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ProgressValueTextProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

### ProgressTrackProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ProgressRangeProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ProgressCircleProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"svg">]> \| undefined | Render the element yourself |

### ProgressCircleTrackProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"circle">]> \| undefined | Render the element yourself |

### ProgressCircleRangeProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"circle">]> \| undefined | Render the element yourself |

# Rating Group

Rating Group allows users to rate something

```svelte
<script lang="ts">
	import { RatingGroup } from '@skeletonlabs/skeleton-svelte';
</script>

<RatingGroup count={5}>
	<RatingGroup.Control>
		<RatingGroup.Context>
			{#snippet children(ratingGroup)}
				{#each ratingGroup().items as index (index)}
					<RatingGroup.Item {index} />
				{/each}
			{/snippet}
		</RatingGroup.Context>
	</RatingGroup.Control>
	<RatingGroup.HiddenInput />
</RatingGroup>
```

## Allow Half

```svelte
<script lang="ts">
	import { RatingGroup } from '@skeletonlabs/skeleton-svelte';
</script>

<RatingGroup count={5} allowHalf={true}>
	<RatingGroup.Control>
		<RatingGroup.Context>
			{#snippet children(ratingGroup)}
				{#each ratingGroup().items as index (index)}
					<RatingGroup.Item {index} />
				{/each}
			{/snippet}
		</RatingGroup.Context>
	</RatingGroup.Control>
	<RatingGroup.HiddenInput />
</RatingGroup>
```

## Custom Icons

```svelte
<script lang="ts">
	import { BoneIcon, SkullIcon } from '@lucide/svelte';
	import { RatingGroup } from '@skeletonlabs/skeleton-svelte';
</script>

<RatingGroup count={3}>
	<RatingGroup.Control>
		<RatingGroup.Context>
			{#snippet children(ratingGroup)}
				{#each ratingGroup().items as index (index)}
					<RatingGroup.Item {index}>
						{#snippet empty()}
							<BoneIcon />
						{/snippet}
						{#snippet full()}
							<SkullIcon />
						{/snippet}
					</RatingGroup.Item>
				{/each}
			{/snippet}
		</RatingGroup.Context>
	</RatingGroup.Control>
	<RatingGroup.HiddenInput />
</RatingGroup>
```

## Label

```svelte
<script lang="ts">
	import { RatingGroup } from '@skeletonlabs/skeleton-svelte';
</script>

<RatingGroup count={5}>
	<RatingGroup.Label>Rate us:</RatingGroup.Label>
	<RatingGroup.Control>
		<RatingGroup.Context>
			{#snippet children(ratingGroup)}
				{#each ratingGroup().items as index (index)}
					<RatingGroup.Item {index} />
				{/each}
			{/snippet}
		</RatingGroup.Context>
	</RatingGroup.Control>
	<RatingGroup.HiddenInput />
</RatingGroup>
```

## Disabled

```svelte
<script lang="ts">
	import { RatingGroup } from '@skeletonlabs/skeleton-svelte';
</script>

<RatingGroup count={5} disabled={true}>
	<RatingGroup.Control>
		<RatingGroup.Context>
			{#snippet children(ratingGroup)}
				{#each ratingGroup().items as index (index)}
					<RatingGroup.Item {index} />
				{/each}
			{/snippet}
		</RatingGroup.Context>
	</RatingGroup.Control>
	<RatingGroup.HiddenInput />
</RatingGroup>
```

## Direction

```svelte
<script lang="ts">
	import { RatingGroup } from '@skeletonlabs/skeleton-svelte';
</script>

<RatingGroup count={5} dir="rtl">
	<RatingGroup.Label>Label</RatingGroup.Label>
	<RatingGroup.Control>
		<RatingGroup.Context>
			{#snippet children(ratingGroup)}
				{#each ratingGroup().items as index (index)}
					<RatingGroup.Item {index} />
				{/each}
			{/snippet}
		</RatingGroup.Context>
	</RatingGroup.Control>
	<RatingGroup.HiddenInput />
</RatingGroup>
```

## API Reference

### RatingGroupRootProps

| Property       | Default | Type                                                                                                                         | Description                                                                                                    |
| -------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| ids?           | -       | Partial\<\{ root: string; label: string; hiddenInput: string; control: string; item: (id: string) => string; }> \| undefined | The ids of the elements in the rating. Useful for composition.                                                 |
| translations?  | -       | IntlTranslations \| undefined                                                                                                | Specifies the localized strings that identifies the accessibility elements and their states                    |
| count?         | 5       | number \| undefined                                                                                                          | The total number of ratings.                                                                                   |
| name?          | -       | string \| undefined                                                                                                          | The name attribute of the rating element (used in forms).                                                      |
| form?          | -       | string \| undefined                                                                                                          | The associate form of the underlying input element.                                                            |
| value?         | -       | number \| undefined                                                                                                          | The controlled value of the rating                                                                             |
| defaultValue?  | -       | number \| undefined                                                                                                          | The initial value of the rating when rendered.&#xA;Use when you don't need to control the value of the rating. |
| readOnly?      | -       | boolean \| undefined                                                                                                         | Whether the rating is readonly.                                                                                |
| disabled?      | -       | boolean \| undefined                                                                                                         | Whether the rating is disabled.                                                                                |
| required?      | -       | boolean \| undefined                                                                                                         | Whether the rating is required.                                                                                |
| allowHalf?     | -       | boolean \| undefined                                                                                                         | Whether to allow half stars.                                                                                   |
| autoFocus?     | -       | boolean \| undefined                                                                                                         | Whether to autofocus the rating.                                                                               |
| onValueChange? | -       | ((details: ValueChangeDetails) => void) \| undefined                                                                         | Function to be called when the rating value changes.                                                           |
| onHoverChange? | -       | ((details: HoverChangeDetails) => void) \| undefined                                                                         | Function to be called when the rating value is hovered.                                                        |
| dir?           | "ltr"   | "ltr" \| "rtl" \| undefined                                                                                                  | The document's text/writing direction.                                                                         |
| getRootNode?   | -       | (() => ShadowRoot \| Node \| Document) \| undefined                                                                          | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                     |
| element?       | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                                                                             | Render the element yourself                                                                                    |

### RatingGroupRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => RatingGroupApi\<PropTypes>                 | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### RatingGroupRootContextProps

| Property | Default | Type                                          | Description |
| -------- | ------- | --------------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => RatingGroupApi\<PropTypes>]> | -           |

### RatingGroupLabelProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"label">]> \| undefined | Render the element yourself |

### RatingGroupControlProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### RatingGroupItemProps

| Property | Default         | Type                                              | Description                                                |
| -------- | --------------- | ------------------------------------------------- | ---------------------------------------------------------- |
| empty?   | StarEmpty (SVG) | Snippet\<\[]> \| undefined                        | The content to render when the item is in the empty state. |
| half?    | StarHalf (SVG)  | Snippet\<\[]> \| undefined                        | The content to render when the item is in the half state.  |
| full?    | StarFull (SVG)  | Snippet\<\[]> \| undefined                        | The content to render when the item is in the full state.  |
| index    | -               | number                                            | -                                                          |
| element? | -               | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself                                |

### RatingGroupHiddenInputProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"input">]> \| undefined | Render the element yourself |

# Segmented Control

Capture input for a limited set of options.

```svelte
<script lang="ts">
	import { SegmentedControl } from '@skeletonlabs/skeleton-svelte';
</script>

<SegmentedControl defaultValue="item-1">
	<SegmentedControl.Label>Label</SegmentedControl.Label>
	<SegmentedControl.Control>
		<SegmentedControl.Indicator />
		<SegmentedControl.Item value="item-1">
			<SegmentedControl.ItemText>Item 1</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item value="item-2">
			<SegmentedControl.ItemText>Item 2</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item value="item-3">
			<SegmentedControl.ItemText>Item 3</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
	</SegmentedControl.Control>
</SegmentedControl>
```

## Icons

```svelte
<script lang="ts">
	import {
		AlignCenterVerticalIcon,
		AlignEndVerticalIcon,
		AlignStartVerticalIcon
	} from '@lucide/svelte';
	import { SegmentedControl } from '@skeletonlabs/skeleton-svelte';
</script>

<SegmentedControl defaultValue="start">
	<SegmentedControl.Control>
		<SegmentedControl.Indicator />
		<SegmentedControl.Item value="start">
			<SegmentedControl.ItemText>
				<AlignStartVerticalIcon class="size-4" />
			</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item value="center">
			<SegmentedControl.ItemText>
				<AlignCenterVerticalIcon class="size-4" />
			</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item value="end">
			<SegmentedControl.ItemText>
				<AlignEndVerticalIcon class="size-4" />
			</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
	</SegmentedControl.Control>
</SegmentedControl>
```

## Orientation

```svelte
<script lang="ts">
	import { SegmentedControl } from '@skeletonlabs/skeleton-svelte';
</script>

<SegmentedControl defaultValue="item-1" orientation="vertical">
	<SegmentedControl.Control>
		<SegmentedControl.Indicator />
		<SegmentedControl.Item value="item-1">
			<SegmentedControl.ItemText>Item 1</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item value="item-2">
			<SegmentedControl.ItemText>Item 2</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item value="item-3">
			<SegmentedControl.ItemText>Item 3</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
	</SegmentedControl.Control>
</SegmentedControl>
```

## Read Only

```svelte
<script lang="ts">
	import { SegmentedControl } from '@skeletonlabs/skeleton-svelte';
</script>

<SegmentedControl defaultValue="item-1" readOnly>
	<SegmentedControl.Control>
		<SegmentedControl.Indicator />
		<SegmentedControl.Item value="item-1">
			<SegmentedControl.ItemText>Item 1</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item value="item-2">
			<SegmentedControl.ItemText>Item 2</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item value="item-3">
			<SegmentedControl.ItemText>Item 3</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
	</SegmentedControl.Control>
</SegmentedControl>
```

## Disabled

```svelte
<script lang="ts">
	import { SegmentedControl } from '@skeletonlabs/skeleton-svelte';
</script>

<SegmentedControl defaultValue="item-1" disabled>
	<SegmentedControl.Control>
		<SegmentedControl.Indicator />
		<SegmentedControl.Item value="item-1">
			<SegmentedControl.ItemText>Item 1</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item value="item-2">
			<SegmentedControl.ItemText>Item 2</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item value="item-3">
			<SegmentedControl.ItemText>Item 3</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
	</SegmentedControl.Control>
</SegmentedControl>
```

## Disabled Item

```svelte
<script lang="ts">
	import { SegmentedControl } from '@skeletonlabs/skeleton-svelte';
</script>

<SegmentedControl defaultValue="item-1">
	<SegmentedControl.Control>
		<SegmentedControl.Indicator />
		<SegmentedControl.Item value="item-1">
			<SegmentedControl.ItemText>Item 1</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item value="item-2" disabled>
			<SegmentedControl.ItemText>Item 2</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item value="item-3">
			<SegmentedControl.ItemText>Item 3</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
	</SegmentedControl.Control>
</SegmentedControl>
```

## Direction

```svelte
<script lang="ts">
	import { SegmentedControl } from '@skeletonlabs/skeleton-svelte';
</script>

<SegmentedControl defaultValue="item-1" dir="rtl">
	<SegmentedControl.Label>Label</SegmentedControl.Label>
	<SegmentedControl.Control>
		<SegmentedControl.Indicator />
		<SegmentedControl.Item value="item-1">
			<SegmentedControl.ItemText>Item 1</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item value="item-2">
			<SegmentedControl.ItemText>Item 2</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
		<SegmentedControl.Item value="item-3">
			<SegmentedControl.ItemText>Item 3</SegmentedControl.ItemText>
			<SegmentedControl.ItemHiddenInput />
		</SegmentedControl.Item>
	</SegmentedControl.Control>
</SegmentedControl>
```

## API Reference

### SegmentedControlRootProps

| Property       | Default | Type                                                                                                                                                                                                                                   | Description                                                                                                                |
| -------------- | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- |
| ids?           | -       | Partial\<\{ root: string; label: string; indicator: string; item: (value: string) => string; itemLabel: (value: string) => string; itemControl: (value: string) => string; itemHiddenInput: (value: string) => string; }> \| undefined | The ids of the elements in the radio. Useful for composition.                                                              |
| value?         | -       | string \| null \| undefined                                                                                                                                                                                                            | The controlled value of the radio group                                                                                    |
| defaultValue?  | -       | string \| null \| undefined                                                                                                                                                                                                            | The initial value of the checked radio when rendered.&#xA;Use when you don't need to control the value of the radio group. |
| name?          | -       | string \| undefined                                                                                                                                                                                                                    | The name of the input fields in the radio&#xA;(Useful for form submission).                                                |
| form?          | -       | string \| undefined                                                                                                                                                                                                                    | The associate form of the underlying input.                                                                                |
| disabled?      | -       | boolean \| undefined                                                                                                                                                                                                                   | If \`true\`, the radio group will be disabled                                                                              |
| readOnly?      | -       | boolean \| undefined                                                                                                                                                                                                                   | Whether the checkbox is read-only                                                                                          |
| onValueChange? | -       | ((details: ValueChangeDetails) => void) \| undefined                                                                                                                                                                                   | Function called once a radio is checked                                                                                    |
| orientation?   | -       | "horizontal" \| "vertical" \| undefined                                                                                                                                                                                                | Orientation of the radio group                                                                                             |
| dir?           | "ltr"   | "ltr" \| "rtl" \| undefined                                                                                                                                                                                                            | The document's text/writing direction.                                                                                     |
| getRootNode?   | -       | (() => ShadowRoot \| Node \| Document) \| undefined                                                                                                                                                                                    | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                 |
| element?       | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                                                                                                                                                                                       | Render the element yourself                                                                                                |

### SegmentedControlRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => RadioGroupApi\<PropTypes>                  | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### SegmentedControlRootContextProps

| Property | Default | Type                                         | Description |
| -------- | ------- | -------------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => RadioGroupApi\<PropTypes>]> | -           |

### SegmentedControlLabelProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

### SegmentedControlControlProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### SegmentedControlIndicatorProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### SegmentedControlItemProps

| Property  | Default | Type                                               | Description                 |
| --------- | ------- | -------------------------------------------------- | --------------------------- |
| value     | -       | string                                             | -                           |
| disabled? | -       | boolean \| undefined                               | -                           |
| invalid?  | -       | boolean \| undefined                               | -                           |
| element?  | -       | Snippet\<\[HTMLAttributes\<"label">]> \| undefined | Render the element yourself |

### SegmentedControlItemTextProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

### SegmentedControlItemHiddenInputProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"input">]> \| undefined | Render the element yourself |

# Slider

Capture input from a range of values.

```svelte
<script lang="ts">
	import { Slider } from '@skeletonlabs/skeleton-svelte';
</script>

<Slider defaultValue={[50]}>
	<Slider.Label>Label</Slider.Label>
	<Slider.Control>
		<Slider.Track>
			<Slider.Range />
		</Slider.Track>
		<Slider.Thumb index={0}>
			<Slider.HiddenInput />
		</Slider.Thumb>
	</Slider.Control>
	<Slider.MarkerGroup>
		<Slider.Marker value={25} />
		<Slider.Marker value={50} />
		<Slider.Marker value={75} />
	</Slider.MarkerGroup>
</Slider>
```

## Color

```svelte
<script lang="ts">
	import { Slider } from '@skeletonlabs/skeleton-svelte';
</script>

<div class="w-full space-y-8">
	<Slider defaultValue={[50]}>
		<Slider.Control>
			<Slider.Track>
				<Slider.Range class="bg-primary-500" />
			</Slider.Track>
			<Slider.Thumb index={0}>
				<Slider.HiddenInput />
			</Slider.Thumb>
		</Slider.Control>
	</Slider>

	<Slider defaultValue={[50]}>
		<Slider.Control>
			<Slider.Track>
				<Slider.Range class="bg-secondary-500" />
			</Slider.Track>
			<Slider.Thumb index={0}>
				<Slider.HiddenInput />
			</Slider.Thumb>
		</Slider.Control>
	</Slider>

	<Slider defaultValue={[50]}>
		<Slider.Control>
			<Slider.Track>
				<Slider.Range class="bg-tertiary-500" />
			</Slider.Track>
			<Slider.Thumb index={0}>
				<Slider.HiddenInput />
			</Slider.Thumb>
		</Slider.Control>
	</Slider>
</div>
```

## Disabled

```svelte
<script lang="ts">
	import { Slider } from '@skeletonlabs/skeleton-svelte';
</script>

<Slider defaultValue={[50]} disabled>
	<Slider.Control>
		<Slider.Track>
			<Slider.Range />
		</Slider.Track>
		<Slider.Thumb index={0}>
			<Slider.HiddenInput />
		</Slider.Thumb>
	</Slider.Control>
</Slider>
```

## Readonly

```svelte
<script lang="ts">
	import { Slider } from '@skeletonlabs/skeleton-svelte';
</script>

<Slider defaultValue={[50]} readOnly>
	<Slider.Control>
		<Slider.Track>
			<Slider.Range />
		</Slider.Track>
		<Slider.Thumb index={0}>
			<Slider.HiddenInput />
		</Slider.Thumb>
	</Slider.Control>
</Slider>
```

## Multiple Thumbs

```svelte
<script lang="ts">
	import { Slider } from '@skeletonlabs/skeleton-svelte';
</script>

<Slider defaultValue={[25, 75]}>
	<Slider.Control>
		<Slider.Track>
			<Slider.Range />
		</Slider.Track>
		<Slider.Thumb index={0}>
			<Slider.HiddenInput />
		</Slider.Thumb>
		<Slider.Thumb index={1}>
			<Slider.HiddenInput />
		</Slider.Thumb>
	</Slider.Control>
</Slider>
```

## Direction

```svelte
<script lang="ts">
	import { Slider } from '@skeletonlabs/skeleton-svelte';
</script>

<Slider defaultValue={[50]} dir="rtl">
	<Slider.Label>Label</Slider.Label>
	<Slider.Control>
		<Slider.Track>
			<Slider.Range />
		</Slider.Track>
		<Slider.Thumb index={0}>
			<Slider.HiddenInput />
		</Slider.Thumb>
	</Slider.Control>
	<Slider.MarkerGroup>
		<Slider.Marker value={25} />
		<Slider.Marker value={50} />
		<Slider.Marker value={75} />
	</Slider.MarkerGroup>
</Slider>
```

## API Reference

### SliderRootProps

| Property               | Default      | Type                                                                                                                                                                                                                                    | Description                                                                                                                                                                                                                                                                                                          |
| ---------------------- | ------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ids?                   | -            | Partial\<\{ root: string; thumb: (index: number) => string; hiddenInput: (index: number) => string; control: string; track: string; range: string; label: string; valueText: string; marker: (index: number) => string; }> \| undefined | The ids of the elements in the slider. Useful for composition.                                                                                                                                                                                                                                                       |
| aria-label?            | -            | string\[] \| undefined                                                                                                                                                                                                                  | The aria-label of each slider thumb. Useful for providing an accessible name to the slider                                                                                                                                                                                                                           |
| aria-labelledby?       | -            | string\[] \| undefined                                                                                                                                                                                                                  | The \`id\` of the elements that labels each slider thumb. Useful for providing an accessible name to the slider                                                                                                                                                                                                      |
| name?                  | -            | string \| undefined                                                                                                                                                                                                                     | The name associated with each slider thumb (when used in a form)                                                                                                                                                                                                                                                     |
| form?                  | -            | string \| undefined                                                                                                                                                                                                                     | The associate form of the underlying input element.                                                                                                                                                                                                                                                                  |
| value?                 | -            | number\[] \| undefined                                                                                                                                                                                                                  | The controlled value of the slider                                                                                                                                                                                                                                                                                   |
| defaultValue?          | -            | number\[] \| undefined                                                                                                                                                                                                                  | The initial value of the slider when rendered.&#xA;Use when you don't need to control the value of the slider.                                                                                                                                                                                                       |
| disabled?              | -            | boolean \| undefined                                                                                                                                                                                                                    | Whether the slider is disabled                                                                                                                                                                                                                                                                                       |
| readOnly?              | -            | boolean \| undefined                                                                                                                                                                                                                    | Whether the slider is read-only                                                                                                                                                                                                                                                                                      |
| invalid?               | -            | boolean \| undefined                                                                                                                                                                                                                    | Whether the slider is invalid                                                                                                                                                                                                                                                                                        |
| onValueChange?         | -            | ((details: ValueChangeDetails) => void) \| undefined                                                                                                                                                                                    | Function invoked when the value of the slider changes                                                                                                                                                                                                                                                                |
| onValueChangeEnd?      | -            | ((details: ValueChangeDetails) => void) \| undefined                                                                                                                                                                                    | Function invoked when the slider value change is done                                                                                                                                                                                                                                                                |
| onFocusChange?         | -            | ((details: FocusChangeDetails) => void) \| undefined                                                                                                                                                                                    | Function invoked when the slider's focused index changes                                                                                                                                                                                                                                                             |
| getAriaValueText?      | -            | ((details: ValueTextDetails) => string) \| undefined                                                                                                                                                                                    | Function that returns a human readable value for the slider thumb                                                                                                                                                                                                                                                    |
| min?                   | 0            | number \| undefined                                                                                                                                                                                                                     | The minimum value of the slider                                                                                                                                                                                                                                                                                      |
| max?                   | 100          | number \| undefined                                                                                                                                                                                                                     | The maximum value of the slider                                                                                                                                                                                                                                                                                      |
| step?                  | 1            | number \| undefined                                                                                                                                                                                                                     | The step value of the slider                                                                                                                                                                                                                                                                                         |
| minStepsBetweenThumbs? | 0            | number \| undefined                                                                                                                                                                                                                     | The minimum permitted steps between multiple thumbs.&#xA;&#xA;\`minStepsBetweenThumbs\` \* \`step\` should reflect the gap between the thumbs.&#xA;&#xA;- \`step: 1\` and \`minStepsBetweenThumbs: 10\` => gap is \`10\`&#xA;- \`step: 10\` and \`minStepsBetweenThumbs: 2\` => gap is \`20\`                        |
| orientation?           | "horizontal" | "vertical" \| "horizontal" \| undefined                                                                                                                                                                                                 | The orientation of the slider                                                                                                                                                                                                                                                                                        |
| origin?                | "start"      | "start" \| "center" \| "end" \| undefined                                                                                                                                                                                               | The origin of the slider range. The track is filled from the origin&#xA;to the thumb for single values.&#xA;- "start": Useful when the value represents an absolute value&#xA;- "center": Useful when the value represents an offset (relative)&#xA;- "end": Useful when the value represents an offset from the end |
| thumbAlignment?        | "contain"    | "center" \| "contain" \| undefined                                                                                                                                                                                                      | The alignment of the slider thumb relative to the track&#xA;- \`center\`: the thumb will extend beyond the bounds of the slider track.&#xA;- \`contain\`: the thumb will be contained within the bounds of the track.                                                                                                |
| thumbSize?             | -            | \{ width: number; height: number; } \| undefined                                                                                                                                                                                        | The slider thumbs dimensions                                                                                                                                                                                                                                                                                         |
| dir?                   | "ltr"        | "ltr" \| "rtl" \| undefined                                                                                                                                                                                                             | The document's text/writing direction.                                                                                                                                                                                                                                                                               |
| getRootNode?           | -            | (() => ShadowRoot \| Node \| Document) \| undefined                                                                                                                                                                                     | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                                                                                                                                                                                                           |
| element?               | -            | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                                                                                                                                                                                        | Render the element yourself                                                                                                                                                                                                                                                                                          |

### SliderRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => SliderApi\<PropTypes>                      | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### SliderRootContextProps

| Property | Default | Type                                     | Description |
| -------- | ------- | ---------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => SliderApi\<PropTypes>]> | -           |

### SliderLabelProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"label">]> \| undefined | Render the element yourself |

### SliderValueTextProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"output">]> \| undefined | Render the element yourself |

### SliderControlProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### SliderTrackProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### SliderRangeProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### SliderThumbProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| index    | -       | number                                           | -                           |
| name?    | -       | string \| undefined                              | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### SliderHiddenInputProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"input">]> \| undefined | Render the element yourself |

### SliderMarkerGroupProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### SliderMarkerProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | number                                           | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

# Switch

Toggle between two states, such as on/off.

```svelte
<script lang="ts">
	import { Switch } from '@skeletonlabs/skeleton-svelte';
</script>

<Switch>
	<Switch.Control>
		<Switch.Thumb />
	</Switch.Control>
	<Switch.Label>Label</Switch.Label>
	<Switch.HiddenInput />
</Switch>
```

## Checked Color

Use the [Tailwind data attribute syntax](https://tailwindcss.com/docs/hover-focus-and-other-states#data-attributes) to target the active state using `data-[state=checked]`

```svelte
<script lang="ts">
	import { Switch } from '@skeletonlabs/skeleton-svelte';
</script>

<Switch>
	<Switch.Control class="data-[state=checked]:preset-filled-success-500">
		<Switch.Thumb />
	</Switch.Control>
	<Switch.HiddenInput />
</Switch>
```

## List

```svelte
<script lang="ts">
	import { Switch } from '@skeletonlabs/skeleton-svelte';
</script>

<div class="grid w-full gap-2">
	{#each ['Label 1', 'Label 2', 'Label 3'] as label, i (label)}
		<Switch class="flex justify-between p-2">
			<Switch.Label>{label}</Switch.Label>
			<Switch.Control>
				<Switch.Thumb />
			</Switch.Control>
			<Switch.HiddenInput />
		</Switch>
		{#if i < 2}
			<hr class="hr" />
		{/if}
	{/each}
</div>
```

## Icons

```svelte
<script lang="ts">
	import { MoonIcon, SunIcon } from '@lucide/svelte';
	import { Switch } from '@skeletonlabs/skeleton-svelte';
</script>

<Switch>
	<Switch.Control>
		<Switch.Thumb>
			<Switch.Context>
				{#snippet children(switch_)}
					{#if switch_().checked}
						<SunIcon class="size-3" />
					{:else}
						<MoonIcon class="size-3" />
					{/if}
				{/snippet}
			</Switch.Context>
		</Switch.Thumb>
	</Switch.Control>
	<Switch.HiddenInput />
</Switch>
```

## Direction

```svelte
<script lang="ts">
	import { Switch } from '@skeletonlabs/skeleton-svelte';
</script>

<Switch dir="rtl">
	<Switch.Control>
		<Switch.Thumb />
	</Switch.Control>
	<Switch.Label>Label</Switch.Label>
	<Switch.HiddenInput />
</Switch>
```

## API Reference

### SwitchRootProps

| Property         | Default | Type                                                                                                          | Description                                                                                                                    |
| ---------------- | ------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| ids?             | -       | Partial\<\{ root: string; hiddenInput: string; control: string; label: string; thumb: string; }> \| undefined | The ids of the elements in the switch. Useful for composition.                                                                 |
| label?           | -       | string \| undefined                                                                                           | Specifies the localized strings that identifies the accessibility elements and their states                                    |
| disabled?        | -       | boolean \| undefined                                                                                          | Whether the switch is disabled.                                                                                                |
| invalid?         | -       | boolean \| undefined                                                                                          | If \`true\`, the switch is marked as invalid.                                                                                  |
| required?        | -       | boolean \| undefined                                                                                          | If \`true\`, the switch input is marked as required,                                                                           |
| readOnly?        | -       | boolean \| undefined                                                                                          | Whether the switch is read-only                                                                                                |
| onCheckedChange? | -       | ((details: CheckedChangeDetails) => void) \| undefined                                                        | Function to call when the switch is clicked.                                                                                   |
| checked?         | -       | boolean \| undefined                                                                                          | The controlled checked state of the switch                                                                                     |
| defaultChecked?  | -       | boolean \| undefined                                                                                          | The initial checked state of the switch when rendered.&#xA;Use when you don't need to control the checked state of the switch. |
| name?            | -       | string \| undefined                                                                                           | The name of the input field in a switch&#xA;(Useful for form submission).                                                      |
| form?            | -       | string \| undefined                                                                                           | The id of the form that the switch belongs to                                                                                  |
| value?           | "on"    | string \| number \| undefined                                                                                 | The value of switch input. Useful for form submission.                                                                         |
| dir?             | "ltr"   | "ltr" \| "rtl" \| undefined                                                                                   | The document's text/writing direction.                                                                                         |
| getRootNode?     | -       | (() => ShadowRoot \| Node \| Document) \| undefined                                                           | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                     |
| element?         | -       | Snippet\<\[HTMLAttributes\<"label">]> \| undefined                                                            | Render the element yourself                                                                                                    |

### SwitchRootProviderProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| value    | -       | () => SwitchApi\<PropTypes>                        | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"label">]> \| undefined | Render the element yourself |

### SwitchRootContextProps

| Property | Default | Type                                     | Description |
| -------- | ------- | ---------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => SwitchApi\<PropTypes>]> | -           |

### SwitchControlProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

### SwitchThumbProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

### SwitchLabelProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

### SwitchHiddenInputProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"input">]> \| undefined | Render the element yourself |

# Tabs

Use tabs to quickly switch between different views and pages.

```svelte
<script lang="ts">
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
</script>

<Tabs defaultValue="tab-1">
	<Tabs.List>
		<Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
		<Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
		<Tabs.Trigger value="tab-3">Tab 3</Tabs.Trigger>
		<Tabs.Indicator />
	</Tabs.List>
	<Tabs.Content value="tab-1">Content for Tab 1</Tabs.Content>
	<Tabs.Content value="tab-2">Content for Tab 2</Tabs.Content>
	<Tabs.Content value="tab-3">Content for Tab 3</Tabs.Content>
</Tabs>
```

## Fluid Width

```svelte
<script lang="ts">
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
</script>

<Tabs defaultValue="tab-1">
	<Tabs.List>
		<Tabs.Trigger class="flex-1" value="tab-1">Tab 1</Tabs.Trigger>
		<Tabs.Trigger class="flex-1" value="tab-2">Tab 2</Tabs.Trigger>
		<Tabs.Trigger class="flex-1" value="tab-3">Tab 3</Tabs.Trigger>
		<Tabs.Indicator />
	</Tabs.List>
	<Tabs.Content value="tab-1">Content for Tab 1</Tabs.Content>
	<Tabs.Content value="tab-2">Content for Tab 2</Tabs.Content>
	<Tabs.Content value="tab-3">Content for Tab 3</Tabs.Content>
</Tabs>
```

## Vertical

```svelte
<script lang="ts">
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
</script>

<Tabs defaultValue="tab-1" orientation="vertical">
	<Tabs.List>
		<Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
		<Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
		<Tabs.Trigger value="tab-3">Tab 3</Tabs.Trigger>
		<Tabs.Indicator />
	</Tabs.List>
	<Tabs.Content value="tab-1">Content for Tab 1</Tabs.Content>
	<Tabs.Content value="tab-2">Content for Tab 2</Tabs.Content>
	<Tabs.Content value="tab-3">Content for Tab 3</Tabs.Content>
</Tabs>
```

## Direction

```svelte
<script lang="ts">
	import { Tabs } from '@skeletonlabs/skeleton-svelte';
</script>

<Tabs defaultValue="tab-1" dir="rtl">
	<Tabs.List>
		<Tabs.Trigger value="tab-1">Tab 1</Tabs.Trigger>
		<Tabs.Trigger value="tab-2">Tab 2</Tabs.Trigger>
		<Tabs.Trigger value="tab-3">Tab 3</Tabs.Trigger>
		<Tabs.Indicator />
	</Tabs.List>
	<Tabs.Content value="tab-1">Content for Tab 1</Tabs.Content>
	<Tabs.Content value="tab-2">Content for Tab 2</Tabs.Content>
	<Tabs.Content value="tab-3">Content for Tab 3</Tabs.Content>
</Tabs>
```

## API Reference

### TabsRootProps

| Property        | Default      | Type                                                                                                                                               | Description                                                                                                                                                                                                       |
| --------------- | ------------ | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ids?            | -            | Partial\<\{ root: string; trigger: (value: string) => string; list: string; content: (value: string) => string; indicator: string; }> \| undefined | The ids of the elements in the tabs. Useful for composition.                                                                                                                                                      |
| translations?   | -            | IntlTranslations \| undefined                                                                                                                      | Specifies the localized strings that identifies the accessibility elements and their states                                                                                                                       |
| loopFocus?      | true         | boolean \| undefined                                                                                                                               | Whether the keyboard navigation will loop from last tab to first, and vice versa.                                                                                                                                 |
| value?          | -            | string \| null \| undefined                                                                                                                        | The controlled selected tab value                                                                                                                                                                                 |
| defaultValue?   | -            | string \| null \| undefined                                                                                                                        | The initial selected tab value when rendered.&#xA;Use when you don't need to control the selected tab value.                                                                                                      |
| orientation?    | "horizontal" | "horizontal" \| "vertical" \| undefined                                                                                                            | The orientation of the tabs. Can be \`horizontal\` or \`vertical\`&#xA;- \`horizontal\`: only left and right arrow key navigation will work.&#xA;- \`vertical\`: only up and down arrow key navigation will work. |
| activationMode? | "automatic"  | "manual" \| "automatic" \| undefined                                                                                                               | The activation mode of the tabs. Can be \`manual\` or \`automatic\`&#xA;- \`manual\`: Tabs are activated when clicked or press \`enter\` key.&#xA;- \`automatic\`: Tabs are activated when receiving focus        |
| onValueChange?  | -            | ((details: ValueChangeDetails) => void) \| undefined                                                                                               | Callback to be called when the selected/active tab changes                                                                                                                                                        |
| onFocusChange?  | -            | ((details: FocusChangeDetails) => void) \| undefined                                                                                               | Callback to be called when the focused tab changes                                                                                                                                                                |
| composite?      | -            | boolean \| undefined                                                                                                                               | Whether the tab is composite                                                                                                                                                                                      |
| deselectable?   | -            | boolean \| undefined                                                                                                                               | Whether the active tab can be deselected when clicking on it.                                                                                                                                                     |
| navigate?       | -            | ((details: NavigateDetails) => void) \| null \| undefined                                                                                          | Function to navigate to the selected tab when clicking on it.&#xA;Useful if tab triggers are anchor elements.                                                                                                     |
| dir?            | "ltr"        | "ltr" \| "rtl" \| undefined                                                                                                                        | The document's text/writing direction.                                                                                                                                                                            |
| getRootNode?    | -            | (() => ShadowRoot \| Node \| Document) \| undefined                                                                                                | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                                                                                                        |
| element?        | -            | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                                                                                                   | Render the element yourself                                                                                                                                                                                       |

### TabsRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => TabsApi\<PropTypes>                        | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TabsRootContextProps

| Property | Default | Type                                   | Description |
| -------- | ------- | -------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => TabsApi\<PropTypes>]> | -           |

### TabsListProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TabsTriggerProps

| Property  | Default | Type                                                | Description                 |
| --------- | ------- | --------------------------------------------------- | --------------------------- |
| value     | -       | string                                              | The value of the tab        |
| disabled? | -       | boolean \| undefined                                | Whether the tab is disabled |
| element?  | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### TabsIndicatorProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TabsContentProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | string                                           | The value of the tab        |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

# Tags Input

Allows input of multiple values.

```svelte
<script lang="ts">
	import { TagsInput } from '@skeletonlabs/skeleton-svelte';
</script>

<TagsInput defaultValue={['Vanilla', 'Chocolate', 'Strawberry']}>
	<TagsInput.Label>Label</TagsInput.Label>
	<TagsInput.Control>
		<TagsInput.Context>
			{#snippet children(tagsInput)}
				{#each tagsInput().value as value, index (index)}
					<TagsInput.Item {value} {index}>
						<TagsInput.ItemPreview>
							<TagsInput.ItemText>{value}</TagsInput.ItemText>
							<TagsInput.ItemDeleteTrigger />
						</TagsInput.ItemPreview>
						<TagsInput.ItemInput />
					</TagsInput.Item>
				{/each}
			{/snippet}
		</TagsInput.Context>
		<TagsInput.Input placeholder="Add a flavor..." />
	</TagsInput.Control>
	<TagsInput.ClearTrigger>Clear All</TagsInput.ClearTrigger>
	<TagsInput.HiddenInput />
</TagsInput>
```

## Custom Icon

```svelte
<script lang="ts">
	import { CircleXIcon } from '@lucide/svelte';
	import { TagsInput } from '@skeletonlabs/skeleton-svelte';
</script>

<TagsInput defaultValue={['Vanilla', 'Chocolate', 'Strawberry']}>
	<TagsInput.Control>
		<TagsInput.Context>
			{#snippet children(tagsInput)}
				{#each tagsInput().value as value, index (index)}
					<TagsInput.Item {value} {index}>
						<TagsInput.ItemPreview>
							<TagsInput.ItemText>{value}</TagsInput.ItemText>
							<TagsInput.ItemDeleteTrigger>
								<CircleXIcon class="size-4" />
							</TagsInput.ItemDeleteTrigger>
						</TagsInput.ItemPreview>
						<TagsInput.ItemInput />
					</TagsInput.Item>
				{/each}
			{/snippet}
		</TagsInput.Context>
		<TagsInput.Input placeholder="Add a flavor..." />
	</TagsInput.Control>
	<TagsInput.HiddenInput />
</TagsInput>
```

## Color

```svelte
<script lang="ts">
	import { TagsInput } from '@skeletonlabs/skeleton-svelte';
</script>

<TagsInput defaultValue={['Vanilla', 'Chocolate', 'Strawberry']}>
	<TagsInput.Control>
		<TagsInput.Context>
			{#snippet children(tagsInput)}
				{#each tagsInput().value as value, index (index)}
					<TagsInput.Item {value} {index}>
						<TagsInput.ItemPreview class="preset-filled-secondary-500">
							<TagsInput.ItemText>{value}</TagsInput.ItemText>
							<TagsInput.ItemDeleteTrigger />
						</TagsInput.ItemPreview>
						<TagsInput.ItemInput />
					</TagsInput.Item>
				{/each}
			{/snippet}
		</TagsInput.Context>
		<TagsInput.Input placeholder="Add a flavor..." />
	</TagsInput.Control>
	<TagsInput.HiddenInput />
</TagsInput>
```

## Provider Pattern

Use the [Provider Pattern](/docs/get-started/fundamentals#provider-pattern) to gain access to the the inner component APIs.

```svelte
<script lang="ts">
	import { TagsInput, useTagsInput } from '@skeletonlabs/skeleton-svelte';

	const id = $props.id();
	const tagsInput = useTagsInput({
		id,
		defaultValue: ['Vanilla', 'Chocolate', 'Strawberry']
	});
</script>

<div class="w-full space-y-4">
	<TagsInput.Provider value={tagsInput}>
		<TagsInput.Control>
			<TagsInput.Context>
				{#snippet children(tagsInput)}
					{#each tagsInput().value as value, index (index)}
						<TagsInput.Item {value} {index}>
							<TagsInput.ItemPreview>
								<TagsInput.ItemText>{value}</TagsInput.ItemText>
								<TagsInput.ItemDeleteTrigger />
							</TagsInput.ItemPreview>
							<TagsInput.ItemInput />
						</TagsInput.Item>
					{/each}
				{/snippet}
			</TagsInput.Context>
			<TagsInput.Input placeholder="Add a flavor..." />
		</TagsInput.Control>
		<TagsInput.HiddenInput />
	</TagsInput.Provider>

	<!-- Programmatic Controls -->
	<div class="flex items-center justify-center card preset-outlined-surface-200-800 py-4">
		<button class="btn preset-filled" onclick={() => tagsInput().clearValue()}>Clear Tags</button>
	</div>
</div>
```

## Direction

```svelte
<script lang="ts">
	import { TagsInput } from '@skeletonlabs/skeleton-svelte';
</script>

<TagsInput defaultValue={['Vanilla', 'Chocolate', 'Strawberry']} dir="rtl">
	<TagsInput.Label>Label</TagsInput.Label>
	<TagsInput.Control>
		<TagsInput.Context>
			{#snippet children(tagsInput)}
				{#each tagsInput().value as value, index (index)}
					<TagsInput.Item {value} {index}>
						<TagsInput.ItemPreview>
							<TagsInput.ItemText>{value}</TagsInput.ItemText>
							<TagsInput.ItemDeleteTrigger />
						</TagsInput.ItemPreview>
						<TagsInput.ItemInput />
					</TagsInput.Item>
				{/each}
			{/snippet}
		</TagsInput.Context>
		<TagsInput.Input placeholder="Add a flavor..." />
	</TagsInput.Control>
	<TagsInput.ClearTrigger>Clear All</TagsInput.ClearTrigger>
	<TagsInput.HiddenInput />
</TagsInput>
```

## API Reference

### TagsInputRootProps

| Property              | Default  | Type                                                                                                                                                                                                                                                       | Description                                                                                                                                         |
| --------------------- | -------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| ids?                  | -        | Partial\<\{ root: string; input: string; hiddenInput: string; clearBtn: string; label: string; control: string; item: (opts: ItemProps) => string; itemDeleteTrigger: (opts: ItemProps) => string; itemInput: (opts: ItemProps) => string; }> \| undefined | The ids of the elements in the tags input. Useful for composition.                                                                                  |
| translations?         | -        | IntlTranslations \| undefined                                                                                                                                                                                                                              | Specifies the localized strings that identifies the accessibility elements and their states                                                         |
| maxLength?            | -        | number \| undefined                                                                                                                                                                                                                                        | The max length of the input.                                                                                                                        |
| delimiter?            | ","      | string \| RegExp \| undefined                                                                                                                                                                                                                              | The character that serves has:&#xA;- event key to trigger the addition of a new tag&#xA;- character used to split tags when pasting into the input  |
| autoFocus?            | -        | boolean \| undefined                                                                                                                                                                                                                                       | Whether the input should be auto-focused                                                                                                            |
| disabled?             | -        | boolean \| undefined                                                                                                                                                                                                                                       | Whether the tags input should be disabled                                                                                                           |
| readOnly?             | -        | boolean \| undefined                                                                                                                                                                                                                                       | Whether the tags input should be read-only                                                                                                          |
| invalid?              | -        | boolean \| undefined                                                                                                                                                                                                                                       | Whether the tags input is invalid                                                                                                                   |
| required?             | -        | boolean \| undefined                                                                                                                                                                                                                                       | Whether the tags input is required                                                                                                                  |
| editable?             | true     | boolean \| undefined                                                                                                                                                                                                                                       | Whether a tag can be edited after creation, by pressing \`Enter\` or double clicking.                                                               |
| inputValue?           | -        | string \| undefined                                                                                                                                                                                                                                        | The controlled tag input's value                                                                                                                    |
| defaultInputValue?    | -        | string \| undefined                                                                                                                                                                                                                                        | The initial tag input value when rendered.&#xA;Use when you don't need to control the tag input value.                                              |
| value?                | -        | string\[] \| undefined                                                                                                                                                                                                                                     | The controlled tag value                                                                                                                            |
| defaultValue?         | -        | string\[] \| undefined                                                                                                                                                                                                                                     | The initial tag value when rendered.&#xA;Use when you don't need to control the tag value.                                                          |
| onValueChange?        | -        | ((details: ValueChangeDetails) => void) \| undefined                                                                                                                                                                                                       | Callback fired when the tag values is updated                                                                                                       |
| onInputValueChange?   | -        | ((details: InputValueChangeDetails) => void) \| undefined                                                                                                                                                                                                  | Callback fired when the input value is updated                                                                                                      |
| onHighlightChange?    | -        | ((details: HighlightChangeDetails) => void) \| undefined                                                                                                                                                                                                   | Callback fired when a tag is highlighted by pointer or keyboard navigation                                                                          |
| onValueInvalid?       | -        | ((details: ValidityChangeDetails) => void) \| undefined                                                                                                                                                                                                    | Callback fired when the max tag count is reached or the \`validateTag\` function returns \`false\`                                                  |
| validate?             | -        | ((details: ValidateArgs) => boolean) \| undefined                                                                                                                                                                                                          | Returns a boolean that determines whether a tag can be added.&#xA;Useful for preventing duplicates or invalid tag values.                           |
| blurBehavior?         | -        | "clear" \| "add" \| undefined                                                                                                                                                                                                                              | The behavior of the tags input when the input is blurred&#xA;- \`"add"\`: add the input value as a new tag&#xA;- \`"clear"\`: clear the input value |
| addOnPaste?           | false    | boolean \| undefined                                                                                                                                                                                                                                       | Whether to add a tag when you paste values into the tag input                                                                                       |
| max?                  | Infinity | number \| undefined                                                                                                                                                                                                                                        | The max number of tags                                                                                                                              |
| allowOverflow?        | -        | boolean \| undefined                                                                                                                                                                                                                                       | Whether to allow tags to exceed max. In this case,&#xA;we'll attach \`data-invalid\` to the root                                                    |
| name?                 | -        | string \| undefined                                                                                                                                                                                                                                        | The name attribute for the input. Useful for form submissions                                                                                       |
| form?                 | -        | string \| undefined                                                                                                                                                                                                                                        | The associate form of the underlying input element.                                                                                                 |
| dir?                  | "ltr"    | "ltr" \| "rtl" \| undefined                                                                                                                                                                                                                                | The document's text/writing direction.                                                                                                              |
| getRootNode?          | -        | (() => ShadowRoot \| Node \| Document) \| undefined                                                                                                                                                                                                        | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                                          |
| onPointerDownOutside? | -        | ((event: PointerDownOutsideEvent) => void) \| undefined                                                                                                                                                                                                    | Function called when the pointer is pressed down outside the component                                                                              |
| onFocusOutside?       | -        | ((event: FocusOutsideEvent) => void) \| undefined                                                                                                                                                                                                          | Function called when the focus is moved outside the component                                                                                       |
| onInteractOutside?    | -        | ((event: InteractOutsideEvent) => void) \| undefined                                                                                                                                                                                                       | Function called when an interaction happens outside the component                                                                                   |
| element?              | -        | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                                                                                                                                                                                                           | Render the element yourself                                                                                                                         |

### TagsInputRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => TagsInputApi\<PropTypes>                   | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TagsInputRootContextProps

| Property | Default | Type                                        | Description |
| -------- | ------- | ------------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => TagsInputApi\<PropTypes>]> | -           |

### TagsInputLabelProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"label">]> \| undefined | Render the element yourself |

### TagsInputControlProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TagsInputItemProps

| Property  | Default | Type                                              | Description                 |
| --------- | ------- | ------------------------------------------------- | --------------------------- |
| index     | -       | string \| number                                  | -                           |
| value     | -       | string                                            | -                           |
| disabled? | -       | boolean \| undefined                              | -                           |
| element?  | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

### TagsInputItemPreviewProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TagsInputItemTextProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

### TagsInputItemDeleteTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### TagsInputItemInputProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"input">]> \| undefined | Render the element yourself |

### TagsInputInputProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"input">]> \| undefined | Render the element yourself |

### TagsInputClearTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### TagsInputHiddenInputProps

| Property | Default | Type                                               | Description                 |
| -------- | ------- | -------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"input">]> \| undefined | Render the element yourself |

# Toast

Display brief messages to users.

```svelte
<script lang="ts">
	import { Toast, createToaster } from '@skeletonlabs/skeleton-svelte';

	const toaster = createToaster({});
</script>

<button
	class="btn preset-filled"
	onclick={() =>
		toaster.info({
			title: 'Title',
			description: 'This is a description.'
		})}
>
	Toast
</button>

<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast {toast}>
			<Toast.Message>
				<Toast.Title>{toast.title}</Toast.Title>
				<Toast.Description>{toast.description}</Toast.Description>
			</Toast.Message>
			<Toast.CloseTrigger />
		</Toast>
	{/snippet}
</Toast.Group>
```

## Usage

This component acts as a Singleton - meaning you only implement a single instance (typically at the root scope of your app) and then reused it over and over. To do this, implement the `<Toast.Group>` at the root scope of your app (for SvelteKit this would be your root `+layout.svelte`), and use a shared `createToaster()` instance to trigger messages to that group from anywhere in your application.

## Type

```svelte
<script lang="ts">
	import { Toast, createToaster } from '@skeletonlabs/skeleton-svelte';

	const toaster = createToaster({});
</script>

<div class="grid grid-cols-2 gap-2">
	<button
		class="btn preset-filled"
		onclick={() =>
			toaster.info({
				title: 'Info',
				description: 'This is an info toast.'
			})}
	>
		Info
	</button>
	<button
		class="btn preset-filled-success-500"
		onclick={() =>
			toaster.success({
				title: 'Success',
				description: 'This is a success toast.'
			})}
	>
		Success
	</button>
	<button
		class="btn preset-filled-warning-500"
		onclick={() =>
			toaster.warning({
				title: 'Warning',
				description: 'This is a warning toast.'
			})}
	>
		Warning
	</button>
	<button
		class="btn preset-filled-error-500"
		onclick={() =>
			toaster.error({
				title: 'Error',
				description: 'This is an error toast.'
			})}
	>
		Error
	</button>
</div>

<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast {toast}>
			<Toast.Message>
				<Toast.Title>{toast.title}</Toast.Title>
				<Toast.Description>{toast.description}</Toast.Description>
			</Toast.Message>
			<Toast.CloseTrigger />
		</Toast>
	{/snippet}
</Toast.Group>
```

Types can be specified in one of two ways:

- Via a trigger method: `toaster.{info|success|warning|error}()`
- Via the object key: `type: {info|success|warning|error}`

## Action

Include an optional action button.

```svelte
<script lang="ts">
	import { Toast, createToaster } from '@skeletonlabs/skeleton-svelte';

	const toaster = createToaster({});
</script>

<button
	class="btn preset-filled"
	onclick={() =>
		toaster.info({
			title: 'Toast',
			description: 'This is a toast message.',
			duration: Infinity,
			action: {
				label: 'Undo',
				onClick: () => {
					toaster.success({
						title: 'Task undone',
						description: 'The task has been undone.'
					});
				}
			}
		})}
>
	Toast
</button>

<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast {toast}>
			<Toast.Message>
				<Toast.Title>{toast.title}</Toast.Title>
				<Toast.Description>{toast.description}</Toast.Description>
			</Toast.Message>
			{#if toast.action}
				<Toast.ActionTrigger>{toast.action.label}</Toast.ActionTrigger>
			{/if}
			<Toast.CloseTrigger />
		</Toast>
	{/snippet}
</Toast.Group>
```

## Closable

By passing `closable: false` you can disable the close button.

```svelte
<script lang="ts">
	import { Toast, createToaster } from '@skeletonlabs/skeleton-svelte';

	const toaster = createToaster({});
</script>

<button
	class="btn preset-filled"
	onclick={() =>
		toaster.info({
			title: 'Title',
			description: 'This is a description.',
			closable: false
		})}
>
	Toast
</button>

<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast {toast}>
			<Toast.Message>
				<Toast.Title>{toast.title}</Toast.Title>
				<Toast.Description>{toast.description}</Toast.Description>
			</Toast.Message>
			{#if toast.closable}
				<Toast.CloseTrigger />
			{/if}
		</Toast>
	{/snippet}
</Toast.Group>
```

## Placement

```svelte
<script lang="ts">
	import { Toast, createToaster } from '@skeletonlabs/skeleton-svelte';

	const toaster = createToaster({
		placement: 'bottom-end'
	});
</script>

<button
	class="btn preset-filled"
	onclick={() =>
		toaster.info({
			title: 'Title',
			description: 'This is a description.'
		})}
>
	Toast
</button>

<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast {toast}>
			<Toast.Message>
				<Toast.Title>{toast.title}</Toast.Title>
				<Toast.Description>{toast.description}</Toast.Description>
			</Toast.Message>
			<Toast.CloseTrigger />
		</Toast>
	{/snippet}
</Toast.Group>
```

## Meta

Use the `meta` key to provide arbitrary data. Then use this to modify your Toast template.

```svelte
<script lang="ts">
	import { SkullIcon } from '@lucide/svelte';
	import { Toast, createToaster } from '@skeletonlabs/skeleton-svelte';

	const toaster = createToaster({});
</script>

{#snippet skull()}
	<SkullIcon class="size-8" />
{/snippet}

<button
	class="btn preset-filled"
	onclick={() =>
		toaster.info({
			title: 'Title',
			description: 'This is a description.',
			meta: {
				icon: skull
			}
		})}
>
	Toast
</button>

<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast {toast}>
			{@render toast.meta!.icon()}
			<Toast.Message>
				<Toast.Title class="flex items-center gap-2">{toast.title}</Toast.Title>
				<Toast.Description>{toast.description} {toast.meta?.foo}</Toast.Description>
			</Toast.Message>
			<Toast.CloseTrigger />
		</Toast>
	{/snippet}
</Toast.Group>
```

## Promise

Use promises for asynchronous triggers.

```svelte
<script lang="ts">
	import { Toast, createToaster } from '@skeletonlabs/skeleton-svelte';

	const toaster = createToaster({});

	function generatePositiveNumber() {
		return new Promise<number>((resolve, reject) => {
			setTimeout(() => {
				const number = Math.random() - 0.5;
				if (number > 0) {
					resolve(number);
				} else {
					reject(number);
				}
			}, 2000);
		});
	}
</script>

<button
	class="btn preset-filled"
	onclick={() =>
		toaster.promise(generatePositiveNumber(), {
			loading: {
				title: 'Loading...',
				description: 'Please wait while generating your number'
			},
			success: (number) => ({
				title: 'Success',
				description: `Your number is ${number}`
			}),
			error: (number) => ({
				title: 'Error',
				description: `Your number is ${number}`
			})
		})}
>
	Toast
</button>

<Toast.Group {toaster}>
	{#snippet children(toast)}
		<Toast {toast}>
			<Toast.Message>
				<Toast.Title>{toast.title}</Toast.Title>
				<Toast.Description>{toast.description}</Toast.Description>
			</Toast.Message>
			<Toast.CloseTrigger />
		</Toast>
	{/snippet}
</Toast.Group>
```

## API Reference

### ToastRootProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| toast    | -       | Options\<any>                                    | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ToastRootContextProps

| Property | Default | Type                                         | Description |
| -------- | ------- | -------------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => ToastApi\<PropTypes, any>]> | -           |

### ToastGroupProps

| Property  | Default | Type                                             | Description                 |
| --------- | ------- | ------------------------------------------------ | --------------------------- |
| toaster   | -       | ToastStore\<any>                                 | -                           |
| children? | -       | Snippet\<\[ToastProps\<any>]> \| undefined       | -                           |
| element?  | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ToastMessageProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ToastTitleProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ToastDescriptionProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### ToastActionTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### ToastCloseTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

# Tooltip

A floating label that appears on hover or focus, providing additional context.

```svelte
<script lang="ts">
	import { Portal, Tooltip } from '@skeletonlabs/skeleton-svelte';
</script>

<Tooltip>
	<Tooltip.Trigger>Hover Me</Tooltip.Trigger>
	<Portal>
		<Tooltip.Positioner>
			<Tooltip.Content class="max-w-md card bg-surface-100-900 p-2 shadow-xl">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente magni distinctio
				explicabo quisquam. Rerum impedit culpa nesciunt enim.
			</Tooltip.Content>
		</Tooltip.Positioner>
	</Portal>
</Tooltip>
```

## Arrow

You may optionally enable arrows via the `Arrow` and `ArrowTip` component parts. Note that Zag.js opts to style these with CSS custom properties, which can be adjusted using a `style` attribute.

```svelte
<script lang="ts">
	import { Portal, Tooltip } from '@skeletonlabs/skeleton-svelte';
</script>

<Tooltip>
	<Tooltip.Trigger>Hover Me</Tooltip.Trigger>
	<Portal>
		<Tooltip.Positioner>
			<Tooltip.Content class="max-w-md card bg-surface-100-900 p-2 shadow-xl">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente magni distinctio
				explicabo quisquam. Rerum impedit culpa nesciunt enim.
				<Tooltip.Arrow
					style="--arrow-size: calc(var(--spacing) * 2); --arrow-background: var(--color-surface-100-900);"
				>
					<Tooltip.ArrowTip />
				</Tooltip.Arrow>
			</Tooltip.Content>
		</Tooltip.Positioner>
	</Portal>
</Tooltip>
```

## Z-Index

By default we do not take an opinionated stance regarding z-index stacking. The result is the component can sometimes be occluded beneath other elements with a higher index. The Z-Index can controlled by applying a utility class to the `Positioner` component part.

```svelte
<script lang="ts">
	import { Portal, Tooltip } from '@skeletonlabs/skeleton-svelte';
</script>

<div class="grid grid-cols-2 gap-4">
	<Tooltip>
		<Tooltip.Trigger>Default (auto)</Tooltip.Trigger>
		<Portal>
			<Tooltip.Positioner>
				<Tooltip.Content class="max-w-md card bg-surface-100-900 p-2 shadow-xl"
					>This example will be below the sibling.</Tooltip.Content
				>
			</Tooltip.Positioner>
		</Portal>
	</Tooltip>

	<Tooltip>
		<Tooltip.Trigger>Above (20)</Tooltip.Trigger>
		<Portal>
			<Tooltip.Positioner class="z-20!">
				<Tooltip.Content class="max-w-md card bg-surface-100-900 p-2 shadow-xl"
					>This example will be above the sibling.</Tooltip.Content
				>
			</Tooltip.Positioner>
		</Portal>
	</Tooltip>

	<div class="relative col-span-2 h-[100px]">
		<div
			class="absolute z-10 flex h-full w-full items-center justify-center rounded bg-primary-200-800/75"
		>
			Sibling (10)
		</div>
	</div>
</div>
```

## Programmatic Control

This is made possible via the Provider Pattern.

```svelte
<script lang="ts">
	import { Portal, Tooltip, useTooltip } from '@skeletonlabs/skeleton-svelte';

	const id = $props.id();
	const tooltip = useTooltip({ id });
</script>

<div class="grid gap-4">
	<button class="btn w-[150px] preset-filled" onclick={() => tooltip().setOpen(!tooltip().open)}
		>Trigger</button
	>
	<Tooltip.Provider value={tooltip}>
		<Tooltip.Trigger>Anchor ({tooltip().open ? 'open' : 'closed'})</Tooltip.Trigger>
		<Portal>
			<Tooltip.Positioner>
				<Tooltip.Content class="max-w-md card bg-surface-100-900 p-2 shadow-xl">
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente magni distinctio
					explicabo quisquam. Rerum impedit culpa nesciunt enim.
				</Tooltip.Content>
			</Tooltip.Positioner>
		</Portal>
	</Tooltip.Provider>
</div>
```

## Direction

```svelte
<script lang="ts">
	import { Portal, Tooltip } from '@skeletonlabs/skeleton-svelte';
</script>

<Tooltip dir="rtl">
	<Tooltip.Trigger>Hover Me</Tooltip.Trigger>
	<Portal>
		<Tooltip.Positioner>
			<Tooltip.Content class="max-w-md card bg-surface-100-900 p-2 shadow-xl">
				Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente magni distinctio
				explicabo quisquam. Rerum impedit culpa nesciunt enim.
			</Tooltip.Content>
		</Tooltip.Positioner>
	</Portal>
</Tooltip>
```

## Headless

Unlike most components in Skeleton, this feature is provided "headless". This means no default styles are applied out of the box. This ensures you retain full control of all styling.

```svelte
<script lang="ts">
	import { Portal, Tooltip } from '@skeletonlabs/skeleton-svelte';
</script>

<Tooltip>
	<Tooltip.Trigger>Hover Me</Tooltip.Trigger>
	<Portal>
		<Tooltip.Positioner>
			<Tooltip.Content class="max-w-md space-y-2 card bg-surface-100-900 p-2 shadow-xl">
				<img
					class="size-72"
					src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExNWVmbzcxanp6YmtxZ28xcXBqaXBscThsdDZ5Nm9ncWxkeWtqaHJ2bSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9dg/dn1PN6NtunfnUjUGFC/giphy.gif"
					alt="Skeleton Gif"
				/>
				<p>Three spooky skeletons!</p>
			</Tooltip.Content>
		</Tooltip.Positioner>
	</Portal>
</Tooltip>
```

The benefits are as follows:

- You can make the `Trigger` surround any element, including an icon, button, image, etc.
- You can modify the entire structure within `Content`, including custom markup and styling.
- You may place the `CloseTrigger` anywhere, and use it as an X close option.

## API Reference

### TooltipRootProps

| Property            | Default | Type                                                                                             | Description                                                                                                                     |
| ------------------- | ------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| dir?                | "ltr"   | "ltr" \| "rtl" \| undefined                                                                      | The document's text/writing direction.                                                                                          |
| aria-label?         | -       | string \| undefined                                                                              | Custom label for the tooltip.                                                                                                   |
| ids?                | -       | Partial\<\{ trigger: string; content: string; arrow: string; positioner: string; }> \| undefined | The ids of the elements in the tooltip. Useful for composition.                                                                 |
| openDelay?          | 400     | number \| undefined                                                                              | The open delay of the tooltip.                                                                                                  |
| closeDelay?         | 150     | number \| undefined                                                                              | The close delay of the tooltip.                                                                                                 |
| closeOnPointerDown? | true    | boolean \| undefined                                                                             | Whether to close the tooltip on pointerdown.                                                                                    |
| closeOnEscape?      | true    | boolean \| undefined                                                                             | Whether to close the tooltip when the Escape key is pressed.                                                                    |
| closeOnScroll?      | true    | boolean \| undefined                                                                             | Whether the tooltip should close on scroll                                                                                      |
| closeOnClick?       | true    | boolean \| undefined                                                                             | Whether the tooltip should close on click                                                                                       |
| interactive?        | false   | boolean \| undefined                                                                             | Whether the tooltip's content is interactive.&#xA;In this mode, the tooltip will remain open when user hovers over the content. |
| onOpenChange?       | -       | ((details: OpenChangeDetails) => void) \| undefined                                              | Function called when the tooltip is opened.                                                                                     |
| positioning?        | -       | PositioningOptions \| undefined                                                                  | The user provided options used to position the popover content                                                                  |
| disabled?           | -       | boolean \| undefined                                                                             | Whether the tooltip is disabled                                                                                                 |
| open?               | -       | boolean \| undefined                                                                             | The controlled open state of the tooltip                                                                                        |
| defaultOpen?        | -       | boolean \| undefined                                                                             | The initial open state of the tooltip when rendered.&#xA;Use when you don't need to control the open state of the tooltip.      |
| getRootNode?        | -       | (() => Node \| ShadowRoot \| Document) \| undefined                                              | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                      |
| children?           | -       | Snippet\<\[]> \| undefined                                                                       | The default slot content to be rendered within the component.                                                                   |

### TooltipRootProviderProps

| Property  | Default | Type                         | Description                                                   |
| --------- | ------- | ---------------------------- | ------------------------------------------------------------- |
| value     | -       | () => TooltipApi\<PropTypes> | -                                                             |
| children? | -       | Snippet\<\[]> \| undefined   | The default slot content to be rendered within the component. |

### TooltipRootContextProps

| Property | Default | Type                                      | Description |
| -------- | ------- | ----------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => TooltipApi\<PropTypes>]> | -           |

### TooltipTriggerProps

| Property | Default | Type                                                | Description                 |
| -------- | ------- | --------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"button">]> \| undefined | Render the element yourself |

### TooltipPositionerProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TooltipContentProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TooltipArrowProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TooltipArrowTipProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

# Tree View

Used to display hierarchical data.

```svelte
<script lang="ts">
	import { FileIcon, FolderIcon } from '@lucide/svelte';
	import { TreeView, createTreeViewCollection } from '@skeletonlabs/skeleton-svelte';

	interface Node {
		id: string;
		name: string;
		children?: Node[];
	}

	const collection = createTreeViewCollection<Node>({
		nodeToValue: (node) => node.id,
		nodeToString: (node) => node.name,
		rootNode: {
			id: 'root',
			name: '',
			children: [
				{
					id: 'node_modules',
					name: 'node_modules',
					children: [
						{
							id: 'node_modules/@skeletonlabs',
							name: '@skeletonlabs',
							children: [
								{
									id: 'node_modules/@skeletonlabs/skeleton',
									name: 'skeleton'
								}
							]
						}
					]
				},
				{
					id: 'package.json',
					name: 'package.json'
				}
			]
		}
	});
</script>

<TreeView {collection}>
	<TreeView.Label>File System</TreeView.Label>
	<TreeView.Tree>
		{#each collection.rootNode.children || [] as node, index (node)}
			{@render treeNode(node, [index])}
		{/each}
	</TreeView.Tree>
</TreeView>

{#snippet treeNode(node: Node, indexPath: number[])}
	<TreeView.NodeProvider value={{ node, indexPath }}>
		{#if node.children}
			<TreeView.Branch>
				<TreeView.BranchControl>
					<TreeView.BranchIndicator />
					<TreeView.BranchText>
						<FolderIcon class="size-4" />
						{node.name}
					</TreeView.BranchText>
				</TreeView.BranchControl>
				<TreeView.BranchContent>
					<TreeView.BranchIndentGuide />
					{#each node.children as childNode, childIndex (childNode)}
						{@render treeNode(childNode, [...indexPath, childIndex])}
					{/each}
				</TreeView.BranchContent>
			</TreeView.Branch>
		{:else}
			<TreeView.Item>
				<FileIcon class="size-4" />
				{node.name}
			</TreeView.Item>
		{/if}
	</TreeView.NodeProvider>
{/snippet}
```

## Multiple Selection

- Windows: Hold <kbd class="kbd">Ctrl</kbd> + left click with mouse.
- MacOS: Hold <kbd class="kbd">⌘</kbd> + left click with mouse.

```svelte
<script lang="ts">
	import { FileIcon, FolderIcon } from '@lucide/svelte';
	import { TreeView, createTreeViewCollection } from '@skeletonlabs/skeleton-svelte';

	interface Node {
		id: string;
		name: string;
		children?: Node[];
	}

	const collection = createTreeViewCollection<Node>({
		nodeToValue: (node) => node.id,
		nodeToString: (node) => node.name,
		rootNode: {
			id: 'root',
			name: '',
			children: [
				{
					id: 'node_modules',
					name: 'node_modules',
					children: [
						{
							id: 'node_modules/@skeletonlabs',
							name: '@skeletonlabs',
							children: [
								{
									id: 'node_modules/@skeletonlabs/skeleton',
									name: 'skeleton'
								}
							]
						}
					]
				},
				{
					id: 'package.json',
					name: 'package.json'
				}
			]
		}
	});
</script>

<TreeView {collection} selectionMode="multiple">
	<TreeView.Label>File System</TreeView.Label>
	<TreeView.Tree>
		{#each collection.rootNode.children || [] as node, index (node)}
			{@render treeNode(node, [index])}
		{/each}
	</TreeView.Tree>
</TreeView>

{#snippet treeNode(node: Node, indexPath: number[])}
	<TreeView.NodeProvider value={{ node, indexPath }}>
		{#if node.children}
			<TreeView.Branch>
				<TreeView.BranchControl>
					<TreeView.BranchIndicator />
					<TreeView.BranchText>
						<FolderIcon class="size-4" />
						{node.name}
					</TreeView.BranchText>
				</TreeView.BranchControl>
				<TreeView.BranchContent>
					<TreeView.BranchIndentGuide />
					{#each node.children as childNode, childIndex (childNode)}
						{@render treeNode(childNode, [...indexPath, childIndex])}
					{/each}
				</TreeView.BranchContent>
			</TreeView.Branch>
		{:else}
			<TreeView.Item>
				<FileIcon class="size-4" />
				{node.name}
			</TreeView.Item>
		{/if}
	</TreeView.NodeProvider>
{/snippet}
```

## Collapse and Expand

Use the [Provider Pattern](/docs/get-started/fundamentals#provider-pattern) to gain access to the `collapse` and `expand` methods on the `TreeView` instance.

```svelte
<script lang="ts">
	import { FileIcon, FolderIcon } from '@lucide/svelte';
	import { TreeView, createTreeViewCollection, useTreeView } from '@skeletonlabs/skeleton-svelte';

	interface Node {
		id: string;
		name: string;
		children?: Node[];
	}

	const collection = createTreeViewCollection<Node>({
		nodeToValue: (node) => node.id,
		nodeToString: (node) => node.name,
		rootNode: {
			id: 'root',
			name: '',
			children: [
				{
					id: 'node_modules',
					name: 'node_modules',
					children: [
						{
							id: 'node_modules/@skeletonlabs',
							name: '@skeletonlabs',
							children: [
								{
									id: 'node_modules/@skeletonlabs/skeleton',
									name: 'skeleton'
								}
							]
						}
					]
				},
				{
					id: 'package.json',
					name: 'package.json'
				}
			]
		}
	});

	const id = $props.id();
	const treeView = useTreeView({
		id: id,
		collection: collection
	});
</script>

<div class="flex w-full flex-col items-center gap-4">
	<TreeView.Provider value={treeView}>
		<TreeView.Label>File System</TreeView.Label>
		<TreeView.Tree>
			{#each collection.rootNode.children || [] as node, index (node)}
				{@render treeNode(node, [index])}
			{/each}
		</TreeView.Tree>
	</TreeView.Provider>

	<div class="flex gap-2">
		<button class="btn preset-filled" onclick={() => treeView().collapse()}> Collapse </button>
		<button class="btn preset-filled" onclick={() => treeView().expand()}> Expand </button>
	</div>
</div>

{#snippet treeNode(node: Node, indexPath: number[])}
	<TreeView.NodeProvider value={{ node, indexPath }}>
		{#if node.children}
			<TreeView.Branch>
				<TreeView.BranchControl>
					<TreeView.BranchIndicator />
					<TreeView.BranchText>
						<FolderIcon class="size-4" />
						{node.name}
					</TreeView.BranchText>
				</TreeView.BranchControl>
				<TreeView.BranchContent>
					<TreeView.BranchIndentGuide />
					{#each node.children as childNode, childIndex (childNode)}
						{@render treeNode(childNode, [...indexPath, childIndex])}
					{/each}
				</TreeView.BranchContent>
			</TreeView.Branch>
		{:else}
			<TreeView.Item>
				<FileIcon class="size-4" />
				{node.name}
			</TreeView.Item>
		{/if}
	</TreeView.NodeProvider>
{/snippet}
```

## Lazy Loading

```svelte
<script lang="ts">
	import { FileIcon, FolderIcon, LoaderIcon } from '@lucide/svelte';
	import {
		TreeView,
		createTreeViewCollection,
		type TreeViewRootProps
	} from '@skeletonlabs/skeleton-svelte';

	interface Node {
		id: string;
		name: string;
		children?: Node[];
		childrenCount?: number;
	}

	const response: Record<string, Node[]> = {
		node_modules: [
			{
				id: 'node_modules/@skeletonlabs',
				name: '@skeletonlabs',
				childrenCount: 3
			}
		],
		'node_modules/@skeletonlabs': [
			{
				id: 'node_modules/@skeletonlabs/skeleton',
				name: 'skeleton'
			},
			{
				id: 'node_modules/@skeletonlabs/skeleton-react',
				name: 'skeleton-react'
			},
			{
				id: 'node_modules/@skeletonlabs/skeleton-svelte',
				name: 'skeleton-svelte'
			}
		]
	};

	let collection = $state(
		createTreeViewCollection<Node>({
			nodeToValue: (node) => node.id,
			nodeToString: (node) => node.name,
			rootNode: {
				id: 'root',
				name: '',
				children: [
					{
						id: 'node_modules',
						name: 'node_modules',
						childrenCount: 1
					},
					{
						id: 'package.json',
						name: 'package.json'
					}
				]
			}
		})
	);

	const loadChildren: TreeViewRootProps['loadChildren'] = async (details) => {
		await new Promise((resolve) => setTimeout(resolve, 1000));
		return response[details.node.id] || [];
	};

	const onLoadChildrenComplete: TreeViewRootProps['onLoadChildrenComplete'] = (details) => {
		collection = details.collection;
	};
</script>

<TreeView {collection} {loadChildren} {onLoadChildrenComplete}>
	<TreeView.Label>File System</TreeView.Label>
	<TreeView.Tree>
		{#each collection.rootNode.children || [] as node, index (node)}
			{@render treeNode(node, [index])}
		{/each}
	</TreeView.Tree>
</TreeView>

{#snippet treeNode(node: Node, indexPath: number[])}
	<TreeView.NodeProvider value={{ node, indexPath }}>
		{#if node.children || node.childrenCount}
			<TreeView.Branch>
				<TreeView.BranchControl>
					<TreeView.BranchIndicator class="data-loading:hidden" />
					<TreeView.BranchIndicator class="hidden animate-spin data-loading:inline">
						<LoaderIcon class="size-4" />
					</TreeView.BranchIndicator>
					<TreeView.BranchText>
						<FolderIcon class="size-4" />
						{node.name}
					</TreeView.BranchText>
				</TreeView.BranchControl>
				<TreeView.BranchContent>
					<TreeView.BranchIndentGuide />
					{#each node.children ?? [] as childNode, childIndex (childNode)}
						{@render treeNode(childNode, [...indexPath, childIndex])}
					{/each}
				</TreeView.BranchContent>
			</TreeView.Branch>
		{:else}
			<TreeView.Item>
				<FileIcon class="size-4" />
				{node.name}
			</TreeView.Item>
		{/if}
	</TreeView.NodeProvider>
{/snippet}
```

## API Reference

### TreeViewRootProps

| Property                | Default  | Type                                                                                                    | Description                                                                                                                                 |
| ----------------------- | -------- | ------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| collection?             | -        | TreeCollection\<any> \| undefined                                                                       | The tree collection data                                                                                                                    |
| ids?                    | -        | Partial\<\{ root: string; tree: string; label: string; node: (value: string) => string; }> \| undefined | The ids of the tree elements. Useful for composition.                                                                                       |
| expandedValue?          | -        | string\[] \| undefined                                                                                  | The controlled expanded node ids                                                                                                            |
| defaultExpandedValue?   | -        | string\[] \| undefined                                                                                  | The initial expanded node ids when rendered.&#xA;Use when you don't need to control the expanded node value.                                |
| selectedValue?          | -        | string\[] \| undefined                                                                                  | The controlled selected node value                                                                                                          |
| defaultSelectedValue?   | -        | string\[] \| undefined                                                                                  | The initial selected node value when rendered.&#xA;Use when you don't need to control the selected node value.                              |
| defaultCheckedValue?    | -        | string\[] \| undefined                                                                                  | The initial checked node value when rendered.&#xA;Use when you don't need to control the checked node value.                                |
| checkedValue?           | -        | string\[] \| undefined                                                                                  | The controlled checked node value                                                                                                           |
| defaultFocusedValue?    | -        | string \| null \| undefined                                                                             | The initial focused node value when rendered.&#xA;Use when you don't need to control the focused node value.                                |
| focusedValue?           | -        | string \| null \| undefined                                                                             | The value of the focused node                                                                                                               |
| selectionMode?          | "single" | "single" \| "multiple" \| undefined                                                                     | Whether the tree supports multiple selection&#xA;- "single": only one node can be selected&#xA;- "multiple": multiple nodes can be selected |
| onExpandedChange?       | -        | ((details: ExpandedChangeDetails\<any>) => void) \| undefined                                           | Called when the tree is opened or closed                                                                                                    |
| onSelectionChange?      | -        | ((details: SelectionChangeDetails\<any>) => void) \| undefined                                          | Called when the selection changes                                                                                                           |
| onFocusChange?          | -        | ((details: FocusChangeDetails\<any>) => void) \| undefined                                              | Called when the focused node changes                                                                                                        |
| onCheckedChange?        | -        | ((details: CheckedChangeDetails) => void) \| undefined                                                  | Called when the checked value changes                                                                                                       |
| canRename?              | -        | ((node: any, indexPath: IndexPath) => boolean) \| undefined                                             | Function to determine if a node can be renamed                                                                                              |
| onRenameStart?          | -        | ((details: RenameStartDetails\<any>) => void) \| undefined                                              | Called when a node starts being renamed                                                                                                     |
| onBeforeRename?         | -        | ((details: RenameCompleteDetails) => boolean) \| undefined                                              | Called before a rename is completed. Return false to prevent the rename.                                                                    |
| onRenameComplete?       | -        | ((details: RenameCompleteDetails) => void) \| undefined                                                 | Called when a node label rename is completed                                                                                                |
| onLoadChildrenComplete? | -        | ((details: LoadChildrenCompleteDetails\<any>) => void) \| undefined                                     | Called when a node finishes loading children                                                                                                |
| onLoadChildrenError?    | -        | ((details: LoadChildrenErrorDetails\<any>) => void) \| undefined                                        | Called when loading children fails for one or more nodes                                                                                    |
| expandOnClick?          | true     | boolean \| undefined                                                                                    | Whether clicking on a branch should open it or not                                                                                          |
| typeahead?              | true     | boolean \| undefined                                                                                    | Whether the tree supports typeahead search                                                                                                  |
| loadChildren?           | -        | ((details: LoadChildrenDetails\<any>) => Promise\<any\[]>) \| undefined                                 | Function to load children for a node asynchronously.&#xA;When provided, branches will wait for this promise to resolve before expanding.    |
| dir?                    | "ltr"    | "ltr" \| "rtl" \| undefined                                                                             | The document's text/writing direction.                                                                                                      |
| getRootNode?            | -        | (() => ShadowRoot \| Node \| Document) \| undefined                                                     | A root node to correctly resolve document in custom environments. E.x.: Iframes, Electron.                                                  |
| element?                | -        | Snippet\<\[HTMLAttributes\<"div">]> \| undefined                                                        | Render the element yourself                                                                                                                 |

### TreeViewRootProviderProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| value    | -       | () => TreeViewApi\<PropTypes, any>               | -                           |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TreeViewRootContextProps

| Property | Default | Type                                            | Description |
| -------- | ------- | ----------------------------------------------- | ----------- |
| children | -       | Snippet\<\[() => TreeViewApi\<PropTypes, any>]> | -           |

### TreeViewTreeProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TreeViewLabelProps

| Property | Default | Type                                            | Description                 |
| -------- | ------- | ----------------------------------------------- | --------------------------- |
| level?   | -       | 1 \| 2 \| 3 \| 4 \| 5 \| 6 \| undefined         | The level of the heading.   |
| element? | -       | Snippet\<\[HTMLAttributes\<"h3">]> \| undefined | Render the element yourself |

### TreeViewNodeProviderProps

| Property  | Default | Type                       | Description                                                   |
| --------- | ------- | -------------------------- | ------------------------------------------------------------- |
| value     | -       | NodeProps                  | -                                                             |
| children? | -       | Snippet\<\[]> \| undefined | The default slot content to be rendered within the component. |

### TreeViewBranchProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TreeViewBranchControlProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TreeViewBranchTextProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

### TreeViewBranchIndicatorProps

| Property | Default | Type                                              | Description                 |
| -------- | ------- | ------------------------------------------------- | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"span">]> \| undefined | Render the element yourself |

### TreeViewBranchContentProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TreeViewBranchIndentGuideProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

### TreeViewItemProps

| Property | Default | Type                                             | Description                 |
| -------- | ------- | ------------------------------------------------ | --------------------------- |
| element? | -       | Snippet\<\[HTMLAttributes\<"div">]> \| undefined | Render the element yourself |

# Bits UI

Flexible, unstyled, and accessible primitives that provide the foundation for building your own high-quality Svelte component library.

At minimum, we recommend you read the following documentation before you start this integration guide.

- [Getting Started](https://www.bits-ui.com/docs/getting-started)
- [Styling](https://www.bits-ui.com/docs/styling)

## Requirements

\| Tooling | Minimum Supported |
\| ------------------------------------ | ----------------- |
\| [Svelte](https://svelte.dev/) | 5 |
\| [Skeleton](https://skeleton.dev) | 3 |
\| [Tailwind](https://tailwindcss.com/) | 4 |
\| [Bits UI](https://www.bits-ui.com/) | 1 |

## Introduction

In this guide we'll implement the following Bits UI `<Calendar>` component. This will showcase the bare minimum requirements for integrating Skeleton with Bits UI.

## Get Started

## Styling

Each Bits UI component accepts a `class` attribute. Use this to provide Tailwind and Skeleton utility classes.

### Basic Styles

Styling the `<Calendar.Root>` parent component.

```svelte
<Calendar.Root
	class="mt-6 inline-block card border border-surface-200-800 bg-surface-50-950 p-4 shadow-xl"
>
	<!-- ... -->
</Calendar.Root>
```

Styling the `<Calendar.PrevButton>` sub-component. You can clone these to `<Calendar.NextButton>` too.

```svelte
<Calendar.PrevButton
	class="btn-icon preset-filled-primary-500"
	title="Previous month"
	aria-label="Previous month"
>
	<span>&larr;</span>
</Calendar.PrevButton>
```

Styling the `<Calendar.Day>` sub-component.

```svelte
<Calendar.Day
	class="data-selected:bg-foreground group relative inline-flex size-10 items-center justify-center rounded border border-transparent bg-transparent p-0 text-sm font-normal whitespace-nowrap hover:border-surface-200-800 data-disabled:pointer-events-none data-disabled:text-surface-600-400 data-outside-month:pointer-events-none data-selected:preset-filled data-selected:font-medium data-unavailable:text-surface-600-400 data-unavailable:line-through"
>
	<div
		class="bg-foreground group-data-selected:bg-background absolute top-[5px] hidden size-1 rounded-full group-data-today:block"
	></div>
	{date.day}
</Calendar.Day>
```

For the sake of time we won't cover every sub-component.

### Complete Example

Below is a complete example showing the entire component with all styles and basic configuration.

```svelte
<script lang="ts">
	import { getLocalTimeZone, today } from '@internationalized/date';
	import { Calendar } from 'bits-ui';

	const isDateUnavailable: Calendar.RootProps['isDateUnavailable'] = (date) => {
		return date.day === 17 || date.day === 18;
	};

	let value = $state(today(getLocalTimeZone()));
</script>

<Calendar.Root
	class="mt-6 inline-block card border border-surface-200-800 bg-surface-50-950 p-4 shadow-xl"
	{isDateUnavailable}
	weekdayFormat="short"
	fixedWeeks={true}
	type="single"
	bind:value
>
	{#snippet children({ months, weekdays })}
		<Calendar.Header class="flex items-center justify-between">
			<Calendar.PrevButton
				class="btn-icon preset-filled-primary-500"
				title="Previous month"
				aria-label="Previous month"
			>
				<span>&larr;</span>
			</Calendar.PrevButton>
			<Calendar.Heading class="text-lg font-bold" />
			<Calendar.NextButton
				class="btn-icon preset-filled-primary-500"
				title="Next month"
				aria-label="Next month"
			>
				<span>&rarr;</span>
			</Calendar.NextButton>
		</Calendar.Header>
		<div class="flex flex-col space-y-4 pt-4 sm:flex-row sm:space-y-0 sm:space-x-4">
			{#each months as month, i (i)}
				<Calendar.Grid class="w-full border-collapse space-y-1 select-none">
					<Calendar.GridHead>
						<Calendar.GridRow class="mb-1 flex w-full justify-between">
							{#each weekdays as day}
								<Calendar.HeadCell
									class="w-10 rounded-md text-xs font-normal! text-surface-600-400"
								>
									<div>{day.slice(0, 2)}</div>
								</Calendar.HeadCell>
							{/each}
						</Calendar.GridRow>
					</Calendar.GridHead>
					<Calendar.GridBody>
						{#each month.weeks as weekDates}
							<Calendar.GridRow class="flex w-full">
								{#each weekDates as date}
									<Calendar.Cell
										{date}
										month={month.value}
										class="relative size-10 p-0! text-center text-sm"
									>
										<Calendar.Day
											class="data-selected:bg-foreground group relative inline-flex size-10 items-center justify-center rounded border border-transparent bg-transparent p-0 text-sm font-normal whitespace-nowrap hover:border-surface-200-800 data-disabled:pointer-events-none data-disabled:text-surface-600-400 data-outside-month:pointer-events-none data-selected:preset-filled data-selected:font-medium data-unavailable:text-surface-600-400 data-unavailable:line-through"
										>
											<div
												class="bg-foreground absolute top-[5px] hidden size-1 rounded-full group-data-selected:bg-surface-50-950 group-data-today:block"
											></div>
											{date.day}
										</Calendar.Day>
									</Calendar.Cell>
								{/each}
							</Calendar.GridRow>
						{/each}
					</Calendar.GridBody>
				</Calendar.Grid>
			{/each}
		</div>
	{/snippet}
</Calendar.Root>
```

## Going Further

If you wish to match Skeleton component conventions, view our [contributor component guidelines](/docs/resources/contribute/components).

## Attribution

Bits UI is created and maintained by [Huntabyte](https://github.com/huntabyte). Consider [sponsoring him](https://github.com/sponsors/huntabyte) to support this open source project.

# Melt UI

An open-source Svelte library for building high-quality, accessible design systems and web apps.

At minimum, we recommend you read the following documentation before you start this integration guide.

- [Styling](https://next.melt-ui.com/guides/styling)
- [How to Use](https://next.melt-ui.com/guides/how-to-use)

## Requirements

\| Tooling | Minimum Supported |
\| ------------------------------------ | ------------------ |
\| [Svelte](https://svelte.dev/) | 5 |
\| [Skeleton](https://skeleton.dev) | 3 |
\| [Tailwind](https://tailwindcss.com/) | 4 |
\| [Melt UI](https://next.melt-ui.com/) | (Svelte 5 version) |

## Introduction

In this guide we'll implement the following Melt UI `<Accordion>` component. This will showcase the bare minimum requirements for integrating Skeleton with Melt UI.

## Get Started

## Styling

Melt UI builders are made up of native HTML elements, meaning you can implement classes directly. Use this to provide Tailwind and Skeleton utility classes.

### Basic Styles

Styling the root element.

```svelte
<div {...accordion.root} class="overflow-hidden card">
	<!-- ... -->
</div>
```

Styling the trigger button element.

```svelte
<button
	{...item.trigger}
	class="w-full cursor-pointer preset-filled-surface-200-800 p-4 text-left hover:preset-filled-primary-500"
>
	<!-- ... -->
</button>
```

Styling content element, including animations based on the `data-state` value.

```svelte
<div
	{...item.content}
	class="cursor-pointer preset-filled-surface-100-900 p-4 transition-all duration-200 data-[state=closed]:h-0 data-[state=closed]:py-0"
>
	<!-- ... -->
</div>
```

Before the close of the `#each` block, insert the follow to insert a `<hr />` divider.

```svelte
{#if index < items.length - 1}<hr class="hr border-surface-50-950" />{/if}
```

### Complete Example

Below is a complete example showing the entire component with styles, transitions, and some basic configuration.

```svelte
<script lang="ts">
	import { Accordion, type AccordionItem } from 'melt/builders';
	import { slide } from 'svelte/transition';

	type Item = AccordionItem<{
		title: string;
		description: string;
	}>;

	const items: Item[] = [
		{
			id: 'item-1',
			title: 'Bulbasaur',
			description:
				'For some time after its birth, it uses the nutrients that are packed into the seed on its back in order to grow.'
		},
		{
			id: 'item-2',
			title: 'Charmander',
			description:
				'The flame on its tail shows the strength of its life-force. If Charmander is weak, the flame also burns weakly.'
		},
		{
			id: 'item-3',
			title: 'Squirtle',
			description:
				'After birth, its back swells and hardens into a shell. It sprays a potent foam from its mouth.'
		}
	];

	const accordion = new Accordion({ multiple: true });
</script>

<div {...accordion.root} class="w-full max-w-xl overflow-hidden card">
	{#each items as i, index}
		{@const item = accordion.getItem(i)}
		<h2 {...item.heading}>
			<button
				{...item.trigger}
				class="w-full cursor-pointer preset-filled-surface-200-800 p-4 text-left hover:preset-filled-primary-500"
			>
				{item.item.title}
			</button>
		</h2>
		{#if item.isExpanded}
			<div
				{...item.content}
				class="cursor-pointer preset-filled-surface-100-900 p-4"
				transition:slide={{ duration: 100 }}
			>
				{item.item.description}
			</div>
		{/if}
		{#if index < items.length - 1}<hr class="hr border-surface-50-950" />{/if}
	{/each}
</div>
```

## Going Further

If you wish to match Skeleton component conventions, view our [contributor component guidelines](/docs/resources/contribute/components).

## Attribution

Melt UI is created and maintained by [TGlide](https://github.com/TGlide). Consider [sponsoring him](https://github.com/sponsors/TGlide) to support this open source project.

# Radix UI

Unstyled, accessible, open source React primitives for high-quality web apps and design systems.

At minimum, we recommend you read the following documentation before you start this integration guide.

- [Introduction](https://www.radix-ui.com/primitives/docs/overview/introduction)
- [Getting Started](https://www.radix-ui.com/primitives/docs/overview/getting-started)
- [Styling](https://www.radix-ui.com/primitives/docs/guides/styling)

## Requirements

\| Tooling | Minimum Supported |
\| ------------------------------------- | ----------------- |
\| [React](https://react.dev/) | 18 |
\| [Skeleton](https://skeleton.dev) | 3 |
\| [Radix UI](https://www.radix-ui.com/) | 1 |
\| [Tailwind](https://tailwindcss.com/) | 4 |

## Introduction

In this guide we'll implement the following Radix UI `<ToggleGroup>` component. This will showcase the bare minimum requirements for integrating Skeleton with Radix UI.

## Get Started

## Styling

Each Radix UI component accepts a `className` prop. Use this to provide Tailwind and Skeleton utility classes.

### Basic Styles

Styling the `<RadixToggleGroup.Root>` component.

```tsx
<RadixToggleGroup.Root
	className="btn-group preset-outlined-surface-200-800 flex-col p-2 md:flex-row"
	type="single"
	defaultValue="center"
	aria-label="Text alignment"
>
	{/* ... */}
</RadixToggleGroup.Root>
```

Styling each item component. Apply these styles to each button.

```tsx
<RadixToggleGroup.Item
	className="btn hover:preset-tonal data-[state=on]:preset-filled"
	value="..."
	aria-label="..."
>
	{/* ... */}
</RadixToggleGroup.Item>
```

### Complete Example

Below is a complete example showing the entire component with all styles and basic configuration.

```tsx
import * as RadixToggleGroup from '@radix-ui/react-toggle-group';
import { useState, type FC } from 'react';

interface ToggleGroupProps {
	/* ... */
}

export const ToggleGroup: FC<ToggleGroupProps> = () => {
	const [value, setValue] = useState('left');

	return (
		<RadixToggleGroup.Root
			className="btn-group preset-outlined-surface-200-800 flex-col p-2 md:flex-row"
			type="single"
			value={value}
			onValueChange={(value) => {
				if (value) setValue(value);
			}}
			aria-label="Text alignment"
		>
			<RadixToggleGroup.Item
				className="btn hover:preset-tonal data-[state=on]:preset-filled"
				value="left"
				aria-label="Left aligned"
			>
				Left
			</RadixToggleGroup.Item>
			<RadixToggleGroup.Item
				className="btn hover:preset-tonal data-[state=on]:preset-filled"
				value="center"
				aria-label="Center aligned"
			>
				Center
			</RadixToggleGroup.Item>
			<RadixToggleGroup.Item
				className="btn hover:preset-tonal data-[state=on]:preset-filled"
				value="right"
				aria-label="Right aligned"
			>
				Right
			</RadixToggleGroup.Item>
		</RadixToggleGroup.Root>
	);
};
```

## Going Further

If you wish to match Skeleton component conventions, view our [contributor component guidelines](/docs/resources/contribute/components).

## Attribution

Radix UI is created and maintained by [WorkOS](https://workos.com/).

# Code Block

Learn how to integrate Shiki, a beautiful yet powerful syntax highlighter.

## Installation

[Install Shiki](https://shiki.style/guide/install) with your preferred package manager.

```console
npm install -D shiki
```

## Create a Component

A reusable component should suffice in most projects. Tap the `code` tab below to access the source, then follow the steps below.

1. Implement a new `<CodeBlock>` component in `/src/lib/components/code-block.svelte`.
2. Implement several variations of our `<CodeBlock>` component in any SvelteKit route `+page.svelte`.

A few things of note about this component:

- You will need to import and configure any number of [Shiki themes](https://shiki.style/themes).
- You will need to import and configure any number of [supported languages](https://shiki.style/languages).
- The component has been implemented using Skeleton's [component style guidelines](http://localhost:4321/docs/resources/contribute/components).
- This provides a number of style props for easy customization via Skeleton's standard conventions.
- The component exposes `code`, `lang`, and `theme` properties to configure on-the-fly.
- The Code Block `<pre>` tag is auto-generated by Shiki; target utility classes with: `[&>pre]:myClassHere`.

## Programmatic Usage

In some cases you may not have direct access to the source code, such as content from a blog posts or CMS pages. In fact the code may even come pre-baked with surrounding `<pre>` or `<code>` elements. For this, you'll need to follow the general steps below. Specific implementation may differ based on your app and meta-framework.

1. Query all `<pre>` or `<code>` blocks using Javascript tools like `document.querySelectorAll()`. Be as specific as possible.
2. Ensure you have a clean instance of the source code itself, with no extra markup injected within.
3. Use Shiki's [codeToHtml](https://shiki.style/guide/install#shorthands) feature to parse the code as styled HTML markup.
4. Then append each instance of the code blocks in your DOM.

For more instructions, please refer to this guide by [Joy of Code](https://joyofcode.xyz/) explaining how to [implement Shiki via MDX](https://joyofcode.xyz/sveltekit-markdown-blog#using-components-inside-markdown).

## Custom Themes

Shiki provides support for generating a custom highlighter theme:

- [Loading Custom Themes](https://shiki.style/guide/load-theme)
- [List of Bundled Themes](https://shiki.style/themes)

Shiki theme values can be defined using Skeleton custom theme properties, such as `rgba(--color-primary-500)`.

## Accessibility

See [Salma Alam-Naylor's](https://whitep4nth3r.com/about/) guidelines for [creating accessible code blocks](https://whitep4nth3r.com/blog/how-to-make-your-code-blocks-accessible-on-your-website/) that meet WGAC standards.

# Iconography

Learn how to integrate Lucide for iconography in Skeleton.

## Lucide

If you're looking for an opinionated solution, Skeleton recommends [Lucide](https://lucide.dev/). This provides a huge selection of icons that are available to all popular frameworks and feature a clean and modern style. All code examples in this documentation site implement Lucide, but feel free to replace with any alternative.

### Installation

Follow the official instructions to install [Lucide for Svelte](https://lucide.dev/guide/packages/lucide-svelte).

## Usage

For optimal performance we recommend importing each icon using the full path.

```svelte
<script>
	import IconSkull from '@lucide/svelte/icons/skull';
</script>

<IconSkull color="#ff3e98" />
```

## Alternatives

- [Iconify](https://iconify.design/) - provides a vast array of icon sets supported by popular icon libraries.
- [Font Awesome](https://fontawesome.com/) - provides a huge variety of icons in their free tier.
- [SimpleIcons](https://simpleicons.org/) - provides an excellent selection of brand icons.

# Contribute

Learn how to contribute to Skeleton.

# LLMs

Documentation for LLMs. Beep Boop.

The Skeleton `LLMs.txt` files provide concise, up-to-date documentation optimized for large language models. The have been implemented to follow the **LLM.txt Standard**.

## Paths

\| Path | Description |
\| ------------------------------------ | --------------------------- |
\| [/llms.txt](/llms.txt) | List of LLMs txt directory. |
\| [/llms-react.txt](/llms-react.txt) | React guidelines. |
\| [/llms-svelte.txt](/llms-svelte.txt) | Svelte guidelines. |

# Get Started

Read this before you submit your first contribution.

## How to Contribute

Take care to read all contributions guidelines before you begin!

1. Learn how to [contribute to open source](https://opensource.guide/how-to-contribute/).
2. Follow a [step-by-step guide](https://github.com/firstcontributions/first-contributions) to practice your first contribution.
3. Locate an [open issue on GitHub](https://github.com/skeletonlabs/skeleton/issues). Post a comment letting us know you wish to volunteer.
4. Optionally, you may coordinate efforts on the `#contributors` channel within [Discord](https://discord.gg/EXqV7W8MtY).
5. A member of the Skeleton team will assign the issue to you and help outline requirements.
6. Complete the work and submit a pull request per the requirements on this page.

> NOTE: non-trivial PRs submitted without our prior consent will be denied. Repeat offenders will be blocked.

## Using PNPM

Skeleton makes use of [PNPM](https://pnpm.io/) and [PNPM workspaces](https://pnpm.io/workspaces) to maintain all projects within the Skeleton monorepo.

1. [Install PNPM](https://pnpm.io/installation) on your local computer.
2. [Fork the Skeleton monorepo](https://github.com/skeletonlabs/skeleton) via the option on GitHub.
3. Use Git to clone the forked project to your local machine.
4. Run `pnpm i` from the root to install the required dependencies.
5. Point your terminal at one of the `/sites`, `/packages` or `/playgrounds` projects detailed below.
6. Run `pnpm dev` to start a local dev server for each project.

> NOTE: Make sure you're running PNPM version `9.5.0` or higher to ensure support for [PNPM catalogs](https://pnpm.io/catalogs). You can check your version with `pnpm --version`.

### Adding Dependencies

As a courtesy, please consult with Skeleton maintainers before adding dependencies. Third-party dependencies come with some level of risk, and we may be able to offer alternatives that limit the scope of changes.

Dependencies may be installed using the standard `pnpm i` command. However, in some cases it may be beneficial to maintain a uniform version shared across multiple projects or within each `package.json`. For this we can make use of [PNPM Catalogs](https://pnpm.io/catalogs).

The main version is maintained in the monorepo root in `pnpm-workspace.yaml`:

```yaml
catalog:
	# ...
	<package>: <version>
```

Use the following convention to link each project's dependency to the shared Catalog version:

```shell
pnpm add <package>@catalog:
```

## Monorepo Structure

### Sites

Public facing websites that are deployed and hosted for users to browse.

\| Path | Description |
\| ---------------------------- | ------------------------------------- |
\| `/sites/skeleton.dev` | The production documentation website. |
\| `/sites/themes.skeleton.dev` | The Skeleton themes generator website |

### Packages

Modular Skeleton packages distributed via NPM.

\| Path | Description |
\| --------------------------- | -------------------------------------------------------------------------- |
\| `/packages/skeleton` | The Skeleton core package, contains Skeleton's Tailwind-specific features. |
\| `/packages/skeleton-react` | The Skeleton React package, contains Skeleton React components. |
\| `/packages/skeleton-svelte` | The Skeleton Svelte package, contains Skeleton Svelte components. |
\| `/packages/skeleton-common` | The Skeleton common package, contains shared internal only utilities. |
\| `/packages/cli` | The Skeleton CLI, contains Skeleton's migrations. |

## Playgrounds

Isolated sandbox environments for developing, testing and experimenting.

\| Path | Description |
\| ------------------------------ | ----------------------------------------------------- |
\| `/playgrounds/skeleton-svelte` | A SvelteKit playground for testing the Svelte package |
\| `/playgrounds/skeleton-react` | A NextJS playground for testing the React package |

## Branch

Create and target all pull requests against the `main` branch unless otherwise instructed.

\| Branch | Description | Pull Requests |
\| ------ | -------------------------------------------------- | -------------------------------------------------- |
\| `main` | Represents the release branch of the all projects. | <CheckIcon size={16} className="inline" /> Allowed |

### PR Branch Conventions

Please use the following naming convention when creating your pull request.

\| Branch | Role |
\| ----------- | ------------------------------------- |
\| `docs/*` | When updating the documentation site. |
\| `feature/*` | When implementing a new feature. |
\| `task/*` | When implementing a small task. |
\| `bugfix/*` | When implementing a fix for a bug. |

Keep branch names short and semantic, and use snake-case to separate words.

```
docs/get-started-typo-fix
bugfix/accordion-render-issue
```

## Documentation Schema

Before your first run of the `/sites/skeleton.dev` documentation project, make sure to run `pnpm generate:types` at least one time. This will generate the assets required to populate API Reference tables on each component's documentation page.

## Changesets

[Changesets](https://github.com/changesets/changesets) are used to automatically generate the changelog for each release.

- Any contributions made within `/packages` _must_ contain a Changeset
- Any contributions made within `/sites` should <u>not</u> include a Changeset.

Follow these instructions to generate a changeset:

1. Make sure you're within your local pull request feature branch.
2. Navigate to the root of the Skeleton monorepo.
3. Run `pnpm changeset` to trigger the Changeset CLI.
4. Follow the instructions when prompted.
5. Changeset are added as `.md` files within the `.changeset/` directory.
6. You may edit or revise a Changeset before your PR is merged.

Changesets use semantic versioning. We recommend the following convention.

\| Version | Role |
\| ------- | ------------------------------------------- |
\| `major` | Do not use. Reserved for maintainers only. |
\| `minor` | For notable changes, such as a new feature. |
\| `patch` | For small changes, such as a fixing a bug. |

Changeset descriptions will appear verbatim on the [Changelog](https://github.com/skeletonlabs/skeleton/blob/dev/packages/skeleton/CHANGELOG.md). Keep it short, semantic, and and include the same [branch prefix](/docs/resources/contribute/get-started#pr-branch-conventions).

```mdx
---
'@skeletonlabs/skeleton-svelte': minor
---

feature: Added a new Avatar component.
```

## Tooling

Skeleton makes use of the following technology to improve the developer experience. It's recommended you run these tools before flagging the PR as "ready for review" on GitHub.

### Root Commands

Run the following commands in the monorepo root. Each will run recursively for supported packages.

- `pnpm format` - Formats the monorepo using [Prettier](https://prettier.io/).
- `pnpm lint` - Finds (and attempts to fix) any issues within the monorepo using [ESLint](https://eslint.org/).
- `pnpm test` - Runs all unit tests using [Vitest](https://vitest.dev/).
- `pnpm check` - Runs framework specific diagnostics, such as [Svelte Check](https://svelte.dev/docs/cli/sv-check), [Astro Check](https://docs.astro.build/en/reference/cli-reference/#astro-check), etc.

### Local Commands

Additionally, you may also run the local instance of each command. Consult the local `package.json` for available options. For `format` and `lint` commands, use the following syntax to draw from the root `package.json`:

```shell
pnpm -w <command>
```

### VS Code Extensions

We recommend the use of [VSCode](https://code.visualstudio.com/) for contributions, and the following VSCode extensions.

- [Tailwind](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Astro](https://marketplace.visualstudio.com/items?itemName=astro-build.astro-vscode)
- [MDX](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx)
- [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)

# Components

Guidelines for contributing new Skeleton components.

### Dev Server

To run all packages/playgrounds/sites in watch mode, use the following command in the monorepo root:

```shell
pnpm dev
```

We've also provide a number of sub-commands for a more limited set of packages:

```shell
pnpm dev:{command}
```

- `dev:docs` - runs all dependencies for the Documentation website.
- `dev:themes` - runs all dependencies for the Theme Generator website.
- `dev:svelte` - runs all dependencies for the Svelte Playground.
- `dev:react` - runs all dependencies for the React Playground.

### Server Ports

The following represents the _default_ localhost address and port for each project. This will be displayed in the terminal when starting each dev server.

- Documentation Site: `http://localhost:4321/`
- Svelte Playground: `http://localhost:5173/`
- React Playground: `http://localhost:3000/`

You may run the sites and playgrounds in parallel at the same time. If a server shares a port, this will increment by one for the next server (ex: `5174`, `5175`, etc). Keep your eye on the terminal to retrieve the specific local address for each.

### Zag.js

Skeleton components are built using a foundation of [Zag.js](https://zagjs.com/). This provides a suite of headless component primitives that handle logic and state, while providing a universal set of features per all supported frameworks. The Skeleton design system is then implemented as a layer on top of this.

When introducing a new Skeleton component, please refer to the documentation for each respective framework. For example:

- Avatar (React): https\://zagjs.com/components/react/avatar
- Avatar (Svelte): https\://zagjs.com/components/svelte/avatar

Continue reading below to learn how implement the Zag primitives as components using Skeleton-specific conventions.

---

## Adding Components

### Anatomy

When creating a component, start by breaking it down into its core parts. If the component utilizes a [Zag primitive](https://zagjs.com/components/svelte/avatar), you may copy the source [directly from Zag's Usage section](https://zagjs.com/components/svelte/avatar#usage). For custom in-house components, you may use Skeleton's common terminology and discuss the potential anatomy with Skeleton maintainers.

For example, the Zag Avatar component utilizes the following DOM structure:

```html
<div>
	<img />
	<span>...</span>
</div>
```

As such, we'll implement one component part respective of each element:

- `<Avatar>` - the root element
- `<Avatar.Image>` - the child image
- `<Avatar.Fallback>` - the fallback span

We'll also include two special Skeleton-specific components:

- `<Avatar.Provider>` - Similar to `<Avatar>` but allows the user to pass in the api.
- `<Avatar.Context>` - Provides access to the component tree's Context API.

### Directory and File Names

Components are housed in the following location per framework:

\| Framework | Directory |
\| --------- | ------------------------------------------- |
\| React | `/packages/skeletlon-react/src/components` |
\| Svelte | `/packages/skeletlon-svelte/src/components` |

Skeleton uses a consistent naming convention per component:

```
avatar/
├── anatomy/
│   ├── fallback.{tsx|svelte}
│   ├── image.{tsx|svelte}
│   ├── root-context.{tsx|svelte}
│   ├── root-provider.{tsx|svelte}
│   └── root.{tsx|svelte}
├── modules/
│   ├── anatomy.ts
│   ├── provider(.svelte).ts
│   └── root-context.ts
└── index.ts
```

### Anatomy Folder

The anatomy folder contains each component part inside a seperate file.

### Component Part File

Every component part should export their component as a default export and their prop types as named exports.

**React**

```tsx title="avatar-root.tsx"
export interface AvatarRootProps {
	// ...
}

export default function Root(props: AvatarRootProps) {
	// ...
}
```

**Svelte**

```svelte title="avatar-root.svelte"
<script lang="ts" module>
	export interface AvatarRootProps {
		// ...
	}
</script>

<script lang="ts">
	const props: AvatarRootProps = $props();

	// ...
</script>

<!-- ... --->
```

Note that you may need to extend or omit portions of the type to avoid conflicts between Zag and HTML attributes.

#### Extend

- `PropsWithElement<Tag>` - via Skeleton's `@/internal/props-with-element`; allows for HTML template overrides.
- `HTMLAttributes<Tag, Omit>` - via Skeleton's `@/internal/html-attributes`; allows for standard HTML attributes.

#### Omit

- `Omit<Props, 'id'>` - omit the `id` field from the `Props` interface as they will be provided inside the component itself.

### Modules Folder

#### Anatomy File

The `anatomy.ts` file contains the exported anatomy, which enables the friendly dot notation syntax when consumed.

```ts title="avatar-anatomy.ts"
import Fallback from '../anatomy/fallback';
import Image from '../anatomy/image';
import Root from '../anatomy/root';

export const Avatar = Object.assign(
	Root, // <Avatar>
	{
		Image: Image, // <Avatar.Image>
		Fallback: Fallback // <Avatar.Fallback>
	}
);
```

#### Context Files

The `{part}-context.ts` file contains the exported context for each component part's [context](/docs/resources/contribute/components#context-api). This pattern enables strong typing of the context itself.

For most components this will only be necessary for the root component, some components however may require context for their children well. Reference existing components for real world examples.

```ts title="avatar-root-context.ts"
import type { useAvatar } from './use-avatar';
import { createContext } from '@/internal/create-context';

export const AvatarRootContext = createContext<ReturnType<typeof useAvatar>>();
```

#### Index File

The index prepares all required component files for export.

```ts
export { Avatar } from './modules/anatomy';
export { useAvatar } from './modules/provider';
export type { AvatarRootProps } from './anatomy/root';
export type { AvatarRootProviderProps } from './anatomy/root-provider';
export type { AvatarRootContextProps } from './anatomy/root-context';
export type { AvatarImageProps } from './anatomy/image';
export type { AvatarFallbackProps } from './anatomy/fallback';
```

### Component Exports

Finally, make sure to export the new component for each respective component's framework package. This is handled in `/packages/skeleton-{framework}/src/index.ts`.

```ts
export * from './components/accordion/index';
export * from './components/avatar/index';
// ...
```

---

## Using Zag Primitives

### Source Code

Locate the respective framework component source code on the Zag website. For example:

\| Framework | Directory |
\| --------- | --------------------------------------------------------------- |
\| React | [Avatar Docs](https://zagjs.com/components/react/avatar#usage) |
\| Svelte | [Avatar Docs](https://zagjs.com/components/svelte/avatar#usage) |

In most cases, Zag provides all source code in a single file. Take care when splitting this into multiple component parts. We recommend starting with the root component - including the primitive imports, and defining the `machine` and `api`. Then utilize Context API and child components for each additional sub-component.

### Context API

In some cases you may need to pass data from parent down to child components. For this, we can utilize each framework's Context API:

\| Framework | Documentation |
\| --------- | ----------------------------------------------------------------------------------------------------------- |
\| React | [View Component API docs](https://react.dev/learn/passing-data-deeply-with-context) |
\| Svelte | [View Component API docs](https://svelte.dev/docs/kit/state-management#Using-state-and-stores-with-context) |

Note that Skeleton implements a [set convention for Context API](/docs/resources/contribute/components#context-files) to enable strong typing.

### Common Conventions

While each component will present a unique set of challenges, we recommend you reference other existing components to see how we've handled specific situations. But there are a few common conventions we'll detail below.

- Try to stick as close to the Zag implementation DOM structure and naming as possible; don't get creative.
- Use whitespace to seperate Zag versus Skeleton logic, including: props, attributes, and context definitions.
- Avoid hardcoded english text or icons. Consider pass-throughs using props, snippets, or sub-components.
- Default to the named import pattern, such as `import { foo, bar, fizz } from 'whatever';` (Including Zag's imports)

#### React Specific

- Pass the `id` field into the `useMachine` hook using the `useId()` hook from `react`.
- Consume context using `use(Context)` from `react`.
- Use the `className` attribute to pass Skeleton classes.

#### Svelte Specific

- Pass the `id` field into the `useMachine` function using the `props.id()` rune from `svelte`.
- Consume context using the `Context.consume()`.
- Use the `class` attribute to pass Skeleton classes.

> NOTE: We welcome contributions to expand this section!

---

## Styling Components

Component classes are now common and shared between all framework iterations. These reside in `/packages/skeleton-common` and are named to match their respective component.

```
packages/
└── skeleton-common/
	└── src/
		├── classes/
		|	├── accordion.ts
		|	├── avatar.ts
		|	└── ...
		└── index.ts
```

Here's an example of the Avatar styles found in `avatar.ts`:

```ts title="avatar.ts"
import { defineSkeletonClasses } from '../internal/define-skeleton-classes' with { type: 'macro' };

export const classesAvatar = defineSkeletonClasses({
	root: 'isolate bg-surface-400-600 size-16 rounded-full overflow-hidden',
	image: 'w-full object-cover',
	fallback: 'size-full flex justify-center items-center'
});
```

- We'll cover the import `{ type: 'macro' }` in the [style prefix](#style-prefix) section.
- Use the naming convention of `classes{Component}`
- Create a key for each component part.
- The values provide the default utility classes to the component's class list.
- You can optionally pass an array of strings `['', '']` to document multi-line.
- Make sure to export the component class file in `/packages/skeletlon-common/index.ts`.

### Array Notation

You can optionally provide an array of strings whenever the class list is long or can be split into logical sections. This improves readability. The `defineSkeletonClasses` function will flatten the array into a single string at build time.

```ts title="avatar.ts"
import { defineSkeletonClasses } from '../internal/define-skeleton-classes' with { type: 'macro' };

export const classesProgress = defineSkeletonClasses({
	root: [
		// Common
		'items-center justify-center gap-2',
		// Horizontal Orientation
		'data-[orientation=horizontal]:flex data-[orientation=horizontal]:flex-row data-[orientation=horizontal]:w-full',
		// Vertical Orientation
		'data-[orientation=vertical]:inline-flex data-[orientation=vertical]:flex-col'
	]
	// ...
});
```

### Style Prefix

It's worth noting that during build time, Skeleton will automatically prefix each class in the class list with `skb:` (short for "Skeleton Base"). By applying `with { type: 'macro' }` to the import, the import will run `defineSkeletonClasses` specifically at build time. This variant prefix will assign each class to the Tailwind `@base` layer, ensuring user-provided classes take precedence over our internally defined classes. This is accomplished using the following Tailwind custom variant.

```css title="/packages/skeleton/src/variants/base.css"
@custom-variant skb {
	@layer base {
		@slot;
	}
}
```

If you need to prevent a class from being prefixed at build time, apply a variant of `not-skb:` to that class.

> NOTE: This should be a rare use-case requiring discussion with the Skeleton team prior to implementation as it means the user won't be able to override that specific class without using the anti-pattern: `!` for `!important`.

### Importing Class Lists

For Zag primitives, you can import and implement each class list Using Zag's `mergeProps` utility for attributes.

```tsx title="root.tsx"
import type { HTMLAttributes } from '@/internal/html-attributes';
import type { PropsWithElement } from '@/internal/props-with-element';
import { classesAvatar } from '@skeletonlabs/skeleton-common';
import type { Props } from '@zag-js/avatar';
import { mergeProps } from '@zag-js/react';

export interface AvatarRootProps
	extends Omit<Props, 'id'>,
		PropsWithElement<'div'>,
		HTMLAttributes<'div', 'id'> {
	// ...
}

export default function (props: AvatarRootProps) {
	const { children, ...rest } = props;

	const attributes = mergeProps(
		api.getRootProps(),
		{
			className: classesAvatar.root
		},
		rest
	);

	return <div {...attributes}>{children}</div>;
}
```

The process is similar for custom components without Zag primitives. We still use the Zag `mergeProps` utility, just without the `api.getPartProps()`.

```tsx title="root.tsx"
import { classesNavigation } from '@skeletonlabs/skeleton-common';
import { mergeProps } from '@zag-js/react';

export default function (props: NavigationRootProps) {
	const { children, ...rest } = props;

	const attributes = mergeProps(
		{
			className: classesNavigation.root
		},
		rest
	);

	return <div {...attributes}>{children}</div>;
}
```

## Testing Components

We recommend you reference existing components to see how we've handled testing. Each framework has slightly different testing conventions, but all utilize [Vitest](https://vitest.dev/) with [Testing Library](https://testing-library.com/).

Test files are located in `packages/skeleton-{framework}/test/components/{component}` and each contain two files:

- `index.test.{tsx|tsx}` - contains the actual test cases.
- `test.{tsx/svelte}` - contains a wrapper component used to provide `data-testid` attributes to each respective component part.

## Additional Resources

- [Component Party](https://component-party.dev/) - easily compare features between each framework
- [React Documentation](https://react.dev/) - the React documentation website.
- [Svelte Documentation](https://svelte.dev/) - the Svelte documentation website.

# Documentation

Guidelines for contributing to the Skeleton documentation website.

## Astro

The Skeleton documentation website is maintained using the Astro framework.

### Integrations

Review the full list of integrations in `astro.config.js`.

- [Partytown](https://docs.astro.build/en/guides/integrations-guide/partytown/)
- [Svelte](https://docs.astro.build/en/guides/integrations-guide/svelte/)
- [React](https://docs.astro.build/en/guides/integrations-guide/react/)
- [Expressive Code](https://expressive-code.com/)
- [Icon](https://www.astroicon.dev/)
- [AutoImport](https://github.com/delucis/astro-auto-import)
- [MDX (Markdown + JSX)](https://docs.astro.build/en/guides/markdown-content/)

## App Structure

Navigate the app structure within the `/src` directory. This includes the following directories:

\| Path | Description |
\| ------------- | ----------------------------------------------------------------------------------------------------------------------------- |
\| `/components` | Contains our components. |
\| `/content` | Contains our MDX content managed with [Astro's content collections](https://docs.astro.build/en/guides/content-collections/). |
\| `/images` | Contains our images. |
\| `/lib` | Contains our modules. |
\| `/pages` | Contains our pages. |

## Pages

### Standard Pages

1. Browse to `/content/docs/` and create a new `.mdx` file
2. Populate all required Frontmatter metadata within the frontmatter `---` fences, see the content configuration in `/src/content.config.ts` for which properties need to be set.
3. New pages will be automatically added to the sidebar navigation.

### Component Pages

Component page content is split into three files within `/content/docs/components/<component>/`.

- `meta.mdx` - common frontmatter metadata for the page header (ex: title, description, etc).
- `react.mdx` - examples and usage information specific to the React page.
- `svelte.mdx` - examples and usage information specific to the Svelte page.

### Hidden Pages

If you wish to prevent a page from showing in the navigation, prefix it with an understore: `_example.mdx`.

## Using MDX

View the [Astro MDX Documentation](https://docs.astro.build/en/guides/markdown-content/) or refer to `/src/content/docs/resources/_markdown.md` for a "kitchen sink" example page.

## Doc-Only Components

Functional components for the Astro project are housed in `/src/components`. These support Astro/React.

- Astro - used for simple presentational components without logic.
- React - functional components that implement state, logic, or interaction.

> TIP: For React components, make sure to use [Astro's hydration directives](https://docs.astro.build/en/guides/framework-components/#hydrating-interactive-components).

## Global Components

A suite of global components are automatically imported within MDX pages via [astro-auto-importer](https://github.com/delucis/astro-auto-import/tree/main/packages/astro-auto-import).

> TIP: These components are configure via `astro.config.mjs` > `AutoImport()` in the project root.

### Essential Code

Code Blocks are provided via [Expressive Code](https://expressive-code.com/) via either the `<Code>` component or Markdown fences. This is powered by the [Shiki](https://shiki.matsu.io/) syntax highlighter. View the [list of supported languages](https://github.com/shikijs/textmate-grammars-themes/blob/main/packages/tm-grammars/README.md).

```tsx
<Code code={`<div>Skeleton<div>`} lang="html" />
```

### Preview

Allows you to quickly toggle between an example component and its source code.

```ts
import Default from '@/components/examples/foo/default';
import DefaultRaw from '@/components/examples/foo/default?raw';
```

```astro
<Preview client:load>
	<Fragment slot="preview"><Default /></Fragment>
	<Fragment slot="code"><Code code={DefaultRaw} lang="html" /></Fragment>
</Preview>
```

#### Framework Specific Code

To allow for a common preview to have framework specific code, use the `codeReact` and `codeSvelte` slots. For generic code that is not framework specific, such as an Astro component along with JavaScript, use the `code` slot instead.

```astro
<Preview client:load>
	<Fragment slot="preview"><Example /></Fragment>
	<Preview>
		<Fragment slot="preview">
			<Default />
		</Fragment>
		<Fragment slot="code">
			<Code code={DefaultGenericRaw} lang="astro" />
		</Fragment>
		<Fragment slot="codeReact">
			<Code code={DefaultReactRaw} lang="tsx" />
		</Fragment>
		<Fragment slot="codeSvelte">
			<Code code={DefaultSvelteRaw} lang="svelte" />
		</Fragment>
	</Preview>
</Preview>
```

> TIP: For React or Svelte components, make sure to use [Astro's hydration directives](https://docs.astro.build/en/guides/framework-components/#hydrating-interactive-components).

### API Tables

When placed on a component documentation page, these will automatically fetch and display the type schema for the respective component.

```mdx
## API Reference

<ApiTable />
```

## Icons

### Lucide

This documentation app implements the [React version](https://lucide.dev/guide/packages/lucide-react) of [Lucide](https://lucide.dev/) for most icons. View <a href="/docs/integrations/iconography/svelte" class="anchor">Iconography</a> details.

### SVG Components

View the [Astro documentation](https://docs.astro.build/en/guides/images/#svg-components) for more information.
