const mongoose=require('mongoose');
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:"This field is required "
    }
});

module.exports=mongoose.model('Category',categorySchema);