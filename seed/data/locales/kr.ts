import { digits, int } from '../../rng'
import type { Locale } from '../locale'

export const kr: Locale = {
  country: 'KR',
  currency: 'KRW',
  given: {
    f: [['서연', 'Seoyeon'], ['지우', 'Jiwoo'], ['하은', 'Haeun'], ['민지', 'Minji'], ['수빈', 'Subin'], ['은정', 'Eunjeong']],
    m: [['민준', 'Minjun'], ['서준', 'Seojun'], ['도윤', 'Doyun'], ['지훈', 'Jihoon'], ['현우', 'Hyunwoo'], ['성민', 'Seongmin']],
  },
  surnames: [['김', 'Kim'], ['이', 'Lee'], ['박', 'Park'], ['최', 'Choi'], ['정', 'Jung'], ['강', 'Kang'], ['윤', 'Yoon'], ['장', 'Jang']],
  travels: false,
  familyFirst: true,
  streets: ['테헤란로', '올림픽로', '압구정로', '연희로', '을지로', '왕십리로', '월드컵북로', '이태원로'],
  buildings: ['래미안 서초', '자이 마포', '한강 리버뷰', '연희 하우스', '푸르지오 왕십리'],
  houseNumber: (rand) => String(int(rand, 1, 480)),
  phone: (rand) => `+82 10-${digits(rand, 4)}-${digits(rand, 4)}`,
  iban: null,
  company: (surname) => `${surname}부동산 주식회사`,
  pensionFund: (name) => `${name} 연금기금`,
  housingAssociation: (name) => `${name} 주택조합`,
  vendors: [['한강 설비', 'plumbing', 70000], ['서울 전기공사', 'electrical', 65000], ['24시 열쇠', 'locksmith', 80000], ['만능 집수리', 'general', 50000]],
  notes: ['방문 전에 전화 주세요.', '저녁 7시 이후에 집에 있습니다.', '경비실에 열쇠 맡겨 두었어요.'],
  energyLabels: null,
  valuation: 'assessment',
  transfers: ['bank_transfer', 'card', 'mobile'],
  debit: 'CMS',
}
