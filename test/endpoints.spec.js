const knex = require('knex')
const app = require('../src/app')
const { makeCategoriesArray, makeRecipeArray } = require('./sample.data')

describe('Categories Endpoints', function() {
  let db

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL,
    })
    app.set('db', db)
  })

  after('disconnect from db', () => db.destroy())

  before('clean the categories table', () => db('categories').truncate())

  afterEach('cleanup',() => db('categories').truncate())

  describe(`GET /api/categories`, () => {
    context('Given there are categories in the database', () => {
      const testCats = makeCategoriesArray()

      beforeEach('insert cateogories', () => {
        return db
          .into('categories')
          .insert(testCats)
      })

      it('responds with 200 and all of the categories', () => {
        return supertest(app)
          .get('/api/categories')
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200, testCats)
      })
    })
  })

  describe(`GET /api/categories/:category_id`, () => {
    context('Given there are categories in the database', () => {
      const testCats = makeCategoriesArray()

      beforeEach('insert cateogories', () => {
        return db
          .into('categories')
          .insert(testCats)
      })

      it('responds with 200 and appropriate category', () => {
        const catId = 2
        const expectedCategory = testCats[catId - 1]
        return supertest(app)
          .get(`/api/categories/${catId}`)
          .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
          .expect(200, expectedCategory)
      })
    })
  })
})




describe('Cocktails Endpoints', function() {
    let db
  
    before('make knex instance', () => {
      db = knex({
        client: 'pg',
        connection: process.env.TEST_DB_URL,
      })
      app.set('db', db)
    })
  
    after('disconnect from db', () => db.destroy())
  
    before('clean the cocktails table', () => db('cocktails').truncate())
  
    afterEach('cleanup',() => db('cocktails').truncate())
  
    describe(`GET /api/cocktails`, () => {
      context('Given there are cocktails in the database', () => {
        const testRecipes = makeRecipeArray()
  
        beforeEach('insert recipes', () => {
          return db
            .into('cocktails')
            .insert(testRecipes)
        })
  
        it('responds with 200 and all of the cocktails', () => {
          return supertest(app)
            .get('/api/cocktails')
            .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
            .expect(200, testRecipes)
        })
      })
    })
    
    describe(`GET /api/cocktails/:cocktail_id`, () => {
        context('Given there are cocktails in the database', () => {
          const testRecipes = makeRecipeArray()
    
          beforeEach('insert recipes', () => {
            return db
              .into('cocktails')
              .insert(testRecipes)
          })
    
          it('responds with 200 and appropriate recipe', () => {
            const recipeId = 2
            const expectedRecipe = testRecipes[recipeId - 1]
            return supertest(app)
              .get(`/api/cocktails/${recipeId}`)
              .set('Authorization', `Bearer ${process.env.API_TOKEN}`)
              .expect(200, expectedRecipe)
          })
        })
      })

  })

