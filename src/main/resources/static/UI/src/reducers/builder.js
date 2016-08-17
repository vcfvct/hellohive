import {REGISTER_QUERY, FULFILLED, TOGGLE_COLUMN, TOGGLE_FILTER, REG_FEEDBACK_CLOSED} from '../actions';

const initState = {'tables': [], 'columns': [], 'filters': [], queryName: '', queryContent: '', showRegisterRs: false};


export function builder(state = initState, action) {

	switch (action.type) {

		case 'TOGGLE_TABLE':
		{
			return Object.assign({}, state, {'tables': [], 'columns': [], 'filters': []});
		}

		case TOGGLE_COLUMN:
		{
			//1.if newVal is true, add to the columns
			//2.if new Value is false, remove from columns
			//  2.1 check if filter is selected, if so remove filter
			//  2.2 if no columns any more , remove table.
			let newState = {...state, tables: [action.table]};

			if (action.newVal) {
				newState.columns = state.columns.concat(action.column);
			}
			else {
				newState.columns = state.columns.filter((column) => column !== action.column);

				if (state.filters.some((filter) => filter === action.column)) {
					newState.filters = state.filters.filter((filter) => filter !== action.column);
				}
				else {
					newState.filters = state.filters;
				}
				if (newState.columns.length === 0) {
					newState.tables = [];
				}
			}
			return newState;
		}
		case TOGGLE_FILTER:
		{
			//1. if newval is false, remove from filters
			//2. if newVal is true, add to the filters
			//   2.1 if column is not selected, add to columns
			let newState = {...state, tables: [action.table]};

			if (!action.newVal) {
				newState.filters = state.filters.filter((filter) => filter !== action.column);
			}
			else {
				newState.filters = state.filters.concat(action.column);
				if (!state.columns.some((column)=>column === action.column)) {
					newState.columns = state.columns.concat(action.column);
				}
			}
			return newState;
		}

		case REGISTER_QUERY + FULFILLED:
		{
			return Object.assign({}, state, {queryName: action.queryName, queryContent: action.queryContent, showRegisterRs: true});
		}

		case 'CANCEL_QUERY':
		{
			console.log('Query Cancelled Successfully');
			return Object.assign({}, state, {'tables': [], 'columns': [], 'filters': []});
		}
		case REG_FEEDBACK_CLOSED:
		{
		   return {...state, showRegisterRs: false}
		}

		default:
			return state
	}
}
