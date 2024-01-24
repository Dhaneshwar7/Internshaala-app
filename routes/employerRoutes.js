const express = require('express');
const {
	homepage,
	currentemployer,
	employersignup,
	employersingin,
	employersignout,
	employersendmail,
	employerforgetlink,
	employerresetpassword,
	employerOrganisationLogo,
	employerUpdate,
} = require('../controllers/employerControllers');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// GET /
router.get('/', homepage);

// GET /student
router.post('/current', isAuthenticated, currentemployer);

// POST /employer/signup
router.post('/signup', employersignup);

// POST /employer/signin
router.post('/signin', employersingin);

// GET /employer/signout
router.get('/signout', isAuthenticated, employersignout);

// POST /employer/send-mail
router.post('/send-mail', employersendmail);

// GET /employer/forget-link/:studentId
router.get('/forget-link/:id', employerforgetlink);

// POST /employer/reset-password/:studentId
router.post('/reset-password/:id', isAuthenticated, employerresetpassword);

// POST /employer/update/:studentId
router.post('/update/:id', isAuthenticated, employerUpdate);

// POST /employer/avatar/:studentId
router.post('/employeravatar/:id', isAuthenticated, employerOrganisationLogo);

module.exports = router;
