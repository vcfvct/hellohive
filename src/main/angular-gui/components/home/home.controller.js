/**
 * Created with IntelliJ IDEA.
 * User: liha
 * Date: 7/27/16
 * Time: 5:07 PM
 */
export default class HomeController {
	constructor($scope, $http, $uibModal) {
		this.$http = $http;
		this.$scope = $scope;
		this.$uibModal = $uibModal;
		this.allHqls();
		this.params = [];
	}


	allHqls() {
		this.$http.get('/rest/hql/all', {cache: true}).then(
				(res) => {
					this.hqls = res.data;
				}
		);
	}

	querySelected(name) {
		this.currentName = name;
		this.selectedQuery = this.hqls[name];
		this.params = getParams(this.selectedQuery);
	}

	submitQuery() {
		let fullQuery = this.selectedQuery;
		this.paramsObject = {};
		this.params.forEach(param => {
			this.paramsObject[param.key] = param.value;
			fullQuery = fullQuery.replace(param.match, param.value);
		});
		var modalInstance = this.$uibModal.open({
			templateUrl: 'confirmModalContent.html',
			controller: 'ModalInstanceCtrl',
			resolve: {
				request: () => {
					return {"queryName": this.currentName, "queryDetail": fullQuery};
				}
			}
		});

		modalInstance.result.then(
				() => {
					let url = 'rest/hql/run/name/' + this.currentName;
					if(this.isAsync)
					{
						let isAsyncAction = this.isAsync ? 'async' : 'sync';
						url = url + '?type=' + isAsyncAction;
					}
					if(this.email)
					{
						url = url + '&email=' + this.email;
					}
					if(this.notifyUrl)
					{
						url = url + '&notifyUrl=' + this.notifyUrl;
					}

					this.$scope.$emit('LOAD');
					this.$http({
						method: 'POST',
						url: url,
						data: this.paramsObject
					}).then(
							(response) => {
								this.$scope.$emit('UNLOAD');
								this.queryResult = response.data;
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
		console.log(fullQuery);
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

function getParams(str) {
	var arr = [];
	//match our ${...}
	str.replace(/\${([^}]+)}/g, function (m, remaining, index) {
		//arr.push({ match: m, remainder: remaining, index: index });
		arr.push({key: remaining, value: "", match: m});
	});
	return arr;
}

HomeController.$inject = ['$scope', '$http', '$uibModal'];


