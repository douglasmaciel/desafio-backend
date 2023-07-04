import { HouseRepository } from "../domain/repositories/HouseRepository";
import { House } from "../domain/House";
import { HouseRepositoryMemory } from "./HouseRepositoryMemory";

let houseRepository: HouseRepository;

beforeEach(() => {
  houseRepository = new HouseRepositoryMemory();
});

test("Deve retornar uma casa a partir do id", async () => {
  const houseId = "009b670e-d58a-4a8b-ab3e-3b90c14d1272";
  const house = new House(
    houseId,
    "house name",
    "house region",
    "foundation date"
  );
  await houseRepository.save(house);
  const recoveredHouse = await houseRepository.getById(houseId);
  expect(recoveredHouse?.id).toBe(houseId);
});

test("Deve retornar uma casa a partir do nome", async () => {
  const houseId = await houseRepository.nextId();
  const houseName = "house name";
  const house = new House(
    houseId,
    houseName,
    "house region",
    "foundation date"
  );
  await houseRepository.save(house);
  const recoveredHouse = await houseRepository.getByName(houseName);
  expect(recoveredHouse?.name).toBe(houseName);
});

test("Deve armazenar uma casa", async () => {
  const houseId = await houseRepository.nextId();
  const house = new House(
    houseId,
    "house name",
    "house region",
    "foundation date"
  );
  await houseRepository.save(house);
  const recoveredHouse = await houseRepository.getById(houseId);
  expect(recoveredHouse?.id).toBe(house.id);
  expect(recoveredHouse?.name).toBe("house name");
  expect(recoveredHouse?.region).toBe("house region");
  expect(recoveredHouse?.foundationDate).toBe("foundation date");
  expect(recoveredHouse?.lord).toBeUndefined();
});

test("Deve remover uma casa", async () => {
  const houseId = "009b670e-d58a-4a8b-ab3e-3b90c14d1272";
  const house = new House(
    houseId,
    "house name",
    "house region",
    "foundation date"
  );
  await houseRepository.save(house);
  const recoveredHouse = await houseRepository.getById(houseId);
  expect(recoveredHouse?.id).toBe(houseId);
  await houseRepository.remove(house);
  expect(houseRepository.getById(houseId)).resolves.toBeUndefined();
});

test("Deve retornar undefined caso não exista registro da casa", async () => {
  const unmatchedHouseId = "009b670e-d58a-4a8b-ab3e-3b90c14d1272";
  const unmatchedHouseName = "house name";
  expect(houseRepository.getById(unmatchedHouseId)).resolves.toBeUndefined();
  expect(
    houseRepository.getByName(unmatchedHouseName)
  ).resolves.toBeUndefined();
});

test("Deve retornar todas as casas", async () => {
  const houseCount = 5;
  for (let i = 0; i < houseCount; i++) {
    const houseId = await houseRepository.nextId();
    const house = new House(
      houseId,
      `name-${i}`,
      "house region",
      `founded in ${i}`
    );
    await houseRepository.save(house);
  }
  const houses = await houseRepository.getAll();
  expect(houses.length).toBe(houseCount);
});

test("Deve atualizar uma casa", async () => {
  const houseId = await houseRepository.nextId();
  const house = new House(
    houseId,
    "house name",
    "house region",
    "foundation date"
  );
  await houseRepository.save(house);
  const recoveredHouse = await houseRepository.getById(houseId);
  expect(recoveredHouse?.id).toBe(house.id);
  expect(recoveredHouse?.name).toBe("house name");
  expect(recoveredHouse?.region).toBe("house region");
  expect(recoveredHouse?.foundationDate).toBe("foundation date");
  expect(recoveredHouse?.lord).toBeUndefined();
  house.name = "new name";
  house.region = "new region";
  house.foundationDate = "new foundation";
  await houseRepository.save(house);
  const updatedHouse = await houseRepository.getById(houseId);
  expect(updatedHouse?.id).toBe(house.id);
  expect(updatedHouse?.name).toBe("new name");
  expect(updatedHouse?.region).toBe("new region");
  expect(updatedHouse?.foundationDate).toBe("new foundation");
  expect(updatedHouse?.lord).toBeUndefined();
});
