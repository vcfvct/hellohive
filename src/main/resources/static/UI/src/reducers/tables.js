import * as actions from '../actions';

const initState = {currentTable: '', tables: []};

export function tablesModel(state = initState, action) {
	switch (action.type) {

		case actions.TOGGLE_TABLE: {
			return {...state, currentTable: action.table};
		}

		case actions.TOGGLE_COLUMN: {
			let newTables = state.tables.map(table => {
				if (table.name === action.table) {
					let newColumns = table.columns.map(column => {
						if (column.name === action.column) {
							return Object.assign({}, column, {selected: !column.selected, filter: !column.selected ? column.filter : false})
						}
						else {
							return column;
						}
					});
					return Object.assign({}, table, {columns: newColumns});
				}
				else {
					return table;
				}
			});

			return {...state, tables: newTables};
		}

		case actions.TOGGLE_FILTER:
		{
			let newTables = state.tables.map(table => {
				if (table.name === action.table) {
					let newColumns = table.columns.map(column => {
						if (column.name === action.column) {
							return Object.assign({}, column, {filter: !column.filter, selected: !column.filter ? true : column.selected})
						}
						else {
							return column;
						}
					});
					return Object.assign({}, table, {columns: newColumns});
				}
				else {
					return table;
				}
			});

			return {...state, tables: newTables};
		}

		case actions.FETCH_TABLES + actions.FULFILLED : {
			let initState = {};
			let tableNames = action.payload.data;
			initState.tables = tableNames.map((tableName, index) => {
				return {
					name: tableName, show: index === 0, abbrev: tableName,
					columns: []
				}
			});
			initState.currentTable = tableNames[0];

			return Object.assign({}, state, initState);
		}

		case actions.FETCH_COLUMNS + actions.FULFILLED :
		{
			let columns = action.columns;
			let newCols = Object.keys(columns).map(columnName => {
				return {name: columnName, type: columns[columnName], selected: false, filter: false};
			});

			let newTables = state.tables.map((table) => {
				let result = table;
				if (action.tableName === table.name) {
					result = Object.assign({}, table, {columns: newCols});
				}
				return result;
			});
			return Object.assign({}, state, {tables: newTables});
		}

		//case REGISTER_QUERY+FULFILLED:
		case 'CANCEL_QUERY': {
			let newTables = state.tables.map(table => {
				if (table.name === state.currentTable) {
					let newColumns = table.columns.map(column => {
						return Object.assign({}, column, {filter: false, selected: false})
					});
					return Object.assign({}, table, {columns: newColumns});
				}
				else {
					return table;
				}
			});

			return {...state, tables: newTables};
		}

		default:
			return state
	}

}