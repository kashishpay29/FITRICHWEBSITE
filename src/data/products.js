/**
 * FitRich Masale — product catalog.
 *
 * This is the single source of truth for every product on the site: the catalog grid,
 * featured products on the homepage, product detail pages and related products all read
 * from here. To add, remove or edit a product, change this file only.
 *
 * Fields
 *  slug         URL segment: /products/<slug>
 *  name         Display name
 *  hindiName    Name in Devanagari (shown as a decorative accent)
 *  category     'Pure Spice' | 'Masala Blend'
 *  tagline      One-line hook shown on cards
 *  description  Short description for cards (1–2 sentences)
 *  story        Longer description for the detail page
 *  ingredients  Array of strings. Leave empty [] to hide the section.
 *               SAMPLE VALUES — replace with the ingredient list printed on each pack.
 *  usage        Array of usage suggestions
 *  dishes       Dish names that pair well (used as chips)
 *  packSizes    Array of strings, e.g. ['100 g', '200 g']. SAMPLE VALUES.
 *  image        Optional URL of a real packshot. If set it replaces the illustrated pack.
 *  photo        Key from images.js — a dish photo shown on the detail page
 *  pack         Colours for the illustrated pack: { base, band, powder, ink }
 *  featured     true → appears in "Featured Products" on the homepage
 */
