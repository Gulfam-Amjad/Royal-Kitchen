export type Review = {
  name: string
  initials: string
  rating: number
  meta: string
  text: string
}

export const reviews: Review[] = [
  {
    name: 'Lebogang Tiego',
    initials: 'LT',
    rating: 5,
    meta: 'Google review',
    text: 'Best services and quality kota in Madiba Park. Highly recommend.',
  },
  {
    name: 'Prince',
    initials: 'P',
    rating: 5,
    meta: 'Google review · Take out',
    text: 'TOP TIER.',
  },
]
