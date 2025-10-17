import { toOmnsiolPaymentsVM } from '$lib/shared/dtos/omnisol/omnisol-payments.dto';
import type { PageServerLoad } from './$types';
import { determineDateRange } from '$lib/shared/utils/dateRangeManagement';

export const load: PageServerLoad = async ({ url }) => {
	const filter = url.searchParams.get('filter');
	const vm = await toOmnsiolPaymentsVM(determineDateRange(filter));

	return { vm };
};
