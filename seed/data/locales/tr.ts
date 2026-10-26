import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const tr: Locale = {
  country: 'TR',
  currency: 'TRY',
  given: {
    f: ['Elif', 'Zeynep', 'Ayşe', 'Defne', 'Ebru', 'Gülşen', 'İpek', 'Şeyma', 'Özge', 'Çiğdem'],
    m: ['Mehmet', 'Mustafa', 'Emre', 'Burak', 'Oğuz', 'İsmail', 'Çağrı', 'Barış', 'Uğur', 'Doğan'],
  },
  surnames: ['Yılmaz', 'Kaya', 'Demir', 'Şahin', 'Çelik', 'Yıldız', 'Öztürk', 'Aydın', 'Özdemir', 'Arslan', 'Doğan', 'Kılıç', 'Çakır', 'Ağaoğlu'],
  travels: true,
  streets: ['İstiklal Caddesi', 'Bağdat Caddesi', 'Moda Caddesi', 'Şair Nefi Sokak', 'Kuzguncuk Bostan Sokak', 'Çukurcuma Caddesi', 'Akarsu Yokuşu', 'Şakayık Sokak'],
  buildings: ['Boğaziçi Rezidans', 'Moda Apartmanı', 'Lale Konakları', 'Kuzguncuk Evleri', 'Galata Loft'],
  houseNumber: (rand) => `No: ${int(rand, 1, 140)}${rand() < 0.5 ? ` D: ${int(rand, 1, 18)}` : ''}`,
  phone: (rand) => `+90 5${pick(rand, ['32', '35', '42', '05', '55'])} ${digits(rand, 3)} ${digits(rand, 2)} ${digits(rand, 2)}`,
  iban: { country: 'TR', bban: (rand) => `${digits(rand, 5)}0${digits(rand, 16)}` },
  company: (surname) => `${surname} Gayrimenkul A.Ş.`,
  pensionFund: (name) => `${name} Emeklilik Vakfı`,
  housingAssociation: (name) => `${name} Konut Yapı Kooperatifi`,
  vendors: [['Usta Tesisat Çelik', 'plumbing', 900], ['Işık Elektrik', 'electrical', 850], ['Kılıç Çilingir', 'locksmith', 1100], ['Ağaoğlu Tadilat', 'general', 650]],
  notes: ['Gelmeden önce lütfen arayın.', 'Kapıcıda anahtar var.', 'Akşam 18:00\'den sonra evdeyim.'],
  energyLabels: 'eu',
  valuation: 'assessment',
  transfers: ['bank_transfer', 'card'],
  debit: 'Otomatik ödeme',
}
