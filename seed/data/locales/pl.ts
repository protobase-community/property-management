import { digits, int } from '../../rng'
import type { Locale } from '../locale'

export const pl: Locale = {
  country: 'PL',
  currency: 'PLN',
  given: {
    f: ['Zofia', 'Małgorzata', 'Agnieszka', 'Katarzyna', 'Łucja', 'Joanna', 'Weronika', 'Bożena', 'Alicja', 'Grażyna'],
    m: ['Jakub', 'Łukasz', 'Paweł', 'Grzegorz', 'Michał', 'Wojciech', 'Przemysław', 'Mikołaj', 'Bartłomiej', 'Szymon'],
  },
  surnames: [{ m: 'Kowalski', f: 'Kowalska' }, { m: 'Wiśniewski', f: 'Wiśniewska' }, { m: 'Wójcik', f: 'Wójcik' }, { m: 'Kamiński', f: 'Kamińska' }, { m: 'Lewandowski', f: 'Lewandowska' }, { m: 'Zieliński', f: 'Zielińska' }, { m: 'Szymański', f: 'Szymańska' }, { m: 'Dąbrowski', f: 'Dąbrowska' }, { m: 'Woźniak', f: 'Woźniak' }, { m: 'Brzęczyszczykiewicz', f: 'Brzęczyszczykiewicz' }],
  travels: true,
  streets: ['ulica Floriańska', 'ulica Józefa', 'ulica Krakowska', 'aleja Mickiewicza', 'ulica Długa', 'ulica Świętego Wawrzyńca', 'ulica Zabłocie', 'ulica Kazimierza Wielkiego', 'ulica Grzegórzecka'],
  buildings: ['Apartamenty Wawel', 'Osiedle Zielone Wzgórze', 'Kamienica pod Lwem', 'Rezydencja Kazimierz', 'Nowe Zabłocie'],
  houseNumber: (rand) => (rand() < 0.4 ? `${int(rand, 1, 90)}/${int(rand, 1, 40)}` : String(int(rand, 1, 120))),
  phone: (rand) => `+48 ${digits(rand, 3)} ${digits(rand, 3)} ${digits(rand, 3)}`,
  iban: { country: 'PL', bban: (rand) => digits(rand, 24) },
  company: (surname) => `${surname} Nieruchomości Sp. z o.o.`,
  pensionFund: (name) => `Fundusz Emerytalny ${name}`,
  housingAssociation: (name) => `Spółdzielnia Mieszkaniowa „${name}”`,
  vendors: [['Hydraulika Wiśniewski', 'plumbing', 120], ['Elektro-Serwis Dąbrowski', 'electrical', 110], ['Usługi Remontowe Woźniak', 'general', 85], ['Ślusarz 24h Kraków', 'locksmith', 140]],
  notes: ['Proszę zadzwonić przed przyjściem.', 'Domofon nie działa.', 'Jestem w domu po 16:00.'],
  energyLabels: 'eu',
  valuation: 'assessment',
  transfers: ['bank_transfer', 'mobile', 'card'],
  debit: 'SEPA',
}
