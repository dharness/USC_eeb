myapp.controller('adminController', function($scope, $http, $location) {
	var bm = new BlogManager($http)

	$scope.submit = function() {
		bm.login($scope.user, function(res) {
			$location.path("/blog");
		})
	}
})