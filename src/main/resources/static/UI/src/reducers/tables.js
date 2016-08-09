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

			// let newState = {};
			// newState.currentTable = state.currentTable;
			// newState.tables = [];
			//
			// state.tables.map(table => {
			// 	let newTable = {};
			// 	newTable.name = table.name;
			// 	newTable.abbrev = table.abbrev;
			// 	newTable.show = table.show;
			//
			//
			// 	if (table.name === action.table) {
			//
			// 		let newColumns = [];
			//
			// 		newColumns = table.columns.map(column => {
			// 			let newCol = {};
			// 			if (column.name === action.column) {
			// 				Object.keys(column).forEach(key => {
			// 					if(key === 'selected') {
			// 						newCol[key] = !column[key];
			// 						// if (!newCol[key]) {
			// 						// 	newCol['filter'] = false;
			// 						// }
			// 					} else if (key === 'filter') {
			// 						if (column[key]) {
			// 							newCol['filter'] = false;
			// 						}
			//
			// 					} else {
			// 						newCol[key] = column[key];
			// 					}
			// 				});
			// 				// column.selected = !column.selected
			// 				// if (!column.selected) {
			// 				// 	column.filter = false
			// 				// }
			// 			}else {
			// 				Object.keys(column).forEach(key => {
			// 					newCol[key] = column[key];
			// 				});
			// 			}
			// 			return newCol;
			// 		})
			// 	}
			// })
			//
			// return Object.assign({}, newState)

			state.tables.map(table => {
				if (table.name === action.table) {
					table.columns.map(column => {
						if (column.name === action.column) {
							column.selected = !column.selected
							if (!column.selected) {
								column.filter = false
							}
						}
					})
				}
			});

			return Object.assign({}, state);


		case 'TOGGLE_FILTER':
		{
			state.tables.map(table => {
				if (table.name === action.table) {
					table.columns.map(column => {
						if (column.name === action.column) {
							column.filter = !column.filter
							if (column.filter) {
								column.selected = true
							}
						}
					})
				}
			});
			return Object.assign({}, state);
		}

		case APP_INIT : {
			return action.tables;
		}

		default:
			return state
	}

}