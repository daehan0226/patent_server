const {resolve} = require('path');

require('dotenv').config()

switch(process.env.NODE_ENV) {
  case "development":
    require('dotenv').config({
      path: resolve(__dirname, "../../../../.env.development")
      })
      break
  case "production":
      // env passed when a docker container is created
      break
  default:
      throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`)
}

const development = {
  url: process.env.MYSQL_URL,
  dialect: "mysql",
};

const production = {
  url: process.env.MYSQL_URL,
  dialect: "mysql",
};

module.exports = { development, production };