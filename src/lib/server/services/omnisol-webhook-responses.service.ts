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

// types (optional but handy)
export type WebhookVisitationLite = {
	id: string;
	effectiveDate: string;
	requestJson: {
		id: string | null; // visitation.id
		patient: {
			id: string | null;
			name: string | null;
			lastname: string | null;
		};
		visitation: {
			medical_aid: { provider: string | null };
			payment: unknown | null; // raw jsonb
		};
	};
	purpose: 'visitation';
};

export async function getRecentVisitationsLite(limit = 15): Promise<WebhookVisitationLite[]> {
	const rows = await db.execute<{
		id: string;
		effective_date: string;
		v_id: string | null;
		p_id: string | null;
		p_name: string | null;
		p_lastname: string | null;
		ma_provider: string | null;
		payment_json: unknown | null;
	}>(sql`
    SELECT
      ${omnisolWebhookResponses.id} AS id,
      COALESCE(
        (${omnisolWebhookResponses.requestJson} -> 'visitation' ->> 'date')::timestamptz,
        ${omnisolWebhookResponses.dateCreated}::timestamptz
      )::text AS effective_date,

      -- requestJson.visitation.id
      (${omnisolWebhookResponses.requestJson} -> 'visitation' ->> 'id') AS v_id,

      -- requestJson.patient.*
      (${omnisolWebhookResponses.requestJson} -> 'patient' ->> 'id')       AS p_id,
      (${omnisolWebhookResponses.requestJson} -> 'patient' ->> 'name')     AS p_name,
      (${omnisolWebhookResponses.requestJson} -> 'patient' ->> 'lastname') AS p_lastname,

      -- requestJson.visitation.medical_aid.provider
      (${omnisolWebhookResponses.requestJson} -> 'visitation' -> 'medical_aid' ->> 'provider') AS ma_provider,

      -- requestJson.visitation.payment (entire object)
      (${omnisolWebhookResponses.requestJson} -> 'visitation' -> 'payment') AS payment_json
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
		effectiveDate: r.effective_date,
		requestJson: {
			id: r.v_id, // requestJson.visitation.id (your spec said requestJson.id — this maps to visitation.id)
			patient: {
				id: r.p_id,
				name: r.p_name,
				lastname: r.p_lastname
			},
			visitation: {
				medical_aid: { provider: r.ma_provider },
				payment: r.payment_json
			}
		},
		purpose: 'visitation'
	}));
}

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

export type WebhookPaymentLite = {
	id: string;
	effectiveDate: string;
	requestJson: {
		id: string | null;
		payment: unknown | null; // raw jsonb
	};
	purpose: 'payment';
};

export async function getRecentPaymentsLite(limit = 15): Promise<WebhookPaymentLite[]> {
	const rows = await db.execute<{
		id: string;
		effective_date: string;
		req_id: string | null;
		payment_json: unknown | null;
	}>(sql`
    SELECT
      ${omnisolWebhookResponses.id} AS id,
      COALESCE(
        (${omnisolWebhookResponses.requestJson} ->> 'timestamp')::timestamptz,
        ${omnisolWebhookResponses.dateCreated}::timestamptz
      )::text AS effective_date,

      -- requestJson.id
      (${omnisolWebhookResponses.requestJson} ->> 'id') AS req_id,

      -- requestJson.payment (entire object)
      (${omnisolWebhookResponses.requestJson} -> 'payment') AS payment_json
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
		effectiveDate: r.effective_date,
		requestJson: {
			id: r.req_id,
			payment: r.payment_json
		},
		purpose: 'payment'
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

export async function getOmnisolWebhookResponses(limitPerType = 20) {
	const [visitations, payments] = await Promise.all([
		getRecentVisitationsLite(limitPerType),
		getRecentPaymentsLite(limitPerType)
	]);
	return { visitations, payments };
}
