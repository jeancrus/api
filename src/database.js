import fs from "node:fs/promises";

const DATABASE_PATH = new URL("database.json", import.meta.url);

export class Database {
  #database = [];

  constructor() {
    fs.readFile(DATABASE_PATH, "utf8")
      .then((content) => {
        this.#database = JSON.parse(content);
      })
      .catch(() => this.#persist());
  }

  #persist() {
    fs.writeFile(DATABASE_PATH, JSON.stringify(this.#database));
  }

  create(product) {
    const id = crypto.randomUUID();
    this.#database.push({ id, ...product });

    this.#persist();
    return { id, ...product };
  }

  update(id, product) {
    this.#database = this.#database.map((p) =>
      p.id === id ? { id, ...product } : p
    );

    this.#persist();
    return { id, ...product };
  }

  delete(id) {
    this.#database = this.#database.filter((p) => p.id !== id);

    this.#persist();
    return { id };
  }

  list(query) {
    if (query.name || query.price) {
      return this.#database.filter(
        (p) => p.name === query.name || p.price === query.price
      );
    }

    return this.#database;
  }
}
