const Psychologyst = require("../models/psychologystSchema")

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
    }
}