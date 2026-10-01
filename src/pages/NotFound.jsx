import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useSeo } from '@/hooks/useSeo'

export default function NotFound() {
  useSeo({ title: 'Page not found', description: 'The page you are looking for could not be found.' })
  return (
    <section className="motif relative grid min-h-[80svh] place-items-center bg-earth-900 px-5 pt-32 pb-20 text-center">
      <div>
        <p className="font-hindi text-7xl text-turmeric-300">अरे!</p>
        <h1 className="mt-4 text-4xl font-bold text-cream-50 sm:text-5xl">This page seems to be missing a pinch.</h1>
        <p className="mx-auto mt-4 max-w-md text-cream-200/80">The page you’re looking for doesn’t exist or may have moved.</p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild variant="gold" size="lg">
            <Link to="/">Back to Home</Link>
          </Button>
          <Button asChild variant="outlineLight" size="lg">
            <Link to="/products">
              Browse Products <ArrowRight />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
