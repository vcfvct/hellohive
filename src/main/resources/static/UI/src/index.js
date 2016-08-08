import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import createathonApp from './reducers';
import App from './components';
import 'whatwg-fetch';
import {appInitActionCreator} from './actions';

let store = createStore(createathonApp);

~function init() {
	let initTables = [];

	fetch('/rest/hivemeta/tables')
			.then((response) => {
				return response.json();
			})
			.then((tables) => {
				initTables = tables.map((tableName, index) => {
					return {
						name: tableName, show: index === 0, abbrev: tableName,
						columns: []
					}
				});
				return fetch('/rest/hivemeta/table/' + initTables[0].name);
			})
			.then(response => {
				return response.json();
			})
			.then(columns => {
				initTables[0].columns = Object.keys(columns).map(columnName => {
					return {name: columnName, type: columns[columnName], selected: false, filter: false};
				});
				store.dispatch(appInitActionCreator(initTables))
			});
}();

render(
		<MuiThemeProvider>
			<Provider store={store}>
				<App />
			</Provider>
		</MuiThemeProvider>,
		document.getElementById('app')
);