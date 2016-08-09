import { connect } from 'react-redux'
import {toggleTable, toggleColumn, toggleFilter, cancel} from '../actions'
import TableList from '../components/table_list'


const mapStateToProps = (state) => {
	console.log(state);

  return {
      tables: state.tables.tables,
	  currentTable: state.tables.currentTable
  }
}

const mapDispatchToProps = (dispatch) => {
	return {
	    onTableClick: (name) => {
	    	fetchColumns(name, dispatch)
	    },
	    onColumnClick: (table, name) => {
	    	dispatch(toggleColumn(table, name))
	    },
	    onFilterClick: (table, name) => {
	    	dispatch(toggleFilter(table, name))
	    }
  }
}

function fetchColumns(name, dispatch) {
	let columns = [];

	fetch('/rest/hivemeta/table/' + name)
		.then((response) => {
			return response.json();
		})
		.then(columns => {
			columns = Object.keys(columns).map(columnName => {
				return {name: columnName, type: columns[columnName], selected: false, filter: false};
			});

			dispatch(toggleTable(name, columns))
		});
}

const TableListContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(TableList)

export default TableListContainer