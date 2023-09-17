const mongoose=require("mongoose");
const uri="mongodb+srv://test:1@test.ubu15qv.mongodb.net/";


function connect(){
    mongoose.connect(uri).then(res=>{
        console.log("mongodb baglantısı basarılı");
    });
    
}

module.exports =connect;

