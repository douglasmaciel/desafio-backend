import { House } from "../House";
import { UUID } from "crypto";
import { Name } from "../valueObjects/Name";

export interface HouseRepository {
  nextId(): Promise<UUID>;
  getById(id: UUID): Promise<House | undefined>;
  getByName(name: Name): Promise<House | undefined>;
  save(house: House): Promise<void>;
  remove(house: House): Promise<void>;
}
