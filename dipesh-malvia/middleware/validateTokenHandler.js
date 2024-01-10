const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const validateToken = asyncHandler(async(req, res, next)=>{
    let token;
    let authHeather = req.headers.authorization || req.headers.Authorization;
    if(authHeather && authHeather.startsWith("Bearer")){
        token = authHeather.split(" ")[1];
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded)=>{
            if(err){
                res.status(401)
                throw new Error("User is not authorized")
            }
            req.user = decoded.user;
            next();
        });
        if(!token){
            res.status(401);
            throw new Error("User is not authorized or token is missing in the request!")
        }
    }
});

module.exports = validateToken;