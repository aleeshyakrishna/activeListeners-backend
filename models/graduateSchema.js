const mongoose = require("mongoose")
const graduateSchema = new mongoose.Schema({
    name:{
        type:String
    },
    pincode:{
        type:String
    },
    city:{
        type:String
    },
    state:{
        type:String
    },
    country:{
        type:String
    },
    mobile:{
        type:String
    },
    email:{
        type:String
    },
    dob:{
        type:String
    },
    qualification:{
        type:String
    },
    college:{
        type:String
    },
    yearOfpassing:{
        type:String
    },
    cgpa:{
        type:String
    },
    internship:{
        type:Boolean
    },
    internshipDetails:{
        type:String
    },
    linkedIn:{
        type:String
    },
    github:{
        type:String
    },
    otherSocialMedia:{
        type:String
    },
    // expectedSalary:{
    //     type:String
    // },
    // resume:{
    //     type:String
    // }
},{
    timestamps:true
})
module.exports = mongoose.model("Graduates",graduateSchema)