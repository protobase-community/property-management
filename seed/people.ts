import type { Locale, Name, Surname } from './data/locale'
import { slugify } from './format'
import { int, pick, type Rand } from './rng'

type Names = { readonly given: Locale['given']; readonly surnames: readonly Surname[] }

const written = (name: Name) => (typeof name === 'string' ? name : name[0])
const latin = (name: Name) => (typeof name === 'string' ? name : name[1])

/** A made-up person from one language's given and family names, the family name in the form that goes with the given one. */
export const personFrom = (names: Names, rand: Rand) => {
  const form = rand() < 0.5 ? 'f' : 'm'
  const given = pick(rand, names.given[form])
  const surname = pick(rand, names.surnames)
  const family = typeof surname !== 'string' && 'm' in surname ? surname[form] : surname
  return { first: written(given), last: written(family), latinFirst: latin(given), latinLast: latin(family) }
}

export type Person = ReturnType<typeof personFrom>

/** The name as the locale writes it in full: family name first in Japan and Korea. */
export const fullName = (locale: Locale, person: Person) => (locale.familyFirst ? `${person.last} ${person.first}` : `${person.first} ${person.last}`)

// Addresses on the domains set aside for examples, so no mail reaches anyone.
const domains = ['example.com', 'example.net', 'example.org']

export const personalEmail = (person: Person, rand: Rand) =>
  `${slugify(person.latinFirst)}.${slugify(person.latinLast)}${rand() < 0.4 ? int(rand, 1, 99) : ''}@${pick(rand, domains)}`.replace(/-/g, '.')

/**
 * A business's address on its own `.example` domain, from the first words of its name or, for a name in another
 * script, `fallback`.
 */
export const businessEmail = (mailbox: string, name: string, fallback: string) =>
  `${mailbox}@${slugify(name).split('-').slice(0, 3).join('-') || fallback}.example`
