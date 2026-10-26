import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const gb: Locale = {
  country: 'GB',
  currency: 'GBP',
  given: {
    f: ['Olivia', 'Amelia', 'Isla', 'Freya', 'Poppy', 'Imogen', 'Harriet', 'Niamh', 'Aisha', 'Priya', 'Chloe', 'Rhiannon'],
    m: ['Oliver', 'George', 'Harry', 'Alfie', 'Callum', 'Rhys', 'Hamish', 'Tobias', 'Ibrahim', 'Kwame', 'Arjun', 'Declan'],
  },
  surnames: ['Smith', 'Jones', 'Taylor', 'Brown', 'Evans', 'Wright', 'Hughes', 'Patel', 'Khan', 'Okafor', 'MacLeod', 'Fitzgerald', 'Ashworth-Clarke', 'Llewellyn', 'Begum', 'Nowak'],
  travels: true,
  numberFirst: true,
  streets: ['Coldharbour Lane', 'Mare Street', 'Holloway Road', 'Brick Lane', 'Lavender Hill', 'Upper Street', 'Stockwell Park Crescent', 'Chatsworth Road', 'Railway Terrace', 'St John\'s Wood Road'],
  buildings: ['Thames View House', 'Wharfside Court', 'The Granary', 'Kingfisher Point', 'Hawthorn Mansions', 'Shoreditch Yard'],
  phone: (rand) => (rand() < 0.7 ? `+44 7700 900${digits(rand, 3)}` : `020 7946 0${digits(rand, 3)}`),
  iban: { country: 'GB', bban: (rand) => `${pick(rand, ['NWBK', 'BARC', 'LOYD', 'HBUK', 'MIDL'])}${digits(rand, 14)}` },
  company: (surname) => `${surname} Property Holdings Ltd`,
  pensionFund: (name) => `${name} Pension Scheme`,
  housingAssociation: (name) => `${name} Housing Association`,
  vendors: [['Brightwater Plumbing & Heating Ltd', 'plumbing', 62], ['Spark Right Electrical', 'electrical', 58], ['A1 Locksmiths (24hr)', 'locksmith', 75], ['Handy Andy\'s Maintenance', 'general', 42], ['Slate & Tile Roofing Co.', 'roofing', 55]],
  notes: ['Please text before you come.', 'Buzzer doesn\'t work, ring my mobile.', 'Working from home Tues & Thurs.', 'Dog is friendly 🐕'],
  energyLabels: 'eu',
  valuation: 'assessment',
  transfers: ['bank_transfer', 'bank_transfer', 'card'],
  debit: 'BACS',
  houseNumber: (rand) => (rand() < 0.15 ? `Flat ${int(rand, 1, 9)}, ${int(rand, 2, 180)}` : String(int(rand, 1, 240))),
}
