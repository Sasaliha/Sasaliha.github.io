const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const experienceSchema=new Schema({
    _id:String,
    title:String,
    company: String,
    date:String

})

const Experience= mongoose.model("Experience",experienceSchema);
module.exports=Experience;