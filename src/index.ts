console.log("Typescript")
import * as dotenv from "dotenv";
import express from "express";
import multer from "multer";
const app = express();
import mongoose from "mongoose";
import { router } from "./routes/employee_route.ts";
app.use(express.json());
var cors = require('cors')
app.use(cors())
app.use("/employee", router);

dotenv.config();
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
const mongoDbUrl = process.env.MONGO_DB_URL || "";
mongoose
  .connect(mongoDbUrl)
  .then(() => console.log(`connected to MongoDB`))
  .catch((err: any) =>
    console.log(`Error While connecting to MongoDB ${err.message}`)
  );