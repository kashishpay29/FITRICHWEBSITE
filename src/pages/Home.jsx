import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, BadgeCheck, ShoppingBag, ChevronDown, Droplets, Flag, Flame, FlaskConicalOff, Leaf, PackageCheck, Palette, ShieldCheck, Sparkles, Tractor } from 'lucide-react'
import { Button } from '@/components/ui/button'
import ProductCard from '@/components/ProductCard'
import ProductPack from '@/components/ProductPack'
import Reveal, { staggerChild, staggerParent } from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { featuredProducts, getProduct, products } from '@/data/products'
import { images, img } from '@/data/images'
import { site } from '@/data/site'
import { useSeo } from '@/hooks/useSeo'

const ease = [0.22, 1, 0.36, 1]

export default function Home() {
  useSeo({
    title: null,
    description:
      'FitRich Masale brings authentic Indian flavour to every kitchen — garam masala, turmeric, red chilli, chaat masala and more, carefully crafted for everyday cooking.',
  })

  return (
    <>
      <Hero />
      <SpiceMarquee />
      <BrandIntro />
      <FeaturedProducts />
      <WhyChoose />
      <CookingSection />
    </>
  )
}

/* ------------------------------------------------------------------ */

function Hero() {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const heroPacks = ['turmeric-powder', 'red-chilli-powder', 'coriander-powder'].map(getProduct)
  const headline = ['Bringing', 'Authentic', 'Flavours', 'to', 'Every', 'Kitchen.']

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-earth-900">
      <motion.div style={{ y: bgY }} className="absolute inset-0 -z-20">
        <motion.img
          src={img(images.heroSpoons, 2200)}
          alt="Indian spices — turmeric, chilli and whole spices — in vintage spoons"
          className="h-[115%] w-full object-cover"
          initial={{ scale: 1.15 }}
          animate={{ scale: reduce ? 1.15 : 1.02 }}
          transition={{ duration: 12, ease: 'easeOut' }}
          fetchPriority="high"
        />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-earth-900/95 via-chilli-900/75 to-earth-900/30" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-earth-900/80 to-transparent" aria-hidden="true" />
      <SpiceDust />

      <motion.div style={{ y: contentY, opacity: fade }} className="container-x grid items-center gap-12 pt-32 pb-24 xl:grid-cols-[1.15fr_.85fr]">
        <div>
          <h1 className="text-[2.9rem] leading-[1.02] font-bold text-cream-50 sm:text-7xl lg:text-[5.4rem]">
            {headline.map((word, i) => {
              const accent = word === 'Authentic' || word === 'Flavours'
              return (
                <span key={i}>
                  <span className={`inline-block overflow-hidden pb-2 align-bottom ${accent ? "pr-[0.1em]" : ""}`}>
                    <motion.span
                      className={`inline-block ${accent ? 'text-turmeric-300 italic' : ''}`}
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.9, delay: 0.15 + i * 0.08, ease }}
                    >
                      {word}
                    </motion.span>
                  </span>{' '}
                </span>
              )
            })}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.75, ease }}
            className="mt-6 max-w-xl text-lg leading-relaxed text-cream-200/85 sm:text-xl"
          >
            Experience the richness of carefully crafted spices that make every meal memorable.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.9, ease }}
            className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap"
          >
            <Button asChild variant="gold" size="lg">
              <a href={site.shopUrl} target="_blank" rel="noopener noreferrer">
                <ShoppingBag /> Shop Now
              </a>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <Link to="/products">
                Explore Our Products <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outlineLight" size="lg">
              <Link to="/about">Discover Our Story</Link>
            </Button>
          </motion.div>
        </div>

        {/* Fanned product packs */}
        <div className="relative mx-auto -mt-4 h-[300px] w-full max-w-md sm:h-[380px] xl:mt-0 xl:h-[480px]" aria-hidden="true">
          <div className="absolute inset-x-0 top-0 h-[480px] origin-top scale-[.62] sm:scale-[.78] xl:scale-100">
          <div className="absolute top-1/2 left-1/2 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-turmeric-400/25 blur-3xl" />
          {heroPacks.map((p, i) => {
            const pos = [
              { x: -130, r: -12, z: 1, d: 0 },
              { x: 0, r: 0, z: 3, d: 0.6 },
              { x: 130, r: 12, z: 2, d: 1.2 },
            ][i]
            return (
              <motion.div
                key={p.slug}
                className="absolute top-1/2 left-1/2 w-56"
                style={{ zIndex: pos.z }}
                initial={{ opacity: 0, y: 120, x: '-50%', rotate: 0 }}
                animate={{ opacity: 1, y: '-50%', x: `calc(-50% + ${pos.x}px)`, rotate: pos.r }}
                transition={{ duration: 1.2, delay: 0.5 + i * 0.12, ease }}
              >
                <motion.div
                  animate={reduce ? undefined : { y: [0, -12, 0] }}
                  transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: pos.d }}
                  className={i === 1 ? 'scale-110' : 'scale-95'}
                >
                  <ProductPack product={p} loading="eager" className="drop-shadow-[0_30px_30px_rgba(0,0,0,.45)]" />
                </motion.div>
              </motion.div>
            )
          })}
          </div>
        </div>
      </motion.div>

      <motion.a
        href="#intro"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xs font-semibold tracking-[0.25em] text-cream-200/70 uppercase"
        aria-label="Scroll to learn more"
      >
        Scroll
        <motion.span animate={reduce ? undefined : { y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity }}>
          <ChevronDown className="size-5" />
        </motion.span>
      </motion.a>
    </section>
  )
}

