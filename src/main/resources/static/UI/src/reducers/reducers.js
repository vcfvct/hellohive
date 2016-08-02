import { combineReducers } from 'redux'

const initialState = [ { "name":"table 1", "columns": [ { "name":"column 1", "selected": true } ], "selected":true },
{ "name":"table 2", "columns": [ { "name":"column 1", "selected": false }, { "name":"column 2", "selected": false } ], "selected":false } ]

function selectTable(state=initialState, action) {
	switch (action.type) {
		case 'TOGGLE_TABLE':
			return state.map((table, index) => {
				if (table.name === action.table) {
					return Object.assign({}, table, {selected: !table.selected})
				}
				return table
			})
		default:
			return state
	}
}

const createathonApp = combineReducers({
	selectTable
})

export default createathonApp