import { animated, SpringConfig, useSpring } from '@react-spring/web'
import React from 'react'
import { TextAnimation } from '../text-anime/presets'

export type SpringCharacterType = {
  index: number
  interval: number
  children: React.ReactNode
  springConfig: SpringConfig
  className: string
  mode: string
  textAnimation: TextAnimation
}

export const SpringCharacter = ({
  index,
  interval,
  springConfig,
  children,
  mode = 'typing',
  textAnimation
}: SpringCharacterType) => {
  const modeConfig = textAnimation.presets[mode]?.call(
    {},
    { interval, index, children, springConfig }
  )

  if (!modeConfig)
    console.warn(`mode: ${mode} does not exist, please provide valid mode`)

  const styles = useSpring({
    ...modeConfig,
    config: { ...springConfig }
  })

  return <animated.span style={styles}>{children}</animated.span>
}

export default SpringCharacter
