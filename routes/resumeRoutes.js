const express = require('express');
const { resume, addeducation, editeducation, deleteeducation, addjob, editjob, deletejob, addinternship, editinternship, deleteinternship } = require('../controllers/resumeControllers');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// GET /
router.get('/', isAuthenticated, resume);

/* -------------------------- Resume Education ---------------- */
//POST ADD EDUCATION
router.post('/add-education', isAuthenticated, addeducation);

//POST EDIT EDUCATION
router.post('/edit-education/:eduid', isAuthenticated, editeducation);

//POST DELETE EDUCATION
router.post('/delete-education/:eduid', isAuthenticated, deleteeducation);

/* -------------------------Resume Jobs ---------------- */
//POST ADD JOBS
router.post('/add-job', isAuthenticated, addjob);

//POST EDIT JOBS
router.post('/edit-job/:jobid', isAuthenticated, editjob);

//POST DELETE JOBS
router.post('/delete-job/:jobid', isAuthenticated, deletejob);

/* -------------------------Resume Internships ---------------- */
//POST ADD JOBS
router.post('/add-internship', isAuthenticated, addinternship);

//POST EDIT JOBS
router.post('/edit-internship/:internid', isAuthenticated, editinternship);

//POST DELETE JOBS
router.post('/delete-internship/:internid', isAuthenticated, deleteinternship);

module.exports = router;
