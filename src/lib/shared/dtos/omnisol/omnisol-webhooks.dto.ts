import type { omnisolWebhookResponses } from '$lib/server/db/schema';
import {
	getOmnisolWebhookResponses,
	type WebhookPaymentLite,
	type WebhookVisitationLite
} from '$lib/server/services/omnisol-webhook-responses.service';

type OmnisolWebhookResponsesResponseType = typeof omnisolWebhookResponses.$inferSelect;

export interface OmnisolWebhookResponsesVM {
	responses: OmnisolWebhookResponsesResponseType[];
}

// dto/table vm types
type TableVM = {
	cols: string[];
	rows: Record<string, string | number | null>[];
};

type WebhookDigest = {
	visitations: WebhookVisitationLite[];
	payments: WebhookPaymentLite[];
};

// util: format (kept simple so you can swap later)
const fmtAmount = (amt?: number, ccy?: string) =>
	amt == null ? '' : `${amt}${ccy ? ` ${ccy}` : ''}`;

// util: keep key insertion order matching cols
function makeRow(keys: string[], values: (string | number | null | undefined)[]) {
	const row: Record<string, string | number | null> = {};
	keys.forEach((k, i) => {
		const v = values[i];
		row[k] = v == null ? '' : typeof v === 'number' ? v : String(v);
	});
	return row;
}

// main transformer
export function toTablesVM(data: WebhookDigest): {
	visitationTable: TableVM;
	paymentsTable: TableVM;
} {
	// VISITATIONS
	const vCols = [
		'Effective Date',
		'Visitation ID',
		'Patient ID',
		'Patient Name',
		'Patient Lastname',
		'Medical Aid Provider',
		'Payment Method',
		'Currency',
		'Amount',
		'Status'
	];

	const visitationRows = data.visitations.map((v) =>
		makeRow(vCols, [
			v.effectiveDate,
			v.requestJson.id,
			v.requestJson.patient?.id ?? '',
			v.requestJson.patient?.name ?? '',
			v.requestJson.patient?.lastname ?? '',
			v.requestJson.visitation?.medical_aid?.provider ?? '',
			v.requestJson.visitation?.payment?.method ?? '',
			v.requestJson.visitation?.payment?.currency ?? '',
			v.requestJson.visitation?.payment?.amount ?? '',
			v.requestJson.visitation?.payment?.status ?? ''
		])
	);

	// PAYMENTS
	const pCols = ['Effective Date', 'Payment ID', 'Method', 'Currency', 'Amount', 'Status'];

	const paymentRows = data.payments.map((p) =>
		makeRow(pCols, [
			p.effectiveDate,
			p.requestJson.id,
			p.requestJson.payment?.method ?? '',
			p.requestJson.payment?.currency ?? '',
			p.requestJson.payment?.amount ?? '',
			p.requestJson.payment?.status ?? ''
		])
	);

	return {
		visitationTable: { cols: vCols, rows: visitationRows },
		paymentsTable: { cols: pCols, rows: paymentRows }
	};
}

export async function toOmnisolWebhookResponsesVM(): Promise<OmnisolWebhookResponsesVM> {
	const responses = await getOmnisolWebhookResponses();
	const tables = toTablesVM(responses);
	return { responses, tables };
}
