/**
 * Created by LeOn on 8/9/16.
 */

export default function navBar($location){
    'use strict';

    return {
        templateUrl: 'directives/navbar/navBar.html',
        restrict: 'AE', //match element or attribute
        transclude: true,
        replace: true,
        scope: true,
        link: function(scope, element, attrs, ctrl) {
            scope.isActive = function (viewLocation) {
                return viewLocation === $location.path();
            };

            scope.logout = function () {
                scope.$emit('UserLogout');
                $location.path("/home");
            };
        }
    };
}

navBar.$inject = ['$location'];

