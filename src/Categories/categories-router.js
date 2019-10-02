const path = require('path')
const express = require('express')
const xss = require('xss')
const CategoriesService = require('./categories-service')

const categoriesRouter = express.Router()

const serializeCategory = category => ({
  id: category.id,
  name: xss(category.name),
  description: xss(category.description),
})

categoriesRouter
  .route('/')
  .get((req, res, next) => {
    const knexInstance = req.app.get('db')
    CategoriesService.getAllCategories(knexInstance)
      .then(categories => {
        res.json(categories.map(serializeCategory))
      })
      .catch(next)
  })

  categoriesRouter
    .route('/:category_id')
    .all((req, res, next) => {
      console.log(req.params)
      CategoriesService.getById(
        req.app.get('db'),
        req.params.category_id
      )
        .then(category => {
          if (!category) {
            return res.status(404).json({
              error: { message: `category doesn't exist` }
            })
          }
          res.category = category
          next()
        })
        .catch(next)
    })
    .get((req, res, next) => {
      res.json(res.category)
    })

module.exports = categoriesRouter