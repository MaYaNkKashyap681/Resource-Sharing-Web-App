import { Router, Request, Response, NextFunction } from "express";
import Controller from "../interface/controller.interface";
import MaterialService from "./material.service";


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
}

export default MaterialController;
