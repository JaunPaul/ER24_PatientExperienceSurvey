<!-- SurveyResponsePage.svelte (Svelte 5 + Skeleton UI)
     Drop this into your routes (e.g., src/routes/surveys/[responseId]/+page.svelte)
     or use it as a component. It expects a `payload` prop with the JSON you shared.
-->
<script lang="ts">
	// Types
	type Answer = {
		responseId: number;
		surveyId: number;
		surveyName: string;
		respondentId: string;
		questionId: number;
		questionText: string;
		categoryName: string;
		fieldTypeName: 'Rating' | 'Comment' | 'Radio' | 'Dropdown' | 'Boolean' | string;
		answerText: string | null;
		answerRating: number | null;
		answerBoolean: boolean | null;
		answerRadio: string | null;
		answerDropdown: string | null;
		responseDate: string; // ISO-ish
	};

	type Patient = {
		id: number;
		patientId: string;
		name: string;
		lastname: string;
		email: string;
		gender: string;
		dob: string; // yyyy-mm-dd
		ageGroup: string;
		category: string;
		patientStatus: string;
		phone: string;
	};

	type SurveyMeta = {
		id: number;
		responseId: number;
		dateSent: string; // ts
		methodSent: 'whatsapp' | 'email' | string;
		opened: boolean;
		completed: boolean;
	};

	type Payload = {
		answers: Answer[];
		patientAndSurvey: { patient: Patient; survey: SurveyMeta };
	};

	// PROP: provide your data via `payload`. For quick preview, a default demo is included.
	let { data } = $props();
	let payload = data.vm;
	// ---------- helpers ----------
	const { answers, patientAndSurvey } = payload;
	const patient = patientAndSurvey.patient;
	const meta = patientAndSurvey.survey;

	const ratings = answers.filter((a) => a.fieldTypeName === 'Rating' && a.answerRating != null);
	const comments = answers.filter((a) => a.fieldTypeName === 'Comment' && a.answerText);
	const demographics = answers.filter((a) => a.categoryName === 'DEMOGRAPHICS');

	const averageRating = ratings.length
		? Number((ratings.reduce((s, a) => s + (a.answerRating ?? 0), 0) / ratings.length).toFixed(2))
		: null;

	function formatDate(ts: string) {
		// Safe-ish display only
		const d = new Date(ts.replace(' ', 'T'));
		return isNaN(d.getTime()) ? ts : d.toLocaleString();
	}

	function answerValue(a: Answer): string {
		if (a.fieldTypeName === 'Rating') return `${a.answerRating ?? ''}`;
		if (a.fieldTypeName === 'Comment') return a.answerText ?? '';
		if (a.fieldTypeName === 'Radio') return a.answerRadio ?? '';
		if (a.fieldTypeName === 'Dropdown') return a.answerDropdown ?? '';
		if (a.fieldTypeName === 'Boolean') return a.answerBoolean ? 'Yes' : 'No';
		return a.answerText ?? a.answerRadio ?? a.answerDropdown ?? String(a.answerRating ?? '');
	}

	function groupByCategory(items: Answer[]) {
		return items.reduce((acc: Record<string, Answer[]>, a) => {
			(acc[a.categoryName] ??= []).push(a);
			return acc;
		}, {});
	}

	const grouped = groupByCategory(answers);
</script>

