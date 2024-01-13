const express = require('express');
const app = express();
const connectDb= require('./models/database');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// Database Connection
connectDb.connectDataBase()

//logger
const loggger = require('morgan');
const ErrorHandler = require('./utils/ErrorHandlers');
const {generatedErrors} =require("./middlewares/error")
app.use(loggger('tiny'));



//Routes
app.use('/', require('./routes/indexRoutes'));


//Error Handling
app.all('*', (req, res, next) => {
	next(new ErrorHandler(`Requested URL NOT FOUND ${req.url}`, 404));
});
app.use(generatedErrors);

app.listen(
	process.env.PORT,
	console.log(`server runninG on port ${process.env.PORT}`)
);

module.exports = app;
