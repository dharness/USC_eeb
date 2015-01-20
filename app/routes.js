//================================Routes===========================================//

module.exports = function(app) {

    //=============================== DUMMY ===========================================

    //use this to check the current user
    app.get('/DUMMY', function(req, res) {
        res.send(currentUser);
    });
}