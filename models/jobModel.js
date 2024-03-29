const mongoose = require('mongoose');

const jobModel = mongoose.Schema(
	{
		students:[{type: mongoose.Schema.Types.ObjectId, ref:"student"}],
		employer: { type: mongoose.Schema.Types.ObjectId, ref: 'employer' },
		title: String,
		skill: String,
		jobType: { type: String, enum: ['In Office', 'Remote'] },
		openings: String,
		description: String,
		preferences: String,
		salary: Number,
		perks: String,
		assessment: String,
	},
	{ timestamps: true }
);

const Job = mongoose.model('job', jobModel);
module.exports = Job;
