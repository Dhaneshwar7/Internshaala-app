const express = require("express");
const {
	homepage,
	studentsignup,
	studentsignin,
	studentsignout,
	currentstudent,
	studentsendmail,
	studentforgetlink,
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

// POST /student/send-mail
router.post('/student/send-mail', studentsendmail);

// GET /student/forget-link/:studentId
router.get('/student/forget-link/:id', studentforgetlink);

module.exports =router;