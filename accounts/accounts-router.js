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


  //localhost:5000/api/accounts
  router.post("/", (req, res) => {
    const post = req.body;
  
    // a post must have title and contents
    if (isValidPost(post)) {
      // once you know the post is valid then try to save to the db
      db("accounts")
        // there will be a warning in the console about .returnnin(), ignore it for SQLite
        .insert(post, "id", "name", "budget")
        .then(ids => {
          res.status(201).json({ data: ids });
        })
        .catch(error => {
          // save the error to a log somewhere
          console.log(error);
          res.status(500).json({ message: error.messsage });
        });
    } else {
      res
        .status(400)
        .json({ message: "please provide title and contents for the post" });
    }
  });
  

  function isValidPost(accounts) {
    return Boolean(accounts.name && accounts.budget);
  }

module.exports = router;