import { toOmnsiolPaymentsVM } from '$lib/shared/dtos/omnisol/omnisol-payments.dto';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const vm = await toOmnsiolPaymentsVM();

	return { vm };
};
