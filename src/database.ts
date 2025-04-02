import fs from "node:fs/promises";
import { DatabaseQuery } from "./types/database.ts";

const DATABASE_PATH = new URL("database.json", import.meta.url);

interface Product {
  id?: string;
  name: string;
  price: number;
}

export class Database {
  #database: Product[] = [];

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

  create(product: Omit<Product, "id">): Product {
    const id = crypto.randomUUID();
    this.#database.push({ id, ...product });

    this.#persist();
    return { id, ...product };
  }

  update(id: string, product: Omit<Product, "id">): Product {
    this.#database = this.#database.map((p) =>
      p.id === id ? { id, ...product } : p
    );

    this.#persist();
    return { id, ...product };
  }

  delete(id: string): { id: string } {
    this.#database = this.#database.filter((p) => p.id !== id);

    this.#persist();
    return { id };
  }

  list(query?: DatabaseQuery): Product[] {
    if (query?.name || query?.price) {
      return this.#database.filter(
        (p) => p.name === query.name || p.price === Number(query.price)
      );
    }

    return this.#database;
  }
}
