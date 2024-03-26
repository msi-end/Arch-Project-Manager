const express = require('express');
const app = express();
const path = require('path');
const ejs = require('ejs');
require('dotenv').config({path:path.resolve(__dirname,`./.env.${process.env.NODE_ENV}`)});
const PORT = process.env.PORT || 3000;
const session = require('express-session');
const cookieParser = require('cookie-parser');
const LokiStore = require('connect-loki')(session);
const { errHandler } = require('./middleware/error')
let LokiConf = {path:'./sessions/loginAuth.db'}

app.use(session({
    store: new LokiStore(LokiConf),
    secret: "secrctekeyfhrgfgrfrty84fwir767",
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: false, },
    resave: false,
}));


// Administrator 
const auth = require('./controllers/adminAuth')
const indexRoutes = require('./routes/admin/indexRoutes')
const userManager = require('./routes/admin/userManagerRoute.js')
const settings = require('./routes/admin/settingRoute.js')
const finance = require('./routes/admin/financeRoute')
const financeExpense = require('./routes/admin/financeRoute.expance')
const nitify = require('./routes/admin/notificationRoute')

const apiRoute = require('./routes/admin/projectRoute.js')


// Employees
const EmployeeAuth = require('./routes/employee/auth.js');
const EmpMainRoute = require('./routes/employee/indexRoutes');
const EmpNitify = require('./routes/employee/notificationRoute');
const EmpPmRoute = require('./routes/employee/pm.emproute.js');

// CA
const caAuth = require('./routes/CA/auth');
const caMainRoute = require('./routes/CA/indexRoutes');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))
app.set('views', __dirname + '/views')
app.set('view engine', ejs)
app.use(cookieParser());

// For Admin **********
app.use('/admin', auth)
app.use('/admin', indexRoutes)
app.use('/admin/user-manager', userManager)
app.use('/admin/settings', settings)
app.use('/admin/finance', finance)
app.use('/admin/finance/expenses', financeExpense)

// app.use('/apiV1', tasks)
app.use('/apiv1', apiRoute)
app.use('/apiv1', nitify)


// For Employees ************
app.use('/', EmployeeAuth)
app.use('/', EmpMainRoute)
app.use('/apiv1', EmpNitify)
app.use('/apiv1', EmpPmRoute)

// For CA ************
app.use('/ca', caAuth)
app.use('/ca', caMainRoute)




app.get('*',(req,res)=>{ 
    res.render('../views/errorPage.ejs');
    })
app.use(errHandler);
app.listen(PORT,
    () => {
        console.log(`working at port ${PORT} .env ${process.env.NODE_ENV}`);
    }
)