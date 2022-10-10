require('dotenv').config()

const PORT = process.env.PORT

const MONGO_URL = process.env === 'test'
  ? process.env.MONGO_URL_TEST
  : process.env.MONGO_URL_PROD

module.exports = {
  MONGO_URL,
  PORT
}
