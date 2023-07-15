import * as dotenv from 'dotenv'
dotenv.config();

export const config = {
  port: 3000,
  mongoDb: process.env.mongo_uri,
};