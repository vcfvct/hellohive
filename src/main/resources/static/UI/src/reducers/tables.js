import {TOGGLE_TABLE, APP_INIT} from '../actions';
import 'whatwg-fetch';

const initState = {currentTable: "", tables: []};

export function tables(state = initState, action) {
	switch (action.type) {

		case TOGGLE_TABLE: {
			let newState = {};
			newState.currentTable = action.table;

			newState.tables = state.tables.map(table => {
				if (table.name === action.table) {
					return Object.assign({}, table, {show: true, columns: action.columns});
				} else {
					return Object.assign({}, table, {show: false});
				}

			});

			return Object.assign({}, newState);
		}

		case 'TOGGLE_COLUMN': {
			let newState = {};
			newState.currentTable  = state.currentTable;

			newState.tables = state.tables.map(table => {
				if (table.name === action.table) {
					let newColumns = table.columns.map(column => {
						if (column.name === action.column) {
							return Object.assign({}, column, {selected: !column.selected, filter: !column.selected ? column.filter : false})
						} else {
							return column;
						}
					})
					return Object.assign({}, table, {columns: newColumns});
				} else {
					return table;
				}

			})

			return Object.assign({}, newState);
		}

		case 'TOGGLE_FILTER':
		{

			let newState = {};
			newState.currentTable  = state.currentTable;

			newState.tables = state.tables.map(table => {
				if (table.name === action.table) {
					let newColumns = table.columns.map(column => {
						if (column.name === action.column) {
							return Object.assign({}, column, {filter: !column.filter, selected: !column.filter ? true : column.selected})
						} else {
							return column;
						}
					})
					return Object.assign({}, table, {columns: newColumns});
				} else {
					return table;
				}

			})

			return Object.assign({}, newState);
		}

		case APP_INIT : {
			return action.tables;
		}

		case 'REGISTER_QUERY':
		case 'CANCEL_QUERY': {

			let currentTable = '';
			if (action.tables.length === 1) {
				currentTable = action.tables[0];
			} else {
				return state;
			}


			let newState = {};
			newState.currentTable  = state.currentTable;

			newState.tables = state.tables.map(table => {
				if (table.name === currentTable) {
					let newColumns = table.columns.map(column => {
						return Object.assign({}, column, {filter: false, selected: false})
					});
					return Object.assign({}, table, {columns: newColumns});
				} else {
					return table;
				}
			})

			return Object.assign({}, newState);
		}

		default:
			return state
	}

}