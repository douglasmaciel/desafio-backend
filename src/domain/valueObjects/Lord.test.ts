import { Lord } from "./Lord";

test("Deve criar um Lord contendo a lista de temporadas que ele aparece", () => {
  const lord = new Lord("character name", ["temporada 1", "temporada 2"]);
  expect(lord.name).toBe("character name");
  expect(lord.seasons).toEqual(["temporada 1", "temporada 2"]);
});

test("Deve lançar exceção caso seja fornecido um nome inválido", () => {
  expect(() => new Lord("", ["temporada 1", "temporada 2"])).toThrow(
    "Name has invalid length"
  );
  expect(
    () => new Lord("a".repeat(257), ["temporada 1", "temporada 2"])
  ).toThrow("Name has invalid length");
});

test("Deve lançar exceção caso seja fornecido uma lista vazia de temporadas", () => {
  expect(() => new Lord("character name", [])).toThrow("SeasonList is empty");
});

test("Deve lançar exceção caso seja fornecido uma lista com dados duplicados", () => {
  expect(
    () => new Lord("character name", ["temporada 1", "temporada 1"])
  ).toThrow("SeasonList has duplicate data");
});

test("Deve lançar exceção caso seja fornecido uma lista com dados inválidos", () => {
  expect(() => new Lord("character name", ["", "temporada 1"])).toThrow(
    "SeasonList has data with invalid length"
  );
  expect(
    () => new Lord("character name", ["a".repeat(257), "temporada 1"])
  ).toThrow("SeasonList has data with invalid length");
});
