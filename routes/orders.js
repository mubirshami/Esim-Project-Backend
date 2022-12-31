const express = require('express');
var router = express.Router();
var Esim = require('../models/esim');
var Bundle = require('../models/bundle');
var Orders = require('../models/order');
var User = require('../models/users');
const { verifyToken } = require('../auth/jwt');
const bundle = require('../models/bundle');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('Order', { title: 'Order' });
});

//Get all orders    Done
router.get('/orders',verifyToken,function(req,res,next){
    console.log(req.user);
    Orders.find({}).exec(function(err,results){
        if(err) throw err;
        
        res.json(results);
    });
});


//Get specific order    Done
router.get('/orders/:orderReference',function(req,res,next){
    Orders.findById(req.params.orderReference).exec(function(err,results){
        if(err) throw err;
        
        res.json(results);
    });
});

//Process Order     Done
router.post('/orders',async function(req,res,next){
    let orderObject= req.body;
    
    const orderjsondata={userid:'62fa8a51c360595a1402dbc4',order:JSON.parse(req.body.order)};
    const updtdobj = Object.assign(orderObject,orderjsondata);

    console.log(updtdobj.order[0].itemname);
    const order = updtdobj.order[0];
    console.log(updtdobj.order[0].quantity);

    const data=await Bundle.find({$and: [{"bundle.name": order.itemname}, {'bundle.available.remaining': {$gte: order.quantity}}] });
    console.log(data.length);
    if(data.lenght<1) res.send("Bundle Out of Stock");
    // console.log(data);
    const foundbundle=data[0];
    if(typeof foundbundle==='undefined') 
    {
        res.send("Bundle Out of Stock")
    return;};
    
    const oldavailable=foundbundle.bundle[0].available[0]
    const newavailableobj={remaining:oldavailable.remaining-order.quantity,expiry:oldavailable.expiry};
    const oldfoundbundle= foundbundle.bundle[0];
    const newfoundbundle= Object.assign(oldfoundbundle,{available:[newavailableobj]});
    const newbundle= Object.assign(foundbundle,{bundle:[newfoundbundle]})
    console.log(newbundle);
    delete newbundle._id;
    delete newbundle.__v;

    const final =await Bundle.findByIdAndUpdate(foundbundle._id,newbundle);



    // find the bundle by name and then access remaining and do the math
    // var math;
    // math = bundle.available.remaining-req.body.order.quantity;
    // if (math<=0) {
    //     res.send("Bundle Out Of Stock");
    // }
    // const update={}
    // Bundle.findOneAndUpdate({})

    // console.log(updtdobj);
    Orders.create(updtdobj, function(err,results){
        if(err) throw err;

        res.json(results);

    });
});

module.exports = router;