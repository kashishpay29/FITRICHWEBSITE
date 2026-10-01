import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleAlert, CircleCheck, Clock, LoaderCircle, Mail, MapPin, Phone, Send } from 'lucide-react'
import PageHero from '@/components/PageHero'
import Reveal from '@/components/Reveal'
import SocialIcons, { BrandIcon } from '@/components/SocialIcons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { getProduct } from '@/data/products'
import { images } from '@/data/images'
import { site, whatsappLink } from '@/data/site'
import { useSeo } from '@/hooks/useSeo'
import { cn } from '@/lib/utils'

const FORM_ENDPOINT = import.meta.env.VITE_FORM_ENDPOINT
const enquiryTypes = ['Customer', 'Retailer', 'Distributor', 'Other']

function validate(v) {
  const errors = {}
  if (v.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) errors.email = 'Please enter a valid email address.'
  const digits = v.phone.replace(/\D/g, '')
  if (digits.length < 10 || digits.length > 13) errors.phone = 'Please enter a valid phone number.'
  if (v.message.trim().length < 10) errors.message = 'Please tell us a little more (at least 10 characters).'
  return errors
}

export default function Contact() {
  useSeo({
    title: 'Contact Us',
    description: 'Get in touch with FitRich Masale for product enquiries, trade and distribution partnerships. Call, email or message us on WhatsApp.',
  })

  return (
    <>
      <PageHero eyebrow="Contact us" title="Let’s talk flavour." image={images.paneerTikka} hindi="नमस्ते">
        Questions about our products, pack sizes or partnering with us as a retailer or distributor? We’d love to hear from you.
      </PageHero>

      <section className="grain py-20 sm:py-28">
        <div className="container-x grid gap-10 lg:grid-cols-[1.25fr_.75fr] lg:gap-12">
          <Reveal className="rounded-[2rem] border border-cream-300 bg-cream-50 p-6 shadow-[0_40px_80px_-50px_rgba(63,8,12,.5)] sm:p-10">
            <ContactForm />
          </Reveal>
          <ContactInfo />
        </div>
      </section>
    </>
  )
}

