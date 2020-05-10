/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

// req cookie sessions

module.exports = (db) => {
  const dbHelper = require("../helpers/dbHelper")(db);
  router.post("/login", (req, res) => {
    const { email, password } = req.body;
    dbHelper
      .getUserWithEmail(email)
      .then((user) => {
        if (!user) {
          return res.status(404).send("This email doesn't exist. Please create an account.");
        }
        if (bcrypt.compareSync(password, user.password)) {
          req.session.userId = user.id
          console.log('success')
          return res.session.userId

          res.status(200)
        } else {
          res.status(403).send("Incorrect password.")
        }
      })
      .catch((e) => res.json(e));
  });

  router.post("/register", (req, res) => {
    // console.log(req.body)
    const { firstName, lastName, email, password } = req.body

    if (!(firstName && lastName && email && password)) {
      return res.status(400).send("You must fill in all the fields.");
    }
    const encryptedPassword = bcrypt.hashSync(password, 12)
    dbHelper.addUser(firstName, lastName, email, encryptedPassword)
    .then((user) => {
      if (!user) {
        return res.status(400).send("There was an issue registering.")
      }
      // console.log("success")
      req.session.userId = user.id
    })
    .catch(e => console.error(e))
  });

  router.get("/", (req, res) => {
    // check users cookies to get users(id)
    // return null if the cookie is not found
    // need to use dbHelper.getUserWithID(id)
    // Example of using dbHelper for db queries
    dbHelper
      .getUserWithID("2")
      // .then (another query to get blacklisted websites)
      // .then (another query to get time_alottment) ... etc
      .then((user) => res.json(user))
      .catch((e) => res.json(e));
  });

  return router;
};

// when returning user, also get all data related to the user.. blacklisted websites, time_allotment, etc...
//
