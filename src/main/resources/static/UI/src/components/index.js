import React from 'react';
import TableListContainer from '../containers/table_list';
import QueryBuilderContainer from '../containers/query_builder';
import LoadingIndicator from './loadingInd';

export default class App extends React.Component {
	render() {
		return (
				<div>
					<LoadingIndicator/>
					<TableListContainer/>
					<br/> <br/>
					<QueryBuilderContainer/>
				</div>);
	}

	/*	componentWillMount(){
	 console.log(this.props)
	 }*/
}