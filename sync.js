require ('dotenv/config')

module.exports = {
  port: process.env.SYNCPORT,
  proxy: 'localhost:' + process.env.PORT,
  files: 'server/public/*',
}
