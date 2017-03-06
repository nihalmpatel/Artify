// app/models/user.js

const mongoose = require('mongoose');
const bcrypt   = require('bcrypt-nodejs');



// user Model ===========================================
var userSchema = mongoose.Schema({

    local           : {
        username    : {type:String, unique:true, required: true} ,
        password    : {type:String, required: true}
    },

    profile         : {
        firstname   : String,
        lastname    : String,
        email       : String,
        profilepic  : String,
        bio         : String,
        age         : Number,
        location    : String,
    },

    following       : [],
    followers       : [],
    stories         : [],
    interests       : [],

    /*
    facebook         : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    },
    twitter          : {
        id           : String,
        token        : String,
        displayName  : String,
        username     : String
    },
    google           : {
        id           : String,
        token        : String,
        email        : String,
        name         : String
    } */

});

// =====================================================

// methods =============================================
// generating a hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if hashed password is valid
userSchema.methods.validPassword = function(hashedPassword) {
    return bcrypt.compareSync(hashedPassword, this.local.password);
};

// =======================================================

// create the model for users and expose it to our app
module.exports = mongoose.model('user', userSchema);