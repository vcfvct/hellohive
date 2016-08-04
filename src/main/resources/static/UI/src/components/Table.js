import React, { PropTypes } from 'react'
import TableHeader from './table_header'
import Column from './column'

const Table = ({table, onColumnClick, onFilterClick}) => (
	<table width="200px">
		<tbody>
			<tr><td colSpan="3">{table.name}</td></tr>
			<TableHeader />
			{table.columns.map(column =>
				<Column key={column.name} tableName={table.name} column={column} onColumnClick={onColumnClick} onFilterClick={onFilterClick} />
			)}
		</tbody>
	</table>
)

export default Table