export class Name {
  MIN_LENGTH = 1;
  MAX_LENGTH = 256;
  #value: string;

  constructor(value: string) {
    if (value.length < this.MIN_LENGTH || value.length > this.MAX_LENGTH)
      throw new TypeError("Name has invalid length");
    this.#value = value;
  }

  get value() {
    return this.#value;
  }
}
