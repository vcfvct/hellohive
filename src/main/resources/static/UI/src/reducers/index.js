import { combineReducers } from 'redux'
import { tablesModel } from './tables'
import { builder } from './builder'

const createathonApp = combineReducers({
	tablesModel, builder
});

export default createathonApp