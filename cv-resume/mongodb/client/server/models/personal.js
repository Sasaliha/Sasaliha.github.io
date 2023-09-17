const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const personalSchema=new Schema({
    _id:String,
    name:String,
    role:String,
    phone:String,
    email:String,
    address:String,
    avatar:String,
    aboutMe:String
});

const Personal=mongoose.model("Personal",personalSchema);//personal isimli collection olutruduk
//export ile birlikte dısarı actık
module.exports=Personal;
