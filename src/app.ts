import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { userRouter } from "./routers/user.router";
import handleError from "./middlewares/handleError.middlewares";
import { sessionRouter } from "./routers/session.router";
import { categoryRouter } from "./routers/category.router";
import { realEstateRouter } from "./routers/realEstate.router";
import { schedulesRouter } from "./routers/schedules.router";

const app = express();
app.use(express.json());

app.use("/users", userRouter)
app.use("/login", sessionRouter)
app.use("/categories", categoryRouter)
app.use("/realEstate", realEstateRouter)
app.use("/schedules", schedulesRouter)

app.use(handleError)
export default app;
