import { Request, Response } from "express";
import { SessionReturn } from "../interfaces/session.interfaces";
import { create } from "../services/session.services";

const createSessionController = async (req: Request, res: Response): Promise<Response> =>{
    const token: SessionReturn = await create(req.body)
    return res.status(200).json(token)
}

export { createSessionController }