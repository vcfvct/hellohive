/**
 * Created with IntelliJ IDEA.
 * User: liha
 * Date: 7/27/16
 * Time: 5:01 PM
 */
import ngRoute from 'angular-route';

import routing from './home.route';
import HomeController from './home.controller';

export default angular.module('Home', [ngRoute])
		.config(routing)
		.controller('homeCtrl', HomeController)
		.name;