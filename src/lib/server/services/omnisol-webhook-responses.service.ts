import { db } from '../db';
import { omnisolWebhookResponses } from '../db/schema';
import { sql } from 'drizzle-orm';

export type WebhookPurpose = 'visitation' | 'payment';
export type WebhookBaseRow = {
	id: string;
	dateCreated: string | null;
	requestJson: unknown;
	effectiveDate: string;
	purpose: WebhookPurpose;
};
export type WebhookVisitationRow = WebhookBaseRow & { purpose: 'visitation' };
export type WebhookPaymentRow = WebhookBaseRow & { purpose: 'payment' };

export async function getRecentVisitations(limit = 15): Promise<WebhookVisitationRow[]> {
	const rows = await db.execute<{
		id: string;
		date_created: string | null;
		request_json: unknown;
		effective_date: string;
	}>(sql`
    SELECT
      ${omnisolWebhookResponses.id}           AS id,
      ${omnisolWebhookResponses.dateCreated}  AS date_created,
      ${omnisolWebhookResponses.requestJson}  AS request_json,
      COALESCE(
        (${omnisolWebhookResponses.requestJson} -> 'visitation' ->> 'date')::timestamptz,
        ${omnisolWebhookResponses.dateCreated}::timestamptz
      )::text AS effective_date
    FROM ${omnisolWebhookResponses}
    WHERE (${omnisolWebhookResponses.requestJson}::jsonb ? 'patient')
      AND (${omnisolWebhookResponses.requestJson}::jsonb ? 'visitation')
    ORDER BY
      COALESCE(
        (${omnisolWebhookResponses.requestJson} -> 'visitation' ->> 'date')::timestamptz,
        ${omnisolWebhookResponses.dateCreated}::timestamptz
      ) DESC
    LIMIT ${limit};
  `);

	return rows.map((r) => ({
		id: r.id,
		dateCreated: r.date_created,
		requestJson: r.request_json,
		effectiveDate: r.effective_date,
		purpose: 'visitation'
	}));
}

export async function getRecentPayments(limit = 15): Promise<WebhookPaymentRow[]> {
	const rows = await db.execute<{
		id: string;
		date_created: string | null;
		request_json: unknown;
		effective_date: string;
	}>(sql`
    SELECT
      ${omnisolWebhookResponses.id}           AS id,
      ${omnisolWebhookResponses.dateCreated}  AS date_created,
      ${omnisolWebhookResponses.requestJson}  AS request_json,
      COALESCE(
        (${omnisolWebhookResponses.requestJson} ->> 'timestamp')::timestamptz,
        ${omnisolWebhookResponses.dateCreated}::timestamptz
      )::text AS effective_date
    FROM ${omnisolWebhookResponses}
    WHERE (${omnisolWebhookResponses.requestJson}::jsonb ? 'payment')
      AND (${omnisolWebhookResponses.requestJson}::jsonb ? 'timestamp')
    ORDER BY
      COALESCE(
        (${omnisolWebhookResponses.requestJson} ->> 'timestamp')::timestamptz,
        ${omnisolWebhookResponses.dateCreated}::timestamptz
      ) DESC
    LIMIT ${limit};
  `);

	return rows.map((r) => ({
		id: r.id,
		dateCreated: r.date_created,
		requestJson: r.request_json,
		effectiveDate: r.effective_date,
		purpose: 'payment'
	}));
}

export async function getOmnisolWebhookResponses(limitPerType = 2) {
	const [visitations, payments] = await Promise.all([
		getRecentVisitations(limitPerType),
		getRecentPayments(limitPerType)
	]);
	return { visitations, payments };
}
