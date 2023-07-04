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
    "house region",
    "data about time of house foundation",
    lord
  );
  expect(house.id).toBe(id);
  expect(house.name).toBe("house name");
  expect(house.region).toBe("house region");
  expect(house.foundationDate).toBe("data about time of house foundation");
  expect(house.lord).toEqual(lord);
});

test("Deve criar uma casa sem Lord", () => {
  const id = randomUUID();
  const house = new House(
    id,
    "house name",
    "house region",
    "data about time of house foundation"
  );
  expect(house.id).toBe(id);
  expect(house.name).toBe("house name");
  expect(house.region).toBe("house region");
  expect(house.foundationDate).toBe("data about time of house foundation");
  expect(house.lord).toBeUndefined();
});

test("Deve lançar uma exceção caso seja fornecido um nome inválido", () => {
  expect(() => {
    new House(
      randomUUID(),
      "",
      "house region",
      "data about time of house foundation",
      lord
    );
  }).toThrow("Name has invalid length");
  expect(() => {
    new House(
      randomUUID(),
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
      randomUUID(),
      "house name",
      "",
      "data about time of house foundation",
      lord
    );
  }).toThrow("Region has invalid length");
  expect(() => {
    const house = new House(
      randomUUID(),
      "house name",
      "a".repeat(257),
      "data about time of house foundation",
      lord
    );
  }).toThrow("Region has invalid length");
});

test("Deve lançar uma exceção caso seja fornecido uma data de fundação vazia", () => {
  expect(() => {
    new House(randomUUID(), "house name", "house region", "", lord);
  }).toThrow("HouseFoundationDate has invalid length");
});

test("Deve lançar uma exceção caso seja fornecido um id inválido", () => {
  expect(() => {
    new House("id-inválido", "house name", "house region", "", lord);
  }).toThrow("HouseId is invalid");
});
