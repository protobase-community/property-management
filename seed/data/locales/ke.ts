import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const ke: Locale = {
  country: 'KE',
  currency: 'KES',
  given: {
    f: ['Wanjiru', 'Akinyi', 'Njeri', 'Achieng', 'Wambui', 'Chebet', 'Nyokabi', 'Faith', 'Zawadi', 'Mercy'],
    m: ['Kamau', 'Otieno', 'Kipchoge', 'Mwangi', 'Omondi', 'Kiprono', 'Baraka', 'Brian', 'Juma', 'Odhiambo'],
  },
  surnames: ['Mwangi', 'Otieno', 'Kariuki', 'Wanjiku', 'Ochieng', 'Kiprotich', 'Njoroge', 'Mutua', 'Achieng', 'Kimani', 'Wafula', 'Chepkoech'],
  travels: true,
  numberFirst: true,
  streets: ['Ngong Road', 'Argwings Kodhek Road', 'Waiyaki Way', 'Lenana Road', 'Kindaruma Road', 'Mombasa Road', 'Gitanga Road'],
  buildings: ['Kilimani Heights', 'Lavington Green', 'Westlands Court', 'Jacaranda Gardens', 'Riverside Park Apartments'],
  houseNumber: (rand) => (rand() < 0.4 ? `Hse No. ${int(rand, 1, 60)}` : String(int(rand, 1, 200))),
  phone: (rand) => `+254 7${pick(rand, ['0', '1', '2', '9'])}${digits(rand, 1)} ${digits(rand, 6)}`,
  iban: null,
  company: (surname) => `${surname} Estates Ltd`,
  pensionFund: (name) => `${name} Staff Retirement Benefits Scheme`,
  housingAssociation: (name) => `${name} Housing Co-operative Society`,
  vendors: [['Maji Safi Plumbers', 'plumbing', 1200], ['Stima Bora Electricals', 'electrical', 1100], ['Fundi wa Kila Kitu', 'general', 800], ['Nairobi Lock & Key', 'locksmith', 1500]],
  notes: ['Tafadhali piga simu kabla ya kuja.', 'Askari has the spare key.', 'Niko nyumbani baada ya saa kumi na mbili jioni.'],
  energyLabels: null,
  valuation: 'assessment',
  transfers: ['mobile', 'mobile', 'mobile', 'bank_transfer'],
  debit: 'Standing order',
}
