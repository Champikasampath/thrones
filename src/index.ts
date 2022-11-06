import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import bodyParser from "body-parser";
dotenv.config();

import router from "./routes/api";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/api', router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});