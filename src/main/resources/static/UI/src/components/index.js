import React from 'react';
import TableListContainer from '../containers/table_list';
import QueryBuilderContainer from '../containers/query_builder';
import LoadingIndicator from './loadingInd';
import {Grid, Row, Col} from 'react-flexbox-grid';


export default class App extends React.Component {
	render() {
		return (
				<div>
					<LoadingIndicator/>
					<Grid>
						<Row>
							<Col xs={6} md={8}><TableListContainer/></Col>
							<Col xs={6} md={4}><QueryBuilderContainer/></Col>
							</Row>
						</Grid>
				</div>);
	}

	/*	componentWillMount(){
	 console.log(this.props)
	 }*/
}