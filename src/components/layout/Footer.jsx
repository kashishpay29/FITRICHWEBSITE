import { Link } from 'react-router-dom'
import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import Logo from '@/components/Logo'
import SocialIcons from '@/components/SocialIcons'
import { Button } from '@/components/ui/button'
import { fullAddress, navLinks, site, whatsappLink } from '@/data/site'
import { products } from '@/data/products'
import { BrandIcon } from '@/components/SocialIcons'
import Reveal from '@/components/Reveal'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-earth-900 text-cream-200">
      <div className="motif absolute inset-0" aria-hidden="true" />

      {/* Trade / distributor CTA */}
      <div className="container-x relative pt-20">
        <Reveal className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-chilli-700 via-chilli-800 to-chilli-900 p-8 sm:p-12">
          <div className="absolute -top-24 -right-24 size-72 rounded-full bg-turmeric-400/20 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <p className="eyebrow text-turmeric-300">For retailers & distributors</p>
              <h2 className="mt-3 text-3xl font-bold text-cream-50 sm:text-4xl">Bring FitRich Masale to your shelves.</h2>
              <p className="mt-3 text-cream-200/80">
                We’d love to hear from stores, distributors and food businesses. Tell us about your requirement and our team will get back to you.
              </p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild variant="gold" size="lg">
                <Link to="/contact">
                  Partner With Us <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="outlineLight" size="lg">
                <a href={whatsappLink('Hello FitRich Masale, I am interested in a trade / distribution enquiry.')} target="_blank" rel="noreferrer">
                  <BrandIcon name="whatsapp" /> WhatsApp
                </a>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-x relative grid gap-12 py-16 sm:grid-cols-2 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo className="h-28" />
          <p className="mt-5 max-w-sm leading-relaxed text-cream-200/70">
            Carefully crafted Indian spices and masalas that bring authentic flavour to every kitchen, every day.
          </p>
          <SocialIcons className="mt-6" itemClassName="border-cream-50/15 text-cream-100 hover:border-turmeric-400 hover:bg-turmeric-400 hover:text-earth-900" />
        </div>

        <div className="lg:col-span-2">
          <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-turmeric-300 uppercase">Explore</h3>
          <ul className="mt-5 space-y-3">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-cream-200/80 transition-colors hover:text-cream-50">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-turmeric-300 uppercase">Our Products</h3>
          <ul className="mt-5 grid grid-cols-1 gap-3">
            {products.slice(0, 5).map((p) => (
              <li key={p.slug}>
                <Link to={`/products/${p.slug}`} className="text-cream-200/80 transition-colors hover:text-cream-50">
                  {p.name}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/products" className="inline-flex items-center gap-1.5 font-semibold text-turmeric-300 hover:text-turmeric-400">
                View full catalog <ArrowRight className="size-4" />
              </Link>
            </li>
          </ul>
        </div>

        <div className="lg:col-span-3">
          <h3 className="font-sans text-xs font-bold tracking-[0.2em] text-turmeric-300 uppercase">Get in touch</h3>
          <ul className="mt-5 space-y-4 text-cream-200/80">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 size-5 shrink-0 text-gold-400" />
              <span>{fullAddress}</span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 size-5 shrink-0 text-gold-400" />
              <span className="flex flex-col gap-1">
                {site.phones.map((p) => (
                  <a key={p.href} href={p.href} className="hover:text-cream-50">
                    {p.display}
                  </a>
                ))}
              </span>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex gap-3 break-all hover:text-cream-50">
                <Mail className="size-5 shrink-0 text-gold-400" /> {site.email}
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-cream-50/10">
        <div className="container-x flex flex-col gap-2 py-6 text-sm text-cream-200/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} FitRich Masale. All rights reserved.</p>
          <p className="font-hindi text-base text-gold-400/80">स्वाद जो याद रहे</p>
        </div>
      </div>
    </footer>
  )
}
