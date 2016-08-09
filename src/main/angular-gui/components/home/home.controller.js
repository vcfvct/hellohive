/**
 * Created with IntelliJ IDEA.
 * User: liha
 * Date: 7/27/16
 * Time: 5:07 PM
 */
export default class HomeController {
	constructor($http) {
		this.$http = $http;
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
		this.selectedQuery = this.hqls[name];
		this.params = getParams(this.selectedQuery);
	}

	submitQuery()
	{
		let fullQuery = this.selectedQuery;
		this.params.forEach(param => {
			fullQuery = fullQuery.replace(param.match, param.value);
		});
		console.log(fullQuery);
	}
}

function getParams(str) {
	var arr = [];
	//match our ${...}
	str.replace(/\${([^}]+)}/g, function(m, remaining, index) {
		//arr.push({ match: m, remainder: remaining, index: index });
		arr.push({key:remaining, value:"", match: m});
	});
	return arr;
}

