import { digits, int } from '../../rng'
import type { Locale } from '../locale'

export const mx: Locale = {
  country: 'MX',
  currency: 'MXN',
  given: {
    f: ['Ximena', 'Valentina', 'Guadalupe', 'Itzel', 'Renata', 'Mariana', 'Citlali', 'Fernanda', 'Xóchitl', 'Daniela'],
    m: ['Santiago', 'Mateo', 'Emiliano', 'Diego', 'José Luis', 'Leonardo', 'Cuauhtémoc', 'Rodrigo', 'Joaquín', 'Iker'],
  },
  surnames: ['Hernández', 'García', 'Martínez', 'López', 'González', 'Pérez', 'Sánchez', 'Ramírez', 'Cruz', 'Ortiz Núñez', 'Xicoténcatl', 'Domínguez'],
  travels: true,
  streets: ['Avenida Álvaro Obregón', 'Calle Colima', 'Avenida Amsterdam', 'Calle Durango', 'Avenida Insurgentes Sur', 'Calle Tonalá', 'Calle Morelos'],
  buildings: ['Residencial Condesa', 'Torre Reforma Sur', 'Departamentos Roma Norte', 'Conjunto Jacarandas', 'Edificio Ermita'],
  houseNumber: (rand) => `${int(rand, 1, 400)}${rand() < 0.5 ? `, Depto. ${int(rand, 1, 8)}0${int(rand, 1, 4)}` : ''}`,
  phone: (rand) => `+52 ${rand() < 0.6 ? '55' : '33'} ${digits(rand, 4)} ${digits(rand, 4)}`,
  iban: null,
  company: (surname) => `Inmobiliaria ${surname} S.A. de C.V.`,
  pensionFund: (name) => `Fondo de Pensiones ${name}`,
  housingAssociation: (name) => `Cooperativa de Vivienda ${name}`,
  vendors: [['Plomería Hernández', 'plumbing', 280], ['Electricistas del Valle', 'electrical', 260], ['Cerrajería La Llave de Oro', 'locksmith', 350], ['Mantenimiento Integral Cruz', 'general', 200]],
  notes: ['Por favor llamar antes de venir.', 'El portero tiene la llave.', 'Estoy en casa después de las 6 pm.', '¡Gracias! 🙏'],
  energyLabels: null,
  valuation: 'assessment',
  transfers: ['bank_transfer', 'card', 'card'],
  debit: 'Domiciliación',
}
