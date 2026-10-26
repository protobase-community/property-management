import { digits, int } from '../../rng'
import type { Locale } from '../locale'

export const gr: Locale = {
  country: 'GR',
  currency: 'EUR',
  given: {
    f: [['Ελένη', 'Eleni'], ['Μαρία', 'Maria'], ['Κατερίνα', 'Katerina'], ['Σοφία', 'Sofia'], ['Δέσποινα', 'Despoina'], ['Αθηνά', 'Athina'], ['Ευαγγελία', 'Evangelia'], ['Χριστίνα', 'Christina']],
    m: [['Γιώργος', 'Giorgos'], ['Δημήτρης', 'Dimitris'], ['Νίκος', 'Nikos'], ['Κώστας', 'Kostas'], ['Παναγιώτης', 'Panagiotis'], ['Σπύρος', 'Spyros'], ['Θανάσης', 'Thanasis'], ['Βασίλης', 'Vasilis']],
  },
  surnames: [
    { m: ['Παπαδόπουλος', 'Papadopoulos'], f: ['Παπαδοπούλου', 'Papadopoulou'] }, { m: ['Οικονόμου', 'Oikonomou'], f: ['Οικονόμου', 'Oikonomou'] },
    { m: ['Γεωργίου', 'Georgiou'], f: ['Γεωργίου', 'Georgiou'] }, { m: ['Νικολαΐδης', 'Nikolaidis'], f: ['Νικολαΐδου', 'Nikolaidou'] },
    { m: ['Μακρής', 'Makris'], f: ['Μακρή', 'Makri'] }, { m: ['Αθανασίου', 'Athanasiou'], f: ['Αθανασίου', 'Athanasiou'] },
    { m: ['Χριστοδούλου', 'Christodoulou'], f: ['Χριστοδούλου', 'Christodoulou'] }, { m: ['Κωνσταντινίδης', 'Konstantinidis'], f: ['Κωνσταντινίδου', 'Konstantinidou'] },
  ],
  travels: false,
  streets: ['Οδός Ερμού', 'Λεωφόρος Αλεξάνδρας', 'Οδός Σκουφά', 'Οδός Αιόλου', 'Λεωφόρος Συγγρού', 'Οδός Τσακάλωφ', 'Οδός Καλλιδρομίου', 'Οδός Μιχαλακοπούλου'],
  buildings: ['Πολυκατοικία Ακρόπολις', 'Κατοικίες Λυκαβηττού', 'Μέγαρο Αθηνά', 'Οικία Πλάκας'],
  houseNumber: (rand) => String(int(rand, 1, 120)),
  phone: (rand) => `+30 69${digits(rand, 1)} ${digits(rand, 3)} ${digits(rand, 4)}`,
  iban: { country: 'GR', bban: (rand) => digits(rand, 23) },
  company: (surname) => `${surname} Ακίνητα Α.Ε.`,
  pensionFund: (name) => `Ταμείο Συντάξεων ${name}`,
  housingAssociation: (name) => `Οικοδομικός Συνεταιρισμός ${name}`,
  vendors: [['Υδραυλικές Εργασίες Μακρής', 'plumbing', 35], ['Ηλεκτρολογικά Γεωργίου', 'electrical', 33], ['Κλειδαράς Αθηνών', 'locksmith', 45], ['Τεχνική Συντήρηση Οικονόμου', 'general', 28]],
  notes: ['Παρακαλώ τηλεφωνήστε πριν έρθετε.', 'Το κουδούνι δεν λειτουργεί.', 'Είμαι σπίτι μετά τις 17:00.'],
  energyLabels: 'eu',
  valuation: 'assessment',
  transfers: ['bank_transfer', 'card'],
  debit: 'SEPA',
}
