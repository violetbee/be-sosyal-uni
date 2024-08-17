import express, { Express } from "express";
import routeHandler from "./routes";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { PORT } from "./config/settings";
import { logger } from "./middlewares/logger";

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());
app.use(logger);
dotenv.config();
app.use(cookieParser());

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

routeHandler(app);
