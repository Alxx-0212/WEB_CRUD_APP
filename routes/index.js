var express = require('express');
var router = express.Router();
const connection = require("../db");

/* GET home page. */
router.get('/', function (req, res, next) {
  connection.query('select * from data', function (err, results, fields) {
    const data = {
      pr: JSON.parse(JSON.stringify(results)),
    };
    res.render('index', data);
  })
});

router.get("/delete", function (req, res) {
  let sql = "DELETE FROM data WHERE id ='" + req.query.i + "'";
  let query = connection.query(sql, (err, results) => {
    if (err) {
      res.send({ result: "error" });
    } else {
      res.redirect("/");
    }
  });
});

router.get('/update', function (req, res) {
  let s = "SELECT * FROM data WHERE id ='" + req.query.i + "'";
  let query = connection.query(s, (err, results) => {
    var data = {
      data: results[0]
    }
    res.render('update', data);
  });

});

router.post("/update", function (req, res) {
  let data = { name: req.body.name, email: req.body.email, project: req.body.project, status: req.body.status };
  let sql = "UPDATE data SET ? WHERE id ='" + req.query.i + "'";
  let query = connection.query(sql, data, (err, results) => {
    if (err) {
      console.log("error");
      res.send({ result: "error" });
    } else {
      console.log("success");
      res.redirect("/");
    }
  });
})

module.exports = router;
