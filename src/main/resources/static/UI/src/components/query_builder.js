import React, { PropTypes } from 'react';
import {onRegisterClick} from '../actions';
import RaisedButton from 'material-ui/RaisedButton';
import RegisterFeedback from './RegisterFeedback';

const QueryBuilder = ({query, onRegisterClick, onCancelClick, onRegFeedbackDismiss}) => (
		<div>
			<RegisterFeedback queryName={query.queryName} queryContent={query.queryContent} showRegisterRs={query.showRegisterRs}
			                  onRegFeedbackDismiss={onRegFeedbackDismiss}/>

			<div style={{display:query.tables.length && query.columns.length ? 'block':'none'}}>

				{query.tables.length > 0 ?
						<h2> Query Builder </h2>
						:
						null
				}
			    <pre>
					{ query.columns.length > 0 ?
							<div>
								Select <br />

								{ query.columns.map((column, index) =>
										<div key={column}> &nbsp;&nbsp;&nbsp;&nbsp;{column} </div>
								)}
							</div>
							:
							null
					}

				    { query.tables.length > 0 ?
						    <div>
							    From <br />

							    { query.tables.map((table, index) =>
									    <div key={table}> &nbsp;&nbsp;&nbsp;&nbsp;{table} </div>
							    )}
						    </div>
						    :
						    null
				    }

				    { query.filters.length > 0 ?
						    <div>
							    Where <br />

							    { query.filters.map(filter =>
									    <div key={filter}> &nbsp;&nbsp;&nbsp;&nbsp;{filter} = {"${"}{filter}{"}"} </div>
							    )}
						    </div>
						    :
						    null
				    }
			    </pre>
				{query.tables.length > 0 ?
						<div style={{margin:'10px', float: 'right'}}>
							<RaisedButton label="Register" primary={true} style={{marginRight:'10px'}}
							              onClick={() => onRegisterClick(query.columns, query.tables, query.filters) }/>
							<RaisedButton label="Cancel" onClick={() => onCancelClick(query.tables)}/>
						</div>
						:
						null
				}
			</div>
		</div>
);

export default QueryBuilder