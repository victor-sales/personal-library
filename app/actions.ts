"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function createBook(formData: FormData) {
  const title = formData.get("title");

  if (typeof title !== "string" || !title.trim()) {
    redirect("/?erro=dados");
  }

  db.prepare("INSERT INTO books (title) VALUES (?)").run(title.trim());
  redirect("/");
}

export async function createPerson(formData: FormData) {
  const name = formData.get("name");

  if (typeof name !== "string" || !name.trim()) {
    redirect("/?erro=dados");
  }

  db.prepare("INSERT INTO people (name) VALUES (?)").run(name.trim());
  redirect("/");
}

export async function borrowBook(formData: FormData) {
  const bookId = Number(formData.get("bookId"));
  const personId = Number(formData.get("personId"));

  if (!Number.isSafeInteger(bookId) || !Number.isSafeInteger(personId)) {
    redirect("/?erro=dados");
  }

  const selectedRecordsExist = db
    .prepare("SELECT 1 FROM books, people WHERE books.id = ? AND people.id = ?")
    .get(bookId, personId);

  if (!selectedRecordsExist) {
    redirect("/?erro=dados");
  }

  const result = db
    .prepare("INSERT OR IGNORE INTO active_loans (book_id, person_id) VALUES (?, ?)")
    .run(bookId, personId);

  if (result.changes === 0) {
    redirect("/?erro=indisponivel");
  }

  redirect("/");
}

export async function returnBook(formData: FormData) {
  const bookId = Number(formData.get("bookId"));

  if (!Number.isSafeInteger(bookId)) {
    redirect("/?erro=dados");
  }

  db.prepare("DELETE FROM active_loans WHERE book_id = ?").run(bookId);
  redirect("/");
}
