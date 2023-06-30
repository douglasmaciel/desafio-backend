import { UUID } from "crypto";
import type { Lord } from "./Lord";
import { Name } from "./valueObjects/Name";
import { HouseFoundationDate } from "./valueObjects/HouseFoundationDate";

export class House {
  #id: UUID;
  #name: Name;
  #foundationDate: HouseFoundationDate;
  #lord: Lord | undefined;

  constructor(id: UUID, name: string, foundationDate: string, lord?: Lord) {
    this.#id = id;
    this.#name = new Name(name);
    this.#foundationDate = new HouseFoundationDate(foundationDate);
    this.#lord = lord;
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name.value;
  }

  get foundationDate() {
    return this.#foundationDate.value;
  }

  get lord() {
    return this.#lord;
  }
}
