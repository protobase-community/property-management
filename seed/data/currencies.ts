// The currencies the seed's cities let in: roughly what one euro buys in 2026, to scale amounts that are not set per
// city (materials on a work order), and whether the currency has cents.
export const currencies = {
  AED: { perEuro: 4, cents: true },
  AUD: { perEuro: 1.7, cents: true },
  BRL: { perEuro: 6.2, cents: true },
  CAD: { perEuro: 1.55, cents: true },
  EUR: { perEuro: 1, cents: true },
  GBP: { perEuro: 0.85, cents: true },
  ILS: { perEuro: 4, cents: true },
  INR: { perEuro: 97, cents: true },
  JPY: { perEuro: 168, cents: false },
  KES: { perEuro: 150, cents: true },
  KRW: { perEuro: 1550, cents: false },
  MXN: { perEuro: 21, cents: true },
  NGN: { perEuro: 1750, cents: true },
  PLN: { perEuro: 4.25, cents: true },
  THB: { perEuro: 38, cents: true },
  TRY: { perEuro: 44, cents: true },
  USD: { perEuro: 1.15, cents: true },
} as const

export type Currency = keyof typeof currencies

/** An amount in hundredths, rounded to what the currency pays out: whole yen and won have no cents. */
export const payable = (hundredths: number, currency: Currency) =>
  currencies[currency].cents ? Math.round(hundredths) : Math.round(hundredths / 100) * 100

/** An amount in hundredths rounded to its three leading digits, as asking rents are: 1,234.56 to 1,230. */
export const roundAsking = (hundredths: number) => {
  const step = 10 ** Math.max(2, Math.floor(Math.log10(Math.max(hundredths, 1))) - 2)
  return Math.round(hundredths / step) * step
}
