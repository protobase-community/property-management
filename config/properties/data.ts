import { f, resource } from '@protobase/schema'
import { access } from '../roles'

/**
 * portfolio.properties: a building or a house, with its location as latitude and longitude. Its currency is the one its
 * units, leases, rent and valuations are in.
 */
export const properties = resource('properties')
  .table('portfolio.properties')
  .fields({
    id: f.bigint().readOnly().filterable().sortable().dbDefault(),
    organization_id: f.relation('organizations').filterable().sortable(),
    owner_id: f.relation('owners').filterable().sortable(),
    name: f.text(),
    kind: f.enum(['apartment_building', 'single_family', 'mixed_use']).filterable().sortable(),
    street: f.text(),
    house_number: f.text(),
    // As the country writes it, or none where it has none: SW1A 2AA, 160-0023, D02 X285, 01310-200.
    postal_code: f.text().optional().regex(/^[A-Za-z0-9][A-Za-z0-9 -]{1,11}$/, 'Letters and digits, with spaces or hyphens, such as SW1A 2AA or 160-0023'),
    city: f.text().filterable().sortable(),
    country: f.country().filterable(),
    currency: f.currency(),
    latitude: f.decimal({ precision: 8, scale: 6 }).filterable().sortable(),
    longitude: f.decimal({ precision: 9, scale: 6 }),
    built_year: f.integer().min(1500).max(2100),
    created_at: f.timestamp().readOnly().filterable().sortable().dbDefault(),
    updated_at: f.timestamp().readOnly().dbDefault(),
  })
  .primaryKey((r) => r.id)
  .tenant((r) => r.organization_id)
  .search((r) => [r.name])
  .access(access('properties'))
