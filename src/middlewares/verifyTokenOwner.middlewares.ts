import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors/App.error";

const verifyUserToken = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const { decoded } = res.locals
    if(decoded.sub !== req.params.id && decoded.admin === false){
        throw new AppError("Insufficient permission", 403)
    }
    return next()
}

export { verifyUserToken }