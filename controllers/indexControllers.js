const { catchAsyncError } = require('../middlewares/catchAsyncError');
const Student = require('../models/studentModel');
const ErrorHandler = require('../utils/ErrorHandlers');
const { sendtoken } = require('../utils/SendToken');
const { sendmail } = require('../utils/nodemailer');

exports.homepage = catchAsyncError((req, res, next) => {
	res.json({ message: 'Homepage of Internshala' });
});

exports.currentstudent = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	res.json({ student });
});

exports.studentsignup = catchAsyncError(async (req, res, next) => {
	const student = await new Student(req.body).save();
	// sendtoken(student, 200, res);
	res.status(201).json({ student });
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
	if (!isMatch) return next(new ErrorHandler('Wrong Credientials', 500));

	sendtoken(student, 200, res);
});

exports.studentsignout = catchAsyncError(async (req, res, next) => {
	res.clearCookie('token');
	res.json({ message: 'Signout User!' });
});

exports.studentsendmail = catchAsyncError(async (req, res, next) => {
	const student = await Student.findOne({ email: req.body.email }).exec();

	if (!student) {
		return next(
			new ErrorHandler('User not found with this Email Address', 404)
		);
	}

	const url = `${req.protocol}://${req.get('host')}/student/forget-link/${
		student._id
	}`;

	sendmail(req, res, next, url);
	student.resetpasswordToken = '1';
	await student.save();

	res.json({ student, url });
});

exports.studentforgetlink = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.params.id).exec();

	if (!student) {
		return next(
			new ErrorHandler('User not found with this Email Address', 404)
		);
	}

	if (student.resetpasswordToken == '1') {
		student.resetpasswordToken = '0';
		student.password = req.body.password;
		await student.save();
	}else{
		return next(
			new ErrorHandler('Invalid forget link ! try again', 500)
		);
	}

	res.status(200).json({ message: 'Password Changed Successfully' });
});
