const mongoose = require('mongoose')
const schoolSchema = new mongoose.Schema({
    student_name:{
        type:String
    },
    email:{
        type:String
    },
    contact_number:{
        type:String
    },
    country:{
        type:String
    },
    state:{
        type:String
    },
    city:{
        type:String
    },
    pin:{
        type:String
    },
    dob:{
        type:String
    },
    standard:{
        type:String
    },
    school_name:{
        type:String
    }
})

module.exports = mongoose.model('School',schoolSchema)