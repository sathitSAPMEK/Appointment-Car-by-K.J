const router = require('express').Router();
const bcrypt = require('bcrypt');
const { firestoreDB } = require('../config');
const { resSucess, resError } = require("../modules/sender");

router.get('/', (req, res) =>{
  res.status(200)
})

module.exports = router;
