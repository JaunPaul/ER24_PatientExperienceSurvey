import { getSurveyResponseFlatComments } from '$lib/server/services/survey-response-flat.service';
import { toTablesVM, type TableVM } from '$lib/shared/utils/toTables';

export type SurveyCommentVM = {
	responseDate: string;
	answerText: string;
	responseId: string;
};
export type SurveyCommentsListVM = {
	comments: SurveyCommentVM[];
	table: TableVM;
};

export async function toSurveyCommentsListVM() {
	const comments = await getSurveyResponseFlatComments();
	const safeComments: SurveyCommentVM[] = comments.map((c) => ({
		answerText: c?.answerText ?? '',
		responseDate: c?.responseDate ?? '',
		responseId: c?.responseId ?? ''
	}));

	const table = toTablesVM({
		cols: ['Date', 'Comment', 'Id'],
		rows: {
			keys: ['Date', 'Comment', 'Id'],
			values: safeComments.map((r) => ({
				responseDate: new Date(r.responseDate).toDateString(),
				answerText: r.answerText,
				responseId: r.responseId
			}))
		}
	});

	return { comments: safeComments, table };
}
