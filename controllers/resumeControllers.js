const { catchAsyncError } = require('../middlewares/catchAsyncError');
const Student = require('../models/studentModel');
const { v4: uuidv4 } = require('uuid');
const ErrorHandler = require('../utils/ErrorHandlers');

exports.resume = catchAsyncError(async (req, res, next) => {
	const { resume } = await Student.findById(req.id).exec();

	res.json({ message: 'Resume of USER Internshala', resume });
});

exports.addeducation = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	student.resume.education.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: 'Education Added', resume: student.resume });
});

exports.editeducation = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();

	const eduIndex = student.resume.education.findIndex(
		i => i.id === req.params.eduid
	);
	student.resume.education[eduIndex] = {
		...student.resume.education[eduIndex],
		...req.body,
	};

	await student.save();
	res.json({ message: 'Education Updated', resume: student.resume });
});

exports.deleteeducation = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();

	const filtereEdu = student.resume.education.filter(
		i => i.id !== req.params.eduid
	);
	student.resume.education = filtereEdu;

	await student.save();
	res.json({ message: 'Education Delete Successfully', resume: student.resume });
});
