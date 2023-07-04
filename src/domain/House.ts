import { Lord } from "./valueObjects/Lord";
import { Name } from "./valueObjects/Name";
import { HouseFoundationDate } from "./valueObjects/HouseFoundationDate";
import { Region } from "./valueObjects/Region";
import { HouseId } from "./valueObjects/HouseId";

export type houseOutDTO = {
  id: string;
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
    lord?: { name: string; seasons: string[] }
  ) {
    this.#id = new HouseId(id);
    this.#name = new Name(name);
    this.#region = new Region(region);
    this.#foundationDate = new HouseFoundationDate(foundationDate);
    this.#lord = !!lord ? new Lord(lord?.name, lord?.seasons) : undefined;
  }

  get id() {
    return this.#id.value;
  }
  set id(value: string) {
    this.#id = new HouseId(value);
  }

  get name() {
    return this.#name.value;
  }
  set name(value: string) {
    this.#name = new Name(value);
  }

  get region() {
    return this.#region.value;
  }
  set region(value: string) {
    this.#region = new Region(value);
  }

  get foundationDate() {
    return this.#foundationDate.value;
  }
  set foundationDate(value: string) {
    this.#foundationDate = new HouseFoundationDate(value);
  }

  get lord(): Lord | undefined {
    return this.#lord;
  }
  set lord(value: { name: string; seasons: string[] }) {
    this.#lord = new Lord(value.name, value.seasons);
  }

  toOutDTO(): houseOutDTO {
    const currentLord = this.lord
      ? {
          name: this.lord.name,
          seasons: this.lord.seasons,
        }
      : "";
    return {
      id: this.id,
      attributes: {
        name: this.name,
        region: this.region,
        foundationDate: this.foundationDate,
        currentLord,
      },
    };
  }
}
