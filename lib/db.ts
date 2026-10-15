import Database from "better-sqlite3";
import { mkdirSync } from "node:fs";
import path from "node:path";

const dataDirectory = path.join(process.cwd(), "data");
mkdirSync(dataDirectory, { recursive: true });

const db = new Database(path.join(dataDirectory, "library.db"));

db.pragma("foreign_keys = ON");
db.exec(`
  CREATE TABLE IF NOT EXISTS books (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS people (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS active_loans (
    book_id INTEGER PRIMARY KEY,
    person_id INTEGER NOT NULL,
    FOREIGN KEY (book_id) REFERENCES books(id),
    FOREIGN KEY (person_id) REFERENCES people(id)
  );
`);

export type Book = {
  id: number;
  title: string;
  available: number;
};

export type Person = {
  id: number;
  name: string;
};

export type ActiveLoan = {
  bookId: number;
  bookTitle: string;
  personName: string;
};

export default db;
