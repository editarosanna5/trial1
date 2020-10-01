const express = require('express');
const cors = require('cors');
const app = express();

const whitelist = ['http://192.168.100.9:3000', 'http://192.168.100.10:3000', 'http://54.164.205.142:3000'];
var corsOptionsDelegate = (req, callback) => {
    var corsOptions;
    console.log(req.header('Origin'));
    if(whitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true };
    }
    else {
        corsOptions = { origin: false };
    }
    callback(null, corsOptions);
};

exports.cors = cors();
exports.corsWithOptions = cors(corsOptionsDelegate);