const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    userId : {
        required : true,
        type : String
    },
    
    username : {
        required : true,
        type : String
    },

    
    email : {
        required : true,
        type : String
    },

    password : {
        required : true,
        type : String
    },
    
    profilePic : {
        required : false,
        type : String
    },

    moodTags : {
        required : false,
        type : [String]
    },

})

module.exports = mongoose.model('User' , userSchema)