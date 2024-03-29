const mysql = require("mysql2");
const express = require("express");
const app = express();
app.use(express.json());
const fs = require("fs");
var str = "<table>";

app.use("/js", express.static("./public/js"));
app.use("/css", express.static("./public/css"));
app.use("/img", express.static("./public/img"));

app.get("/", function (req, res) {
    let doc = fs.readFileSync("./app/html/main.html", "utf8");
    res.send(doc);
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'assignment6'
})

connection.connect((err) => {
    if(err) throw err;
    console.log("MySQL DB Connected");
})

app.get("/rankings", function (req, res) {
    let doc = fs.readFileSync("./app/html/rankings.html", "utf8");
    res.send(doc);
});

app.get("/navbar", function(req, res) {
    let formatOfResponse = req.query["format"];
    if (formatOfResponse == "html") {
        res.setHeader("Content-Type", "text/html");
        res.send(fs.readFileSync("./app/data/navbar.html", "utf8"));
    }
});

app.get("/article_data", function(req, res) {
    let formatOfResponse = req.query["format"];
    if (formatOfResponse == "html") {
        res.setHeader("Content-Type", "text/html");
        res.send(fs.readFileSync("./app/data/article_data.html", "utf8"));
    } else if (formatOfResponse == "json") {
        let doc = fs.readFileSync("./app/data/article_data.json", "utf8");
        res.setHeader("Content-Type", "application/json");
        res.send(doc);
    } 
});

app.get("/footer", function(req, res) {
    let formatOfResponse = req.query["format"];
    if (formatOfResponse == "html") {
        res.setHeader("Content-Type", "text/html");
        res.send(fs.readFileSync("./app/data/footer.html", "utf8"));
    }
});

app.get("/ajax_ranking", function (req, res) {
    let doc = fs.readFileSync("./app/data/ranking_data.json", "utf8");
    let formatOfResponse = req.query["format"];
    if (formatOfResponse == "json") {
        let doc = fs.readFileSync("./app/data/ranking_data.json", "utf8");
        res.setHeader("Content-Type", "application/json");
        res.send(doc);
    } 
});

