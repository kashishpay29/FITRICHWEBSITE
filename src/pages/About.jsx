import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Eye, Flame, HandHeart, Package, Quote, Sparkles, Sprout, Wheat } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Reveal, { staggerChild, staggerParent } from '@/components/Reveal'
import SectionHeading from '@/components/SectionHeading'
import { Button } from '@/components/ui/button'
import { images, img } from '@/data/images'
import { useSeo } from '@/hooks/useSeo'

/*
 * Copy on this page is intentionally free of dates, figures, certifications and specific
 * manufacturing claims. Replace with FitRich's verified story and process details when available.
 */

export default function About() {
  useSeo({
    title: 'About Us',
    description:
      'The FitRich Masale story — our commitment to quality, our love for the art of Indian spices, and how we bring authentic flavour to every kitchen.',
  })

  return (
    <>
      <PageHero eyebrow="About FitRich Masale" title="A love for real, honest flavour." image={images.spiceFlatlay} hindi="स्वाद">
        Every Indian kitchen tells a story through its spices. Ours began with a wish to make those stories taste just right.
      </PageHero>
      <OurStory />
      <Commitment />
      <ArtOfSpices />
      <Process />
      <ClosingCta />
      <Founders />
    </>
  )
}

function OurStory() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [60, -60])

  return (
    <section id="story" ref={ref} className="grain scroll-mt-20 py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-2">
        <div>
          <Reveal>
            <p className="eyebrow">Our story</p>
            <h2 className="mt-4 text-4xl leading-[1.05] font-bold text-earth-900 sm:text-5xl">
              Born in the kitchen, <span className="text-chilli-700 italic">made for every home.</span>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-6 space-y-4 text-lg leading-relaxed text-earth-600">
            <p>
              In India, spices are more than ingredients. They are memories — the sizzle of jeera in hot ghee, the colour haldi
              brings to a pot of dal, the aroma of garam masala that tells the whole house dinner is nearly ready.
            </p>
            <p>
              FitRich Masale was created to honour that everyday magic. Our aim is simple: to offer spices and masalas that
              deliver true, dependable flavour, so that every home cook can make food that tastes the way it’s meant to.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <figure className="mt-10 border-l-4 border-turmeric-400 pl-6">
              <Quote className="size-7 text-gold-500" aria-hidden="true" />
              <blockquote className="mt-2 font-display text-2xl leading-snug text-earth-900 italic">
                Good food begins with good spices. Everything we do starts there.
              </blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-earth-500">— The FitRich Masale team</figcaption>
            </figure>
          </Reveal>
        </div>

        <div className="relative">
          <motion.div style={{ y }} className="overflow-hidden rounded-[2.5rem] shadow-[0_40px_80px_-40px_rgba(63,8,12,.6)]">
            <img src={img(images.dalTadka, 1200)} alt="A bowl of home-style dal tadka" loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </motion.div>
          <Reveal delay={0.3} className="absolute -bottom-6 -left-4 max-w-[15rem] rounded-2xl bg-cream-50 p-5 shadow-xl sm:-left-10">
            <p className="font-hindi text-2xl text-chilli-700">घर का स्वाद</p>
            <p className="mt-1 text-sm text-earth-600">The taste of home, in every pack.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

function Commitment() {
  const items = [
    { icon: Sprout, image: images.spiceFlatlay, title: 'Thoughtful selection', text: 'We look for spices with good colour, natural aroma and a clean taste.' },
    { icon: Sparkles, image: images.heroSpoons, title: 'Careful handling', text: 'Each spice is cleaned and ground with care to respect its character.' },
    { icon: Package, image: images.spiceBowls, title: 'Sealed for freshness', text: 'Packed to help keep aroma and flavour locked in until you open it.' },
    { icon: HandHeart, image: images.dalTadka, title: 'Honest promise', text: 'Clear labels and straightforward products — no exaggerated claims.' },
  ]
  return (
    <section id="quality" className="scroll-mt-20 bg-cream-200/60 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="Our commitment to quality" title="Quality you can taste, pack after pack.">
          Consistency matters in the kitchen. That’s why we pay attention to the small details that make a big difference to flavour.
        </SectionHeading>
        <motion.ul
          variants={staggerParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          {items.map(({ icon: Icon, image, title, text }) => (
            <motion.li
              key={title}
              variants={staggerChild}
              className="group relative isolate flex min-h-80 flex-col justify-end overflow-hidden rounded-3xl p-7 shadow-[0_30px_60px_-35px_rgba(63,8,12,.6)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_40px_70px_-30px_rgba(63,8,12,.7)]"
            >
              <img
                src={img(image, 700)}
                alt=""
                loading="lazy"
                className="absolute inset-0 -z-20 h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-110"
              />
              {/* Dark gradient keeps the text readable over the photo */}
              <div className="absolute inset-0 -z-10 bg-gradient-to-t from-earth-900 via-earth-900/75 to-earth-900/20" aria-hidden="true" />
              <span className="grid size-12 place-items-center rounded-2xl bg-turmeric-400 text-chilli-900 shadow-lg transition-transform duration-500 group-hover:-rotate-6">
                <Icon className="size-5" />
              </span>
              <h3 className="mt-5 font-sans text-lg font-bold tracking-normal text-cream-50">{title}</h3>
              <p className="mt-2 leading-relaxed text-cream-200/90">{text}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  )
}

function ArtOfSpices() {
  const spices = [
    { name: 'Haldi', en: 'Turmeric', note: 'Golden colour and earthy warmth', color: '#efb73e' },
    { name: 'Lal Mirch', en: 'Red Chilli', note: 'Vibrant colour and heat', color: '#c4301f' },
    { name: 'Dhaniya', en: 'Coriander', note: 'Mild, citrusy and rounding', color: '#a88a4e' },
    { name: 'Amchur', en: 'Dried Mango', note: 'Bright, fruity tang', color: '#c9a25a' },
  ]
  return (
    <section id="art" className="relative isolate scroll-mt-20 overflow-hidden bg-earth-900 py-24 text-cream-50 sm:py-32">
      <div className="motif absolute inset-0 -z-10" aria-hidden="true" />
      <div className="container-x grid items-center gap-16 lg:grid-cols-[.9fr_1.1fr]">
        <div>
          <SectionHeading align="left" light eyebrow="The art of Indian spices" title="Balance is everything.">
            Indian cooking is the art of layering — whole spices bloomed in oil, ground spices that build the masala, and a finishing
            blend that brings it all together. Each spice plays its part.
          </SectionHeading>
          <motion.ul
            variants={staggerParent}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 divide-y divide-cream-50/10 border-y border-cream-50/10"
          >
            {spices.map((s) => (
              <motion.li key={s.name} variants={staggerChild} className="group flex items-center gap-5 py-5">
                <span className="size-4 shrink-0 rounded-full ring-4 ring-white/5 transition-transform group-hover:scale-150" style={{ background: s.color }} />
                <div className="flex flex-1 flex-wrap items-baseline justify-between gap-x-4">
                  <p className="font-display text-2xl font-semibold">
                    {s.name} <span className="font-sans text-sm font-medium text-cream-200/60">· {s.en}</span>
                  </p>
                  <p className="text-sm text-cream-200/70">{s.note}</p>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[images.spiceBowls, images.heroSpoons, images.bananaLeaf, images.dosaLeaf].map((id, i) => (
            <Reveal key={id} delay={i * 0.1} className={i % 2 ? 'translate-y-10' : ''}>
              <div className="group overflow-hidden rounded-3xl">
                <img
                  src={img(id, 700)}
                  alt=""
                  loading="lazy"
                  className="aspect-[3/4] w-full object-cover transition-transform duration-[1.2s] group-hover:scale-110"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function Process() {
  const steps = [
    { icon: Eye, title: 'Select', text: 'Spices are chosen for their colour, aroma and taste.' },
    { icon: Wheat, title: 'Clean', text: 'Raw spices are cleaned to prepare them for grinding.' },
    { icon: Flame, title: 'Grind & blend', text: 'Ground and, for our masalas, blended to a balanced recipe.' },
    { icon: Package, title: 'Pack', text: 'Sealed in packs designed to protect aroma and flavour.' },
  ]
  return (
    <section id="process" className="grain scroll-mt-20 py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow="From spice to kitchen" title="Our process, simply put.">
          A straightforward journey with one goal — getting great flavour from our hands to your kitchen.
        </SectionHeading>
        <div className="relative mt-16">
          <div className="absolute top-8 right-[12%] left-[12%] hidden h-px bg-gradient-to-r from-transparent via-gold-400 to-transparent md:block" aria-hidden="true" />
          <ol className="relative grid gap-10 md:grid-cols-4 md:gap-6">
          {steps.map(({ icon: Icon, title, text }, i) => (
            <Reveal as="li" key={title} delay={i * 0.12} className="relative text-center">
              <span className="relative mx-auto grid size-16 place-items-center rounded-full border-4 border-cream-100 bg-chilli-700 text-turmeric-300 shadow-lg">
                <Icon className="size-6" />
                <span className="absolute -top-1 -right-1 grid size-6 place-items-center rounded-full bg-turmeric-400 text-[11px] font-bold text-earth-900">
                  {i + 1}
                </span>
              </span>
              <h3 className="mt-5 font-sans text-lg font-bold tracking-normal text-earth-900">{title}</h3>
              <p className="mx-auto mt-2 max-w-56 leading-relaxed text-earth-600">{text}</p>
            </Reveal>
          ))}
          </ol>
        </div>
      </div>
    </section>
  )
}

function ClosingCta() {
  return (
    <section className="relative isolate overflow-hidden py-28">
      <img src={img(images.paneerMakhani, 1800)} alt="" loading="lazy" className="absolute inset-0 -z-20 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-chilli-900/80" aria-hidden="true" />
      <Reveal className="container-x text-center">
        <h2 className="mx-auto max-w-3xl text-4xl leading-tight font-bold text-cream-50 sm:text-5xl">
          Taste the difference in your very next meal.
        </h2>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="gold" size="lg">
            <Link to="/products">
              Explore Our Products <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outlineLight" size="lg">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </div>
      </Reveal>
    </section>
  )
}

function Founders() {
  const founders = 'Suryakant & Sudhanshu'

  return (
    <section id="founders" className="relative isolate scroll-mt-20 overflow-hidden bg-[#0b0705] py-16 text-cream-50 sm:py-20">
      <div className="motif absolute inset-0 -z-10 opacity-50" aria-hidden="true" />
      <div className="absolute top-0 left-[10%] -z-10 size-80 rounded-full bg-chilli-700/30 blur-3xl" aria-hidden="true" />

      <div className="container-x grid max-w-6xl items-center gap-10 md:grid-cols-[.85fr_1.15fr] lg:gap-16">
        <div className="relative mx-auto w-full max-w-sm md:max-w-none">
          <div className="absolute inset-x-[15%] top-[10%] bottom-0 -z-10 rounded-full bg-gold-500/20 blur-3xl" aria-hidden="true" />
          {/* The photo has a pure black backdrop; "lighten" blending lets the section show through it.
              Keep transforms/opacity off this wrapper, or the blend stops reaching the section. */}
          <img
            src="/about/founders.webp"
            alt={`${founders}, the childhood friends who founded FitRich Masale`}
            width="793"
            height="666"
            loading="lazy"
            className="w-full mix-blend-lighten"
          />
          {/* Soften the cut-off at the bottom of the photo */}
          <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-[#0b0705] to-transparent" aria-hidden="true" />
          <p className="absolute inset-x-0 bottom-2 text-center">
            <span className="font-display text-2xl font-bold text-cream-50">{founders}</span>
            <span className="mt-0.5 block text-xs font-bold tracking-[0.22em] text-turmeric-300 uppercase">Founders</span>
          </p>
        </div>

        <div>
          <Reveal>
            <p className="eyebrow text-turmeric-300">The people behind FitRich</p>
            <h2 className="mt-3 text-3xl leading-[1.1] font-bold sm:text-4xl">
              Two childhood friends. <span className="text-turmeric-300 italic">One shared dream.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-5 space-y-4 leading-relaxed text-cream-200/85">
            <p>
              FitRich Masale began with {founders} — two friends who grew up sharing lunch boxes, festivals and countless meals
              at each other’s homes, where every memory smelled of fresh tadka and garam masala.
            </p>
            <p>
              They wanted every family to enjoy masalas they could truly trust, so they set out to build a brand that treats each
              spice with the honesty and care of a home kitchen. That is what{' '}
              <span className="font-semibold text-turmeric-300">“Purity Mein Hit”</span> means to them.
            </p>
          </Reveal>

          <Reveal delay={0.2}>
            <figure className="mt-7 border-l-2 border-gold-400/60 pl-5">
              <Quote className="size-5 text-gold-400" aria-hidden="true" />
              <blockquote className="mt-2 font-display text-xl leading-snug text-cream-50 italic">
                Every pack carries the promise we made to each other at the start: never compromise on what goes into your
                family’s food.
              </blockquote>
              <figcaption className="mt-3 text-sm font-semibold text-gold-300">— {founders}, Founders</figcaption>
            </figure>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
