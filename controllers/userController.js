const userHelper = require("../helpers/userHelper");
const twilio = require("../utils/twilio");
const s3Model = require("../models/s3Model");
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
      console.log(req.body,"..............................")
      if(req.body.iss){
        console.log("kkkk")
        await userHelper.userRegistrationWithGoogle(req.body).then((response) => {
          if (response.Exist) {
            res.json({ message:"user Exist!please login!!"});
          } else {
            res.status(200).json({ message: "user registered successfully!!" });
          }
        });
      }else{
        console.log("kkoooo")
        await userHelper.userRegistration(req.body).then((response) => {
          if (response.Exist) {
            res.json({ message:"user Exist!please login!!"});
          } else {
            res.status(200).json({ message: "user registered successfully!!" });
          }
        })
      }
    }catch (error) {
      res.status(500).json({ message: "internal server error!" });
    }
  },

  signinUser: async (req, res) => {
    try {
      console.log(req.body, "kooooooooooooooiii");
      if(req.body.iss){
          console.log("hehhee")
          await userHelper.userSigninWithGoogle(req.body).then((response) => {
            if (response.error) {
              res.status(500).json({ message: "something went wrong!!" });
            }else if (response.PassError) {
              res.json({ message: "invalid password or id" });
            }
            else if (response.exist) {
               // console.log(response.userExist, "response");
               const user = response.userExist;
               const username = response.userExist.name;
               const userid = response.userExist._id;
               // console.log(userid, username, "peeeeeeeeeeeeeeee");
     
               const Token = userHelper.createToken(userid.toString(), username);
               // console.log(Token, "this is tokennnnnnnn");
     
               res.status(200).json({
                 message: "user successfully logedIn",
                 user,
                 status: true,
                 Token,
               });
            } else {
              res.json({ message: "User not found!!" });
             
            }
          });
      }else{

        await userHelper.userSignin(req.body).then((response) => {
          if (response.error) {
            res.status(500).json({ message: "something went wrong!!" });
          }else if (response.PassError) {
            res.json({ message: "invalid password or id" });
          }
          else if (response.exist) {
             // console.log(response.userExist, "response");
             const user = response.userExist;
             const username = response.userExist.name;
             const userid = response.userExist._id;
             // console.log(userid, username, "peeeeeeeeeeeeeeee");
   
             const Token = userHelper.createToken(userid.toString(), username);
             // console.log(Token, "this is tokennnnnnnn");
   
             res.status(200).json({
               message: "user successfully logedIn",
               user,
               status: true,
               Token,
             });
          } else {
            res.json({ message: "User not found!!" });
           
          }
        });
      }

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!!" });
    }
  },

  otpLogin: async (req, res) => {
    try {
      console.log(req.body, "huhu");
      await userHelper
        .userExist(req.body)
        .then(async (response) => {
          // console.log(response,"oooouuuuoo");
          if (response.length > 0) {
            const otp = await twilio.sendOtp(req.body);
            // console.log(otp,"lll");
            if (otp) {
              res.status(200).json({ message: "otp send successfully!!" });
            } else {
              res.json({ message: "otp cant send.." });
            }
          } else {
            res.json({ message: "something went wrong" });
          }
        })
        .catch(() => {
          res.json({ message: "user not registered!!" });
        });
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
      const msg = error.message;
      res.status(500).json({ message: msg });
    }
  },

  newsLetterSub: async (req, res) => {
    try {
      console.log(req.body, "newaletter sub");
      const { email } = req.body;
      const response = await userHelper.letterSub(email);
      console.log(response, "responseeeeeeeeeeeeeee");
      if (response.error) {
        res.status(404).json({ message: "internal error occured!!" });
      } else if (response.subscribed) {
        res.json({ message: "already subscribed!!" });
      } else {
        const jii = await userHelper.sendVerificationEmail(response,res)
        console.log(jii,"joooooooooooo");
        if(jii){

          res.status(200).json({message:"Thankyou for Subscribing with Active Listeners"})
        }
        // res.status(200).json({ message: "successfully subscribed!!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!!" });
    }
  },
  postGetInTouch: async (req, res) => {
    try {
      console.log("entered dataaa", req.body);
      userHelper.postGet_in_touchForm(req.body).then((data) => {
        if (data.error) {
          res
            .status(500)
            .json({ message: "something went wrong!!please try again later!" });
        } else {
          res
            .status(200)
            .json({
              message:
                "succesfully submitted the form!we will get in touch as soon as possible!",
            });
        }
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!!" });
    }
  },

  applicatonForm: async (req, res) => {
    try {
      console.log(req.body, req.file, "hiring formmm.........");
      const ressss= await userHelper.checkExist(req.body)
      console.log(ressss,"resssssssssssssssssssssssssssssssss");
      if(ressss.error){
        res.status(500).json({message:"Something went wrong!!"})
      }else if(ressss.alreadyExist){
        res.json({message:"You are already applied for this position!"})
      }else{
        const result = await s3Model.uploadFile(req.file);
      console.log(result, "after s3 stroing.......");
      if (result) {
        await userHelper.postResume(req.body, result).then((result) => {
          res
            .status(200)
            .json({
              message: "Successfully submitted the application form!",
              result,
            });
        });
      } else {
        res.json({ message: "Something went wrong!!" });
      }
      }
      
    } catch (error) {
      res.status(500).json({ message: "Internal sever error!!" });
    }
  },

  contactUs: async (req, res) => {
    try {
      console.log(req.body, "form data..........");
      const reslt = await userHelper.contactUsForm(req.body);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal server error!" });
    }
  },
  getProfile: async (req, res) => {
    try {
      console.log(req.params.id, "iiiiiiiiiiiiiiiiiiiddd");
      const Getuser = await userHelper.getOneUser(req.params.id);
      console.log(Getuser, "enter into conroller");
      if (Getuser.error || Getuser.notfind) {
        res.json({ message: "you cant view your profile now" });
      } else {
        res.status(200).json({ Getuser });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },

  // editProfile: async (req, res) => {
  //   try {
  //     console.log(req.params.id, "id");
  //     console.log(req.body, ".......");
  //     // const {formData} = req.body
  //     // console.log(formData,"{{");
  //     if(!req.body){
  //       console.log("no data ")
  //     }
  //     const Getuser = await userHelper.getOneUserAndUpdate(req.params.id, req.body);
  //     console.log(Getuser, "userdata updated");
  //     if (Getuser.notfind) {
  //       res.json({ message: "please try again later!" });
  //     } else if (Getuser.error) {
  //       res.json({ message: "internal server error!!" });
  //     } else if (Getuser.update) {
  //       const dataUp = Getuser.update.updatedUser
  //       res
  //         .status(200)
  //         .json({ message: "ok",user:dataUp });
  //     } else {
  //       res.status(500).json({ message: "no" });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     res.status(500).json({ message: "error" });
  //   }
  // },


  editProfile: async (req, res) => {
    try {
        console.log(req.params.id, "id");
        console.log(req.body, ".......");
        
        // Check if request body contains data
        if (!req.body) {
            console.log("No data received");
            return res.status(400).json({ message: "No data received" });
        }

        // Call helper function to update user profile
        const updatedUserData = await userHelper.getOneUserAndUpdate(req.params.id, req.body);
        console.log(updatedUserData, "userdata updated");

        // Handle different scenarios based on the response from the helper function
        if (updatedUserData.notFound) {
            return res.status(404).json({ message: "User not found" });
        } else if (updatedUserData.error) {
            return res.status(500).json({ message: "Internal server error" });
        } else if (updatedUserData.noChange) {
            return res.status(200).json({ message: "No changes made to the user profile" });
        } else if (updatedUserData.emailExist) {
            return res.status(409).json({ message: "Email already exists" });
        } else if (updatedUserData.mobileExist) {
            return res.status(409).json({ message: "Mobile number already exists" });
        } else if (updatedUserData.update && updatedUserData.updatedUser) {
            const updatedUser = updatedUserData.updatedUser;
            return res.status(200).json({ message: "Profile updated successfully", user: updatedUser });
        } else {
            return res.status(500).json({ message: "Unknown error occurred" });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error" });
    }
},

  addProfilePic:async(req,res)=>{
    try {
      console.log(req.params.id, "id",req.file,"profile photo");
      const userProf = await s3Model.profileUpload(req.file)
      console.log(userProf,"s3 result for uploading profile picture");
      if(userProf.error){
        res.json({message:"Error Uploading Profile picture!!"})
      }else{
        const resultts = await userHelper.addProfilePicture(userProf,req.params.id)
        if(resultts.error){
          res.status(500).json({message:"Internal server error!!"})
        }else if(resultts.success){
          const updatedData=resultts.checkUser
          res.status(200).json({message:"profile picture updated!!",updatedData})
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },

  deleteAccount:async(req,res)=>{
    try {
      console.log(req.params.id,"id...........................");
      const response = await userHelper.deleteProfile(req.params.id)
      console.log(response);
      if(response.error){
        res.status(500).json({message:"something went wrong!!"})
      }
      else if(response.deleted){
        res.status(200).json({message:"Account deleted Successfully!!"})
      }else{
        res.status(404).json({message:"user profile not found!"})
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },

  viewAllPodcast:async(req,res)=>{
    try {
      const reslt = await userHelper.getAllPodcast()
      if(reslt.error){
        res.statsus(500).json({message:"internal server error!"})
      }else if(reslt.notfound){
        res.status(404).json({message:"podcast not available now"})
      }else{
        res.status(200).json({reslt})
      }
    } catch (error) {
      res.status(500).json({message:"internal server error!"})
    }
  },

  viewOnePodcast:async(req,res)=>{
    try {
      console.log(req.params.id,"iddddddddddd");
      const onePod = await userHelper.viewOnePod(req.params.id)
      if(onePod){
        res.json({onePod})
      }else{
        res.json({message:"Podcast not available"})
      }
    } catch (error) {
      res.status(500).json({message:"internal server error!"})
    }
  },

  joinNgo:async(req,res)=>{
    try {
      // console.log(req.body,"...");
      const response = await userHelper.postNgo(req.body)
      if(response.error){
        res.status(500).json({message:"internal server error!!"})
      }else if(response.exist){
        res.json({message:"NGO already registered!!"})
      }else{
        res.status(200).json({message:"Registration completed successfully!!"})
      }
    } catch (error) {
      res.status(500).json({message:"internal server error!"})
    }
  },
  joiningGraduates:async(req,res)=>{
    try {
      console.log(req.body,"graduate data");
      //if resume file needed just uncommand the below line of code
      // const response = await s3Model.graduateResume(req.file)
      const response = 20;
      if(response != 20) {
        res.status(500).json({message:"Please try again later! "})
      }else{
        const GraduateResponse = await userHelper.postGraduate(req.body)
        if(GraduateResponse.error){
          res.status(500).json({message:"internal server error!"})
        }else if(GraduateResponse.exist){
          res.json({message:"Already registered!!"})
        }else{
          res.status(200).json({message:"successfully registered"})
        }
      }
      
    } catch (error) {
      res.status(500).json({message:"internal server error!!!"})
    }
  },

  joinPsychologist:async(req,res)=>{
    try {
      console.log("req",req.body)
      var respv = await s3Model.joiningPsycho(req.files);
      if (respv.error) {
        res.json({ message: "something went wrong" });
      } else {
        const psychologist = await userHelper.ApplyingPsychologyst(req.body, respv);
        console.log(psychologist, "psychologsttttttttttttttttttt");
        if (psychologist.Exist) {
          res.status(400).json({ message: "already existing" });
        } else if (psychologist.error) {
          res.status(400).json({ message: "something went wrong!!" });
        } else {
          res.status(200).json({ message: "successfully applied!!" });
        }
      }
    } catch (error) {
      console.log(error,"this  is error")
      res.status(500).json({message:"Something went wrong!!"})

    }
  },

  addGender:async(req,res)=>{
    try {
      console.log("req.bodu",req.body,"id",req.params.id)
      const responseGender = await userHelper.addGender(req.body,req.params.id)
      if(responseGender.error){
        res.status(500).json({message:"Internal server error!!"})
      }else if(responseGender.success){
        const updatedData=responseGender.checkUser
        res.status(200).json({message:"profile picture updated!!",updatedData})
      }
    } catch (error) {
      res.status(500).json({message:"Something went wrong!!"})
    }
  },

  addMobile:async(req,res)=>{
    try {
      console.log(req.body,req.params.id,"request.......>")
      const responseMobile =await userHelper.addMobile(req.body,req.params.id)
      console.log(responseMobile,"res")
      if(responseMobile.Exist){
        res.json({message:"Mobile number already registered!!"})
      } 
      if(responseMobile.error){
        res.status(500).json({message:"Internal server error!!"})
      }else if(responseMobile.success){
        const updatedData=responseMobile.checkUser
        res.status(200).json({message:"Mobile updated!!",updatedData})
      }
    } catch (error) {
      res.status(500).json({message:"Something went wrong!!"})

    }
  },

  createPassword:async(req,res)=>{
    try {
      console.log(req.body,req.params.id,"data")
      const responsePassword = await userHelper.addPassword(req.body,req.params.id)
      if(responsePassword.error){
        res.status(500).json({message:"Internal server error!!"})
      }else if(responsePassword.success){
        const updatedData=responsePassword.checkUser
        res.status(200).json({message:"Password updated!!",updatedData})
      }
    } catch (error) {
      res.status(500).json({message:"Something went wrong!!"})

    }
  },

  updatePassword:async(req,res)=>{
    try {
      console.log(req.body,req.params.id,"bodyyyd")
      const updatePasswordResponse = await userHelper.updatePassword(req.body,req.params.id)
      if(updatePasswordResponse.notmatch){
        res.json({message:"Entered password not match with your current password"})
      }else if(updatePasswordResponse.error){
        res.status(500).json({message:"Internal server error!!"})
      }else if(updatePasswordResponse.success){
        const updatedData=updatePasswordResponse.checkUser
        res.status(200).json({message:"Password updated!!",updatedData})
      }
    } catch (error) {
      console.log(error,"im the error")
      res.status(500).json({message:"Something went wrong!!"})

    }
  },

  forgotPassword:async(req,res)=>{
    try {
      console.log(req.body,"detailedDaaaaaaaaata")
      await userHelper
        .userExist(req.body)
        .then(async (response) => {
          // console.log(response,"oooouuuuoo");
          if (response.length > 0) {
            const otp = await twilio.sendOtp(req.body);
            // console.log(otp,"lll");
            if (otp) {
              res.status(200).json({ message: "otp send successfully!!" });
            } else {
              res.json({ message: "otp cant send.." });
            }
          } else {
            res.json({ message: "something went wrong" });
          }
        })
        .catch(() => {
          res.json({ message: "user not registered!!" });
        });
    } catch (error) {
      res.status(500).json({message:"Something went wrong!!"})

    }
  },

  PasswordVerifyOtp: async (req, res) => {
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
          res.json({
            message: "verified otp successfully",
            user,
            status: true,
            
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
      const msg = error.message;
      res.status(500).json({ message: msg });
    }
  },




};
