const { describe, before, beforeEach, after, it } = require('mocha')
const { expect } = require('chai')
const { MongoClient } = require('mongodb')
const todosGateway = require('../server/todos-gateway')
const uuid = require('uuid/v4')

describe('todosGateway', () => {

  let db
  let todos
  let collection
  const testId = uuid()

  before('connect to mongodb', done => {
    MongoClient.connect('mongodb://localhost/todo-app', (err, _db) => {
      if (err) return done(err)
      db = _db
      collection = db.collection('todos')
      todos = todosGateway(collection)
      done()
    })
  })

  after('disconnect from mongodb', () => db.close())

  beforeEach('reset todos collection', async () => {
    await collection.deleteMany()
    await collection.insertOne({
      id: testId,
      task: 'write tests',
      dueDate: new Date()
    })
  })

  describe('display', () => {

    it('responds with a list of todos from the database', async () => {
      const displayed = await todos.display()
      expect(displayed).to.have.length(1)
      expect(displayed[0]).to.have.property('id')
    })
  })

  describe('createTodo', () => {

    it('saves a todo to the database and returns it', async () => {
      const created = await todos.createTodo()
      expect(created).have.property('id')
    })
  })

})
