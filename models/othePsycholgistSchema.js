const mongoose = require('mongoose')
const otherPsychologistSchema = new mongoose.Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    mobile:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    gender:{
        type:String
    },
    available:{
        type:String,
        default:true
    },
    
    resume:{
        type:String
    },
    description:{
        type:String
    },
    image:{
        type:String
    }
},
{
    timestamps:true
})

module.exports = mongoose.model('joinedPsychologist',otherPsychologistSchema)

