const { catchAsyncError } = require('../middlewares/catchAsyncError');
const Student = require('../models/studentModel');
const { v4: uuidv4 } = require('uuid');
const ErrorHandler = require('../utils/ErrorHandlers');

exports.resume = catchAsyncError(async (req, res, next) => {
	const { resume } = await Student.findById(req.id).exec();

	res.json({ message: 'Resume of USER Internshala', resume });
});

/* -------------------------- Resume Education ---------------- */
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
	res.json({
		message: 'Education Delete Successfully',
		resume: student.resume,
	});
});

/* -------------------------Resume Jobs ---------------- */
exports.addjob = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	student.resume.jobs.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: 'Job Added', resume: student.resume });
});
exports.editjob = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const jobIndex = student.resume.jobs.findIndex(
		i => i.id === req.params.jobid
	);
	student.resume.jobs[jobIndex] = {
		...student.resume.jobs[jobIndex],
		...req.body,
	};
	await student.save();
	res.json({ message: 'Job Updated', resume: student.resume });
});
exports.deletejob = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();

	const filterejob = student.resume.jobs.filter(i => i.id !== req.params.jobid);
	student.resume.jobs = filterejob;

	await student.save();
	res.json({
		message: 'Job Delete Successfully',
		resume: student.resume,
	});
});

/* -------------------------Resume Internships ---------------- */
exports.addinternship = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	student.resume.internships.push({ ...req.body, id: uuidv4() });
	await student.save();
	res.json({ message: 'Internship Added', resume: student.resume });
});
exports.editinternship = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();
	const internIndex = student.resume.internships.findIndex(
		i => i.id === req.params.internid
	);
	student.resume.internships[internIndex] = {
		...student.resume.internships[internIndex],
		...req.body,
	};
	await student.save();
	res.json({ message: 'Internship Updated', resume: student.resume });
});
exports.deleteinternship = catchAsyncError(async (req, res, next) => {
	const student = await Student.findById(req.id).exec();

	const filtereInternships = student.resume.internships.filter(
		i => i.id !== req.params.internid
	);
	student.resume.internships = filtereInternships;

	await student.save();
	res.json({
		message: 'Internship Delete Successfully',
		resume: student.resume,
	});
});
