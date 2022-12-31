var mongoose = require('mongoose');
const bcrypt=require('bcrypt');

var schema = mongoose.Schema;

var userSchema = new schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
});
userSchema.pre('save',async function(next){
    try
    {
    if(!this.isModified('password')){
        return next();
    }
    const hash= await bcrypt.hash(this['password'],10);
    this['password']=hash;
    return next();
}
catch(error){
    return next(error);
}
})
// userSchema.method.comparepassword =async function(password){
//     const final =await bcrypt.compareSync(password,this.password);
//     return final;
// }

module.exports = mongoose.model("User",userSchema);