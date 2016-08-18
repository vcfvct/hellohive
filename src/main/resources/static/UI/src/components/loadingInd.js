/**
 * Created with IntelliJ IDEA.
 * User: liha
 * Date: 8/16/16
 * Time: 4:26 PM
 */
import React, { PropTypes } from 'react'
import RefreshIndicator from 'material-ui/RefreshIndicator';
import { connect } from 'react-redux'
import {LOAD} from '../actions';

const style = {
	refresh: {
		display: 'inline-block',
		position: 'relative',
		marginLeft: '50%'
	}

};

@connect((state) => {
	return {
		isLoading: state.isLoading
	}
})
export default class LoadingIndicator extends React.Component {
	propTypes = {
		isLoading: PropTypes.string,
	};

	render() {
		return (
				<div className='modal' style={{display:this.props.isLoading === LOAD ? 'block':'none'}}>
					<div>
						<RefreshIndicator
								size={50}
								left={-20}
								top={200}
								status='loading'
								style={style.refresh}
						/>
					</div>
				</div>);
	}
}
