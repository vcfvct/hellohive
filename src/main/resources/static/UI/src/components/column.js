import React, { PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';

const Column = ({tableName, column, onColumnClick, onFilterClick}) => (

		<tr key={column.name}>
			<td><Toggle label= {column.name} toggled={column.selected} onToggle={() => onColumnClick(tableName, column.name)} labelPosition="right"/></td>
			<td>{column.type}</td>
			<td><Toggle toggled={column.filter} onToggle={() => onFilterClick(tableName, column.name)}/></td>
		</tr>
)

export default Column