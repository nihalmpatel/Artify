/**
 * Created by Nihal M Patel on 21-03-2017.
 */

const mongoose = require('mongoose');

// post Model ===========================================
var postSchema = mongoose.Schema({
    title           : {type:String, required: true} ,
    description     : {type:String, required: true} ,
    /*author          : {type:String, required: true} ,
    date            : {type: Date, default: Date.now},
    meta            : {
        readtime:   Number,
        likes:      Number
    },
    comments: [{commenter: String, body: String, date: Date}],*/
});

// =====================================================


// =======================================================

// create the model for users and expose it to our app
module.exports = mongoose.model('post', postSchema);