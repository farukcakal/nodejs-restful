const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Joi = require('@hapi/joi');
const createError = require('http-errors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new Schema({
    name:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    surName:{
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 50,
    },
    userName:{
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 50,
    },
    email:{
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password:{
        type: String,
        required: true,
        minlength: 6,
        trim: true,
    },
    balance:{
        type: Number,
        default: 0,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    isArtist: {
        type: Boolean,
        default: false,
    },
    bio: {
        type: String,
        maxlength: 200,
    },
    profilePicture: {
        type: String,
        maxlength: 200,
        default: null,
    },
    countryCode: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        minlenght: 10,
        maxlength: 10,
        required: true,
    },
    instagram: {
        type: String,
        maxlength: 200,
        default: null,
    },
    twitter: {
        type: String,
        maxlength: 200,
        default: null,
    },
},{collection:'users', timestamps:true});

    const schema = Joi.object({
        name : Joi.string().min(3).max(50).trim(),
        surName : Joi.string().min(3).max(50).trim(),
        userName : Joi.string().min(3).max(50).trim(),
        email : Joi.string().trim().email(),
        password : Joi.string().min(6).trim(),
        countryCode: Joi.string(),
        phone: Joi.string().min(10).max(10),
    });

userSchema.methods.generateToken = async function () {
    const loggedUser = this;
    const token = await jwt.sign({_id:loggedUser._id},'secretkey',{expiresIn : '1y'});
    return token;
}

//yeni bir user için bu validation kullanılır
userSchema.methods.joiValidation = function (userObject){
    schema.required();
    return schema.validate(userObject);
}

//Json veride kullanıcıya gösterilmesini istemediğimiz alanları gizliyoruz
userSchema.methods.toJSON = function () {
    const user = this.toObject();
    delete user._id;
    delete user.password;
    delete user.createdAt;
    delete user.updatedAt;
    delete user.__v;

    return user;
}

userSchema.statics.login = async (email, pw) => {
   
    const {error, value} = schema.validate({email});
    if(error){
        throw  createError(400, error);
    }
    const user = await User.findOne({ email });
    if(!user){
        throw  createError(400,"Incorrect Username or Password..");
    }

    const password = await bcrypt.compare(pw, user.password);
    if(!password){
        throw  createError(400,"Incorrect Username or Password..");
    }

    return user;
}
//burası ise update için kullanılır
userSchema.statics.joiValidationForUpdate = function (userObject){
    return schema.validate(userObject);
}

const User = mongoose.model('User', userSchema);

module.exports = User;