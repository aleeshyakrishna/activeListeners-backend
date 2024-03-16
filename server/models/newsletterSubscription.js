const mongoose = require("mongoose");

const newsletterSubSchema = ({

    email:{
        type:String,
        
    }
})

module.exports = mongoose.model("newletterSubscription",newsletterSubSchema)