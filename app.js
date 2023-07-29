const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const session = require('express-session');
const nodemailer = require('nodemailer');
// const connectDB = require('./server/db');

const app = express();

const db = 'mongodb+srv://shanugujar007:0ZBtR3CJHUfNUwMi@activity-tracker.yoz3wxs.mongodb.net/';


mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("Connected to MongoDB successfully!"))
    .catch(err => console.log(err));


// connectDB();


app.use(expressLayouts);
app.use("/assets", express.static('./assets'));
app.set('view engine', 'ejs');


app.use(express.urlencoded({ extended: false }));


app.use(
    session({
        secret: 'secret',
        resave: true,
        saveUninitialized: true
    })
);


app.use(flash());


app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
});


app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

const PORT = process.env.PORT || 3000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

