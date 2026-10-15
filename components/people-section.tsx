import { createPerson } from "@/app/actions";
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
import type { Person } from "@/lib/db";
import { Plus, Users } from "lucide-react";

export function PeopleSection({ people }: { people: Person[] }) {
  return (
    <Card className="h-full border-border/80 shadow-sm">
      <CardHeader className="flex-row items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-secondary-foreground">
            <Users aria-hidden="true" className="size-5" />
          </div>
          <div className="space-y-1">
            <CardTitle>Pessoas</CardTitle>
            <CardDescription>Quem pode levar um livro emprestado?</CardDescription>
          </div>
        </div>
        <span className="rounded-full border px-2.5 py-1 text-xs font-medium text-muted-foreground">
          {people.length}
        </span>
      </CardHeader>

      <CardContent className="space-y-6">
        <form action={createPerson} className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-end">
          <div className="grid gap-2">
            <Label htmlFor="person-name">Nome da pessoa</Label>
            <Input
              autoComplete="off"
              id="person-name"
              maxLength={120}
              name="name"
              placeholder="Ex.: Ana Silva"
              required
            />
          </div>
          <Button className="gap-2" type="submit">
            <Plus aria-hidden="true" className="size-4" />
            Adicionar
          </Button>
        </form>

        {people.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="pl-0">Nome</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {people.map((person) => (
                <TableRow key={person.id}>
                  <TableCell className="pl-0 font-medium">{person.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <div className="rounded-xl border border-dashed px-4 py-8 text-center">
            <p className="text-sm font-medium">Adicione leitores</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Cadastre pessoas antes de registrar um empréstimo.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
