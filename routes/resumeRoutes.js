const express = require('express');
const { resume, addeducation, editeducation, deleteeducation } = require('../controllers/resumeControllers');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// GET /
router.get('/', isAuthenticated, resume);

//POST ADD EDUCATION
router.post('/add-education', isAuthenticated, addeducation);

//POST EDIT EDUCATION
router.post('/edit-education/:eduid', isAuthenticated, editeducation);

//POST DELETE EDUCATION
router.post('/delete-education/:eduid', isAuthenticated, deleteeducation);

module.exports = router;
