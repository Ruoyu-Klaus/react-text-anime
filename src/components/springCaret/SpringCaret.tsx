import React from 'react'
import { animated, useSpring, SpringConfig } from '@react-spring/web'

export type SpringCaretType = {
  index: number
  interval: number
  shouldHide: boolean
  children: React.ReactNode
  springConfig: SpringConfig
}

export const SpringCaret = ({
  index,
  shouldHide,
  interval,
  springConfig,
  children
}: SpringCaretType) => {
  const delay = interval * (index + 2)
  const styles = useSpring({
    from: { opacity: 1, display: 'inline-block' },
    to: { opacity: shouldHide ? 0 : 1, display: shouldHide && 'none' },
    delay: delay,
    config: { ...springConfig }
  })
  return (
    <animated.span
      style={{ ...styles, position: 'absolute' }}
      className='text-anime-caret'
    >
      {children}
    </animated.span>
  )
}

export default SpringCaret
