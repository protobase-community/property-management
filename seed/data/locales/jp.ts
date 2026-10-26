import { digits, int, pick } from '../../rng'
import type { Locale } from '../locale'

export const jp: Locale = {
  country: 'JP',
  currency: 'JPY',
  given: {
    f: [['美咲', 'Misaki'], ['陽菜', 'Hina'], ['結衣', 'Yui'], ['さくら', 'Sakura'], ['葵', 'Aoi'], ['真由美', 'Mayumi'], ['恵子', 'Keiko']],
    m: [['翔太', 'Shota'], ['大輝', 'Daiki'], ['蓮', 'Ren'], ['拓海', 'Takumi'], ['健一', 'Kenichi'], ['悠真', 'Yuma'], ['誠', 'Makoto']],
  },
  surnames: [['佐藤', 'Sato'], ['鈴木', 'Suzuki'], ['高橋', 'Takahashi'], ['田中', 'Tanaka'], ['渡辺', 'Watanabe'], ['伊藤', 'Ito'], ['山本', 'Yamamoto'], ['中村', 'Nakamura'], ['小林', 'Kobayashi'], ['長谷川', 'Hasegawa']],
  travels: false,
  familyFirst: true,
  streets: ['西新宿', '代々木', '中目黒', '高円寺南', '吉祥寺本町', '神楽坂', '三軒茶屋', '北千住', '月島'],
  buildings: ['グランメゾン西新宿', 'パークハイツ代々木', 'コーポ高円寺', 'メゾン・ド・神楽坂', 'レジデンス月島', 'ライオンズマンション三軒茶屋'],
  houseNumber: (rand) => `${int(rand, 1, 6)}-${int(rand, 1, 30)}-${int(rand, 1, 20)}`,
  phone: (rand) => `+81 ${pick(rand, ['90', '80', '70'])}-${digits(rand, 4)}-${digits(rand, 4)}`,
  iban: null,
  company: (surname) => `株式会社${surname}不動産`,
  pensionFund: (name) => `${name}企業年金基金`,
  housingAssociation: (name) => `${name}住宅協同組合`,
  vendors: [['水道屋さん東京', 'plumbing', 9000], ['株式会社タナカ電設', 'electrical', 8500], ['鍵の救急車 新宿店', 'locksmith', 11000], ['なんでも修理サービス', 'general', 6500]],
  notes: ['来る前に電話をお願いします。', '平日は19時以降なら在宅しています。', '管理人室に鍵を預けています。', 'よろしくお願いします 🙇'],
  energyLabels: null,
  valuation: 'assessment',
  transfers: ['bank_transfer', 'card'],
  debit: '口座振替',
}
