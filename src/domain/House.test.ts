import { test, expect, beforeEach } from "vitest";
import { Lord } from "./valueObjects/Lord";
import { House } from "./House";
import { randomUUID } from "crypto";

let lord: { name: string; seasons: string[] };

beforeEach(() => {
  lord = { name: "lord name", seasons: ["temporada 3"] };
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
  expect(house.lord?.name).toBe(lord.name);
  expect(house.lord?.seasons).toEqual(lord.seasons);
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

test("Deve criar uma casa e atualizar seus dados", () => {
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
  expect(house.lord?.name).toBe(lord.name);
  expect(house.lord?.seasons).toEqual(lord.seasons);
  house.name = "new name";
  house.region = "new region";
  house.foundationDate = "new foundation date";
  house.lord = { name: "new lord", seasons: ["new season"] };
  expect(house.id).toBe(id);
  expect(house.name).toBe("new name");
  expect(house.region).toBe("new region");
  expect(house.foundationDate).toBe("new foundation date");
  expect(house.lord?.name).toBe("new lord");
  expect(house.lord?.seasons).toEqual(["new season"]);
});
