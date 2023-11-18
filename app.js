const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
require('dotenv').config()
const PORT = process.env.PORT;
const session = require('express-session');
const cookieParser = require('cookie-parser');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))
app.set('views', __dirname + '/views')
app.set('view engine', ejs)
app.use(cookieParser());


// For Employees


// For Admin






app.listen(PORT,
    () => {
        console.log(`working at port ${PORT}`);
    }
)