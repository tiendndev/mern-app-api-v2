import { MongoClient } from "mongodb";
import { env } from "./environtment.js";

const uri = env.MONGODB_URI;
let dbInstance = null;

export const connectDB = async () => {
   const client = new MongoClient(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
   });

   /* Connect the client to ther server */
   await client.connect();

   /* Assign clientDB to our dbInstance */
   dbInstance = client.db(env.DATABASE_NAME);
};

/* Get Databse Instance */
export const getDB = () => {
   if (!dbInstance) throw new Error("Must connect to Database first!");
   return dbInstance;
};
