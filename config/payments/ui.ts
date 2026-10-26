import { view } from '@protobase/schema'
import type { payments } from './data'

export const paymentsView = view<typeof payments>('payments')
  .names({ singular: 'Payment', plural: 'Payments' })
  .fields((r) => ({
    charge_id: r.charge_id.label('Charge'),
    paid_on: r.paid_on.label('Paid on'),
    amount: r.amount.decimals(2),
    currency: r.currency.help("The charge's currency."),
    method: r.method.help('Direct debit is collected on the first; the other methods come in when the tenant pays.').format('badge').valueLabels({ direct_debit: 'Direct debit', bank_transfer: 'Bank transfer', ideal: 'iDEAL', card: 'Card', mobile: 'Mobile payment' }),
  }))
  .list((r) => ({ columns: [r.charge_id, r.paid_on, r.amount, r.currency, r.method, r.reference], sort: [[r.paid_on, 'desc']] }))
  .filters((r, w) => [w.facets(r.method), w.dateRange(r.paid_on, { presets: ['7d', '30d', '90d', 'year'] })])
  .chart((r) => ({ field: r.paid_on, range: '90d', granularity: 'week' }))
