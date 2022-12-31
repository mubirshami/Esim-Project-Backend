const express = require('express');
var router = express.Router();
var Esim = require('../models/esim');
var Bundle = require('../models/bundle');
var Orders = require('../models/order');
var User = require('../models/users');
const bundle = require('../models/bundle');

router.post('/bundles/create',function(req,res,next){
    const updtdata=Object.assign(req.body,{bundle:JSON.parse(req.body.bundle)});
    console.log(updtdata);
    Bundle.create(updtdata, function(err,results){
        if(err) throw err;
        res.json(results);
    });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Bundle', { title: 'Bundle' });
});


//Get organisation inventory        Done
router.get('/inventory',function(req,res,next){
    Bundle.find({"bundle.available.remaining":{$gt:"0"}}).exec(function(err,results){
        if(err) throw err;
        
        res.json(results);
    });
});

//Bundle groups assigned to organisation      Done
router.get('/organisation/:groups',function(req,res,next){
    Bundle.find({"bundle.name": {$regex: req.params.groups, $options:'i'} }).exec(function(err,results){
        if(err) throw err;
        
        res.json(results);
    });
});

//List catalogue
router.get('/catalogue',function(req,res,next){
    Bundle.find({}).exec(function(err,results){
        if(err) throw err;
        
        res.json(results);
    });
});

//Get bundle from catalogue         Done
router.get('/catalogue/bundle/:name',function(req,res,next){
    Bundle.findOne({"bundle.name":req.params.name}).exec(function(err,results){
        console.log(req.params.name);
        console.log(results);
        if(err) console.log("Not Found");
        
        res.json(results);
    });
});



module.exports = router;