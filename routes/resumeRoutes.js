const express = require('express');
const { resume } = require('../controllers/resumeControllers');
const { isAuthenticated } = require('../middlewares/auth');

const router = express.Router();

// GET /
router.get('/', isAuthenticated, resume);



module.exports = router;
