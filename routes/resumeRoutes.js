const express = require('express');
const { resume, addeducation } = require('../controllers/resumeControllers');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// GET /
router.get('/', isAuthenticated, resume);

//POST ADD EDUCATION
router.post('/add-education', isAuthenticated, addeducation);

//POST ADD EDUCATION
router.post('/add-education', isAuthenticated, addeducation);

module.exports = router;
