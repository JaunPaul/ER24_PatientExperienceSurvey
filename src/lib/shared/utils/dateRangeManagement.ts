export type DateRangePreset =
	| 'last_7_days'
	| 'last_30_days'
	| 'last_quarter'
	| 'this_year'
	| 'custom';

export type DateRangeInput =
	| { preset: Exclude<DateRangePreset, 'custom'> }
	| { preset: 'custom'; start: Date; end: Date };

// -----------------------------
// Date range helpers
// -----------------------------
export function startOfToday(): Date {
	const d = new Date();
	d.setHours(0, 0, 0, 0);
	return d;
}

export function toIso(x: Date): string {
	return x.toISOString(); // safe for timestamptz bindings
}

export function startOfYear(date = new Date()): Date {
	return new Date(date.getFullYear(), 0, 1, 0, 0, 0, 0);
}

export function daysAgo(n: number): Date {
	const d = startOfToday();
	d.setDate(d.getDate() - (n - 1)); // include today as day 1
	return d;
}

export function startOfQuarter(date = new Date()): Date {
	const q = Math.floor(date.getMonth() / 3); // 0..3
	const startMonth = q * 3;
	return new Date(date.getFullYear(), startMonth, 1, 0, 0, 0, 0);
}

export function resolveRange(input: DateRangeInput): { start: Date; end: Date; label: string } {
	const todayEnd = new Date(); // now
	switch (input.preset) {
		case 'last_7_days':
			return { start: daysAgo(7), end: todayEnd, label: 'Last 7 days' };
		case 'last_30_days':
			return { start: daysAgo(30), end: todayEnd, label: 'Last 30 days' };
		case 'last_quarter':
			// If you prefer *previous* quarter strictly, adjust logic accordingly.
			return { start: startOfQuarter(), end: todayEnd, label: 'This quarter to date' };
		case 'this_year':
			return { start: startOfYear(), end: todayEnd, label: 'This year to date' };
		case 'custom':
			return { start: input.start, end: input.end, label: 'Custom' };
	}
}

export const SurveysRanges = {
	last7Days: (): DateRangeInput => ({ preset: 'last_7_days' }),
	last30Days: (): DateRangeInput => ({ preset: 'last_30_days' }),
	thisQuarter: (): DateRangeInput => ({ preset: 'last_quarter' }),
	thisYear: (): DateRangeInput => ({ preset: 'this_year' }),
	custom: (start: Date, end: Date): DateRangeInput => ({ preset: 'custom', start, end })
};
