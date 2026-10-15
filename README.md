# Personal Library

Aplicação local para cadastrar livros e pessoas, controlar empréstimos ativos e registrar devoluções.

## Contexto de estudo

Projeto desenvolvido para acompanhar a leitura de *Arquitetura Limpa*, de Robert C. Martin (Uncle Bob).

A implementação inicial é simples e pragmática: SOLID e Clean Architecture ainda não haviam sido estudados. A evolução deve acompanhar o aprendizado, sem antecipar padrões arquiteturais ou criar abstrações para necessidades futuras.

O prompt original e as orientações para o desenvolvimento estão em [AGENTS.md](AGENTS.md).

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
