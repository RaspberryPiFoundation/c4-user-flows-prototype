import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * Start each screen at the top. Without this, moving between steps of a flow
 * keeps the previous scroll position, which makes a long form look like it
 * opened half way down.
 */
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}