app.get("/innerjoin", (req, res) => {
    let sql = `SELECT * FROM A01380639_user INNER JOIN A01380639_user_timeline ON A01380639_user.A01380639_userID = A01380639_user_timeline.userId WHERE A01380639_user.user_name = 'vfung26'`;
    connection.query(sql, (err, data) => {
        if(err){
            res.json({err})
        } else {
            str += "<tr>"
                + "<th>Username</th>"
                + "<th>First Name</th>"
                + "<th>Last Name</th>"
                + "<th>Email</th>"
                + "<th>Date of Post</th>"
                + "<th>Post Text</th>"
                + "<th>Time</th>"
                + "<th>Views</th>"
                + "</tr>";
            for(let i = 0; i < data.length; i++) {
                let item = data[i];
                let date = new Date(item["date_of_post"]);
                let time = new Date(item["post_time"]);
                str += "<tr>"
                    + "<td>" + item["user_name"] + "</td>"
                    + "<td>" + item["first_name"] + "</td>"
                    + "<td>" + item["last_name"]+ "</td>"
                    + "<td>" + item["email_address"] + "</td>"
                    + "<td>" + date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + "</td>"
                    + "<td>" + item["post_text"] + "</td>"
                    + "<td>" + time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + "</td>"
                    + "<td>" + item["post_views"] + "</td>"
                    + "</tr>";
            }
        }
    })

    let sql2 = `SELECT * FROM A01380639_user INNER JOIN A01380639_user_timeline ON A01380639_user.A01380639_userID = A01380639_user_timeline.userId WHERE A01380639_user.user_name = 'kamald37'`;
    connection.query(sql2, (err, data) => {
        if(err){
            res.json({err})
        } else {
            for(let i = 0; i < data.length; i++) {
                let item = data[i];
                let date = new Date(item["date_of_post"]);
                let time = new Date(item["post_time"]);
                str += "<tr>"
                    + "<td>" + item["user_name"] + "</td>"
                    + "<td>" + item["first_name"] + "</td>"
                    + "<td>" + item["last_name"]+ "</td>"
                    + "<td>" + item["email_address"] + "</td>"
                    + "<td>" + date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + "</td>"
                    + "<td>" + item["post_text"] + "</td>"
                    + "<td>" + time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + "</td>"
                    + "<td>" + item["post_views"] + "</td>"
                    + "</tr>";
            }
        }
    })

    let sql3 = `SELECT * FROM A01380639_user INNER JOIN A01380639_user_timeline ON A01380639_user.A01380639_userID = A01380639_user_timeline.userId WHERE A01380639_user.user_name = 'jarodf48'`;
    connection.query(sql3, (err, data) => {
        if(err){
            res.json({err})
        } else {
            for(let i = 0; i < data.length; i++) {
                let item = data[i];
                let date = new Date(item["date_of_post"]);
                let time = new Date(item["post_time"]);
                str += "<tr>"
                    + "<td>" + item["user_name"] + "</td>"
                    + "<td>" + item["first_name"] + "</td>"
                    + "<td>" + item["last_name"]+ "</td>"
                    + "<td>" + item["email_address"] + "</td>"
                    + "<td>" + date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + "</td>"
                    + "<td>" + item["post_text"] + "</td>"
                    + "<td>" + time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + "</td>"
                    + "<td>" + item["post_views"] + "</td>"
                    + "</tr>";
            }
        }
    })

    let sql4 = `SELECT * FROM A01380639_user INNER JOIN A01380639_user_timeline ON A01380639_user.A01380639_userID = A01380639_user_timeline.userId WHERE A01380639_user.user_name = 'polinao59'`;
    connection.query(sql4, (err, data) => {
        if(err){
            res.json({err})
        } else {
            for(let i = 0; i < data.length; i++) {
                let item = data[i];
                let date = new Date(item["date_of_post"]);
                let time = new Date(item["post_time"]);
                str += "<tr>"
                    + "<td>" + item["user_name"] + "</td>"
                    + "<td>" + item["first_name"] + "</td>"
                    + "<td>" + item["last_name"]+ "</td>"
                    + "<td>" + item["email_address"] + "</td>"
                    + "<td>" + date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + "</td>"
                    + "<td>" + item["post_text"] + "</td>"
                    + "<td>" + time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + "</td>"
                    + "<td>" + item["post_views"] + "</td>"
                    + "</tr>";
            }
        }
    })

    let sql5 = `SELECT * FROM A01380639_user INNER JOIN A01380639_user_timeline ON A01380639_user.A01380639_userID = A01380639_user_timeline.userId WHERE A01380639_user.user_name = 'alexc15'`;
    connection.query(sql5, (err, data) => {
        if(err){
            res.json({err})
        } else {
            for(let i = 0; i < data.length; i++) {
                let item = data[i];
                let date = new Date(item["date_of_post"]);
                let time = new Date(item["post_time"]);
                str += "<tr>"
                    + "<td>" + item["user_name"] + "</td>"
                    + "<td>" + item["first_name"] + "</td>"
                    + "<td>" + item["last_name"]+ "</td>"
                    + "<td>" + item["email_address"] + "</td>"
                    + "<td>" + date.toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + "</td>"
                    + "<td>" + item["post_text"] + "</td>"
                    + "<td>" + time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}) + "</td>"
                    + "<td>" + item["post_views"] + "</td>"
                    + "</tr>";
            }
            str += "</table>";
            res.send(str);
            connection.end();
        }
    })
});

app.use(function (req, res, next) {
    res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
let port = 8000;
app.listen(port, function () {
    console.log("Listening ON port: " + port + ".");
});
