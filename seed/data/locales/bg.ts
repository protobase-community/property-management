import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const bg: Locale = {
  country: 'BG',
  currency: 'EUR',
  given: {
    f: [['Мария', 'Maria'], ['Десислава', 'Desislava'], ['Цветелина', 'Tsvetelina'], ['Радостина', 'Radostina'], ['Йорданка', 'Yordanka'], ['Гергана', 'Gergana'], ['Виктория', 'Viktoria']],
    m: [['Георги', 'Georgi'], ['Христо', 'Hristo'], ['Стоян', 'Stoyan'], ['Явор', 'Yavor'], ['Цветан', 'Tsvetan'], ['Божидар', 'Bozhidar'], ['Любомир', 'Lyubomir']],
  },
  surnames: [
    { m: ['Иванов', 'Ivanov'], f: ['Иванова', 'Ivanova'] }, { m: ['Петров', 'Petrov'], f: ['Петрова', 'Petrova'] },
    { m: ['Георгиев', 'Georgiev'], f: ['Георгиева', 'Georgieva'] }, { m: ['Стоянов', 'Stoyanov'], f: ['Стоянова', 'Stoyanova'] },
    { m: ['Цветков', 'Tsvetkov'], f: ['Цветкова', 'Tsvetkova'] }, { m: ['Желязков', 'Zhelyazkov'], f: ['Желязкова', 'Zhelyazkova'] },
    { m: ['Шишков', 'Shishkov'], f: ['Шишкова', 'Shishkova'] },
  ],
  travels: false,
  streets: ['бул. Витоша', 'ул. Шишман', 'ул. Граф Игнатиев', 'бул. Васил Левски', 'ул. Оборище', 'ул. Цар Самуил', 'ж.к. Лозенец'],
  buildings: ['Жилищна сграда „Витоша“', 'Резиденция Лозенец', 'Комплекс „Изгрев“', 'Сграда „Оборище“'],
  houseNumber: (rand) => `№ ${int(rand, 1, 140)}${rand() < 0.3 ? `, вх. ${pick(rand, ['А', 'Б', 'В'])}` : ''}`,
  phone: (rand) => `+359 8${pick(rand, ['7', '8', '9'])} ${digits(rand, 3)} ${digits(rand, 4)}`,
  iban: { country: 'BG', bban: (rand) => `${pick(rand, ['BNBG', 'UNCR', 'STSA', 'FINV'])}${digits(rand, 6)}${digits(rand, 8)}` },
  company: (surname) => `${surname} Имоти ЕООД`,
  pensionFund: (name) => `Пенсионен фонд „${name}“`,
  housingAssociation: (name) => `Жилищна кооперация „${name}“`,
  vendors: [['ВиК Услуги Петров', 'plumbing', 22], ['Електро Стоянов', 'electrical', 21], ['Ключар Център', 'locksmith', 30], ['Майстор Иванов', 'general', 16]],
  notes: ['Моля, обадете се преди да дойдете.', 'Звънецът не работи.', 'Вкъщи съм след 18 ч.'],
  energyLabels: 'eu',
  valuation: 'assessment',
  transfers: ['bank_transfer', 'card'],
  debit: 'SEPA',
}
