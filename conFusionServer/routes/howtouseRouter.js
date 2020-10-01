const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const howtouseRouter = express.Router();

howtouseRouter.use(bodyParser.json());

howtouseRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    res.statusCode = 200;
    res.end('This is the About page');
})
.post(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST method not supported');
})
.put(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT method not supported');
})
.delete(cors.corsWithOptions, (req, res, next) => {
    res.statusCode = 403;
    res.end('DELETE method not supported');
});

module.exports = howtouseRouter;