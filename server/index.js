require('dotenv/config')
const createApp = require('./create-app')
const { MongoClient } = require('mongodb')
const todosGateway = require('./todos-gateway')

const app = createApp()

app.listen(process.env.PORT, () => {
  console.log('Now listening on port ' + process.env.PORT + '!')
})
