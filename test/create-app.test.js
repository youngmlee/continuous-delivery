require ('dotenv/config')
const { describe, before, after, it } = require('mocha')
const { expect } = require('chai')
const request = require('request')
const createApp = require('../server/create-app')

describe('app', () => {
  const app = createApp()
  let server

  before(done => {
    server = app.listen(3000, () => {
      done()
    })
  })

  after(done => {
    server.close(() => {
      done()
    })
  })

  describe('GET /api', () => {

    it ('responds with JSON including the name and description of the repo.', done => {
      request('http://localhost:' + process.env.PORT + '/api', (err, res, body) => {
        expect(err).to.equal(null)
        expect(res.statusCode).to.equal(200)
        expect(body).to.equal('{"name":"continuous-delivery","description":"A practice respository for testing and deployment.","link":"https://github.com/youngmlee/continuous-delivery"}')
        done()
      })
    })
  })

  describe('GET /api/todos', () => {

    it('responds with a list of todos', done => {
      request('http://localhost:' + process.env.PORT + '/api/todos', {json: true}, (err, res, body) => {
        expect(err).to.equal(null)
        expect(res.statusCode).to.equal(200)
        expect(body).to.be.an('array')
        done()
      })
    })
  })

  describe('POST /api/todos', () => {

    it('responds with the newly saved todo', done => {
      request('http://localhost:' + process.env.PORT + '/api/todos', {json: true}, (err, res, body) => {
        expect(err).to.equal(null)
        expect(res.statusCode).to.equal(200)
        expect(body).to.be.an('array')
        done()
      })
    })
  })

})
