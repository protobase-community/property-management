import { digits, int } from '../../rng'
import type { Locale } from '../locale'

// Québec: Canada in French, the same currency and phone plan, its own names and streets.
export const qc: Locale = {
  country: 'CA',
  currency: 'CAD',
  given: {
    f: ['Émilie', 'Florence', 'Rosalie', 'Béatrice', 'Léonie', 'Geneviève', 'Maude', 'Noémie'],
    m: ['Félix', 'Étienne', 'Mathis', 'Jérémie', 'Olivier', 'Sébastien', 'Benoît', 'Xavier'],
  },
  surnames: ['Tremblay', 'Gagnon', 'Roy', 'Côté', 'Bouchard', 'Gauthier', 'Morin', 'Lavoie', 'Bélanger', 'Pelletier', 'Lévesque', 'St-Pierre'],
  travels: true,
  numberFirst: true,
  streets: ['rue Saint-Denis', 'boulevard Saint-Laurent', 'avenue du Mont-Royal', 'rue Sainte-Catherine Est', 'avenue Laurier Ouest', 'rue Ontario Est', 'rue Beaubien'],
  buildings: ['Le Plateau Lofts', 'Les Habitations Saint-Denis', 'Condos du Mile-End', 'Résidence Laurier', 'Le Triplex Fabre'],
  houseNumber: (rand) => (rand() < 0.4 ? `${int(rand, 1000, 9999)}, app. ${int(rand, 1, 12)}` : String(int(rand, 100, 9999))),
  phone: (rand) => `+1 514-555-01${digits(rand, 2)}`,
  iban: null,
  company: (surname) => `Immeubles ${surname} inc.`,
  pensionFund: (name) => `Régime de retraite ${name}`,
  housingAssociation: (name) => `Coopérative d'habitation ${name}`,
  vendors: [['Plomberie Gagnon & Fils', 'plumbing', 95], ['Électricité Côté inc.', 'electrical', 90], ['Serrurier Express Montréal', 'locksmith', 110], ['Rénovations St-Pierre', 'general', 65]],
  notes: ['Merci d\'appeler avant de venir.', 'Je suis là après 17 h.', 'Le concierge a la clé.'],
  energyLabels: null,
  valuation: 'assessment',
  transfers: ['bank_transfer', 'card'],
  debit: 'DPA',
}
