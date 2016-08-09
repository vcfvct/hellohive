/**
 * Created with IntelliJ IDEA.
 * User: liha
 * Date: 7/27/16
 * Time: 5:07 PM
 */
export default class RegisterController {
	constructor($http) {
		this.$http = $http;
		this.newQuery = "";
	}



	addQuery()
	{
		console.log(this.newQuery);
	}
}


