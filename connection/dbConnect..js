const mongoose = require("mongoose")
mongoose.set('strictQuery', true);
mongoose.connect('mongodb+srv://teammentoons:W3RUBGmDZSdPs9Cp@cluster0.gkylaqy.mongodb.net/activeListeners')
mongoose.connection.once('open',()=>console.log('database connected successfullly!!!!')).on('error',error=>{
console.log(error);
})