var adminHelper = require("../helpers/adminHelper");

const s3Model = require("../models/s3Model");

const adminCredential = {

  name: "ACTIVELISTENERS ADMIN PANEL",
  email: "admin@gmail.com",
  password: "123"

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

  addPsychologyst: async (req, res) => {
    try {
      var respv = await s3Model.uploadPsycho(req.files);
      if (respv.error) {
        res.json({ message: "something went wrong" });
      } else {
        const psychologyst = await adminHelper.AddPsychologyst(req.body, respv);
        console.log(psychologyst, "psychologsttttttttttttttttttt");
        if (psychologyst.Exist) {
          res.status(400).json({ message: "Psychologyst already existing" });
        } else if (psychologyst.error) {
          res.status(400).json({ message: "cant find psychologyst!" });
        } else {
          res.status(200).json({ message: "successfully added psychologyst" });
        }
      }

      // const psychologyst = await adminHelper.AddPsychologyst(req.body)
      // console.log(psychologyst,"psychologsttttttttttttttttttt");
      // if(psychologyst.Exist){

      //     res.status(400).json({message:"Psychologyst already existing"})
      // }else if(psychologyst.error){
      //     res.status(400).json({message:"cant find psychologyst!"})
      // }else{
      //     res.status(200).json({message:"successfully added psychologyst"})
      // }
    } catch (error) {
      res.status(500).json({ message: "internal server error!!" });
    }
  },
  viewPsychologysts: async (req, res) => {
    try {
      const psychos = await adminHelper.viewPsychologyst();
      console.log(psychos, "controller..........");
      if (psychos.error) {
        res.json({ message: "something went wrong!" });
      } else {
        res.status(200).json({ psychos });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!!" });
    }
  },
  viewPsychologyst: async (req, res) => {
    try {
      console.log(req.params._id, "id");
      const OnePsychologyst = await adminHelper.getOnePsycho(req.params._id);
      console.log(OnePsychologyst, "enter into controller");
      if (OnePsychologyst.error || OnePsychologyst.notfind) {
        res.json({ message: "you cant view psychologyst now" });
      } else {
        res.status(200).json({ OnePsychologyst });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },

  findAllUsers: async (req, res) => {
    try {
      const response = await adminHelper.findUsers();
      console.log(response, "in controller");
      if (response.error) {
        res
          .status(404)
          .json({ message: "something went wrong!please try again later" });
      } else if (response.noUsers) {
        res.status(404).json({ message: "users not available" });
      } else {
        res.status(200).json({ response });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
  viewUser: async (req, res) => {
    try {
      console.log(req.params._id, "id");
      const Getuser = await adminHelper.getOneUser(req.params._id);
      console.log(Getuser, "enter into conroller");
      if (Getuser.error || Getuser.notfind) {
        res.json({ message: "you cant view psychologyst now" });
      } else {
        res.status(200).json({ Getuser });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },
  viewHiring: async (req, res) => {
    try {
      const response = await adminHelper.findHiring();
      console.log(response, "res");
      if (response.error) {
        res
          .status(404)
          .json({ message: "something went wrong!please try again later" });
      } else if (response.noUsers) {
        res.status(404).json({ message: "users not available" });
      } else {
        res.status(200).json({ response });
      }
    } catch (error) {
      res.status(500).json({ message: "internal server error!" });
    }
  },
  addPodcast: async (req, res) => {
    try {
      console.log(req.body, req.files, "form data");
      const resp = await s3Model.uploadPodcast(req.files);
      console.log(resp, "get from s3........");
      if (resp.error) {
        res.json({ message: "something went wrong" });
      } else {
        const savePodcast = await adminHelper.postPodcst(req.body, resp);
        if (savePodcast.error) {
          res.status(500).json({ message: "something went wrong!!" });
        } else {
          const msg = savePodcast.datass;
          res.json({ message: "successfully added podcast", msg });
        }
      }
    } catch (error) {
      res.status(500).json({ message: "internal server error!" });
    }
  },
  viewAllPodcast: async (req, res) => {
    try {
      const reslt = await adminHelper.getAllPodcast();
      if (reslt.error) {
        res.statsus(500).json({ message: "internal server error!" });
      } else if (reslt.notfound) {
        res.status(404).json({ message: "podcast not available now" });
      } else {
        res.status(200).json({ reslt });
      }
    } catch (error) {
      res.status(500).json({ message: "internal server error!" });
    }
  },
  viewOneAppln: async (req, res) => {
    try {
      console.log(req.params._id, req.body, "id");
      const Getappln = await adminHelper.GetOneappln(req.params._id, req.body);
      console.log(Getappln, "enter into conroller");
      if (Getappln.error || Getappln.notfind) {
        res.json({ message: "you cant view psychologyst now" });
      } else {
        res.status(200).json({ Getappln });
        // const updatedStatus = await adminHelper.update(req.params._id,req.body)
      }
    } catch (error) {
      res.status(500).json({ message: "internal server error!" });
    }
  },

  viewPsychologystsCount: async (req, res) => {
    try {
      const psychos = await adminHelper.viewPsychologyst();
      console.log(psychos, "controller..........");
      if (psychos.error) {
        res.json({ message: "something went wrong!" });
      } else {
        const totalPsychologist = psychos.length;
        console.log(totalPsychologist, "count....");
        res.status(200).json({ totalPsychologist });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!!" });
    }
  },
  viewCollegeGraduates: async (req, res) => {
    try {
      const graduates = await adminHelper.viewGraduates();
      console.log(graduates, "controller..........");
      if (graduates.error) {
        res.json({ message: "something went wrong!" });
      } else {
        const totalCollegeGraduates = graduates.length;
        console.log(totalCollegeGraduates, "count....");
        res.status(200).json({ totalCollegeGraduates, graduates });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!!" });
    }
  },

  viewNGO: async (req, res) => {
    try {
      const ngos = await adminHelper.viewNGOs();
      console.log(ngos, "controller..........");
      if (ngos.error) {
        res.json({ message: "something went wrong!" });
      } else {
        const totalNgos = ngos.length;
        console.log(totalNgos, "count....");
        res.status(200).json({ totalNgos, ngos });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!!" });
    }
  },

  findUserCount: async (req, res) => {
    try {
      const response = await adminHelper.findUsers();
      console.log(response, "in controller");
      if (response.error) {
        res
          .status(404)
          .json({ message: "something went wrong!please try again later" });
      } else if (response.noUsers) {
        res.status(404).json({ message: "users not available" });
      } else {
        const totalUsers = response.length;
        console.log(totalUsers, "count....");
        res.status(200).json({ totalUsers });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error" });
    }
  },

  addVideo: async (req, res) => {
    try {
      console.log(req.body, req.files, "form daaaaaaata");
      const resp = await s3Model.uploadVideo(req.files);
      console.log(resp, "get from s3........");
      if (resp.error) {
        res.json({ message: "something went wrong" });
      } else {
        const savePodcast = await adminHelper.postVideo(req.body, resp);
        if (savePodcast.error) {
          res.status(500).json({ message: "something went wrong!!" });
        } else {
          const msg = savePodcast.datass;
          res.json({ message: "successfully added Video!!", msg });
        }
      }
    } catch (error) {
      res.status(500).json({ message: "internal server error!!" });
    }
  },

  viewAllVideos: async (req, res) => {
    try {
      const reslt = await adminHelper.getAllvideos();
      if (reslt.error) {
        res.statsus(500).json({ message: "internal server error!" });
      } else if (reslt.notfound) {
        res.status(404).json({ message: "video not available now" });
      } else {
        res.status(200).json({ reslt });
      }
    } catch (error) {
      res.status(500).json({ message: "internal server error!" });
    }
  },
  updateVideo: async (req, res) => {
    try {
      console.log(req.params.id, req.body, req.files, "iiid");

      const resp = await s3Model.uploadVideo(req.files);

      if (resp.error) {
        res.status(500).json({ message: "error uploading s3" });
      } else {
        const Getappln = await adminHelper.GetOneVideo(
          req.params.id,
          req.body,
          resp
        );
        console.log(Getappln, "enter into conroller");
        if (Getappln.error || Getappln.notfind) {
          res.json({ message: "you cant view psychologyst now" });
        } else {
          res.status(200).json({ Getappln });
          // const updatedStatus = await adminHelper.update(req.params._id,req.body)
        }
      }
    } catch (error) {
      res.status(500).json({ message: "internal server error!" });
    }
  },

  deleteVideo:async(req,res)=>{
    try {
      console.log(req.params.id, "this is id");
      const response = await adminHelper.deleteOneVideo(req.params.id);
      console.log("got response");
      if (response.error) {
        res.status(500).json({ message: "internal server error!!" });
      } else if (response.success) {
        res.json({ message: "successfully deleted!!" });
      } else {
        res.json({ message: "something went wrong!!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!" });
    }
  },

  deletePodcast:async(req,res)=>{
    try {
      console.log(req.params.id, "this is id");
      const response = await adminHelper.deleteOnePodcast(req.params.id);
      console.log("got response");
      if (response.error) {
        res.status(500).json({ message: "internal server error!!" });
      } else if (response.success) {
        res.json({ message: "successfully deleted!!" });
      } else {
        res.json({ message: "something went wrong!!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!" });
    }
  },

  addPackage: async (req, res) => {
    try {
      console.log(req.body, req.file, "this is package adding module...");
      const s3Result = await s3Model.uploadIcon(req.file);
      console.log(s3Result);
      if (s3Result.error) {
        res.json({ message: "Error uploading icon into AWS" });
      } else {
        const packageRes = await adminHelper.uploadPackage(s3Result, req.body);
        if (packageRes.error) {
          res.status(500).json({ message: "Internal server error" });
        } else {
          res
            .status(200)
            .json({ message: "Package Added successfully", packageRes });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!" });
    }
  },

  getPackages: async (req, res) => {
    try {
      console.log("hhehhe");
      const packageList = await adminHelper.findPackage();
      if (packageList.empty) {
        res.json({ message: "no active packages!" });
      } else {
        res.status(200).json({ packageList });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!" });
    }
  },

  getOnePackageAndEdit: async (req, res) => {
    try {
      console.log(req.params.id, "Id");
      const packageGot = await adminHelper.getPackage(req.params.id);
      if (packageGot.notfound) {
        res.json({ message: "cant found the selected package!" });
      } else {
        res.status(200).json({ packageGot });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!" });
    }
  },

  updatePackage: async (req, res) => {
    try {
      const iconRes = await s3Model.uploadIcon(req.file);
      if (iconRes.error) {
        res.status(500).json({ message: "internal server error!!" });
      } else {
        const what = await adminHelper.findPackages(
          req.params.id,
          req.body,
          iconRes
        );
        if (what.error) {
          res.json("error!!");
        } else {
          res.json({ message: "updated successfully!!" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!" });
    }
  },

  deletePackage: async (req, res) => {
    try {
      console.log(req.params.id, "this is id");
      const response = await adminHelper.deleteOnePackage(req.params.id);
      console.log("got response");
      if (response.error) {
        res.status(500).json({ message: "internal server error!!" });
      } else if (response.success) {
        res.json({ message: "successfully deleted!!" });
      } else {
        res.json({ message: "something went wrong!!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!" });
    }
  },

  add_teamMember: async (req, res) => {
    try {
      // console.log(req.body,req.files,"form data...");
      const response = await s3Model.uploadMemberData(req.files);
      console.log(response, "==============================");
      if (response.error) {
        res.status(500).json({ message: "Error uploading files" });
      } else {
        const memberData = await adminHelper.addMember(req.body, response);
        if (memberData.error) {
          res.json({ message: "internal error occurred!!" });
        } else {
          res.status(200).json({ message: "member added successfully!!" });
        }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!" });
    }
  },

  getMembers: async (req, res) => {
    try {
      const members = await adminHelper.getMembers();
      if (members.error) {
        res.json({ message: "internal server error" });
      }
      if (members.present) {
        res.json({ members });
      } else {
        res.json({ message: "not found!!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "internal server error!" });
    }
  },

  viewMember: async (req, res) => {
    try {
      console.log(req.params.id,"ll");
      const member = await adminHelper.view_Member(req.params.id)
      if(member.error){
        res.status(500).json({message:"internal server error!!1"})
      }else if(member.notfind){
        res.json({message:"cant find team member!!"})
      }else{
        res.status(200).json({message:"ok",member})
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "internal server error!" });
    }
  },

  updateMember:async(req,res)=>{
    try {
      console.log(req.params.id,req.body,req.files,"form data");
      const response = await s3Model.uploadMemberData(req.files);
      console.log(response, "==============================");
      if (response.error) {
        res.status(500).json({ message: "Error uploading files" });
      } else {
      const updatedData = await adminHelper.updateMember(req.params,req.body,response)
      if(updatedData.error){
        res.status(500).json({message:"internal server error!!"})
      }else{
        res.status(200).json({message:"updated successfully!!",updatedData})
      }
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "internal server error!" });
    }
  },

  deleteMember:async(req,res)=>{
    try{
      const response = await adminHelper.deleteMember(req.params.id)
      if(response.error){
        res.status(500).json({message:"internal server error!!"})
      }else if(response.success){
        res.status(200).json({message:"deleted successfully!!"})
      }else{
                res.status(200).json({message:"Please try again later!!"})
      }
    }catch(error){
      console.log(error);
      res.status(500).json({ msg: "internal server error!" });
    }
  },

  displayGetintouch:async(req,res)=>{
    try {
      const getintouch = await adminHelper.getGetintouch();
      if (getintouch.error) {
        res.json({ message: "internal server error" });
      }
      if (getintouch.present) {
        res.json({ getintouch });
      } else {
        res.json({ message: "not found!!" });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "internal server error!" });
    }
  }

};
