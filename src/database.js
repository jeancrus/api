export class Database {
  #database = [];

  constructor() {
    this.#database = [];
  }

  create(product) {
    const id = crypto.randomUUID();
    this.#database.push({ id, ...product });
    return { id, ...product };
  }

  update(id, product) {
    this.#database = this.#database.map((p) =>
      p.id === id ? { id, ...product } : p
    );
    return { id, ...product };
  }

  delete(id) {
    this.#database = this.#database.filter((p) => p.id !== id);
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
