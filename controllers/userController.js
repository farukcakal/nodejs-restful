const User = require('../models/userModels');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const ipMiddleware = require('../middleware/ipMiddleware');
const getUserIP = require('../middleware/ipMiddleware');

const allUsers = async (req,res) => {
    const allUsers = await User.find({});
    res.json(allUsers);
};

const myAccount = (req,res,next) => {
    res.json(req.user);
};

const loggedUserUpdate =  async (req,res,next) => {
    delete req.body.balance;

    if(req.body.hasOwnProperty('password')){
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const { error, value } = User.joiValidationForUpdate(req.body);
    if(error){
        next(createError(400, error));
    }else{
        try{
            const result = await User.findByIdAndUpdate({_id: req.user._id}, req.body, {new: true, runValidators: true});
            if(result){
                return res.json(result);
            }else{
                return res.status(404).json({
                    message: "User Not Found!",
                });
            }
        }catch (err){
            next(err);
        }
    }
};

const loggedUserDelete = async (req,res,next) => {
    try{
        const result = await User.findByIdAndDelete({_id: req.params.id});
        if(result){
            return res.json({
               message: "User Deleted!",
           });
        }else{
            throw createError(404, 'User not found!');
        }
    }catch (err){
        next(createError(400, err));
    }
    
};
const register = async (req,res,next) => {
    try{
        const regUser = new User(req.body);
        //şifre crpyt ediliyor
        regUser.password = await bcrypt.hash(regUser.password, 10);
        const { error, value } = regUser.joiValidation(req.body);
        if(error){
            next(createError(400, error));
        }else{
            const result = await regUser.save();
            res.json(result);
        }
    } catch (err){
        next(err);
    }
};

const login = async (req, res, next) => {

    try{
        const user = await User.login(req.body.email, req.body.password);
        const token = await user.generateToken();
        res.json({
            user,
            token
        });

    } catch (err){
        next(err);
    }
};

const adminUserUpdate = async (req,res,next) => {

    if(req.body.hasOwnProperty('password')){
        req.body.password = await bcrypt.hash(req.body.password, 10);
    }

    const { error, value } = User.joiValidationForUpdate(req.body);
    if(error){
        next(createError(400, error));
    }else{
        try{
            const result = await User.findByIdAndUpdate({_id: req.params.id}, req.body, {new: true, runValidators: true});
            if(result){
                return res.json(result);
            }else{
                return res.status(404).json({
                    message: "User Not Found!",
                });
            }
        }catch (err){
            next(err);
        }
    }
};

const adminUserDelete = async (req,res,next) => {
    try{
        const result = await User.findByIdAndDelete({_id: req.params.id});
        if(result){
            return res.json({
               message: "User Deleted!",
           });
        }else{
            throw createError(404, 'User not found!');
        }
    }catch (err){
        next(createError(400, err));
    }
    
};

module.exports = {
    allUsers,
    myAccount,
    loggedUserUpdate,
    register,
    login,
    adminUserUpdate,
    adminUserDelete,
    loggedUserDelete
}