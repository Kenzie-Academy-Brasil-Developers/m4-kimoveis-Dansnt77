import { Router } from "express";
import { createCategoryController, readCategoryController, realEstateForReadCategoryController } from "../controllers/category.controllers";
import { validateBody } from "../middlewares/validateBody.middleware";
import { categoryCreateSchema } from "../schemas/category.schemas";
import { verifyAdmin } from "../middlewares/verifyAdmin.middlewares";
import { verifyToken } from "../middlewares/verifyToken.middlewares";
import { uniqueNameMiddlewares } from "../middlewares/uniqueName.middlewares";

export const categoryRouter: Router = Router()

categoryRouter.post("", validateBody(categoryCreateSchema), verifyToken, verifyAdmin, uniqueNameMiddlewares, createCategoryController)
categoryRouter.get("", readCategoryController)
categoryRouter.get("/:id/realEstate", realEstateForReadCategoryController)