import { createBook } from "@/app/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import type { Book } from "@/lib/db";
import { BookOpen, Plus } from "lucide-react";

export function BookSection({ books }: { books: Book[] }) {
  return (
    <Card className="h-full border-border/80 shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <BookOpen aria-hidden="true" className="size-5" />
          </div>
          <div className="space-y-1">
            <CardTitle>Livros</CardTitle>
            <CardDescription>Cadastre títulos e veja o que está disponível.</CardDescription>
          </div>
        </div>
        <Badge variant="outline">{books.length}</Badge>
      </CardHeader>

      <CardContent className="space-y-6">
        <form action={createBook} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="grid gap-2">
            <Label htmlFor="book-title">Título do livro</Label>
            <Input
              autoComplete="off"
              id="book-title"
              maxLength={160}
              name="title"
              placeholder="Ex.: O nome do livro"
              required
            />
          </div>
          <Button className="gap-2" type="submit">
            <Plus aria-hidden="true" className="size-4" />
            Adicionar
          </Button>
        </form>

        {books.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-0">Título</TableHead>
                <TableHead className="pr-0 text-right">Disponibilidade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {books.map((book) => (
                <TableRow key={book.id}>
                  <TableCell className="pl-0 font-medium">{book.title}</TableCell>
                  <TableCell className="pr-0 text-right">
                    <Badge variant={book.available ? "secondary" : "destructive"}>
                      {book.available ? "Disponível" : "Emprestado"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="rounded-xl border border-dashed px-4 py-8 text-center">
            <p className="text-sm font-medium">Sua estante começa aqui</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Cadastre seu primeiro livro para começar.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
