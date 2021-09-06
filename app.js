const express = require('express');
const logger = require('morgan');
const path = require('path');

const indexRouter = require('./routes/index');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

require('./ws');

app.use('/', indexRouter);

app.listen('3000', () => {
    console.log(`Server listening at http://localhost:3000`)
})