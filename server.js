
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
*
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






app.listen(port, function () {

    console.log("Server started on port " + port);

});