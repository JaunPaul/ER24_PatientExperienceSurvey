export type TableData = {
	cols: string[];
	rows: {
		keys: string[];
		values: any[];
	};
};
export type TableVM = {
	cols: string[];
	rows: Record<string, string | number | null>[];
};
export function makeRow(keys: string[], values: (string | number | null | undefined)[]) {
	const row: Record<string, string | number | null> = {};
	keys.forEach((k, i) => {
		const v = values[i];
		row[k] = v == null ? '' : typeof v === 'number' ? v : String(v);
	});
	return row;
}

// main transformer
export function toTablesVM(data: TableData): TableVM {
	const vCols = data.cols;
	const vRows = data.rows.values.map((v) => makeRow(vCols, [...Object.values(v)]));

	return { cols: vCols, rows: vRows };
}
