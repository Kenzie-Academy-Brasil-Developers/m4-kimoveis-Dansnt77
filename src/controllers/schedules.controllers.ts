import { NextFunction, Request, Response } from "express";
import { ISchedule, ScheduleCreate } from "../interfaces/schedules.interfaces";
import { createSchedule, readSchedules } from "../services/schedules.services";

const createScheduleController = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const tokenId: number = res.locals.decoded.sub
     const payload: ScheduleCreate = req.body

    const schedule = await createSchedule(payload, tokenId)
    
    return res.status(201).json({message:"Schedule created"})
}

const readSchedulesController = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    const realEstateId = Number(req.params.id)
    const schedules = await readSchedules(realEstateId)

    return res.status(200).json(schedules)
}

export { createScheduleController, readSchedulesController }