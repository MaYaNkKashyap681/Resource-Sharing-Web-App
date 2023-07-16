import { Router, Request, Response, NextFunction } from "express";
import Controller from "../interface/controller.interface";
import MaterialService from "./material.service";
import { spawn } from "child_process";

const path = require('path');


// const scriptPath = path.join(__dirname, '../python/thumbnailmaker.py');

const venvPath = "D:/Intern Tasks/resource-sharing-webapp/server/env/Scripts/python"
const pythonFilePath = 'D:/Intern Tasks/resource-sharing-webapp/server/python/thumbnailmaker.py';
console.log(pythonFilePath)
 

class MaterialController implements Controller {
  public path = "/material";
  public router = Router();
  public materialservice: any;

  constructor() {
    this.materialservice = new MaterialService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/all`, this.getAllMaterials);
    this.router.get(`${this.path}/:mId`, this.getMaterial);
    this.router.post(`${this.path}/add`, this.addMaterial);
    this.router.post(`${this.path}/python`, this.executeScript);
  }

  //Method to get all material
  private getAllMaterials = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const response = await this.materialservice.getAll();
      return res.status(200).json({
        success: true,
        message: "Successfully got the list of all Materials",
        data: response,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };

  //Method to get a material specific to the Id
  private getMaterial = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { mId } = req.params;
      const response = await this.materialservice.getOne(mId);
      return res.status(200).json({
        success: true,
        message: "Successfully got the Material",
        data: response,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };

  //Method to add new Material in the Database
  private addMaterial = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    try {
      console.log("Request arrived");
      const response = await this.materialservice.addNew(req.body);
      return res.status(201).json({
        success: true,
        message: "Successfully got the list of Job Posts",
        data: response,
        err: {},
      });
    } catch (error) {
      next(error);
    }
  };

  private async executeScript(req: Request, res: Response) {
    const pythonProcess = spawn(venvPath, [pythonFilePath]);

    pythonProcess.stdout.on("data", (data) => {
      console.log(`Python script output: ${data}`);
    });

    pythonProcess.stderr.on("data", (data) => {
      console.error(`Python script error: ${data}`);
    });

    res.status(200).json({ message: "Python script execution triggered" });
  }
}

export default MaterialController;
