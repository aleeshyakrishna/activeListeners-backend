const Psychologyst = require("../models/psychologystSchema")
const User = require("../models/userSchema")
const Hiring =require("../models/hiringSchema")
const Podcast = require("../models/podcastSchema")
const Graduates = require("../models/graduateSchema")
const NGOs = require("../models/ngoSchema")
const Videos = require("../models/videoSchema")
module.exports = {
    AddPsychologyst:async(psychologystData,respv)=>{

        try {
            console.log(psychologystData,respv,"poioopoi");
            
            const PsychoExist = await Psychologyst.findOne({email:psychologystData.email})
            const mobileExist =await Psychologyst.findOne({mobile:psychologystData.mobile})
            console.log(PsychoExist,"existing....");
          
            if(PsychoExist || mobileExist){
                console.log("existing already................");
                // res.json({message:"Psychologyst alredy existing!"})
                return({Exist:true})
            }else{
                console.log("intooooooooooooooooo");
                const newPsycho =await new Psychologyst({
                    name:psychologystData.name,
                    email:psychologystData.email,
                    mobile:psychologystData.mobile,
                    city:psychologystData.city,
                    state:psychologystData.state,
                    gender:psychologystData.gender,
                    available:psychologystData.available,
                    resume:respv.resume.Location,
                    image:respv.image.Location,
                    discription:psychologystData.discription
                })
    
                const Psycho =await newPsycho.save()
                console.log(Psycho,"datas in helper psyhcp");
                return(Psycho)
            }
            
        } catch (error) {
            console.log(error);
            return({error:true})
        }
    },
    viewPsychologyst:async()=>{
        try {
            const allPsychos = await Psychologyst.find()
            console.log(allPsychos,"psychologyst");
            return (allPsychos)
        } catch (error) {
            console.log(
                error
            );
            return ({error:true})
        }
    },
    getOnePsycho:async(Id)=>{

        try {

            console.log(Id,"in helper........");
            const findPsycho =  await Psychologyst.findOne({_id:Id})
            console.log(findPsycho,"findoutttttttt");
            if(findPsycho){
                return ({notfind:false},findPsycho)
            }else{
                return ({notfind:true})
            }
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },
    findUsers:async()=>{
        try {
            const allUsers = await User.find()
            console.log(allUsers.length,"all users........");
           if(allUsers.length < 0){
            return ({noUsers:true})
           }else{
            return ({noUsers:false},allUsers)
           }
        } catch (error) {
            return ({error:true})
        }
    },
    getOneUser:async(Id)=>{

        try {

            console.log(Id,"in helper........");
            const findUser =  await User.findOne({_id:Id})
            console.log(findUser,"findoutttttttt");
            if(findUser){
                return ({notfind:false},findUser)
            }else{
                return ({notfind:true})
            }
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },
    findHiring:async()=>{
        try {
            const allAppln = await Hiring.find()
            console.log(allAppln.length,"all users........");
           if(allAppln.length < 0){
            return ({noUsers:true})
           }else{
            return ({noUsers:false},allAppln)
           }
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },
    postPodcst:async(podcastData,s3result)=>{
        try {
            const savePodcast = new Podcast({
                title:podcastData.title,
                discription:podcastData.discription,
                category:podcastData.category,
                thumbnail:s3result.thumbnail.Location,
                source:s3result.source.Location,
            })
            const datass =  await savePodcast.save()
            console.log(datass,"punuuu");
            return (datass)
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },
    getAllPodcast:async()=>{
        try {
            const allPodcasts = await Podcast.find()
            console.log(allPodcasts,"oooii");
            if(allPodcasts){
                return (allPodcasts)
            }else{
                return ({notfound:true})
            }
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },
    GetOneappln:async(Id,stautsNew)=>{

        try {

            console.log(Id,"in helper........");
            const findAppln =  await Hiring.findByIdAndUpdate(
                Id,
                stautsNew,
                { new: true }
              );
            console.log(findAppln,"findoutttttttt");
            if(findAppln){
                const upd = await Hiring
                return ({notfind:false},findAppln)
            }else{
                return ({notfind:true})
            }
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },
    viewGraduates:async()=>{
        try {
            const allGraduates = await Graduates.find()
            console.log(allGraduates,"Graduates");
            return (allGraduates)
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },

    viewNGOs:async()=>{
        try {
            const ngoAll = await NGOs.find()
            console.log(ngoAll,"Graduates");
            return (ngoAll)
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },

    postVideo:async(videoData,s3result)=>{
        try {
            const saveVideo = new Videos({
                title:videoData.title,
                description:videoData.description,
                page:videoData.page,
                thumbnail:s3result.thumbnail.Location,
                source:s3result.source.Location,
            })
            const datass =  await saveVideo.save()
            console.log(datass,"punuuu");
            return (datass)
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },

    getAllvideos:async()=>{
        try {
            const allVideos = await Videos.find()
            console.log(allVideos,"oooii");
            if(allVideos){
                return (allVideos)
            }else{
                return ({notfound:true})
            }
        } catch (error) {
            console.log(error);
            return ({error:true})
        }
    },
    GetOneVideo : async (Id, datas, s3result) => {
        try {
            console.log(Id, "in helper........");
            const findAppln = await Videos.findByIdAndUpdate(
                Id,
                {
                    title: datas.title,
                    discription:datas.discription,

                    page: datas.page,
                    thumbnail: s3result.thumbnail.Location,
                    source: s3result.source.Location
                },
                { new: true }
            );
            console.log(findAppln, "findoutttttttt");
            if (findAppln) {
                // Assuming Hiring is a mongoose model, if not, replace with appropriate logic
                const upd = await Hiring.findOneAndUpdate(
                    // Update condition for Hiring document
                    { videoId: Id },
                    // Update fields for Hiring document
                    { $set: { updatedField: 'updatedValue' } },
                    { new: true } // To return the updated document
                );
                return { notfind: false, video: findAppln };
            } else {
                return { notfind: true };
            }
        } catch (error) {
            console.log(error);
            return { error: true };
        }
    },

    uploadPackage:async(Icon,packageData)=>{
        try {
            const s3Result = await s3.uploadIcon(Icon)
            console.log(s3Result);

        } catch (error) {
            console.log(error);
            return { error: true };
        }
    }
    
}