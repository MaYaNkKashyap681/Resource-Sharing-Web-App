import { Model } from "mongoose";

interface Service {
  dbModel: Model<any>;
}

export default Service;
