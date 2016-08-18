import React, { PropTypes } from 'react';
import Toggle from 'material-ui/Toggle';
import {TableRow, TableRowColumn} from 'material-ui/Table';

export default class Column extends React.Component {
	static propTypes = {
		tableName: PropTypes.string,
		column: PropTypes.object,
		onColumnClick: PropTypes.func.isRequired,
		onFilterClick: PropTypes.func.isRequired
	};

	render() {
		let column = this.props.column;
		return (
				<TableRow key={column.name}>
					<TableRowColumn>
						<Toggle label={column.name} toggled={column.selected}
						        onToggle={() => this.props.onColumnClick(this.props.tableName, column.name, !column.selected)}
						        labelPosition="right"/>
					</TableRowColumn>
					<TableRowColumn>{column.type}</TableRowColumn>
					<TableRowColumn>
						<Toggle toggled={column.filter} onToggle={() => this.props.onFilterClick(this.props.tableName, column.name, !column.filter)}/>
					</TableRowColumn>
				</TableRow>
		)
	}
}
