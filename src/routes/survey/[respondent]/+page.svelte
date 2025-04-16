<script lang="ts">
	import { onMount } from 'svelte';
	import PatientExperienceSurveyJSON from '$lib/survey/pes_conditionals.json';
	import SurveyTheme from '$lib/survey/survey_theme.json';
	import { goto } from '$app/navigation';
	import type { SurveyResponse } from '$lib/shared/types/surveyResponseType';

	let sending = false;
	let loading = true;
	let { data } = $props();
	$inspect(data);
	const saveResponseToLocalStorage = (responseBody: string) => {
		localStorage.setItem('registrationResponse', JSON.stringify(responseBody));
	};

	const sendRegistration = async (sender, options) => {
		sending = true;
		try {
			const response = await fetch('/api/survey', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify(sender.data)
			});

			if (response.ok) {
				const responseBody = await response.json();
				console.log(JSON.stringify(responseBody));
				saveResponseToLocalStorage(responseBody);
				options.showSaveSuccess();
				//await sendNotifications(sender.data);
				//goto('/thank-you/competition');
			} else {
				options.showSaveError();
			}
		} catch (error) {
			options.showSaveError();
		} finally {
			sending = false;
		}
	};

	const sendNotifications = async (surveyData: SurveyResponse) => {
		console.log('sending notification');
		try {
			const response = await fetch('/api/notification', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json; charset=utf-8'
				},
				body: JSON.stringify(surveyData)
			});
			if (response.ok) {
				const responseBody = await response.json();
				console.log('notification sent', JSON.stringify(responseBody));
			}
		} catch (error) {}
	};

	onMount(() => {
		const script1 = document.createElement('script');
		script1.src = 'https://unpkg.com/survey-core@2.0.0/survey.core.min.js';
		script1.async = true;

		const script2 = document.createElement('script');
		script2.src = 'https://unpkg.com/survey-js-ui@2.0.0/survey-js-ui.min.js';
		script2.async = true;

		script1.onload = () => {
			document.head.appendChild(script2);
		};

		script2.onload = () => {
			const survey = new Survey.Model(PatientExperienceSurveyJSON);
			survey.onComplete.add(sendRegistration);

			survey.render(document.getElementById('surveyContainer'));
			survey.applyTheme(SurveyTheme);
			loading = false;
		};

		document.head.appendChild(script1);
	});
</script>

<div id="surveyContainer"></div>

{#if sending}
	<div class="mt-4 flex justify-center">
		<div class="relative mx-auto inline-block p-4 text-center">
			Please wait, you will be redirected ... <span class="relative top-2 ml-2 inline-flex"
				><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
					><circle cx="12" cy="2" r="0" fill="#F97316"
						><animate
							attributeName="r"
							begin="0"
							calcMode="spline"
							dur="1s"
							keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
							repeatCount="indefinite"
							values="0;2;0;0"
						/></circle
					><circle cx="12" cy="2" r="0" fill="#F97316" transform="rotate(45 12 12)"
						><animate
							attributeName="r"
							begin="0.125s"
							calcMode="spline"
							dur="1s"
							keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
							repeatCount="indefinite"
							values="0;2;0;0"
						/></circle
					><circle cx="12" cy="2" r="0" fill="#F97316" transform="rotate(90 12 12)"
						><animate
							attributeName="r"
							begin="0.25s"
							calcMode="spline"
							dur="1s"
							keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
							repeatCount="indefinite"
							values="0;2;0;0"
						/></circle
					><circle cx="12" cy="2" r="0" fill="#F97316" transform="rotate(135 12 12)"
						><animate
							attributeName="r"
							begin="0.375s"
							calcMode="spline"
							dur="1s"
							keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
							repeatCount="indefinite"
							values="0;2;0;0"
						/></circle
					><circle cx="12" cy="2" r="0" fill="#F97316" transform="rotate(180 12 12)"
						><animate
							attributeName="r"
							begin="0.5s"
							calcMode="spline"
							dur="1s"
							keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
							repeatCount="indefinite"
							values="0;2;0;0"
						/></circle
					><circle cx="12" cy="2" r="0" fill="#F97316" transform="rotate(225 12 12)"
						><animate
							attributeName="r"
							begin="0.625s"
							calcMode="spline"
							dur="1s"
							keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
							repeatCount="indefinite"
							values="0;2;0;0"
						/></circle
					><circle cx="12" cy="2" r="0" fill="#F97316" transform="rotate(270 12 12)"
						><animate
							attributeName="r"
							begin="0.75s"
							calcMode="spline"
							dur="1s"
							keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
							repeatCount="indefinite"
							values="0;2;0;0"
						/></circle
					><circle cx="12" cy="2" r="0" fill="#F97316" transform="rotate(315 12 12)"
						><animate
							attributeName="r"
							begin="0.875s"
							calcMode="spline"
							dur="1s"
							keySplines="0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8;0.2 0.2 0.4 0.8"
							repeatCount="indefinite"
							values="0;2;0;0"
						/></circle
					></svg
				></span
			>
		</div>
	</div>
{/if}

<style>
	@import url('https://unpkg.com/survey-core@2.0.0/survey-core.min.css');
</style>
