const { describe, before, beforeEach, after, it } = require('mocha')
const { expect } = require('chai')
const { MongoClient } = require('mongodb')
const todosGateway = require('../todos-gateway')

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

  describe('create', () => {

    it('inserts and returns a new todo object with an id', async () => {
      const newTodo = { task: 'learn to test', dueDate: new Date() }
      const created = await todos.create(newTodo)
      expect(created)
        .to.include(newTodo)
        .and.have.property('id')
        .that.is.a('string')
      const doc = await collection.findOne({ id: created.id })
      expect(doc).to.deep.equal(created)
    })

  })

  describe('findById', () => {

    describe('when the todo exists', () => {

      it('returns the found todo', async () => {
        const found = await todos.findById(testId)
        expect(found)
          .to.be.an('object')
          .with.property('id')
          .that.equals(testId)
      })

    })

    describe('when the todo does not exist', () => {

      it('returns null', async () => {
        const found = await todos.findById('lol')
        expect(found).to.equal(null)
      })

    })

  })

  describe('display', () => {

    it('responds with a list of todos from the database', async () => {
      const displayed = await todos.display()
      expect(displayed).to.have.property('id')
    })
  })

})
