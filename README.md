# Personal Library

Aplicação local para cadastrar livros e pessoas, controlar empréstimos ativos e registrar devoluções.

## Requisitos

- Node.js 22 ou superior
- pnpm 10

## Executar

```bash
pnpm install
pnpm dev
```

Abra [http://localhost:3000](http://localhost:3000).

Use `pnpm lint` para verificar o código e `pnpm build` para gerar a versão de produção.

O banco SQLite é criado automaticamente em `data/library.db` na primeira execução. Esse arquivo permanece local e não é enviado ao Git.
