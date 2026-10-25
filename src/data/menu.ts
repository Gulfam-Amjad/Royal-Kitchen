export type MenuItem = {
  id: string
  name: string
  price: number
  fromPrice?: boolean
  description: string
  image?: string
  badge?: string
}

export type MenuCategory = {
  id: string
  label: string
  items: MenuItem[]
}

export const KOTA_INGREDIENTS = [
  { id: 'atchar', label: 'Atchar', color: '#F2A93B', base: true },
  { id: 'polony', label: 'Polony', color: '#E88A8A', base: true },
  { id: 'vienna', label: 'Vienna', color: '#C8553D', base: true },
  { id: 'cheese', label: 'Cheese', color: '#FFD23F' },
  { id: 'russian', label: 'Russian', color: '#A4262C' },
  { id: 'egg', label: 'Egg', color: '#FFF4D6' },
  { id: 'patty', label: 'Patty', color: '#5C3317' },
] as const

export type IngredientId = (typeof KOTA_INGREDIENTS)[number]['id']

/** Real price tiers from the Royal Kitchen menu board. Each tier adds one ingredient. */
export const KOTA_TIERS: { price: number; adds: IngredientId | null }[] = [
  { price: 25, adds: null },
  { price: 27, adds: 'cheese' },
  { price: 30, adds: 'russian' },
  { price: 35, adds: 'egg' },
  { price: 40, adds: 'patty' },
]
export const menu: MenuCategory[] = [
  {
    id: 'kotas',
    label: 'Kotas',
    items: [
      { id: 'kota-25', name: 'The Classic', price: 25, description: 'Atchar, polony, vienna and chips in a fresh quarter loaf.' },
      { id: 'kota-27', name: 'The Cheesy', price: 27, description: 'Atchar, polony, vienna, chips and melted cheese.' },
      { id: 'kota-30', name: 'The Russian', price: 30, description: 'Atchar, polony, vienna, cheese and a juicy russian.', badge: 'Popular' },
      { id: 'kota-35', name: 'The Eggcellent', price: 35, description: 'Atchar, polony, vienna, cheese, russian and a fried egg.' },
      { id: 'kota-40', name: 'The Royal', price: 40, description: 'The full house: atchar, polony, vienna, cheese, russian, egg and a beef patty.', badge: 'King size' },
    ],
  },
  {
    id: 'chips',
    label: 'Chips',
    items: [
      { id: 'chips-small', name: 'Small Chips', price: 25, description: 'Golden, crispy and salted just right.' },
      { id: 'chips-large', name: 'Large Chips', price: 40, description: 'A proper share-size portion. Add your favourite sauce.', badge: 'Share' },
    ],
  },
  {
    id: 'specials',
    label: 'Specials',
    items: [
      { id: 'sephatlo', name: 'Sephatlo (Kota)', price: 20, fromPrice: true, description: 'The township original. Build it your way.' },
      { id: 'dagwood', name: 'Dagwood', price: 40, fromPrice: true, description: 'Triple-decker toasted sandwich stacked with patty, egg and cheese.', badge: 'Stacked' },
      { id: 'mogodu', name: 'Mogodu', price: 60, fromPrice: true, description: 'Slow-cooked tripe the way Mama makes it. Thursdays only.', badge: 'Thursday' },
      { id: 'ngatha', name: 'Ngatha', price: 60, fromPrice: true, description: 'Tender, saucy cow heels cooked low and slow. Fridays only.', badge: 'Friday' },
    ],
  },
]

export const bestsellers: MenuItem[] = [
  {
    id: 'kota-40',
    name: 'The Royal Kota',
    price: 40,
    description: 'Loaded quarter loaf with russian, cheese, egg and patty, grilled cheese crown.',
    image: 'kota',
    badge: 'No.1 seller',
  },
  {
    id: 'loaded-chips',
    name: 'Loaded Russian Chips',
    price: 40,
    description: 'Large chips topped with sliced russian, cheese sauce and BBQ drizzle.',
    image: 'loaded-chips',
    badge: 'Hot',
  },
  {
    id: 'dagwood',
    name: 'Double Dagwood',
    price: 40,
    fromPrice: true,
    description: 'Toasted triple-decker with double patty, melted cheese and house sauce.',
    image: 'burger',
    badge: 'Stacked',
  },
  {
    id: 'toasted-combo',
    name: 'Toastie & Chips',
    price: 40,
    fromPrice: true,
    description: 'Golden toasted sandwiches served with a generous side of chips.',
    image: 'sandwiches',
  },
]

export const weeklySpecials = [
  {
    id: 'mogodu',
    name: 'Mogodu',
    day: 4,
    dayLabel: 'Thursday',
    price: 60,
    image: 'mogodu',
    description: 'Slow-simmered tripe served with soft pap and chakalaka. A Thursday tradition.',
  },
  {
    id: 'ngatha',
    name: 'Ngatha',
    day: 5,
    dayLabel: 'Friday',
    price: 60,
    image: 'ngatha',
    description: 'Fall-off-the-bone cow heels in a rich, peppery gravy. The perfect Friday treat.',
  },
]
