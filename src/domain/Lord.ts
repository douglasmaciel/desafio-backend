import { UUID } from "crypto";
import { Name } from "./valueObjects/Name";
import { SeasonList } from "./valueObjects/SeasonList";

export class Lord {
  #id: UUID;
  #name: Name;
  #seasons: SeasonList;

  constructor(id: UUID, name: string, seasons: string[]) {
    this.#id = id;
    this.#name = new Name(name);
    this.#seasons = new SeasonList(seasons);
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name.value;
  }

  get seasons() {
    return this.#seasons.value;
  }
}
