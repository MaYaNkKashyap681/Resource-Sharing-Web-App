import * as express from "express";
import * as mongoose from "mongoose";
import * as bodyParser from "body-parser";
import * as cookieParser from "cookie-parser";
import { config } from "./config/serverConfig"
import Controller from "./interface/controller.interface";
import ErrorMiddleware from "./middlewares/error.middleware";

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
    this.app.use(cookieParser());
  }

  private initializeControllers(controllers: Controller[]) {
    controllers.forEach((controller) => {
      this.app.use("/", controller.router);
    });
  }

  private initializeErrorHandler() {
    this.app.use(ErrorMiddleware);
  }
}

export default App;