/** Slowly drifting golden specks over the hero for subtle background movement. */
function SpiceDust() {
  const reduce = useReducedMotion()
  if (reduce) return null
  const specks = Array.from({ length: 18 }, (_, i) => ({
    left: (i * 53) % 100,
    top: (i * 37) % 100,
    size: 2 + (i % 4),
    dur: 10 + (i % 6) * 2,
    delay: (i % 5) * 1.3,
  }))
  return (
    <div className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      {specks.map((s, i) => (
        <motion.span
          key={i}
          className="absolute rounded-full bg-turmeric-300"
          style={{ left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size }}
          animate={{ y: [0, -60, 0], x: [0, 20, 0], opacity: [0, 0.7, 0] }}
          transition={{ duration: s.dur, repeat: Infinity, delay: s.delay, ease: 'easeInOut' }}
        />
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */

function SpiceMarquee() {
  const items = products.map((p) => [p.name, p.hindiName])
  const row = [...items, ...items]
  return (
    <div className="relative overflow-hidden border-y border-gold-500/30 bg-chilli-800 py-5" aria-hidden="true">
      <div className="flex w-max animate-marquee gap-10">
        {row.map(([en, hi], i) => (
          <span key={i} className="flex items-center gap-10 whitespace-nowrap">
            <span className="font-display text-2xl font-semibold text-cream-50">{en}</span>
            <span className="font-hindi text-xl text-turmeric-300">{hi}</span>
            <Sparkles className="size-4 text-gold-400" />
          </span>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */

function BrandIntro() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [40, -40])
  const y2 = useTransform(scrollYProgress, [0, 1], [90, -60])

  const pillars = [
    { icon: Leaf, title: 'Freshness', text: 'Ground and packed to hold on to natural aroma.' },
    { icon: Flame, title: 'Flavour', text: 'Balanced blends that taste the way home food should.' },
    { icon: Sparkles, title: 'Quality', text: 'Carefully selected spices, handled with care.' },
  ]

  return (
    <section id="intro" ref={ref} className="grain relative scroll-mt-20 overflow-hidden py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="relative pb-16 sm:pb-24">
          <motion.div style={{ y: y1 }} className="overflow-hidden rounded-3xl shadow-[0_40px_80px_-40px_rgba(63,8,12,.6)]">
            <img
              src={img(images.spiceBowls, 1200)}
              alt="Bowls of whole and ground Indian spices"
              loading="lazy"
              className="aspect-[4/5] w-full object-cover transition-transform duration-[1.5s] hover:scale-105 sm:w-[82%]"
            />
          </motion.div>
          <motion.div
            style={{ y: y2 }}
            className="absolute right-0 bottom-0 w-[52%] overflow-hidden rounded-3xl border-[6px] border-cream-100 shadow-2xl sm:w-[46%]"
          >
            <img src={img(images.spiceFlatlay, 800)} alt="Whole spices, chillies and garlic laid out on a table" loading="lazy" className="aspect-square w-full object-cover" />
          </motion.div>
          <Reveal
            delay={0.3}
            className="absolute top-8 -left-3 rounded-2xl bg-chilli-700 px-5 py-4 text-cream-50 shadow-xl sm:-left-6"
          >
            <p className="font-display text-4xl leading-none font-bold">{products.length}</p>
            <p className="mt-1 text-xs font-semibold tracking-wider text-cream-200/80 uppercase">Kitchen essentials</p>
          </Reveal>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow">Welcome to FitRich Masale</p>
            <h2 className="mt-4 text-4xl leading-[1.05] font-bold text-earth-900 sm:text-5xl">
              Spices crafted for the way <span className="text-chilli-700 italic">India cooks.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-6 text-lg leading-relaxed text-earth-600">
              FitRich Masale is built around a simple idea: everyday spices should deliver real, honest flavour. From the golden
              haldi in your tadka to the garam masala that finishes a Sunday curry, every pack is made to bring out the taste
              of home-cooked food.
            </p>
            <p className="mt-4 leading-relaxed text-earth-600">
              We focus on what matters in the kitchen — aroma, colour, and a balance of flavour you can rely on, meal after meal.
            </p>
          </Reveal>

          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-10 grid gap-4 sm:grid-cols-3"
          >
            {pillars.map(({ icon: Icon, title, text }) => (
              <motion.li key={title} variants={staggerChild} className="rounded-2xl border border-cream-300 bg-cream-50 p-5">
                <span className="grid size-11 place-items-center rounded-full bg-turmeric-300/40 text-chilli-700">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold text-earth-900">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-earth-600">{text}</p>
              </motion.li>
            ))}
          </motion.ul>

          <Reveal delay={0.2} className="mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/about">
                Read Our Story <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function FeaturedProducts() {
  return (
    <section className="relative bg-cream-200/60 py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading align="left" eyebrow="Featured products" title="Our most-loved masalas">
            Kitchen favourites that bring colour, aroma and depth to everyday Indian cooking.
          </SectionHeading>
          <Reveal>
            <Button asChild size="lg">
              <Link to="/products">
                View Complete Catalog <ArrowRight />
              </Link>
            </Button>
          </Reveal>
        </div>

        <motion.div
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {featuredProducts.map((p) => (
            <motion.div key={p.slug} variants={staggerChild}>
              <ProductCard product={p} variant="compact" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */

function WhyChoose() {
  const reasons = [
    { icon: Palette, title: 'No Artificial Colours' },
    { icon: FlaskConicalOff, title: 'No Preservatives or Chemicals' },
    { icon: ShieldCheck, title: 'Hygienically Processed' },
    { icon: PackageCheck, title: 'Premium Grade Packaging' },
    { icon: Droplets, title: 'High Natural Oil Content' },
    { icon: Flag, title: 'Made in India' },
    { icon: Tractor, title: 'Sourced Directly from Farms' },
    { icon: BadgeCheck, title: 'Stringent Quality Standards' },
  ]

  return (
    <section className="relative isolate overflow-hidden bg-chilli-900 py-24 text-cream-50 sm:py-32">
      <div className="motif absolute inset-0 -z-10" aria-hidden="true" />
      <div className="absolute -top-40 -left-40 -z-10 size-[30rem] rounded-full bg-chilli-600/40 blur-3xl" aria-hidden="true" />
      <div className="absolute -right-40 -bottom-40 -z-10 size-[30rem] rounded-full bg-turmeric-500/20 blur-3xl" aria-hidden="true" />

      <div className="container-x">
        <SectionHeading light eyebrow="Why choose FitRich" title="Every pinch, carefully considered." />

        <div className="mt-16 grid items-center gap-10 lg:grid-cols-[1fr_auto_1fr]">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {reasons.slice(0, 4).map((r, i) => (
              <Reason key={r.title} {...r} delay={i * 0.08} align="right" />
            ))}
          </div>

          <Reveal className="relative mx-auto size-72 sm:size-80 lg:order-none xl:size-96">
            <div className="absolute inset-0 rounded-full border border-dashed border-gold-400/40 motion-safe:animate-[spin_60s_linear_infinite]" />
            <div className="absolute inset-6 overflow-hidden rounded-full border-4 border-gold-400/60 shadow-[0_0_80px_-10px_rgba(239,183,62,.45)]">
              <img src={img(images.spiceFlatlay, 900)} alt="An array of Indian spices viewed from above" loading="lazy" className="h-full w-full object-cover" />
            </div>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            {reasons.slice(4).map((r, i) => (
              <Reason key={r.title} {...r} delay={0.2 + i * 0.08} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Reason({ icon: Icon, title, delay, align }) {
  return (
    <Reveal
      delay={delay}
      className={`group flex items-center gap-4 rounded-2xl border border-cream-50/10 bg-cream-50/[0.04] px-5 py-4 backdrop-blur-sm transition-colors hover:border-gold-400/40 hover:bg-cream-50/[0.08] ${
        align === 'right' ? 'lg:flex-row-reverse lg:text-right' : ''
      }`}
    >
      <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-turmeric-300 to-gold-500 text-chilli-900 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110">
        <Icon className="size-5" />
      </span>
      <h3 className="font-sans text-lg leading-snug font-bold tracking-normal">{title}</h3>
    </Reveal>
  )
}

/* ------------------------------------------------------------------ */

const dishes = [
  { photo: 'vegThali', name: 'Festive Veg Thali', product: 'garam-masala', span: 'lg:col-span-2 lg:row-span-2' },
  { photo: 'masalaDosa', name: 'Masala Dosa', product: 'turmeric-powder', span: '' },
  { photo: 'paniPuri', name: 'Pani Puri & Chaat', product: 'chaat-masala', span: '' },
  { photo: 'palakPaneer', name: 'Palak Paneer', product: 'coriander-powder', span: '' },
  { photo: 'samosaPlatter', name: 'Samosa & Chutney', product: 'amchur-powder', span: '' },
]

function CookingSection() {
  return (
    <section className="grain py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Cooking & flavour" title={<>A Little Spice. <span className="text-chilli-700 italic">A Lot of Flavour.</span></>}>
          From festive thalis to quick weekday dals, FitRich spices are at home in every Indian dish.
        </SectionHeading>

        <div className="mt-14 grid auto-rows-[240px] gap-4 sm:grid-cols-2 sm:auto-rows-[260px] lg:grid-cols-4">
          {dishes.map((d, i) => {
            const p = getProduct(d.product)
            return (
              <Reveal key={d.name} delay={i * 0.08} className={`${d.span} sm:[&:first-child]:col-span-2`}>
                <Link
                  to={`/products/${p.slug}`}
                  className="group relative block h-full overflow-hidden rounded-3xl"
                  aria-label={`${d.name} — made with FitRich ${p.name}`}
                >
                  <img
                    src={img(images[d.photo], i === 0 ? 1400 : 800)}
                    alt={d.name}
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-earth-900/85 via-earth-900/20 to-transparent" />
                  <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
                    <div>
                      <p className="text-xs font-semibold tracking-[0.18em] text-turmeric-300 uppercase">Made with {p.name}</p>
                      <h3 className={`mt-1 font-bold text-cream-50 ${i === 0 ? 'text-3xl sm:text-4xl' : 'text-2xl'}`}>{d.name}</h3>
                    </div>
                    <span className="grid size-10 shrink-0 translate-y-2 place-items-center rounded-full bg-cream-50 text-chilli-700 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                      <ArrowRight className="size-4" />
                    </span>
                  </div>
                </Link>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
