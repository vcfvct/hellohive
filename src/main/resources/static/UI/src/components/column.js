import React, { PropTypes } from 'react'

const Column = ({tableName, column, onColumnClick, onFilterClick}) => (
	<tr key={column.name}>
		<td><input type="checkbox" checked={column.selected} onChange={() => onColumnClick(tableName, column.name)}/> {column.name} </td>
		<td>{column.type}</td>
		<td><input type="checkbox" checked={column.filter} onChange={() => onFilterClick(tableName, column.name)} /> </td>
	</tr>
)

export default Column