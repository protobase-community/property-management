import { view } from '@protobase/schema'
import type { valuations } from './data'

export const valuationsView = view<typeof valuations>('valuations')
  .names({ singular: 'Valuation', plural: 'Valuations' })
  .fields((r) => ({
    property_id: r.property_id.label('Property'),
    valued_on: r.valued_on.label('Valuation date'),
    value: r.value.decimals(0),
    currency: r.currency.help("The property's currency."),
    source: r.source.help('The yearly value set for property tax (in the Netherlands the WOZ value), or a valuer\'s appraisal.').format('badge').valueLabels({ woz: 'WOZ', assessment: 'Assessment', appraisal: 'Appraisal' }),
  }))
  .list((r) => ({ columns: [r.property_id, r.valued_on, r.source, r.value, r.currency], sort: [[r.valued_on, 'desc']] }))
  .filters((r, w) => [w.facets(r.source), w.dateRange(r.valued_on, { presets: ['year'] })])
