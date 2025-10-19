<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	let { form } = $props();
	let loading = $state(false);
</script>

<!-- Login Page (Svelte + Tailwind/Skeleton) -->
<div class="grid min-h-svh place-items-center p-4">
	<!-- Container -->
	<div class="w-full max-w-[440px]">
		<!-- Brand/Header -->
		<div class="mb-6 flex items-center gap-3">
			<div class="size-10 rounded-full bg-primary-500" aria-hidden="true" />
			<div>
				<h1 class="h4">Welcome back</h1>
				<p class="text-sm opacity-60">Sign in to continue</p>
			</div>
		</div>

		<!-- Card -->
		<div
			class="card border-[1px] border-surface-200-800 preset-filled-surface-100-900 p-6 shadow-xl"
		>
			<form
				use:enhance={() => {
					loading = true;
					return async ({ result }) => {
						loading = false;
						await applyAction(result);
					};
				}}
				method="POST"
				action="?/login"
				class="space-y-4"
				aria-label="Sign-in form"
			>
				<!-- Email -->
				<label class="label">
					<span class="label-text">Username</span>
					<input
						class="input bg-surface-50"
						type="text"
						name="username"
						placeholder="username"
						required
					/>
				</label>

				<!-- Password -->
				<label class="label">
					<span class="label-text">Password</span>
					<input
						class="input bg-surface-50"
						type="password"
						name="password"
						placeholder="••••••••"
						required
					/>
				</label>

				<!-- Extras -->
				<div class="flex items-center justify-between">
					<label class="flex items-center gap-2 select-none">
						<input class="checkbox" type="checkbox" />
						<span class="text-sm">Remember me</span>
					</label>
					<a href="#" class="anchor text-sm">Forgot password?</a>
				</div>

				<!-- Submit (UI only) -->
				<button disabled={loading} type="submit" class="btn w-full preset-filled-primary-500"
					>{loading ? 'Wait..' : 'Sign in'}</button
				>
			</form>
			<p style="color: red">{form?.message ?? ''}</p>
		</div>

		<!-- Meta -->
		<p class="mt-4 text-center text-xs opacity-60">
			By continuing you agree to our Terms & Privacy Policy
		</p>
	</div>
</div>
