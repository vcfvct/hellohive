import React from 'react'
//import TableHeaderContent from './table_header'
import DBTableColumn from './column';
import {Table, TableBody, TableRow, TableHeader, TableHeaderColumn} from 'material-ui/Table';


export default class TableContent extends React.Component {
	render() {
		let thisTable = this.props.tableModel;
		return (
				<Table>
					<TableHeader displaySelectAll={false}
					             adjustForCheckbox={false}>
						<TableRow>
							<TableHeaderColumn >Column</TableHeaderColumn>
							<TableHeaderColumn >Type</TableHeaderColumn>
							<TableHeaderColumn >Filter</TableHeaderColumn>
						</TableRow>
					</TableHeader>
					<TableBody displaySelectAll={false}
					           adjustForCheckbox={false}>
						{Object.keys(thisTable.columns).map(column =>
								<DBTableColumn key={thisTable.columns[column].name} tableName={thisTable.name} column={thisTable.columns[column]}
								               onColumnClick={this.props.onColumnClick}
								               onFilterClick={this.props.onFilterClick}/>)}
					</TableBody>
				</Table>
		)
	}
}
