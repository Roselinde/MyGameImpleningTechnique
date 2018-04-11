
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

app.get('/user/add/user', function (req, res) {
    
    var name = req.query.name;
    var password = req.query.pass;

    var user = [[name,password]];

    /*
   var user = [
        ['Aa','456789'],
        ['Bb','456789'],
        ['Cc','456789']
   ];
   */

    InsertUser(user,function(err,result){
        res.end(result)
    }); 
});



app.get('/allusers', function (req, res) {
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

function InsertUser(user,callback) {

    var sql = 'INSERT INTO user(name,password) values ?';

    connection.query(sql,[user],
        function (err) {

            var result = '[{"success":"true"}]'

            if (err){
                result = '[{"success":"false"}]'
                throw err;

            }

            callback(null, result);
        });
}