const express = require('express')
const { MongoClient } = require('mongodb')
const todosGateway = require('./todos-gateway')
const bodyParser = require('body-parser')
const path = require('path')

module.exports = function createApp() {
  const app = express()
  app.use(express.static(path.join(__dirname, 'public')))

  app.get('/api', (req, res) => {
    res.json({
      name: 'continuous-delivery',
      description: 'A practice respository for testing and deployment.',
      link: 'https://github.com/youngmlee/continuous-delivery'
    })
  })

  app.get('/api/todos', async (req, res) => {
    MongoClient.connect('mongodb://localhost/todo-app', async (err, db) => {
      const todos = todosGateway(db.collection('todos'))
      const displayed = await todos.display()
      res.json(displayed)

      db.close()
    })
  })

  app.use(bodyParser.json())

  app.post('/api/todos', async (req, res) => {
    MongoClient.connect('mongodb://localhost/todo-app', async (err, db) => {
      const todos = todosGateway(db.collection('todos'))
      await todos
        .createTodo(req.body)
        .then(created => res.json(created))

      db.close()
    })
  })

  return app
}
