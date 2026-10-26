import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const il: Locale = {
  country: 'IL',
  currency: 'ILS',
  given: {
    f: [['נועה', 'Noa'], ['תמר', 'Tamar'], ['מאיה', 'Maya'], ['יעל', 'Yael'], ['שירה', 'Shira'], ['אביגיל', 'Avigail'], ['ליאת', 'Liat']],
    m: [['איתי', 'Itai'], ['יונתן', 'Yonatan'], ['עומר', 'Omer'], ['אורי', 'Uri'], ['דניאל', 'Daniel'], ['אריאל', 'Ariel'], ['נדב', 'Nadav']],
  },
  surnames: [['כהן', 'Cohen'], ['לוי', 'Levi'], ['מזרחי', 'Mizrahi'], ['פרץ', 'Peretz'], ['ביטון', 'Biton'], ['אברהם', 'Avraham'], ['בן־דוד', 'Ben-David'], ['שפירא', 'Shapira']],
  travels: false,
  streets: ['רחוב דיזנגוף', 'שדרות רוטשילד', 'רחוב אבן גבירול', 'רחוב שינקין', 'רחוב בן יהודה', 'רחוב הרצל', 'שדרות ירושלים'],
  buildings: ['מגדלי הים', 'בית הכרמל', 'מגורי פלורנטין', 'בית רוטשילד', 'מגדל הצפון'],
  houseNumber: (rand) => String(int(rand, 1, 220)),
  phone: (rand) => `+972 5${pick(rand, ['0', '2', '3', '4', '8'])}-${digits(rand, 3)}-${digits(rand, 4)}`,
  iban: { country: 'IL', bban: (rand) => digits(rand, 19) },
  company: (surname) => `${surname} נכסים בע"מ`,
  pensionFund: (name) => `קרן הפנסיה ${name}`,
  housingAssociation: (name) => `שיכון ${name}`,
  vendors: [['אינסטלציה כהן', 'plumbing', 220], ['חשמל לוי ובניו', 'electrical', 210], ['מנעולן 24/7', 'locksmith', 260], ['שיפוצים ביטון', 'general', 160]],
  notes: ['נא להתקשר לפני ההגעה.', 'האינטרקום לא עובד.', 'אני בבית אחרי 17:00.'],
  energyLabels: null,
  valuation: 'assessment',
  transfers: ['bank_transfer', 'card', 'mobile'],
  debit: 'הוראת קבע',
}
