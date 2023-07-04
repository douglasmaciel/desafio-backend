import { House } from "../House";
import { HouseId } from "../valueObjects/HouseId";
import { Name } from "../valueObjects/Name";

export interface HouseRepository {
  nextId(): Promise<string>;
  getAll(): Promise<House[]>;
  getById(id: string): Promise<House | undefined>;
  getByName(name: string): Promise<House | undefined>;
  save(house: House): Promise<void>;
  remove(house: House): Promise<void>;
}
