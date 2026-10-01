import { motion } from 'framer-motion'
import { BrandIcon } from '@/components/SocialIcons'
import { whatsappLink } from '@/data/site'

export default function WhatsAppFab() {
  return (
    <motion.a
      href={whatsappLink()}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with FitRich Masale on WhatsApp"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 18 }}
      whileHover={{ scale: 1.08 }}
      className="group fixed right-5 bottom-5 z-40 flex items-center gap-2 rounded-full bg-[#1f8a4c] p-3.5 text-white shadow-[0_14px_30px_-10px_rgba(31,138,76,.7)] sm:right-7 sm:bottom-7"
    >
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#1f8a4c]/40 [animation-duration:2.5s]" aria-hidden="true" />
      <BrandIcon name="whatsapp" className="size-6" />
      <span className="hidden max-w-0 overflow-hidden text-sm font-semibold whitespace-nowrap transition-all duration-500 group-hover:max-w-40 group-hover:pr-1 sm:inline">
        Chat with us
      </span>
    </motion.a>
  )
}
