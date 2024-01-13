const express = require("express");
const { homepage } = require("../controllers/indexControllers");

const router = express.Router();

// get /
router.get('/' ,homepage)



module.exports =router;