const mongoose = require("mongoose")

const packageSchema = new mongoose.Schema({
    package_title :{
        type:String
    },
    package_icon :{
        type:String
    },
    days_plan:{
        type:String
    },
    benefits:{
        type:String
    },
    sub_benefits:{
        type:String
    },
    description:{
        type:String
    },
    price:{
        type:String
    },
    recommended:{
        type:Boolean
    }
})

module.exports =  mongoose.model("Packages",packageSchema)