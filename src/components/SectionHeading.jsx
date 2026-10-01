import Reveal from '@/components/Reveal'
import { cn } from '@/lib/utils'

export default function SectionHeading({ eyebrow, title, children, align = 'center', light = false, className }) {
  return (
    <Reveal className={cn('max-w-2xl', align === 'center' && 'mx-auto text-center', className)}>
      {eyebrow && <p className={cn('eyebrow', light && 'text-turmeric-300', align === 'center' && 'justify-center')}>{eyebrow}</p>}
      <h2 className={cn('mt-4 text-4xl leading-[1.05] font-bold sm:text-5xl', light ? 'text-cream-50' : 'text-earth-900')}>{title}</h2>
      {children && <p className={cn('mt-5 text-lg leading-relaxed', light ? 'text-cream-200/80' : 'text-earth-600')}>{children}</p>}
    </Reveal>
  )
}
