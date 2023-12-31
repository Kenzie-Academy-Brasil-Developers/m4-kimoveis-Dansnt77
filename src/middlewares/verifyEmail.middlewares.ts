import { NextFunction, Request, Response } from "express";
import { User } from "../entities/user.entity";
import userRepository from "../repositories/user.repository";
import { AppError } from "../errors/App.error";

export const verifyEmail = async ( req: Request, res: Response, next: NextFunction ): Promise<void> => {
    const email: string = req.body.email
    if(!email){
        return next()
    } 
    
    const foundEntity: User | null = await userRepository.findOneBy({email})
    if(foundEntity){
        throw new AppError("Email already exists", 409)
    } 

    return next()
}