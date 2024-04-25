const Psychologyst = require("../models/psychologystSchema")
const User = require("../models/userSchema")
const Hiring =require("../models/hiringSchema")
const Podcast = require("../models/podcastSchema")
const Graduates = require("../models/graduateSchema")
const NGOs = require("../models/ngoSchema")
const Videos = require("../models/videoSchema")
const Packages = require("../models/packageSchema")
const Team = require('../models/teamSchema.js')
const GetinTouch = require('../models/getInTouch.js')
const mongoose= require("mongoose")
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
                    description:psychologystData.discription
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
            console.log(findAppln, "find out");
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

    uploadPackage:async(s3Icon,packageData)=>{
        try {
           
            console.log(s3Icon,"s3 icon result",packageData,"form data remaining!!");
            const newPackage = await new Packages({
                package_title : packageData.title,
                package_icon : s3Icon.iconResponse.Location,
                days_plan :packageData.daysPlan,
                benefits : packageData.benefits,
                sub_benefits : packageData.subBenefits,
                description : packageData.description,
                price : packageData.price,
                recommended : packageData.recommended
            })

            const newPackageAdded = await newPackage.save()
            console.log(newPackageAdded,"beautiful");
            return (newPackageAdded)

        } catch (error) {
            console.log(error,"iii");
            return { error: true };
        }
    },

    findPackage:async()=>{
        try {
            const results = await Packages.find()
            console.log(results,'packages added');
            if(results){
                return (results)
            }else{
                return ({empty:true})
            }
        } catch (error) {
            console.log(error,"iii");
            return { error: true };
        }
    },

    getPackage:async(Id)=>{
        try {
            const getPack = await Packages.findById({_id:Id})
            console.log(getPack,"this is the package");
            if(getPack){
                return (getPack)
            }else{
                return({notfound:true})
            }
        } catch (error) {
            console.log(error,"iii");
            return { error: true };
        }
    },

    
    findPackage:async(Id,newData,Icon)=>{
        try {
            const findPack = await Packages.findOneAndUpdate(
                {Id},
                {
              
                
                    package_title:newData.title,
                    package_icon:Icon.iconResponse.Location,
                    days_plan:newData.daysPlan,
                    benefits:newData.benefits,
                    sub_benefits:newData.subBenefits,
                    description:newData.description,
                    price:newData.price,
                    recommended:newData.recommended,

            },
            { new: true }
            )
            console.log(findPack,"updated data");
            if(findPack){
                return ({update:true},findPack)
            }else{
                return ({update:false})
            }
        } catch (error) {
            console.log(error);
            return { error: true };
        }
    },

    deleteOneVideo:async(Id)=>{
        try {
            console.log("inside delete package helper");
            const deleteVideo = await Videos.findByIdAndDelete({_id:Id})
            console.log(deleteVideo,"deleted!!");
            if(deleteVideo){
                return ({success:true})
            }else{
                return ({success:false})
            }
        } catch (error) {
            console.log(error);
            return { error: true };
        }
    },

    deleteOnePackage:async(Id)=>{
        try {
            console.log("inside delete package helper");
            const deletePackages = await Packages.findByIdAndDelete({_id:Id})
            console.log(deletePackages,"deleted!!");
            if(deletePackages){
                return ({success:true})
            }else{
                return ({success:false})
            }
        } catch (error) {
            console.log(error);
            return { error: true };
        }
    },

    addMember:async(memberData,fileData)=>{
        try {
            const newMember = new Team({
                name : memberData.name,
                image:fileData.image.Location,
                designation:memberData.designation,
                audio:fileData.audio.Location,
                socialmediaLink:memberData.socialMediaLink
            })

            const newMemberData = await newMember.save()
            console.log(newMemberData,"new member ");
            return (newMemberData)
        } catch (error) {
            console.log(error);
            return { error: true };
        }
    },

    getMembers:async()=>{
        try {
            const allMembers = await Team.find()
            if(allMembers){
                console.log(allMembers);
                return ({present:true,allMembers})
            }else{
                return ({present:false})
            }
        } catch (error) {
            console.log(error);
            return { error: true };
        }
    },

    view_Member:async(Id)=>{
        try {
            const memberData = await Team.findById({_id:Id})
            if(memberData){
                return ({memberData})
            }else{
                return ({notfind:true})
            }
        } catch (error) {
            console.log(error);
            return { error: true };
        }
    },

    updateMember:async(Id,formData,FileData)=>{
        try {
            const objectId = new mongoose.Types.ObjectId(Id);

            const memberExist = await Team.findByIdAndUpdate(objectId,{
                
                name : formData.name,
                image:FileData.image.Location,
                designation:formData.designation,
                audio:FileData.audio.Location,
                socialmediaLink:formData.socialMediaLink

            },
            {new:true}
            )
            return (memberExist)
            // console.log(memberExist,"updated Data..");
        } catch (error) {
            console.log(error);
            return { error: true };
        }
    },

    deleteMember:async(Id)=>{
        try {
            console.log("inside delete member helper");
            const deleteMember = await Team.findByIdAndDelete({_id:Id})
            console.log(deleteMember,"deleted!!");
            if(deleteMember){
                return ({success:true})
            }else{
                return ({success:false})
            }
        } catch (error) {
            console.log(error);
            return { error: true };
        }
    },

    getGetintouch:async()=>{
        try {
            const allGet = await GetinTouch.find()
            if(allGet){
                console.log(allGet);
                return ({present:true,allGet})
            }else{
                return ({present:false})
            }
        } catch (error) {
            console.log(error);
            return { error: true };
        }
    }
    
}