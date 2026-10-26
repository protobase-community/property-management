import { digits, int } from '../../rng'
import type { Locale } from '../locale'

export const au: Locale = {
  country: 'AU',
  currency: 'AUD',
  given: {
    f: ['Matilda', 'Isla', 'Charlotte', 'Mia', 'Harper', 'Ruby', 'Georgia', 'Willow', 'Thi Hoa', 'Kirra'],
    m: ['Oliver', 'Jack', 'Lachlan', 'Cooper', 'Hamish', 'Riley', 'Angus', 'Duc Anh', 'Jarrah', 'Lucas'],
  },
  surnames: ['Smith', 'Jones', 'Williams', 'Brown', 'Wilson', 'Nguyen', 'Tran', 'Papadopoulos', 'O\'Neill', 'MacKenzie', 'Kowalski', 'Lee'],
  travels: true,
  numberFirst: true,
  streets: ['King Street', 'Crown Street', 'Glebe Point Road', 'Oxford Street', 'Enmore Road', 'Military Road', 'Bondi Road', 'Parramatta Road'],
  buildings: ['Harbour Vista', 'The Wattle Apartments', 'Bondi Pavilion Residences', 'Jacaranda Court', 'Surry Hills Terraces'],
  houseNumber: (rand) => (rand() < 0.5 ? `Unit ${int(rand, 1, 40)}/${int(rand, 1, 300)}` : String(int(rand, 1, 400))),
  phone: (rand) => `+61 491 570 ${digits(rand, 3)}`,
  iban: null,
  company: (surname) => `${surname} Property Group Pty Ltd`,
  pensionFund: (name) => `${name} Super Fund`,
  housingAssociation: (name) => `${name} Community Housing Ltd`,
  vendors: [['Bondi Plumbing Co.', 'plumbing', 110], ['Southern Cross Sparkies', 'electrical', 105], ['Locksmiths on Call Sydney', 'locksmith', 130], ['Coastal Handyman Services', 'general', 80], ['Harbour Pest Control', 'pest_control', 120]],
  notes: ['Please call before you come, cheers.', 'Key\'s in the lockbox, code by SMS.', 'Home after 5.', 'Huntsman in the shower again 🕷️'],
  energyLabels: null,
  valuation: 'assessment',
  transfers: ['bank_transfer', 'card'],
  debit: 'BECS',
}
