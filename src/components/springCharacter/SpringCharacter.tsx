import React from 'react'
import { animated, useSpring, SpringConfig } from '@react-spring/web'
import { presetsType } from '../text-anime/presets'

export type SpringCharacterType = {
  index: number
  interval: number
  children: React.ReactNode
  springConfig: SpringConfig
  className: string
  presets: presetsType
  mode: string
}

export const SpringCharacter = ({
  index,
  interval,
  springConfig,
  children,
  presets,
  mode = 'typing'
}: SpringCharacterType) => {
  const modeConfig = presets[mode]?.call(
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
