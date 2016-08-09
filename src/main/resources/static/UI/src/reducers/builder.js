import 'whatwg-fetch';

const initState = {'tables': [], 'columns': [], 'filters': []}

let counter =  0;

export function builder(state = initState, action) {

	switch (action.type) {

		case 'TOGGLE_TABLE': {
			return Object.assign({}, state, {'tables': [], 'columns': [], 'filters': []});
		}

		case 'TOGGLE_COLUMN':
		{
			let newState = {};

			let hasColumn = containsItem(state.columns,  action.column);

			let newColumns = [];
			state.columns.map(column => { newColumns.push(column); });

			let newFilters = [];
			state.filters.map(filter => { newFilters.push(filter); });

			newState.tables = [action.table];

			if (hasColumn) {
				newColumns.map((column, index) => {
					if (column.includes( action.column)) {
						newColumns.splice(index, 1);
					}
				})

				newFilters.map((filter, index) => {
					if (filter.includes( action.column)) {
						newFilters.splice(index, 1);
					}
				})

				if (newColumns.length == 0) {
					newState.tables = [];
				}

			} else {
				newColumns.push( action.column);
			}

			newState.columns = newColumns;
			newState.filters = newFilters;

			return Object.assign({}, newState);
		}
		case 'TOGGLE_FILTER':
		{

			let newState = {};

			let newColumns = [];
			state.columns.map(column => { newColumns.push(column); });

			let newFilters = [];
			state.filters.map(filter => { newFilters.push(filter); });

			let hasFilter = containsItem(state.filters,  action.column);

			if (hasFilter) {
				newFilters.map((filter, index) => {
					if (filter.includes( action.column)) {
						newFilters.splice(index, 1);
					}
				});
			} else {
				newFilters.push( action.column);

				let hasColumn = containsItem(state.columns,  action.column)
				if (!hasColumn) {
					newColumns.push( action.column);
				}
			}

			newState.columns = newColumns;
			newState.filters = newFilters;
			newState.tables = [action.table];

			return Object.assign({}, newState);
		}

		case 'REGISTER_QUERY': {

			let query = 'select ';
			query += action.columns.join();
			query += ' from ';
			query += action.tables.join();


			if (action.filters.length > 0) {

				for (var i = 0; i < action.filters.length; i++) {
					action.filters[i] = action.filters[i] + ' = ${' + action.filters[i] + '}'
				}

				query += ' where ';
				query += action.filters.join();
			}

			let queryName = 'query-' + counter;
			counter++;

			fetch('/rest/hql/register/name/' + queryName, {
				method: 'POST',
				body: query
			})

			console.log('Query Registered Successfully');
			return Object.assign({}, state, {'tables': [], 'columns': [], 'filters': []});
		}

		case 'CANCEL_QUERY': {
			console.log('Query Cancelled Successfully');
			return Object.assign({}, state, {'tables': [], 'columns': [], 'filters': []});
		}

		default:
			return state
	}

}

function containsItem(array, selectedItem) {
	let containsItem = false

	array.map(item => {
		if (item.includes(selectedItem)) {
			containsItem = true
		}
	})

	return containsItem
}

// fetch('/rest/hivemeta/table/' + name)
// 	.then((response) => {
// 		return response.json();
// 	})
// 	.then(columns => {
// 		columns = Object.keys(columns).map(columnName => {
// 			return {name: columnName, type: columns[columnName], selected: false, filter: false};
// 		});
//
// 		dispatch(toggleTable(name, columns))
// 	});

