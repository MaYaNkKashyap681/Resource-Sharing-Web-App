import HttpException from "../exceptions/http.exception";
import { Model } from "mongoose";
import materialModel from "../db models/material.model";
import Service from "../interface/service.interface";
class MaterialService implements Service {
  public dbModel: Model<any>;
  constructor() {
    this.dbModel = materialModel;
  }

  //Service to fecth all the material
  public getAll = async () => {
    try {
      const response = await this.dbModel.find({});
      if (response) return response;
      throw new HttpException("Error while fetching material", 500);
    } catch (error) {
      throw error;
    }
  };

  //Service to fetch the material based on it's id
  public getOne = async (mId: String) => {
    try {
      const response = await this.dbModel.findById(mId);
      if (response) return response;
      throw new HttpException("Error while fetching material", 500);
    } catch (error) {
      throw error;
    }
  };

  //Service to add data to the db
  public addNew = async (data: any) => {
    try {
      const response = await this.dbModel.create(data);
      if (response) return response;
      throw new HttpException("Material is not Added", 500);
    } catch (error) {
      throw error;
    }
  };
}

export default MaterialService;
