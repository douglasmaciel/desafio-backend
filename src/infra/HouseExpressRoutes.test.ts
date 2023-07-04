import "dotenv/config";

const port = process.env.PORT || 3005;
const baseURL = `http://localhost:${port}`;
const isToSkip = process.env.E2E === undefined;
const testSkipIf = (condition: boolean) => (condition ? test.skip : test);

let headers: Headers;
beforeEach(() => {
  headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json; charset=UTF-8",
  });
});

testSkipIf(isToSkip)(
  "[GET /api/houses] Deve retornar uma lista de casas ou uma lista vazia",
  async () => {
    const res = await fetch(`${baseURL}/api/houses`, {
      method: "GET",
      headers: headers,
    });
    const payload = await res.json();
    expect(Array.isArray(payload.data)).toBe(true);
  }
);

testSkipIf(isToSkip)(
  "[GET /api/houses/:id] Deve cadastrar uma casa e buscar pelo id",
  async () => {
    const body = JSON.stringify({
      name: "house name",
      region: "house region",
      foundationDate: "house foundation",
      lord: {
        name: "lord of house",
        seasons: ["season 1"],
      },
    });
    const res = await fetch(`${baseURL}/api/houses`, {
      method: "POST",
      body: body,
      headers: headers,
    });
    const payload = await res.json();
    const { id } = payload.data;
    const { name, region, foundationDate, currentLord } =
      payload.data.attributes;
    expect(id).toBeDefined();
    expect(name).toBe("house name");
    expect(region).toBe("house region");
    expect(foundationDate).toBe("house foundation");
    expect(currentLord.name).toBe("lord of house");
    expect(currentLord.seasons).toEqual(["season 1"]);
    const getRes = await fetch(`${baseURL}/api/houses/${id}`, {
      method: "GET",
      headers: headers,
    });
    const getPayload = await getRes.json();
    const { id: getId } = getPayload.data;
    const {
      name: getName,
      region: getRegion,
      foundationDate: getFoundationDate,
      currentLord: getCurrentLord,
    } = getPayload.data.attributes;
    expect(getId).toBeDefined();
    expect(getName).toBe("house name");
    expect(getRegion).toBe("house region");
    expect(getFoundationDate).toBe("house foundation");
    expect(getCurrentLord.name).toBe("lord of house");
    expect(getCurrentLord.seasons).toEqual(["season 1"]);
  }
);

testSkipIf(isToSkip)(
  "[GET /api/houses/query?name=] Deve cadastrar uma casa e buscar pelo nome",
  async () => {
    const body = JSON.stringify({
      name: "house name",
      region: "house region",
      foundationDate: "house foundation",
      lord: {
        name: "lord of house",
        seasons: ["season 1"],
      },
    });
    const res = await fetch(`${baseURL}/api/houses`, {
      method: "POST",
      body: body,
      headers: headers,
    });
    const payload = await res.json();
    const { id } = payload.data;
    const { name, region, foundationDate, currentLord } =
      payload.data.attributes;
    expect(id).toBeDefined();
    expect(name).toBe("house name");
    expect(region).toBe("house region");
    expect(foundationDate).toBe("house foundation");
    expect(currentLord.name).toBe("lord of house");
    expect(currentLord.seasons).toEqual(["season 1"]);
    const getRes = await fetch(`${baseURL}/api/houses/query?name=${name}`, {
      method: "GET",
      headers: headers,
    });
    const getPayload = await getRes.json();
    const { id: getId } = getPayload.data;
    const {
      name: getName,
      region: getRegion,
      foundationDate: getFoundationDate,
      currentLord: getCurrentLord,
    } = getPayload.data.attributes;
    expect(getId).toBeDefined();
    expect(getName).toBe("house name");
    expect(getRegion).toBe("house region");
    expect(getFoundationDate).toBe("house foundation");
    expect(getCurrentLord.name).toBe("lord of house");
    expect(getCurrentLord.seasons).toEqual(["season 1"]);
  }
);

testSkipIf(isToSkip)(
  "[POST /api/houses] Deve cadastrar uma casa e retornar o que foi cadastrado",
  async () => {
    const body = JSON.stringify({
      name: "house name",
      region: "house region",
      foundationDate: "house foundation",
      lord: {
        name: "lord of house",
        seasons: ["season 1"],
      },
    });
    const res = await fetch(`${baseURL}/api/houses`, {
      method: "POST",
      body: body,
      headers: headers,
    });
    const payload = await res.json();
    const { id } = payload.data;
    const { name, region, foundationDate, currentLord } =
      payload.data.attributes;
    expect(id).toBeDefined();
    expect(name).toBe("house name");
    expect(region).toBe("house region");
    expect(foundationDate).toBe("house foundation");
    expect(currentLord.name).toBe("lord of house");
    expect(currentLord.seasons).toEqual(["season 1"]);
  }
);

testSkipIf(isToSkip)(
  "[PUT /api/houses/:id] Deve cadastrar e, depois, atualizar o nome de uma casa e retornar o que foi cadastrado",
  async () => {
    const body = JSON.stringify({
      name: "house name",
      region: "house region",
      foundationDate: "house foundation",
      lord: {
        name: "lord of house",
        seasons: ["season 1"],
      },
    });
    const res = await fetch(`${baseURL}/api/houses`, {
      method: "POST",
      body: body,
      headers: headers,
    });
    const payload = await res.json();
    const { id } = payload.data;
    const { name, region, foundationDate, currentLord } =
      payload.data.attributes;
    expect(id).toBeDefined();
    expect(name).toBe("house name");
    expect(region).toBe("house region");
    expect(foundationDate).toBe("house foundation");
    expect(currentLord.name).toBe("lord of house");
    expect(currentLord.seasons).toEqual(["season 1"]);
    const putBody = JSON.stringify({
      name: "new name",
    });
    const putRes = await fetch(`${baseURL}/api/houses/${id}`, {
      method: "PUT",
      body: putBody,
      headers: headers,
    });
    const putPayload = await putRes.json();
    const { id: putId } = putPayload.data;
    const {
      name: putName,
      region: putRegion,
      foundationDate: putFoundationDate,
      currentLord: putCurrentLord,
    } = putPayload.data.attributes;
    expect(putId).toBeDefined();
    expect(putName).toBe("new name");
    expect(putRegion).toBe("house region");
    expect(putFoundationDate).toBe("house foundation");
    expect(putCurrentLord.name).toBe("lord of house");
    expect(putCurrentLord.seasons).toEqual(["season 1"]);
  }
);

testSkipIf(isToSkip)(
  "[DELETE /api/houses/:id] Deve cadastrar e, depois, remover uma casa e retornar o que foi removido",
  async () => {
    const body = JSON.stringify({
      name: "house name",
      region: "house region",
      foundationDate: "house foundation",
      lord: {
        name: "lord of house",
        seasons: ["season 1"],
      },
    });
    const res = await fetch(`${baseURL}/api/houses`, {
      method: "POST",
      body: body,
      headers: headers,
    });
    const payload = await res.json();
    const { id } = payload.data;
    const { name, region, foundationDate, currentLord } =
      payload.data.attributes;
    expect(id).toBeDefined();
    expect(name).toBe("house name");
    expect(region).toBe("house region");
    expect(foundationDate).toBe("house foundation");
    expect(currentLord.name).toBe("lord of house");
    expect(currentLord.seasons).toEqual(["season 1"]);
    const delRes = await fetch(`${baseURL}/api/houses/${id}`, {
      method: "DELETE",
      headers: headers,
    });
    const delPayload = await delRes.json();
    const { id: delId } = delPayload.data;
    expect(delId).toBe(id);
  }
);
