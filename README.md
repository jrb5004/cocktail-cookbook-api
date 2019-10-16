# The Cocktail Cookbook
Link to live app: https://cocktail-cookbook.jrb5004.now.sh/addrecipe

## App Summary
An app for professional mixologists/bartenders and at-home entertainers to access a database of cocktail rescipes organized by category, add new recipes to the collection, and edit/improve existing recipes.

## API Documentation 
- API Base URL: https://damp-reaches-42499.herokuapp.com
  - Categories Endpoints:
    - '/api/categories'
      - Accepts GET requests to return data on all categories in the database.
    - '/api/categories/:category_id'
      - Accepts GET requests to return data on a specific category.  Include the category ID as a request parameter.
  - Cocktails Recipe Endpoints
    - '/api/cocktails'
      - Accepts GET requests to return all categories in the database.
      - Accepts POST requests to submit new recipes.  Name, category_id, ingredients, steps, reviews are all required body parameters.
    - '/api/cocktails/:cocktail_id
      - Accepts GET requests to return data on a specific recipe.  Include the ccocktail ID as a request parameter.
      - Appecpts PATCH requests to allow for updates to steps and ingredients for existing recipes.  Name, steps, and ingredients are required body parameters.
    - 'api/cocktails/:cocktail_id/reviews'
      - Accepts GET requests to retreive array of reviews associated with cocktail ID provided as request parameter.
      - Accepts PATCH requests to add a review associated to a specific recipe to the database.
    
    


## Technologies Used
JavaScript/React/CSS/Node.js/Express/PostreSQL  (This repository is for the server/Node.JS files associated with this project.  Please see my 'cocktail-cookbook' repository for the front end JavaScript/React files.)
