import React from 'react'
import { animated, useSpring, SpringConfig } from '@react-spring/web'

export type SpringCharacterType = {
  index: number
  interval: number
  children: React.ReactNode
  springConfig: SpringConfig
  className: string
}

export const SpringCharacter = ({
  index,
  interval,
  springConfig,
  children
}: SpringCharacterType) => {
  const delay = interval * (index + 1)
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: delay,
    config: { ...springConfig }
  })

  return <animated.span style={styles}>{children}</animated.span>
}

export default SpringCharacter
