const mongoose = require('mongoose')
const schoolSchema = new mongoose.Schema({
    school_name:{
        type:String
    },
    address:{
        type:String
    },
    email:{
        type:String
    },
    contact_number:{
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

})

module.exports = mongoose.model('School',schoolSchema)