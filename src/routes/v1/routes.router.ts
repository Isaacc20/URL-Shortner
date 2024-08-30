import express, { Request, Response, NextFunction } from "express";
import { ENVType } from "../../utils/enums.util";

const router = express.Router()


router.get('/', (req: Request, res: Response, next: NextFunction) => {

    res.status(200).json({
        error: false,
        errors: [],
        data: {
            name: 'URL Shortner API - v1 DEFAULT'
        },
        message: 'url-shortner api v1.0.0',
        status: 200
    })
})

export default router;