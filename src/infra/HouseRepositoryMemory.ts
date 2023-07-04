import { randomUUID } from "crypto";
import { House } from "../domain/House";
import { HouseRepository } from "../domain/repositories/HouseRepository";
import { HouseId } from "../domain/valueObjects/HouseId";

export class HouseRepositoryMemory implements HouseRepository {
  #storage = new Array<[boolean, House]>();

  async nextId(): Promise<string> {
    return new HouseId(randomUUID()).value;
  }

  async getAll(): Promise<House[]> {
    return this.#storage.filter((item) => item[0]).map((item) => item[1]);
  }

  async getById(id: string): Promise<House | undefined> {
    const houseList = this.#storage.filter(
      (item) => item[0] === true && item[1].id === id
    );
    if (houseList.length === 0) return undefined;
    return houseList[0][1];
  }

  async getByName(name: string): Promise<House | undefined> {
    const houseList = this.#storage.filter((item) => item[1].name === name);
    if (houseList.length === 0) return undefined;
    return houseList[0][1];
  }

  async save(house: House): Promise<void> {
    const houseList = this.#storage.filter((item) => item[1].id === house.id);
    if (houseList.length === 0) this.#storage.push([true, house]);
    else {
      houseList[0][0] = true;
      houseList[0][1] = house;
    }
  }

  async remove(house: House): Promise<void> {
    this.#storage = this.#storage.map((item) => {
      if (item[1].id === house.id) item[0] = false;
      return item;
    });
  }
}
