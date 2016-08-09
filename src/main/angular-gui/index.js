import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-material-design/dist/css/material.min.css';
import 'components-font-awesome/css/font-awesome.min.css';
import './css/hm.css';
import './css/animations.css';

import 'jquery';
import 'bootstrap';
import angular from 'angular';
import ngAnimate from 'angular-animate';

import config from './config/app.config';
//import services from './services';
import directives from './directives';
import controllers from './controllers';

import homeModule from './components/home';
import registerModule from './components/register';


angular.module('BeeDrillApp', [ngAnimate, homeModule, registerModule, directives, controllers])
		.config(config);