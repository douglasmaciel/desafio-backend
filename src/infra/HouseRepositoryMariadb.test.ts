import { HouseRepository } from "../domain/repositories/HouseRepository";
import { House } from "../domain/House";
import { HouseRepositoryMysql } from "./HouseRepositoryMariadb";

const isToSkip = process.env.DB === undefined;
const testSkipIf = (condition: boolean) => (condition ? test.skip : test);
let houseRepository: HouseRepository;

beforeEach(async () => {
  houseRepository = new HouseRepositoryMysql(
    "localhost",
    "root",
    "testpassword",
    "testdb"
  );
});
afterEach(async () => {
  for (const house of await houseRepository.getAll()) {
    houseRepository.remove(house);
  }
});

testSkipIf(isToSkip)("Deve retornar uma casa a partir do id", async () => {
  const houseId = await houseRepository.nextId();
  const house = new House(
    houseId,
    "house name",
    "house region",
    "foundation date",
    { name: "lord A", seasons: ["season 1"] }
  );
  await houseRepository.save(house);
  const recoveredHouse = await houseRepository.getById(houseId);
  expect(recoveredHouse?.id).toBe(houseId);
});

testSkipIf(isToSkip)("Deve retornar uma casa a partir do nome", async () => {
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

testSkipIf(isToSkip)("Deve armazenar uma casa", async () => {
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

testSkipIf(isToSkip)("Deve remover uma casa", async () => {
  const houseId = await houseRepository.nextId();
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

testSkipIf(isToSkip)(
  "Deve retornar undefined caso não exista registro da casa",
  async () => {
    const unmatchedHouseId = await houseRepository.nextId();
    const unmatchedHouseName = "house name";
    expect(houseRepository.getById(unmatchedHouseId)).resolves.toBeUndefined();
    expect(
      houseRepository.getByName(unmatchedHouseName)
    ).resolves.toBeUndefined();
  }
);

testSkipIf(isToSkip)("Deve retornar todas as casas", async () => {
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

testSkipIf(isToSkip)("Deve atualizar uma casa", async () => {
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
