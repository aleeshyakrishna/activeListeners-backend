const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

const s3 = new AWS.S3();
const bucketName = "activelisteners";
//sample
module.exports = {

  uploadFile: async (file) => {
    try {
      // Extract file information from the request
      const { originalname, mimetype, buffer } = file;

      // Determine the category based on the mimetype
    
      // Create the key (file path) based on the category and original file name
      const key = `hiring/${originalname}`;

      // Prepare the parameters for uploading to S3
      const params = {
        Bucket: bucketName,
        Key: key,
        Body: buffer,
      };

      // Upload the file to S3
      const uploadResult = await s3.upload(params).promise();
      return {
        file: uploadResult,
      };
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  }

};
