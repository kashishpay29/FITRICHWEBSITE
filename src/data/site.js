/**
 * Business details used across the site (navbar, footer, contact page, WhatsApp links).
 * Email, hours and social links are still PLACEHOLDERS — replace before launch.
 */
export const site = {
  name: 'FitRich Masale',
  tagline: 'Bringing Authentic Flavours to Every Kitchen.',
  url: 'https://fitrichmasale.com',
  // First number is the primary one shown in the navbar.
  phones: [
    { display: '+91 84339 06345', href: 'tel:+918433906345' },
    { display: '+91 89791 62111', href: 'tel:+918979162111' },
  ],
  email: 'hello@fitrichmasale.com',
  // Digits only, with country code, no "+" — used for wa.me links.
  whatsapp: '918979162111',
  address: {
    line1: '76/82, Sabji Mandi',
    line2: 'Govind Ganj Sabji Mandi, Holi Gate',
    city: 'Mathura, Uttar Pradesh 281001',
    country: 'India',
  },
  hours: 'Mon – Sat, 10:00 AM – 6:00 PM',
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
  },
}

export const primaryPhone = site.phones[0]

export const fullAddress = [site.address.line1, site.address.line2, site.address.city, site.address.country].join(', ')

export function whatsappLink(message = 'Hello FitRich Masale, I would like to know more about your products.') {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Our Products' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]
