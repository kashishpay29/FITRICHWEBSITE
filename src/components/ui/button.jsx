import { Slot } from '@radix-ui/react-slot'
import { cva } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-60 [&_svg]:size-4 [&_svg]:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-500 cursor-pointer',
  {
    variants: {
      variant: {
        default: 'bg-chilli-700 text-cream-50 shadow-[0_10px_30px_-10px_rgba(122,18,24,.6)] hover:bg-chilli-600 hover:-translate-y-0.5',
        gold: 'bg-turmeric-400 text-earth-900 shadow-[0_10px_30px_-10px_rgba(227,154,28,.7)] hover:bg-turmeric-300 hover:-translate-y-0.5',
        outline: 'border border-earth-900/20 bg-transparent text-earth-900 hover:border-chilli-700 hover:text-chilli-700',
        outlineLight: 'border border-cream-50/40 bg-cream-50/5 text-cream-50 backdrop-blur-sm hover:bg-cream-50 hover:text-earth-900',
        ghost: 'text-earth-900 hover:bg-cream-200',
        whatsapp: 'bg-[#1f8a4c] text-white hover:bg-[#187540] hover:-translate-y-0.5',
        link: 'h-auto px-0 text-chilli-700 underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-11 px-6 text-sm',
        sm: 'h-9 px-4 text-sm',
        lg: 'h-13 px-8 text-[15px]',
        icon: 'size-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'default' },
  },
)

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : 'button'
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
