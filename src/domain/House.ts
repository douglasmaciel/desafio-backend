import type { Lord } from "./valueObjects/Lord";
import { Name } from "./valueObjects/Name";
import { HouseFoundationDate } from "./valueObjects/HouseFoundationDate";
import { Region } from "./valueObjects/Region";
import { HouseId } from "./valueObjects/HouseId";

export type houseOutDTO = {
  id: HouseId;
  attributes: {
    name: string;
    region: string;
    foundationDate: string;
    currentLord:
      | {
          name: string;
          seasons: string[];
        }
      | "";
  };
};

export class House {
  #id: HouseId;
  #name: Name;
  #region: Region;
  #foundationDate: HouseFoundationDate;
  #lord: Lord | undefined;

  constructor(
    id: string,
    name: string,
    region: string,
    foundationDate: string,
    lord?: Lord
  ) {
    this.#id = new HouseId(id);
    this.#name = new Name(name);
    this.#region = new Region(region);
    this.#foundationDate = new HouseFoundationDate(foundationDate);
    this.#lord = lord;
  }

  get id() {
    return this.#id.value;
  }

  get name() {
    return this.#name.value;
  }

  get region() {
    return this.#region.value;
  }

  get foundationDate() {
    return this.#foundationDate.value;
  }

  get lord() {
    return this.#lord;
  }

  toOutDTO(): houseOutDTO {
    const currentLord = this.lord
      ? {
          name: this.lord.name,
          seasons: this.lord.seasons,
        }
      : "";
    return {
      id: this.#id,
      attributes: {
        name: this.name,
        region: this.region,
        foundationDate: this.foundationDate,
        currentLord,
      },
    };
  }
}
