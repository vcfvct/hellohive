import React, { PropTypes } from 'react'
import DBTableColumns from './columns';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


export default class TableList extends React.Component {
	propTypes = {
		currentTable: PropTypes.string,
		tables: PropTypes.object,
		onTableClick: PropTypes.func.isRequired,
		onColumnClick: PropTypes.func.isRequired,
		onFilterClick: PropTypes.func.isRequired
	};

	render() {
		var targetTable = this.props.tables[this.props.currentTable];

		return <div>
			<SelectField floatingLabelText="All Tables"
			             value={this.props.currentTable}
			             onChange={(e) => this.props.onTableClick(this.props.tables[e.target.outerText])}
			             style={{width:'360px'}}>
				{Object.keys(this.props.tables).map(table =>
						<MenuItem key={table} value={table} primaryText={table}/>
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