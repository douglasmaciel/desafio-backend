import { House } from "../House";
import { Name } from "../valueObjects/Name";

export interface HouseRepository {
  nextId(): Promise<HouseId>;
  getAll(): Promise<House[]>;
  getById(id: HouseId): Promise<House | undefined>;
  getByName(name: Name): Promise<House | undefined>;
  save(house: House): Promise<void>;
  remove(house: House): Promise<void>;
}
