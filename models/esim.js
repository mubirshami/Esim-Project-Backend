var mongoose = require('mongoose');

var schema = mongoose.Schema;

var esimSchema = new schema({
    userid:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    orderid:{
        type:mongoose.Types.ObjectId,
        ref: "Order"
    },
    bundles:[{
        type:mongoose.Types.ObjectId,
        ref:"Bundle"
    }],
    iccid:{
        type: String,
        required: true
    },
    matchingId:{
        type: String,
        required: true
    },
    smdpAddress:{
        type: String,
        required: true
    },
    profileStatus:{
        type: String,
        required: true
    },
    pin:{
        type: String,
        required: true
    },
    puk:{
        type: String,
        required: true
    },
    firstInstalledDateTime:{
        type: Date,
        required: true

    }
});
module.exports = mongoose.model("Esim",esimSchema);