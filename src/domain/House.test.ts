import { test, expect, beforeEach } from "vitest";
import { Lord } from "./valueObjects/Lord";
import { House } from "./House";
import { randomUUID } from "crypto";

let lord: Lord;

beforeEach(() => {
  lord = new Lord("lord name", ["temporada 3"]);
});

test("Deve criar uma casa", () => {
  const id = randomUUID();
  const house = new House(
    id,
    "house name",
    "data about time of house foundation",
    lord
  );
  expect(house.id).toBe(id);
  expect(house.name).toBe("house name");
  expect(house.foundationDate).toBe("data about time of house foundation");
  expect(house.lord).toEqual(lord);
});

test("Deve criar uma casa sem Lord", () => {
  const id = randomUUID();
  const house = new House(
    id,
    "house name",
    "data about time of house foundation"
  );
  expect(house.id).toBe(id);
  expect(house.name).toBe("house name");
  expect(house.foundationDate).toBe("data about time of house foundation");
  expect(house.lord).toBeUndefined();
});

test("Deve lançar uma exceção caso seja fornecido um nome inválido", () => {
  expect(() => {
    const house = new House(
      randomUUID(),
      "",
      "data about time of house foundation",
      lord
    );
  }).toThrow("Name has invalid length");
  expect(() => {
    const house = new House(
      randomUUID(),
      "a".repeat(257),
      "data about time of house foundation",
      lord
    );
  }).toThrow("Name has invalid length");
});

test("Deve lançar uma exceção caso seja fornecido uma data de fundação vazia", () => {
  expect(() => {
    const house = new House(randomUUID(), "house name", "", lord);
  }).toThrow("HouseFoundationDate has invalid length");
});
