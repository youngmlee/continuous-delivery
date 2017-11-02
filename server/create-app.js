const express = require('express')
const { MongoClient } = require('mongodb')
const todosGateway = require('./todos-gateway')
const bodyParser = require('body-parser')

module.exports = function createApp() {
  const app = express()

  app.get('/', (req, res) => {
    res.json({
      name: 'continuous-delivery',
      description: 'A practice respository for testing and deployment.',
      link: 'https://github.com/youngmlee/continuous-delivery'
    })
  })

  app.get('/todos', async (req, res) => {
    MongoClient.connect('mongodb://localhost/todo-app', async (err, db) => {
      const todos = todosGateway(db.collection('todos'))
      const displayed = await todos.display()
      res.json(displayed)

      db.close()
    })
  })

  app.use(bodyParser.json())

  app.post('/todos', async (req, res) => {
    MongoClient.connect('mongodb://localhost/todo-app', async (err, db) => {
      const todos = todosGateway(db.collection('todos'))
      todos
        .createTodo(req.body)
        .then(created => res.json(created))

      db.close()
    })
  })

  return app
}
