const { catchAsyncError } = require('../middlewares/catchAsyncError');
const Student = require('../models/studentModel');
const ErrorHandler = require('../utils/ErrorHandlers');

exports.resume = catchAsyncError((req, res, next) => {
	res.json({ message: 'Resume of USER Internshala' });
});
