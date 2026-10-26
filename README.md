# Property management

Rental and property management: owners, properties, units, leases, tenants, rent, payments, arrears and
maintenance, for homes in any country. 19 resources and 4 roles, and a portfolio overview page. Tenants' IBANs are
revealed one at a time, with an audit record, and overlapping leases are refused by a database constraint.

The seed holds made-up homes, tenants, owners and vendors in 28 cities of 22 countries, from London, Berlin and New York
to Dubai, Tel Aviv, Mumbai, Bangkok, Tokyo, Seoul, Lagos and Nairobi. Names, streets and buildings are written in their
own scripts (Latin with diacritics, Greek, Cyrillic, Arabic and Hebrew right to left, Han, kana, Hangul, Devanagari and
Thai), tickets carry the tenant's own words and the odd emoji, and phone numbers, postal codes, IBANs, payment methods
and rents in 17 currencies follow each country. It holds three years of history, from a small set up to 10,000
properties, 107,000 units and 3.57 million rent charges. E-mail addresses use the domains reserved for examples, and
phone numbers the ranges set aside for fiction where a country has them.

For a public portal of homes for sale and for rent, see
[property-portal](https://github.com/protobase-community/property-portal).

## Run it locally

You need [Bun](https://bun.sh) 1.4 and Docker.

```sh
bun install
bun run db:up                     # Postgres 18 in Docker on port 55434; creates .env from .env.example
bun run db:migrate
bun run db:seed --scale small     # small | medium | large
bun run protobase users create you@example.com --role admin --generate-password
bun run dev                       # http://localhost:5173
bun run test
```

Set your own `PROTOBASE_SECRET` in `.env` (`openssl rand -base64 32`). `bun run db:down` stops the database.

## Use it as a template

Press **Use this template** at the top of this page, then **Create a new repository**, to get your own copy with a
clean history. Clone it and run it as above:

```sh
git clone https://github.com/<you>/<your-repository>.git
cd <your-repository>
```

You can also fork it to contribute back, or start from it with `git clone https://github.com/protobase-community/property-management.git`.

To put your copy online, open the [Protobase Cloud console](https://admin.protobase.net), press **New app** and pick
**An existing GitHub repository**: every push to its default branch then deploys, once `db:migrate` and
`protobase doctor` pass.

## Customise it

- **Tables and screens.** Each table's data config is in `config/<name>/data.ts` (fields, validation, who may read
  and change what) and its screens in `config/<name>/ui.ts` (lists, filters, record pages), all exported from
  `config/index.ts`. See the [data config](https://docs.protobase.net/reference/data-config/) and [UI config](https://docs.protobase.net/reference/ui-config/)
  references.
- **Database changes.** Add a migration in `db/migrations/`, numbered after the last one, and run
  `bun run db:migrate`. Never edit a migration that has run. For a new table, `bun run protobase scaffold
  <connection string> --ui` reads the database and writes its `data.ts` and `ui.ts`, which you then adjust.
- **Sign-in and accounts** are in `auth/`, on Better Auth ([Login](https://docs.protobase.net/reference/auth/)).
- **Coding agents.** [AGENTS.md](AGENTS.md) holds the rules an assistant follows when it changes the app, and
  `bun run protobase skill install` gives it Protobase's own skills for the version in `package.json`.
- Check every change with `bun run typecheck`, `bun run test` and `bun run build`, and with
  `bun run protobase doctor` once the database is migrated: it finds a filter or sort no index serves. CI runs all four.

- **Roles.** The 4 roles and what each may do are in `config/roles.ts` ([Roles](#roles),
  [Access](https://docs.protobase.net/reference/access/)). The tenant's IBAN is a
  [sensitive field](https://docs.protobase.net/reference/data-config/#sensitive-fields).
- **The overview page** (occupancy, arrears, open tickets) is in `config/overview/`.

## Built with Protobase

[Protobase](https://github.com/PrototeamHQ/protobase) builds the app from a Postgres database and a typed config: each table's data config sits in
`config/<name>/data.ts` and its screens in `config/<name>/ui.ts`, all exported from `config/index.ts`, and
`protobase dev` and `protobase serve` serve the API and the app from them.

- Tested with Protobase **0.49.2**: the `@protobase/*` packages are pinned to it in `package.json`, and CI runs
  against it. To upgrade, set the new version on each `@protobase/*` package, run `bun install`, then
  `bun run typecheck`, `bun run test` and `bun run build`. The [release notes](https://github.com/PrototeamHQ/protobase/releases) say what changed.
- Docs: [docs.protobase.net](https://docs.protobase.net). Source and issues: [PrototeamHQ/protobase](https://github.com/PrototeamHQ/protobase).
- This app started as an example in Protobase's repository; its history came with it.
- The same app is the `real-estate` preset that new Protobase apps can start from ([`@protobase/presets`](https://github.com/PrototeamHQ/protobase/tree/main/packages/presets)).

## Database

Other scripts: `db:seed:base` (the amenities and organization 1, named with `--name`: what an app made from the real estate preset starts with), `db:reset` (drop, migrate, seed small), `typecheck`. `bun run db:down` stops the container; the `pgdata` volume stays, remove it with `docker compose down -v`. The database tests run in [Protobase's repository](https://github.com/PrototeamHQ/protobase) (`bun run test:integration`).

Connection string:

```
postgres://protobase:protobase@localhost:55434/real_estate
```

Scripts read `DATABASE_URL` and fall back to the string above. `protobase dev` and `serve` read the git-ignored `.env` next to `package.json`, a copy of `.env.example`.

## Tables

| Schema | Tables |
| --- | --- |
| `core` | `organizations`, `users` (role `admin`, `manager`, `finance` or `maintenance`) |
| `portfolio` | `owners`, `properties` (`latitude` and `longitude`, `country` and `currency` columns), `units`, `amenities` (key: code), `unit_amenities` (join table), `valuations` (the yearly value assessed for property tax, the WOZ value in the Netherlands, and the odd appraisal) |
| `leasing` | `tenants`, `leases` (no two overlap on a unit: a `btree_gist` exclusion constraint on the unit and `daterange(start_date, end_date)`), `lease_tenants` (primary tenant and co-signers), `deposits` |
| `billing` | `rent_charges` (one per lease and month), `payments`, `arrears` (a view: outstanding balance per lease) |
| `maintenance` | `vendors`, `tickets` (enum `ticket_status`), `work_orders`, `inspections` |

Every table has `organization_id` except `amenities` and `organizations` itself. The seed creates two organizations (70/30 split of the volumes) so tenant isolation can be tested.

Postgres keeps these rules itself, whoever writes:

- A lease that overlaps another on the same unit is refused (`23P01`). `end_date` is the last day of the tenancy, null while an indefinite lease runs.
- `rent_charges.paid_amount` is the sum of the charge's payments, kept by statement triggers on `payments`; a check on it refuses payments that add up to more than the charge.
- `rent_charges.outstanding` is generated (`amount - paid_amount`, stored), so it follows `paid_amount` however that is written and can be filtered, sorted and indexed like any column.
- A ticket's status only moves forward: `reported` to `scheduled` or `cancelled`, `scheduled` to `done` or `cancelled`. Closing it stamps `closed_at`.
- `billing.arrears` reads only the open charges, through a partial index, so it stays quick however much history there is.
- A property's `currency` is the one its money is in: a unit, valuation, lease, deposit, rent charge and payment takes the currency of the record it belongs to when it is written, and a work order its vendor's, so amounts in different currencies are never added up. Postal codes are optional, for countries without them, and so are IBANs and energy labels.

Seed consistency: no overlapping leases, payments never exceed their charge, every charge's `outstanding` is its amount minus its payments, the arrears view equals charges minus payments per lease, a unit is `let` exactly when a lease covers the last day, and every lease has one primary tenant and one deposit. Rents rise once a year on the lease's anniversary; about one lease in four pays late, some in parts, and a few stop paying.

## Scales

| Scale | Properties | Units | Leases | Rent charges | Payments | Tickets | Seed time (Apple silicon, local Docker) |
| --- | --- | --- | --- | --- | --- | --- | --- |
| small | 60 | 648 | 1,050 | 20,000 | 20,000 | 778 | about 1 s |
| medium | 2,000 | 21,800 | 35,600 | 724,000 | 728,000 | 26,000 | about 26 s (400 MB) |
| large | 10,000 | 107,000 | 175,000 | 3,570,000 | 3,590,000 | 129,000 | not timed since foreign keys are checked (1.7 GB) |

`db:seed` truncates everything first, so it can be re-run or used to switch scale. Like the ERP's, the loader streams `COPY`, drops secondary indexes during the load and rebuilds them afterwards, switches the tables' own triggers off (so it writes `paid_amount` itself), then resets identity sequences and runs `ANALYZE`. Foreign keys are checked throughout: the role an app gets may not skip them. The scale last seeded is recorded in `public.seed_info`.

## Layout

- `db/migrations/NNN_name.sql`: plain SQL, applied in order and recorded in `public.schema_migrations` by `db/migrate.ts`. The database itself comes from its host: `bun run db:up` here.
- `seed/`: `world.ts` allocates ids per organization, `builders/` rebuild a property, unit, lease, rent ledger or ticket from its ordinal alone, `steps/` stream one module each. `base.ts` is the base seed.
- `AGENTS.md`: the rules for the assistant that changes an app made from this example, which is also the real estate preset ([`packages/presets`](https://github.com/PrototeamHQ/protobase/tree/main/packages/presets); the preset leaves this README out).
- `config/`: one folder per table (`data.ts`, `ui.ts`), the roles, and the overview page (occupancy, arrears, open tickets).
- `tests/examples/real-estate/` in [Protobase's repository](https://github.com/PrototeamHQ/protobase): `smoke.test.ts` checks counts and the consistency rules, `rules.integration.test.ts` that Postgres refuses an overlapping lease, an overpayment and a backward ticket step, `access.integration.test.ts` what each role and organization sees, who may reveal an IBAN and the record pages' related records, `server.integration.test.ts` builds and serves the example and loads its pages.

## Roles

| Role | Works on |
| --- | --- |
| `admin` | everything |
| `manager` | the portfolio, tenants and leases, tickets and inspections; reads rent, payments and arrears |
| `finance` | rent charges, payments, deposits and valuations; reads leases, tenants and the portfolio |
| `maintenance` | tickets (changes only those assigned to them), work orders, inspections and vendors; reads properties, units and tenants, without their income and IBAN |

A tenant's IBAN is a [sensitive field](https://docs.protobase.net/reference/data-config/#sensitive-fields): no list or record carries it, and managers and finance reveal it one tenant at a time with the eye button on the record page. Every reveal publishes an audit event; this example keeps the default queue, which prints it on the server console as an `[audit]` line. A tenant's page lists the homes they rent through their leases, current leases first, and a unit's page who it is let to (the primary tenant and co-signers) and the running lease, or that it is vacant ([related records](https://docs.protobase.net/reference/ui-config/#related-records)).

## Login

`bun run db:migrate` also creates Better Auth's tables in the `auth` schema of the real estate database (`db/migrations/007_auth.sql`); `bun run dev` (http://localhost:5173) or `serve` then needs `PROTOBASE_SECRET` in `.env`. Create the first admin with `bun run protobase users create you@example.com --role admin --generate-password`. A new user takes the next id of `core.users` (`generateUserId` in `auth/hooks.ts`), which tickets name as their assignee, and gets their row there in organization 1 (`db/migrations/013_auth_users.sql`), without a `role`, since their roles live in the auth schema. See [Login with Better Auth](https://docs.protobase.net/reference/auth/).

## Serve and deploy

```sh
bun run serve    # protobase build, then protobase serve dist on port 8787 (PORT)
```

Set `PORT` in `.env` for another port. Deploying works as for the ERP; see [its README](https://github.com/protobase-community/erp#serve-and-deploy) and the [CLI reference](https://docs.protobase.net/reference/cli/#build).

## Contributing

Contributions are welcome, from a typo to a new screen: see [CONTRIBUTING.md](CONTRIBUTING.md). A problem in Protobase
itself goes to [Protobase's issues](https://github.com/PrototeamHQ/protobase/issues).

## Licence

[Apache License 2.0](LICENSE).
