import { test, expect } from "vitest";
import { Lord } from "./Lord";

test("Deve criar um Lord contendo a lista de temporadas que ele aparece", () => {
  const lord = new Lord("id-lord-1", "character name", [
    "temporada 1",
    "temporada 2",
  ]);
  expect(lord.id).toBe("id-lord-1");
  expect(lord.name).toBe("character name");
  expect(lord.seasons).toEqual(["temporada 1", "temporada 2"]);
});

test("Deve lançar exceção caso seja fornecido um id vazio", () => {
  expect(
    () => new Lord("", "character name", ["temporada 1", "temporada 2"])
  ).toThrow("empty Lord id");
});

test("Deve lançar exceção caso seja fornecido um nome vazio", () => {
  expect(
    () => new Lord("id-lord-1", "", ["temporada 1", "temporada 2"])
  ).toThrow("empty Lord name");
});

test("Deve lançar exceção caso seja fornecido uma lista vazia de temporadas", () => {
  expect(() => new Lord("id-lord-1", "character name", [])).toThrow(
    "empty Lord seasons"
  );
});
