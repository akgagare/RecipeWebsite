const mongoose=require('mongoose');
const recipeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    indgredients:{
        type:Array,
        required:true,
    },
    category:{
        type:String,
        enum:['Thai','American','Indian','Chinese','Mexican'],
        required:true,
    },
    image:{
        type:String,
        required:true
    }
});
recipeSchema.index({name:'text',description:'text'});

//wildcard indexing

// recipeSchema.index({})

module.exports=mongoose.model('Recipe',recipeSchema);