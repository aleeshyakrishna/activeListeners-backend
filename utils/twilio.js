
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const serviceSid = process.env.TWILIO_SERVICE_SID;
const client = require("twilio")(accountSid, authToken);


module.exports = {
  
    sendOtp: (Mobile) => {
        console.log("twilioooo");
      return new Promise((resolve, reject) => {
        var {mobile}=Mobile;
        client.verify.v2
          .services(serviceSid)
          .verifications.create({ to: `+91${mobile}`, channel: "sms" })
          .then((verification) => {
            console.log(verification.sid,"in sendn otp function..........");
            resolve(verification.sid);
          });
      });
    },
    // verifyOtp : (mobileNo, otp) => {

    //   console.log("mobile and otp");
    //   console.log(mobileNo, otp);
    //   return new Promise((resolve, reject) => {
    //     client.verify
    //       .v2.services(serviceSid)
    //       .verificationChecks
    //       .create({
    //         to: `+91${mobileNo}`,
    //         channel:'sms',
    //         code: `${otp}`
    //       })
    //       .then((verificationChecks) => {
    //         resolve(verificationChecks);
    //       })
    //       .catch((error) => {
    //         if (error.status === 404 && error.code === 20404) {
    //             // Handle 404 error (Resource not found)
    //             console.error("Twilio Verify API endpoint not found:", error);
    //             reject({error:true})
    //           } else {
    //             // Handle other errors
    //             console.error("Error verifying OTP:", error);
    //             reject(error);
    //           }
    //       });
    //   });      
    // }

    verifyOtp: (mobileNo, otp) => {
        console.log("mobile and otp");
        console.log(mobileNo, otp);
        return new Promise((resolve, reject) => {
          client.verify
            .v2.services(serviceSid)
            .verificationChecks
            .create({
              to: `+91${mobileNo}`,
              channel: 'sms',
              code: otp
            })
            .then((verificationCheck) => {
              // Check if verification was successful
              if (verificationCheck.status === 'approved') {
                // OTP successfully verified
                console.log("OTP successfully verified:", verificationCheck);
                resolve(verificationCheck);
              } else {
                // OTP verification failed
                console.error("OTP verification failed:", verificationCheck);
                reject({ error: true, message: "OTP verification failed" });
              }
            })
            .catch((error) => {
              // Handle errors
              if (error.status === 404 && error.code === 20404) {
                // Handle 404 error (Resource not found)
                console.error("Twilio Verify API endpoint not found:", error);
                reject({ error: true, message: "otp expired!!" });
              } else {
                // Handle other errors
                console.error("Error verifying OTP:", error);
                reject(error);
              }
            });
        });      
      }
      


  };




// client.verify.v2
//   .services(verifySid)
//   .verifications.create({ to: "+916369538954", channel: "sms" })
//   .then((verification) => console.log(verification.status))
//   .then(() => {
//     const readline = require("readline").createInterface({
//       input: process.stdin,
//       output: process.stdout,
//     });
//     readline.question("Please enter the OTP:", (otpCode) => {
//       client.verify.v2
//         .services(verifySid)
//         .verificationChecks.create({ to: "+916369538954", code: otpCode })
//         .then((verification_check) => console.log(verification_check.status))
//         .then(() => readline.close());
//     });
//   });

