const mongoose = require("mongoose")
const collegeSchema = new mongoose.Schema({
    name_of_college:{
        type:String
    },
    telephoneNumber:{
        type:String
    },
    email:{
        type:String
    },
    websiteUrl:{
        type:String
    },
    contact_person_name:{
        type:String
    },
    contact_person_email:{
        type:String
    },
    contact_person_designation:{
        type:String
    },
    contact_person_phoneNumber:{
        type:String
    }
    
},{
    timestamps:true
})
module.exports = mongoose.model("College",collegeSchema)