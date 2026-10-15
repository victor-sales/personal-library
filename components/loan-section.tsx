import { borrowBook, returnBook } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { ActiveLoan, Book, Person } from "@/lib/db";
import { ArrowLeftRight, RotateCcw } from "lucide-react";

type LoanSectionProps = {
  books: Book[];
  people: Person[];
  loans: ActiveLoan[];
};

export function LoanSection({ books, people, loans }: LoanSectionProps) {
  const bookOptions = books.map((book) => ({
    value: String(book.id),
    label: `${book.title} — ${book.available ? "Disponível" : "Emprestado"}`,
  }));
  const personOptions = people.map((person) => ({
    value: String(person.id),
    label: person.name,
  }));
  const canBorrow = books.length > 0 && people.length > 0;

  return (
    <Card className="border-border/80 shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <ArrowLeftRight aria-hidden="true" className="size-5" />
          </div>
          <div className="space-y-1">
            <CardTitle>Empréstimos ativos</CardTitle>
            <CardDescription>Registre uma saída ou confirme uma devolução.</CardDescription>
          </div>
        </div>
        <Badge variant="outline">
          {loans.length} {loans.length === 1 ? "ativo" : "ativos"}
        </Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        <form
          action={borrowBook}
          className="grid gap-4 rounded-xl bg-muted/60 p-4 md:grid-cols-[1fr_1fr_auto] md:items-end"
        >
          <div className="grid gap-2">
            <Label htmlFor="loan-book">Livro</Label>
            <Select
              disabled={books.length === 0}
              items={bookOptions}
              name="bookId"
              required
            >
              <SelectTrigger className="w-full bg-card" id="loan-book">
                <SelectValue placeholder="Selecione um livro" />
              </SelectTrigger>
              <SelectContent align="start">
                {books.map((book) => (
                  <SelectItem key={book.id} value={String(book.id)}>
                    {book.title} — {book.available ? "Disponível" : "Emprestado"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="loan-person">Pessoa</Label>
            <Select
              disabled={people.length === 0}
              items={personOptions}
              name="personId"
              required
            >
              <SelectTrigger className="w-full bg-card" id="loan-person">
                <SelectValue placeholder="Selecione uma pessoa" />
              </SelectTrigger>
              <SelectContent align="start">
                {people.map((person) => (
                  <SelectItem key={person.id} value={String(person.id)}>
                    {person.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button className="gap-2" disabled={!canBorrow} type="submit">
            <ArrowLeftRight aria-hidden="true" className="size-4" />
            Emprestar livro
          </Button>
        </form>

        {!canBorrow && (
          <p className="text-sm text-muted-foreground">
            Cadastre pelo menos um livro e uma pessoa para liberar empréstimos.
          </p>
        )}

        {loans.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-0">Livro</TableHead>
                <TableHead>Pessoa</TableHead>
                <TableHead className="pr-0 text-right">Ação</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loans.map((loan) => (
                <TableRow key={loan.bookId}>
                  <TableCell className="pl-0 font-medium">{loan.bookTitle}</TableCell>
                  <TableCell>{loan.personName}</TableCell>
                  <TableCell className="pr-0 text-right">
                    <form action={returnBook}>
                      <input name="bookId" type="hidden" value={loan.bookId} />
                      <Button className="gap-2" size="sm" type="submit" variant="outline">
                        <RotateCcw aria-hidden="true" className="size-3.5" />
                        Devolver
                      </Button>
                    </form>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="rounded-xl border border-dashed px-4 py-8 text-center">
            <p className="text-sm font-medium">Nenhum empréstimo ativo</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Os novos empréstimos aparecerão nesta lista.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
