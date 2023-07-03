import express, { NextFunction, Request, Response } from "express";
import "dotenv/config";
import { houseExpressRouter } from "./infra/HouseExpressRoutes";

const port = process.env.PORT || "3000";
const app = express();

app.use("/api", houseExpressRouter);
app.use((req: Request, res: Response) => {
  res.sendStatus(404);
});

app.listen(port, () => console.log(`House API started on port ${port}`));
