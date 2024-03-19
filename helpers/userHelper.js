const bcrypt = require('bcrypt')
const saltRounds = 10;
const User = require('../models/userSchema')
const Newsletter = require("../models/newsletterSubscription")
const getInTouch = require("../models/getInTouch")
const hiring = require("../models/hiringSchema")

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
                return({Exist:true})
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
    },

    letterSub:async(Email)=>{
        try {
            console.log(Email,"emailllllllllll");
           
            const emailExist = await Newsletter.findOne({email:Email})
            
            if(emailExist){
                console.log(emailExist);
                return ({subscribed:true})
            }else{
                // console.log(mail,"kkkkkkkkkkkkkkk");
                const newSub = new Newsletter({
                    email:Email
                })
                const res = await newSub.save()
                console.log(res,"yyyyyyyyyyyyyyy");
                return (res)
            }
            

        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },
    postGet_in_touchForm:async (formData)=>{
        try {
           console.log(formData);
            return new Promise((resolve,reject)=>{
                const newData = new getInTouch({
                    name:formData.name,
                    email:formData.email,
                    mobile:formData.mobile,
                    message:formData.message
                })
                newData.save().then((result)=>{
                    resolve(result)
                }).catch((error)=>{
                    console.log(error);
                    reject(error)
                })
            })
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },

    postResume:async(data,s3Result)=>{

        try {
            const newAppln =new hiring({
                name : data.name,
                email:data.email,
                number:data.mobile,
                position:data.position,
                resume:s3Result.file.Location,
                coverletter:data.coverletter
            })
            const result = await newAppln.save()
            console.log(result,"mongodb done...");
            return (result)

        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },

    contactUsForm:(datas)=>{
        try {
            
        } catch (error) {
            console.log(error);
            return({error:true})
        }
    },

    getOneUser:async(Id)=>{

        try {

            console.log(Id,"in helper........");
            const findUser =  await User.findOne({_id:Id})
            console.log(findUser,"findoutttttttt");
            if(findUser){
                return ({notfind:false},findUser)
            }else{
                return ({notfind:true})
            }
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },
    getOneUserAndUpdate: async (Id, updatedProfileData) => {
        try {
          console.log(Id, "in helper........");
          const findUser = await User.findOne({ _id: Id });
          console.log(findUser, "findoutttttttt");
          if (findUser) {
            const updatedUser = await User.findByIdAndUpdate(
                Id,
              updatedProfileData,
              { new: true }
            );
    
            console.log(updatedUser,"updated daaaaaaaaaata..........");
            if(updatedUser){
                return ({update:true,updatedUser})
            }else{
                return ({ update:false })
            }
          } else {
            return { notfind: true };
          }
        } catch (error) {
          console.log(error);
          return { error: true };
        }
    },
    deleteProfile:async(userId)=>{
        try{
            
            const deletedProf = await User.findByIdAndDelete({_id:userId})
            console.log(deletedProf,"deletteddddd");
            if(deletedProf){

                return ({deleted:true})
            }else{
                return ({deleted:false})

            }
        } catch (error) {
            console.log(error);
            return { error: true };
        }
    }
    
    
    
}