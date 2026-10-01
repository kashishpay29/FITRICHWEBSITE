import { Link } from 'react-router-dom'
import { ArrowUpRight } from 'lucide-react'
import ProductPack from '@/components/ProductPack'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

/**
 * Reusable product card. `variant="catalog"` adds pack sizes; `variant="compact"` is used
 * for featured / related products.
 */
export default function ProductCard({ product, variant = 'catalog', className }) {
  const { base, band } = product.pack
  const to = `/products/${product.slug}`

  return (
    <article
      className={cn(
        'group relative flex h-full flex-col overflow-hidden rounded-3xl border border-cream-300/70 bg-cream-50 transition-all duration-500',
        'hover:-translate-y-1.5 hover:border-gold-300 hover:shadow-[0_30px_60px_-30px_rgba(63,8,12,.45)]',
        className,
      )}
    >
      <div className="relative aspect-[4/4] overflow-hidden" style={{ background: `linear-gradient(160deg, ${band}33, ${base}1f)` }}>
        <div
          className="absolute top-1/2 left-1/2 size-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-2xl transition-transform duration-700 group-hover:scale-125"
          style={{ background: band }}
          aria-hidden="true"
        />
        <div className="motif absolute inset-0 opacity-60" aria-hidden="true" />
        <div className="relative flex h-full items-center justify-center p-8">
          <ProductPack
            product={product}
            className="h-[92%] w-auto drop-shadow-[0_24px_24px_rgba(33,23,16,.28)] transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:-translate-y-2 group-hover:-rotate-3 group-hover:scale-[1.04]"
          />
        </div>
        <Badge variant="light" className="absolute top-4 left-4">
          {product.category}
        </Badge>
      </div>

      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-2xl font-bold text-earth-900">
            <Link to={to} className="after:absolute after:inset-0 focus-visible:outline-none">
              {product.name}
            </Link>
          </h3>
          <span className="font-hindi text-sm text-gold-600">{product.hindiName}</span>
        </div>
        <p className="mt-3 flex-1 text-[15px] leading-relaxed text-earth-600">{product.description}</p>

        {variant === 'catalog' && product.packSizes?.length > 0 && (
          <div className="mt-5">
            <p className="text-[11px] font-bold tracking-[0.18em] text-earth-500 uppercase">Pack sizes</p>
            <ul className="mt-2 flex flex-wrap gap-1.5">
              {product.packSizes.map((s) => (
                <li key={s} className="rounded-full border border-cream-300 bg-cream-100 px-2.5 py-1 text-xs font-semibold text-earth-700">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        )}

        <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-chilli-700">
          {variant === 'catalog' ? 'View Details' : 'View Product'}
          <span className="grid size-8 place-items-center rounded-full bg-chilli-700 text-cream-50 transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="size-4" />
          </span>
        </span>
      </div>
    </article>
  )
}
