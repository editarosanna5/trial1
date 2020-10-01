const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
var authenticate = require('../authenticate');
const cors = require('./cors');

const Locations = require('../models/locations');

const homeRouter = express.Router();

homeRouter.use(bodyParser.json());

homeRouter.route('/')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Locations.find(req.query)
    .populate('comments.dishId')
    .then((locations) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(locations);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Locations.create(req.body)
    .then((location) => {
        console.log('Location Created ', location);
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('PUT method not supported');
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Locations.remove({})
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));    
});

homeRouter.route('/:dishId')
.options(cors.corsWithOptions, (req, res) => { res.sendStatus(200); })
.get(cors.cors, (req,res,next) => {
    Locations.findById(req.params.dishId)
    .then((location) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.post(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 403;
    res.end('POST method not supported');
})
.put(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Locations.findByIdAndUpdate(req.params.dishId, {
        $set: req.body
    }, { new: true })
    .then((location) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(location);
    }, (err) => next(err))
    .catch((err) => next(err));
})
.delete(cors.corsWithOptions, authenticate.verifyUser, (req, res, next) => {
    Locations.findByIdAndRemove(req.params.dishId)
    .then((resp) => {
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        res.json(resp);
    }, (err) => next(err))
    .catch((err) => next(err));
});

module.exports = homeRouter;