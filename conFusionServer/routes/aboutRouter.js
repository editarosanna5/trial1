const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Feedbacks = require('../models/feedbacks');

const aboutRouter = express.Router();

aboutRouter.use(bodyParser.json());

aboutRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    res.statusCode = 200;
    res.end('This is the About page');
})
.post(cors.corsWithOptions, (req, res, next) => {
    Feedbacks.create(req.body)
    .then((feedback) => {
        console.log('Feedback Created ', feedback);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(feedback);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT method not supported');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Feedbacks.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

module.exports = aboutRouter;