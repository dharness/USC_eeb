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

BlogManager.prototype.pushImage = function(image) {

	this.$http.post("/image", image).success(function(res) {
		console.log(res)
	})
}

BlogManager.prototype.login = function(user, handleLogin) {

	console.log(user)

	this.$http.post("/login", user).success(function(res) {
		handleLogin(res)
	})
}