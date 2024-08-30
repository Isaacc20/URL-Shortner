import express, { Request, Response, NextFunction } from 'express'
import {config  } from "dotenv";
import ENV from '../utils/env.util'
import { ENVType } from '../utils/enums.util';
import errorHandler from '../middleware/error.mw';
import ErrorResponse from '../utils/error.util';
import cookieParser from 'cookie-parser'
import bodyParser from 'body-parser';
import morgan from 'morgan';
import fileUpload from 'express-fileupload';
import path from 'path'
import hpp from 'hpp';
import expressSanitize from "express-mongo-sanitize";
import helmet from 'helmet';
import cors from 'cors';
import UserAgent from 'express-useragent';
import v1Routes from '../routes/v1/routes.router'

// load my env vars
config()

const app = express()

// set view engine
app.set('view engine', 'ejs')

app.use(cookieParser())


// body parser

/**
 * express body parser
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: false }))
 */

// body-parser package
app.use(bodyParser.json({ limit: '50mb', inflate: true }))
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }))


// http logging middleware
if (ENV.isStaging() || ENV.isDev()) {
    app.use(morgan('dev'))
}

// temporary files directory
app.use(fileUpload({ useTempFiles: true, tempFileDir: path.join(__dirname, 'tmp') }))

/**
 * sanitize data
 * secure db against sql injection
 */
app.use(expressSanitize())

// secure response headers
app.use(helmet())

// rate limting
 
// HTTP parameter pollution
app.use(hpp())

// enable CORS 
// communicate with multiple domains
app.use(cors({ origin: true, credentials: true }))
app.use((req:Request, res: Response, next: NextFunction)=>{
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Origin", "GET, POST, OPTIONS, PUT, PATCH, DELETE")
    res.header("Access-Control-Allow-Origin", "x-access-token, Origin, X-Requested-With, Content-Type, Acept")
    next()
})

// set user agent
app.use(UserAgent.express())

// mount application routers ( or routes )
app.get('/', (req: Request, res: Response, next: NextFunction) => {
    let environment = ENVType.DEVELOPMENT
    if (ENV.isProduction()) {
        environment = ENVType.PRODUCTION
    } else if (ENV.isStaging()) {
        environment = ENVType.STAGING
    } else if (ENV.isDev()) {
        environment = ENVType.DEVELOPMENT
    }

    // return next(new ErrorResponse('Error', 400, ['Cannot get api health'], {name: 'URL Shortner'}))

    res.status(200).json({
        error: false,
        errors: [],
        data: {
            name: 'URL Shortner API - DEFAULT',
            env: 'development'
        },
        message: 'url-shortner api v1.0.0',
        status: 200
    })
})

app.post('/register', (req: Request, res: Response, next: NextFunction) => {

})


app.post('/register', (req: Request, res: Response, next: NextFunction) => {
    console.log(req.body)

    res.status(200).json({
        error: false,
        errors: [],
        data: {},
        message: 'successful',
        status: 200
    })
    // try {
        
    // } catch (error) {
        
    // }
})

// application version-one routes
app.use('/v1', v1Routes)

app.use(errorHandler)

export default app