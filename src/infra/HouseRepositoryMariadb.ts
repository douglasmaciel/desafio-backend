import mariadb from "mariadb";
import { House } from "../domain/House";
import { HouseRepository } from "../domain/repositories/HouseRepository";
import { HouseId } from "../domain/valueObjects/HouseId";

type dbDTO = {
  id: string;
  name: string;
  region: string;
  foundationDate: string;
  lord: { name: string; seasons: string[] };
};

export class HouseRepositoryMysql implements HouseRepository {
  #storage = new Array<[boolean, House]>();
  #pool: mariadb.Pool;

  constructor() {
    this.#pool = mariadb.createPool({
      host: "localhost",
      user: "root",
      password: "testpassword",
      database: "testdb",
      connectionLimit: 5,
    });
  }

  async nextId(): Promise<string> {
    let conn;
    try {
      conn = await this.#pool.getConnection();
      const { uuid } = (await conn.query("SELECT UUID() as uuid;"))[0];
      return new HouseId(uuid).value;
    } finally {
      if (conn) conn.release();
    }
  }

  async getAll(): Promise<House[]> {
    let conn;
    try {
      conn = await this.#pool.getConnection();
      const rows = await conn.query(
        "SELECT id, name, region, foundationDate, lord FROM houses WHERE available = TRUE;"
      );
      return rows.map(
        (item: dbDTO) =>
          new House(
            item.id,
            item.name,
            item.region,
            item.foundationDate,
            item.lord
          )
      );
    } finally {
      if (conn) conn.release();
    }
  }

  async getById(id: string): Promise<House | undefined> {
    let conn;
    try {
      conn = await this.#pool.getConnection();
      const rows = await conn.query(
        `SELECT id, name, region, foundationDate, lord FROM houses
           WHERE id = '${id}' AND available = TRUE;`
      );
      if (rows[0]) {
        const item = rows[0];
        return new House(
          item.id,
          item.name,
          item.region,
          item.foundationDate,
          item.lord
        );
      }
      return undefined;
    } finally {
      if (conn) conn.release();
    }
  }

  async getByName(name: string): Promise<House | undefined> {
    let conn;
    try {
      conn = await this.#pool.getConnection();
      const rows = await conn.query(
        `SELECT id, name, region, foundationDate, lord FROM houses
           WHERE name = '${name}' AND available = TRUE;`
      );
      if (rows[0]) {
        const item = rows[0];
        return new House(
          item.id,
          item.name,
          item.region,
          item.foundationDate,
          item.lord
        );
      }
      return undefined;
    } finally {
      if (conn) conn.release();
    }
  }

  async save(house: House): Promise<void> {
    let conn;
    try {
      conn = await this.#pool.getConnection();
      const lord = house.lord
        ? `'${JSON.stringify(house.lord.toOutDTO())}'`
        : "NULL";
      await conn.query(
        `INSERT INTO houses (id, name, region, foundationDate, lord, available)
           VALUES ('${house.id}',
            '${house.name}',
            '${house.region}',
            '${house.foundationDate}',
             ${lord},
            TRUE)
            ON DUPLICATE KEY
              UPDATE name = '${house.name}',
                     region = '${house.region}',
                     foundationDate = '${house.foundationDate}',
                     lord = ${lord},
                     available = TRUE;`
      );
    } finally {
      if (conn) conn.release();
    }
  }

  async remove(house: House): Promise<void> {
    let conn;
    try {
      conn = await this.#pool.getConnection();
      await conn.query(
        `UPDATE houses SET available = FALSE WHERE id = '${house.id}';`
      );
    } finally {
      if (conn) conn.release();
    }
  }
}
