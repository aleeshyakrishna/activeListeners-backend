const userHelper = require("../helpers/userHelper");
const twilio = require("../utils/twilio");

module.exports = {
  getHome: (req, res) => {
    try {
      res.status(200).json({ message: "welcome to Active Listeners!!" });
    } catch (error) {
      res.json({ message: "internal server error!!" });
    }
  },

  registerUser: async (req, res) => {
    try {
      await userHelper.userRegistration(req.body).then((response) => {
        if (response.Exist) {
          const msg = response.message;
          res.status(409).json({ message: msg });
        } else {
          res.status(200).json({ message: "user registered successfully!!" });
        }
      });
    } catch (error) {
      res.status(500).json({ message: "internal server error!" });
    }
  },

  signinUser: async (req, res) => {
    try {
      // console.log(req.body, "kooooooooooooooiii");
      await userHelper.userSignin(req.body).then((response) => {
        if (response.error) {
          res.status(500).json({ message: "something went wrong!!" });
        }
        if (response.PassError) {
          res.status(404).json({ message: "invalid password or id" });
        }
        if (!response.exist) {
          res.status(404).json({ message: "User not found!!" });
        } else {
          // console.log(response.userExist, "response");
          const user = response.userExist;
          const username = response.userExist.name;
          const userid = response.userExist._id;
          // console.log(userid, username, "peeeeeeeeeeeeeeee");

          const Token = userHelper.createToken(userid.toString(), username);
          // console.log(Token, "this is tokennnnnnnn");

          res.json({
            message: "user successfully logedIn",
            user,
            status: true,
            Token,
          });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!!" });
    }
  },

  otpLogin: async (req, res) => {
    try {
      // console.log(req.body, "huhu");
      await userHelper.userExist(req.body).then(async(response)=>{
        
          // console.log(response,"oooouuuuoo");
     if(response.length > 0){
        const otp = await twilio.sendOtp(req.body)
        // console.log(otp,"lll");
        if(otp){
            res.status(200).json({message:"otp send successfully!!"})
        }else{
            res.json({message:"otp cant send.."})
        }
           
    
     }else{
        res.json({message:"something went wrong"})
     }
      }).catch(()=>{
        res.json({message:"user not registered!!"})
      })
      
      
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!!" });
    }
  },

verifyOtp: async (req, res) => {
    try {
      // console.log(req.body, "OTP verification request");
      const { mobile, otp } = req.body;
  
      // Verify OTP
      const verificationResult = await twilio.verifyOtp(mobile, otp);
      // console.log(verificationResult, 'Verification result');
  
      if (verificationResult.valid) {
        // OTP verification successful
        // Authenticate user and generate token
        const user = await userHelper.userExisted(mobile);
        if (user) {
          //  console.log(user,"userrr in verification");
          const username = user[0].name;
          const userid = user[0]._id;
          // console.log(userid, username, "peeeeeeeeeeeeeeee");

          const Token = userHelper.createToken(userid.toString(), username);
          // console.log(Token, "this is tokennnnnnnn");
          res.json({
            message: "user successfully logedIn",
            user,
            status: true,
            Token,
          });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } else {
        // OTP verification failed
        res.status(400).json({ message: "Invalid OTP" });
      }
    } catch (error) {
      console.error("Error in OTP verification:", error);
      const msg = error.message
      res.status(500).json({ message: msg });
    }
  },

  newsLetterSub:async(req,res)=>{
    try {
      console.log(req.body,"newaletter sub");
      const {email} = req.body;
      const response = await userHelper.letterSub(email)
      console.log(response,"responseeeeeeeeeeeeeee");
      if(response.error){
        res.status(404).json({message:"internal error occured!!"})
      }else if(response.subscribed){
        res.json({message:"already subscribed!!"})
      }else{
        res.status(200).json({message:"successfully subscribed!!"})
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({message:"internal server error!!"})
    }
  },
  postGetInTouch : async(req,res)=>{
    try {
        console.log("entered dataaa",req.body);
        userHelper.postGet_in_touchForm(req.body).then((data)=>{
            if(data.error){
                res.status(500).json({message:"something went wrong!!please try again later!"})
            }else{
                res.status(200).json({message:"succesfully submitted the form!we will get in touch as soon as possible!"})
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({message:"internal server error!!"})
    }
},
  


};
