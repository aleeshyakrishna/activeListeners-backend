const mongoose = require("mongoose")
const podcastSchema = new mongoose.Schema({
    title:{
        type:String
    },
    discription:{
        type:String
    },
    category:{
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

module.exports = mongoose.model("Podcast",podcastSchema)