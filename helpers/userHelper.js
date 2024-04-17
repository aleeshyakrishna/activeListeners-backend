//node
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "activelisteners2024@gmail.com",
    pass: "fplz vslj pgka fnif",
  },
  secure: false, // Set this to false to use 'PLAIN' authentication
  authMethod: "PLAIN", // Specify the authentication method here
});

// Verify the transporter configuration

transporter.verify((error, success) => {
  if (error) {
    console.log(error);
  } else {
    console.log("Ready for messages");
    console.log(success);
  }
});

const bcrypt = require("bcrypt");
const saltRounds = 10;
const User = require("../models/userSchema");
const Newsletter = require("../models/newsletterSubscription");
const getInTouch = require("../models/getInTouch");
const hiring = require("../models/hiringSchema");
const Podcast = require("../models/podcastSchema");
const NGO = require("../models/ngoSchema")
const Graduate = require("../models/graduateSchema")

var dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
var jwt_token = process.env.jwt_token;
module.exports = {
  userRegistration: async (userData) => {
    try {
      console.log(userData, "daaaaataaaaaaaaaa helper");
      const emailExist = await User.findOne({ email: userData.email });
      const mobileExist = await User.findOne({ mobile: userData.phoneNumber });
      if (emailExist || mobileExist) {
        console.log("exists user", emailExist, mobileExist);
        return { Exist: true };
      }
      // console.log("not exists..");
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);
      // console.log("llll");
      const newUser = new User({
        name: userData.name,
        email: userData.email,
        mobile: userData.phoneNumber,
        password: hashedPassword,
      });
      const userCreated = await newUser.save();
      return userCreated;
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  },
  userSignin: async (signIndata) => {
    try {
      console.log("helperrrrrrrr", signIndata);
      var userExist = await User.findOne({ email: signIndata.username });
      console.log(userExist, "lllllllllllll");
      if (userExist) {
        console.log(userExist, "iiiii");
        const checkPassword = await bcrypt.compare(
          signIndata.password,
          userExist.password
        );
        console.log(checkPassword, "checking password......");
        if (checkPassword) {
          return { exist: true, userExist };
        } else {
          return { PassError: true };
        }
      } else {
        console.log("not exist");
        return { exist: false };
      }
    } catch (error) {
      return { error: true };
    }
  },
  createToken: (userId, userName) => {
    try {
      if (jwt_token) {
        console.log(userId, userName, jwt_token, ".........>");
        const token = jwt.sign(
          { userId, userName }, // Wrap the payload in an object
          jwt_token,
          { expiresIn: "1h" }
        );

        return token;
      } else {
        return { error: true };
      }
    } catch (error) {
      console.log(error);
      return { error: true };
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
  userExisted: async (mobile) => {
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

  letterSub: async (Email) => {
    try {
      console.log(Email, "emailllllllllll");

      const emailExist = await Newsletter.findOne({ email: Email });

      if (emailExist) {
        console.log(emailExist);
        return { subscribed: true };
      } else {
        // console.log(mail,"kkkkkkkkkkkkkkk");
        const newSub = new Newsletter({
          email: Email,
        });
        const reso = await newSub.save();
        console.log(reso, "yyyyyyyyyyyyyyy");
        return reso;
      }
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  },

  sendVerificationEmail: async ({ _id, email }, res) => {
    try {
        const pdf = "https://activelisteners.s3.ap-south-1.amazonaws.com/hiring/ALEESHYA%20KRISHNA%20MV__CV.pdf"
      const currentUrl = "http://localhost:3000/";
      console.log(email, _id, "'''''''''''''''''''''''>>>>>>>>>>>>>>>>>>>>>");
      // const uniqueString=uuidv4()+_id
      // console.log(uniqueString,"this is unique string....");
      const mailOption = {
        from: "activelisteners2024@gmail.com",
        to: email,
        subject: "Thankyou for subscribing with ActiveListeners!",
        html: `<p>
            
            Dear Subscriber,
            
            Thank you for subscribing to our newsletter! We're excited to have you as part of our community.
            
            Stay tuned for our latest updates,  and special offers delivered straight to your inbox.
            <br>
            Best regards,
            <br>

            ActiveListeners 
            <br>
            (by Mentoons)
            
            </p><br> `,
            attachments: [
                {
                  filename: 'newsletter.pdf', // Name of the attachment as it will appear in the email
                  content: pdf, // Content of the PDF file
                  contentType: 'application/pdf', // Mime type of the attachment
                }
              ]
      };
      //hast the unique string
      const mailSend = await transporter.sendMail(mailOption);
      return mailSend;
    } catch (error) {
      console.log(error);
    }
  },
  postGet_in_touchForm: async (formData) => {
    try {
      console.log(formData);
      return new Promise((resolve, reject) => {
        const newData = new getInTouch({
          name: formData.name,
          email: formData.email,
          mobile: formData.mobile,
          message: formData.message,
        });
        newData
          .save()
          .then((result) => {
            resolve(result);
          })
          .catch((error) => {
            console.log(error);
            reject(error);
          });
      });
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  },

  postResume: async (data, s3Result) => {
    try {
      const newAppln = new hiring({
        name: data.name,
        email: data.email,
        number: data.mobile,
        position: data.position,
        resume: s3Result.file.Location,
        coverletter: data.coverletter,
      });
      const result = await newAppln.save();
      console.log(result, "mongodb done...");
      return result;
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  },

  contactUsForm: (datas) => {
    try {
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  },

  getOneUser: async (Id) => {
    try {
      console.log(Id, "in helper........");
      const findUser = await User.findOne({ _id: Id });
      console.log(findUser, "findoutttttttt");
      if (findUser) {
        return { notfind: false }, findUser;
      } else {
        return { notfind: true };
      }
    } catch (error) {
      console.log(error);
      return { error: true };
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

        console.log(updatedUser, "updated daaaaaaaaaata..........");
        if (updatedUser) {
          return { update: true, updatedUser };
        } else {
          return { update: false };
        }
      } else {
        return { notfind: true };
      }
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  },
  deleteProfile: async (userId) => {
    try {
      const deletedProf = await User.findByIdAndDelete({ _id: userId });
      console.log(deletedProf, "deletteddddd");
      if (deletedProf) {
        return { deleted: true };
      } else {
        return { deleted: false };
      }
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  },
  getAllPodcast: async () => {
    try {
      const allPodcasts = await Podcast.find();
      console.log(allPodcasts, "oooii");
      if (allPodcasts) {
        return allPodcasts;
      } else {
        return { notfound: true };
      }
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  },

  viewOnePod:async(Id)=>{
    try {
        var respp = await Podcast.find({_id:Id})
        console.log(respp,"resoooooo");
    
            return ({found:true},respp)
       
            
        
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  },
  postNgo:async(ngoDatas)=>{
    try {
      console.log(ngoDatas,"ko");
      const ngoExist = await NGO.findOne({email:ngoDatas.email_id})
      if(ngoExist){
        return ({exist:true})
        // console.log("existingg...");
      }else{
        const newNgo = new NGO({
          name_of_organization:ngoDatas.name_of_organization,
          year_of_establishment:ngoDatas.year_of_establishment,
          number_of_offices:ngoDatas.number_of_offices,
          telephoneNumber:ngoDatas.telephoneNumber,
          email:ngoDatas.email_id,
          websiteUrl:ngoDatas.websiteURL,
          contact_person_name:ngoDatas.contact_person_name,
          contact_person_designation:ngoDatas.contact_person_designation,
          contact_person_phoneNumber:ngoDatas.contact_person_phoneNumber
        })

        const newNgoDetails = await newNgo.save()
        return ({exist:false},newNgoDetails)
        // console.log(newNgoDetails,"alleeeeeeeee");
      }
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  },

  postGraduate:async(graduateData)=>{
    try {
      const graduateExistemail = await Graduate.findOne({email:graduateData.email})
      const graduateExistmobile = await Graduate.findOne({mobile:graduateData.mobile})
      const graduateExistgit = await Graduate.findOne({github:graduateData.github})
      const graduateExistLinkedIn = await Graduate.findOne({linkedIn:graduateData.linkedIn})

      if(graduateExistemail || graduateExistmobile ||
        graduateExistgit || graduateExistLinkedIn){
          return ({exist : true})
        }else{
          const newGraduate = new Graduate({
            name:graduateData.name,
            email:graduateData.email,
            mobile:graduateData.mobile,
            country:graduateData.country,
            state:graduateData.state,
            city:graduateData.city,
            pin:graduateData.pin,
            dob:graduateData.dob,
            qualification:graduateData.qualification,
            college:graduateData.college,
            yearOfpassing:graduateData.yearOfpassing,
            cgpa:graduateData.cgpa,
            internship:graduateData.internship,
            internshipDetails:graduateData.internshipdetails,
            linkedIn:graduateData.linkedIn,
            github:graduateData.github,
            otherLinks:graduateData.otherLinks
            // expectedSalary:graduateData.expectedSalary,
            // resume:resumeResponse.Location
          })

          const newGraduateData = await newGraduate.save()
          console.log(newGraduateData,"graaaaaaaad");
          return ({exist:false},newGraduateData)
        }
    } catch (error) {
      console.log(error);
      return { error: true };
    }
  }
};
