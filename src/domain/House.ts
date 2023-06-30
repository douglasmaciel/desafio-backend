import { UUID } from "crypto";
import type { Lord } from "./Lord";
import { Name } from "./valueObjects/Name";

export class House {
  #id: UUID;
  #name: Name;
  #foundationDate: string;
  #lord: Lord | undefined;

  constructor(id: UUID, name: string, foundationDate: string, lord?: Lord) {
    this.#id = id;
    this.#name = new Name(name);
    this.#foundationDate = foundationDate;
    this.#lord = lord;
    this.validate();
  }

  private validate() {
    if (this.#foundationDate === "")
      throw new Error("empty House foundation date");
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name.value;
  }

  get foundationDate() {
    return this.#foundationDate;
  }

  get lord() {
    return this.#lord;
  }
}
