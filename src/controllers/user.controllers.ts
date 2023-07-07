import { Request, Response } from "express";
import { UserRead, UserReturn, UserUpdate } from "../interfaces/user.interfaces";
import { createServices, destroyServices, readServices, updateServices } from "../services/user.services";
import { User } from "../entities/user.entity";

const createController = async (req: Request, res: Response): Promise<Response> => {
    const user: UserReturn = await createServices(req.body)
    return res.status(201).json(user)
}

const readController = async (req: Request, res: Response): Promise<Response> => {
    const admin: boolean = res.locals.decoded.admin
    const users: UserRead = await readServices(admin)

    return res.status(200).json(users)
}

const updateController = async (req: Request, res: Response): Promise<Response> => {
    const payload: UserUpdate = req.body
    const foundUser: User = res.locals.foundEntity

    const user: UserUpdate = await updateServices(foundUser, payload)

    return res.status(200).json(user)
}

const destroyController = async (req: Request, res: Response): Promise<Response> => {
    await destroyServices(res.locals.foundEntity)
    return res.status(204).json()
}

export { createController, readController, updateController, destroyController }