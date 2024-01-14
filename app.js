const express = require('express');
const app = express();
const connectDb= require('./models/database');
const loggger = require('morgan');

const dotenv = require('dotenv');
dotenv.config({ path: './.env' });

// Database Connection
connectDb.databaseConnect()


//logger
app.use(loggger('tiny'));

//bodyParser
app.use(express.json())
app.use(express.urlencoded({extended: false}));




//Routes
app.use('/', require('./routes/indexRoutes'));


//Error Handling
const ErrorHandler = require('./utils/ErrorHandlers');
const { generatedErrors } = require('./middlewares/error');
app.all('*', (req, res, next) => {
	next(new ErrorHandler(`Requested URL NOT FOUND ${req.url}`, 404));
});
app.use(generatedErrors);

app.listen(
	process.env.PORT,
	console.log(`server runninG on port ${process.env.PORT}`)
);

module.exports = app;
