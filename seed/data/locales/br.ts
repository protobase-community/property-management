import { digits, int } from '../../rng'
import type { Locale } from '../locale'

export const br: Locale = {
  country: 'BR',
  currency: 'BRL',
  given: {
    f: ['Maria Eduarda', 'Ana Júlia', 'Letícia', 'Beatriz', 'Giovanna', 'Luíza', 'Conceição', 'Thaís', 'Vitória', 'Raíssa'],
    m: ['João Pedro', 'Luiz Henrique', 'Gustavo', 'Thiago', 'Caio', 'Sebastião', 'Vinícius', 'Otávio', 'Kauã', 'Antônio'],
  },
  surnames: ['da Silva', 'dos Santos', 'Oliveira', 'Souza', 'Rodrigues', 'Ferreira', 'Araújo', 'Gonçalves', 'Assunção', 'Nascimento', 'Magalhães', 'dos Santos Oliveira', 'Conceição', 'Watanabe'],
  travels: true,
  streets: ['Rua Augusta', 'Avenida Paulista', 'Rua Oscar Freire', 'Rua Harmonia', 'Alameda Santos', 'Rua da Consolação', 'Avenida Brigadeiro Faria Lima', 'Rua Fradique Coutinho'],
  buildings: ['Edifício Copan', 'Residencial Jardins', 'Condomínio Vila Madalena', 'Edifício Ipê Amarelo', 'Residencial Pinheiros'],
  houseNumber: (rand) => `${int(rand, 1, 3200)}${rand() < 0.5 ? `, apto ${int(rand, 1, 22)}${int(rand, 0, 4)}` : ''}`,
  phone: (rand) => `+55 11 9${digits(rand, 4)}-${digits(rand, 4)}`,
  iban: null,
  company: (surname) => `${surname} Imóveis Ltda.`,
  pensionFund: (name) => `Fundação de Previdência ${name}`,
  housingAssociation: (name) => `Cooperativa Habitacional ${name}`,
  vendors: [['Hidráulica São Jorge', 'plumbing', 120], ['Elétrica Araújo', 'electrical', 110], ['Chaveiro 24 Horas Paulista', 'locksmith', 150], ['Faz Tudo Reformas', 'general', 85]],
  notes: ['Favor ligar antes de vir.', 'O porteiro tem a chave.', 'Estou em casa depois das 18h.', 'Obrigada! 😊'],
  energyLabels: null,
  valuation: 'assessment',
  transfers: ['mobile', 'mobile', 'bank_transfer'],
  debit: 'Débito automático',
}
