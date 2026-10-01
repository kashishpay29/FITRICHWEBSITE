import { Link } from 'react-router-dom'
import { cn } from '@/lib/utils'

/** FitRich brand logo. Size it with a height class, e.g. `className="h-14"`. */
export default function Logo({ className }) {
  return (
    <Link to="/" className={cn('group inline-flex shrink-0 items-center transition-[height] duration-500', className)} aria-label="FitRich Masale — home">
      <img
        src="/brand/fitrich-logo.webp"
        alt="FitRich Masala — Purity Mein Hit"
        width="320"
        height="310"
        className="h-full w-auto drop-shadow-[0_6px_12px_rgba(0,0,0,.25)] transition-transform duration-500 group-hover:scale-105 group-hover:-rotate-3"
      />
    </Link>
  )
}
