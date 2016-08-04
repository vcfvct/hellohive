import { combineReducers } from 'redux'
import { tables } from './tables'
import { builder } from './builder'

const createathonApp = combineReducers({
	tables, builder
})

export default createathonApp