<!-- PAGE WRAPPER -->
<section class="container mx-auto space-y-6 p-4 md:p-6 lg:p-8">
	<!-- Header -->
	<header class="flex flex-wrap items-center justify-between gap-4">
		<div>
			<h1 class="text-2xl font-semibold tracking-tight md:text-3xl">{answers[0]?.surveyName}</h1>
			<p class="text-sm opacity-70">
				Response #{meta.responseId} · {formatDate(answers[0]?.responseDate)}
			</p>
		</div>
		{#if averageRating !== null}
			<div class="flex items-center gap-3">
				<div class="text-sm opacity-70">Average Rating</div>
				<div class="text-3xl font-semibold">{averageRating}</div>
				<div class="flex items-center" aria-label="Average stars">
					{averageRating}
				</div>
			</div>
		{/if}
	</header>

	<!-- Top Cards: Patient / Survey Meta -->
	<div class="grid grid-cols-1 gap-4 lg:grid-cols-3">
		<!-- Patient Card -->
		<article class="card preset-tonal p-4 md:p-5 lg:col-span-2">
			<h2 class="mb-3 text-lg font-semibold">Patient</h2>
			<div class="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 md:grid-cols-3">
				<div>
					<div class="opacity-70">Name</div>
					<div class="font-medium">{patient.name} {patient.lastname}</div>
				</div>
				<div>
					<div class="opacity-70">Patient ID</div>
					<div class="font-medium">{patient.patientId}</div>
				</div>
				<div>
					<div class="opacity-70">Gender</div>
					<div class="font-medium">{patient.gender}</div>
				</div>
				<div>
					<div class="opacity-70">DOB</div>
					<div class="font-medium">{patient.dob}</div>
				</div>
				<div>
					<div class="opacity-70">Age Group</div>
					<div class="font-medium">{patient.ageGroup}</div>
				</div>
				<div>
					<div class="opacity-70">Category</div>
					<div class="font-medium">{patient.category}</div>
				</div>
				<div>
					<div class="opacity-70">Status</div>
					<div class="font-medium">{patient.patientStatus}</div>
				</div>
				<div>
					<div class="opacity-70">Phone</div>
					<div class="font-medium">{patient.phone}</div>
				</div>
				<div>
					<div class="opacity-70">Email</div>
					<div class="font-medium">
						<a class="underline" href={`mailto:${patient.email}`}>{patient.email}</a>
					</div>
				</div>
			</div>
		</article>

		<!-- Survey Meta Card -->
		<article class="card preset-tonal p-4 md:p-5">
			<h2 class="mb-3 text-lg font-semibold">Survey</h2>
			<div class="space-y-2 text-sm">
				<div class="flex justify-between">
					<span class="opacity-70">Sent</span><span class="font-medium"
						>{formatDate(meta.dateSent)}</span
					>
				</div>
				<div class="flex justify-between">
					<span class="opacity-70">Method</span><span class="font-medium capitalize"
						>{meta.methodSent}</span
					>
				</div>
				<div class="flex justify-between">
					<span class="opacity-70">Opened</span>{meta.opened}
				</div>
				<div class="flex justify-between">
					<span class="opacity-70">Completed</span>{meta.completed}
				</div>
			</div>
		</article>
	</div>

	<!-- Ratings -->
	{#if ratings.length}
		<section class="space-y-4 card p-4 md:p-5">
			<h3 class="text-base font-semibold">Ratings</h3>
			<ul class="space-y-3">
				{#each ratings as r}
					<li class="flex flex-col gap-1 md:flex-row md:items-center md:justify-between">
						<div class="font-medium">{r.questionText}</div>
						<div class="flex items-center gap-3">
							<div class="text-sm opacity-70">{r.answerRating}/5</div>
							<div aria-label="stars">{r.answerRating ?? 0}</div>
						</div>
					</li>
				{/each}
			</ul>
		</section>
	{/if}

	<!-- Comments -->
	{#if comments.length}
		<section class="space-y-3 card preset-tonal p-4 md:p-5">
			<h3 class="text-base font-semibold">Comments</h3>
			{#each comments as c}
				<blockquote class=" blockquote p-3 text-sm leading-relaxed">
					{c.answerText}
				</blockquote>
			{/each}
		</section>
	{/if}

	<!-- Demographics (from answers) -->
	{#if demographics.length}
		<section class="card p-4 md:p-5">
			<h3 class="mb-3 text-base font-semibold">Demographics</h3>
			<div class="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2 md:grid-cols-3">
				{#each demographics as d}
					<div>
						<div class="opacity-70">{d.questionText}</div>
						<div class="font-medium">{answerValue(d)}</div>
					</div>
				{/each}
			</div>
		</section>
	{/if}

	<!-- All Answers Table -->
	<section class="overflow-hidden card p-0">
		<div class="flex items-center justify-between p-4 md:p-5">
			<h3 class="text-base font-semibold">All Answers</h3>
			<div class="text-xs opacity-70">{answers.length} items</div>
		</div>
		<div class="overflow-x-auto">
			<table class="table w-full text-sm">
				<thead>
					<tr class="bg-surface-100">
						<th class="p-3 text-left">Category</th>
						<th class="p-3 text-left">Question</th>
						<th class="p-3 text-left">Type</th>
						<th class="p-3 text-left">Answer</th>
						<th class="p-3 text-left">Time</th>
					</tr>
				</thead>
				<tbody>
					{#each answers as a}
						<tr class="border-t border-surface-200">
							<td class="p-3 whitespace-nowrap"
								><span class="variant-soft badge">{a.categoryName}</span></td
							>
							<td class="min-w-[18rem] p-3">{a.questionText}</td>
							<td class="p-3">{a.fieldTypeName}</td>
							<td class="p-3">
								{#if a.fieldTypeName === 'Rating'}
									<div class="flex items-center gap-2">
										<span class="font-medium">{a.answerRating}</span>
										<span class="hidden md:inline" aria-label="stars">{a.answerRating ?? 0}</span>
									</div>
								{:else}
									{answerValue(a)}
								{/if}
							</td>
							<td class="p-3 whitespace-nowrap">{formatDate(a.responseDate)}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</section>
</section>
