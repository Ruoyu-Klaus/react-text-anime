import React from 'react'
import { animated, useSpring, SpringConfig } from '@react-spring/web'

export type SpringCharacterType = {
  index: number
  typingSpeed: number
  children: React.ReactNode
  springConfig: SpringConfig
  className: string
}

export const SpringCharacter = ({
  index,
  typingSpeed,
  springConfig,
  children
}: SpringCharacterType) => {
  const delay = typingSpeed * (index + 1)
  const styles = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    delay: delay,
    config: { ...springConfig }
  })

  return <animated.span style={styles}>{children}</animated.span>
}

export default SpringCharacter
