import { test, expect } from "vitest";
import { Lord } from "./Lord";
import { House } from "./House";

const lord = new Lord("id-lord", "lord name", ["temporada 3"]);

test("Deve criar uma casa", () => {
  const house = new House(
    "id-house-1",
    "house name",
    "data about time of house foundation",
    lord
  );
  expect(house.id).toBe("id-house-1");
  expect(house.name).toBe("house name");
  expect(house.foundationDate).toBe("data about time of house foundation");
  expect(house.lord).toEqual(lord);
});

test("Deve criar uma casa sem Lord", () => {
  const house = new House(
    "id-house-1",
    "house name",
    "data about time of house foundation"
  );
  expect(house.id).toBe("id-house-1");
  expect(house.name).toBe("house name");
  expect(house.foundationDate).toBe("data about time of house foundation");
  expect(house.lord).toBeUndefined();
});

test("Deve lançar uma exceção caso seja fornecido um id vazio", () => {
  expect(() => {
    const house = new House(
      "",
      "house name",
      "data about time of house foundation",
      lord
    );
  }).toThrow("empty House id");
});

test("Deve lançar uma exceção caso seja fornecido um nome vazio", () => {
  expect(() => {
    const house = new House(
      "id-house-1",
      "",
      "data about time of house foundation",
      lord
    );
  }).toThrow("empty House name");
});

test("Deve lançar uma exceção caso seja fornecido uma data de fundação vazia", () => {
  expect(() => {
    const house = new House("id-house-1", "house name", "", lord);
  }).toThrow("empty House foundation date");
});
