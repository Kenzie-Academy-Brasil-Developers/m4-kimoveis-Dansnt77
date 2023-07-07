import { NextFunction, Request, Response } from "express";
import addressRepository from "../repositories/address.repository";
import { Address } from "../entities";
import { AppError } from "../errors/App.error";

const verifyAddressMiddlewares = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const { address } = req.body

    const number: string = address.number == undefined ? '': String(address.number)

    const addressFind:Address | null = await addressRepository.findOne({
        where: {
            state: address.state,
            city: address.city,
            zipCode: address.zipCode,
            street: address.street,
            number: number,
        }
    })

    if(addressFind){
        throw new AppError("Address already exists", 409)
    }

    return next()
}

export { verifyAddressMiddlewares }