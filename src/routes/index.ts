import { type Express } from "express";
import UserRouter from "./user";
import AuthRouter from "./auth";
import EventRouter from "./event";
import PostRouter from "./post";
import { AuthMiddleware } from "../middlewares/auth";
import { isUniversitySelected } from "../middlewares/permissions";

const routeHandler = (app: Express) => {
  app.use("/user", AuthMiddleware, UserRouter);
  app.use("/auth", AuthRouter);
  app.use("/event", AuthMiddleware, isUniversitySelected, EventRouter);
  app.use("/post", AuthMiddleware, isUniversitySelected, PostRouter);
};

export default routeHandler;
