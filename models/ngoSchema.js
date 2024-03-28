const mongoose= require("mongoose")
const NgoSchema = new mongoose.Schema({
    name_of_organization :{
        type:String
    },

    year_of_establishment:{
        type:String
    },

    number_of_offices:{
        type:String
    },

    telephoneNumber :{
        type:String
    },
    email:{
        type:String
    },
    websiteUrl :{
        type:String
    },
    contact_person_name:{
        type:String
    },
    contact_person_designation:{
        type:String
    },
    contact_person_phoneNumber:{
        type:String
    }
},
{timestamps:true}
)

module.exports = mongoose.model("Ngo",NgoSchema)