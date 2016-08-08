import React from 'react'
import Table from './table';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

const TableList = ({tables, onTableClick, onColumnClick, onFilterClick}) => (
		<div>
			<SelectField onChange={(e) => onTableClick(e.target.value)}>
				{tables.map(table =>
						<MenuItem key={table.name} value={table.name} primaryText={table.name} />
				)}
			</SelectField>

			{tables.map(table =>
					<div key={table.name}>
						{table.show ? <Table table={table} onColumnClick={onColumnClick} onFilterClick={onFilterClick}/> : null}
					</div>
			)}

		</div>
);

export default TableList