import React from 'react'
import DBTableColumns from './columns';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class TableList extends React.Component {
	render() {
		var targetTable = this.props.tables.find((table)=> table.name === this.props.currentTable);

		return <div>
			<SelectField floatingLabelText="All Tables"
			             value={this.props.currentTable}
			             onChange={(e) => this.props.onTableClick(e.target.outerText, this.props.tables)}>
				{this.props.tables.map(table =>
						<MenuItem key={table.name} value={table.name} primaryText={table.name}/>
				)}
			</SelectField>

			{targetTable ?
					<div key={targetTable.name}>
						<DBTableColumns tableModel={targetTable} onColumnClick={this.props.onColumnClick} onFilterClick={this.props.onFilterClick}/>
					</div> : null
			}
		</div>;
	}
}