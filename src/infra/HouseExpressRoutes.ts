import express, { NextFunction, Request, Response } from "express";
import { HouseRepositoryMemory } from "./HouseRepositoryMemory";
import { housesOutDTO } from "../domain/House";

const houseExpressRouter = express.Router();
houseExpressRouter.use(express.json());
const houseRepository = new HouseRepositoryMemory();

houseExpressRouter.get("/houses", async (req: Request, res: Response) => {
  let output: { data: housesOutDTO[] } | { error: any };
  try {
    const houses = await houseRepository.getAll();
    output = { data: houses.map((h) => h.toOutDTO()) };
  } catch (e) {
    output = { error: e };
  }
  res.json(output);
});

export { houseExpressRouter };
