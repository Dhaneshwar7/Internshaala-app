const mongoose = require('mongoose')

exports.connectDataBase = async()=>{
    try {
        await mongoose.connect(process.env.MONGRO_URL);
        console.log(`Database connection Done`);
    } catch (error) {
        console.log(error.message);
    }
}