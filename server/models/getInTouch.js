const mongoose = require('mongoose')
const Schema = mongoose.Schema

const getInTouchFormSchema = new Schema({

    name:{
        
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    message:{
        type:String
    }
   
})

module.exports = mongoose.model('getInTouch_Requests',getInTouchFormSchema)