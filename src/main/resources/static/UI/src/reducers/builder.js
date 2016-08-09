const initState = {'tables': [], 'columns': [], 'filters': []}

export function builder(state = initState, action) {

	switch (action.type) {

		case 'TOGGLE_TABLE': {
			return Object.assign({}, state, {'tables': [], 'columns': [], 'filters': []});
		}

		case 'TOGGLE_COLUMN':
		{
			let newState = {};

			let hasColumn = containsItem(state.columns, action.table + '.' + action.column);

			let newColumns = [];
			state.columns.map(column => { newColumns.push(column); });

			let newFilters = [];
			state.filters.map(filter => { newFilters.push(filter); });


			if (hasColumn) {
				newColumns.map((column, index) => {
					if (column.includes(action.table + '.' + action.column)) {
						newColumns.splice(index, 1);
					}
				})

				newFilters.map((filter, index) => {
					if (filter.includes(action.table + '.' + action.column)) {
						newFilters.splice(index, 1);
					}
				})

				if (newColumns.length == 0) {
					newState.tables = [];
				}

			} else {
				newColumns.push(action.table + '.' + action.column);

				if (!containsItem(state.tables, action.table)) {
					newState.tables = [action.table]
				}

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

			let hasFilter = containsItem(state.filters, action.table + '.' + action.column);

			if (hasFilter) {
				newFilters.map((filter, index) => {
					if (filter.includes(action.table + '.' + action.column)) {
						newFilters.splice(index, 1);
					}
				});
			} else {
				newFilters.push(action.table + '.' + action.column);

				let hasColumn = containsItem(state.columns, action.table + '.' + action.column)
				if (!hasColumn) {
					newColumns.push(action.table + '.' + action.column);
				}
			}

			newState.columns = newColumns;
			newState.filters = newFilters;
			newState.tables = [action.table];

			return Object.assign({}, newState);
		}
		default:
			return state
	}

}

function containsItem(array, selectedItem) {
	let containsItem = false

	array.map((item, index) => {
		if (item.includes(selectedItem)) {
			containsItem = true
		}
	})

	return containsItem
}
