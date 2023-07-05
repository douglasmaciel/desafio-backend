import { Name } from "./Name";
import { SeasonList } from "./SeasonList";

export type lordOutDTO = {
  name: string;
  seasons: string[];
};

export class Lord {
  #name: Name;
  #seasons: SeasonList;

  constructor(name: string, seasons: string[]) {
    this.#name = new Name(name);
    this.#seasons = new SeasonList(seasons);
  }

  get name() {
    return this.#name.value;
  }

  get seasons() {
    return this.#seasons.value;
  }

  toOutDTO(): lordOutDTO {
    return { name: this.#name.value, seasons: this.#seasons.value };
  }
}
