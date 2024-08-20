import { type Express } from "express";
import UserRouter from "./user";
import AuthRouter from "./auth";
import EventRouter from "./event";
import PostRouter from "./post";
import { AuthMiddleware } from "../middlewares/auth";
import { isUniversitySelected } from "../middlewares/permissions";
import { restrictRoutes } from "../utils/route";

const routeHandler = (app: Express) => {
  app.use(restrictRoutes(AuthMiddleware, ["/auth"]));
  app.use(restrictRoutes(isUniversitySelected, ["/auth", "/user/me"]));
  app.use("/user", UserRouter);
  app.use("/auth", AuthRouter);
  app.use("/event", EventRouter);
  app.use("/post", PostRouter);
};

export default routeHandler;
