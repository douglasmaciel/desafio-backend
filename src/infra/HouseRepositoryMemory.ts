import { UUID, randomUUID } from "crypto";
import { House } from "../domain/House";
import { HouseRepository } from "../domain/repositories/HouseRepository";
import { Name } from "../domain/valueObjects/Name";

export class HouseRepositoryMemory implements HouseRepository {
  #storage = new Array<[boolean, House]>();

  async nextId(): Promise<UUID> {
    return randomUUID();
  }
  async getById(id: UUID): Promise<House | undefined> {
    const houseList = this.#storage.filter(
      (item) => item[0] === true && item[1].id === id
    );
    if (houseList.length === 0) return undefined;
    return houseList[0][1];
  }
  async getByName(name: Name): Promise<House | undefined> {
    const houseList = this.#storage.filter(
      (item) => item[1].name === name.value
    );
    if (houseList.length === 0) return undefined;
    return houseList[0][1];
  }
  async save(house: House): Promise<void> {
    this.#storage.push([true, house]);
  }
  async remove(house: House): Promise<void> {
    this.#storage = this.#storage.map((item) => {
      if (item[1].id === house.id) item[0] = false;
      return item;
    });
  }
}
