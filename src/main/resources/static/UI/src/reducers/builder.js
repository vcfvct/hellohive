const initState = {'tables': [], 'columns': [], 'filters': []}

export function builder(state = initState, action) {

	switch (action.type) {
		case 'TOGGLE_COLUMN':
		{
			let removed = removeItem(state.columns, action.table + '.' + action.column)

			if (removed) {
				let hasTable = containsItem(state.columns, action.table + '.')
				if (!hasTable) {
					removeItem(state.tables, action.table)
				}

				removeItem(state.filters, action.table + '.' + action.column)
				return Object.assign({}, state)
			}

			state.columns.push(action.table + '.' + action.column)

			let hasTable = containsItem(state.tables, action.table)
			if (!hasTable) {
				state.tables.push(action.table)
			}

			return Object.assign({}, state);
		}
		case 'TOGGLE_FILTER':
		{

			let removed = removeItem(state.filters, action.table + '.' + action.column)
			if (removed) {
				return Object.assign({}, state)
			}

			state.filters.push(action.table + '.' + action.column)

			let hasTable = containsItem(state.tables, action.table)
			if (!hasTable) {
				state.tables.push(action.table)
			}

			let hasColumn = containsItem(state.columns, action.table + '.' + action.column)
			if (!hasColumn) {
				state.columns.push(action.table + '.' + action.column)
			}

			return Object.assign({}, state);
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

function removeItem(array, selectedItem) {
	let removedItem = false

	array.map((item, index) => {
		if (item.includes(selectedItem)) {
			array.splice(index, 1)
			removedItem = true
		}
	})

	return removedItem
}