import { Router } from "express";
import { validateBody } from "../middlewares/validateBody.middleware";
import sessionSchema from "../schemas/session.schemas";
import { create } from "../services/session.services";
import { createSessionController } from "../controllers/session.controllers";

const sessionRouter: Router = Router()

sessionRouter.post("", validateBody(sessionSchema), createSessionController)

export { sessionRouter }