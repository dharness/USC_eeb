//================================Routes===========================================//

module.exports = function(app) {

	//=============================== MANAGE BLOG POSTS ===========================================

	//give the user the blog posting page		// SECURE ++++++
	app.get('/admin', isAuthenticated, function(req, res) {
		res.render('admin.html')
	});

	//give the user the blog posting page
	app.get('/login', function(req, res) {
		res.render('login.html')
	});

	//get all entries
	app.get('/entries', function(req, res) {

		_db.collection('blogs').find().toArray(function(err, docs) { //return the blog entries as array
			res.send(docs);
		});
	});

	//use this to check the current user		// SECURE ++++++
	app.post('/entry', isAuthenticated, function(req, res) {

		_db.collection('blogs').insert({
				'title': req.body.title,
				'content': req.body.content
			},
			function(err, result) {
				if (err)
					throw err
				if (result) {
					res.redirect('/admin');
				}
			})
	});

	app.post('/image', isAuthenticated, function() {		// SECURE ++++++
		var grid = new _Grid(_db, 'fs');
		var buffer = new Buffer("Hello world");

		grid.put(buffer, {
			metadata: {
				category: 'text'
			},
			content_type: 'text'
		}, function(err, fileInfo) {
			if (!err) {
				console.log("Finished writing file to Mongo");
			}
		});
	})
}