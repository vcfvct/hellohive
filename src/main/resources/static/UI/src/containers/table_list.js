import { connect } from 'react-redux'
import {toggleTable, toggleColumn, toggleFilter} from '../actions'
import TableList from '../components/table_list'

const mapStateToProps = (state) => {
	return {
		tables: state.tablesModel.tables,
		currentTable: state.tablesModel.currentTable
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onTableClick: (targetTable) => {
			dispatch(toggleTable(targetTable))
		},
		onColumnClick: (tableName, colName, newVal) => {
			dispatch(toggleColumn(tableName, colName, newVal))
		},
		onFilterClick: (tableName, colName, newVal) => {
			dispatch(toggleFilter(tableName, colName, newVal))
		}
	}
};

const TableListContainer = connect(
		mapStateToProps,
		mapDispatchToProps
)(TableList);

export default TableListContainer