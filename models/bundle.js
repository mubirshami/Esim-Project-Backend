var mongoose = require('mongoose');

var schema = mongoose.Schema;

var bundleSchema = new schema([{

    bundle:[{
        name:{
            type: String,
        },
        desc:{
            type: String
        },
        available:[{
            remaining:{
                type: Number
            },
            expiry:{
                type: String
            },
    }]}
    ],
    countries:[{
        type: String
    }],
    data:{
        type: String
    },
    duration:{
        type: Number
    },
    durationUnit:{
        type: String
    },
    autoStart:{
        type: Boolean
    },
    speed:[{
        type: String
    }]
}]);
module.exports = mongoose.model("Bundle",bundleSchema);