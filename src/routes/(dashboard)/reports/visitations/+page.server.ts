import { toOmnsiolVisitationsVM } from '$lib/shared/dtos/omnisol/omnisol-visitations.dto';
import { determineDateRange } from '$lib/shared/utils/dateRangeManagement';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const filter = url.searchParams.get('filter');
	const vm = await toOmnsiolVisitationsVM(determineDateRange(filter));

	return { vm };
};
