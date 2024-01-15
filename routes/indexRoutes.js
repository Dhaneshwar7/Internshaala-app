const express = require("express");
const {
	homepage,
	studentsignup,
	studentsignin,
	studentsignout,
    currentstudent,
    forgetmail,
} = require('../controllers/indexControllers');
const { isAuthenticated } = require("../middlewares/auth");

const router = express.Router();

// GET /
router.get('/' ,homepage)

// GET /student
router.post('/student' , isAuthenticated, currentstudent)

// POST /student/signup
router.post('/student/signup', studentsignup);

// POST /student/signin
router.post('/student/signin', studentsignin);

// GET /student/signout
router.get('/student/signout', isAuthenticated, studentsignout);

// POST /student/forget-mail
router.post('/student/forget-mail', forgetmail);


module.exports =router;