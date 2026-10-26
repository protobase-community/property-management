import type { Locale } from './data/locale'
import type { Rand } from './rng'

// ISO 13616 check digits: the account with the country code and "00" moved to the end, letters as numbers, mod 97.
const checkDigits = (country: string, bban: string) => {
  const digits = `${bban}${country}00`.replace(/[A-Z]/g, (letter) => String(letter.charCodeAt(0) - 55))
  const remainder = digits.split('').reduce((rest, digit) => (rest * 10 + Number(digit)) % 97, 0)
  return String(98 - remainder).padStart(2, '0')
}

/** An IBAN with valid check digits from the locale's banks, or null where the country's banks have none. */
export const ibanOf = (locale: Locale, rand: Rand) => {
  if (locale.iban === null) return null
  const bban = locale.iban.bban(rand)
  return `${locale.iban.country}${checkDigits(locale.iban.country, bban)}${bban}`
}

/** Whether the IBAN's check digits hold. */
export const validIban = (iban: string) => checkDigits(iban.slice(0, 2), iban.slice(4)) === iban.slice(2, 4)
