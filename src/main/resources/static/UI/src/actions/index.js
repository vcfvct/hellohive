import axios from 'axios';

export const TOGGLE_TABLE = 'TOGGLE_TABLE';
export const TOGGLE_COLUMN = 'TOGGLE_COLUMN';
export const TOGGLE_FILTER = 'TOGGLE_FILTER';

export const FETCH_TABLES = 'FETCH_TABLES';
export const FETCH_COLUMNS = 'FETCH_COLUMNS';

export const REGISTER_QUERY = 'REGISTER_QUERY';

export const LOAD = 'loading';
export const UNLOAD = 'hide';

export const PENDING = '_PENDING';
export const FULFILLED = '_FULFILLED';
export const REJECTED = '_REJECTED';

export function toggleTable(tableName, tables) {
	let targetTable = tables.find((table) => table.name === tableName);
	if (targetTable.columns.length > 0) {
		return {
			type: TOGGLE_TABLE,
			table: tableName,
			columns: targetTable.columns
		}
	}
	else {
		return fetchColumns(tableName);
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

export function fetchTables() {
	return {
		type: FETCH_TABLES,
		payload: axios.get('/rest/hivemeta/tables')
	}
}
export function fetchColumns(tableName) {
	return (dispatch) => {
		dispatch({type: LOAD});
		axios.get('/rest/hivemeta/table/' + tableName).then((rs) => {
			dispatch({type: FETCH_COLUMNS + FULFILLED, columns: rs.data, tableName});
			dispatch({type: UNLOAD});
		})
	}
}

export function registerQuery(columns, tables, filters) {
	let query = 'select ';
	query += columns.join();
	query += ' from ';
	query += tables.join();

	if (filters.length > 0) {

		for (var i = 0; i < filters.length; i++) {
			filters[i] = filters[i] + ' = ${' + filters[i] + '}'
		}

		query += ' where ';
		query += filters.join();
	}

	let queryName = 'query-' + Math.floor(Math.random() * 10000 + 1);

	return {
		type: 'REGISTER_QUERY',
		payload: axios({
					method: 'post',
					url: '/rest/hql/register/name/' + queryName,
					data: query,
					headers: {'Content-Type': 'text/plain'}
				}
		)
	}
}

export function cancelQuery(tables) {
	return {
		type: 'CANCEL_QUERY',
		tables: tables
	}
}
