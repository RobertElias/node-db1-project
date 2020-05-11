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


  //localhost:5000/api/accounts/3
  router.get("/:id", (req, res) => {
    // an account by id
    // selct * from accounts where id = :id
    db("accounts")
      .where({ id: req.params.id })
      .first() // grabs first item of the return array
      .then(account => {
        res.status(200).json(account);
      })
      .catch(error => {
        console.log(error);
        res.status(500).json({ error: "failed to get an account" });
      });
  });



module.exports = router;