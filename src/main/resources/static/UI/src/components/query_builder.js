import React, { PropTypes } from 'react';
import Divider from 'material-ui/Divider';
import RaisedButton from 'material-ui/RaisedButton';
import RegisterFeedback from './RegisterFeedback';

export default class QueryBuilder extends React.Component {
	propTypes = {
		query: PropTypes.object,
		onRegFeedbackDismiss: PropTypes.func.isRequired,
		onRegisterClick: PropTypes.func.isRequired,
		onCancelClick: PropTypes.func.isRequired
	};

	render() {
		let query = this.props.query;
		return (
				<div>
					<RegisterFeedback queryName={query.queryName} queryContent={query.queryContent} showRegisterRs={query.showRegisterRs}
					                  onRegFeedbackDismiss={this.props.onRegFeedbackDismiss}/>

					<div style={{display:query.tables.length && query.columns.length ? 'block':'none'}}>

						{query.tables.length > 0 ?
								<h2> Query Builder </h2>
								:
								null
						}
						<Divider />
			    <pre>
					{ query.columns.length > 0 ?
							<div>
								Select <br />

								{ query.columns.map((column) =>
										<div key={column}> &nbsp;&nbsp;&nbsp;&nbsp;{column} </div>
								)}
							</div>
							:
							null
					}

				    { query.tables.length > 0 ?
						    <div>
							    From <br />

							    { query.tables.map((table) =>
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
									              onClick={() => this.props.onRegisterClick(query.columns, query.tables, query.filters) }/>
									<RaisedButton label="Cancel" onClick={() => this.props.onCancelClick(query.tables)}/>
								</div>
								:
								null
						}
					</div>
				</div>
		)
	}
}