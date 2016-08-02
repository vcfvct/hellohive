import { connect } from 'react-redux'
import { toggle_table } from '../actions'
import Table from '../components/Table'

const getTables = (tables) => {
	return tables
}

const mapStateToProps = (state) => {
  return {
    tables: getTables(state.selectTable)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (name) => {
      dispatch(toggle_table(name))
    }
  }
}

const Containers = connect(
  mapStateToProps,
  mapDispatchToProps
)(Table)

export default Containers