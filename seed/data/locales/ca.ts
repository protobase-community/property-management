import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const ca: Locale = {
  country: 'CA',
  currency: 'CAD',
  given: {
    f: ['Emily', 'Charlotte', 'Avneet', 'Mackenzie', 'Leah', 'Jasleen', 'Maya', 'Zoë', 'Abigail', 'Hana'],
    m: ['Liam', 'Jacob', 'Logan', 'Gurpreet', 'Owen', 'Tariq', 'Wei', 'Nathan', 'Connor', 'Ravi'],
  },
  surnames: ['Smith', 'MacDonald', 'Tremblay', 'Singh', 'Chen', 'Wong', 'Campbell', 'Brar', 'Wilson', 'Leblanc', 'Grewal', 'Nakamura'],
  travels: true,
  numberFirst: true,
  streets: ['Queen Street West', 'Ossington Avenue', 'Danforth Avenue', 'Roncesvalles Avenue', 'Bathurst Street', 'Dundas Street East', 'Kingston Road'],
  buildings: ['The Ossington Lofts', 'Harbourfront Residences', 'Maple Leaf Gardens Condos', 'The Brickworks', 'Cabbagetown Commons'],
  houseNumber: (rand) => (rand() < 0.5 ? `${int(rand, 1, 30)}0${int(rand, 1, 9)}-${int(rand, 10, 900)}` : String(int(rand, 1, 1400))),
  phone: (rand) => `+1 ${pick(rand, ['416', '647', '437'])}-555-01${digits(rand, 2)}`,
  iban: null,
  company: (surname) => `${surname} Properties Inc.`,
  pensionFund: (name) => `${name} Pension Plan`,
  housingAssociation: (name) => `${name} Housing Co-operative Inc.`,
  vendors: [['True North Plumbing', 'plumbing', 105], ['Maple Electric Ltd.', 'electrical', 98], ['Polar Furnace & HVAC', 'heating', 115], ['Northern Handyman Services', 'general', 70]],
  notes: ['Please call before coming.', 'Buzz 1104 at the front door.', 'Home after 6.', 'Furnace is out and it\'s -20 ❄️'],
  energyLabels: null,
  valuation: 'assessment',
  transfers: ['bank_transfer', 'card'],
  debit: 'PAD',
}
