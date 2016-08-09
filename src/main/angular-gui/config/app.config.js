/**
 * Created with IntelliJ IDEA.
 * User: liha
 * Date: 7/27/16
 * Time: 4:03 PM
 */
config.$inject = ['$routeProvider'];

export default function config($routeProvider) {
	$routeProvider.otherwise({redirectTo: 'home'});
}

