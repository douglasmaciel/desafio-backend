import express, { NextFunction, Request, Response } from "express";
import { HouseRepositoryMemory } from "./HouseRepositoryMemory";
import { House, houseOutDTO } from "../domain/House";

const houseExpressRouter = express.Router();
houseExpressRouter.use(express.json());
const houseRepository = new HouseRepositoryMemory();
type houseInputDTO = {
  name: string;
  region: string;
  foundationDate: string;
  lord?: {
    name: string;
    seasons: string[];
  };
};

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

houseExpressRouter.get("/houses/query", async (req: Request, res: Response) => {
  let output: { data: houseOutDTO } | { error: any };
  if (typeof req.query.name !== "string") {
    res.sendStatus(400);
    return;
  }
  try {
    const name = req.query.name ?? "";
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

houseExpressRouter.get("/houses/:id", async (req: Request, res: Response) => {
  let output: { data: houseOutDTO } | { error: any };
  try {
    const id = req.params.id;
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

houseExpressRouter.post("/houses", async (req: Request, res: Response) => {
  let output: { data: houseOutDTO | {} } | { error: any };
  try {
    const { name, region, foundationDate, lord } = req.body as houseInputDTO;
    if (
      name === undefined ||
      region === undefined ||
      foundationDate === undefined
    ) {
      res.sendStatus(400);
      return;
    }
    const houseId = await houseRepository.nextId();
    const house = new House(houseId, name, region, foundationDate, lord);
    await houseRepository.save(house);
    const savedHouse = await houseRepository.getById(houseId);
    output = { data: savedHouse?.toOutDTO() ?? {} };
  } catch (e) {
    output = { error: e };
    if (e instanceof Error) output = { error: e.message };
    res.status(500);
  }
  res.json(output);
});

houseExpressRouter.delete(
  "/houses/:id",
  async (req: Request, res: Response) => {
    let output: { data: houseOutDTO } | { error: any };
    try {
      const id = req.params.id;
      const house = await houseRepository.getById(id);
      if (house === undefined) {
        res.sendStatus(404);
        return;
      }
      await houseRepository.remove(house);
      output = { data: house.toOutDTO() };
    } catch (e) {
      output = { error: e };
      if (e instanceof Error) output = { error: e.message };
      res.status(500);
    }
    res.json(output);
  }
);

houseExpressRouter.put("/houses/:id", async (req: Request, res: Response) => {
  let output: { data: houseOutDTO | {} } | { error: any };
  try {
    const { name, region, foundationDate, lord } = req.body as houseInputDTO;
    const id = req.params.id;
    const house = await houseRepository.getById(id);
    if (house === undefined) {
      res.sendStatus(404);
      return;
    }
    house.name = name ?? house.name;
    house.region = region ?? house.region;
    house.foundationDate = foundationDate ?? house.foundationDate;
    if (lord) house.lord = lord;
    await houseRepository.save(house);
    const savedHouse = await houseRepository.getById(id);
    output = { data: savedHouse?.toOutDTO() ?? {} };
  } catch (e) {
    output = { error: e };
    if (e instanceof Error) output = { error: e.message };
    res.status(500);
  }
  res.json(output);
});

export { houseExpressRouter };
