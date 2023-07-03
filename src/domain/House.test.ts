import { test, expect, beforeEach } from "vitest";
import { Lord } from "./valueObjects/Lord";
import { House } from "./House";
import { HouseId } from "./valueObjects/HouseId";
import { randomUUID } from "crypto";

let lord: Lord;

beforeEach(() => {
  lord = new Lord("lord name", ["temporada 3"]);
});

test("Deve criar uma casa", () => {
  const id = new HouseId(randomUUID());
  const house = new House(
    id,
    "house name",
    "house region",
    "data about time of house foundation",
    lord
  );
  expect(house.id).toBe(id.value);
  expect(house.name).toBe("house name");
  expect(house.region).toBe("house region");
  expect(house.foundationDate).toBe("data about time of house foundation");
  expect(house.lord).toEqual(lord);
});

test("Deve criar uma casa sem Lord", () => {
  const id = new HouseId(randomUUID());
  const house = new House(
    id,
    "house name",
    "house region",
    "data about time of house foundation"
  );
  expect(house.id).toBe(id.value);
  expect(house.name).toBe("house name");
  expect(house.region).toBe("house region");
  expect(house.foundationDate).toBe("data about time of house foundation");
  expect(house.lord).toBeUndefined();
});

test("Deve lançar uma exceção caso seja fornecido um nome inválido", () => {
  expect(() => {
    new House(
      new HouseId(randomUUID()),
      "",
      "house region",
      "data about time of house foundation",
      lord
    );
  }).toThrow("Name has invalid length");
  expect(() => {
    new House(
      new HouseId(randomUUID()),
      "a".repeat(257),
      "house region",
      "data about time of house foundation",
      lord
    );
  }).toThrow("Name has invalid length");
});

test("Deve lançar uma exceção caso seja fornecido uma região inválida", () => {
  expect(() => {
    new House(
      new HouseId(randomUUID()),
      "house name",
      "",
      "data about time of house foundation",
      lord
    );
  }).toThrow("Region has invalid length");
  expect(() => {
    const house = new House(
      new HouseId(randomUUID()),
      "house name",
      "a".repeat(257),
      "data about time of house foundation",
      lord
    );
  }).toThrow("Region has invalid length");
});

test("Deve lançar uma exceção caso seja fornecido uma data de fundação vazia", () => {
  expect(() => {
    new House(
      new HouseId(randomUUID()),
      "house name",
      "house region",
      "",
      lord
    );
  }).toThrow("HouseFoundationDate has invalid length");
});
