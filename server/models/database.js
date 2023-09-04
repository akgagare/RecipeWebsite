const mongoose=require("mongoose");
require("dotenv").config();
const connectWithDb=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true
    })
    .then(console.log("DB connected Successfully"))
    .catch((error)=>{
        console.log("DB facing connection issue");
        console.log(error);
        process.exit(1);
    })
};

module.exports=connectWithDb;
// console.error.bind(console,'connenection error:'))