import { toOmnsiolVisitationsVM } from '$lib/shared/dtos/omnisol/omnisol-visitations.dto';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const vm = await toOmnsiolVisitationsVM();

	return { vm };
};
