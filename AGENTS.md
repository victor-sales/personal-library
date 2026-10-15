# Personal Library

## Objetivo

Aplicação local de estudos para cadastrar livros e pessoas, emprestar e devolver livros e consultar empréstimos ativos.

## Contexto de estudo

Este projeto está sendo desenvolvido para acompanhar a leitura de *Arquitetura Limpa*, de Robert C. Martin (Uncle Bob).

No início do projeto, SOLID e Clean Architecture ainda não haviam sido estudados. Respeite o estágio de aprendizado informado pelo usuário: não aplique Clean Architecture nem antecipe padrões ou abstrações para necessidades futuras. Antes de implementar novas funcionalidades, proponha uma estrutura mínima e explique suas decisões.

## Prompt original

> Quero criar um projeto de estudos chamado Personal Library.
>
> Ele será utilizado durante minha leitura de Arquitetura Limpa.
>
> Requisitos iniciais:
>
> - cadastrar livros;
> - cadastrar pessoas;
> - listar livros;
> - emprestar livros;
> - devolver livros;
> - listar empréstimos ativos;
> - impedir empréstimo de livro indisponível.
>
> Quero uma implementação simples e pragmática.
>
> IMPORTANTE:
>
> Ainda não estudei SOLID nem Clean Architecture.
>
> Portanto:
> - não aplique Clean Architecture;
> - não antecipe padrões arquiteturais;
> - não crie abstrações pensando no futuro;
> - não use patterns desnecessariamente.
>
> Ajude-me a construir apenas a solução mais simples que atende aos requisitos atuais.
>
> Antes de implementar, proponha uma estrutura mínima e explique suas decisões.

## Tecnologias e comandos

- Next.js App Router, React, TypeScript, ESLint e Tailwind CSS.
- shadcn/ui para componentes de interface e SQLite com `better-sqlite3` para persistência local.
- `pnpm dev`: iniciar o servidor local.
- `pnpm lint`: executar o ESLint.
- `pnpm build`: gerar a versão de produção.

## Organização

- `app/`: página principal, layout e Server Actions.
- `components/`: seções da interface e componentes shadcn/ui.
- `lib/db.ts`: conexão e criação das tabelas SQLite.
- `data/library.db`: dados locais; não deve ser versionado.

## Diretrizes

- Mantenha a solução direta e limitada aos requisitos atuais.
- Não introduza Clean Architecture, camadas, patterns ou abstrações sem necessidade presente.
- Use Server Components para leitura e Server Actions para os formulários.
- Mantenha a interface em português e componentes distintos em arquivos separados.
- Use os componentes shadcn/ui existentes antes de criar controles de interface próprios.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
