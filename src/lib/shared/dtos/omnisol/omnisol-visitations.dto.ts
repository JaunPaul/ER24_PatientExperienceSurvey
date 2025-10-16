import { getVisitationsDashboard } from '$lib/server/services/omnisol-visitations.service';
import { SurveysRanges, type DateRangeInput } from '$lib/shared/utils/dateRangeManagement';

const defaultRange = SurveysRanges.last7Days();

export async function toOmnsiolVisitationsVM(range: DateRangeInput = defaultRange) {
	const visitations = await getVisitationsDashboard(range);

	return { visitations };
}
