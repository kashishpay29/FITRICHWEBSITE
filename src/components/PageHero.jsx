import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { img } from '@/data/images'

/** Dark, image-backed hero used at the top of inner pages. */
export default function PageHero({ eyebrow, title, children, image, hindi }) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-earth-900 pt-40 pb-24 sm:pt-48 sm:pb-32">
      <motion.img
        src={img(image, 2000)}
        alt=""
        style={{ y }}
        className="absolute inset-0 -z-20 h-[120%] w-full scale-105 object-cover"
        fetchPriority="high"
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-earth-900/80 via-chilli-900/70 to-earth-900/95" aria-hidden="true" />
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          {eyebrow && <p className="eyebrow text-turmeric-300">{eyebrow}</p>}
          <h1 className="mt-5 text-5xl leading-[1.02] font-bold text-cream-50 sm:text-6xl lg:text-7xl">{title}</h1>
          {children && <p className="mt-6 max-w-2xl text-lg leading-relaxed text-cream-200/85">{children}</p>}
        </motion.div>
      </div>
      {hindi && (
        <span
          className="pointer-events-none absolute -right-4 -bottom-10 font-hindi text-[9rem] leading-none text-cream-50/[0.06] select-none sm:text-[14rem]"
          aria-hidden="true"
        >
          {hindi}
        </span>
      )}
    </section>
  )
}
