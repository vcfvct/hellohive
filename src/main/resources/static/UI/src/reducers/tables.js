import {TOGGLE_TABLE, APP_INIT} from '../actions';

const initState = [
	{
		name: 'TABLE_1', show: true, abbrev: 't1',
		columns: [{name: 'COL_1', 'type': 'string', 'selected': false, 'filter': false}]
	},
	{
		'name': 'TABLE_2',
		'show': false,
		'abbrev': 't2',
		'columns': [
			{'name': 'COL_1', 'type': 'string', 'selected': false, 'filter': false},
			{'name': 'COL_2', 'type': 'string', 'selected': false, 'filter': false}
		]
	}];

export function tables(state = initState, action) {
	switch (action.type) {
		case TOGGLE_TABLE:
			state.map(table => {
				if (table.name === action.table) {
					table.show = true
				}
				else {
					table.show = false
				}
			})
			return Object.assign([], state)

		case 'TOGGLE_COLUMN':
			state.map(table => {
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
			})
			return Object.assign([], state)

		case 'TOGGLE_FILTER':
		{
			state.map(table => {
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
			return Object.assign([], state);
		}

		case APP_INIT : {
			return action.tables;
		}

		default:
			return state
	}

}