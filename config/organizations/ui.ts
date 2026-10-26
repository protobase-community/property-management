import { view } from '@protobase/schema'
import type { organizations } from './data'

export const organizationsView = view<typeof organizations>('organizations')
  .names({ singular: 'Organization', plural: 'Organizations' })
  .fields((r) => ({ kvk_number: r.kvk_number.label('Registration number').help('The company number at its registry, such as Companies House or the Dutch KvK.').format('code') }))
  .list((r) => ({ columns: [r.name, r.slug, r.city, r.kvk_number] }))
