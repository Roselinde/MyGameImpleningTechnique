
var express = require('express');
var app = express();
var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Cgm123456*',
    database: 'game1'
});

connection.connect(function (err) {
    if (err) {
        console.log('Error Connecting', err.stack);
        return;
    }
    console.log('Connected as id', connection.threadId);

});



app.get('/users', function (req, res) {
    //res.end('hello');

    queryAllUser(function(err,result){
        res.end(result);
    });
});

app.get('/user/:name', function (req, res) {

    var name = req.params.name;
    console.log(name);

    /*
    queryUser(function(err,result){
        res.end(result);
    });
    */
});


var server = app.listen(8081, function () {
    console.log('Server: Running');
});

function queryAllUser(callback) {

    var json = '';
    connection.query('SELECT * FROM user',
        function (err, rows, fields) {
            if (err) throw err;

            json = JSON.stringify(rows);

            callback(null, json);
        });
}

function queryUser(callback) {

    var json = '';
    connection.query("SELECT * FROM user WHERE name ='Sumeth'",
        function (err, rows, fields) {
            if (err) throw err;

            json = JSON.stringify(rows);

            callback(null, json);
        });
}