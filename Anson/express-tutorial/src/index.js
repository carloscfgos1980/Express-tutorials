const express = require("express");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo');
const passport = require('passport');
require('dotenv').config();
// require('./strategies/local');
require('./strategies/discord');

const groceriesRouter = require ('./routes/groceries');
const marketsRouter = require('./routes/markets');
const authRouter = require('./routes/auth');

const app = express();
const PORT = 3001;

require('./database');


app.use(express.json());
app.use(cookieParser());
app.use(
    session({
    secret: 'WWEIBEXUEXFCFUERCPQI',
    resave: false,
    saveUninitialized: false,
    store: mongoStore.create({
        mongoUrl: process.env.MONGO_URL,
    }),
    })
);

app.use((req, res, next)=>{
    console.log(`${req.method} : ${req.url}`);
    next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use('/api/v1/groceries', groceriesRouter);
app.use('/api/v1//markets', marketsRouter);
app.use('/api/v1/auth', authRouter);

app.listen(PORT, 
    ()=>{console.log(`Running Express server on port ${PORT}`)}
);

