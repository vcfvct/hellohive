export function toggleTable(table) {
	return {
		type: 'TOGGLE_TABLE',
		table: table
	}
}

export function toggleColumn(table, column) {
	return {
		type: 'TOGGLE_COLUMN',
		table: table,
		column: column
	}
}

export function toggleFilter(table, column) {
	return {
		type: 'TOGGLE_FILTER',
		table: table,
		column: column
	}
}