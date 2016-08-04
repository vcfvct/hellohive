import React, { PropTypes } from 'react'

const QueryBuilder = ({query}) => (
	<div>
		<div> Query Builder </div>

		Select <br />
	
		{ query.columns.map((column, index) => 
			<div key={column}> &nbsp;&nbsp;&nbsp;&nbsp;{column} </div> 
		)}

		From <br />

		{ query.tables.map((table, index) => 
			<div key={table}> &nbsp;&nbsp;&nbsp;&nbsp;{table} </div> 
		)}

		Where <br />

		{ query.filters.map((filter, index) => 
			<div key={filter}> &nbsp;&nbsp;&nbsp;&nbsp;{filter} = ?</div> 
		)}

	</div>
)

export default QueryBuilder