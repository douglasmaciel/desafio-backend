export class SeasonList {
  MIN_LENGTH = 1;
  MAX_LENGTH = 256;
  #value: string[];

  constructor(value: string[]) {
    this.#value = value;
    if (this.#value.length === 0) throw new TypeError("SeasonList is empty");
    if (
      this.#value.some(
        (item) => item.length < this.MIN_LENGTH || item.length > this.MAX_LENGTH
      )
    )
      throw new TypeError("SeasonList has data with invalid length");
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
