myapp.controller('blogController', function($scope, $http) {

	$scope.submitPost = function() {

		bm.pushEntry({
			'title': $scope.entry.title,
			'content': $scope.entry.content
		})

		$scope.entry.title = ""
		$scope.entry.content = ""
	}


function previewFile() {
	var preview = document.querySelector('img'); //selects the query named img
	var file = document.querySelector('input[type=file]').files[0]; //sames as here
	var reader = new FileReader();

	reader.onloadend = function() {
		preview.src = reader.result
		bm.pushImage(reader.result)
	}

	if (file) {
		reader.readAsDataURL(file); //reads the data as a URL
		reader.readAsDataURL(this.files[0]);
	} else {
		preview.src = "";
	}
}

previewFile();

});
