import { Request, Response, NextFunction } from "express";
import ENV from "../utils/env.util";
import ErrorResponse from "../utils/error.util";
import logger from "../utils/logger.utils";

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let message: string = ''
    let errors: Array<any> = []
    let error = { ...err }

    // process errors to array
    if (err.errors) {
        errors = Object.values(err.errors).map((el: any, i) => {

            let result: any;
            if (el.properties) {
                result = el.properties.message
            } else {
                result = el
            }
            return result;
    
        })
    }

    // log error to console
    if (ENV.isDev() || ENV.isStaging()) {
        logger.log({data: err, label: 'ERR: '})
        logger.log({data: "There's an error here", label: 'ERR: ', type: 'error'})
        // console.log('ERR: ', err)
    }
    
    // Mongoose bad ObjectID
    if (err.name === 'CastError') {
        message = 'Resource not found - id cannot be casted';
        error = new ErrorResponse(message, 500, errors)
    }

    // Mongoose duplicate key
    if (err.code === 11000) {
        message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 500, errors)
    }
    
    // Mongoose validation error
    if (err.code === 'ValidationError') {
        message = 'An error occured';
        error = new ErrorResponse(message, 500, errors)
    }
    
    // Mongoose reference error
    if (err.code === 'ReferenceError') {
        message = 'Something is not right - check reference';
        error = new ErrorResponse(message, 500, errors)
    }
    

    res.status(500).json({
        error: true,
        errors: error.errors ? error.errors : [],
        data: error.data ? error.data : {},
        message: error.message ? error.message : 'Error',
        status: error.status ? error.status : 500
    })

}

export default errorHandler;