myapp.controller('mainController', function($scope, $location, $anchorScroll, $http) {


	// ============================ Handle Scrolling ============================

	$scope.scrollTo = function(id) {
		$location.hash(id);
		$anchorScroll();
	};

	// ============================ Handle Blog Entries ============================
	var bm = new BlogManager($http)

	// Handle all the blog entries inside this callback, res is an array of entries
	bm.getEntries(function(res) {
		var s = "";
		var count = 0;

		changeArticle(res[0])
		//injection from database
		$.each(res, function(i, e) {
			s += makeStringPreview(this, i);
			console.log(i);
			count ++;
		});

		$.each(res, function(i, e) {
			$(document).on('click', '#readMore' + i, function(e) {
				changeArticle(res[i]);
			});
		});

		$('#articlePreview').html(s);
		$('#blogNum').html(count.toString());
		//$('#fullArticle').html(somestring);
	})
});

function makeStringPreview(entry, index) {
	var strVar = "";
	strVar += "<div class = 'row'>"
	strVar += "<div class ='col-xs-4'>";
	strVar += " <img src='" + entry.image + "' class='img-responsive' alt='Responsive image'>";
	strVar += " <\/div>";
	strVar += "	<div class='col-xs-8'>";
	strVar += "	<h4>" + entry.title + "<\/h4>";
	strVar += " <p style = 'font-size:16px; overflow: hidden; text-overflow: ellipsis; -o-text-overflow: ellipsis; white-space: nowrap; width: 100%;'>" + entry.content + "<\/p>";
	strVar += "	<button type='button' class='btn btn-default' id = 'readMore" + index + "'>Read More<\/button>";
	strVar += " <\/div>";
	strVar += "<\/div>"
	strVar += "<br>"

	return strVar;
}

function changeArticle(entry) {
	$('#fullTitle').html(entry.title);
	$('#fullContent').html(entry.content);
	$('#blogHeader').html("By: " + entry.author + " on " + entry.date);
}