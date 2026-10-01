import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowLeft, ArrowRight, ChefHat, ChevronRight, Package, Utensils } from 'lucide-react'
import ProductPack from '@/components/ProductPack'
import ProductCard from '@/components/ProductCard'
import Reveal, { staggerChild, staggerParent } from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { BrandIcon } from '@/components/SocialIcons'
import { getProduct, products, relatedProducts } from '@/data/products'
import { images, img } from '@/data/images'
import { whatsappLink } from '@/data/site'
import { useSeo } from '@/hooks/useSeo'
import { cn } from '@/lib/utils'
import NotFound from './NotFound'

const ease = [0.22, 1, 0.36, 1]

export default function ProductDetail() {
  const { slug } = useParams()
  const product = getProduct(slug)
  if (!product) return <NotFound />
  // Keyed so pack-size state resets when navigating between products.
  return <ProductView key={product.slug} product={product} />
}

function ProductView({ product }) {
  useSeo({ title: product.name, description: `${product.name} by FitRich Masale — ${product.description}` })
  const reduce = useReducedMotion()
  const [size, setSize] = useState(product.packSizes[1] ?? product.packSizes[0])
  const { base, band } = product.pack

  const index = products.findIndex((p) => p.slug === product.slug)
  const prev = products[(index - 1 + products.length) % products.length]
  const next = products[(index + 1) % products.length]
  const enquiry = `Hello FitRich Masale, I would like to enquire about ${product.name} (${size}).`

  return (
    <>
      {/* Product hero */}
      <section className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-36 lg:pb-28" style={{ backgroundColor: base }}>
        <div className="motif absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-black/10 via-black/30 to-black/60" aria-hidden="true" />
        <span
          className="pointer-events-none absolute -bottom-12 -left-6 -z-10 font-hindi text-[9rem] leading-none whitespace-nowrap text-white/[0.06] select-none sm:text-[13rem]"
          aria-hidden="true"
        >
          {product.hindiName}
        </span>

        <div className="container-x">
          <nav aria-label="Breadcrumb" className="text-sm text-cream-100/75">
            <ol className="flex flex-wrap items-center gap-1.5">
              <li>
                <Link to="/" className="hover:text-cream-50">Home</Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <li>
                <Link to="/products" className="hover:text-cream-50">Our Products</Link>
              </li>
              <ChevronRight className="size-3.5" aria-hidden="true" />
              <li aria-current="page" className="font-semibold text-cream-50">{product.name}</li>
            </ol>
          </nav>

          <div className="mt-10 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, ease }}
              className="relative mx-auto w-full max-w-md"
            >
              <div className="absolute top-1/2 left-1/2 size-[85%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl" style={{ background: band }} aria-hidden="true" />
              <div className="absolute top-1/2 left-1/2 size-[92%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/20" aria-hidden="true" />
              <motion.div
                animate={reduce ? undefined : { y: [0, -14, 0], rotate: [0, 1.5, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
                className="relative px-10"
              >
                <ProductPack product={product} size={size} loading="eager" className="drop-shadow-[0_40px_40px_rgba(0,0,0,.45)]" />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.15, ease }}
              className="text-cream-50"
            >
              <p className="inline-flex rounded-full bg-white/10 px-3 py-1 text-xs font-bold tracking-[0.2em] uppercase backdrop-blur">
                {product.category}
              </p>
              <h1 className="mt-5 text-5xl leading-[1.02] font-bold sm:text-6xl">{product.name}</h1>
              <p className="mt-3 font-display text-xl text-cream-100/85 italic">{product.tagline}</p>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream-100/85">{product.story}</p>

              {product.packSizes.length > 0 && (
                <div className="mt-8">
                  <p className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-cream-100/70 uppercase">
                    <Package className="size-4" /> Available pack sizes
                  </p>
                  <div role="radiogroup" aria-label="Pack size" className="mt-3 flex flex-wrap gap-2">
                    {product.packSizes.map((s) => (
                      <button
                        key={s}
                        role="radio"
                        aria-checked={size === s}
                        onClick={() => setSize(s)}
                        className={cn(
                          'rounded-full border px-4 py-2 text-sm font-semibold transition-all',
                          size === s ? 'border-transparent bg-cream-50 text-earth-900' : 'border-white/30 text-cream-50 hover:border-white/70',
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="gold" size="lg">
                  <Link to={`/contact?product=${product.slug}`}>
                    Enquire About This Product <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="whatsapp" size="lg">
                  <a href={whatsappLink(enquiry)} target="_blank" rel="noreferrer">
                    <BrandIcon name="whatsapp" /> WhatsApp Enquiry
                  </a>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="grain py-20 sm:py-28">
        <div className="container-x grid gap-8 lg:grid-cols-3">
          {product.ingredients.length > 0 && (
            <Reveal className="rounded-3xl border border-cream-300 bg-cream-50 p-8">
              <span className="grid size-12 place-items-center rounded-2xl bg-turmeric-300/40 text-chilli-700">
                <ChefHat className="size-5" />
              </span>
              <h2 className="mt-5 text-2xl font-bold text-earth-900">Ingredients</h2>
              <ul className="mt-5 flex flex-wrap gap-2">
                {product.ingredients.map((ing) => (
                  <li key={ing} className="rounded-full border border-cream-300 bg-cream-100 px-3 py-1.5 text-sm font-medium text-earth-700">
                    {ing}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}

          <Reveal delay={0.1} className={cn('rounded-3xl border border-cream-300 bg-cream-50 p-8', product.ingredients.length === 0 && 'lg:col-span-2')}>
            <span className="grid size-12 place-items-center rounded-2xl bg-turmeric-300/40 text-chilli-700">
              <Utensils className="size-5" />
            </span>
            <h2 className="mt-5 text-2xl font-bold text-earth-900">How to use</h2>
            <ol className="mt-5 space-y-4">
              {product.usage.map((u, i) => (
                <li key={u} className="flex gap-4">
                  <span className="grid size-7 shrink-0 place-items-center rounded-full bg-chilli-700 text-xs font-bold text-cream-50">{i + 1}</span>
                  <span className="leading-relaxed text-earth-700">{u}</span>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={0.2} className="group relative min-h-80 overflow-hidden rounded-3xl">
            <img
              src={img(images[product.photo], 900)}
              alt={`A dish cooked with ${product.name}`}
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-earth-900/90 via-earth-900/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-8">
              <p className="text-xs font-bold tracking-[0.2em] text-turmeric-300 uppercase">Perfect for</p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {product.dishes.map((d) => (
                  <li key={d} className="rounded-full bg-cream-50/15 px-3 py-1.5 text-sm font-semibold text-cream-50 backdrop-blur">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Prev / next */}
        <div className="container-x mt-14 flex items-center justify-between gap-4 border-t border-cream-300 pt-8">
          <Link to={`/products/${prev.slug}`} className="group flex items-center gap-3 text-earth-700 hover:text-chilli-700">
            <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block text-xs font-bold tracking-[0.18em] text-earth-500 uppercase">Previous</span>
              <span className="font-display text-lg font-bold">{prev.name}</span>
            </span>
          </Link>
          <Link to={`/products/${next.slug}`} className="group flex items-center gap-3 text-right text-earth-700 hover:text-chilli-700">
            <span>
              <span className="block text-xs font-bold tracking-[0.18em] text-earth-500 uppercase">Next</span>
              <span className="font-display text-lg font-bold">{next.name}</span>
            </span>
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      {/* Related */}
      <section className="bg-cream-200/60 py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading eyebrow="You may also like" title="Related products" />
          <motion.div
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {relatedProducts(product).map((p) => (
              <motion.div key={p.slug} variants={staggerChild}>
                <ProductCard product={p} variant="compact" />
              </motion.div>
            ))}
          </motion.div>
          <div className="mt-12 text-center">
            <Button asChild variant="outline" size="lg">
              <Link to="/products">
                Back to All Products <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
