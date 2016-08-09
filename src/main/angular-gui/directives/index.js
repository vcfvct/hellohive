import angular from 'angular';
import uiBootstrap from 'angular-ui-bootstrap';

import loadingBar from './loadingbar';
import navBar from './navBar';

export default angular.module('FinraHostsDirectives',[uiBootstrap])
		.directive('loadingBar', loadingBar)
		.directive('navBar', navBar)
		.name;