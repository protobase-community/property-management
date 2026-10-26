import { digits, int } from '../../rng'
import type { Locale } from '../locale'

export const fr: Locale = {
  country: 'FR',
  currency: 'EUR',
  given: {
    f: ['Léa', 'Chloé', 'Inès', 'Manon', 'Camille', 'Élodie', 'Anaïs', 'Maëlle', 'Océane', 'Yasmine', 'Hélène', 'Céline'],
    m: ['Hugo', 'Théo', 'Louis', 'Mathéo', 'Raphaël', 'Noé', 'Jérôme', 'François', 'Loïc', 'Karim', 'Benoît', 'Gaëtan'],
  },
  surnames: ['Martin', 'Bernard', 'Dubois', 'Lefèvre', 'Moreau', 'Laurent', 'Girard', 'Rousseau', 'Benali', 'Nguyễn', 'Lemaître', 'Faure', 'Mercier', 'de La Fontaine', 'Chevalier', 'Boucher-Lévesque'],
  travels: true,
  numberFirst: true,
  streets: ['rue Oberkampf', 'rue de Ménilmontant', 'boulevard Voltaire', 'rue du Faubourg Saint-Antoine', 'avenue Jean-Jaurès', 'rue des Martyrs', 'quai de Jemmapes', 'rue de la Roquette', 'rue Mouffetard'],
  buildings: ['Résidence Les Tilleuls', 'Le Clos Saint-Martin', 'Les Jardins de Belleville', 'Résidence Le Parc', 'Villa Émeraude'],
  houseNumber: (rand) => `${int(rand, 1, 160)}${rand() < 0.1 ? ' bis' : ''}`,
  phone: (rand) => `+33 6 ${digits(rand, 2)} ${digits(rand, 2)} ${digits(rand, 2)} ${digits(rand, 2)}`,
  iban: { country: 'FR', bban: (rand) => digits(rand, 23) },
  company: (surname) => `SCI ${surname}`,
  pensionFund: (name) => `Caisse de retraite ${name}`,
  housingAssociation: (name) => `Office HLM ${name}`,
  vendors: [['Plomberie Rousseau', 'plumbing', 62], ['Électricité Générale Mercier', 'electrical', 60], ['Serrurerie du Marais', 'locksmith', 85], ['Multiservices Benali', 'general', 45], ['Chauffage Lemaître & Fils', 'heating', 66]],
  notes: ['Merci d\'appeler avant de passer.', 'Digicode : demander par SMS.', 'Je suis là après 18 h.', 'C\'est urgent, l\'eau coule partout 💧'],
  energyLabels: 'eu',
  valuation: 'assessment',
  transfers: ['bank_transfer', 'card'],
  debit: 'SEPA',
}
