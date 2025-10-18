<script lang="ts">
	import { enhance } from '$app/forms';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
</script>

<h1>Register</h1>
<div class="grid min-h-svh place-items-center p-4">
	<!-- Container -->
	<div class="w-full max-w-[440px]">
		<!-- Brand/Header -->
		<div class="mb-6 flex items-center gap-3">
			<div class="size-10 rounded-full bg-primary-500" aria-hidden="true" />
			<div>
				<h1 class="h4">Register</h1>
				<p class="text-sm opacity-60">Sign in to continue</p>
			</div>
		</div>

		<!-- Card -->
		<div
			class="card border-[1px] border-surface-200-800 preset-filled-surface-100-900 p-6 shadow-xl"
		>
			<form
				method="POST"
				action="?/register"
				class="space-y-4"
				aria-label="Sign-in form"
				use:enhance
			>
				<!-- Email -->
				<label class="label">
					<span class="label-text">Username</span>
					<input class="input" type="text" name="username" placeholder="username" required />
				</label>

				<!-- Password -->
				<label class="label">
					<span class="label-text">Password</span>
					<input class="input" type="password" name="password" placeholder="••••••••" required />
				</label>

				<!-- Submit (UI only) -->
				<button type="submit" class="btn w-full preset-filled-primary-500"> Register </button>
				<p style="color: red">{form?.message ?? ''}</p>
			</form>
		</div>

		<!-- Meta -->
		<p class="mt-4 text-center text-xs opacity-60">
			By continuing you agree to our Terms & Privacy Policy
		</p>
	</div>
</div>
