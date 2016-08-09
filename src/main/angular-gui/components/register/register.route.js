export default function routes($routeProvider) {
	$routeProvider
			.when('/register', {
				template: require('./register.html'),
				controller: 'registerCtrl',
				controllerAs: 'vm'
			});
}

routes.$inject = ['$routeProvider'];
