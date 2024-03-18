const mongoose = require('mongoose')
const psychologystSchema = new mongoose.Schema({
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
        type:String
    },
    
    // resume:{
    //     type:String
    // },
    // discription:{
    //     type:String
    // },
    // image:{
    //     type:String
    // }
},
{
    timestamps:true
}
)

module.exports = mongoose.model("psychologyst",psychologystSchema)