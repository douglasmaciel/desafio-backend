import express, { NextFunction, Request, Response } from "express";
import { HouseRepositoryMemory } from "./HouseRepositoryMemory";
import { houseOutDTO } from "../domain/House";
import { Name } from "../domain/valueObjects/Name";
import { HouseId } from "../domain/valueObjects/HouseId";

const houseExpressRouter = express.Router();
houseExpressRouter.use(express.json());
const houseRepository = new HouseRepositoryMemory();

houseExpressRouter.get("/houses", async (req: Request, res: Response) => {
  let output: { data: houseOutDTO[] } | { error: any };
  try {
    const houses = await houseRepository.getAll();
    output = { data: houses.map((h) => h.toOutDTO()) };
  } catch (e) {
    output = { error: e };
    if (e instanceof Error) output = { error: e.message };
    res.status(500);
  }
  res.json(output);
});

houseExpressRouter.get("/houses/:id", async (req: Request, res: Response) => {
  let output: { data: houseOutDTO } | { error: any };
  try {
    const id = new HouseId(req.params.id);
    const house = await houseRepository.getById(id);
    if (house === undefined) {
      res.sendStatus(404);
      return;
    }
    output = { data: house.toOutDTO() };
  } catch (e) {
    output = { error: e };
    if (e instanceof Error) output = { error: e.message };
    res.status(500);
  }
  res.json(output);
});

houseExpressRouter.get("/houses/:name", async (req: Request, res: Response) => {
  let output: { data: houseOutDTO } | { error: any };
  try {
    const name = new Name(req.params.name);
    const house = await houseRepository.getByName(name);
    if (house === undefined) {
      res.sendStatus(404);
      return;
    }
    output = { data: house.toOutDTO() };
  } catch (e) {
    output = { error: e };
    if (e instanceof Error) output = { error: e.message };
    res.status(500);
  }
  res.json(output);
});

export { houseExpressRouter };
