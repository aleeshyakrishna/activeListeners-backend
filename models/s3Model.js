const AWS = require("aws-sdk");
require('dotenv').config();
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: "ap-south-1",
});

const s3 = new AWS.S3();
const bucketName = "activelistenersofficial";
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
  },


  uploadPodcast: async (files) => {
    try {
      const { thumbnail, source } = files;
  
      const uploadThumbnailParams = {
        Bucket: bucketName,
        Key: `podcast/thumbnails/${thumbnail[0].originalname}`,
        Body: thumbnail[0].buffer,
      };
      const thumbnailResult = await s3.upload(uploadThumbnailParams).promise();
  
      const uploadSourceParams = {
        Bucket: bucketName,
        Key: `podcast/source/${source[0].originalname}`,
        Body: source[0].buffer,
      };
      const sourceResult = await s3.upload(uploadSourceParams).promise();
  
      return {
        thumbnail: thumbnailResult,
        source: sourceResult,
      };
    } catch (error) {
      console.error("Error uploading podcast:", error);
      return {error}; 
    }
  },
  uploadPsycho: async (files) => {
    try {
      const { image, resume } = files;
  
      const uploadResumeParams = {
        Bucket: bucketName,
        Key: `psychologist/resume/${resume[0].originalname}`,
        Body: resume[0].buffer,
      };
      const resumeResult = await s3.upload(uploadResumeParams).promise();
  
      const uploadImageParams = {
        Bucket: bucketName,
        Key: `psychologist/image/${image[0].originalname}`,
        Body: image[0].buffer,
      };
      const imageResult = await s3.upload(uploadImageParams).promise();
  
      return {
        resume: resumeResult,
        image: imageResult,
      };

    } catch (error) {
      console.error("Error uploading podcast:", error);
      return {error}; 
    }
  },
  graduateResume:async(resume)=>{
    try {
      console.log(resume,"in s3 model");
      const {originalname,buffer} = resume;

      const keys = `graduates/${originalname}`

      const graduateParams = {
        Bucket : bucketName,
        Key : keys,
        Body:buffer
      }

      const graduateUploadResponse = await s3.upload(graduateParams).promise()
      return {
        graduateResume :graduateUploadResponse
      }

    } catch (error) {
      console.error("Error uploading graduate:", error);
      return {error}; 
    }
  },

  uploadVideo: async (files) => {
    try {
      const { thumbnail, source } = files;
  
      const uploadThumbnailParams = {
        Bucket: bucketName,
        Key: `videos/thumbnails/${thumbnail[0].originalname}`,
        Body: thumbnail[0].buffer,
      };
      const thumbnailResult = await s3.upload(uploadThumbnailParams).promise();
  
      const uploadSourceParams = {
        Bucket: bucketName,
        Key: `videos/source/${source[0].originalname}`,
        Body: source[0].buffer,
      };
      const sourceResult = await s3.upload(uploadSourceParams).promise();
  
      return {
        thumbnail: thumbnailResult,
        source: sourceResult,
      };
    } catch (error) {
      console.error("Error uploading videos:", error);
      return {error}; 
    }
  },
  uploadIcon:async(icon)=>{
    try {
      console.log(icon,"in s3 model");
      const {originalname,buffer} = icon;

      const keys = `package-icon/${originalname}`

      const iconParams = {
        Bucket : bucketName,
        Key : keys,
        Body:buffer
      }

      const iconUploadResponse = await s3.upload(iconParams).promise()
      return {
        iconResponse :iconUploadResponse
      }

    } catch (error) {
      console.error("Error uploading graduate:", error);
      return {error}; 
    }
  },
  uploadMemberData:async(files)=>{
    try {
      console.log(files,"...");
      const {image , audio } = files

      const uploadImageParams = {
        Bucket: bucketName,
        Key: `our-team/members-image/${image[0].originalname}`,
        Body: image[0].buffer,
      };
      const imageResult = await s3.upload(uploadImageParams).promise();
  
      const uploadAudioParams = {
        Bucket: bucketName,
        Key: `our-team/members-audio/${audio[0].originalname}`,
        Body: audio[0].buffer,
      };
      const audioResult = await s3.upload(uploadAudioParams).promise();
  
      return {

        image: imageResult,
        audio: audioResult,
        
      };      
    } catch (error) {
      console.error("Error uploading graduate:", error);
      return {error};
    }
  },

  profileUpload:async(profilePic)=>{
    try {
      console.log(profilePic,"in s3 model");
      const {originalname,buffer} = profilePic;

      const keys = `usersProfile/${originalname}`

      const profileParams = {
        Bucket : bucketName,
        Key : keys,
        Body:buffer
      }

      const profileUploadResponse = await s3.upload(profileParams).promise()
      return {
        userProfilePic :profileUploadResponse
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error);
      return {error};
    }
  },



  joiningPsycho: async (files) => {
    try {
      const { image, resume } = files;
  
      const uploadResumeeParams = {
        Bucket: bucketName,
        Key: `affiliateProgram-psychologist/resume/${resume[0].originalname}`,
        Body: resume[0].buffer,
      };
      const resumeeResult = await s3.upload(uploadResumeeParams).promise();
  
      const uploadImageeParams = {
        Bucket: bucketName,
        Key: `affiliateProgram-psychologist/image/${image[0].originalname}`,
        Body: image[0].buffer,
      };
      const imageeResult = await s3.upload(uploadImageeParams).promise();
  
      return {
        resume: resumeeResult,
        image: imageeResult,
      };

    } catch (error) {
      console.error("Error uploading podcast:", error);
      return {error}; 
    }
  },
  
};
