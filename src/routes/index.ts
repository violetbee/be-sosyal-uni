import { type Express } from "express";
import UserRouter from "./user";
import AuthRouter from "./auth";
import EventRouter from "./event";
import PostRouter from "./post";
import UniversityRouter from "./university";
import CategoryRouter from "./category";
import CommentRouter from "./comment";
import LikeRouter from "./like";
import { AuthMiddleware } from "../middlewares/auth";
import { isUniversitySelected } from "../middlewares/permissions";
import { restrictRoutes } from "../utils/route";

const whiteList = {
  auth: ["/auth"],
  universitySelection: ["/auth", "/user/me", "/university"],
};

const routeHandler = (app: Express) => {
  app.use(restrictRoutes(AuthMiddleware, whiteList.auth));
  app.use(restrictRoutes(isUniversitySelected, whiteList.universitySelection));
  app.use("/user", UserRouter);
  app.use("/auth", AuthRouter);
  app.use("/event", EventRouter);
  app.use("/post", PostRouter);
  app.use("/university", UniversityRouter);
  app.use("/category", CategoryRouter);
  app.use("/comment", CommentRouter);
  app.use("/like", LikeRouter);
  app.use("*", (req, res) => {
    res.status(404).json({
      error: "Erişmeye çalıştığınız sayfa bulunamadı.",
    });
  });
};

export default routeHandler;
