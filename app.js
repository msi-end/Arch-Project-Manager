const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
require('dotenv').config()
const PORT = process.env.PORT || 8000;
const session = require('express-session');
const cookieParser = require('cookie-parser');



app.use(session({
    // store: new LokiStore(options),
    secret: "secrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { secure: false,httpOnly:false, },
    resave: false,
}));


// Administrator 
const auth = require('./controllers/adminAuth')

// Employees



app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))
app.set('views', __dirname + '/views')
app.set('view engine', ejs)
app.use(cookieParser());



// For Admin
app.use('/admin', auth)

// For Employees



// app.get('*',(req,res)=>{ 
//     res.render('../views/error.ejs');
//     })


app.listen(PORT,
    () => {
        console.log(`working at port ${PORT}`);
    }
)