 var myapp = angular.module('myapp', ['ngRoute']);

 myapp.config(function($routeProvider) {
	$routeProvider

	// home page
	.when('/', {
		templateUrl: 'pages/landing.html',
		controller: 'mainController'
	})

	//signup page
	.when('/blog', {
		templateUrl: 'pages/blog.html',
		controller: 'blogController'
	});
});