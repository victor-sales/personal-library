# Personal Library

## Objetivo

Aplicação local de estudos para cadastrar livros e pessoas, emprestar e devolver livros e consultar empréstimos ativos.

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
