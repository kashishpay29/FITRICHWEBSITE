import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import Logo from '@/components/Logo'
import SocialIcons from '@/components/SocialIcons'
import { Button } from '@/components/ui/button'
import { navLinks, site } from '@/data/site'
import { cn } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  // Remember which page the menu was opened on, so navigating closes it automatically.
  const [openOn, setOpenOn] = useState(null)
  const { pathname } = useLocation()
  const open = openOn === pathname
  const setOpen = (v) => setOpenOn(v ? pathname : null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    const onKey = (e) => e.key === 'Escape' && setOpenOn(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const solid = scrolled && !open

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-all duration-500',
        solid ? 'border-b border-cream-300/60 bg-cream-100/90 py-2 shadow-[0_8px_30px_-20px_rgba(33,23,16,.5)] backdrop-blur-xl' : 'py-3',
      )}
    >
      <nav className="container-x flex items-center justify-between" aria-label="Main">
        <Logo className={solid ? 'h-14 sm:h-16' : 'h-[4.5rem] sm:h-20'} />

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.to}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'relative rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                    solid ? 'text-earth-800 hover:text-chilli-700' : 'text-cream-100/85 hover:text-cream-50',
                    isActive && (solid ? 'text-chilli-700' : 'text-cream-50'),
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    {l.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -bottom-0.5 left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-turmeric-400"
                      />
                    )}
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={site.phoneHref}
            className={cn('flex items-center gap-2 text-sm font-semibold transition-colors', solid ? 'text-earth-700' : 'text-cream-100/85')}
          >
            <Phone className="size-4" /> {site.phone}
          </a>
          <Button asChild variant={solid ? 'default' : 'gold'} size="sm">
            <Link to="/contact">Enquire Now</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setOpen(!open)}
          className={cn(
            'relative z-50 grid size-11 place-items-center rounded-full border transition-colors lg:hidden',
            solid ? 'border-earth-900/15 text-earth-900' : 'border-cream-50/30 text-cream-50',
          )}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 44px) 44px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 44px) 44px)' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="motif fixed inset-0 z-40 flex flex-col bg-chilli-900 px-6 pt-28 pb-10 lg:hidden"
          >
            <ul className="flex flex-col gap-2">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.to}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.06 }}
                >
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) =>
                      cn('block py-2 font-display text-4xl font-bold', isActive ? 'text-turmeric-300' : 'text-cream-50')
                    }
                  >
                    {l.label}
                  </NavLink>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto space-y-6">
              <Button asChild variant="gold" size="lg" className="w-full">
                <Link to="/contact">Enquire Now</Link>
              </Button>
              <div className="flex items-center justify-between">
                <a href={site.phoneHref} className="text-sm font-semibold text-cream-100">
                  {site.phone}
                </a>
                <SocialIcons itemClassName="border-cream-50/20 text-cream-100" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
