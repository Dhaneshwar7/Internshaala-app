const { catchAsyncError } = require('../middlewares/catchAsyncError');
const Student = require('../models/studentModel');
const ErrorHandler = require('../utils/ErrorHandlers');

exports.homepage = catchAsyncError((req, res, next) => {
	res.json({ message: 'Homepage of Internshala' });
});

exports.studentsignup = catchAsyncError(async (req, res, next) => {
	const student = await new Student(req.body).save();
	res.status(201).json(student);
});

exports.studentsignin = catchAsyncError(async (req, res, next) => {
	const student = await Student.findOne({ email: req.body.email })
		.select('+password')
		.exec();

	if (!student) {
		return next(
			new ErrorHandler('User not found with this Email Address', 404)
		);
	}
	const isMatch = student.comparepassword(req.body.password);
	if (!isMatch) return next(new ErrorHandler('Wrond Credientials', 500));

	res.json(student);
});

exports.studentsignout = catchAsyncError(async (req, res, next) => {});
