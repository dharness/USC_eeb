function BlogManager($http) {
	this.$http = $http
}

BlogManager.prototype.pushEntry = function(entry) {

	this.$http.post("/entry", entry).success(function(res) {
		if (res)
			alert('Post successful!')
	})
}


BlogManager.prototype.getEntries = function(handleEntries) {

	this.$http.get("/entries").success(function(res) {
		handleEntries(res)
	})
}