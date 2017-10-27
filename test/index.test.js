const { describe, before, after, it } = require('mocha')
const { expect } = require('chai')
const request = require('request')
const createApp = require('../create-app')

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

  describe('GET /', () => {

    it ('responds with JSON including the name and description of the repo.', done => {
      request('http://localhost:3000', (err, res, body) => {
        expect(err).to.equal(null)
        expect(res.statusCode).to.equal(200)
        expect(body).to.equal('{"name":"continuous-delivery","description":"A practice respository for testing and deployment."}')
        done()
      })
    })
  })

})
