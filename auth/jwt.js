const jwt =require('jsonwebtoken');


const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    if(!token){
        return next(new Error("You dont have JWT"))
    }
    
    jwt.verify(token, "Secret", (error, user)=>{
        if(error){
            return next(new Error("Invalid JWT"))
        }

        req.user = user

        next()
    })
}
module.exports={verifyToken};

// export const verifyUser = (req,res,next)=>{
//     verifyToken(req,res, ()=>{
//         if(req.user.id === req.params.id){
//             next()
//         }else{
//             return next(new Error())
//         }
//     })
// }