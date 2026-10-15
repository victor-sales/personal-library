import { BookSection } from "@/components/book-section";
import { LoanSection } from "@/components/loan-section";
import { PeopleSection } from "@/components/people-section";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import db, { type ActiveLoan, type Book, type Person } from "@/lib/db";
import { BookOpen, CircleAlert, Sparkles } from "lucide-react";

export const runtime = "nodejs";

type HomeProps = {
  searchParams: Promise<{ erro?: string }>;
};

export default async function Home({ searchParams }: HomeProps) {
  const { erro } = await searchParams;

  const books = db
    .prepare(`
      SELECT
        books.id,
        books.title,
        CASE WHEN active_loans.book_id IS NULL THEN 1 ELSE 0 END AS available
      FROM books
      LEFT JOIN active_loans ON active_loans.book_id = books.id
      ORDER BY books.title COLLATE NOCASE
    `)
    .all() as Book[];

  const people = db
    .prepare("SELECT id, name FROM people ORDER BY name COLLATE NOCASE")
    .all() as Person[];

  const loans = db
    .prepare(`
      SELECT
        active_loans.book_id AS bookId,
        books.title AS bookTitle,
        people.name AS personName
      FROM active_loans
      JOIN books ON books.id = active_loans.book_id
      JOIN people ON people.id = active_loans.person_id
      ORDER BY books.title COLLATE NOCASE
    `)
    .all() as ActiveLoan[];

  const errorMessage =
    erro === "indisponivel"
      ? "Este livro já está emprestado. Devolva-o antes de emprestá-lo novamente."
      : erro === "dados"
        ? "Confira os dados informados e tente novamente."
        : null;

  return (
    <div className="min-h-svh bg-background">
      <header className="border-b bg-card">
        <div className="mx-auto flex max-w-7xl items-center gap-3 px-4 py-4 sm:px-6">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <BookOpen aria-hidden="true" className="size-5" />
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Personal Library
            </p>
            <p className="text-sm font-medium">Biblioteca pessoal</p>
          </div>
          <Badge className="ml-auto gap-1.5" variant="outline">
            <Sparkles aria-hidden="true" className="size-3.5" />
            Projeto de estudos
          </Badge>
        </div>
      </header>

      <main className="mx-auto grid max-w-7xl gap-7 px-4 py-8 sm:px-6 sm:py-10">
        <section className="max-w-2xl space-y-3">
          <p className="text-sm font-semibold text-primary">Seu acervo</p>
          <h1 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl">
            Livros que circulam. Ideias que ficam.
          </h1>
          <p className="max-w-xl text-base leading-7 text-muted-foreground">
            Cadastre seus livros e leitores, acompanhe os empréstimos ativos e
            registre cada devolução.
          </p>
        </section>

        {errorMessage && (
          <Alert className="border-destructive/30" variant="destructive">
            <CircleAlert aria-hidden="true" />
            <AlertTitle>Empréstimo não realizado</AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <BookSection books={books} />
          <PeopleSection people={people} />
        </div>

        <LoanSection books={books} loans={loans} people={people} />
      </main>

      <footer className="mx-auto max-w-7xl px-4 pb-8 text-xs text-muted-foreground sm:px-6">
        Os empréstimos ativos ficam salvos no banco SQLite local.
      </footer>
    </div>
  );
}
