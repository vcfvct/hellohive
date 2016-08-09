export default function routes($routeProvider) {
	$routeProvider
			.when('/home', {
				template: require('./home.html'),
				controller: 'homeCtrl',
				controllerAs: 'vm'
			});
}

routes.$inject = ['$routeProvider'];
