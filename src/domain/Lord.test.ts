import { test, expect } from "vitest";
import { Lord } from "./Lord";
import { randomUUID } from "crypto";

test("Deve criar um Lord contendo a lista de temporadas que ele aparece", () => {
  const id = randomUUID();
  const lord = new Lord(id, "character name", ["temporada 1", "temporada 2"]);
  expect(lord.id).toBe(id);
  expect(lord.name).toBe("character name");
  expect(lord.seasons).toEqual(["temporada 1", "temporada 2"]);
});

test("Deve lançar exceção caso seja fornecido um nome vazio", () => {
  expect(
    () => new Lord(randomUUID(), "", ["temporada 1", "temporada 2"])
  ).toThrow("empty Lord name");
});

test("Deve lançar exceção caso seja fornecido uma lista vazia de temporadas", () => {
  expect(() => new Lord(randomUUID(), "character name", [])).toThrow(
    "empty Lord seasons"
  );
});
