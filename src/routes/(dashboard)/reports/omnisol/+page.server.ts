import { toOmnisolWebhookResponsesVM } from '$lib/shared/dtos/omnisol/omnisol-webhooks.dto';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const vm = await toOmnisolWebhookResponsesVM();

	return { vm };
};
