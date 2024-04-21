const Users = require('../models/UserToken');
module.exports = (req,res,next)=>{
    const token = req.get('Authorization');
    console.log(token);

    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }

    const users = Users.all();

    const checkUser = users.find(item=>item.token===token);
    if(!checkUser){
        return res.status(401).json({message:"Unauthorized"});
    }
    next();
}