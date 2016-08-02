import React, { PropTypes } from 'react'

const Table = ({tables, onClick}) => (
	<div>
		{tables.map(table =>
			<div key={table.name} >
				<div onClick={() => onClick(table.name)}>{table.name} (Selected: {table.selected.toString()})</div>

				{table.columns.map(column =>
					<li key={column.name}>
						{column.name} (Selected: {column.selected.toString()})
					</li>
				)}

			</div>
		)}
	</div>
)

Table.propTypes = {
	tables: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired,
		selected: PropTypes.bool.isRequired,
		columns: PropTypes.arrayOf(PropTypes.shape({
			name: PropTypes.string.isRequired,
			selected: PropTypes.bool.isRequired
		}).isRequired).isRequired
	}).isRequired).isRequired,
	onClick: PropTypes.func.isRequired
}

export default Table
