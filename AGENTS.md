# Working on this app

A Protobase app: each resource's data config in `config/<name>/data.ts` and its screens in `config/<name>/ui.ts`, all
exported from `config/index.ts`, over a Postgres database. Reference: https://docs.protobase.net.

## Database changes

- Every schema change is a new migration file in `db/migrations/`, numbered after the last one (`007_viewings.sql`).
  Never edit or remove a migration that exists: it has already run on the live database.
- Expand only, where possible: add tables, columns and indexes, and keep what the running app still reads. Rename or
  drop only when asked to, once nothing uses it.
- A new table gets `organization_id integer not null references core.organizations (id)`, like the others; everyone
  works in organization 1 (`auth/auth.ts`).

## Never touch

- `auth/` and the `auth` schema: sign-in and accounts.
- `.github/workflows/`.

## Scripts

The platform runs `db:migrate` (the auth schema's migrations included), `typecheck` and `test`, with their settings in
the environment: keep them working. Run `typecheck` and `test` before you finish, and after a change to the config or
the migrations `bun run protobase doctor`, which checks the config against the migrated database: a filter or sort
that no index serves fails there before it fails on Protobase Cloud. `db:seed:base` loads the amenities and
organization 1, and `db:seed` the sample data, replacing everything in the app's tables.
