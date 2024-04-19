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
var http = require('http');
const https = require('https');

var dotenv = require("dotenv");
dotenv.config();
const jwt = require("jsonwebtoken");
var jwt_token = process.env.jwt_token;


const { URL } = require('url');
const { promisify } = require('util');
const fs = require('fs');

var fetchHtmlContent = async (htmlUrl) => {
  return new Promise((resolve, reject) => {
      https.get(htmlUrl, (res) => {
          let data = '';
          res.on('data', (chunk) => {
              data += chunk;
          });
          res.on('end', () => {
              resolve(data);
          });
      }).on('error', (err) => {
          reject(err);
      });
  });
};

module.exports = {


//    fetchPdfContent : async (pdfUrl) => {
//     const url = new URL(pdfUrl);
//     const protocol = url.protocol === 'https:' ? https : http;

//     return new Promise((resolve, reject) => {
//         protocol.get(url, (res) => {
//             let data = [];
//             res.on('data', (chunk) => {
//                 data.push(chunk);
//             });
//             res.on('end', () => {
//                 resolve(Buffer.concat(data));
//             });
//         }).on('error', (err) => {
//             reject(err);
//         });
//     });
// },


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

  // sendVerificationEmail: async ({ _id, email }, res) => {
  //   try {
  //       const pdf = "https://activelisteners.s3.ap-south-1.amazonaws.com/hiring/ALEESHYA%20KRISHNA%20MV__CV.pdf"
  //     const currentUrl = "http://localhost:3000/";
  //     console.log(email, _id, "'''''''''''''''''''''''>>>>>>>>>>>>>>>>>>>>>");
  //     // const uniqueString=uuidv4()+_id
  //     // console.log(uniqueString,"this is unique string....");
  //     const mailOption = {
  //       from: "activelisteners2024@gmail.com",
  //       to: email,
  //       subject: "Thankyou for subscribing with ActiveListeners!",
  //       html: `<p>
            
  //           Dear Subscriber,
            
  //           Thank you for subscribing to our newsletter! We're excited to have you as part of our community.
            
  //           Stay tuned for our latest updates,  and special offers delivered straight to your inbox.
  //           <br>
  //           Best regards,
  //           <br>

  //           ActiveListeners 
  //           <br>
  //           (by Mentoons)
            
  //           </p><br> `,
  //           attachments: [
  //               {
  //                 filename: 'newsletter.pdf', // Name of the attachment as it will appear in the email
  //                 content: pdf, // Content of the PDF file
  //                 contentType: 'application/pdf', // Mime type of the attachment
  //               }
  //             ]
  //     };
  //     //hast the unique string
  //     const mailSend = await transporter.sendMail(mailOption);
  //     return mailSend;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // },
  
  
  sendVerificationEmail: async ({ _id, email }, res) => {
    try {
        // const htmlUrl = "https://activelisteners.s3.ap-south-1.amazonaws.com/newsletter/NEWSLETTERR.pdf";
        // // const pdfContent = await fetchPdfContent(pdfUrl);
        // const htmlContent = await fetchHtmlContent(htmlUrl);

        const mailOption = {
            from: "activelisteners2024@gmail.com",
            to: email,
            subject: "Thank you for subscribing with ActiveListeners!",
            html: `<!doctype html>
            <html ⚡4email data-css-strict>
            
            <head>
              <meta charset="utf-8">
              <meta name="x-apple-disable-message-reformatting">
              <style amp4email-boilerplate>
                body {
                  visibility: hidden
                }
              </style>
            
              <script async src="https://cdn.ampproject.org/v0.js"></script>
            
            
              <style amp-custom>
                .u-row {
                  display: flex;
                  flex-wrap: nowrap;
                  margin-left: 0;
                  margin-right: 0;
                }
                
                .u-row .u-col {
                  position: relative;
                  width: 100%;
                  padding-right: 0;
                  padding-left: 0;
                }
                
                .u-row .u-col.u-col-33p33 {
                  flex: 0 0 33.33%;
                  max-width: 33.33%;
                }
                
                .u-row .u-col.u-col-50 {
                  flex: 0 0 50%;
                  max-width: 50%;
                }
                
                .u-row .u-col.u-col-100 {
                  flex: 0 0 100%;
                  max-width: 100%;
                }
                
                @media (max-width: 767px) {
                  .u-row:not(.no-stack) {
                    flex-wrap: wrap;
                  }
                  .u-row:not(.no-stack) .u-col {
                    flex: 0 0 100%;
                    max-width: 100%;
                  }
                }
                
                body {
                  margin: 0;
                  padding: 0;
                }
                
                table,
                tr,
                td {
                  vertical-align: top;
                  border-collapse: collapse;
                }
                
                p {
                  margin: 0;
                }
                
                .ie-container table,
                .mso-container table {
                  table-layout: fixed;
                }
                
                * {
                  line-height: inherit;
                }
                
                table,
                td {
                  color: #000000;
                }
                
                #u_body a {
                  color: #0000ee;
                  text-decoration: underline;
                }
                
                @media (max-width: 480px) {
                  #u_content_text_4 .v-font-size {
                    font-size: 41px;
                  }
                  #u_content_text_7 .v-text-align {
                    text-align: justify;
                  }
                }
              </style>
            
            
            </head>
            
            <body class="clean-body u_body" style="margin: 0;padding: 0;background-color: #e7e7e7;color: #000000">
              <!--[if IE]><div class="ie-container"><![endif]-->
              <!--[if mso]><div class="mso-container"><![endif]-->
              <table id="u_body" style="border-collapse: collapse;table-layout: fixed;border-spacing: 0;vertical-align: top;min-width: 320px;Margin: 0 auto;background-color: #e7e7e7;width:100%" cellpadding="0" cellspacing="0">
                <tbody>
                  <tr style="vertical-align: top">
                    <td style="word-break: break-word;border-collapse: collapse;vertical-align: top">
                      <!--[if (mso)|(IE)]><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="background-color: #e7e7e7;"><![endif]-->
            
                      <div style="padding: 0px;">
                        <div style="max-width: 500px;margin: 0 auto;">
                          <div class="u-row">
            
                            <div class="u-col u-col-33p33" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                              <div style="width: 100%;padding:0px;">
            
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                          <tr>
                                            <td style="padding-right: 0px;padding-left: 0px;" align="center">
            
                                              <amp-img alt="" src="https://activelisteners.s3.ap-south-1.amazonaws.com/newsletter/ALlogo.png" width="245" height="91" layout="intrinsic" style="width: 100%;max-width: 245px;">
            
                                              </amp-img>
                                            </td>
                                          </tr>
                                        </table>
            
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
            
                              </div>
                            </div>
            
                            <div class="u-col u-col-33p33" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                              <div style="width: 100%;padding:0px;">
            
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
                                        <div class="v-text-align v-font-size" style="font-family: arial black,AvenirNext-Heavy,avant garde,arial; font-size: 15px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                          <p style="line-height: 140%;">Issue 1, Volume 1</p>
                                        </div>
            
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
            
                              </div>
                            </div>
            
                            <div class="u-col u-col-33p33" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                              <div style="width: 100%;padding:0px;">
            
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
                                        <div class="v-text-align v-font-size" style="font-family: arial black,AvenirNext-Heavy,avant garde,arial; font-size: 15px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                          <p style="line-height: 140%;">18/04/2024</p>
                                        </div>
            
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
            
                              </div>
                            </div>
            
                          </div>
                        </div>
                      </div>
            
                      <div style="padding: 0px;">
                        <div style="max-width: 500px;margin: 0 auto;">
                          <div class="u-row">
            
                            <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                              <div style="width: 100%;padding:0px;">
            
                                <table id="u_content_text_4" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
                                        <div class="v-text-align v-font-size" style="font-family: andale mono,times; font-size: 61px; font-weight: 700; line-height: 140%; text-align: center; word-wrap: break-word;">
                                          <p style="line-height: 140%;">NEWS LETTER</p>
                                        </div>
            
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
            
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
                                        <div class="v-text-align v-font-size" style="font-size: 14px; line-height: 140%; text-align: center; word-wrap: break-word;">
                                          <p style="line-height: 140%;">----------------------------------------------------------------</p>
                                        </div>
            
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
            
                              </div>
                            </div>
            
                          </div>
                        </div>
                      </div>
            
                      <div style="padding: 0px;">
                        <div style="max-width: 500px;margin: 0 auto;">
                          <div class="u-row">
            
                            <div class="u-col u-col-50" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                              <div style="width: 100%;padding:0px;">
            
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
                                        <div class="v-text-align v-font-size" style="font-family: 'Cabin',sans-serif; font-size: 14px; line-height: 140%; text-align: left; word-wrap: break-word;">
                                          <p style="line-height: 140%;">Thankyou for <span style="color: #e03e2d; line-height: 19.6px;">subscribing </span>our Newsletter</p>
                                        </div>
            
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
            
                              </div>
                            </div>
            
                            <div class="u-col u-col-50" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                              <div style="width: 100%;padding:0px;">
            
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
                                        <div>
                                          <a href="http://www.activelisteners.in">www.activelisteners.in</a>
            
                                        </div>
            
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
            
                              </div>
                            </div>
            
                          </div>
                        </div>
                      </div>
            
                      <div style="padding: 0px;">
                        <div style="max-width: 500px;margin: 0 auto;">
                          <div class="u-row">
            
                            <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                              <div style="width: 100%;padding:0px;">
            
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
                                        <div>
                                          <div style="background-color:black;color:white">
                                            <h1>NOW HAPPENING AT ACTIVELISTENERS </h1>
                                          </div>
                                        </div>
            
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
            
                              </div>
                            </div>
            
                          </div>
                        </div>
                      </div>
            
                      <div style="padding: 0px;">
                        <div style="max-width: 500px;margin: 0 auto;">
                          <div class="u-row">
            
                            <div class="u-col u-col-50" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                              <div style="width: 100%;padding:0px;">
            
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
                                        <table width="100%" cellpadding="0" cellspacing="0" border="0">
                                          <tr>
                                            <td style="padding-right: 0px;padding-left: 0px;" align="center">
            
                                              <amp-img alt="" src="https://activelisteners.s3.ap-south-1.amazonaws.com/newsletter/kid.jpg" width="567" height="426" layout="intrinsic" style="width: 100%;max-width: 567px;">
            
                                              </amp-img>
                                            </td>
                                          </tr>
                                        </table>
            
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
            
                              </div>
                            </div>
            
                            <div class="u-col u-col-50" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                              <div style="width: 100%;padding:0px;">
            
                                <table id="u_content_text_7" style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
                                        <div class="v-text-align v-font-size" style="font-family: comic sans ms,sans-serif; font-size: 14px; font-weight: 700; line-height: 140%; text-align: left; word-wrap: break-word;">
                                          <p style="line-height: 140%;">At Active Listeners,We believe that early age gadgets exposure, Adaptation to mobile among children has now led to time where there is decrease in focus and learning.</p>
                                        </div>
            
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
            
                              </div>
                            </div>
            
                          </div>
                        </div>
                      </div>
            
                      <div style="padding: 0px;">
                        <div style="max-width: 500px;margin: 0 auto;">
                          <div class="u-row">
            
                            <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                              <div style="width: 100%;padding:0px;">
            
                                <table style="font-family:arial,helvetica,sans-serif;" role="presentation" cellpadding="0" cellspacing="0" width="100%" border="0">
                                  <tbody>
                                    <tr>
                                      <td style="overflow-wrap:break-word;word-break:break-word;padding:10px;font-family:arial,helvetica,sans-serif;" align="left">
            
                                        <div>
                                          <div style="background-color:black;color:white">
                                            <h1>WE ARE HERE TO HELP..🧡 </h1>
                                          </div>
                                        </div>
            
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
            
                              </div>
                            </div>
            
                          </div>
                        </div>
                      </div>
            
                      <div style="padding: 0px;">
                        <div style="max-width: 500px;margin: 0 auto;">
                          <div class="u-row">
            
                            <div class="u-col u-col-100" style="display:flex;border-top: 0px solid transparent;border-left: 0px solid transparent;border-right: 0px solid transparent;border-bottom: 0px solid transparent;border-radius: 0px;">
                              <div style="width: 100%;padding:0px;">
            
                              </div>
                            </div>
            
                          </div>
                        </div>
                      </div>
            
                      <!--[if (mso)|(IE)]></td></tr></table><![endif]-->
                    </td>
                  </tr>
                </tbody>
              </table>
              <!--[if mso]></div><![endif]-->
              <!--[if IE]></div><![endif]-->
            </body>
            
            </html>`,
           
        };
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
