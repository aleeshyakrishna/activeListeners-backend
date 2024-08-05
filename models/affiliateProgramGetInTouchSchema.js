const mongoose = require('mongoose')
const Schema = mongoose.Schema

const affiliateProgramGetInTouchSchema = new Schema({
    enroll_as:{
        type:String
    },
    name:{
        
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    country:{
        type:String
    },
    state:{
        type:String
    },
    support_in:{
        type:String
    },
    message:{
        type:String
    }
   
})

module.exports = mongoose.model('griefSupport_getInTouch',affiliateProgramGetInTouchSchema)