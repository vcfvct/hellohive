import React from 'react'
//import TableHeaderContent from './table_header'
import DBTableColumn from './column';
import {Table, TableBody, TableRow, TableHeader, TableHeaderColumn} from 'material-ui/Table';


const TableContent = ({tableModel, onColumnClick, onFilterClick}) => (
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
				{tableModel.columns.map(column =>
						<DBTableColumn key={column.name} tableName={tableModel.name} column={column} onColumnClick={onColumnClick}
						               onFilterClick={onFilterClick}/>
				)}
			</TableBody>
		</Table>
);

export default TableContent