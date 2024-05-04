const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoute = require('./routes/user');
const cookieParser = require('cookie-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(userRoute);

app.post('/', (req, res, next) => {
    console.log('Working');
})

app.listen(3023);
