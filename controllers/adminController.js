var adminHelper = require("../helpers/adminHelper");

const adminCredential = {
  name: "ACTIVELISTENERS ADMIN PANEL",
  email: "admin@gmail.com",
  password: "123",
};

module.exports = {
  adminLogin: (req, res) => {
    try {
      console.log((req.body, "admin data"));

      if (
        req.body.email == adminCredential.email &&
        req.body.password == adminCredential.password
      ) {
        res.status(200).json({ message: "Admin loggedIn successfully!!" });
      } else {
        res.status(401).json({ message: "invalid password/email" });
      }
    } catch (error) {
      res.status(500).json({ message: "internal server error!!" });
    }
  },

  addPsychologyst: async(req, res) => {
    try {
        
        const psychologyst = await adminHelper.AddPsychologyst(req.body)
        console.log(psychologyst,"psychologsttttttttttttttttttt");
        if(psychologyst.Exist){

            res.status(400).json({message:"Psychologyst already existing"})
        }else if(psychologyst.error){
            res.status(400).json({message:"cant find psychologyst!"})
        }else{
            res.status(200).json({message:"successfully added psychologyst"})
        }

    } catch (error) {
      res.status(500).json({ message: "internal server error!!" });
    }
  },
  viewPsychologyst:async(req,res)=>{
    try {
        const psychos =  await adminHelper.viewPsychologyst()
        console.log(psychos,"controller..........");
        if(psychos.error){
            res.json({message:"something went wrong!"})
        }else{
            res.status(200).json({psychos})
        }
    } catch (error) {
        console.log(error);
        return(error)
    }
  },
  viewPsychologyst:async(req,res)=>{
    try {
      console.log(req.params._id,"iiiiiiiiiiiiiiiiiiiddd");
      const OnePsychologyst = await adminHelper.getOnePsycho(req.params._id)
      console.log(OnePsychologyst,"enter into conroller");
      if(OnePsychologyst.error || OnePsychologyst.notfind){
        res.json({message:"you cant view psychologyst now"})
      }else{
        res.status(200).json({OnePsychologyst})
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"internal server error"})
    }
  },

  findAllUsers:async(req,res)=>{
    try {
        const response = await adminHelper.findUsers()
        console.log(response,"in controller");
        if(response.error){
          res.status(404).json({message:"something went wrong!please try again later"})
        }else if(response.noUsers){
          res.status(404).json({message:"users not available"})
        }else{
          res.status(200).json({response})
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error"})
    }
},
viewUser:async(req,res)=>{
  try {
    console.log(req.params._id,"iiiiiiiiiiiiiiiiiiiddd");
    const Getuser = await adminHelper.getOneUser(req.params._id)
    console.log(Getuser,"enter into conroller");
    if(Getuser.error || Getuser.notfind){
      res.json({message:"you cant view psychologyst now"})
    }else{
      res.status(200).json({Getuser})
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({message:"internal server error"})
  }
},
viewHiring:async(req,res)=>{
  try {
    const response = await adminHelper.findHiring()
    console.log(response,"ressss");
    if(response.error){
      res.status(404).json({message:"something went wrong!please try again later"})
    }else if(response.noUsers){
      res.status(404).json({message:"users not available"})
    }else{
      res.status(200).json({response})
    }
  } catch (error) {
    res.status(500).json({message:"internal server error!"})
  }
}
};
