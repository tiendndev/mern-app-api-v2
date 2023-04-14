// require("dotenv").config();
import dotenv from "dotenv";
dotenv.config();

/* c94bMWue84YLGryH */
/* set up env, and env will be located just only in my computer, not push
   to the github
*/

export const env = {
   MONGODB_URI: process.env.MONGODB_URI,
   DATABASE_NAME: process.env.DATABASE_NAME,
   APP_HOST: process.env.APP_HOST,
   APP_PORT: process.env.APP_PORT,
};
