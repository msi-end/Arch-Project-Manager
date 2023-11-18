const express = require('express');
const app = express();
const path = require('path')
const ejs = require('ejs');
const PORT = 7000 || process.env.PORT;


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'static')))
app.set('views', __dirname + '/views')
app.set('view engine', ejs)

app.listen(PORT,
    () => {
        console.log('working at port 7000');
    }
)