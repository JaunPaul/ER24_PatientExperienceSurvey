import type { omnisolWebhookResponses } from '$lib/server/db/schema';
import { getOmnisolWebhookResponses } from '$lib/server/services/omnisol-webhook-responses.service';

type OmnisolWebhookResponsesResponseType = typeof omnisolWebhookResponses.$inferSelect;

export interface OmnisolWebhookResponsesVM {
	responses: OmnisolWebhookResponsesResponseType[];
}

export async function toOmnisolWebhookResponsesVM(): Promise<OmnisolWebhookResponsesVM> {
	const responses = await getOmnisolWebhookResponses();

	return { responses };
}
