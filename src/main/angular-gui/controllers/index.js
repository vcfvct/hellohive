/**
 * Created with IntelliJ IDEA.
 * User: liha
 * Date: 7/13/16
 * Time: 11:38 AM
 */

import angular from 'angular';
import parentCtrl from './parent.controller.js';
import ModalInstanceCtrl from './modal.controller.js';

export default angular.module('BeeDrillController', [])
		.controller('ModalInstanceCtrl', ModalInstanceCtrl)
		.controller('parentCtrl', parentCtrl)
		.name;