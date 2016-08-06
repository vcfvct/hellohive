import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import createathonApp from './reducers'
import App from './components';
import 'whatwg-fetch';
import {appInitActionCreator} from './actions';

let store = createStore(createathonApp);

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
			initTables[0].columns = columns.map(column => {
				return {name: column, type: 'string', selected: false, filter: false};
			});
			store.dispatch(appInitActionCreator(initTables))
		});

render(
		<Provider store={store}>
			<App />
		</Provider>,
		document.getElementById('app')
)