const bcrypt = require('bcrypt')
const saltRounds = 10;
const User = require('../models/userSchema')
var dotenv = require("dotenv");
dotenv.config();
const jwt = require('jsonwebtoken')
var jwt_token = process.env.jwt_token
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
    },
    userSignin:async(signIndata)=>{

        try {
            console.log("helperrrrrrrr",signIndata);
            var userExist = await User.findOne({email:signIndata.username})
            console.log(userExist,"lllllllllllll");
            if(userExist){
                
                console.log(userExist,"iiiii");
                const checkPassword =await bcrypt.compare(
                    signIndata.password,userExist.password)
                    console.log(checkPassword,"checking password......");
                if(!checkPassword){
                    return({PassError:true})
                }else{
                    return ({exist:true,userExist})
                }
            }else{
                console.log("not exist");
                return ({exist:false})
            }

        } catch (error) {
            return ({error:true})
        }

    },
    createToken:(userId,userName)=>{
        try {
            if(jwt_token){
                console.log(userId,userName,jwt_token,".........>");
            const token = jwt.sign(
                { userId, userName }, // Wrap the payload in an object
                jwt_token,
                { expiresIn: "1h" }
              );

              return token;
            }else{
                return({error:true})
            }
            
        } catch (error) {
            console.log(error);
            return({error:true})
        }
    },
    userExist: async (Mobile) => {
        try {
            var { mobile } = Mobile;
            console.log(mobile, "kkkkkkkkkkkkkkkkk");
    
            // Using async/await directly inside the function
            var userExists = await User.find({ mobile: mobile });
    
            console.log(userExists, "User details for OTP verification");
    
            return userExists; // Return the result directly
        } catch (error) {
            console.error(error);
            return { error: true };
        }
    },
    userExisted:async(mobile)=>{
        try {
            
            console.log(mobile, "kkkkkkkkkkkkkkkkk");
    
            // Using async/await directly inside the function
            var userExists = await User.find({ mobile: mobile });
    
            console.log(userExists, "User details for OTP verification");
    
            return userExists; // Return the result directly
        } catch (error) {
            console.error(error);
            return { error: true };
        }
    }
    
    
}