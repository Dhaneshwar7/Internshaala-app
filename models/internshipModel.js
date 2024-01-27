const mongoose = require('mongoose');

const internshipModel = mongoose.Schema({
    profile: String,
    skill: String,
    intershipType : {type: String, enum:["In Office", "Remote"]},
    openings: Number,
    from: String,
    to: String,
    duration: String,
    responsibilities: String,
    stipend: {
        stutus:{
            type: String,
            enum:["Fixed" ,"Negotiable","Performance Based","Unpaid"],
        },
        amount:Number
    },
    perks: String,
    assessment: String,
}, { timestamps: true });

const Internship = mongoose.model('internship', internshipModel);
module.exports = Internship;
