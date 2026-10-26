import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const de: Locale = {
  country: 'DE',
  currency: 'EUR',
  given: {
    f: ['Lena', 'Hannah', 'Lea', 'Johanna', 'Charlotte', 'Greta', 'Annika', 'Jülide', 'Franziska', 'Sophie', 'Merle', 'Antje'],
    m: ['Lukas', 'Jonas', 'Felix', 'Maximilian', 'Jörg', 'Matthias', 'Ole', 'Björn', 'Emre', 'Tobias', 'Jürgen', 'Niklas'],
  },
  surnames: ['Müller', 'Schmidt', 'Schneider', 'Fischer', 'Weiß', 'Groß', 'Hoffmann', 'Schäfer', 'Köhler', 'Krüger', 'Öztürk', 'von Bülow', 'Weißenbörn', 'Nowak', 'Brandt', 'Schulze-Böhm'],
  travels: true,
  streets: ['Schönhauser Allee', 'Kastanienallee', 'Bergmannstraße', 'Karl-Marx-Allee', 'Torstraße', 'Müllerstraße', 'Sonnenallee', 'Görlitzer Straße', 'Am Kupfergraben'],
  buildings: ['Lindenhof', 'Haus am Kanal', 'Spreeblick', 'Gartenhaus Mitte', 'Altbau Prenzlauer Berg'],
  houseNumber: (rand) => `${int(rand, 1, 180)}${rand() < 0.12 ? pick(rand, ['a', 'b', 'c']) : ''}`,
  phone: (rand) => (rand() < 0.6 ? `+49 15${int(rand, 1, 7)} ${digits(rand, 4)} ${digits(rand, 4)}` : `030 ${digits(rand, 7)}`),
  iban: { country: 'DE', bban: (rand) => digits(rand, 18) },
  company: (surname) => `${surname} Immobilien GmbH`,
  pensionFund: (name) => `Pensionskasse ${name}`,
  housingAssociation: (name) => `Wohnungsgenossenschaft ${name} eG`,
  vendors: [['Sanitär Krüger GmbH', 'plumbing', 68], ['Elektro Weiß & Söhne', 'electrical', 64], ['Heizungsbau Köhler', 'heating', 72], ['Schlüsseldienst Öztürk', 'locksmith', 79], ['Hausmeisterservice Brandt', 'general', 48]],
  notes: ['Bitte vorher anrufen.', 'Klingel ist kaputt, bitte klopfen.', 'Ab 17 Uhr zu Hause.', 'Schlüssel liegt beim Nachbarn im 2. OG.'],
  energyLabels: 'eu',
  valuation: 'assessment',
  transfers: ['bank_transfer'],
  debit: 'SEPA',
}
