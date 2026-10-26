-- Homes in any country: each property names its country and the currency its rent is in, and the records that hang off
-- it take that currency over. The rows already there are Dutch, in euros, which the defaults give them; new rows
-- name their own.
alter table portfolio.properties
  add column country text not null default 'NL' check (country ~ '^[A-Z]{2}$'),
  add column currency text not null default 'EUR' check (currency ~ '^[A-Z]{3}$');
alter table portfolio.properties alter column country drop default, alter column currency drop default;

-- A postal code as the country writes it (SW1A 2AA, 160-0023, D02 X285, 01310-200), and none where the country has
-- none, such as the United Arab Emirates.
alter table portfolio.properties drop constraint properties_postal_code_check;
alter table portfolio.properties alter column postal_code drop not null;
alter table portfolio.properties add constraint properties_postal_code_check check (postal_code ~ '^[A-Za-z0-9][A-Za-z0-9 -]{1,11}$');

create index properties_country_idx on portfolio.properties (organization_id, country);

-- Energy labels are a European rating; homes elsewhere have none.
alter table portfolio.units alter column energy_label drop not null;

-- Bank accounts outside the IBAN countries (the United States, Japan, India and most others) are not IBANs.
alter table portfolio.owners alter column iban drop not null;
alter table leasing.tenants alter column iban drop not null;

-- The yearly value: the Dutch WOZ, or another country's assessed value for its property tax.
alter table portfolio.valuations drop constraint valuations_source_check;
alter table portfolio.valuations add constraint valuations_source_check check (source in ('woz', 'assessment', 'appraisal'));

-- Card payments, and the mobile payments of many countries (UPI, PromptPay, Pix, M-Pesa).
alter table billing.payments drop constraint payments_method_check;
alter table billing.payments add constraint payments_method_check check (method in ('direct_debit', 'bank_transfer', 'ideal', 'card', 'mobile'));

alter table leasing.tenants add column income_currency text not null default 'EUR' check (income_currency ~ '^[A-Z]{3}$');
alter table leasing.tenants alter column income_currency drop default;
alter table maintenance.vendors add column currency text not null default 'EUR' check (currency ~ '^[A-Z]{3}$');
alter table maintenance.vendors alter column currency drop default;

alter table portfolio.units add column currency text not null default 'EUR';
alter table portfolio.valuations add column currency text not null default 'EUR';
alter table leasing.leases add column currency text not null default 'EUR';
alter table leasing.deposits add column currency text not null default 'EUR';
alter table billing.rent_charges add column currency text not null default 'EUR';
alter table billing.payments add column currency text not null default 'EUR';
alter table maintenance.work_orders add column currency text not null default 'EUR';
alter table portfolio.units alter column currency drop default;
alter table portfolio.valuations alter column currency drop default;
alter table leasing.leases alter column currency drop default;
alter table leasing.deposits alter column currency drop default;
alter table billing.rent_charges alter column currency drop default;
alter table billing.payments alter column currency drop default;
alter table maintenance.work_orders alter column currency drop default;

-- A record's currency is the one of the record it belongs to, set when it is written: tg_argv names that table and
-- the column that points at it. A work order is invoiced in its vendor's currency.
create function core.inherit_currency() returns trigger language plpgsql as $$
begin
  execute format('select currency from %s where id = $1', tg_argv[0]) into new.currency using (to_jsonb(new) ->> tg_argv[1])::bigint;
  return new;
end $$;

create trigger unit_currency before insert or update of property_id on portfolio.units
  for each row execute function core.inherit_currency('portfolio.properties', 'property_id');
create trigger valuation_currency before insert or update of property_id on portfolio.valuations
  for each row execute function core.inherit_currency('portfolio.properties', 'property_id');
create trigger lease_currency before insert or update of unit_id on leasing.leases
  for each row execute function core.inherit_currency('portfolio.units', 'unit_id');
create trigger deposit_currency before insert or update of lease_id on leasing.deposits
  for each row execute function core.inherit_currency('leasing.leases', 'lease_id');
create trigger rent_charge_currency before insert or update of lease_id on billing.rent_charges
  for each row execute function core.inherit_currency('leasing.leases', 'lease_id');
create trigger payment_currency before insert or update of charge_id on billing.payments
  for each row execute function core.inherit_currency('billing.rent_charges', 'charge_id');
create trigger work_order_currency before insert or update of vendor_id on maintenance.work_orders
  for each row execute function core.inherit_currency('maintenance.vendors', 'vendor_id');

-- Arrears per lease, in the lease's currency: balances in different currencies are not added up.
create or replace view billing.arrears as
select
  c.lease_id,
  c.organization_id,
  count(*)::integer as open_charges,
  sum(c.outstanding) as balance,
  min(c.due_on) as oldest_due_on,
  c.currency
from billing.rent_charges c
where c.paid_amount < c.amount
group by c.lease_id, c.organization_id, c.currency;
