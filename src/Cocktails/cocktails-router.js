const path = require('path')
const express = require('express')
const xss = require('xss')
const CocktailsService = require('./cocktails-service')

const cocktailsRouter = express.Router()
const jsonParser = express.json()

const serializeCocktail = cocktail => ({
  id: cocktail.id,
  name: xss(cocktail.name),
  category_id: cocktail.category_id,
  ingredients: xss(cocktail.ingredients),
  steps: xss(cocktail.steps),
  reviews: xss(cocktail.reviews)
})

cocktailsRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    CocktailsService.getAllCocktails(knexInstance)
      .then(cocktails => {
        res.json(cocktails.map(serializeCocktail))
      })
      .catch(next)
  })
  .post(jsonParser, (req, res, next) => {
    const { name, category_id, ingredients, steps, reviews } = req.body
    const newRecipe = { name, category_id, ingredients, steps, reviews }

    for (const [key, value] of Object.entries(newRecipe)) 
      if (value == null) 
        return res.status(400).json({
          error: { message: `Missing '${key}' in request body` }
        })
        newRecipe.category_id = category_id; 

    CocktailsService.insertRecipe(
      req.app.get('db'),
      newRecipe
    )
      .then(cocktail => {
        res
          .status(201)
          .location(path.posix.join(req.originalUrl, `/${cocktail.id}`))
          .json(serializeCocktail(cocktail))
      })
      .catch(next)
  })


  cocktailsRouter
    .route('/:cocktail_id')
    .all((req, res, next) => {
        console.log(req.params)
        CocktailsService.getById(
          req.app.get('db'),
          req.params.cocktail_id
        )
          .then(cocktail => {
            if (!cocktail) {
              return res.status(404).json({
                error: { message: `cocktail doesn't exist in cookbook` }
              })
            }
            res.cocktail = cocktail
            next()
          })
          .catch(next)
      })
      .get((req, res, next) => {
        res.json(serializeCocktail(res.cocktail))
      })
      .patch(jsonParser, (req, res, next) => {
        const { name, ingredients, steps } = req.body
        const recipeToUpdate = { name, ingredients, steps }
        console.log(req.body)

        for (const [key, value] of Object.entries(recipeToUpdate)) 
          if (value == null) 
            return res.status(400).json({
              error: { message: `'${key}' field is required` }
        })
    
        CocktailsService.updateRecipe(
          req.app.get('db'),
          req.params.cocktail_id,
          recipeToUpdate
        )
          .then(numRowsAffected => {
            res.status(204).end()
          })
          .then(numRowsAffected => {
            CocktailsService.getById(
              req.app.get('db'),
              req.params.cocktail_id
            )
          .then(cocktail => {
            if (!cocktail) {
              return res.status(404).json({
                error: { message: `cocktail doesn't exist in cookbook` }
              })
            }
            res.cocktail = cocktail
            res.json(cocktail)
          })
          .catch(next)
          })
          .catch(next)
      })


      cocktailsRouter
      .route('/:cocktail_id/reviews')
      .all((req, res, next) => {
          console.log(req.params)
          CocktailsService.getById(
            req.app.get('db'),
            req.params.cocktail_id
          )
            .then(cocktail => {
              if (!cocktail) {
                return res.status(404).json({
                  error: { message: `cocktail doesn't exist in cookbook` }
                })
              }
              res.cocktail = cocktail
              next()
            })
            .catch(next)
        })
        .patch(jsonParser, (req, res, next) => {
          const { review } = req.body
         
          console.log(req.body)
          console.log(review)
          
          for (const [key, value] of Object.entries(req.body)) 
            if (value == null) 
              return res.status(400).json({
                error: { message: `'${key}' field is required` }
          })
         
          CocktailsService.addReview(
            req.app.get('db'),
            req.params.cocktail_id,
            review
          )
            .then(numRowsAffected => {
              CocktailsService.getById(
                req.app.get('db'),
                req.params.cocktail_id
              )
                .then(cocktail => {
                  if (!cocktail) {
                    return res.status(404).json({
                      error: { message: `cocktail doesn't exist in cookbook` }
                    })
                  }
                  res.cocktail = cocktail
                  res.json(cocktail)
                })
                .catch(next)
            })
            .catch(next)
        })

module.exports = cocktailsRouter