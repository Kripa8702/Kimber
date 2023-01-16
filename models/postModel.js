const { default: mongoose } = require("mongoose");

const postSchema = mongoose.Schema({
    postId : {
        required : true,
        type : String
    },
    picUrl : {
        required : true,
        type : String
    },
    description : {
        required : false,
        type : String
    },
    datePublished : {
        required : true,
        type : String
    },
    tags : {
        required : false,
        type : [String]
    },
})

module.exports = mongoose.model('Post' , postSchema)