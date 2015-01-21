myapp.controller('mainController', function($scope, $location, $anchorScroll, $http) {


	// ============================ Handle Scrolling ============================

	$scope.scrollTo = function(id) {
		$location.hash(id);
		console.log($location.hash());
		$anchorScroll();
	};

	// ============================ Handle Blog Entries ============================
	var bm = new BlogManager($http)

	// Handle all the blog entries inside this callback, res is an array of entries
	bm.getEntries(function (res) {
		console.log(res[0].title)
		console.log(res[0].content)
	})

});