import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const th: Locale = {
  country: 'TH',
  currency: 'THB',
  given: {
    f: [['สมหญิง', 'Somying'], ['พิมพ์ชนก', 'Phimchanok'], ['นภัสสร', 'Naphatsorn'], ['กัญญา', 'Kanya'], ['ศิริพร', 'Siriporn'], ['อรุณี', 'Arunee']],
    m: [['สมชาย', 'Somchai'], ['ธนากร', 'Thanakorn'], ['ณัฐวุฒิ', 'Nattawut'], ['อนุชา', 'Anucha'], ['วีระพงษ์', 'Weerapong'], ['ประเสริฐ', 'Prasert']],
  },
  surnames: [['ใจดี', 'Jaidee'], ['ศรีสวัสดิ์', 'Srisawat'], ['วงศ์สุวรรณ', 'Wongsuwan'], ['รัตนพันธ์', 'Rattanaphan'], ['บุญมา', 'Boonma'], ['แก้วประเสริฐ', 'Kaewprasert'], ['สุขสมบูรณ์', 'Suksomboon']],
  travels: false,
  numberFirst: true,
  streets: ['ถนนสุขุมวิท', 'ถนนพระราม 4', 'ถนนสาทร', 'ซอยทองหล่อ', 'ถนนพหลโยธิน', 'ถนนเพชรบุรี', 'ซอยอารีย์'],
  buildings: ['บ้านสวนลุมพินี', 'เดอะ ริเวอร์ไซด์ เรสซิเดนซ์', 'คอนโดอารีย์ปาร์ค', 'ทองหล่อ ทาวเวอร์', 'ศุภาลัย การ์เด้นวิลล์'],
  houseNumber: (rand) => `${int(rand, 1, 999)}/${int(rand, 1, 99)}`,
  phone: (rand) => `+66 ${pick(rand, ['8', '9', '6'])}${digits(rand, 1)} ${digits(rand, 3)} ${digits(rand, 4)}`,
  iban: null,
  company: (surname) => `บริษัท ${surname} พร็อพเพอร์ตี้ จำกัด`,
  pensionFund: (name) => `กองทุนสำรองเลี้ยงชีพ ${name}`,
  housingAssociation: (name) => `สหกรณ์เคหสถาน ${name} จำกัด`,
  vendors: [['ช่างประปาบุญมา', 'plumbing', 350], ['ไฟฟ้าวงศ์สุวรรณ', 'electrical', 330], ['แอร์เย็นเซอร์วิส', 'heating', 400], ['ช่างซ่อมบ้านใจดี', 'general', 250]],
  notes: ['กรุณาโทรก่อนมา', 'ฝากกุญแจไว้ที่นิติบุคคล', 'อยู่บ้านหลัง 18:00 น. ค่ะ 🙏'],
  energyLabels: null,
  valuation: 'assessment',
  transfers: ['mobile', 'mobile', 'bank_transfer'],
  debit: 'Direct Debit',
}
