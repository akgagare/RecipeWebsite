const express=require('express');
const router=express.Router();
const recipeController=require('../controllers/recipeController.js');


router.get('/',recipeController.homepage);

router.get('/categories',recipeController.exploreCategories);

router.get('/recipe/:id',recipeController.exploreRecipes);

router.get('/categories/:id',recipeController.exploreCategoryById);

router.post('/search',recipeController.searchRecipe);

router.get('/explore-latest',recipeController.exploreLatest);



router.get('/random-recipe',recipeController.showRandom);



router.get('/submit-recipe',recipeController.submitRecipe);


router.post('/submit-recipe',recipeController.submitRecipeOnPost);

// router.get('/mainpage',recipeController.mainpage);

module.exports=router;
