import { connect } from 'react-redux'
import {toggleTable, toggleColumn, toggleFilter} from '../actions'
import QueryBuilder from '../components/query_builder'


const mapStateToProps = (state) => {
  return {
    query: state.builder
  }
}

const QueryBuilderContainer = connect(
  mapStateToProps
)(QueryBuilder)

export default QueryBuilderContainer