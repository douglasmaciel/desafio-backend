export class HouseFoundationDate {
  MIN_LENGTH = 1;
  MAX_LENGTH = 256;
  #value: string;

  constructor(value: string) {
    this.#value = value;
    if (
      this.#value.length < this.MIN_LENGTH ||
      this.#value.length > this.MAX_LENGTH
    )
      throw new TypeError("HouseFoundationDate has invalid length");
  }

  get value() {
    return this.#value;
  }
}
