const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const studentModel = mongoose.Schema(
	{
		email: {
			type: String,
			required: true,
			index: { unique: true, sparse: true },
			match: [
				/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
				'Please fill a valid email address',
			],
		},
		password: {
			type: String,
			select: false,
			minLength: [6, 'Password should have atleast 6 Characters'],
			maxLength: [15, 'Password should not exceed more than 15 Characters'],
			// match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/ , "Password must have this char"],
		},
		resetpasswordToken: {
			type: String,
			default: 0,
		},
	},
	{ timestamps: true }
);

studentModel.pre('save', function () {
	if (!this.isModified('password')) {
		return;
	}
	let salt = bcrypt.genSaltSync(10);
	this.password = bcrypt.hashSync(this.password, salt);
});

studentModel.methods.comparepassword = function (password) {
	return bcrypt.compareSync(password, this.password);
};

studentModel.methods.getjwttoken = function () {
	return jwt.sign({ id: this._id }, process.env.JWT_TOKEN_SECRET, {
		expiresIn: process.env.JWT_EXPIRE,
	});
};

const Student = mongoose.model('student', studentModel);
module.exports = Student;
