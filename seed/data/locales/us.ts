import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const us: Locale = {
  country: 'US',
  currency: 'USD',
  given: {
    f: ['Emma', 'Ava', 'Madison', 'Keisha', 'Mariana', 'Hannah', 'Grace', 'Sofia', 'Jasmine', 'Abigail', 'Mei', 'Destiny'],
    m: ['Liam', 'Noah', 'Ethan', 'Mason', 'Jayden', 'Elijah', 'Caleb', 'DeShawn', 'Mateo', 'Tyler', 'Wyatt', 'Dmitri'],
  },
  surnames: ['Johnson', 'Williams', 'Garcia', 'Rodriguez', 'Miller', 'Davis', 'Martinez', 'Washington', 'Kim', 'Nguyen', 'O\'Connell', 'Schwartz', 'Rivera-Lopez', 'Kowalczyk', 'Abernathy', 'Thompson'],
  travels: true,
  numberFirst: true,
  streets: ['Bedford Avenue', 'Amsterdam Avenue', 'Atlantic Avenue', 'Grand Concourse', 'Lexington Avenue', 'West 4th Street', 'Myrtle Avenue', 'Ocean Parkway', 'Jamaica Avenue', 'Ditmars Boulevard'],
  buildings: ['The Hudson Lofts', 'Parkview Towers', 'The Ashby', 'Riverside Commons', 'The Linden at Prospect', 'Halsey Gardens'],
  phone: (rand) => `${rand() < 0.5 ? '+1 ' : ''}(${pick(rand, ['212', '718', '347', '646', '917'])}) 555-01${digits(rand, 2)}${rand() < 0.08 ? ` ext. ${int(rand, 100, 499)}` : ''}`,
  iban: null,
  company: (surname) => `${surname} Realty LLC`,
  pensionFund: (name) => `${name} Teachers' Retirement Fund`,
  housingAssociation: (name) => `${name} Housing Development Fund Corp.`,
  vendors: [['Five Boroughs Plumbing Inc.', 'plumbing', 95], ['Bright Line Electric', 'electrical', 90], ['Super Mario\'s Handyman Service', 'general', 55], ['KeyStone Lock & Safe', 'locksmith', 85], ['Empire Boiler & HVAC', 'heating', 105]],
  notes: ['Super has a spare key.', 'Please call ahead, I work nights.', 'Second time this month!!', 'Leave a note under the door if I\'m out 🙏'],
  energyLabels: null,
  valuation: 'assessment',
  transfers: ['bank_transfer', 'card', 'card'],
  debit: 'ACH',
}
