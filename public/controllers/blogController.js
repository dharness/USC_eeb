myapp.controller('blogController', function($scope, $http) {

	var bm = new BlogManager($http)

	$scope.submitPost = function() {
		
		bm.pushEntry ( {
			'title': $scope.entry.title,
			'content': $scope.entry.content
		})

		$scope.entry.title = ""
		$scope.entry.content = ""
	}

});