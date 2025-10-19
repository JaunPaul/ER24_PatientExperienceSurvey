<script lang="ts">
	// UI-only; explanatory landing for authenticated users.
</script>

<!-- Home Page (Svelte + Skeleton/Tailwind) -->
<div class="container mx-auto space-y-6 p-4">
	<!-- Page header -->
	<div class="flex flex-wrap items-end justify-between gap-3 text-surface-950-50">
		<div>
			<h1 class="h3">Dashboard Home</h1>
			<p class="text-sm opacity-60">Read this first: what the data is (and isn't).</p>
		</div>
		<div class="flex gap-2">
			<span class="chip preset-tonal">UI only</span>
			<span class="chip hover:preset-tonal">Webhook-based</span>
		</div>
	</div>

	<!-- Global disclaimer -->
	<div class="space-y-2 card border-[1px] preset-filled p-4">
		<h2 class="h5">Important data limitations</h2>
		<p class="text-sm opacity-80">
			The graphs and KPIs across this dashboard are derived <strong>only</strong> from webhook events
			sent by Omnisol. They cannot provide an accurate picture of daily ER24 operations due to gaps,
			delays, and missing fields in those events. It is strongly recommended to expose read APIs so data
			can be queried directly from source.
		</p>
		<ul class="list-disc space-y-1 pl-5 text-sm opacity-80">
			<li>
				If a patient discharge event is never sent, no record will appear here, creating a
				misalignment with reality.
			</li>
			<li>
				Over 90% of visitation webhooks lack <em>diagnosis</em> and <em>attending doctor</em> fields.
			</li>
			<li>Payment status is always received as <em>Pending</em> and never as <em>Resolved</em>.</li>
			<li>
				Data shown is not pulled from Omnisol on demand; we can only store and surface what Omnisol
				already pushed.
			</li>
		</ul>
	</div>

	<!-- What powers this dashboard -->
	<div class="grid gap-4 lg:grid-cols-2">
		<div class="space-y-2 card preset-tonal p-4">
			<h3 class="h5">Where the data comes from</h3>
			<p class="text-sm opacity-80">
				Reports are built from Omnisol events triggered by either <strong>patient discharge</strong>
				or <strong>finance payment entries</strong>. There is <strong>no live pull</strong> from Omnisol—only
				data that was sent via webhooks is available.
			</p>
		</div>
		<div class="space-y-2 card preset-tonal p-4">
			<h3 class="h5">Core pages</h3>
			<ul class="grid gap-2 text-sm">
				<li class="card preset-tonal-secondary p-3">
					<strong>Patient Experience Surveys</strong> — Surveys are sent on discharge via Email and WhatsApp
					(WhatsApp disabled until ER24 has a Meta Business account). Email volume is low because Omnisol
					contains few patient emails compared to phone numbers.
				</li>
				<li class="card preset-tonal-tertiary p-3">
					<strong>Visitations</strong> — Shows visitation events and Medical Aid payments (see important
					caveats below about zero-dollar placeholders and delays).
				</li>
				<li class="card preset-tonal-primary p-3">
					<strong>Omnisol Events</strong> — A raw feed (most recent 20) of webhook events for visitations
					and payments to help explain mismatches elsewhere.
				</li>
			</ul>
		</div>
	</div>

	<!-- Patient Experience Surveys details -->
	<div class="space-y-3 card preset-filled p-4">
		<div class="items-center justify-between gap-3 md:flex">
			<h3 class="h5">Patient Experience Surveys</h3>
			<div class="flex gap-2">
				<span class="chip preset-tonal-secondary">Email</span>
				<span class="chip preset-tonal-warning">WhatsApp (disabled)</span>
			</div>
		</div>
		<div class="prose text-sm opacity-80">
			<p>
				Between <strong>April 2025</strong> and <strong>October 2025</strong>, patients saw only
				three rating questions: overall experience, medical care, and staff interaction. Additional
				conditional questions appeared only when a rating was below <strong>3/5</strong>.
			</p>
			<p>
				As a result, period averages often include only topline ratings, with little detail by
				department or topic when average scores were high (e.g., 4/5). Starting <strong
					>mid‑October 2025</strong
				>, the survey will always include <strong>20+ questions</strong> to produce richer operational
				insights regardless of the top-level rating.
			</p>
		</div>
	</div>

	<!-- Visitations & Payments caveats -->
	<div class="space-y-3 card preset-tonal p-4">
		<h3 class="h5">Visitations &amp; Payments</h3>
		<div class="prose max-w-none text-sm opacity-80">
			<p>
				Omnisol sends patient data on discharge and Medical Aid payment information later. The
				current webhook pattern is problematic:
			</p>
			<ul class="list-disc space-y-1 pl-5">
				<li>A <strong>$0 Medical Aid payment</strong> is sent at visitation time.</li>
				<li>The <strong>actual captured payment</strong> may arrive days or weeks later.</li>
			</ul>
			<p>
				Because of this delay and placeholder approach, it is <strong>not possible</strong> to compute
				accurate daily totals from webhook data alone. A better approach would be read APIs for on-demand
				reconciliation instead of interpreting push events.
			</p>
		</div>
	</div>

	<!-- Events feed explanation -->
	<div class="space-y-2 card preset-tonal p-4">
		<h3 class="h5">Omnisol Events Feed</h3>
		<p class="text-sm opacity-80">
			The events page lists the most recent <strong>20 webhook events</strong> for visitations and payments.
			Use it to diagnose why figures on other pages appear incomplete or out of sync.
		</p>
	</div>

	<!-- Repeated emphasis / callout -->
	<div class="card border border-primary-300-700 preset-tonal p-4">
		<div class="flex items-start gap-3">
			<div class="mt-1 size-3 rounded-full bg-warning-500" aria-hidden="true"></div>
			<div class="space-y-1 text-sm">
				<p class="font-medium">Data shown ≠ full operational reality.</p>
				<p class="opacity-80">
					Webhook-only data means missing discharges are invisible, many fields are absent
					(diagnosis, doctor), and payment states remain <em>Pending</em>. For an accurate
					operational view, implement read APIs from Omnisol to this dashboard.
				</p>
			</div>
		</div>
	</div>

	<!-- Placeholder for future stats -->
	<div class="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
		<div class="card preset-filled-primary-50-950 p-4">
			<p class="text-sm opacity-60">KPI Placeholder</p>
			<p class="h4">—</p>
		</div>
		<div class="card preset-filled-primary-50-950 p-4">
			<p class="text-sm opacity-60">KPI Placeholder</p>
			<p class="h4">—</p>
		</div>
		<div class="card preset-filled-primary-50-950 p-4">
			<p class="text-sm opacity-60">KPI Placeholder</p>
			<p class="h4">—</p>
		</div>
		<div class="card preset-filled-primary-50-950 p-4">
			<p class="text-sm opacity-60">KPI Placeholder</p>
			<p class="h4">—</p>
		</div>
	</div>
</div>
