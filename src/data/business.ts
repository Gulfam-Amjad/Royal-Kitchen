export const business = {
  name: 'Royal Kitchen',
  tagline: 'World of Flavours',
  address: {
    street: '161 Madiba Street',
    area: 'Madiba Park',
    city: 'Polokwane',
    postalCode: '0699',
    country: 'South Africa',
  },
  geo: { lat: -23.8613523, lng: 29.4016857 },
  phones: {
    primary: { display: '083 694 1299', intl: '+27836941299' },
    secondary: { display: '066 075 9173', intl: '+27660759173' },
  },
  whatsapp: '27836941299',
  rating: 4.8,
  reviewCount: 5,
  mapsUrl:
    'https://www.google.com/maps/place/Royal+Kitchen/@-23.8613523,29.4016857,17z/data=!4m6!3m5!1s0x1ec727ad5cc0bb21:0x8aaf361d5b2ab4d0!8m2!3d-23.8613523!4d29.4016857!16s%2Fg%2F11vlg5g9s8',
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=-23.8613523,29.4016857',
  embedUrl: 'https://www.google.com/maps?q=-23.8613523,29.4016857&z=16&output=embed',
} as const

/** Opening hours in minutes after midnight, indexed by JS day (0 = Sunday). South African time. */
export const hours: { day: string; short: string; open: number; close: number }[] = [
  { day: 'Sunday', short: 'Sun', open: 9 * 60, close: 19 * 60 },
  { day: 'Monday', short: 'Mon', open: 9 * 60, close: 20 * 60 },
  { day: 'Tuesday', short: 'Tue', open: 9 * 60, close: 20 * 60 },
  { day: 'Wednesday', short: 'Wed', open: 9 * 60, close: 20 * 60 },
  { day: 'Thursday', short: 'Thu', open: 9 * 60, close: 20 * 60 },
  { day: 'Friday', short: 'Fri', open: 8 * 60, close: 20 * 60 },
  { day: 'Saturday', short: 'Sat', open: 8 * 60 + 30, close: 20 * 60 + 30 },
]

export const formatTime = (mins: number) => {
  const h = Math.floor(mins / 60)
  const m = mins % 60
  const suffix = h >= 12 ? 'PM' : 'AM'
  const h12 = h % 12 === 0 ? 12 : h % 12
  return `${h12}${m ? `:${String(m).padStart(2, '0')}` : ''} ${suffix}`
}

export const whatsappLink = (text: string) =>
  `https://wa.me/${business.whatsapp}?text=${encodeURIComponent(text)}`
