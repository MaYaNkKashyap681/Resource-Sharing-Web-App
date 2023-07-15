import Material from "material/material.interface";
import mongoose from "mongoose";

const materialSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    resource: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    description: String,
    resourceType: String,
    category: String,
    grade: String,
  },
  {
    timestamps: true,
  }
);

const materialModel = mongoose.model<Material & mongoose.Document>(
  "Material",
  materialSchema
);

export default materialModel;
