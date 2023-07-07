import { Router } from "express";
import { createRealEstateController, readRealEstateController } from "../controllers/realEstate.controllers";
import { verifyAdmin } from "../middlewares/verifyAdmin.middlewares";
import { validateBody } from "../middlewares/validateBody.middleware";
import { realEstateCreateSchema } from "../schemas/realEstate.schemas";
import { verifyToken } from "../middlewares/verifyToken.middlewares";
import { verifyAddressMiddlewares } from "../middlewares/verifyAddress.middlewares";

export const realEstateRouter: Router = Router()

realEstateRouter.post("", validateBody(realEstateCreateSchema), verifyToken, verifyAdmin, verifyAddressMiddlewares, createRealEstateController)
realEstateRouter.get("", readRealEstateController)