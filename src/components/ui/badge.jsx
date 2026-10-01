import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva('inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold tracking-wide', {
  variants: {
    variant: {
      default: 'bg-chilli-50 text-chilli-700',
      gold: 'bg-turmeric-300/40 text-earth-800',
      outline: 'border border-earth-900/15 text-earth-700',
      light: 'bg-cream-50/90 text-earth-800 backdrop-blur',
    },
  },
  defaultVariants: { variant: 'default' },
})

function Badge({ className, variant, ...props }) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />
}

export { Badge }
