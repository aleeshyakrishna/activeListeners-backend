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
        // if(response.error){
        //     res.status(500).json({message:"something went wrong!!"})
        // }
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
      console.log(req.body, "kooooooooooooooiii");
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
          console.log(response.userExist, "response");
          const user = response.userExist;
          const username = response.userExist.name;
          const userid = response.userExist._id;
          console.log(userid, username, "peeeeeeeeeeeeeeee");

          const Token = userHelper.createToken(userid.toString(), username);
          console.log(Token, "this is tokennnnnnnn");

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
      console.log(req.body, "huhu");
      // const verify = userHelper.verifyMobile(req.body)
      await userHelper.userExist(req.body).then(async(response)=>{
        
          console.log(response,"oooouuuuoo");
     if(response.length > 0){
        const otp = await twilio.sendOtp(req.body)
        console.log(otp,"lll");
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

//   verifyOtp: async(req, res) => {
//     try {
//       console.log(req.body, "ooooooooooootpp");
//       var {mobile,otp} = req.body
//       const verify = await twilio.verifyOtp(mobile,otp)
//       console.log(verify,'verification process......');
//       if(verify.error){
//         console.log("errorrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr");
//       }
//       if(verify.valid){
//         await userHelper.userExisted(mobile).then((response)=>{
//             console.log(response,"vaaaaaalid....");
//             const user = response;
//           const username = response.name;
//           const userid = response._id;
//           console.log(userid, username, "peeeeeeeeeeeeeeee");

//           const Token = userHelper.createToken(userid.toString(), username);
//           console.log(Token, "this is tokennnnnnnn");

//           res.json({
//             message: "user successfully logedIn",
//             user,
//             status: true,
//             Token,
//           });
//         })
        
//       }else{
//         res.status(404).json({message:"enter a valid otp"})
//       }
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({ message: "internal server error!!" });
//     }
//   },

verifyOtp: async (req, res) => {
    try {
      console.log(req.body, "OTP verification request");
      const { mobile, otp } = req.body;
  
      // Verify OTP
      const verificationResult = await twilio.verifyOtp(mobile, otp);
      console.log(verificationResult, 'Verification result');
  
      if (verificationResult.valid) {
        // OTP verification successful
        // Authenticate user and generate token
        const user = await userHelper.userExisted(mobile);
        if (user) {
           console.log(user,"userrr in verification");
          const username = user[0].name;
          const userid = user[0]._id;
          console.log(userid, username, "peeeeeeeeeeeeeeee");

          const Token = userHelper.createToken(userid.toString(), username);
          console.log(Token, "this is tokennnnnnnn");
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
  }
  


};
