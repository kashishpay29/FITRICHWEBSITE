# FitRich Masale — Brand Website

Premium brand site for FitRich Masale, built with React, Vite, Tailwind CSS v4, shadcn/ui-style components,
Framer Motion, Lucide icons and React Router.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Editing content

| What | Where |
| --- | --- |
| Products (names, descriptions, ingredients, usage, pack sizes, colours, featured) | `src/data/products.js` |
| Phone numbers, email, WhatsApp number, address, hours, social links | `src/data/site.js` |
| Photography (Unsplash placeholders) | `src/data/images.js` |
| Colours & fonts | `@theme` block in `src/index.css` |

**Product images:** each product renders an illustrated pack (`src/components/ProductPack.jsx`) coloured from its
`pack` field. To use a real packshot, put the file in `public/products/` and set `image: '/products/garam-masala.png'`
on the product. It replaces the illustration everywhere.

**Placeholders to replace before launch:** contact details in `site.js`, plus the sample `ingredients` and
`packSizes` in `products.js`. Use the information printed on the actual packs.

## Contact form

Submitting the contact form opens WhatsApp with the enquiry pre-filled (name, phone, email, type and message),
addressed to the WhatsApp number in `src/data/site.js`. The visitor just taps Send. No backend is needed.

## Deploy (Vercel)

Import the repo in Vercel (framework preset: Vite). No environment variables are needed.
`vercel.json` rewrites all routes to `index.html` so deep links like `/products/garam-masala` work.

## Structure

```
src/
  components/
    ui/            shadcn-style primitives (button, input, textarea, label, badge)
    layout/        Navbar, Footer, WhatsApp button, Layout (page transitions)
    ProductCard, ProductPack, PageHero, Reveal, SectionHeading, Logo, SocialIcons
  data/            products.js, site.js, images.js
  hooks/useSeo.js  per-page <title> and meta description
  pages/           Home, Products, ProductDetail, About, Contact, NotFound
```
