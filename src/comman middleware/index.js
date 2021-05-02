const jwt = require("jsonwebtoken");


exports.signinRequired = (req,res,next) =>{
    
    if (req.headers.authorization == undefined){
         res.status(400).json({message:"Authorization Required"})
        }

    const token = req.headers.authorization.split(" ")[1];
    const user = jwt.verify(token,process.env.JWT_SECRET);
    //console.log(user,"line 1");
    req.user = user ;
    //console.log(user,"line 2")
    next();
};

exports.adminMiddleware = (req,res,next) =>{
    if (req.user.role !== 'admin'){
        return res.status(400).json({message:"ACCESS DENIED"})
    };
    next();
};

exports.userMiddleware = (req,res,next) =>{
    if (req.user.role !== 'user'){
        return res.status(400).json({message:"Please Login to continue"})
    };
    next();
}