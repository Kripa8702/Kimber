const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema({
    name : {
        required : true,
        type : String
    },

    // id : {
    //     required : true,
    //     type : String
    // },

    email : {
        required : true,
        type : String
    },

})

module.exports = mongoose.model('User' , userSchema)