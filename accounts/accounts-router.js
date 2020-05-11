const express = require("express");
//database access using knex
const db = require('../data/dbConfig.js');

const router = express.Router();

//localhost:5000/api/accounts
// should initial be empty array no data
router.get("/", (req, res) => {
    //list of accounts
    //SELECT * FROM [accounts]
    //All database operations return a promise
    db.select("*")
      .from("accounts")
      .then(accounts => {
        res.status(200).json(accounts);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: "failed to get data from accounts" });
      });
  });



module.exports = router;