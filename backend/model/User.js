var mysql = require('mysql');

var db = mysql.createConnection({
    host: "localhost",
    user: "",
    password: ""
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});