const mongoose = require("mongoose")

const teamMemberSchema = new mongoose.Schema({

    name:{
        type:String
    },
    image:{
        type:String
    },
    designation:{
        type:String
    },
    socialmediaLink:{
        type:String
    },
    audio:{
        type:String
    }

})

module.exports = mongoose.model("Team-member",teamMemberSchema)