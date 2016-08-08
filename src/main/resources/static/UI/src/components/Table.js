import React, { PropTypes } from 'react'
import TableHeader from './table_header'
import Column from './column';
//import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';


const TableContent = ({table, onColumnClick, onFilterClick}) => (
		<table>
			<tbody>
			<tr>
				<td colSpan="3">{table.name}</td>
			</tr>
			<TableHeader />
			{table.columns.map(column =>
					<Column key={column.name} tableName={table.name} column={column} onColumnClick={onColumnClick} onFilterClick={onFilterClick}/>
			)}
			</tbody>
		</table>
)

export default TableContent