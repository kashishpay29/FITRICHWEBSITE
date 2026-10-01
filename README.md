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
| Phone, email, WhatsApp number, address, hours, social links | `src/data/site.js` |
| Photography (Unsplash placeholders) | `src/data/images.js` |
| Colours & fonts | `@theme` block in `src/index.css` |

**Product images:** each product renders an illustrated pack (`src/components/ProductPack.jsx`) coloured from its
`pack` field. To use a real packshot, put the file in `public/products/` and set `image: '/products/garam-masala.png'`
on the product. It replaces the illustration everywhere.

**Placeholders to replace before launch:** contact details in `site.js`, plus the sample `ingredients` and
`packSizes` in `products.js`. Use the information printed on the actual packs.

## Contact form

Set `VITE_FORM_ENDPOINT` (see `.env.example`) to a Formspree / Web3Forms / Getform endpoint or your own API.
The form POSTs JSON `{ name, email, phone, type, message }`. If no endpoint is set, submitting opens the visitor's
email app with the enquiry pre-filled.

## Deploy (Vercel)

Import the repo in Vercel (framework preset: Vite) and add `VITE_FORM_ENDPOINT` if you use one.
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
