export const APP_INIT = 'APP_INIT';
export const TOGGLE_TABLE = 'TOGGLE_TABLE';
export const TOGGLE_COLUMN = 'TOGGLE_COLUMN';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';

export function toggleTable(table) {
	return {
		type: TOGGLE_TABLE,
		table: table
	}
}

export function toggleColumn(table, column) {
	return {
		type: TOGGLE_COLUMN,
		table: table,
		column: column
	}
}

export function toggleFilter(table, column) {
	return {
		type: TOGGLE_FILTER,
		table: table,
		column: column
	};
}

export function appInitActionCreator(tables)
{
	return {
		type: APP_INIT,
		tables
	};
}