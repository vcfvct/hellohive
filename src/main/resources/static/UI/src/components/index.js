import React from 'react'
import TableListContainer from '../containers/table_list'
import QueryBuilderContainer from '../containers/query_builder'

export default class App extends React.Component {
	render() {
		return <div>
			<TableListContainer/>
			<br/> <br/>
			<QueryBuilderContainer/>
		</div>;
	}

/*	componentWillMount(){
		console.log(this.props)
	}*/
}