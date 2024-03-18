const mongoose = require("mongoose")

const hiringSchema = new mongoose.Schema({
    name :{
        type:String
    },
    email:{
        type:String
    },
    number:{
        type:String
    },
    position:{
        type:String
    },
    resume:{
        type:String
    },
    coverletter:{
        type:String
    },
    status:{
        type:String,
        default:"applied"
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("hiring",hiringSchema)
