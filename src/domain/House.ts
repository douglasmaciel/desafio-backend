import type { Lord } from "./Lord";

export class House {
  #id: string;
  #name: string;
  #foundationDate: string;
  #lord: Lord | undefined;

  constructor(id: string, name: string, foundationDate: string, lord?: Lord) {
    this.#id = id;
    this.#name = name;
    this.#foundationDate = foundationDate;
    this.#lord = lord;
    this.validate();
  }

  private validate() {
    if (this.#id === "") throw new Error("empty House id");
    if (this.#name === "") throw new Error("empty House name");
    if (this.#foundationDate === "")
      throw new Error("empty House foundation date");
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get foundationDate() {
    return this.#foundationDate;
  }

  get lord() {
    return this.#lord;
  }
}
