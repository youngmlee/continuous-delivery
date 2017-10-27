const express = require('express')

module.exports = function createApp() {
  const app = express()

  app.get('/', (req, res) => {
    res.json({
      name: 'continuous-delivery',
      description: 'A practice respository for testing and deployment.',
      link: 'https://github.com/youngmlee/continuous-delivery'
    })
  })

  return app
}
