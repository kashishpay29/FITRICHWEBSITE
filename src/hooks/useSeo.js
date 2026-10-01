import { useEffect } from 'react'
import { site } from '@/data/site'

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, key)
    document.head.appendChild(el)
  }
  el.setAttribute('content', content)
}

/** Sets the page title, meta description and basic Open Graph tags. `title` is kept for future use. */
export function useSeo({ title, description }) {
  useEffect(() => {
    // The browser tab always shows just the brand name.
    const fullTitle = site.name
    document.title = fullTitle
    setMeta('name', 'description', description)
    setMeta('property', 'og:title', fullTitle)
    setMeta('property', 'og:description', description)
    setMeta('property', 'og:type', 'website')
    setMeta('property', 'og:site_name', site.name)
  }, [title, description])
}
