import { describe, expect, it } from 'vitest'
import { owners, properties, tenants, vendors } from './index'

type Checked = { recordSchema(): unknown }

// Whether one field of a resource takes the value, as a create or update checks it.
const takes = (resource: Checked, field: string, value: unknown) => {
  const shape = (resource.recordSchema() as { shape: Record<string, { safeParse(value: unknown): { success: boolean } }> }).shape
  return shape[field]!.safeParse(value).success
}

describe('international records', () => {
  it.each([
    'SW1A 2AA', 'EC1V 9LB', '10115', '75011', '1017 CT', '160-0023', '01310-200', 'D02 X285', 'M5V 2T6', '106 82',
    '30-059', '6120101', '400050', '10110', '10001-1234', 'H2X 1Y4', '2000', '00100',
  ])('takes the postal code %s', (code) => {
    expect(takes(properties, 'postal_code', code)).toBe(true)
  })

  it('takes a property without a postal code, as in the United Arab Emirates', () => {
    expect(takes(properties, 'postal_code', null)).toBe(true)
  })

  it.each(['', ' 1017', '1017 CT!', 'SW1A 2AA 2AA 2AA'])('refuses the postal code "%s"', (code) => {
    expect(takes(properties, 'postal_code', code)).toBe(false)
  })

  it.each([
    ['Ἀθηνᾶ', 'Παπαδοπούλου'], ['Сто́ян', 'Иванов'], ['محمد', 'الحمادي'], ['נועה', 'בן־דוד'], ['美咲', '田中'], ['지우', '김'],
    ['प्रिया', 'शर्मा'], ['สมชาย', 'ใจดี'], ['Siobhán', "Ó Briain"], ['Nguyễn Thị', 'Minh Khai'], ['', 'Sukarno'],
    ['Jean-Luc', 'Saint-Exupéry'], ['Zoë 🌻', "D'Souza"],
  ])('takes the tenant name %s %s', (first, last) => {
    expect(takes(tenants, 'first_name', first)).toBe(true)
    expect(takes(tenants, 'last_name', last)).toBe(true)
  })

  it.each(['+44 20 7946 0321', '(212) 555-0147', '+81 90-1234-5678', '+971 50 123 4567', '030 1234567', '+1 416-555-0199 ext. 204'])(
    'takes the phone number %s',
    (phone) => {
      expect(takes(tenants, 'phone', phone)).toBe(true)
      expect(takes(owners, 'phone', phone)).toBe(true)
      expect(takes(vendors, 'phone', phone)).toBe(true)
    },
  )

  it.each(['GB29NWBK60161331926819', 'GB29 NWBK 6016 1331 9268 19', 'DE89370400440532013000', 'NO9386011117947', 'IL620108000000099999999'])(
    'takes the IBAN %s',
    (iban) => {
      expect(takes(owners, 'iban', iban)).toBe(true)
      expect(takes(tenants, 'iban', iban)).toBe(true)
    },
  )

  it('takes no IBAN, for a bank in a country without them', () => {
    expect(takes(owners, 'iban', null)).toBe(true)
    expect(takes(tenants, 'iban', null)).toBe(true)
  })

  it('refuses an account number that is not an IBAN', () => {
    expect(takes(owners, 'iban', '021000021 123456789')).toBe(false)
  })

  it('takes country and currency codes, and refuses names', () => {
    expect(takes(properties, 'country', 'JP')).toBe(true)
    expect(takes(properties, 'currency', 'JPY')).toBe(true)
    expect(takes(properties, 'country', 'Japan')).toBe(false)
    expect(takes(properties, 'currency', '¥')).toBe(false)
  })
})
