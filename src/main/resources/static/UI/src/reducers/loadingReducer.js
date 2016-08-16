import {LOAD, UNLOAD} from '../actions';

const initState = UNLOAD;


export function loadingReducer(state = initState, action) {

	switch (action.type) {
		case LOAD: {
			return LOAD;
		}
		case UNLOAD: {
			return UNLOAD;
		}
		default:
			return state
	}

}


