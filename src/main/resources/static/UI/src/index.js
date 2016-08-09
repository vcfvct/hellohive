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
	let initTables = {};


	fetch('/rest/hivemeta/tables')
			.then((response) => {
				return response.json();
			})
			.then((tables) => {
				let tableArray = tables.map((tableName, index) => {
					return {
						name: tableName, show: index === 0, abbrev: tableName,
						columns: []
					}
				});
				initTables.tables = tableArray;
				initTables.currentTable = tableArray[0].name;
				return fetch('/rest/hivemeta/table/' + initTables.currentTable);
			})
			.then(response => {
				return response.json();
			})
			.then(columns => {
				initTables.tables[0].columns = Object.keys(columns).map(columnName => {
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