
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Express' });
};

exports.hello = function(req, res){
  res.render('hello', { title: 'Hello'   });
};

exports.userlist = function(db) {
    return function(req, res) {
        var collection = db.get('usercollection');
        collection.find({},{}, function(e, docs){
            res.render('userlist', {
                'userlist' : docs
            });
        });
    };
};

exports.newuser = function(req, res) {
    res.render('newuser', { title: 'Add new User' });
};

exports.adduser = function(db) {
    return function(req, res) {
        //get our form values. these rely on the 'name' attributes
        var userName  = req.body.username;
        var userEmail = req.body.useremail;
        
        //set our collection
        var collection = db.get('usercollection');
        
        //submit to the DB
        collection.insert({
            "username" : userName,
            "email"    : userEmail
        }, function(err, doc) {
            if (err) {
                //if failed, return error
                res.send("there was a problem add to the database");
            }
            else {
                //if it worked, set the header so the address bar still doesn't say /adduser
                res.location("userlist");
                // and forward to sucess page
                res.redirect("userlist");
            }
        });
    };
};