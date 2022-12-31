var mongoose = require('mongoose');

var schema = mongoose.Schema;

var orderSchema = new schema({

    userid:{
        type: mongoose.Types.ObjectId,
        ref: "User"
    },

    order:[{
        itemtype:{
            type: String,
        },
        itemname:{
            type: String
        },
        quantity:{
            type: Number
        },
        subTotal:{
            type: Number
        },
        pricePerUnit:{
            type: Number
        }
    }
    ],
    total:{
        type: Number
    },
    currency:{
        type: String
    },
    status:{
        type: String
    },
    statusMessage:{
        type: String
    },
    orderMessage:{
        type: String
    },
    createDate:{
        type: String
    }
});
module.exports = mongoose.model("Orders",orderSchema);