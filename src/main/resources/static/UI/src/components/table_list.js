import React, { PropTypes } from 'react'
import Table from './table'

const TableList = ({tables, onTableClick, onColumnClick, onFilterClick}) => (
	<div>
		<select onChange={(e) => onTableClick(e.target.value)}>
			{tables.map(table =>
				<option key={table.name}> {table.name} </option>
			)}
		</select>

		{tables.map(table =>
			<div key={table.name}>
				{table.show ? <Table table={table} onColumnClick={onColumnClick} onFilterClick={onFilterClick} />: null}
			</div>	
		)}

	</div>
)

export default TableList