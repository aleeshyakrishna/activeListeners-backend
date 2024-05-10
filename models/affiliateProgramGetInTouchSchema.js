const mongoose = require('mongoose')
const Schema = mongoose.Schema

const affiliateProgramGetInTouchSchema = new Schema({

    name:{
        
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    subject:{
        type:String
    },
    message:{
        type:String
    }
   
})

module.exports = mongoose.model('affiliateProgram_getInTouch_Requests',affiliateProgramGetInTouchSchema)