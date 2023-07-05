import { validate } from "uuid";

export class HouseId {
  #value: string;

  constructor(value: string) {
    if (!validate(value)) throw new TypeError("HouseId is invalid");
    this.#value = value;
  }

  get value() {
    return this.#value;
  }
}
