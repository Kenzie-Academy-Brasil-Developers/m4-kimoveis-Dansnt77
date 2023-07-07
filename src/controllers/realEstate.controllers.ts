import { Request, Response } from "express";
import { IRealEstate } from "../interfaces/realEstate.interfaces";
import { createRealEstate, readRealEstate } from "../services/realEstate.services";

const createRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const realEstate: IRealEstate = await createRealEstate(req.body)
    return res.status(201).json(realEstate)
}

const readRealEstateController = async (req: Request, res: Response): Promise<Response> => {
    const realEstates = await readRealEstate()
    return res.status(200).json(realEstates)
}  

export { createRealEstateController, readRealEstateController }