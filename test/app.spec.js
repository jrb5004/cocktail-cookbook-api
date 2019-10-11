const { expect } = require('chai')
const supertest = require('supertest')
const app = require('../src/app')

describe('App', () => {
  it('GET / responds with 200 containing "Hello, world!"', () => {
    return supertest(app)
      .get('/')
      .set('Authorization', 'Bearer 5b109091-153f-4de9-8aa4-544f20f7831f')
      .expect(200, 'Hello, world!')
  })
})