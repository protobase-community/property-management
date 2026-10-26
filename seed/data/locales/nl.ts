import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const nl: Locale = {
  country: 'NL',
  currency: 'EUR',
  given: {
    f: ['Sanne', 'Lieke', 'Femke', 'Anouk', 'Noor', 'Mirjam', 'Fleur', 'Fatima', 'Esmee', 'Maaike', 'Ilse', 'Merel'],
    m: ['Daan', 'Jeroen', 'Bram', 'Ruben', 'Thijs', 'Pieter', 'Joost', 'Sem', 'Mohamed', 'Niels', 'Wouter', 'Gijs'],
  },
  surnames: ['de Vries', 'van den Berg', 'Bakker', 'Janssen', 'Visser', 'de Boer', 'Mulder', 'van Dijk', 'Dekker', 'Yılmaz', 'El Amrani', 'van der Linden', 'Dijkstra', "'t Hart", 'Hoekstra', 'Kramer'],
  travels: true,
  streets: ['Prinsengracht', 'Kerkstraat', 'Ferdinand Bolstraat', 'Javastraat', 'Admiraal de Ruijterweg', 'Bilderdijkstraat', 'Burgemeester de Vlugtlaan', 'Van Woustraat', 'IJburglaan', 'Haarlemmerdijk'],
  buildings: ['De Linde', 'Parkzicht', 'Het Baken', 'De Kade', 'Zonnehof', 'Het Anker', 'Oostpoort', 'De Werf'],
  houseNumber: (rand) => `${int(rand, 1, 240)}${rand() < 0.15 ? pick(rand, ['-H', '-1', '-2', 'A']) : ''}`,
  phone: (rand) => `+31 6 ${digits(rand, 8)}`,
  iban: { country: 'NL', bban: (rand) => `${pick(rand, ['ABNA', 'INGB', 'RABO', 'SNSB', 'TRIO', 'ASNB', 'BUNQ', 'KNAB'])}${digits(rand, 10)}` },
  company: (surname) => `${surname.replace(/^(van der|van den|van|de|den|der|el|'t)\s+/i, '').replace(/^\p{L}/u, (c) => c.toUpperCase())} Vastgoed B.V.`,
  pensionFund: (name) => `Stichting Pensioenfonds ${name}`,
  housingAssociation: (name) => `Woonstichting ${name}`,
  vendors: [['Loodgietersbedrijf De Waal', 'plumbing', 68], ['Installatietechniek Van Dam', 'heating', 74], ['Elektro Mulder', 'electrical', 65], ['Slotenservice Amstel', 'locksmith', 82], ['Klusbedrijf Jansen', 'general', 52]],
  notes: ['Bel even van tevoren.', 'Sleutel ligt bij de buren.', 'Na 17:00 thuis.', 'Tweede keer dit jaar.'],
  energyLabels: 'nl',
  valuation: 'woz',
  transfers: ['bank_transfer', 'ideal', 'ideal'],
  debit: 'SEPA',
}
