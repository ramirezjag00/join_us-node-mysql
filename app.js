const express = require('express');
const mysql = require('mysql');
const bodyParser  = require("body-parser");
const app = express();

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

//MYSQL CONFIG
//cd into project_directory then open mysql_cli then source schema.sql
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'join_us',
  password: 'Your_Password_Here'
});

app.get("/", (req, res) => {
    // Find count of users in DB
    const q = "SELECT COUNT(*) AS count FROM users";
    connection.query(q, function(err, results){
        if(err) throw err;
        const count = results[0].count; 
        res.render("home", {count: count});
    });
});

app.post("/register", (req, res) => {
    const person = {
        email: req.body.email
    };
    connection.query('INSERT INTO users SET ?', person, function(err, result) {
        if (err) throw err;
        res.redirect("/");
    });
});

const PORT = process.env.PORT || 5000;
//SERVER
app.listen(PORT, process.env.IP, () => {
    console.log("JOIN US SERVER STARTED at PORT " + PORT);
});