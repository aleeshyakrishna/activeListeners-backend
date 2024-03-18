const Psychologyst = require("../models/psychologystSchema")
const User = require("../models/userSchema")
const Hiring =require("../models/hiringSchema")
module.exports = {
    AddPsychologyst:async(psychologystData)=>{

        try {
            console.log(psychologystData,"poioopoi");
            
            const PsychoExist = await Psychologyst.findOne({email:psychologystData.email})
            const mobileExist =await Psychologyst.findOne({mobile:psychologystData.mobile})
            console.log(PsychoExist,"existing....");
          
            if(PsychoExist || mobileExist){
                console.log("existing already................");
                // res.json({message:"Psychologyst alredy existing!"})
                return({Exist:true})
            }else{
                console.log("intooooooooooooooooo");
                const newPsycho =await new Psychologyst({
                    name:psychologystData.name,
                    email:psychologystData.email,
                    mobile:psychologystData.mobile,
                    city:psychologystData.city,
                    state:psychologystData.state,
                    gender:psychologystData.gender,
                    available:psychologystData.available
                })
    
                const Psycho =await newPsycho.save()
                console.log(Psycho,"datas in helper psyhcp");
                return(Psycho)
            }
            
        } catch (error) {
            console.log(error);
            return({error:true})
        }
    },
    viewPsychologyst:async()=>{
        try {
            const allPsychos = await Psychologyst.find()
            console.log(allPsychos,"psychologyst");
            return (allPsychos)
        } catch (error) {
            console.log(
                error
            );
            return ({error:true})
        }
    },
    getOnePsycho:async(Id)=>{

        try {

            console.log(Id,"in helper........");
            const findPsycho =  await Psychologyst.findOne({_id:Id})
            console.log(findPsycho,"findoutttttttt");
            if(findPsycho){
                return ({notfind:false},findPsycho)
            }else{
                return ({notfind:true})
            }
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },
    findUsers:async()=>{
        try {
            const allUsers = await User.find()
            console.log(allUsers.length,"all users........");
           if(allUsers.length < 0){
            return ({noUsers:true})
           }else{
            return ({noUsers:false},allUsers)
           }
        } catch (error) {
            return ({error:true})
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
    findHiring:async()=>{
        try {
            const allAppln = await Hiring.find()
            console.log(allAppln.length,"all users........");
           if(allAppln.length < 0){
            return ({noUsers:true})
           }else{
            return ({noUsers:false},allAppln)
           }
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    }
}