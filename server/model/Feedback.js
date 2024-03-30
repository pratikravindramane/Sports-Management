const mongoose = require('mongoose'); // Erase if already required

// Declare the Schema of the Mongo model
var FeedbackSchema = new mongoose.Schema({
    user:{
        type:String,
        required:true,
        unique:true,
        index:true,
    },
    text:{
        type:String,
        required:true,
        unique:true,
    },
});

//Export the model
module.exports = mongoose.model('Feedback', FeedbackSchema);