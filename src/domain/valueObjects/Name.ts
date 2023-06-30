export class Name {
  #value: string;

  constructor(value: string) {
    if (value.length < 1 || value.length > 256)
      throw new TypeError("invalid Name");
    this.#value = value;
  }

  get value() {
    return this.#value;
  }
}
