import { connect } from 'react-redux'
import {registerQuery, cancelQuery, onRegFeedbackDismiss} from '../actions'
import QueryBuilder from '../components/query_builder'


const mapStateToProps = (state) => {
	return {
		query: state.builder
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		onRegisterClick: (columns, tables, filters) => {
			dispatch(registerQuery(columns, tables, filters))
		},
		onCancelClick: (tables) => {
			dispatch(cancelQuery(tables));
		},
		onRegFeedbackDismiss: () => {
			dispatch(onRegFeedbackDismiss());
		}
	}
};

const QueryBuilderContainer = connect(
		mapStateToProps, mapDispatchToProps
)(QueryBuilder);

export default QueryBuilderContainer