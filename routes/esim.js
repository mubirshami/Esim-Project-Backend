const express = require('express');
var router = express.Router();
var Esim = require('../models/esim');
var Bundle = require('../models/bundle');
var Orders = require('../models/order');
var User = require('../models/users');
const {verifyToken} = require('../auth/jwt');
var QRcode = require('qrcode');
// var QRLogo = require('qr-with-logo');
const {Parser} = require('json2csv');
const fs = require('fs');


// const axios = require('axios');
// let config = {
//     method: 'get',
//     url: 'https://api.esim-go.com/v2.1/',
//     headers: { 
//       'X-API-Key': '$API_KEY'
//     }
//   };
  
//   axios(config)
//   .then((response) => {
//     console.log(JSON.stringify(response.data));
//   })
//   .catch((error) => {
//     console.log(error);
//   });


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Esim', { title: 'Esim' });
});

//List esims assigned to organizatuon       Done
router.get('/esims',verifyToken,function(req,res,next){
    console.log(req.user.id);
    Esim.find({}).exec(function(err,results){
        if(err) throw err;
        
        res.json(results);
    });
});

//Apply bundle to esim      Done
router.post('/esims/apply',function(req,res,next){
    console.log(req.body);
    Esim.create(req.body, function(err,results){
        if(err) throw err;

        res.json(results);

    });
});

//Get QR code   Done
router.get('/esims/qr/:reference',function(req,res,next){
     Esim.find({"reference":req.params.iccid}).exec(function(err,results){
        // QRLogo.(results,"img.png",{},"Base64","qrlogo.png",function(b64){
        //     console.log(b64);
        // })
        if(err) console.log(err);
        // res.json(results);
        QRcode.toString(results,function(err,results){
            if(err) console.log(err);

            res.send(results);
            console.log(results);

            // console.log(final);
        })
    });
});

//Get CSV     Done
router.get('/esims/csv/:reference',function(req,res,next){
    Esim.find({"reference":req.params.iccid}).exec(function(err,results){
        if(err) console.log(err);
        const json2csvparser=new Parser();
        const csv= json2csvparser.parse(results);
        res.send(csv);
        fs.writeFile("info.csv",csv,function(err){
            if(err) throw err;

            console.log("File Saved");
            res.attachment("information.csv");
            res.send(results);
        })
        
    });
});

//Get esim details      Done
router.get('/esims/:iccid',function(req,res,next){
    Esim.find({"iccid":req.params.iccid}).exec(function(err,results){
        if(err) throw err;  
        
        res.json(results);
    });
});

//List bundles applied to an esim       Done
router.get('/esims/:iccid/bundles',function(req,res,next){
    Esim.find({"iccid":req.params.iccid}).populate('bundles').exec(function(err,results){
        if(err) console.log(err);
        
        res.json(results);
    });
});
module.exports = router;