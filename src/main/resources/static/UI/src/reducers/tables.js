import {TOGGLE_TABLE, APP_INIT} from '../actions';
import 'whatwg-fetch';

const initState = {currentTable: "", tables: []};

export function tables(state = initState, action) {
	switch (action.type) {
		case TOGGLE_TABLE:

			state.currentTable = action.table;

			state.tables.map(table => {
				if (table.name === action.table) {
					table.show = true;
					if (table.columns.length == 0) {
						table.columns = action.columns;
					}
				} else {
					table.show = false
				}
			})

			return Object.assign({}, state)

		case 'TOGGLE_COLUMN':

			let newState = {};
			newState.currentTable  = state.currentTable;

			newState.tables = state.tables.map(table => {
				if (table.name === action.table) {
					let newColumns = table.columns.map(column => {
						if (column.name === action.column) {
							return Object.assign({}, column, {selected: !column.selected, filter: !column.selected ? false : true})
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


		case 'TOGGLE_FILTER':
		{

			let newState = {};
			newState.currentTable  = state.currentTable;

			newState.tables = state.tables.map(table => {
				if (table.name === action.table) {
					let newColumns = table.columns.map(column => {
						if (column.name === action.column) {
							return Object.assign({}, column, {filter: !column.filter, selected: !column.filter ? true : false})
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

		default:
			return state
	}

}