import { Router } from "express";
import { createController, destroyController, readController, updateController } from "../controllers/user.controllers";
import { validateBody } from "../middlewares/validateBody.middleware";
import { userCreateSchema, userUpdateSchema } from "../schemas/user.schemas";
import { verifyEmail } from "../middlewares/verifyEmail.middlewares";
import { verifyToken } from "../middlewares/verifyToken.middlewares";
import { verifyAdmin } from "../middlewares/verifyAdmin.middlewares";
import { verifyIdExists } from "../middlewares/verifyId.middlewares";
import { verifyUserToken } from "../middlewares/verifyTokenOwner.middlewares";

export const userRouter: Router = Router()

userRouter.post("", validateBody(userCreateSchema), verifyEmail, createController)
userRouter.get("",  verifyToken, verifyAdmin, readController)
userRouter.patch("/:id", verifyIdExists, verifyToken, verifyUserToken, validateBody(userUpdateSchema), updateController)
userRouter.delete("/:id", verifyIdExists, verifyToken, verifyAdmin, destroyController)