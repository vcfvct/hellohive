/**
 * Created with IntelliJ IDEA.
 * User: liha
 * Date: 8/17/16
 * Time: 4:27 PM
 */
import React from 'react'
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';


export default class RegisterFeedback extends React.Component {
	handleClose(){
		this.props.onRegFeedbackDismiss();
	}

	render(){
		const actions = [
			<FlatButton
					label="OK"
					primary={true}
					onTouchTap={this.handleClose.bind(this)}
			/>
		];

		return (
		   <Dialog title="Query successfully registered"
		           actions={actions}
		           modal={false}
		           open={this.props.showRegisterRs}
		           onRequestClose={this.handleClose.bind(this)}>
			   <div>Registered Query Name: <b>{this.props.queryName}</b></div>
			   <p>{this.props.queryContent}</p>
		   </Dialog>
		);
	}
}