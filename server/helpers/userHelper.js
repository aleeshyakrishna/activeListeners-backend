const bcrypt = require('bcrypt')
const saltRounds = 10;
const User = require('../models/userSchema')

module.exports = {
    userRegistration:async(userData)=>{
        try {
            console.log(userData,"daaaaataaaaaaaaaa helper");
            const emailExist = await User.findOne({email:userData.email})
            const mobileExist = await User.findOne({mobile:userData.mobile})
            if(emailExist || mobileExist){
                // console.log("exists user",emailExist,mobileExist);
                return({Exist:true,message:"user Exist!please login!!"})
            }
            // console.log("not exists..");
            const hashedPassword = await bcrypt.hash(userData.password,saltRounds)
            // console.log("llll");
            const newUser =await  new User({
                name : userData.name,
                email:userData.email,
                mobile:userData.mobile,
                password:hashedPassword
            })
            const userCreated =await newUser.save()
            return(userCreated)
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    }
}