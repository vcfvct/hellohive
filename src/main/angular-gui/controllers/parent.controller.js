class ParentCtrl {
	constructor($scope){
		//spinner
		$scope.$on('LOAD', function () {
			$scope.loading = true;
		});
		$scope.$on('UNLOAD', function () {
			$scope.loading = false;
		});
	}
}

ParentCtrl.$inject = ['$scope'];

export default ParentCtrl;
