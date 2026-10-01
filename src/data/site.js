/**
 * Business details used across the site (navbar, footer, contact page, WhatsApp links).
 * PLACEHOLDERS — replace with FitRich Masale's real contact information before launch.
 */
export const site = {
  name: 'FitRich Masale',
  tagline: 'Bringing Authentic Flavours to Every Kitchen.',
  url: 'https://fitrichmasale.com',
  phone: '+91 89791 62111',
  phoneHref: 'tel:+918979162111',
  email: 'hello@fitrichmasale.com',
  // Digits only, with country code, no "+" — used for wa.me links.
  whatsapp: '918979162111',
  address: {
    line1: 'FitRich Masale',
    line2: 'Industrial Area, Phase II',
    city: 'Indore, Madhya Pradesh',
    country: 'India',
  },
  hours: 'Mon – Sat, 10:00 AM – 6:00 PM',
  social: {
    instagram: 'https://instagram.com/',
    facebook: 'https://facebook.com/',
    youtube: 'https://youtube.com/',
  },
}

export function whatsappLink(message = 'Hello FitRich Masale, I would like to know more about your products.') {
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(message)}`
}

export const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/products', label: 'Our Products' },
  { to: '/about', label: 'About Us' },
  { to: '/contact', label: 'Contact' },
]
