import { useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import PageHero from '@/components/PageHero'
import ProductCard from '@/components/ProductCard'
import Reveal from '@/components/Reveal'
import { Button } from '@/components/ui/button'
import { BrandIcon } from '@/components/SocialIcons'
import { categories, products } from '@/data/products'
import { images } from '@/data/images'
import { whatsappLink } from '@/data/site'
import { useSeo } from '@/hooks/useSeo'
import { cn } from '@/lib/utils'

export default function Products() {
  useSeo({
    title: 'Our Products',
    description:
      `Explore the FitRich Masale range: ${products.map((p) => p.name).join(', ')}.`,
  })
  const [active, setActive] = useState('All')
  const list = active === 'All' ? products : products.filter((p) => p.category === active)

  return (
    <>
      <PageHero eyebrow="The FitRich range" title="Our Products" image={images.spiceBowls} hindi="मसाले">
        {products.length} kitchen essentials — pure ground spices and signature masala blends — crafted to bring authentic flavour to everyday
        cooking.
      </PageHero>

      <section className="grain py-20 sm:py-24">
        <div className="container-x">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <Reveal>
              <p className="text-sm font-semibold text-earth-600">
                Showing <span className="text-earth-900">{list.length}</span> of {products.length} products
              </p>
            </Reveal>
            <Reveal delay={0.05}>
              <div role="tablist" aria-label="Filter products" className="inline-flex rounded-full border border-cream-300 bg-cream-50 p-1">
                {categories.map((c) => (
                  <button
                    key={c}
                    role="tab"
                    aria-selected={active === c}
                    onClick={() => setActive(c)}
                    className={cn(
                      'relative rounded-full px-4 py-2 text-sm font-semibold transition-colors sm:px-5',
                      active === c ? 'text-cream-50' : 'text-earth-700 hover:text-chilli-700',
                    )}
                  >
                    {active === c && (
                      <motion.span layoutId="filter-pill" className="absolute inset-0 rounded-full bg-chilli-700" transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }} />
                    )}
                    <span className="relative">{c === 'All' ? 'All Products' : `${c}s`}</span>
                  </button>
                ))}
              </div>
            </Reveal>
          </div>

          <motion.ul layout className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {list.map((p, i) => (
                <motion.li
                  key={p.slug}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, delay: (i % 3) * 0.06, ease: [0.22, 1, 0.36, 1] }}
                >
                  <ProductCard product={p} />
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </div>
      </section>

      <section className="bg-cream-200/60 py-20">
        <Reveal className="container-x flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-2xl">
            <p className="eyebrow">Bulk & trade enquiries</p>
            <h2 className="mt-3 text-3xl font-bold text-earth-900 sm:text-4xl">Looking for pack sizes, pricing or distribution?</h2>
            <p className="mt-3 text-lg text-earth-600">Send us a message and our team will share the details you need.</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link to="/contact">
                Send an Enquiry <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="whatsapp" size="lg">
              <a href={whatsappLink('Hello FitRich Masale, I would like details about your product range and pack sizes.')} target="_blank" rel="noreferrer">
                <BrandIcon name="whatsapp" /> WhatsApp Us
              </a>
            </Button>
          </div>
        </Reveal>
      </section>
    </>
  )
}
