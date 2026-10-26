import type { Rand } from '../rng'
import type { Currency } from './currencies'

export const trades = ['plumbing', 'heating', 'electrical', 'roofing', 'carpentry', 'locksmith', 'pest_control', 'general'] as const

export type Trade = (typeof trades)[number]

/** A name as it is written, and in Latin letters where it is written otherwise (for its e-mail address). */
export type Name = string | readonly [written: string, latin: string]

/** A family name, with its feminine form where the language has one (Kowalski, Kowalska). */
export type Surname = Name | { readonly m: Name; readonly f: Name }

export type TransferMethod = 'bank_transfer' | 'ideal' | 'card' | 'mobile'

/**
 * How people, addresses, phone numbers, banks and businesses look in one country. Every name is made up from common
 * given names and family names, so none is a real person; phone numbers keep to the ranges set aside for fiction
 * where the country has them (+44 7700 900, 555-01).
 */
export type Locale = {
  country: string
  currency: Currency
  given: { readonly f: readonly Name[]; readonly m: readonly Name[] }
  surnames: readonly Surname[]
  /** Its names are written in Latin letters, so they also turn up among tenants in other countries. */
  travels: boolean
  /** The family name comes first in a full name, as in Japan and Korea. */
  familyFirst?: boolean
  streets: readonly string[]
  buildings: readonly string[]
  /** The number goes before the street: `12 rue Oberkampf`, `221 Baker Street`. */
  numberFirst?: boolean
  houseNumber?: (rand: Rand) => string
  phone: (rand: Rand) => string
  /** The IBAN country code and how an account's own part is made; null where banks use other account numbers. */
  iban: { readonly country: string; readonly bban: (rand: Rand) => string } | null
  company: (surname: string) => string
  pensionFund: (name: string) => string
  housingAssociation: (name: string) => string
  /** Local contractors with their hourly rate in the local currency. */
  vendors: readonly (readonly [name: string, trade: Trade, rate: number])[]
  /** What a tenant adds to a maintenance ticket, in their own language. */
  notes: readonly string[]
  /** Which energy labels homes carry: the Dutch scale up to A++++, the European A to G, or none. */
  energyLabels: 'nl' | 'eu' | null
  /** The yearly value: the Dutch WOZ, or the assessed value for property tax. */
  valuation: 'woz' | 'assessment'
  /** How tenants pay when the rent is not collected by direct debit. */
  transfers: readonly TransferMethod[]
  /** The direct debit scheme a payment's reference names. */
  debit: string
}
