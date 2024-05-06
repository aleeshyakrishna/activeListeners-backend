const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({

    name:{
        type:String
    },
    email:{
        type:String,
        // unique:true
    },
    mobile:{
        type:String,
        // unique:true
    },
    password:{
        type:String
    },
    gender:{
        type:String
    },
    profilePic:{
        type:String,
        default:null
    }
   
},
{
    timestamps:true
}
)

module.exports = mongoose.model('user',userSchema)