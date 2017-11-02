require ('dotenv/config')

module.exports = {
  server: 'server/public',
  port: process.env.SYNCPORT,
  // proxy: 'localhost:' + process.env.PORT, //
  files: 'server/public/*',
}
