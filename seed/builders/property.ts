import { DAY, windowStart } from '../calendar'
import { roundAsking } from '../data/currencies'
import { slugify } from '../format'
import type { City } from '../data/reference'
import { ibanOf } from '../iban'
import { businessEmail, fullName, personFrom, personalEmail } from '../people'
import { int, pick, rngAt, weighted, type Rand } from '../rng'
import type { Org } from '../world'
import { propertyAcquiredAt, propertyShapeAt } from './allocation'

const YEAR = 365 * DAY

const cityOf = (org: Org, rand: Rand) => weighted(rand, org.cities.map((city) => [city, city.weight] as const))

// An owner lives in one of the organization's cities, though not always the one of the homes they own.
export const ownerAt = (org: Org, ordinal: number) => {
  const rand = rngAt(org.seed + 3, ordinal)
  const kind = weighted(rand, [['private', 58], ['company', 28], ['pension_fund', 6], ['housing_association', 8]] as const)
  const city = cityOf(org, rand)
  const { locale } = city
  const person = personFrom(locale, rand)
  const name =
    kind === 'private' ? fullName(locale, person)
    : kind === 'company' ? locale.company(person.last)
    : kind === 'pension_fund' ? locale.pensionFund(city.name)
    : locale.housingAssociation(city.name)
  const fee = kind === 'private' ? int(rand, 700, 900) : kind === 'company' ? int(rand, 500, 650) : int(rand, 350, 500)
  return {
    id: org.ownerFirstId + ordinal,
    name,
    kind,
    email: kind === 'private' ? personalEmail(person, rand) : businessEmail('office', name, `${slugify(person.latinLast)}-${locale.country.toLowerCase()}`),
    phone: rand() < 0.8 ? locale.phone(rand) : null,
    iban: ibanOf(locale, rand),
    feePercent: fee / 100,
    createdAt: Math.floor(windowStart - int(rand, 1, 9) * YEAR),
  }
}

const builtYear = (rand: () => number) =>
  weighted(rand, [[int(rand, 1890, 1940), 25], [int(rand, 1946, 1979), 30], [int(rand, 1980, 2005), 30], [int(rand, 2006, 2024), 15]] as const)

const addressOf = (city: City, street: string, houseNumber: string) => (city.locale.numberFirst ? `${houseNumber} ${street}` : `${street} ${houseNumber}`)

// The first properties take one city each, so even the small scale has homes in every city.
export const propertyAt = (org: Org, ordinal: number) => {
  const { kind, units } = propertyShapeAt(org.seed, ordinal)
  const rand = rngAt(org.seed + 4, ordinal)
  const city = org.cities[ordinal] ?? cityOf(org, rand)
  const { locale } = city
  const street = pick(rand, city.streets ?? locale.streets)
  const houseNumber = locale.houseNumber?.(rand) ?? String(int(rand, 1, 240))
  const building = pick(rand, city.buildings ?? locale.buildings)
  const address = addressOf(city, street, houseNumber)
  return {
    id: org.propertyFirstId + ordinal,
    ownerId: org.ownerFirstId + Math.floor(rand() ** 1.7 * org.ownerCount),
    kind,
    units,
    city,
    name: kind === 'single_family' ? address : building,
    shortName: kind === 'single_family' ? address : building,
    street,
    houseNumber,
    postalCode: city.postalCode(rand),
    latitude: (city.lat + (rand() - 0.5) * 0.06).toFixed(6),
    longitude: (city.lng + (rand() - 0.5) * 0.09).toFixed(6),
    builtYear: builtYear(rand),
    createdAt: propertyAcquiredAt(org.seed, ordinal),
  }
}

export type SeededProperty = ReturnType<typeof propertyAt>

const energyLabels = ['A++++', 'A+++', 'A++', 'A+', 'A', 'B', 'C', 'D', 'E', 'F', 'G'] as const

// Newer buildings and renovated older ones carry better labels. The European scale stops at A; homes outside Europe
// carry none.
const energyLabel = (property: SeededProperty, rand: () => number) => {
  const scale = property.city.locale.energyLabels
  if (scale === null) return null
  const base = property.builtYear >= 2015 ? 2 : property.builtYear >= 2000 ? 4 : property.builtYear >= 1980 ? 6 : 7
  const best = scale === 'nl' ? 0 : energyLabels.indexOf('A')
  return energyLabels[Math.max(best, Math.min(energyLabels.length - 1, base + int(rand, -2, 2)))]!
}

// The unit's slot inside its property; `unit` is the organization-wide unit ordinal.
export const unitAt = (org: Org, property: SeededProperty, unit: number) => {
  const slot = unit - org.unitStarts[property.id - org.propertyFirstId]!
  const rand = rngAt(org.seed + 5, unit)
  const perFloor = property.kind === 'mixed_use' ? 3 : 4
  // Mixed-use blocks have shops on the ground floor, so their homes start on the first.
  const floor = property.kind === 'single_family' ? 0 : Math.floor(slot / perFloor) + (property.kind === 'mixed_use' ? 1 : 0)
  const area = property.kind === 'single_family' ? int(rand, 85, 165) : int(rand, 38, 115)
  const bedrooms = area < 45 ? int(rand, 0, 1) : area < 70 ? 2 : area < 100 ? 3 : 4
  const marketFactor = 0.9 + rand() * 0.25
  return {
    id: org.unitFirstId + unit,
    label: property.kind === 'single_family' ? property.shortName : `${property.shortName} ${floor}.${String((slot % perFloor) + 1).padStart(2, '0')}`,
    floor,
    bedrooms,
    area,
    energyLabel: energyLabel(property, rand),
    // The 2026 asking rent, in hundredths of the property's currency.
    baseRentCents: roundAsking(area * property.city.rentPerM2 * marketFactor * (property.kind === 'single_family' ? 0.92 : 1) * 100),
    topFloor: property.kind !== 'single_family' && slot >= property.units - perFloor,
    createdAt: property.createdAt,
  }
}

export type SeededUnit = ReturnType<typeof unitAt>
