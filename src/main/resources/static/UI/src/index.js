import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import {applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import promise from 'redux-promise-middleware';

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import createathonApp from './reducers';
import App from './components';
import {fetchTables, fetchColumns} from './actions'


/*const logger = (store) => (next) => (action) => {
 console.log('action fired', action);
 next(action);
 };*/
const middleware = applyMiddleware(promise(), thunk, logger());
let store = createStore(createathonApp, middleware);

~function init() {
	let fetchTablesAction = fetchTables();
	store.dispatch(fetchTablesAction);
	fetchTablesAction.payload.then((rs) => {
		store.dispatch(fetchColumns(rs.data[0]));
	})
}();

render(
		<MuiThemeProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</MuiThemeProvider>,
		document.getElementById('app')
);