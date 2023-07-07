import { NextFunction, Request, Response } from "express";
import { Category } from "../entities";
import categoryRepository from "../repositories/category.repository";
import { AppError } from "../errors/App.error";

const uniqueNameMiddlewares = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { name } = req.body

    if(!name){
        return next()
    }

    const foundEntity: Category | null = await categoryRepository.findOneBy({name})
    if(foundEntity){
        throw new AppError("Category already exists", 409)
    }

    return next()
}

export { uniqueNameMiddlewares }