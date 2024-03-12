const userHelper = require('../helpers/userHelper')



module.exports = {
    getHome:(req,res)=>{
        try {
           res.status(200).json({message:"welcome to Active Listeners!!"})
        } catch (error) {
            res.json({message:"internal server error!!"})
        }
    } ,

    registerUser:async(req,res)=>{
        try {
            console.log("data.....",req.body);
             await userHelper.userRegistration(req.body).then((response)=>{
                if(response.error){
                    res.status(500).json({message:"something went wrong!!"})
                }

                
             })
            
            // res.status(200).json({message:"user registered successfully!!"})
        } catch (error) {
            res.status(500).json({message:"internal server error!"})
        }
    } ,
}