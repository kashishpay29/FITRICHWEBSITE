import { cn } from '@/lib/utils'

function Textarea({ className, ...props }) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-36 w-full resize-y rounded-xl border border-input bg-cream-50 px-4 py-3 text-[15px] text-foreground placeholder:text-earth-500/70 transition-colors',
        'focus-visible:border-gold-500 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-gold-400/20',
        'aria-invalid:border-destructive aria-invalid:ring-destructive/10',
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
