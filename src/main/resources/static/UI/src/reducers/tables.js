import * as actions from '../actions';
import update from 'react-addons-update';


const initState = {currentTable: '', tables: {}};

export function tablesModel(state = initState, action) {
	function resetTable(thisTable) {
		let newCols = {};
		Object.keys(thisTable.columns).forEach((col) => newCols[col] = {...thisTable.columns[col], filter: false, selected: false});
		return {...thisTable, columns:newCols};
	}

	switch (action.type) {

		case actions.TOGGLE_TABLE:
		{
			let newTable = resetTable(state.tables[state.currentTable]);
			return {
				...state,
				currentTable: action.table,
				tables:{...state.tables, [state.currentTable]: newTable}};
		}

		case actions.TOGGLE_COLUMN:
		{
			let newCol = {...state.tables[action.table].columns[action.column], selected: action.newVal, filter: false};
			return update(state, {tables: {[action.table]: {columns: {[action.column]: {$set: newCol}}}}});
		}

		case actions.TOGGLE_FILTER:
		{
			let newCol = {...state.tables[action.table].columns[action.column], selected: true, filter: action.newVal};
			return update(state, {tables: {[action.table]: {columns: {[action.column]: {$set: newCol}}}}});
		}

		case actions.FETCH_TABLES + actions.FULFILLED :
		{
			let tableNames = action.payload.data;
			let newTables = {};
			tableNames.forEach((tableName) => {
				newTables[tableName] = {name: tableName, columns: {}};
			});
			return {...state, tables: newTables, currentTable: tableNames[0]};
		}

		case actions.FETCH_COLUMNS + actions.FULFILLED :
		{
			let columns = action.columns;
			let newCols = {};
			Object.keys(columns).forEach(columnName => {
				newCols[columnName] = {name: columnName, type: columns[columnName], selected: false, filter: false};
			});
			return update(state, {tables: {[action.tableName]: {columns: {$set: newCols}}}});
		}

		//case REGISTER_QUERY+FULFILLED:
		case 'CANCEL_QUERY':
		{
			let newTable = resetTable(state.tables[state.currentTable]);
			return update(state, {tables: {[state.currentTable]: {$set: newTable}}});
		}

		default:
			return state
	}

}