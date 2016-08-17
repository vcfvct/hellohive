import React, { PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';
import {TableRow, TableRowColumn} from 'material-ui/Table';


const Column = ({tableName, column, onColumnClick, onFilterClick}) => (

		<TableRow key={column.name}>
			<TableRowColumn>
				<Toggle label={column.name} toggled={column.selected} onToggle={() => onColumnClick(tableName, column.name, !column.selected)} labelPosition="right"/>
			</TableRowColumn>
			<TableRowColumn>{column.type}</TableRowColumn>
			<TableRowColumn>
				<Toggle toggled={column.filter} onToggle={() => onFilterClick(tableName, column.name, !column.filter)}/>
			</TableRowColumn>
		</TableRow>
);

export default Column