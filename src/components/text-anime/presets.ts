import { SpringConfig, UseSpringProps } from '@react-spring/web'

export type presetArgumentType = {
  interval: number
  index: number
  children: React.ReactNode
  springConfig: SpringConfig
}

export type presetsType = {
  [key: string]: (presetArgument: presetArgumentType) => UseSpringProps
}

export class TextAnimation {
  presets: presetsType = {
    typing: ({ interval, index }) => {
      return {
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: interval * (index + 1)
      }
    },
    fadeIn: ({ interval, index, children, springConfig }) => {
      return {
        from: { opacity: 0 },
        to: { opacity: 1 },
        delay: index % 2 === 0 ? 0 : interval * 2
      }
    },
    dropIn: ({ interval, index, children, springConfig }) => {
      return {
        from: { position: 'relative', top: -40 },
        to: { position: 'relative', top: 0 },
        position: 'relative'
      }
    }
  }

  constructor(animations?: presetsType[]) {
    animations.forEach((animation) => {
      this.presets = { ...this.presets, ...animation }
    })
  }
}
