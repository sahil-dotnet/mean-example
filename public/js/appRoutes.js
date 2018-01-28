angular.module('SearchWebApp', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		.when('/searched_keywords', {
			templateUrl: 'views/nerd.html',
			controller: 'SearchController'
		})		

	$locationProvider.html5Mode(true);

}]);