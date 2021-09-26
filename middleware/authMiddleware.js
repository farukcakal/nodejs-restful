const jwt = require('jsonwebtoken');
const User = require('../models/userModels');
const auth = async (req, res, next) => {
    try{
        if(req.header('Authorization')){
            const token = req.header('Authorization').replace('Bearer ', '');
            const result = jwt.verify(token, 'secretkey');
            
            const foundUser = await User.findById({_id: result._id});
            if(foundUser){
                req.user = foundUser;
            }
            else
            {
            throw new Error('Sign in please !');
            }
            next();   
        }
        else{
        }
    }
    catch(err){
        next(err);
    }
}

module.exports = auth;