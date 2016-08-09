export const APP_INIT = 'APP_INIT';
export const TOGGLE_TABLE = 'TOGGLE_TABLE';
export const TOGGLE_COLUMN = 'TOGGLE_COLUMN';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';

export function toggleTable(table, columns) {
	return {
		type: TOGGLE_TABLE,
		table: table,
		columns: columns
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

export function registerQuery(columns, tables, filters) {
	return {
		type: 'REGISTER_QUERY',
		columns: columns,
		tables: tables,
		filters: filters
	}
}

export function cancelQuery(tables) {
	return {
		type: 'CANCEL_QUERY',
		tables: tables
	}
}
