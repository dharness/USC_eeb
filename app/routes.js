//================================Routes===========================================//

module.exports = function(app) {

	//=============================== MANAGE BLOG POSTS ===========================================

	//get all entries
	app.get('/entries', function(req, res) {

		_db.collection('blogs').find().toArray(function(err, docs) { //return the blog entries as array
			console.log(docs)
			res.send(docs);
		});
	});

	//get all entries
	app.post('/login', function(req, res) {

		if(req.body.username == 'ryan' && req.body.password == 'holmes'){
			res.send(200)
		}

		// _db.collection('blogs').find().toArray(function(err, docs) { //return the blog entries as array
		// 	console.log(docs)
		// 	res.send(docs);
		// });
	});

	//use this to check the current user
	app.post('/entry', function(req, res) {

		_db.collection('blogs').insert({
				'title': req.body.title,
				'content': req.body.content
			},
			function(err, result) {
				if (err)
					throw err
				if (result) {
					res.send(result)
				}
			})
	});

	app.post('/image', function() {
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