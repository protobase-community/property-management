import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const india: Locale = {
  country: 'IN',
  currency: 'INR',
  given: {
    f: [['प्रिया', 'Priya'], ['अनन्या', 'Ananya'], ['स्नेहा', 'Sneha'], 'Kavya', 'Lakshmi', 'Divya', 'Meenakshi', ['पूजा', 'Pooja'], 'Aishwarya', 'Fatima'],
    m: [['राहुल', 'Rahul'], ['अर्जुन', 'Arjun'], ['विक्रम', 'Vikram'], 'Karthik', 'Siddharth', 'Venkatesh', 'Imran', ['आदित्य', 'Aditya'], 'Harpreet', 'Rohan'],
  },
  surnames: [['शर्मा', 'Sharma'], ['वर्मा', 'Verma'], ['गुप्ता', 'Gupta'], 'Iyer', 'Reddy', 'Nair', 'Krishnamurthy', ['देशमुख', 'Deshmukh'], 'Singh', 'D\'Souza', 'Banerjee', ['कुलकर्णी', 'Kulkarni'], 'Shaikh', 'Venkataraman'],
  travels: true,
  streets: ['Linking Road', 'Hill Road', 'Carter Road', 'Marine Drive', 'S.V. Road', 'लोखंडवाला कॉम्प्लेक्स रोड'],
  buildings: ['Sea Breeze CHS', 'Shanti Kunj Apartments', 'Sai Krupa Residency', 'गुलमोहर सोसाइटी'],
  numberFirst: true,
  houseNumber: (rand) => (rand() < 0.5 ? `Flat ${int(rand, 1, 18)}0${int(rand, 1, 6)}` : `#${int(rand, 1, 900)}`),
  phone: (rand) => `+91 ${pick(rand, ['98', '99', '97', '70', '81'])}${digits(rand, 3)} ${digits(rand, 5)}`,
  iban: null,
  company: (surname) => `${surname} Estates Pvt. Ltd.`,
  pensionFund: (name) => `${name} Employees' Provident Trust`,
  housingAssociation: (name) => `${name} Co-operative Housing Society Ltd.`,
  vendors: [['Shree Ganesh Plumbing Works', 'plumbing', 450], ['Bright Spark Electricals', 'electrical', 420], ['Pest-Free Solutions', 'pest_control', 600], ['QuickFix Home Services', 'general', 350]],
  notes: ['कृपया आने से पहले फ़ोन करें।', 'Watchman has the key.', 'Please come after 6 pm, office hours till then 🙏', 'पानी की टंकी से रिसाव हो रहा है।'],
  energyLabels: null,
  valuation: 'assessment',
  transfers: ['mobile', 'mobile', 'bank_transfer'],
  debit: 'NACH',
}
