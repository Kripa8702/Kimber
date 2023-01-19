const { default: mongoose } = require("mongoose");

const postSchema = mongoose.Schema({
    userId : {
        required : true,
        type : String
    },
    postId : {
        required : true,
        type : String
    },
    picUrl : {
        required : true,
        type : String
    },
    label : {
        required : false,
        type : String
    },
    description : {
        required : false,
        type : String
    },
    likes : {
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