export class Lord {
  #id: string;
  #name: string;
  #seasons: string[];

  constructor(id: string, name: string, seasons: string[]) {
    this.#id = id;
    this.#name = name;
    this.#seasons = seasons;
    this.validate();
  }

  private validate() {
    if (this.#id === "") throw new Error("empty Lord id");
    if (this.#name === "") throw new Error("empty Lord name");
    if (this.#seasons.length === 0) throw new Error("empty Lord seasons");
  }

  get id() {
    return this.#id;
  }

  get name() {
    return this.#name;
  }

  get seasons() {
    return this.#seasons;
  }
}
