var express = require('express');
var router = express.Router();
const connection = require("../db");

router.get('/', function (req, res, next) {
    res.render('add', { title: 'Express' });
});

router.post("/", function (req, res, next) {
    // console.log(req.body);
    const nama = req.body.name;
    const email = req.body.email;
    const pr = req.body.project;
    const st = req.body.status;
    connection.query(
        `insert into data(name,email,project,status) VALUES('${nama}','${email}', '${pr}','${st}');`,
        function (err, results, fields) {
            console.log("results :", results);
        }
    );
    return res.redirect("http://localhost:3000");
});

module.exports = router;
