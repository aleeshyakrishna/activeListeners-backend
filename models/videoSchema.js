const mongoose = require("mongoose")
const videoSchema = new mongoose.Schema({
    title:{
        type:String
    },

    page:{
        type:String
    },
    description:{
        type:String
    },

    thumbnail:{
        type:String
    },
    
    source:{
        type:String
    }
},
{
    timestamps:true
}
)

module.exports = mongoose.model("videos",videoSchema);