import {config as configDotenv} from 'dotenv'
import {resolve} from 'path'

switch(process.env.NODE_ENV) {
    case "development":
        configDotenv({
        path: resolve(__dirname, "../.env.development")
        })
        break
    case "production":
        // env passed when a docker container is created
        break
    default:
        throw new Error(`'NODE_ENV' ${process.env.NODE_ENV} is not handled!`)
}