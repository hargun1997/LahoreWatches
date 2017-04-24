
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var bodyParser = require('body-parser');
var path = require('path');
var db = require('./dbhandler');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(__dirname + '/public_html'));

var fs = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads'});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}));
app.use('/', express.static('public_html'));
app.post('/upload', upload.single('file'), function(req, res) {
    console.log(req.file);
    var file = __dirname + '/uploads/' + 'image.png';
    fs.rename(req.file.path, file, function(err) {
        if (err) {
            console.log(err);
            res.send(500);
        } else {
            res.redirect('/');
        }
    });
});

app.post('/new-user',function (req,res) {
    console.log("User Code");
    console.log(req.body);
    db.new_user(req.body,function (result) {
        res.end();
    });
});

app.post('/add_watch_details',function (req,res) {
    db.add_watch_details(req.body,function (result) {
        res.end();
    })
});



app.post('/FetchFromId', function (req, res) {


    console.log("Fetch from id called");

    db.GetFromID(req.body.id, function (docs) {

        console.log("Sending Result");
        console.log(docs);
        res.send({docs : docs});

    });

});


app.post('/getcart', function (req, res) {

    db.GetCart(req.body.cart, function (docs) {

        res.send({docs : docs});

    });


});


app.post('/filteredData', function (req, res) {

    console.log(req.body.obj);
    var o = JSON.parse(req.body.obj);

    console.log(o);

    db.filteredData(o,function (docs) {

        res.send({docs : docs});

    });

});



app.post('/all-products', function (req, res) {

    db.AllProducts(function (docs) {

        res.send({docs : docs});

    });

});

app.post('/distinct-brands', function (req, res) {

    db.DistinctBrands(function (docs) {

        res.send({docs : docs});

    });

});

app.post('/PostOrder', function (req, res) {

    db.InsertOrder(req.body, function (result) {

        console.log("Result is");
        console.log(result);
        res.send({result : result});

    });


});

app.post('/getOrders', function(req,res){

    db.GetOrders(function (docs) {
        console.log(docs);
        res.send({docs : docs});

    });

});

/*
* This function takes in request object the order id and the new status
*{
* id : id
* status : newStatus
* }
* Will update the status of the order. Make sure the order id is correct.
* */
app.post('/updateStatus', function (req, res) {

    db.UpdateStatus(req.body.id, req.body.status, function (result) {

        res.send({result : result});

    });

});

app.post('/upload', upload.single('file'), function(req, res) {
    console.log(req.file);
    var file = __dirname + '/uploads/' + 'image.png';
    fs.rename(req.file.path, file, function(err) {
        if (err) {
            console.log(err);
            res.send(500);
        } else {
            res.redirect('/');
        }
    });
});


/*
* User Functions.
* Schema:
* The user scheme is as follows:
 * 'uid':
 'name':
 'email' :
 'photo' :
 'phone_number'
 'address':
 *
* */

/*
* Send an object in post request of the form { email : "email" } and the function will return you all the details of the user if it exists; Otherwise it returns an empty array in user field. Phone number and address fields may be empty. You will also all the orders booked by the user. The result object is like the following
* {
*
* user : {
*'uid':
 'name':
 'email' :
 'photo' :
 'phone_number'
 'address':
 orders : [ An array of details of all orders ]
*
* }
 }
* */
app.post('/get-user', function (req, res) {


    db.GetUser(req.body.email, function (result) {
       console.log(req.body);
       console.log("User is ");
       console.log(result);
        res.send({user : result});

    });

});


/*
* This function takes an object of the form { email : email, update : {}  }
* The update field will contain the updated items. For example if the address and phone is updated by the user, then this function will receive update object as
* update : { address : newAddress , phone_number : newPhoneNumber   }
*
*
*
* The user scheme is as follows:
* 'uid':obj.uid,
 'name':obj.displayName,
 'email' : obj.email,
 'photo' : obj.photoURL,
 'phone_number':'',
 'address':''
*
* */
// Tested
app.post('/update-user', function (req, res) {

    console.log(req.body);
    db.UpdateUser(req.body.email, req.body.update, function (result) {

        console.log(result);
        res.send({result : result});

    });
});



app.listen(port, function () {

    console.log("Server started on port " + port);

});