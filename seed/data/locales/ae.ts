import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const ae: Locale = {
  country: 'AE',
  currency: 'AED',
  given: {
    f: [['فاطمة', 'Fatima'], ['مريم', 'Maryam'], ['نورة', 'Noura'], ['عائشة', 'Aisha'], ['شيخة', 'Sheikha'], ['ريم', 'Reem'], ['لطيفة', 'Latifa']],
    m: [['محمد', 'Mohammed'], ['أحمد', 'Ahmed'], ['خالد', 'Khalid'], ['سلطان', 'Sultan'], ['حمدان', 'Hamdan'], ['يوسف', 'Yousef'], ['عبدالله', 'Abdullah']],
  },
  surnames: [['الحمادي', 'Al Hammadi'], ['المنصوري', 'Al Mansoori'], ['الشامسي', 'Al Shamsi'], ['الكعبي', 'Al Kaabi'], ['النعيمي', 'Al Nuaimi'], ['البلوشي', 'Al Balushi'], ['المهيري', 'Al Muhairi']],
  travels: false,
  streets: ['شارع الوصل', 'شارع الشيخ زايد', 'شارع الجميرا', 'شارع المنخول', 'شارع الثنية', 'شارع الصفا'],
  buildings: ['برج الندى', 'أبراج المرسى', 'مساكن الواحة', 'برج اللؤلؤة', 'فلل الصفا'],
  houseNumber: (rand) => (rand() < 0.4 ? `فيلا ${int(rand, 1, 80)}` : String(int(rand, 1, 400))),
  phone: (rand) => `+971 5${pick(rand, ['0', '2', '5', '6'])} ${digits(rand, 3)} ${digits(rand, 4)}`,
  iban: { country: 'AE', bban: (rand) => digits(rand, 19) },
  company: (surname) => `شركة ${surname} العقارية ذ.م.م`,
  pensionFund: (name) => `صندوق معاشات ${name}`,
  housingAssociation: (name) => `جمعية ${name} للإسكان`,
  vendors: [['الواحة للأعمال الصحية', 'plumbing', 140], ['نور للكهرباء', 'electrical', 130], ['تبريد الصحراء', 'heating', 160], ['خدمات الصيانة الشاملة', 'general', 95]],
  notes: ['يرجى الاتصال قبل الحضور.', 'المكيف لا يعمل والجو حار جدًا 🥵', 'متواجد بعد الساعة ٥ مساءً.'],
  energyLabels: null,
  valuation: 'assessment',
  transfers: ['bank_transfer', 'card'],
  debit: 'UAEDDS',
}
