import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const ie: Locale = {
  country: 'IE',
  currency: 'EUR',
  given: {
    f: ['Aoife', 'Siobhán', 'Niamh', 'Saoirse', 'Caoimhe', 'Róisín', 'Gráinne', 'Clodagh', 'Méabh', 'Orla'],
    m: ['Cian', 'Oisín', 'Darragh', 'Pádraig', 'Seán', 'Ciarán', 'Eoghan', 'Tadhg', 'Rónán', 'Fionn'],
  },
  surnames: ['Murphy', 'O\'Brien', 'Ó Briain', 'Kelly', 'O\'Sullivan', 'Mac Giolla Phádraig', 'Byrne', 'Ní Bhriain', 'McCarthy', 'Fitzgerald', 'Kowalczyk', 'Doyle'],
  travels: true,
  numberFirst: true,
  streets: ['Camden Street', 'Thomas Street', 'Rathmines Road', 'Phibsborough Road', 'Stoneybatter', 'Ranelagh Road', 'Dorset Street Upper', 'Sráid Thomáis'],
  buildings: ['Liffey View Apartments', 'The Maltings', 'Grand Canal Wharf', 'Áras na Cathrach', 'Beechwood Court'],
  houseNumber: (rand) => (rand() < 0.3 ? `Apt ${int(rand, 1, 60)}, ${int(rand, 1, 80)}` : String(int(rand, 1, 140))),
  phone: (rand) => `+353 8${pick(rand, ['3', '5', '6', '7'])} ${digits(rand, 3)} ${digits(rand, 4)}`,
  iban: { country: 'IE', bban: (rand) => `${pick(rand, ['AIBK', 'BOFI', 'PTSB'])}${digits(rand, 14)}` },
  company: (surname) => `${surname} Property Ltd`,
  pensionFund: (name) => `${name} Superannuation Fund`,
  housingAssociation: (name) => `${name} Approved Housing Body CLG`,
  vendors: [['Liffey Plumbing & Heating', 'plumbing', 70], ['Ó Briain Electrical', 'electrical', 65], ['Dublin Lock Doctor', 'locksmith', 85], ['Handy Paddy Maintenance', 'general', 48]],
  notes: ['Grand, give us a ring first.', 'Key is with the neighbour at no. 14.', 'Home after half five.'],
  energyLabels: 'eu',
  valuation: 'assessment',
  transfers: ['bank_transfer', 'card'],
  debit: 'SEPA',
}
