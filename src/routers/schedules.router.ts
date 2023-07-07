import { Router } from "express";
import { createScheduleController, readSchedulesController } from "../controllers/schedules.controllers";
import { verifyToken } from "../middlewares/verifyToken.middlewares";
import { validateBody } from "../middlewares/validateBody.middleware";
import { scheduleCreateSchema } from "../schemas/schedules.schemas";
import { readCategoryController } from "../controllers/category.controllers";
import { verifyAdmin } from "../middlewares/verifyAdmin.middlewares";


export const schedulesRouter: Router = Router()

schedulesRouter.post("", verifyToken, validateBody(scheduleCreateSchema), createScheduleController)
schedulesRouter.get("/realEstate/:id", verifyToken, verifyAdmin, readSchedulesController)