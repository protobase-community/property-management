import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const ng: Locale = {
  country: 'NG',
  currency: 'NGN',
  given: {
    f: ['Chiamaka', 'Ngozi', 'Folasade', 'Aisha', 'Oluwaseun', 'Adaeze', 'Funmilayo', 'Zainab', 'Ifeoma', 'Temitope'],
    m: ['Chinedu', 'Oluwadamilare', 'Emeka', 'Tunde', 'Ibrahim', 'Obinna', 'Babatunde', 'Musa', 'Ikechukwu', 'Ayodeji'],
  },
  surnames: ['Okafor', 'Adeyemi', 'Okonkwo', 'Balogun', 'Eze', 'Bello', 'Nwosu', 'Olawale', 'Abubakar', 'Adebayo-Ogunleye', 'Chukwuemeka', 'Ogunbiyi'],
  travels: true,
  numberFirst: true,
  streets: ['Admiralty Way', 'Awolowo Road', 'Adeola Odeku Street', 'Herbert Macaulay Way', 'Allen Avenue', 'Ozumba Mbadiwe Avenue', 'Bourdillon Road'],
  buildings: ['Lekki Pearl Estate', 'Ikoyi Gardens', 'Victoria Court', 'Admiralty Heights', 'Palm Grove Residences'],
  houseNumber: (rand) => (rand() < 0.3 ? `Plot ${int(rand, 1, 400)}` : String(int(rand, 1, 120))),
  phone: (rand) => `+234 ${pick(rand, ['803', '806', '813', '816', '903'])} ${digits(rand, 3)} ${digits(rand, 4)}`,
  iban: null,
  company: (surname) => `${surname} Properties Ltd`,
  pensionFund: (name) => `${name} Pension Fund Administrators`,
  housingAssociation: (name) => `${name} Housing Co-operative Society`,
  vendors: [['Lekki Plumbing Services', 'plumbing', 9000], ['Brightway Electricals', 'electrical', 8500], ['Oga Fix-It Services', 'general', 6000], ['Eko Pest Control', 'pest_control', 12000]],
  notes: ['Please call before coming.', 'Gateman has the key.', 'NEPA took light again, generator not working 🔌'],
  energyLabels: null,
  valuation: 'assessment',
  transfers: ['bank_transfer', 'bank_transfer', 'card'],
  debit: 'Direct Debit',
}
