import express from "express";
import cors from "cors";
import * as corsOptions from "cors";
import { connectDB } from "./src/config/mongodb.js";
import { env } from "./src/config/environtment.js";
import { apiV1 } from "./src/routes/v1/index.js";

connectDB()
   .then(() => console.log("Connected successfully to DB server"))
   .then(() => bootServer())
   .catch((error) => {
      console.error(error);
      process.exit(1);
   });

const bootServer = () => {
   const app = express();

   app.use(cors(corsOptions));

   /* Enable req.body data */
   app.use(express.json());

   /* Use ApIs v1 */
   app.use("/v1", apiV1);

   app.listen(env.APP_PORT, env.APP_HOST, () => {
      console.log(`App is running on ${env.APP_HOST}:${env.APP_PORT}`);
   });
};
