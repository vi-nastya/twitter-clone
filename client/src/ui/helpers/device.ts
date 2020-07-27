import { useState, useEffect } from 'react'

export const device = {
  desktop: '(max-width: 1619px)',
  laptop: '(max-width: 1279px)',
  tablet: '(max-width: 1023px)',
  mobile: '(max-width: 767px)',
  mobileSmall: '(max-width: 345px)',
}

export const breakpoint = {
  desktop: 1619,
  laptop: 1279,
  tablet: 1023,
  mobile: 767,
  mobileSmall: 345,
}

export const getDevice = () => {
  const [width, setWidth] = useState<number | null>(null)

  const handleWindowResize = () => setWidth(window.innerWidth)

  // @ts-ignore
  if (process.browser) {
    useEffect(() => {
      window.addEventListener('resize', handleWindowResize)
      setWidth(window.innerWidth)
      return () => window.removeEventListener('resize', handleWindowResize)
    }, [window.innerWidth])

    if (width) {
      if (width < 375) {
        return 'mobileSmall'
      } else if (width < 767) {
        return 'mobile'
      } else if (width < 1023) {
        return 'tablet'
      } else if (width < 1279) {
        return 'laptop'
      } else if (width < 1619) {
        return 'desktop'
      }

      return 'bigDesktop'
    }
  }
}