export const products = [
  {
    slug: 'garam-masala',
    image: '/products/garam-masala.webp',
    name: 'Garam Masala',
    hindiName: 'गरम मसाला',
    category: 'Masala Blend',
    tagline: 'The warm heart of Indian cooking',
    description:
      'A fragrant, warming blend of whole spices, roasted and ground to finish curries, dals and gravies.',
    story:
      'Garam masala is the finishing touch that brings an Indian dish together. Our blend balances the sweet warmth of cinnamon and cardamom with the depth of cloves and black pepper, so a single pinch at the end of cooking lifts the aroma of the whole pot.',
    ingredients: ['Coriander', 'Cumin', 'Black Pepper', 'Cardamom', 'Cinnamon', 'Cloves', 'Bay Leaf', 'Nutmeg'],
    usage: [
      'Sprinkle half a teaspoon over curries and gravies in the last few minutes of cooking.',
      'Add to marinades for paneer and vegetables before grilling.',
      'Stir a pinch into dals and rajma for a deeper, rounder flavour.',
    ],
    dishes: ['Paneer Butter Masala', 'Chole', 'Dal Makhani'],
    packSizes: ['50 g', '100 g', '200 g', '500 g'],
    photo: 'paneerMakhani',
    pack: { base: '#5a4632', band: '#d4ab5c', powder: '#6b3b22', ink: '#fbf5ea' },
    featured: true,
  },
  {
    slug: 'turmeric-powder',
    image: '/products/turmeric-powder.webp',
    name: 'Turmeric Powder',
    hindiName: 'हल्दी',
    category: 'Pure Spice',
    tagline: 'Golden colour, earthy aroma',
    description:
      'Finely ground turmeric with a bright golden colour and an earthy aroma — the base of countless everyday dishes.',
    story:
      'Few spices are as essential to an Indian kitchen as haldi. Our turmeric is cleaned, dried and finely ground to give dals, sabzis and curries their familiar golden colour and gentle, earthy warmth.',
    ingredients: ['Turmeric'],
    usage: [
      'Add a quarter teaspoon to hot oil or ghee along with your tadka.',
      'Use in dals, khichdi and vegetable sabzis for colour and aroma.',
      'Mix into batters for pakoras and bhajiyas.',
    ],
    dishes: ['Dal Tadka', 'Aloo Gobi', 'Khichdi'],
    packSizes: ['100 g', '200 g', '500 g', '1 kg'],
    photo: 'dalTadka',
    pack: { base: '#c9820f', band: '#5e0d13', powder: '#efb73e', ink: '#fffcf6' },
    featured: true,
  },
  {
    slug: 'red-chilli-powder',
    image: '/products/red-chilli-powder.webp',
    name: 'Red Chilli Powder',
    hindiName: 'लाल मिर्च',
    category: 'Pure Spice',
    tagline: 'Vibrant colour, confident heat',
    description:
      'Sun-dried red chillies ground to a rich red powder that brings colour and heat to every dish.',
    story:
      'Good chilli powder is about more than heat. Ours is ground from carefully selected dried red chillies to give dishes a vivid colour and a clean, confident heat that builds without overpowering the other spices.',
    ingredients: ['Red Chilli'],
    usage: [
      'Add with other ground spices once onions and tomatoes have softened.',
      'Use in tadkas, chutneys and pickles.',
      'Dust over raita, fried snacks or roasted vegetables just before serving.',
    ],
    dishes: ['Rajma Masala', 'Sev Tamatar', 'Masala Fries'],
    packSizes: ['100 g', '200 g', '500 g', '1 kg'],
    photo: 'paneerCurry',
    pack: { base: '#9a1c21', band: '#efb73e', powder: '#c4301f', ink: '#fffcf6' },
    featured: true,
  },
  {
    slug: 'kuti-red-chilli',
    image: '/products/kuti-red-chilli.webp',
    name: 'Kuti Red Chilli',
    hindiName: 'कुटी लाल मिर्च',
    category: 'Pure Spice',
    tagline: 'Coarse-crushed for bold heat',
    description:
      'Coarsely crushed red chillies that add texture, colour and a punchy heat to tadkas, pickles and toppings.',
    story:
      'Kuti lal mirch brings heat you can see. Coarsely crushed rather than finely ground, it releases its flavour slowly in hot oil and adds flecks of bright red to everything from a simple dal tadka to a jar of homemade achaar.',
    ingredients: ['Red Chilli (Capsicum annuum)'],
    usage: [
      'Crackle a pinch in hot oil or ghee for a fiery tadka.',
      'Use in homemade pickles, chutneys and marinades.',
      'Sprinkle over pizza, pasta and stir-fries.',
    ],
    dishes: ['Achaar', 'Dal Tadka', 'Pizza & Pasta'],
    packSizes: ['₹10 pack'],
    photo: 'paneerTikka',
    pack: { base: '#9a1c21', band: '#efb73e', powder: '#b3262a', ink: '#fffcf6' },
  },
  {
    slug: 'coriander-powder',
    image: '/products/coriander-powder.webp',
    name: 'Coriander Powder',
    hindiName: 'धनिया',
    category: 'Pure Spice',
    tagline: 'Mild, citrusy and essential',
    description:
      'Ground coriander seeds with a mild, citrusy aroma that rounds out curries, sabzis and gravies.',
    story:
      'Dhaniya powder is the quiet backbone of Indian masalas. Its gentle, citrusy sweetness balances heat and acidity, giving gravies body and helping every other spice in the pot taste more complete.',
    ingredients: ['Coriander Seeds'],
    usage: [
      'Use generously in onion–tomato masalas for curries and sabzis.',
      'Combine with turmeric and red chilli powder for a classic everyday spice base.',
      'Add to dry vegetable preparations like bhindi and aloo.',
    ],
    dishes: ['Bhindi Masala', 'Mix Veg', 'Kadhai Paneer'],
    packSizes: ['100 g', '200 g', '500 g', '1 kg'],
    photo: 'paneerRice',
    pack: { base: '#4f5a2a', band: '#e6c787', powder: '#a88a4e', ink: '#fffcf6' },
    featured: true,
  },
  {
    slug: 'amchur-powder',
    image: '/products/amchur-powder.webp',
    name: 'Amchur Powder',
    hindiName: 'अमचूर पाउडर',
    category: 'Pure Spice',
    tagline: 'Tangy dried mango',
    description:
      'Dried raw mango ground to a fine powder that adds a gentle, fruity tang to sabzis, chaats and chutneys.',
    story:
      'Amchur is the secret behind that bright, tangy note in so many North Indian dishes. Made from dried raw mango, it adds sourness without the moisture of lemon or tamarind — perfect for dry sabzis, fillings and snacks.',
    ingredients: ['Dried Mango'],
    usage: [
      'Sprinkle over dry sabzis like bhindi and aloo towards the end of cooking.',
      'Add to samosa and kachori fillings for a tangy lift.',
      'Use in chaats, chutneys and marinades in place of lemon.',
    ],
    dishes: ['Bhindi Fry', 'Samosa', 'Aloo Chaat'],
    packSizes: ['₹10 pack'],
    photo: 'bhindi',
    pack: { base: '#8a6a2f', band: '#f4e9d6', powder: '#c9a25a', ink: '#fffcf6' },
  },
  {
    slug: 'chaat-masala',
    image: '/products/chaat-masala.webp',
    name: 'Chaat Masala',
    hindiName: 'चाट मसाला',
    category: 'Masala Blend',
    tagline: 'Tangy, zesty, irresistible',
    description:
      'A zesty, tangy sprinkle that brightens chaat, fruits, salads and snacks in an instant.',
    story:
      'Chaat masala is pure joy in a pinch — tangy, a little salty and full of zing. Sprinkle it over anything that needs a lift, from street-style chaat to a simple bowl of cut fruit.',
    ingredients: ['Dry Mango', 'Black Salt', 'Cumin', 'Coriander', 'Black Pepper', 'Mint', 'Asafoetida', 'Salt'],
    usage: [
      'Sprinkle over papdi chaat, aloo tikki and dahi vada.',
      'Toss with cut fruit, cucumber or sprouts salads.',
      'Dust over fries, makhana and roasted peanuts.',
    ],
    dishes: ['Papdi Chaat', 'Fruit Chaat', 'Aloo Tikki'],
    packSizes: ['50 g', '100 g', '200 g'],
    photo: 'chaat',
    pack: { base: '#4f3f86', band: '#e6c787', powder: '#8a5a3a', ink: '#fffcf6' },
  },
]

export const getProduct = (slug) => products.find((p) => p.slug === slug)

// Products with a real packshot are listed first.
export const featuredProducts = products
  .filter((p) => p.featured)
  .sort((a, b) => Boolean(b.image) - Boolean(a.image))
  .slice(0, 4)

export function relatedProducts(product, count = 3) {
  const others = products.filter((p) => p.slug !== product.slug)
  const sameCategory = others.filter((p) => p.category === product.category)
  const rest = others.filter((p) => p.category !== product.category)
  return [...sameCategory, ...rest].slice(0, count)
}

export const categories = ['All', 'Pure Spice', 'Masala Blend']
