import { Name } from "./valueObjects/Name";
import { SeasonList } from "./valueObjects/SeasonList";

export class Lord {
  #id: Name;
  #seasons: SeasonList;

  constructor(id: string, seasons: string[]) {
    this.#id = new Name(id);
    this.#seasons = new SeasonList(seasons);
  }

  get id() {
    return this.#id.value;
  }

  get seasons() {
    return this.#seasons.value;
  }
}
