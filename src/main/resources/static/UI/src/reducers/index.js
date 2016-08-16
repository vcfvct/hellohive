import { combineReducers } from 'redux'
import { tablesModel } from './tables'
import { builder } from './builder'
import { loadingReducer } from './loadingReducer'

const createathonApp = combineReducers({
	tablesModel,
	builder,
	isLoading: loadingReducer
});

export default createathonApp