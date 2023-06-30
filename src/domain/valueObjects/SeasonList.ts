export class SeasonList {
  #value: string[];

  constructor(value: string[]) {
    this.#value = value;
    if (this.#value.length === 0) throw new TypeError("SeasonList is empty");
    if (this.hasDuplicates())
      throw new TypeError("SeasonList has duplicate data");
  }

  private hasDuplicates(): boolean {
    const duplicates = this.#value.filter(
      (item, index) => this.#value.indexOf(item) !== index
    );
    return duplicates.length > 0;
  }

  get value() {
    return this.#value;
  }
}