function ContactForm() {
  const [params] = useSearchParams()
  const product = getProduct(params.get('product') ?? '')
  const initial = {
    name: '',
    email: '',
    phone: '',
    type: 'Customer',
    message: product ? `Hello, I would like to know more about ${product.name}.` : '',
  }

  const [values, setValues] = useState(initial)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error

  const update = (field) => (e) => {
    const next = { ...values, [field]: e.target.value }
    setValues(next)
    if (touched[field]) setErrors(validate(next))
  }
  const blur = (field) => () => {
    setTouched((t) => ({ ...t, [field]: true }))
    setErrors(validate(values))
  }

  async function onSubmit(e) {
    e.preventDefault()
    const errs = validate(values)
    setErrors(errs)
    setTouched({ name: true, email: true, phone: true, message: true })
    if (Object.keys(errs).length) {
      document.getElementById(`field-${Object.keys(errs)[0]}`)?.focus()
      return
    }

    setStatus('submitting')
    try {
      if (FORM_ENDPOINT) {
        const res = await fetch(FORM_ENDPOINT, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ ...values, _subject: `New ${values.type.toLowerCase()} enquiry from ${values.name}` }),
        })
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
      } else {
        // No form service configured yet — hand the enquiry to the visitor's email app.
        const body = `Name: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nEnquiry type: ${values.type}\n\n${values.message}`
        window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`${values.type} enquiry — ${values.name}`)}&body=${encodeURIComponent(body)}`
      }
      setStatus('success')
      setValues({ ...initial, message: '' })
      setTouched({})
    } catch {
      setStatus('error')
    }
  }

  const fieldError = (f) => touched[f] && errors[f]

  return (
    <AnimatePresence mode="wait">
      {status === 'success' ? (
        <motion.div
          key="success"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          className="flex min-h-[28rem] flex-col items-center justify-center text-center"
          role="status"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 220, damping: 14, delay: 0.1 }}
            className="grid size-20 place-items-center rounded-full bg-[#1f8a4c]/10 text-[#1f8a4c]"
          >
            <CircleCheck className="size-10" />
          </motion.span>
          <h2 className="mt-6 text-3xl font-bold text-earth-900">Thank you!</h2>
          <p className="mt-3 max-w-sm text-earth-600">
            {FORM_ENDPOINT
              ? 'Your message has been sent. Our team will get back to you shortly.'
              : 'Your email app should now be open with your message ready to send. Prefer to chat? Reach us on WhatsApp.'}
          </p>
          <Button variant="outline" className="mt-8" onClick={() => setStatus('idle')}>
            Send another message
          </Button>
        </motion.div>
      ) : (
        <motion.form key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onSubmit={onSubmit} noValidate>
          <h2 className="text-3xl font-bold text-earth-900">Send us a message</h2>
          <p className="mt-2 text-earth-600">Fill in the form and we’ll respond as soon as possible.</p>

          <fieldset className="mt-8">
            <legend className="text-sm font-semibold text-earth-800">I am a</legend>
            <div className="mt-2.5 flex flex-wrap gap-2">
              {enquiryTypes.map((t) => (
                <label
                  key={t}
                  className={cn(
                    'cursor-pointer rounded-full border px-4 py-2 text-sm font-semibold transition-all has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-gold-500',
                    values.type === t ? 'border-chilli-700 bg-chilli-700 text-cream-50' : 'border-cream-300 bg-cream-100 text-earth-700 hover:border-chilli-700/40',
                  )}
                >
                  <input type="radio" name="type" value={t} checked={values.type === t} onChange={update('type')} className="sr-only" />
                  {t}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field id="name" label="Full name" error={fieldError('name')}>
              <Input id="field-name" autoComplete="name" placeholder="Your name" value={values.name} onChange={update('name')} onBlur={blur('name')} aria-invalid={!!fieldError('name')} aria-describedby="name-error" />
            </Field>
            <Field id="phone" label="Phone number" error={fieldError('phone')}>
              <Input id="field-phone" type="tel" autoComplete="tel" placeholder="+91 98765 43210" value={values.phone} onChange={update('phone')} onBlur={blur('phone')} aria-invalid={!!fieldError('phone')} aria-describedby="phone-error" />
            </Field>
            <Field id="email" label="Email address" error={fieldError('email')} className="sm:col-span-2">
              <Input id="field-email" type="email" autoComplete="email" placeholder="you@example.com" value={values.email} onChange={update('email')} onBlur={blur('email')} aria-invalid={!!fieldError('email')} aria-describedby="email-error" />
            </Field>
            <Field id="message" label="Message" error={fieldError('message')} className="sm:col-span-2">
              <Textarea id="field-message" placeholder="Tell us what you’re looking for…" value={values.message} onChange={update('message')} onBlur={blur('message')} aria-invalid={!!fieldError('message')} aria-describedby="message-error" />
            </Field>
          </div>

          <AnimatePresence>
            {status === 'error' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                role="alert"
                className="mt-6 flex gap-3 overflow-hidden rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive"
              >
                <CircleAlert className="size-5 shrink-0" />
                <p>
                  Sorry, we couldn’t send your message right now. Please try again, or reach us directly on{' '}
                  <a href={whatsappLink()} target="_blank" rel="noreferrer" className="font-semibold underline">WhatsApp</a> or{' '}
                  <a href={site.phoneHref} className="font-semibold underline">{site.phone}</a>.
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-earth-500">We’ll only use your details to respond to your enquiry.</p>
            <Button type="submit" size="lg" disabled={status === 'submitting'}>
              {status === 'submitting' ? (
                <>
                  <LoaderCircle className="animate-spin" /> Sending…
                </>
              ) : (
                <>
                  Send Message <Send />
                </>
              )}
            </Button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  )
}

function Field({ id, label, error, className, children }) {
  return (
    <div className={cn('space-y-2', className)}>
      <Label htmlFor={`field-${id}`}>
        {label} <span className="text-chilli-600" aria-hidden="true">*</span>
      </Label>
      {children}
      <p id={`${id}-error`} className={cn('flex items-center gap-1.5 text-sm text-destructive', !error && 'sr-only')} aria-live="polite">
        {error && <CircleAlert className="size-3.5" />}
        {error || ''}
      </p>
    </div>
  )
}

function ContactInfo() {
  const rows = [
    { icon: Phone, label: 'Call us', value: site.phone, href: site.phoneHref },
    { icon: Mail, label: 'Email', value: site.email, href: `mailto:${site.email}` },
    { icon: MapPin, label: 'Address', value: `${site.address.line1}, ${site.address.line2}, ${site.address.city}, ${site.address.country}` },
    { icon: Clock, label: 'Business hours', value: site.hours },
  ]
  return (
    <div className="flex flex-col gap-6">
      <Reveal delay={0.1} className="relative overflow-hidden rounded-[2rem] bg-[#1f8a4c] p-8 text-white">
        <BrandIcon name="whatsapp" className="absolute -right-6 -bottom-6 size-40 opacity-10" />
        <BrandIcon name="whatsapp" className="size-9" />
        <h2 className="mt-5 text-2xl font-bold">Quick enquiry on WhatsApp</h2>
        <p className="mt-2 text-white/85">Get a faster response for product, pricing and distribution questions.</p>
        <Button asChild className="mt-6 bg-white text-[#16663a] hover:bg-cream-100 hover:-translate-y-0.5" size="lg">
          <a href={whatsappLink()} target="_blank" rel="noreferrer">
            Chat on WhatsApp
          </a>
        </Button>
      </Reveal>

      <Reveal delay={0.2} className="rounded-[2rem] border border-cream-300 bg-cream-50 p-8">
        <h2 className="text-2xl font-bold text-earth-900">Business contact</h2>
        <ul className="mt-6 space-y-5">
          {rows.map(({ icon: Icon, label, value, href }) => (
            <li key={label} className="flex gap-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-turmeric-300/40 text-chilli-700">
                <Icon className="size-5" />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-bold tracking-[0.16em] text-earth-500 uppercase">{label}</p>
                {href ? (
                  <a href={href} className="font-semibold break-words text-earth-900 hover:text-chilli-700">{value}</a>
                ) : (
                  <p className="font-semibold text-earth-900">{value}</p>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="mt-8 border-t border-cream-300 pt-6">
          <p className="text-xs font-bold tracking-[0.16em] text-earth-500 uppercase">Follow us</p>
          <SocialIcons className="mt-3" itemClassName="border-cream-300 text-earth-800 hover:border-chilli-700 hover:bg-chilli-700 hover:text-cream-50" />
        </div>
      </Reveal>
    </div>
  )
}
