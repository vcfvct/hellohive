/**
 * Created with IntelliJ IDEA.
 * User: liha
 * Date: 7/27/16
 * Time: 5:07 PM
 */
export default class RegisterController {
	constructor($scope ,$http, $uibModal) {
		this.$http = $http;
		this.$scope = $scope;
		this.newQuery = "";
		this.queryName = "";
		this.$uibModal = $uibModal;
	}



	addQuery()
	{
		if (this.newQueryForm.$valid) {
			try {
				var modalInstance = this.$uibModal.open({
					templateUrl: 'confirmModalContent.html',
					controller: 'ModalInstanceCtrl',
					resolve: {
						request: () => {
							return {"queryName": this.queryName, "queryDetail": this.newQuery};
						}
					}
				});
				modalInstance.result.then(
						() => {
							this.$scope.$emit('LOAD');
							this.$http({
								method: 'POST',
								url: 'rest/hql/register/name/' + this.queryName,
								data: this.newQuery
							}).then(
									(response) => {
										this.$scope.$emit('UNLOAD');
										this.modalAlert(response);
									},
									(err) => {
										this.$scope.$emit('UNLOAD');
										if (err.data && err.data.length > 100) {
											err.data = err.data.substring(0, 97) + '...';
										}
										this.modalAlert(err);
									});
						},
						() => {
							//dismiss: do nothing for now
							console.log('Modal dismissed at: ' + new Date());
						});
			}
			catch (e) {
				this.modalAlert('Error: ' + e.message);
			}
		}
	}

	modalAlert(msg) {
		this.$uibModal.open({
			templateUrl: 'alertModalContent.html',
			controller: 'ModalInstanceCtrl',
			resolve: {
				request: () => {
					return {"message": msg};
				}
			}
		});
	}
}

RegisterController.$inject = ['$scope', '$http', '$uibModal'];



