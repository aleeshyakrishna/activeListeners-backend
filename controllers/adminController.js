var adminHelper = require("../helpers/adminHelper");
const s3Model = require("../models/s3Model");

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
      console.log(req.params._id, "iiiiiiiiiiiiiiiiiiiddd");
      const OnePsychologyst = await adminHelper.getOnePsycho(req.params._id);
      console.log(OnePsychologyst, "enter into conroller");
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
      console.log(req.params._id, "iiiiiiiiiiiiiiiiiiiddd");
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
      console.log(response, "ressss");
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
      console.log(req.body, req.files, "form daaaaaaata");
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
      console.log(req.params._id, req.body, "iiid");
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

  viewNGO:async(req,res)=>{
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
};
