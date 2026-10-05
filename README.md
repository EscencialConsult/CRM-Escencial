# Escencial CRM

CRM built with React, shadcn-admin-kit and Supabase: contacts, companies, deals (Kanban), tasks and notes.

## Run

```bash
npm install
npm run dev:demo   # demo mode, fake data in the browser (http://localhost:5174)
make start         # full stack: local Supabase (needs Docker) + Vite (http://localhost:5173)
make stop          # stop local Supabase
```

## Checks

```bash
make test
make typecheck
make lint
```
