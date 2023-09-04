require('../models/database');
const Category = require("../models/Category");
const Recipe=require("../models/recipe");


// [
//     {
//         "name":"american",
//         "image":"american-food.jpg"
//     },
//     {
//         "name":"indian",
//         "image":"chocolate-banoffe-whoopie-pies.jpg"
//     }
// ]


// async function insertDummy(){
//     try{
//         await Category.insertMany(
//             [
//                 {
//                     "name":"american",
//                     "image":"american-food.jpg"
//                 },
//                 {
//                     "name":"indian",
//                     "image":"chocolate-banoffe-whoopie-pies.jpg"
//                 }
//             ]
//         );

//     }   
//     catch(error){
//         console.log(error);
//     }
// }

// insertDummy();


exports.homepage=async(req,res)=>{
    try{
        const limitnumber=5;
        const categories=await Category.find({}).limit(limitnumber);
        const latest=await Recipe.find({}).sort({_id:-1}).limit(limitnumber);
        const Thai=await Recipe.find({"category":"Thai"}).limit(limitnumber);
        

        const food={latest};

        res.render('index',{title:'cookingBlog',categories,food,Thai});
    }
    catch(error){
        res.status(500).send({message:error}||"error occured");
        console.log(error);

    }
}

//get indivial food details
exports.exploreCategories=async(req,res)=>{
    try{
        const limitnumber=20;
        const categories=await Category.find({}).limit(limitnumber);
        res.render('categories',{title:'Food Details',categories});
    }
    catch(error){
        res.status(500).send({message:error}||"error occured");
        console.log(error);

    }
}


//Recipes page (explore page)
exports.exploreRecipes=async(req,res)=>{
    try{
        let recipeID= req.params.id;
        const recipe=await Recipe.findById(recipeID);
        



        res.render('recipes',{title:'Food Details',recipe});
    }
    catch(error){
        res.status(500).send({message:error}||"error occured");
        console.log(error);

    }
}

//get category by id

exports.exploreCategoryById=async(req,res)=>{
    try{
        let categoryId=req.params.id;
        const limitnumber=20;
        const categoryById=await Recipe.find({'category':categoryId}).limit(limitnumber);
        res.render('exploreCountry',{title:'cooking Blog',categoryById}); 
        
    }
    catch(error){
        res.status(500).send({message:error}||"error occured");
        console.log(error);

    }
}


exports.searchRecipe=async(req,res)=>{
    try{
        let searchTerm=req.body.searchTerm; 

        let recipe=await Recipe.find({ $text: {$search:searchTerm,$diacriticSensitive:true} });
        // res.json(recipe);


        res.render('search',{title:'Cooking -search',recipe});
    }
    catch(error){
        res.status(500).send({message:error}||"error occured");
        console.log(error);
    }
}


exports.exploreLatest=async(req,res)=>{
    try{
        const limitnumber=20;
        const recipe=await Recipe.find({}).sort({_id:-1}).limit(limitnumber);
        res.render('explore',{title:'Cooking-explore',recipe});
    }
    catch(error){
        res.status(500).send({message:error}||"error occured");
        console.log(error);
    }
}


exports.showRandom=async(req,res)=>{
    try{
        const limitnumber=5;
        const recipe=await Recipe.find({}).sort({}).limit(limitnumber);
        res.render('random',{title:'Cooking-explore',recipe});
    }
    catch(error){
        res.status(500).send({message:error}||"error occured");
        console.log(error);
    }
}


exports.submitRecipe=async(req,res)=>{
    try{
        const infoErrorObj=req.flash('infoErrors');
        const infoSubmitObj=req.flash('infoSubmit');

        res.render('submit-recipe',{title:'submit-recipe',infoErrorObj,infoSubmitObj});
    }
    catch(error){

        res.status(500).send({message:error}||"error occured");
        console.log(error);

    }
}

exports.submitRecipeOnPost=async(req,res)=>{
    try{
        let imageUploadFile;
        let uploadPath;
        let newImageName;

        if(!req.files||Object.keys(req.files).length===0){
            console.log("no files uploaded");
        }
        else{
            imageUploadFile=req.files.image;
            newImageName=Date.now()+imageUploadFile.name;

            uploadPath=require('path').resolve('./')+'/public/uploads'+newImageName;

            imageUploadFile.mv(uploadPath,function(err){
                if(err) return res.status(500).send(err);
            })
        }
        
        const newRecipe=new Recipe({
            name:req.body.name,
            description:req.body.description,
            email:req.body.email,
            indgredients:req.body.indgredients,
            category:req.body.category,
            image:newImageName
        });
        await newRecipe.save();





        //since its a post we cant render 
        //we wil rediret
        req.flash('infoSubmit','Recipe has been added');
        res.redirect('/submit-recipe');
        
    }
    catch(error){
        req.flash('infoErrors',error);
        res.redirect('/submit-recipe');
    }
}


// async function updateRecipe(){
//     try{
//         const newname=await Recipe.updateOne({name:'chef'},{name:'new Recipe Updated'});
//         res.n;//Number of documents matched
//         res.nModified;//no.of documents updated

//     }   
//     catch(err){
//         console.log(err);
//     }
// }
// updateRecipe();