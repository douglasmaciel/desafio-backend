import { UUID } from "crypto";
import { Name } from "./valueObjects/Name";

export class Lord {
  #id: UUID;
  #name: Name;
  #seasons: string[];

  constructor(id: UUID, name: string, seasons: string[]) {
    this.#id = id;
    this.#name = new Name(name);
    this.#seasons = seasons;
    this.validate();
  }

  private validate() {
    if (this.#seasons.length === 0) throw new Error("empty Lord seasons");
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name.value;
  }

  get seasons() {
    return this.#seasons;
  }
}
