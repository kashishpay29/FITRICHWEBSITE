import { useId, useMemo } from 'react'
import { cn } from '@/lib/utils'

// Small deterministic PRNG so each pack's spice speckle is stable between renders.
function seeded(str) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) h = Math.imul(h ^ str.charCodeAt(i), 16777619)
  return () => {
    h += 0x6d2b79f5
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

const SUFFIXES = ['Masala', 'Powder']

function splitName(name) {
  const words = name.split(' ')
  const last = words[words.length - 1]
  if (words.length > 1 && SUFFIXES.includes(last)) {
    return [words.slice(0, -1).join(' '), last]
  }
  return [name, '']
}

/**
 * Illustrated stand-up pouch used as the product image.
 * If the product has a real `image`, that photo is shown instead.
 */
export default function ProductPack({ product, size, className, loading = 'lazy' }) {
  const uid = useId().replace(/:/g, '')
  const { base, band, powder, ink } = product.pack
  const [title, suffix] = splitName(product.name)
  const weight = size ?? product.packSizes?.[1] ?? product.packSizes?.[0] ?? '100 g'

  const speckles = useMemo(() => {
    const rand = seeded(product.slug)
    return Array.from({ length: 70 }, () => {
      const a = rand() * Math.PI * 2
      const r = Math.sqrt(rand()) * 52
      return { x: 150 + Math.cos(a) * r, y: 178 + Math.sin(a) * r, r: 0.6 + rand() * 1.8, o: 0.25 + rand() * 0.5, light: rand() > 0.5 }
    })
  }, [product.slug])

  if (product.image) {
    return <img src={product.image} alt={`${product.name} pack`} className={cn('h-full w-full object-contain', className)} loading={loading} decoding="async" />
  }

  const titleSize = title.length > 10 ? 26 : title.length > 7 ? 32 : 38

  return (
    <svg viewBox="0 0 300 400" role="img" aria-label={`${product.name} pack by FitRich Masale`} className={cn('h-full w-full', className)}>
      <defs>
        <linearGradient id={`shade-${uid}`} x1="0" x2="1">
          <stop offset="0" stopColor="#000" stopOpacity=".28" />
          <stop offset=".18" stopColor="#fff" stopOpacity=".10" />
          <stop offset=".32" stopColor="#fff" stopOpacity=".18" />
          <stop offset=".55" stopColor="#000" stopOpacity="0" />
          <stop offset=".88" stopColor="#000" stopOpacity=".18" />
          <stop offset="1" stopColor="#000" stopOpacity=".35" />
        </linearGradient>
        <radialGradient id={`powder-${uid}`} cx=".42" cy=".38" r=".7">
          <stop offset="0" stopColor={powder} stopOpacity="1" />
          <stop offset=".75" stopColor={powder} />
          <stop offset="1" stopColor="#000" stopOpacity=".55" />
        </radialGradient>
        <clipPath id={`win-${uid}`}>
          <circle cx="150" cy="178" r="56" />
        </clipPath>
        <pattern id={`zig-${uid}`} width="8" height="8" patternUnits="userSpaceOnUse">
          <path d="M0 8 4 2 8 8" fill="none" stroke="#000" strokeOpacity=".18" strokeWidth="1" />
        </pattern>
      </defs>

      {/* ground shadow */}
      <ellipse cx="150" cy="388" rx="112" ry="9" fill="#000" opacity=".18" />

      {/* pouch body */}
      <path
        d="M52 34 Q50 26 58 24 H242 Q250 26 248 34 L256 360 Q258 380 236 382 H64 Q42 380 44 360 Z"
        fill={base}
      />
      {/* top seal */}
      <path d="M58 24 H242 Q250 26 248 34 L249 58 H51 L52 34 Q50 26 58 24Z" fill="#000" opacity=".14" />
      <rect x="51" y="30" width="198" height="24" fill={`url(#zig-${uid})`} />
      <circle cx="150" cy="41" r="5" fill="#000" opacity=".25" />

      {/* brand mark */}
      <g transform="translate(150 86)" fill={band}>
        <path d="M-58 0c3.5-3 5-6 5-9 0 3 1.6 6 5 9-3.4 3-5 6-5 9 0-3-1.5-6-5-9Z" opacity=".9" />
        <path d="M58 0c-3.5-3-5-6-5-9 0 3-1.6 6-5 9 3.4 3 5 6 5 9 0-3 1.5-6 5-9Z" opacity=".9" />
        <text textAnchor="middle" y="6" fontFamily="Fraunces, serif" fontWeight="800" fontSize="25" letterSpacing=".5">
          FitRich
        </text>
        <text textAnchor="middle" y="22" fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="8.5" letterSpacing="5" opacity=".85">
          MASALE
        </text>
      </g>

      {/* spice window */}
      <circle cx="150" cy="178" r="64" fill="none" stroke={band} strokeWidth="1.5" strokeDasharray="2 4" opacity=".8" />
      <circle cx="150" cy="178" r="58" fill={band} />
      <g clipPath={`url(#win-${uid})`}>
        <rect x="90" y="118" width="120" height="120" fill={`url(#powder-${uid})`} />
        {speckles.map((s, i) => (
          <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={s.light ? '#fff' : '#000'} opacity={s.o * (s.light ? 0.35 : 0.4)} />
        ))}
        <ellipse cx="132" cy="150" rx="30" ry="16" fill="#fff" opacity=".12" />
      </g>

      {/* name band */}
      <rect x="44" y="258" width="212" height="74" fill={band} />
      <rect x="44" y="258" width="212" height="74" fill="#000" opacity=".04" />
      <text x="150" y={suffix ? 293 : 304} textAnchor="middle" fill={base} fontFamily="Fraunces, serif" fontWeight="800" fontSize={titleSize}>
        {title}
      </text>
      {suffix && (
        <text x="150" y="318" textAnchor="middle" fill={base} fontFamily="Manrope, sans-serif" fontWeight="700" fontSize="11" letterSpacing="5">
          {suffix.toUpperCase()}
        </text>
      )}

      {/* footer */}
      <text x="150" y="352" textAnchor="middle" fill={ink} fontFamily="'Tiro Devanagari Hindi', serif" fontSize="15" opacity=".9">
        {product.hindiName}
      </text>
      <text x="150" y="369" textAnchor="middle" fill={ink} fontFamily="Manrope, sans-serif" fontWeight="600" fontSize="8" letterSpacing="2" opacity=".7">
        NET WT. {weight.toUpperCase()}
      </text>

      {/* lighting */}
      <path
        d="M52 34 Q50 26 58 24 H242 Q250 26 248 34 L256 360 Q258 380 236 382 H64 Q42 380 44 360 Z"
        fill={`url(#shade-${uid})`}
      />
    </svg>
  )
}
