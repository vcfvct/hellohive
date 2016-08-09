/**
 * Created with IntelliJ IDEA.
 * User: liha
 * Date: 7/27/16
 * Time: 5:01 PM
 */
import ngRoute from 'angular-route';

import routing from './register.route.js';
import registerController from './register.controller.js';

export default angular.module('Register', [ngRoute])
		.config(routing)
		.controller('registerCtrl', registerController)
		.name;