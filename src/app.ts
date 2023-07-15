import express = require("express");
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import cookieParser = require("cookie-parser");
import { config } from "./config/serverConfig";
import { Request, Response } from "express";
import Controller from "./interface/controller.interface";
import ErrorMiddleware from "./middlewares/error.middleware";
import * as cors from "cors";

class App {
  public app: express.Application;

  constructor(controllers: Controller[]) {
    this.app = express();
    this.initializeDatabase();
    this.initializeMiddlewares();
    this.initializeControllers(controllers);
    this.initializeErrorHandler();
  }

  public getApp() {
    return this.app;
  }

  public listen() {
    this.app.listen(config.port, () => {
      console.log("Server started at port", config.port);
    });
  }

  private async initializeDatabase() {
    const connection = await mongoose.connect(config.mongoDb);
    if (connection) {
      console.log("Database Successfully Connected");
    }
  }

  private initializeMiddlewares() {
    this.app.use(express.json());
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
    this.app.use(cookieParser());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
    this.app.use("/", (req: Request, res: Response) => {
      res.status(200).json({
        msg: "Api is Working Fine",
      });
    });
  }

  private initializeErrorHandler() {
    this.app.use(ErrorMiddleware);
  }
}

export default App;
