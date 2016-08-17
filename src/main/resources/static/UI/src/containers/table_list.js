import { connect } from 'react-redux'
import {toggleTable, toggleColumn, toggleFilter, cancel} from '../actions'
import TableList from '../components/table_list'

const mapStateToProps = (state) => {
	return {
		tables: state.tablesModel.tables,
		currentTable: state.tablesModel.currentTable
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTableClick: (tableName, tables) => {
			dispatch(toggleTable(tableName, tables))
		},
		onColumnClick: (table, name, newVal) => {
			dispatch(toggleColumn(table, name, newVal))
		},
		onFilterClick: (table, name, newVal) => {
			dispatch(toggleFilter(table, name, newVal))
		}
	}
};

const TableListContainer = connect(
		mapStateToProps,
		mapDispatchToProps
)(TableList);

export default TableListContainer